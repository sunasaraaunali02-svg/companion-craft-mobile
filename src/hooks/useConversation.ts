import { useState, useCallback, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  audioUrl?: string;
}

export interface ConversationSession {
  id: string;
  topic: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  messages: Message[];
  startTime: Date;
  endTime?: Date;
  grammarErrors: number;
  accuracy: number;
}

const MIN_SEND_INTERVAL_MS = 1200;

export const useConversation = () => {
  const [currentSession, setCurrentSession] = useState<ConversationSession | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isAITyping, setIsAITyping] = useState(false);
  const [isAISpeaking, setIsAISpeaking] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const sendingRef = useRef(false);
  const lastSentAtRef = useRef<number>(0);
  const backoffUntilRef = useRef<number>(0);
  const lastUserContentRef = useRef<string>("");

  const startConversation = useCallback(async (topic: string, difficulty: ConversationSession["difficulty"]) => {
    const session: ConversationSession = {
      id: Date.now().toString(),
      topic,
      difficulty,
      messages: [],
      startTime: new Date(),
      grammarErrors: 0,
      accuracy: 100,
    };
    
    setCurrentSession(session);
    setMessages([]);
    
    // Get AI greeting
    setIsAITyping(true);
    try {
      const { data, error } = await supabase.functions.invoke('ai-conversation', {
        body: { 
          messages: [{ role: 'user', content: 'Start the conversation with a greeting.' }],
          topic,
          difficulty
        }
      });

      if (error) throw error;

      const greetingMessage: Message = {
        id: Date.now().toString(),
        role: "assistant",
        content: data.message,
        timestamp: new Date(),
      };
      setMessages([greetingMessage]);
    } catch (error) {
      console.error('Error getting greeting:', error);
      const fallbackGreeting: Message = {
        id: Date.now().toString(),
        role: "assistant",
        content: getGreetingForTopic(topic),
        timestamp: new Date(),
      };
      setMessages([fallbackGreeting]);
    } finally {
      setIsAITyping(false);
    }
  }, []);

  const sendMessage = useCallback(async (content: string) => {
    if (!currentSession) return;

    const now = Date.now();

    // Prevent overlapping requests
    if (sendingRef.current) {
      toast({ title: "Please wait", description: "I'm still replying...", variant: "default" });
      return;
    }

    // Backoff if we recently hit rate limits
    if (now < backoffUntilRef.current) {
      const waitMs = backoffUntilRef.current - now;
      toast({
        title: "Cooling down",
        description: `Please wait ${Math.ceil(waitMs / 1000)}s before sending again.`,
        variant: "destructive",
      });
      return;
    }

    // Throttle rapid sends
    if (now - lastSentAtRef.current < MIN_SEND_INTERVAL_MS) {
      return;
    }

    const trimmed = content.trim();
    if (!trimmed) return;

    // Prevent duplicate spamming of identical message back-to-back
    if (trimmed === lastUserContentRef.current) {
      return;
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: trimmed,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsAITyping(true);
    sendingRef.current = true;

    try {
      // Prepare conversation history for AI (limit to last 6 messages to reduce tokens)
      const allMessages = [...messages, userMessage];
      const recentMessages = allMessages.slice(-6);
      const conversationMessages = recentMessages.map((msg) => ({
        role: msg.role,
        content: msg.content,
      }));

      const { data, error } = await supabase.functions.invoke('ai-conversation', {
        body: {
          messages: conversationMessages,
          topic: currentSession.topic,
          difficulty: currentSession.difficulty,
        },
      });

      if (error) throw error;

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: data.message,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMessage]);

      lastSentAtRef.current = Date.now();
      lastUserContentRef.current = trimmed;
    } catch (error: any) {
      console.error('Error generating AI response:', error);

      // Check if it's a rate limit error
      const isRateLimitError = error?.status === 429 || error?.message?.includes('429') || error?.message?.includes('Rate limit');
      if (isRateLimitError) {
        backoffUntilRef.current = Date.now() + 5000; // 5s backoff
      }

      toast({
        title: isRateLimitError ? "Rate Limit Reached" : "Connection Error",
        description: isRateLimitError
          ? "Too many requests. Please wait a moment and try again."
          : "Could not get AI response. Please try again.",
        variant: "destructive",
      });

      // Fallback response
      const fallbackMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: isRateLimitError
          ? "I need a moment to catch my breath! Please wait a few seconds before continuing."
          : "I'm sorry, I'm having trouble responding right now. Could you please try again?",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, fallbackMessage]);
    } finally {
      setIsAITyping(false);
      sendingRef.current = false;
    }
  }, [currentSession, messages]);

  const playAudio = useCallback((messageId: string) => {
    const message = messages.find(m => m.id === messageId);
    if (!message || message.role !== 'assistant') return;

    setIsAISpeaking(true);
    
    // Use Web Speech API for text-to-speech
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(message.content);
      utterance.lang = 'en-US';
      utterance.rate = 0.9;
      utterance.pitch = 1;
      
      utterance.onend = () => {
        setIsAISpeaking(false);
      };
      
      utterance.onerror = () => {
        setIsAISpeaking(false);
        toast({
          title: "Playback Error",
          description: "Could not play audio.",
          variant: "destructive",
        });
      };

      window.speechSynthesis.speak(utterance);
    } else {
      setIsAISpeaking(false);
      toast({
        title: "Not Supported",
        description: "Text-to-speech is not supported in this browser.",
        variant: "destructive",
      });
    }
  }, [messages]);

  const stopAudio = useCallback(() => {
    setIsAISpeaking(false);
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  }, []);

  const endConversation = useCallback(() => {
    if (currentSession) {
      const endedSession: ConversationSession = {
        ...currentSession,
        endTime: new Date(),
        messages,
      };
      setCurrentSession(null);
      return endedSession;
    }
    return null;
  }, [currentSession, messages]);

  return {
    currentSession,
    messages,
    isAITyping,
    isAISpeaking,
    startConversation,
    sendMessage,
    playAudio,
    stopAudio,
    endConversation,
  };
};

function getGreetingForTopic(topic: string): string {
  const greetings: Record<string, string> = {
    "daily-life": "Hello! Let's talk about your daily routine. What time do you usually wake up?",
    business: "Good day! I'd like to discuss business topics with you. What industry do you work in?",
    travel: "Hi there! Let's talk about travel. What's your favorite destination you've visited?",
    tech: "Hey! Let's discuss technology. What's your favorite tech gadget or app?",
  };
  return greetings[topic] || "Hello! How can I help you practice English today?";
}

function generateAIResponse(userMessage: string, topic: string): string {
  const responses = [
    "That's interesting! Can you tell me more about that?",
    "I see. How does that make you feel?",
    "That sounds great! What happened next?",
    "Really? Why do you think that is?",
    "I understand. Have you always felt that way?",
  ];
  return responses[Math.floor(Math.random() * responses.length)];
}

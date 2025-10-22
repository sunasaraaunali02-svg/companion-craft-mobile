import { useState, useCallback, useRef } from "react";

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

export const useConversation = () => {
  const [currentSession, setCurrentSession] = useState<ConversationSession | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isAITyping, setIsAITyping] = useState(false);
  const [isAISpeaking, setIsAISpeaking] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const startConversation = useCallback((topic: string, difficulty: ConversationSession["difficulty"]) => {
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
    
    // AI greeting message
    setTimeout(() => {
      const greetingMessage: Message = {
        id: Date.now().toString(),
        role: "assistant",
        content: getGreetingForTopic(topic),
        timestamp: new Date(),
      };
      setMessages([greetingMessage]);
    }, 500);
  }, []);

  const sendMessage = useCallback((content: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content,
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, userMessage]);
    
    // Simulate AI response
    setIsAITyping(true);
    setTimeout(() => {
      setIsAITyping(false);
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: generateAIResponse(content, currentSession?.topic || ""),
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMessage]);
    }, 1500 + Math.random() * 1000);
  }, [currentSession]);

  const playAudio = useCallback((messageId: string) => {
    setIsAISpeaking(true);
    // Simulate audio playback
    setTimeout(() => {
      setIsAISpeaking(false);
    }, 2000);
  }, []);

  const stopAudio = useCallback(() => {
    setIsAISpeaking(false);
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

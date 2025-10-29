import { useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

export interface GrammarFeedback {
  yourSentence: string;
  correctSentence: string;
  fluencyFeedback: string;
  confidenceBoost: string;
  accuracy: number;
}

export interface SessionData {
  id: string;
  topic: string;
  startTime: Date;
  endTime?: Date;
  transcript: string;
  feedback: GrammarFeedback | null;
  duration: number;
}

export const usePracticeSession = () => {
  const [currentSession, setCurrentSession] = useState<SessionData | null>(null);
  const [sessions, setSessions] = useState<SessionData[]>([]);

  const startSession = useCallback((topic: string) => {
    const newSession: SessionData = {
      id: Date.now().toString(),
      topic,
      startTime: new Date(),
      transcript: "",
      feedback: null,
      duration: 0,
    };
    setCurrentSession(newSession);
  }, []);

  const updateTranscript = useCallback((transcript: string) => {
    setCurrentSession((prev) => {
      if (!prev) return null;
      return { ...prev, transcript };
    });
  }, []);

  const analyzeGrammar = useCallback(async (text: string): Promise<GrammarFeedback | null> => {
    if (!text || text.trim().length === 0) {
      return null;
    }

    try {
      console.log('Analyzing grammar...');
      const { data, error } = await supabase.functions.invoke('analyze-grammar', {
        body: { text }
      });

      if (error) {
        console.error('Grammar analysis error:', error);
        toast({
          title: "Analysis Error",
          description: "Could not analyze grammar. Please try again.",
          variant: "destructive",
        });
        return null;
      }

      console.log('Grammar analysis result:', data);
      return data as GrammarFeedback;
    } catch (error) {
      console.error('Grammar analysis error:', error);
      toast({
        title: "Analysis Error",
        description: "Could not analyze grammar. Please try again.",
        variant: "destructive",
      });
      return null;
    }
  }, []);

  const endSession = useCallback(async () => {
    if (!currentSession) return;

    try {
      const feedback = await analyzeGrammar(currentSession.transcript);
      const endTime = new Date();
      const duration = Math.round((endTime.getTime() - currentSession.startTime.getTime()) / 1000);

      const completedSession: SessionData = {
        ...currentSession,
        endTime,
        feedback,
        duration,
      };

      setSessions((prevSessions) => [completedSession, ...prevSessions]);
      setCurrentSession(null);
      
      toast({
        title: "Session Complete!",
        description: feedback 
          ? `Accuracy: ${feedback.accuracy}%`
          : "Session saved successfully",
      });
    } catch (error) {
      console.error('Error ending session:', error);
      toast({
        title: "Error",
        description: "Could not complete session analysis.",
        variant: "destructive",
      });
    }
  }, [currentSession, analyzeGrammar]);

  return {
    currentSession,
    sessions,
    startSession,
    updateTranscript,
    endSession,
    analyzeGrammar,
  };
};
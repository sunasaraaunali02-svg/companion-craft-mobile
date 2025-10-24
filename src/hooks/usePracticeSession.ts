import { useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

export interface GrammarError {
  original: string;
  correction: string;
  explanation: string;
  type: "grammar" | "spelling" | "punctuation";
}

export interface SessionData {
  id: string;
  topic: string;
  startTime: Date;
  endTime?: Date;
  transcript: string;
  grammarErrors: GrammarError[];
  accuracyScore: number;
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
      grammarErrors: [],
      accuracyScore: 0,
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

  const analyzeGrammar = useCallback(async (text: string): Promise<GrammarError[]> => {
    if (!text || text.trim().length === 0) {
      return [];
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
          description: "Could not analyze grammar. Using fallback.",
          variant: "destructive",
        });
        return [];
      }

      console.log('Grammar analysis result:', data);
      return data.errors || [];
    } catch (error) {
      console.error('Grammar analysis error:', error);
      toast({
        title: "Analysis Error",
        description: "Could not analyze grammar. Please try again.",
        variant: "destructive",
      });
      return [];
    }
  }, []);

  const calculateAccuracy = useCallback((text: string, errors: GrammarError[]): number => {
    if (!text || text.trim().length === 0) return 0;
    
    const wordCount = text.trim().split(/\s+/).length;
    const errorCount = errors.length;
    
    // Calculate accuracy based on errors per 100 words
    const errorRate = (errorCount / wordCount) * 100;
    const accuracy = Math.max(0, Math.min(100, 100 - errorRate * 10));
    
    return Math.round(accuracy);
  }, []);

  const endSession = useCallback(async () => {
    if (!currentSession) return;

    try {
      const errors = await analyzeGrammar(currentSession.transcript);
      const accuracy = calculateAccuracy(currentSession.transcript, errors);
      const endTime = new Date();
      const duration = Math.round((endTime.getTime() - currentSession.startTime.getTime()) / 1000);

      const completedSession: SessionData = {
        ...currentSession,
        endTime,
        grammarErrors: errors,
        accuracyScore: accuracy,
        duration,
      };

      setSessions((prevSessions) => [completedSession, ...prevSessions]);
      setCurrentSession(null);
      
      toast({
        title: "Session Complete!",
        description: `Accuracy: ${accuracy}% • Errors: ${errors.length}`,
      });
    } catch (error) {
      console.error('Error ending session:', error);
      toast({
        title: "Error",
        description: "Could not complete session analysis.",
        variant: "destructive",
      });
    }
  }, [currentSession, analyzeGrammar, calculateAccuracy]);

  return {
    currentSession,
    sessions,
    startSession,
    updateTranscript,
    endSession,
    analyzeGrammar,
    calculateAccuracy,
  };
};

import { useState, useCallback } from "react";

export interface GrammarError {
  original: string;
  corrected: string;
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

  const analyzeGrammar = useCallback((text: string): GrammarError[] => {
    // Mock grammar analysis - in production, this would call an AI service
    const errors: GrammarError[] = [];
    
    // Simple mock patterns for demonstration
    if (text.toLowerCase().includes("i go to school yesterday")) {
      errors.push({
        original: "I go to school yesterday",
        corrected: "I went to school yesterday",
        explanation: "Use past tense 'went' with 'yesterday'",
        type: "grammar",
      });
    }
    
    if (text.toLowerCase().includes("he don't")) {
      errors.push({
        original: "he don't",
        corrected: "he doesn't",
        explanation: "Use 'doesn't' with third person singular",
        type: "grammar",
      });
    }

    if (text.toLowerCase().includes("alot")) {
      errors.push({
        original: "alot",
        corrected: "a lot",
        explanation: "'A lot' is two separate words",
        type: "spelling",
      });
    }

    return errors;
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

  const endSession = useCallback(() => {
    setCurrentSession((prev) => {
      if (!prev) return null;

      const errors = analyzeGrammar(prev.transcript);
      const accuracy = calculateAccuracy(prev.transcript, errors);
      const endTime = new Date();
      const duration = Math.round((endTime.getTime() - prev.startTime.getTime()) / 1000);

      const completedSession: SessionData = {
        ...prev,
        endTime,
        grammarErrors: errors,
        accuracyScore: accuracy,
        duration,
      };

      setSessions((prevSessions) => [completedSession, ...prevSessions]);
      return null;
    });
  }, [analyzeGrammar, calculateAccuracy]);

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

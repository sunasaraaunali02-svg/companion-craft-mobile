import { useState, useEffect, useRef, useCallback } from "react";
import { toast } from "@/hooks/use-toast";

interface UseVoiceRecorderProps {
  disabled?: boolean;
}

interface UseVoiceRecorderReturn {
  isRecording: boolean;
  transcript: string;
  interimTranscript: string;
  startRecording: () => void;
  stopRecording: () => void;
  resetTranscript: () => void;
  isSupported: boolean;
  isDisabled: boolean;
}

export const useVoiceRecorder = ({ disabled = false }: UseVoiceRecorderProps = {}): UseVoiceRecorderReturn => {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [interimTranscript, setInterimTranscript] = useState("");
  const [isSupported, setIsSupported] = useState(true);
  const [canRecord, setCanRecord] = useState(true);
  
  const recognitionRef = useRef<any>(null);
  const safetyTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Check if Web Speech API is supported
    const SpeechRecognition = 
      (window as any).SpeechRecognition || 
      (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setIsSupported(false);
      console.warn("Web Speech API is not supported in this browser");
      return;
    }

    // Initialize Speech Recognition
    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "en-US";
    recognition.maxAlternatives = 1;

    recognition.onresult = (event: any) => {
      let interim = "";
      let final = "";

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          final += transcript + " ";
        } else {
          interim += transcript;
        }
      }

      if (final) {
        setTranscript((prev) => prev + final);
      }
      setInterimTranscript(interim);
    };

    recognition.onerror = (event: any) => {
      console.error("Speech recognition error:", event.error);
      if (event.error === "no-speech") {
        toast({
          title: "No speech detected",
          description: "Please try speaking again",
          variant: "destructive",
        });
      } else if (event.error === "not-allowed") {
        toast({
          title: "Microphone access denied",
          description: "Please allow microphone access to use this feature",
          variant: "destructive",
        });
      }
      setIsRecording(false);
    };

    recognition.onend = () => {
      setIsRecording(false);
      setInterimTranscript("");
    };
    
    recognition.onspeechend = () => {
      if (recognitionRef.current && isRecording) {
        recognitionRef.current.stop();
      }
    };

    recognitionRef.current = recognition;

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      if (safetyTimerRef.current) {
        clearTimeout(safetyTimerRef.current);
      }
    };
  }, []);
  
  // Handle disabled state with safety delay
  useEffect(() => {
    if (disabled) {
      setCanRecord(false);
      if (isRecording && recognitionRef.current) {
        recognitionRef.current.stop();
      }
    } else {
      // Add 200ms safety delay before allowing recording again
      if (safetyTimerRef.current) {
        clearTimeout(safetyTimerRef.current);
      }
      safetyTimerRef.current = setTimeout(() => {
        setCanRecord(true);
      }, 200);
    }
  }, [disabled, isRecording]);

  const startRecording = useCallback(() => {
    if (!isSupported) {
      toast({
        title: "Not supported",
        description: "Speech recognition is not supported in this browser",
        variant: "destructive",
      });
      return;
    }
    
    if (!canRecord || disabled) {
      toast({
        title: "Mic paused",
        description: "Processing — please wait",
        variant: "default",
      });
      return;
    }

    if (recognitionRef.current && !isRecording) {
      // Clear transcript before starting new session
      setTranscript("");
      setInterimTranscript("");
      
      try {
        recognitionRef.current.start();
        setIsRecording(true);
        toast({
          title: "Recording started",
          description: "Speak clearly into your microphone",
        });
      } catch (error) {
        console.error("Failed to start recording:", error);
      }
    }
  }, [isRecording, isSupported, canRecord, disabled]);

  const stopRecording = useCallback(() => {
    if (recognitionRef.current && isRecording) {
      recognitionRef.current.stop();
      setIsRecording(false);
      setInterimTranscript("");
      toast({
        title: "Recording stopped",
        description: "Analyzing your speech...",
      });
    }
  }, [isRecording]);

  const resetTranscript = useCallback(() => {
    setTranscript("");
    setInterimTranscript("");
  }, []);

  return {
    isRecording,
    transcript,
    interimTranscript,
    startRecording,
    stopRecording,
    resetTranscript,
    isSupported,
    isDisabled: disabled || !canRecord,
  };
};

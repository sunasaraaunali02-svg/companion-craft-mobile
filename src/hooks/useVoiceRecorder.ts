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
  confidence: number;
}

// Auto-punctuation helper function
const autoPunctuate = (text: string): string => {
  if (!text) return text;
  
  let result = text.trim();
  
  // Capitalize first letter
  result = result.charAt(0).toUpperCase() + result.slice(1);
  
  // Capitalize 'i' when standalone
  result = result.replace(/\bi\b/g, 'I');
  
  // Add period at the end if no punctuation exists
  if (!/[.!?]$/.test(result)) {
    result += '.';
  }
  
  // Capitalize after sentence endings
  result = result.replace(/([.!?])\s+(\w)/g, (_, punct, letter) => 
    `${punct} ${letter.toUpperCase()}`
  );
  
  return result;
};

export const useVoiceRecorder = ({ disabled = false }: UseVoiceRecorderProps = {}): UseVoiceRecorderReturn => {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [interimTranscript, setInterimTranscript] = useState("");
  const [isSupported, setIsSupported] = useState(true);
  const [canRecord, setCanRecord] = useState(true);
  const [confidence, setConfidence] = useState(0);
  
  const recognitionRef = useRef<any>(null);
  const safetyTimerRef = useRef<NodeJS.Timeout | null>(null);
  const shouldRestartRef = useRef(false);

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
      let maxConfidence = 0;

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const result = event.results[i];
        const transcript = result[0].transcript;
        const conf = result[0].confidence || 0;
        
        maxConfidence = Math.max(maxConfidence, conf);
        
        if (result.isFinal) {
          final += autoPunctuate(transcript) + " ";
        } else {
          interim += transcript;
        }
      }

      if (final) {
        setTranscript((prev) => prev + final);
      }
      setInterimTranscript(interim);
      setConfidence(maxConfidence);
    };

    recognition.onerror = (event: any) => {
      console.error("Speech recognition error:", event.error);
      
      // Don't show error toast for aborted or no-speech (these are normal)
      if (event.error === "aborted" || event.error === "no-speech") {
        // Silent handling for normal interruptions
      } else if (event.error === "not-allowed") {
        toast({
          title: "Microphone access denied",
          description: "Please allow microphone access to use this feature",
          variant: "destructive",
        });
        shouldRestartRef.current = false;
      } else {
        console.warn("Recognition error:", event.error);
      }
      
      // Auto-restart if we should be recording
      if (shouldRestartRef.current && event.error !== "not-allowed") {
        setTimeout(() => {
          if (shouldRestartRef.current && recognitionRef.current) {
            try {
              recognitionRef.current.start();
            } catch (e) {
              console.log("Could not restart recognition:", e);
            }
          }
        }, 500);
      } else {
        setIsRecording(false);
      }
    };

    recognition.onend = () => {
      setInterimTranscript("");
      
      // Auto-restart if we should still be recording
      if (shouldRestartRef.current && recognitionRef.current) {
        setTimeout(() => {
          if (shouldRestartRef.current) {
            try {
              recognitionRef.current.start();
            } catch (e) {
              console.log("Could not restart recognition:", e);
              setIsRecording(false);
              shouldRestartRef.current = false;
            }
          }
        }, 300);
      } else {
        setIsRecording(false);
      }
    };
    
    // Don't stop on speech end - let it continue listening
    recognition.onspeechend = () => {
      // Keep recognition running for continuous listening
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
      setConfidence(0);
      shouldRestartRef.current = true;
      
      try {
        recognitionRef.current.start();
        setIsRecording(true);
        toast({
          title: "Listening...",
          description: "Speak naturally - I'll keep listening",
        });
      } catch (error) {
        console.error("Failed to start recording:", error);
        shouldRestartRef.current = false;
      }
    }
  }, [isRecording, isSupported, canRecord, disabled]);

  const stopRecording = useCallback(() => {
    shouldRestartRef.current = false;
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
    confidence,
  };
};

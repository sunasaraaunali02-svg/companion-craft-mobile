import { Button } from "@/components/ui/button";
import { Mic, Square } from "lucide-react";
import { cn } from "@/lib/utils";

interface VoiceRecorderProps {
  isRecording: boolean;
  onStart: () => void;
  onStop: () => void;
  disabled?: boolean;
  confidence?: number;
}

const VoiceRecorder = ({ isRecording, onStart, onStop, disabled, confidence = 0 }: VoiceRecorderProps) => {
  return (
    <div className="relative flex flex-col items-center justify-center py-8">
      <div className="relative">
        <Button
          size="lg"
          variant={isRecording ? "destructive" : "default"}
          className={cn(
            "h-32 w-32 rounded-full transition-all duration-300 shadow-lg hover-scale",
            isRecording && "animate-pulse-recording"
          )}
          onClick={isRecording ? onStop : onStart}
          disabled={disabled}
        >
          {isRecording ? (
            <Square className="h-12 w-12 transition-transform duration-200" />
          ) : (
            <Mic className="h-12 w-12 transition-transform duration-200" />
          )}
        </Button>
        {isRecording && (
          <>
            <div className="absolute inset-0 rounded-full border-4 border-destructive animate-ping opacity-75" />
            <div className="absolute inset-0 rounded-full border-4 border-destructive opacity-50" />
          </>
        )}
      </div>
      <div className="mt-6 text-center animate-slide-in-bottom">
        <p className="text-lg font-semibold text-foreground">
          {isRecording ? "Listening..." : "Tap to Start Speaking"}
        </p>
        <p className="text-sm text-muted-foreground mt-1">
          {isRecording
            ? "Speak naturally - I'll keep listening"
            : "Click the microphone to begin practice"}
        </p>
        {isRecording && confidence > 0 && (
          <div className="mt-3 w-48 mx-auto">
            <div className="h-1.5 bg-muted rounded-full overflow-hidden">
              <div 
                className="h-full bg-primary transition-all duration-300"
                style={{ width: `${confidence * 100}%` }}
              />
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Confidence: {Math.round(confidence * 100)}%
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default VoiceRecorder;

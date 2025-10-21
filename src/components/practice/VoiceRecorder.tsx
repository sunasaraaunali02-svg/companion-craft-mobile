import { Button } from "@/components/ui/button";
import { Mic, Square } from "lucide-react";
import { cn } from "@/lib/utils";

interface VoiceRecorderProps {
  isRecording: boolean;
  onStart: () => void;
  onStop: () => void;
  disabled?: boolean;
}

const VoiceRecorder = ({ isRecording, onStart, onStop, disabled }: VoiceRecorderProps) => {
  return (
    <div className="relative flex flex-col items-center justify-center py-8">
      <div className="relative">
        <Button
          size="lg"
          variant={isRecording ? "destructive" : "default"}
          className={cn(
            "h-32 w-32 rounded-full transition-all duration-300 shadow-lg",
            isRecording && "animate-pulse"
          )}
          onClick={isRecording ? onStop : onStart}
          disabled={disabled}
        >
          {isRecording ? (
            <Square className="h-12 w-12" />
          ) : (
            <Mic className="h-12 w-12" />
          )}
        </Button>
        {isRecording && (
          <>
            <div className="absolute inset-0 rounded-full border-4 border-destructive animate-ping opacity-75" />
            <div className="absolute inset-0 rounded-full border-4 border-destructive" />
          </>
        )}
      </div>
      <div className="mt-6 text-center">
        <p className="text-lg font-semibold">
          {isRecording ? "Recording..." : "Tap to Start Speaking"}
        </p>
        <p className="text-sm text-muted-foreground mt-1">
          {isRecording
            ? "Speak clearly and naturally"
            : "Click the microphone to begin practice"}
        </p>
      </div>
    </div>
  );
};

export default VoiceRecorder;

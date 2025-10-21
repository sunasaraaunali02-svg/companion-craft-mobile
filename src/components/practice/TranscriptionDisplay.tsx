import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

interface TranscriptionDisplayProps {
  transcript: string;
  interimTranscript: string;
  isRecording: boolean;
}

const TranscriptionDisplay = ({
  transcript,
  interimTranscript,
  isRecording,
}: TranscriptionDisplayProps) => {
  const hasContent = transcript || interimTranscript;

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <span>Live Transcription</span>
        {isRecording && (
          <span className="flex items-center gap-1 text-sm text-destructive">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-destructive opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-destructive"></span>
            </span>
            Live
          </span>
        )}
      </h3>
      <ScrollArea className="h-[160px] w-full rounded-lg border bg-muted/30 p-4">
        {hasContent ? (
          <div className="font-body text-foreground space-y-2">
            {transcript && <p className="leading-relaxed">{transcript}</p>}
            {interimTranscript && (
              <p className="text-muted-foreground italic leading-relaxed">
                {interimTranscript}
              </p>
            )}
          </div>
        ) : (
          <p className="text-muted-foreground text-center py-8">
            {isRecording
              ? "Listening... Your speech will appear here"
              : "Start recording to see your transcription"}
          </p>
        )}
      </ScrollArea>
    </Card>
  );
};

export default TranscriptionDisplay;

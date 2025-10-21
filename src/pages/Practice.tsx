import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mic, Square, Settings } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Practice = () => {
  const [isRecording, setIsRecording] = useState(false);

  return (
    <div className="container max-w-4xl mx-auto p-4 space-y-6">
      {/* Topic Selection */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Select Topic</h2>
          <Button variant="ghost" size="icon">
            <Settings className="h-5 w-5" />
          </Button>
        </div>
        <Select defaultValue="daily-life">
          <SelectTrigger>
            <SelectValue placeholder="Choose a topic" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="daily-life">Daily Life</SelectItem>
            <SelectItem value="business">Business English</SelectItem>
            <SelectItem value="travel">Travel & Tourism</SelectItem>
            <SelectItem value="technology">Technology</SelectItem>
            <SelectItem value="academic">Academic English</SelectItem>
          </SelectContent>
        </Select>
      </Card>

      {/* Recording Area */}
      <Card className="p-8">
        <div className="text-center space-y-6">
          <div className="relative">
            <Button
              size="lg"
              variant={isRecording ? "destructive" : "default"}
              className="h-32 w-32 rounded-full transition-all duration-300"
              onClick={() => setIsRecording(!isRecording)}
            >
              {isRecording ? (
                <Square className="h-12 w-12" />
              ) : (
                <Mic className="h-12 w-12" />
              )}
            </Button>
            {isRecording && (
              <div className="absolute inset-0 rounded-full border-4 border-destructive animate-pulse" />
            )}
          </div>
          <div>
            <p className="text-lg font-medium">
              {isRecording ? "Recording..." : "Tap to Start Speaking"}
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              {isRecording ? "00:15" : "Practice your pronunciation"}
            </p>
          </div>
        </div>
      </Card>

      {/* Transcription Display */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Live Transcription</h3>
        <div className="min-h-[120px] p-4 bg-muted/50 rounded-lg">
          <p className="text-foreground/70 font-body">
            {isRecording
              ? "Your speech will appear here in real-time..."
              : "Start recording to see your transcription"}
          </p>
        </div>
      </Card>

      {/* Grammar Feedback */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Grammar Feedback</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-accent/10 rounded-lg">
            <span className="text-sm font-medium">Accuracy Score</span>
            <span className="text-2xl font-bold text-accent">--</span>
          </div>
          <div className="p-4 bg-muted/50 rounded-lg">
            <p className="text-sm text-muted-foreground">
              Grammar corrections will appear here after you speak
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Practice;

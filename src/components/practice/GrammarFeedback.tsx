import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Heart, BookOpen, TrendingUp } from "lucide-react";

export interface GrammarFeedback {
  yourSentence: string;
  correctSentence: string;
  fluencyFeedback: string;
  confidenceBoost: string;
  accuracy: number;
}

interface GrammarFeedbackProps {
  feedback: GrammarFeedback | null;
  transcript: string;
}

const GrammarFeedback = ({ feedback, transcript }: GrammarFeedbackProps) => {
  if (!transcript) {
    return (
      <Card className="p-6">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-semibold">Your Coach is Ready</h3>
          </div>
          <p className="text-sm text-muted-foreground">
            Start speaking to receive personalized fluency feedback
          </p>
        </div>
      </Card>
    );
  }

  if (!feedback) {
    return (
      <Card className="p-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Analyzing your speech...</h3>
          <p className="text-sm text-muted-foreground">
            Your coach is preparing feedback
          </p>
        </div>
      </Card>
    );
  }

  const hasCorrections = feedback.yourSentence !== feedback.correctSentence;

  return (
    <Card className="p-6">
      <div className="space-y-6">
        {/* Header with accuracy */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-semibold">Coach Feedback</h3>
          </div>
          <Badge 
            variant={feedback.accuracy >= 90 ? "default" : feedback.accuracy >= 70 ? "secondary" : "outline"}
            className="gap-1"
          >
            <TrendingUp className="h-3 w-3" />
            {feedback.accuracy}% Accuracy
          </Badge>
        </div>

        {/* Your sentence */}
        <div className="space-y-2">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
            Your Sentence
          </p>
          <p className="text-sm p-3 rounded-lg bg-muted/50">
            {feedback.yourSentence}
          </p>
        </div>

        {/* Corrected sentence (only if different) */}
        {hasCorrections && (
          <div className="space-y-2">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              Corrected Version
            </p>
            <p className="text-sm p-3 rounded-lg bg-primary/5 border border-primary/20 font-medium">
              {feedback.correctSentence}
            </p>
          </div>
        )}

        {/* Fluency feedback */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-primary" />
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              Fluency Tip
            </p>
          </div>
          <p className="text-sm p-3 rounded-lg bg-card border">
            {feedback.fluencyFeedback}
          </p>
        </div>

        {/* Confidence boost */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Heart className="h-4 w-4 text-red-500 fill-red-500" />
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              Keep Going!
            </p>
          </div>
          <p className="text-sm p-3 rounded-lg bg-gradient-to-br from-primary/10 to-secondary/10 font-medium text-foreground/90">
            {feedback.confidenceBoost}
          </p>
        </div>
      </div>
    </Card>
  );
};

export default GrammarFeedback;
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sparkles, AlertCircle, BookOpen, TrendingUp } from "lucide-react";
import { GrammarFeedback as GrammarFeedbackType } from "@/hooks/usePracticeSession";

interface GrammarFeedbackProps {
  feedback: GrammarFeedbackType | null;
  transcript: string;
}

const GrammarFeedback = ({ feedback, transcript }: GrammarFeedbackProps) => {
  if (!transcript) {
    return (
      <Card className="p-6">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-semibold">Your Fluency Analyzer is Ready</h3>
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
            Preparing fluency analysis
          </p>
        </div>
      </Card>
    );
  }

  const hasIssues = feedback.mainIssues.length > 0;

  return (
    <Card className="p-6">
      <div className="space-y-6">
        {/* Header with accuracy */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-semibold">Fluency Analysis</h3>
          </div>
          <Badge 
            variant={feedback.accuracy >= 90 ? "default" : feedback.accuracy >= 70 ? "secondary" : "outline"}
            className="gap-1"
          >
            <TrendingUp className="h-3 w-3" />
            {feedback.accuracy}% Accuracy
          </Badge>
        </div>

        {/* Your input */}
        <div className="space-y-2">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
            Your Input
          </p>
          <p className="text-sm p-3 rounded-lg bg-muted/50">
            {feedback.yourInput}
          </p>
        </div>

        {/* Corrected version (only if has issues) */}
        {hasIssues && (
          <>
            <div className="space-y-2">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                Corrected Version
              </p>
              <p className="text-sm p-3 rounded-lg bg-primary/5 border border-primary/20 font-medium">
                {feedback.correctedVersion}
              </p>
            </div>

            {/* Main issues */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <AlertCircle className="h-4 w-4 text-orange-500" />
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  Main Issues
                </p>
              </div>
              <ul className="text-sm p-3 rounded-lg bg-card border space-y-1">
                {feedback.mainIssues.map((issue, index) => (
                  <li key={index}>• {issue}</li>
                ))}
              </ul>
            </div>
          </>
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
      </div>
    </Card>
  );
};

export default GrammarFeedback;
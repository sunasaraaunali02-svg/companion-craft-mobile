import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { BookOpen, TrendingUp, AlertCircle } from "lucide-react";
import { GrammarFeedback } from "@/hooks/usePracticeSession";

interface FluencyResultProps {
  feedback: GrammarFeedback;
}

export const FluencyResult = ({ feedback }: FluencyResultProps) => {
  const hasIssues = feedback.mainIssues.length > 0;

  return (
    <Card className="p-6 space-y-5 animate-fade-in">
      {/* Accuracy Score */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium">Accuracy</span>
          </div>
          <span className="text-2xl font-bold text-primary">
            {feedback.accuracy}%
          </span>
        </div>
        <Progress value={feedback.accuracy} className="h-2" />
      </div>

      {/* Your Input */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <BookOpen className="h-4 w-4 text-muted-foreground" />
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
            Your Input
          </span>
        </div>
        <p className="text-sm p-3 rounded-lg bg-muted/50 border">
          {feedback.yourInput}
        </p>
      </div>

      {/* Corrected Version */}
      {hasIssues && (
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-primary" />
            <span className="text-xs font-medium text-primary uppercase tracking-wide">
              Corrected Version
            </span>
          </div>
          <p className="text-sm p-3 rounded-lg bg-primary/5 border border-primary/20 font-medium">
            {feedback.correctedVersion}
          </p>
        </div>
      )}

      {/* Main Issues */}
      {hasIssues && (
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <AlertCircle className="h-4 w-4 text-orange-500" />
            <span className="text-xs font-medium text-orange-500 uppercase tracking-wide">
              Issues Found
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {feedback.mainIssues.map((issue, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {issue}
              </Badge>
            ))}
          </div>
        </div>
      )}

      {/* Fluency Tip */}
      <div className="p-3 rounded-lg bg-accent/10 border border-accent/20">
        <p className="text-sm text-foreground">
          {feedback.fluencyFeedback}
        </p>
      </div>
    </Card>
  );
};

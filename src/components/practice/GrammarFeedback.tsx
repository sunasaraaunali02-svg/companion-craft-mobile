import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, CheckCircle, Info } from "lucide-react";
import { GrammarError } from "@/hooks/usePracticeSession";

interface GrammarFeedbackProps {
  errors: GrammarError[];
  transcript: string;
}

const GrammarFeedback = ({ errors, transcript }: GrammarFeedbackProps) => {
  const getErrorIcon = (type: GrammarError["type"]) => {
    switch (type) {
      case "grammar":
        return <AlertCircle className="h-4 w-4" />;
      case "spelling":
        return <Info className="h-4 w-4" />;
      case "punctuation":
        return <Info className="h-4 w-4" />;
    }
  };

  const getErrorColor = (type: GrammarError["type"]) => {
    switch (type) {
      case "grammar":
        return "destructive" as const;
      case "spelling":
        return "secondary" as const;
      case "punctuation":
        return "outline" as const;
      default:
        return "default" as const;
    }
  };

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
        Grammar Feedback
        {errors.length === 0 && transcript && (
          <Badge variant="outline" className="bg-accent/10 text-accent border-accent/20">
            <CheckCircle className="h-3 w-3 mr-1" />
            Perfect!
          </Badge>
        )}
      </h3>

      {!transcript ? (
        <div className="p-4 bg-muted/50 rounded-lg">
          <p className="text-sm text-muted-foreground text-center">
            Grammar corrections will appear here after you speak
          </p>
        </div>
      ) : errors.length === 0 ? (
        <div className="p-4 bg-accent/10 rounded-lg border border-accent/20">
          <p className="text-sm text-accent font-medium flex items-center gap-2">
            <CheckCircle className="h-5 w-5" />
            Excellent! No grammar errors detected.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {errors.map((error, index) => (
            <div
              key={index}
              className="p-4 bg-muted/50 rounded-lg border border-border space-y-2"
            >
              <div className="flex items-start gap-2">
                <Badge variant={getErrorColor(error.type)} className="mt-0.5">
                  {getErrorIcon(error.type)}
                  <span className="ml-1 capitalize">{error.type}</span>
                </Badge>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex items-start gap-2">
                  <span className="text-muted-foreground font-medium min-w-[80px]">
                    Original:
                  </span>
                  <span className="line-through text-destructive">
                    {error.original}
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-muted-foreground font-medium min-w-[80px]">
                    Corrected:
                  </span>
                  <span className="text-accent font-semibold">
                    {error.corrected}
                  </span>
                </div>
                <div className="flex items-start gap-2 pt-1">
                  <span className="text-muted-foreground font-medium min-w-[80px]">
                    Tip:
                  </span>
                  <span className="text-foreground">{error.explanation}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
};

export default GrammarFeedback;

import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

interface AccuracyMeterProps {
  score: number;
  previousScore?: number;
}

const AccuracyMeter = ({ score, previousScore }: AccuracyMeterProps) => {
  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-accent";
    if (score >= 75) return "text-primary";
    if (score >= 60) return "text-warning";
    return "text-destructive";
  };

  const getScoreLabel = (score: number) => {
    if (score >= 90) return "Excellent";
    if (score >= 75) return "Good";
    if (score >= 60) return "Fair";
    return "Needs Improvement";
  };

  const getProgressColor = (score: number) => {
    if (score >= 90) return "bg-accent";
    if (score >= 75) return "bg-primary";
    if (score >= 60) return "bg-warning";
    return "bg-destructive";
  };

  const getTrendIcon = () => {
    if (!previousScore) return null;
    if (score > previousScore) return <TrendingUp className="h-4 w-4 text-accent" />;
    if (score < previousScore) return <TrendingDown className="h-4 w-4 text-destructive" />;
    return <Minus className="h-4 w-4 text-muted-foreground" />;
  };

  return (
    <Card className="p-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Accuracy Score</h3>
          {getTrendIcon()}
        </div>

        <div className="flex items-end gap-3">
          <div className={`text-5xl font-bold ${getScoreColor(score)}`}>
            {score > 0 ? score : "--"}
          </div>
          <div className="pb-2">
            <span className="text-2xl text-muted-foreground">/ 100</span>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Performance</span>
            <span className={`font-semibold ${getScoreColor(score)}`}>
              {score > 0 ? getScoreLabel(score) : "Not scored yet"}
            </span>
          </div>
          <div className="relative">
            <Progress value={score} className="h-3" />
            <div
              className={`absolute top-0 left-0 h-3 rounded-full transition-all duration-500 ${getProgressColor(
                score
              )}`}
              style={{ width: `${score}%` }}
            />
          </div>
        </div>

        {previousScore !== undefined && (
          <div className="pt-2 border-t border-border">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Previous session</span>
              <span className="font-medium">{previousScore}%</span>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};

export default AccuracyMeter;

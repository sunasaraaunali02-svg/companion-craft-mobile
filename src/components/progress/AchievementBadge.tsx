import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy, Flame, Target, Star } from "lucide-react";

interface Achievement {
  id: string;
  title: string;
  description: string;
  type: "streak" | "accuracy" | "sessions" | "milestone";
  unlockedAt: Date;
}

interface AchievementBadgeProps {
  achievement: Achievement;
}

export const AchievementBadge = ({ achievement }: AchievementBadgeProps) => {
  const getIcon = () => {
    switch (achievement.type) {
      case "streak":
        return <Flame className="h-5 w-5 text-warning" />;
      case "accuracy":
        return <Target className="h-5 w-5 text-primary" />;
      case "sessions":
        return <Star className="h-5 w-5 text-accent" />;
      case "milestone":
        return <Trophy className="h-5 w-5 text-warning" />;
    }
  };

  return (
    <Card className="p-4 hover:bg-accent/50 transition-colors">
      <div className="flex gap-3 items-start">
        <div className="p-2 bg-muted rounded-full">
          {getIcon()}
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h4 className="font-semibold text-sm">{achievement.title}</h4>
            <Badge variant="secondary" className="text-xs">New</Badge>
          </div>
          <p className="text-xs text-muted-foreground">{achievement.description}</p>
          <p className="text-xs text-muted-foreground mt-1">
            Unlocked {achievement.unlockedAt.toLocaleDateString()}
          </p>
        </div>
      </div>
    </Card>
  );
};

import { Lock } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PremiumBadge } from "./PremiumBadge";

interface FeatureLockedCardProps {
  title: string;
  description: string;
  onUpgrade: () => void;
}

export const FeatureLockedCard = ({
  title,
  description,
  onUpgrade,
}: FeatureLockedCardProps) => {
  return (
    <Card className="relative overflow-hidden border-2 border-dashed border-muted-foreground/20 bg-muted/30">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 pointer-events-none" />
      <CardHeader className="relative">
        <div className="flex items-center justify-between mb-2">
          <PremiumBadge />
          <Lock className="h-5 w-5 text-muted-foreground" />
        </div>
        <CardTitle className="text-foreground">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="relative">
        <Button
          onClick={onUpgrade}
          className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity"
        >
          Upgrade to Premium
        </Button>
      </CardContent>
    </Card>
  );
};

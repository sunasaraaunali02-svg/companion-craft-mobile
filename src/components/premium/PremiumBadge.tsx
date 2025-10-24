import { Crown } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface PremiumBadgeProps {
  size?: "sm" | "md" | "lg";
  showText?: boolean;
}

export const PremiumBadge = ({ size = "md", showText = true }: PremiumBadgeProps) => {
  const sizeClasses = {
    sm: "h-3 w-3",
    md: "h-4 w-4",
    lg: "h-5 w-5",
  };

  return (
    <Badge
      variant="default"
      className="bg-gradient-to-r from-amber-500 to-yellow-500 text-white border-none animate-shimmer hover:scale-105 transition-transform"
    >
      <Crown className={sizeClasses[size]} />
      {showText && <span className="ml-1">Premium</span>}
    </Badge>
  );
};

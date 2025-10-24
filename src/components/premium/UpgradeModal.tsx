import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Check, Crown } from "lucide-react";
import { PremiumBadge } from "./PremiumBadge";

interface UpgradeModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const premiumFeatures = [
  "Unlimited practice sessions",
  "Advanced pronunciation analysis with phonetic breakdown",
  "Custom learning paths tailored to your goals",
  "Professional feedback reports you can export",
  "Offline mode for practice anywhere",
  "Priority support from our team",
  "No ads or interruptions",
  "Early access to new features",
];

export const UpgradeModal = ({ open, onOpenChange }: UpgradeModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-center mb-4">
            <div className="rounded-full bg-gradient-to-r from-amber-500 to-yellow-500 p-4">
              <Crown className="h-8 w-8 text-white" />
            </div>
          </div>
          <DialogTitle className="text-center text-2xl">
            Upgrade to Premium
          </DialogTitle>
          <DialogDescription className="text-center">
            Unlock the full potential of EnglishTutor
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Pricing */}
          <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg p-6 text-center">
            <div className="flex items-center justify-center mb-2">
              <PremiumBadge size="lg" />
            </div>
            <div className="text-4xl font-bold text-foreground mb-1">
              $9.99
              <span className="text-base font-normal text-muted-foreground">
                /month
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              or $89.99/year (save 25%)
            </p>
          </div>

          {/* Features */}
          <div className="space-y-3">
            {premiumFeatures.map((feature, index) => (
              <div
                key={index}
                className="flex items-start gap-3 animate-slide-in-bottom"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="rounded-full bg-accent/10 p-1 mt-0.5">
                  <Check className="h-4 w-4 text-accent" />
                </div>
                <p className="text-sm text-foreground">{feature}</p>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="space-y-3 pt-4">
            <Button
              size="lg"
              className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity text-white"
            >
              Start 7-Day Free Trial
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="w-full"
              onClick={() => onOpenChange(false)}
            >
              Maybe Later
            </Button>
          </div>

          <p className="text-xs text-center text-muted-foreground">
            Cancel anytime. No commitment required.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

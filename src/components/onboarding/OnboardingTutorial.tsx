import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { X, ArrowRight, ArrowLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface OnboardingStep {
  title: string;
  description: string;
  icon: string;
  tip?: string;
}

const steps: OnboardingStep[] = [
  {
    title: "Welcome to EnglishTutor! 🎉",
    description: "Your AI-powered companion for improving English speaking skills. Let's take a quick tour!",
    icon: "👋",
  },
  {
    title: "Practice Speaking",
    description: "Tap the microphone button to record your voice. Speak naturally and get instant feedback on grammar and pronunciation.",
    icon: "🎤",
    tip: "Speak clearly in a quiet environment for best results"
  },
  {
    title: "AI Conversations",
    description: "Have natural conversations with our AI tutor. Choose topics that interest you and practice at your own pace.",
    icon: "💬",
    tip: "The AI adapts to your proficiency level"
  },
  {
    title: "Track Your Progress",
    description: "Monitor your accuracy scores, maintain daily streaks, and watch your improvement over time.",
    icon: "📈",
    tip: "Practice for 15 minutes daily for best results"
  },
  {
    title: "Ready to Start!",
    description: "You're all set! Start your first practice session and begin your journey to English fluency.",
    icon: "🚀",
  }
];

const OnboardingTutorial = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    // Check if user has seen the tutorial
    const hasSeenTutorial = localStorage.getItem("hasSeenTutorial");
    if (!hasSeenTutorial) {
      setIsOpen(true);
    }
  }, []);

  const handleClose = () => {
    localStorage.setItem("hasSeenTutorial", "true");
    setIsOpen(false);
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleClose();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  if (!isOpen) return null;

  const step = steps[currentStep];

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in">
      <Card className="max-w-md w-full p-6 relative animate-in slide-in-from-bottom duration-500">
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-4 right-4"
          onClick={handleClose}
        >
          <X className="h-4 w-4" />
        </Button>

        <div className="space-y-6">
          {/* Progress Indicator */}
          <div className="flex gap-2">
            {steps.map((_, index) => (
              <div
                key={index}
                className={`h-1.5 flex-1 rounded-full transition-all ${
                  index === currentStep
                    ? "bg-primary"
                    : index < currentStep
                    ? "bg-primary/50"
                    : "bg-muted"
                }`}
              />
            ))}
          </div>

          {/* Icon */}
          <div className="text-center">
            <div className="text-6xl mb-4 animate-scale-in">{step.icon}</div>
          </div>

          {/* Content */}
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-bold">{step.title}</h2>
            <p className="text-muted-foreground">{step.description}</p>
            {step.tip && (
              <Badge variant="secondary" className="mt-4">
                💡 Tip: {step.tip}
              </Badge>
            )}
          </div>

          {/* Navigation */}
          <div className="flex gap-3 justify-between pt-4">
            <Button
              variant="outline"
              onClick={handleBack}
              disabled={currentStep === 0}
              className="flex-1"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <Button onClick={handleNext} className="flex-1">
              {currentStep === steps.length - 1 ? (
                "Get Started"
              ) : (
                <>
                  Next
                  <ArrowRight className="h-4 w-4 ml-2" />
                </>
              )}
            </Button>
          </div>

          {/* Skip */}
          <button
            onClick={handleClose}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors w-full text-center"
          >
            Skip tutorial
          </button>
        </div>
      </Card>
    </div>
  );
};

export default OnboardingTutorial;

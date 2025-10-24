import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useAuth } from "./AuthContext";
import { supabase } from "@/integrations/supabase/client";

interface PremiumFeatures {
  unlimitedSessions: boolean;
  advancedPronunciation: boolean;
  customLearningPaths: boolean;
  professionalReports: boolean;
  offlineMode: boolean;
  prioritySupport: boolean;
}

interface PremiumContextType {
  isPremium: boolean;
  features: PremiumFeatures;
  loading: boolean;
  checkFeatureAccess: (feature: keyof PremiumFeatures) => boolean;
  upgradePrompt: () => void;
}

const PremiumContext = createContext<PremiumContextType | undefined>(undefined);

const FREE_FEATURES: PremiumFeatures = {
  unlimitedSessions: false,
  advancedPronunciation: false,
  customLearningPaths: false,
  professionalReports: false,
  offlineMode: false,
  prioritySupport: false,
};

const PREMIUM_FEATURES: PremiumFeatures = {
  unlimitedSessions: true,
  advancedPronunciation: true,
  customLearningPaths: true,
  professionalReports: true,
  offlineMode: true,
  prioritySupport: true,
};

export const PremiumProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const [isPremium, setIsPremium] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkPremiumStatus = async () => {
      if (!user) {
        setIsPremium(false);
        setLoading(false);
        return;
      }

      try {
        // Check user metadata for premium status
        // In a real implementation, this would check a subscription table
        const { data: profile } = await supabase
          .from("profiles")
          .select("id")
          .eq("id", user.id)
          .single();

        // For now, all users are free tier
        // This would be replaced with actual subscription checking
        setIsPremium(false);
      } catch (error) {
        console.error("Error checking premium status:", error);
        setIsPremium(false);
      } finally {
        setLoading(false);
      }
    };

    checkPremiumStatus();
  }, [user]);

  const checkFeatureAccess = (feature: keyof PremiumFeatures): boolean => {
    const features = isPremium ? PREMIUM_FEATURES : FREE_FEATURES;
    return features[feature];
  };

  const upgradePrompt = () => {
    // This would open a modal or redirect to upgrade page
    console.log("Upgrade to premium!");
    // For now, just show a toast or modal
  };

  const features = isPremium ? PREMIUM_FEATURES : FREE_FEATURES;

  return (
    <PremiumContext.Provider
      value={{
        isPremium,
        features,
        loading,
        checkFeatureAccess,
        upgradePrompt,
      }}
    >
      {children}
    </PremiumContext.Provider>
  );
};

export const usePremium = () => {
  const context = useContext(PremiumContext);
  if (!context) {
    throw new Error("usePremium must be used within PremiumProvider");
  }
  return context;
};

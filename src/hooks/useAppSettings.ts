import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export interface AppSettings {
  audio: {
    inputDevice: string;
    outputDevice: string;
    inputSensitivity: number;
  };
  speech: {
    recognitionSensitivity: number;
    language: string;
  };
  grammar: {
    strictnessLevel: "lenient" | "balanced" | "strict";
  };
  conversation: {
    aiStyle: "formal" | "casual" | "neutral";
  };
  notifications: {
    practiceReminders: boolean;
    achievementAlerts: boolean;
    weeklyReports: boolean;
  };
  privacy: {
    saveConversations: boolean;
    shareAnalytics: boolean;
  };
}

const defaultSettings: AppSettings = {
  audio: {
    inputDevice: "default",
    outputDevice: "default",
    inputSensitivity: 50,
  },
  speech: {
    recognitionSensitivity: 50,
    language: "en-US",
  },
  grammar: {
    strictnessLevel: "balanced",
  },
  conversation: {
    aiStyle: "neutral",
  },
  notifications: {
    practiceReminders: true,
    achievementAlerts: true,
    weeklyReports: true,
  },
  privacy: {
    saveConversations: true,
    shareAnalytics: false,
  },
};

export const useAppSettings = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [settings, setSettings] = useState<AppSettings>(defaultSettings);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchSettings();
    }
  }, [user]);

  const fetchSettings = async () => {
    if (!user) return;

    const { data, error } = await supabase
      .from("user_settings")
      .select("*")
      .eq("user_id", user.id)
      .maybeSingle();

    if (error) {
      console.error("Error fetching settings:", error);
      setSettings(defaultSettings);
      setLoading(false);
      return;
    }

    if (data) {
      setSettings({
        audio: data.audio_settings as any,
        speech: data.speech_settings as any,
        grammar: data.grammar_settings as any,
        conversation: data.conversation_settings as any,
        notifications: data.notification_settings as any,
        privacy: data.privacy_settings as any,
      });
    } else {
      // Create default settings if none exist
      await saveSettings(defaultSettings);
    }
    setLoading(false);
  };

  const saveSettings = async (settingsToSave: AppSettings) => {
    if (!user) return;

    const { error } = await supabase
      .from("user_settings")
      .upsert({
        user_id: user.id,
        audio_settings: settingsToSave.audio,
        speech_settings: settingsToSave.speech,
        grammar_settings: settingsToSave.grammar,
        conversation_settings: settingsToSave.conversation,
        notification_settings: settingsToSave.notifications,
        privacy_settings: settingsToSave.privacy,
      });

    if (error) {
      console.error("Error saving settings:", error);
      toast({
        title: "Error",
        description: "Failed to save settings",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Success",
      description: "Settings saved successfully",
    });
  };

  const updateSettings = (category: keyof AppSettings, updates: any) => {
    setSettings((prev) => ({
      ...prev,
      [category]: { ...prev[category], ...updates },
    }));
  };

  const resetSettings = () => {
    setSettings(defaultSettings);
  };

  return {
    settings,
    loading,
    updateSettings,
    resetSettings,
    saveSettings: () => saveSettings(settings),
  };
};

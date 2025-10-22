import { useState } from "react";

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

export const useAppSettings = () => {
  const [settings, setSettings] = useState<AppSettings>({
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
  });

  const updateSettings = (category: keyof AppSettings, updates: any) => {
    setSettings((prev) => ({
      ...prev,
      [category]: { ...prev[category], ...updates },
    }));
  };

  const resetSettings = () => {
    setSettings({
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
    });
  };

  return {
    settings,
    updateSettings,
    resetSettings,
  };
};

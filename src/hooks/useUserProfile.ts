import { useState, useEffect } from "react";

export interface UserProfile {
  id: string;
  displayName: string;
  email: string;
  avatarUrl?: string;
  proficiencyLevel: "A1" | "A2" | "B1" | "B2" | "C1" | "C2";
  learningGoals: string[];
  joinedDate: Date;
  totalSessions: number;
  totalHours: number;
}

export const useUserProfile = () => {
  const [profile, setProfile] = useState<UserProfile>({
    id: "user-1",
    displayName: "English Learner",
    email: "user@example.com",
    proficiencyLevel: "B1",
    learningGoals: ["Improve pronunciation", "Expand vocabulary", "Practice daily conversations"],
    joinedDate: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000),
    totalSessions: 45,
    totalHours: 12.5,
  });

  const updateProfile = (updates: Partial<UserProfile>) => {
    setProfile((prev) => ({ ...prev, ...updates }));
  };

  const updateAvatar = (file: File) => {
    const url = URL.createObjectURL(file);
    updateProfile({ avatarUrl: url });
  };

  return {
    profile,
    updateProfile,
    updateAvatar,
  };
};

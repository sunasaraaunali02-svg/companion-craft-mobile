import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

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
  const { user } = useAuth();
  const { toast } = useToast();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchProfile();
      fetchStats();
    }
  }, [user]);

  const fetchProfile = async () => {
    if (!user) return;

    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();

    if (error) {
      console.error("Error fetching profile:", error);
      return;
    }

    if (data) {
      setProfile({
        id: data.id,
        displayName: data.display_name || "English Learner",
        email: user.email || "",
        avatarUrl: data.avatar_url || undefined,
        proficiencyLevel: (data.proficiency_level as any) || "B1",
        learningGoals: data.learning_goals || [],
        joinedDate: new Date(data.created_at),
        totalSessions: 0,
        totalHours: 0,
      });
    }
    setLoading(false);
  };

  const fetchStats = async () => {
    if (!user) return;

    const { data: sessions } = await supabase
      .from("practice_sessions")
      .select("duration")
      .eq("user_id", user.id);

    if (sessions) {
      const totalSessions = sessions.length;
      const totalMinutes = sessions.reduce((acc, s) => acc + (s.duration || 0), 0);
      const totalHours = totalMinutes / 60;

      setProfile((prev) => prev ? { ...prev, totalSessions, totalHours } : null);
    }
  };

  const updateProfile = async (updates: Partial<UserProfile>) => {
    if (!user) return;

    const dbUpdates: any = {};
    if (updates.displayName) dbUpdates.display_name = updates.displayName;
    if (updates.proficiencyLevel) dbUpdates.proficiency_level = updates.proficiencyLevel;
    if (updates.learningGoals) dbUpdates.learning_goals = updates.learningGoals;
    if (updates.avatarUrl !== undefined) dbUpdates.avatar_url = updates.avatarUrl;

    const { error } = await supabase
      .from("profiles")
      .update(dbUpdates)
      .eq("id", user.id);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to update profile",
        variant: "destructive",
      });
      return;
    }

    setProfile((prev) => prev ? { ...prev, ...updates } : null);
    toast({
      title: "Success",
      description: "Profile updated successfully",
    });
  };

  const updateAvatar = async (file: File) => {
    if (!user) return;

    const fileExt = file.name.split('.').pop();
    const filePath = `${user.id}/avatar.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from("avatars")
      .upload(filePath, file, { upsert: true });

    if (uploadError) {
      toast({
        title: "Error",
        description: "Failed to upload avatar",
        variant: "destructive",
      });
      return;
    }

    const { data } = supabase.storage
      .from("avatars")
      .getPublicUrl(filePath);

    await updateProfile({ avatarUrl: data.publicUrl });
  };

  return {
    profile,
    loading,
    updateProfile,
    updateAvatar,
  };
};

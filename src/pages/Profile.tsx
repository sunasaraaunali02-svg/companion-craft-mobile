import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useUserProfile } from "@/hooks/useUserProfile";
import { AvatarUpload } from "@/components/profile/AvatarUpload";
import { ProficiencySelector } from "@/components/profile/ProficiencySelector";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const Profile = () => {
  const { profile, updateProfile, updateAvatar } = useUserProfile();
  const { toast } = useToast();
  const [newGoal, setNewGoal] = useState("");

  const handleSave = () => {
    toast({
      title: "Profile updated",
      description: "Your profile has been successfully updated.",
    });
  };

  const addGoal = () => {
    if (newGoal.trim() && profile.learningGoals.length < 5) {
      updateProfile({
        learningGoals: [...profile.learningGoals, newGoal.trim()],
      });
      setNewGoal("");
    }
  };

  const removeGoal = (index: number) => {
    updateProfile({
      learningGoals: profile.learningGoals.filter((_, i) => i !== index),
    });
  };

  return (
    <div className="container max-w-4xl mx-auto p-4 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Profile</h1>
        <Button onClick={handleSave}>Save Changes</Button>
      </div>

      {/* Avatar and Basic Info */}
      <Card className="p-6">
        <AvatarUpload
          avatarUrl={profile.avatarUrl}
          displayName={profile.displayName}
          onUpload={updateAvatar}
        />

        <Separator className="my-6" />

        <div className="space-y-4">
          <div>
            <Label htmlFor="displayName">Display Name</Label>
            <Input
              id="displayName"
              value={profile.displayName}
              onChange={(e) => updateProfile({ displayName: e.target.value })}
              className="mt-2"
            />
          </div>

          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={profile.email}
              disabled
              className="mt-2 bg-muted"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Email cannot be changed
            </p>
          </div>
        </div>
      </Card>

      {/* Proficiency Level */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4">Language Proficiency</h2>
        <ProficiencySelector
          value={profile.proficiencyLevel}
          onChange={(level) => updateProfile({ proficiencyLevel: level })}
        />
      </Card>

      {/* Learning Goals */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4">Learning Goals</h2>
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {profile.learningGoals.map((goal, index) => (
              <Badge key={index} variant="secondary" className="gap-2">
                {goal}
                <button
                  onClick={() => removeGoal(index)}
                  className="hover:text-destructive"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
          </div>

          {profile.learningGoals.length < 5 && (
            <div className="flex gap-2">
              <Input
                placeholder="Add a new learning goal..."
                value={newGoal}
                onChange={(e) => setNewGoal(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addGoal()}
              />
              <Button onClick={addGoal}>Add</Button>
            </div>
          )}
          <p className="text-xs text-muted-foreground">
            You can add up to 5 learning goals
          </p>
        </div>
      </Card>

      {/* Account Statistics */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4">Account Information</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-muted-foreground">Member Since</p>
            <p className="font-medium">{profile.joinedDate.toLocaleDateString()}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Total Sessions</p>
            <p className="font-medium">{profile.totalSessions}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Practice Hours</p>
            <p className="font-medium">{profile.totalHours}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Current Level</p>
            <p className="font-medium">{profile.proficiencyLevel}</p>
          </div>
        </div>
      </Card>

      {/* Danger Zone */}
      <Card className="p-6 border-destructive">
        <h2 className="text-lg font-semibold text-destructive mb-4">Danger Zone</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Delete Account</p>
              <p className="text-sm text-muted-foreground">
                Permanently delete your account and all data
              </p>
            </div>
            <Button variant="destructive">Delete Account</Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Profile;

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Settings, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

const Profile = () => {
  return (
    <div className="container max-w-4xl mx-auto p-4 space-y-6">
      {/* Profile Header */}
      <Card className="p-6">
        <div className="flex items-center gap-4">
          <Avatar className="h-20 w-20">
            <AvatarFallback className="bg-primary text-primary-foreground text-2xl">
              JD
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <h1 className="text-2xl font-bold">John Doe</h1>
            <p className="text-muted-foreground">john.doe@email.com</p>
            <p className="text-sm text-primary mt-1">Intermediate (B1)</p>
          </div>
          <Button variant="ghost" size="icon" asChild>
            <Link to="/settings">
              <Settings className="h-5 w-5" />
            </Link>
          </Button>
        </div>
      </Card>

      {/* Learning Stats */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4">Learning Stats</h2>
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <p className="text-3xl font-bold text-primary">127</p>
            <p className="text-xs text-muted-foreground mt-1">Total Sessions</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-accent">45</p>
            <p className="text-xs text-muted-foreground mt-1">Hours Practiced</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-warning">7</p>
            <p className="text-xs text-muted-foreground mt-1">Day Streak</p>
          </div>
        </div>
      </Card>

      {/* Learning Goals */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4">Current Goals</h2>
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Daily Practice: 30 minutes</span>
              <span className="text-muted-foreground">18/30 min</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div className="bg-primary h-2 rounded-full" style={{ width: "60%" }} />
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Weekly Sessions: 5 sessions</span>
              <span className="text-muted-foreground">3/5 sessions</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div className="bg-accent h-2 rounded-full" style={{ width: "60%" }} />
            </div>
          </div>
        </div>
      </Card>

      {/* Preferences */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4">Preferences</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="notifications" className="text-base">
                Practice Reminders
              </Label>
              <p className="text-sm text-muted-foreground">
                Daily notifications for practice
              </p>
            </div>
            <Switch id="notifications" />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="dark-mode" className="text-base">
                Dark Mode
              </Label>
              <p className="text-sm text-muted-foreground">
                Switch between light and dark theme
              </p>
            </div>
            <Switch id="dark-mode" />
          </div>
        </div>
      </Card>

      {/* Account Settings */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4">Account</h2>
        <div className="space-y-2">
          <Link
            to="/settings"
            className="flex items-center justify-between p-3 hover:bg-muted rounded-lg transition-colors"
          >
            <span>Account Settings</span>
            <ChevronRight className="h-5 w-5 text-muted-foreground" />
          </Link>
          <Link
            to="/history"
            className="flex items-center justify-between p-3 hover:bg-muted rounded-lg transition-colors"
          >
            <span>Practice History</span>
            <ChevronRight className="h-5 w-5 text-muted-foreground" />
          </Link>
          <button className="flex items-center justify-between p-3 hover:bg-muted rounded-lg transition-colors w-full">
            <span>Help & Support</span>
            <ChevronRight className="h-5 w-5 text-muted-foreground" />
          </button>
          <button className="flex items-center justify-between p-3 hover:bg-muted rounded-lg transition-colors w-full text-destructive">
            <span>Sign Out</span>
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </Card>
    </div>
  );
};

export default Profile;

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

const Settings = () => {
  return (
    <div className="container max-w-4xl mx-auto p-4 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold mb-2">Settings</h1>
        <p className="text-muted-foreground">
          Customize your learning experience
        </p>
      </div>

      {/* Audio Settings */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4">Audio Settings</h2>
        <div className="space-y-6">
          <div className="space-y-2">
            <Label>Microphone Input</Label>
            <Select defaultValue="default">
              <SelectTrigger>
                <SelectValue placeholder="Select microphone" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="default">Default Microphone</SelectItem>
                <SelectItem value="external">External Microphone</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Audio Output</Label>
            <Select defaultValue="default">
              <SelectTrigger>
                <SelectValue placeholder="Select speaker" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="default">Default Speaker</SelectItem>
                <SelectItem value="headphones">Headphones</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <Label>Speech Recognition Sensitivity</Label>
              <span className="text-sm text-muted-foreground">Medium</span>
            </div>
            <Slider defaultValue={[50]} max={100} step={1} />
          </div>
        </div>
      </Card>

      {/* Learning Preferences */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4">Learning Preferences</h2>
        <div className="space-y-6">
          <div className="space-y-2">
            <Label>Proficiency Level</Label>
            <Select defaultValue="intermediate">
              <SelectTrigger>
                <SelectValue placeholder="Select level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="beginner">Beginner (A1-A2)</SelectItem>
                <SelectItem value="intermediate">Intermediate (B1-B2)</SelectItem>
                <SelectItem value="advanced">Advanced (C1-C2)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <Label>Grammar Correction Strictness</Label>
              <span className="text-sm text-muted-foreground">Standard</span>
            </div>
            <Slider defaultValue={[50]} max={100} step={1} />
            <p className="text-xs text-muted-foreground">
              Higher values mean more detailed corrections
            </p>
          </div>

          <div className="space-y-2">
            <Label>AI Conversation Style</Label>
            <Select defaultValue="balanced">
              <SelectTrigger>
                <SelectValue placeholder="Select style" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="formal">Formal</SelectItem>
                <SelectItem value="balanced">Balanced</SelectItem>
                <SelectItem value="casual">Casual</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </Card>

      {/* Notifications */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4">Notifications</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="daily-reminder">Daily Practice Reminders</Label>
              <p className="text-sm text-muted-foreground">
                Get notified to practice every day
              </p>
            </div>
            <Switch id="daily-reminder" defaultChecked />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="achievement">Achievement Notifications</Label>
              <p className="text-sm text-muted-foreground">
                Celebrate your milestones
              </p>
            </div>
            <Switch id="achievement" defaultChecked />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="weekly-report">Weekly Progress Reports</Label>
              <p className="text-sm text-muted-foreground">
                Summary of your weekly progress
              </p>
            </div>
            <Switch id="weekly-report" defaultChecked />
          </div>
        </div>
      </Card>

      {/* Data & Privacy */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4">Data & Privacy</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="save-recordings">Save Practice Recordings</Label>
              <p className="text-sm text-muted-foreground">
                Store audio for review and improvement
              </p>
            </div>
            <Switch id="save-recordings" defaultChecked />
          </div>
          <Separator />
          <div className="space-y-2">
            <Button variant="outline" className="w-full justify-start">
              Export My Data
            </Button>
            <Button variant="outline" className="w-full justify-start">
              Clear Practice History
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start text-destructive"
            >
              Delete Account
            </Button>
          </div>
        </div>
      </Card>

      {/* About */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4">About</h2>
        <div className="space-y-2 text-sm text-muted-foreground">
          <p>EnglishTutor v1.0.0</p>
          <Button variant="link" className="h-auto p-0 text-sm">
            Terms of Service
          </Button>
          <Button variant="link" className="h-auto p-0 text-sm">
            Privacy Policy
          </Button>
          <Button variant="link" className="h-auto p-0 text-sm">
            Help & Support
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default Settings;

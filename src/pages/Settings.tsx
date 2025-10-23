import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAppSettings } from "@/hooks/useAppSettings";
import { useToast } from "@/hooks/use-toast";
import { Volume2, Mic, Brain, Bell, Shield, RotateCcw } from "lucide-react";

const Settings = () => {
  const { settings, loading, updateSettings, resetSettings, saveSettings } = useAppSettings();
  const { toast } = useToast();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  const handleSave = () => {
    saveSettings();
  };

  const handleReset = () => {
    resetSettings();
    toast({
      title: "Settings reset",
      description: "All settings have been restored to defaults.",
    });
  };

  return (
    <div className="container max-w-4xl mx-auto p-4 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Settings</h1>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleReset}>
            <RotateCcw className="h-4 w-4 mr-2" />
            Reset
          </Button>
          <Button onClick={handleSave}>Save Changes</Button>
        </div>
      </div>

      <Tabs defaultValue="audio" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="audio">
            <Volume2 className="h-4 w-4 mr-2" />
            Audio
          </TabsTrigger>
          <TabsTrigger value="speech">
            <Mic className="h-4 w-4 mr-2" />
            Speech
          </TabsTrigger>
          <TabsTrigger value="ai">
            <Brain className="h-4 w-4 mr-2" />
            AI
          </TabsTrigger>
          <TabsTrigger value="notifications">
            <Bell className="h-4 w-4 mr-2" />
            Alerts
          </TabsTrigger>
          <TabsTrigger value="privacy">
            <Shield className="h-4 w-4 mr-2" />
            Privacy
          </TabsTrigger>
        </TabsList>

        {/* Audio Settings */}
        <TabsContent value="audio" className="space-y-4">
          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-4">Audio Configuration</h2>
            <div className="space-y-6">
              <div>
                <Label htmlFor="input-device">Input Device</Label>
                <Select
                  value={settings.audio.inputDevice}
                  onValueChange={(value) => updateSettings("audio", { inputDevice: value })}
                >
                  <SelectTrigger id="input-device" className="mt-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="default">Default Microphone</SelectItem>
                    <SelectItem value="builtin">Built-in Microphone</SelectItem>
                    <SelectItem value="external">External Microphone</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="output-device">Output Device</Label>
                <Select
                  value={settings.audio.outputDevice}
                  onValueChange={(value) => updateSettings("audio", { outputDevice: value })}
                >
                  <SelectTrigger id="output-device" className="mt-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="default">Default Speaker</SelectItem>
                    <SelectItem value="builtin">Built-in Speaker</SelectItem>
                    <SelectItem value="headphones">Headphones</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <Label>Input Sensitivity</Label>
                  <span className="text-sm text-muted-foreground">
                    {settings.audio.inputSensitivity}%
                  </span>
                </div>
                <Slider
                  value={[settings.audio.inputSensitivity]}
                  onValueChange={(value) => updateSettings("audio", { inputSensitivity: value[0] })}
                  max={100}
                  step={1}
                />
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* Speech Recognition Settings */}
        <TabsContent value="speech" className="space-y-4">
          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-4">Speech Recognition</h2>
            <div className="space-y-6">
              <div>
                <Label htmlFor="language">Recognition Language</Label>
                <Select
                  value={settings.speech.language}
                  onValueChange={(value) => updateSettings("speech", { language: value })}
                >
                  <SelectTrigger id="language" className="mt-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en-US">English (US)</SelectItem>
                    <SelectItem value="en-GB">English (UK)</SelectItem>
                    <SelectItem value="en-AU">English (Australia)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <Label>Recognition Sensitivity</Label>
                  <span className="text-sm text-muted-foreground">
                    {settings.speech.recognitionSensitivity}%
                  </span>
                </div>
                <Slider
                  value={[settings.speech.recognitionSensitivity]}
                  onValueChange={(value) =>
                    updateSettings("speech", { recognitionSensitivity: value[0] })
                  }
                  max={100}
                  step={1}
                />
                <p className="text-xs text-muted-foreground mt-2">
                  Higher sensitivity captures more speech but may include background noise
                </p>
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* AI Settings */}
        <TabsContent value="ai" className="space-y-4">
          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-4">AI Behavior</h2>
            <div className="space-y-6">
              <div>
                <Label htmlFor="grammar-strictness">Grammar Correction Strictness</Label>
                <Select
                  value={settings.grammar.strictnessLevel}
                  onValueChange={(value) =>
                    updateSettings("grammar", { strictnessLevel: value })
                  }
                >
                  <SelectTrigger id="grammar-strictness" className="mt-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="lenient">Lenient - Major errors only</SelectItem>
                    <SelectItem value="balanced">Balanced - Common mistakes</SelectItem>
                    <SelectItem value="strict">Strict - All errors</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="ai-style">Conversation Style</Label>
                <Select
                  value={settings.conversation.aiStyle}
                  onValueChange={(value) =>
                    updateSettings("conversation", { aiStyle: value })
                  }
                >
                  <SelectTrigger id="ai-style" className="mt-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="formal">Formal - Professional tone</SelectItem>
                    <SelectItem value="neutral">Neutral - Balanced approach</SelectItem>
                    <SelectItem value="casual">Casual - Friendly and relaxed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* Notifications Settings */}
        <TabsContent value="notifications" className="space-y-4">
          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-4">Notification Preferences</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Practice Reminders</Label>
                  <p className="text-sm text-muted-foreground">
                    Daily reminders to practice English
                  </p>
                </div>
                <Switch
                  checked={settings.notifications.practiceReminders}
                  onCheckedChange={(checked) =>
                    updateSettings("notifications", { practiceReminders: checked })
                  }
                />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div>
                  <Label>Achievement Alerts</Label>
                  <p className="text-sm text-muted-foreground">
                    Notifications when you unlock achievements
                  </p>
                </div>
                <Switch
                  checked={settings.notifications.achievementAlerts}
                  onCheckedChange={(checked) =>
                    updateSettings("notifications", { achievementAlerts: checked })
                  }
                />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div>
                  <Label>Weekly Reports</Label>
                  <p className="text-sm text-muted-foreground">
                    Weekly summary of your progress
                  </p>
                </div>
                <Switch
                  checked={settings.notifications.weeklyReports}
                  onCheckedChange={(checked) =>
                    updateSettings("notifications", { weeklyReports: checked })
                  }
                />
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* Privacy Settings */}
        <TabsContent value="privacy" className="space-y-4">
          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-4">Privacy & Data</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Save Conversations</Label>
                  <p className="text-sm text-muted-foreground">
                    Store conversation history for review
                  </p>
                </div>
                <Switch
                  checked={settings.privacy.saveConversations}
                  onCheckedChange={(checked) =>
                    updateSettings("privacy", { saveConversations: checked })
                  }
                />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div>
                  <Label>Share Analytics</Label>
                  <p className="text-sm text-muted-foreground">
                    Help improve the app with anonymous usage data
                  </p>
                </div>
                <Switch
                  checked={settings.privacy.shareAnalytics}
                  onCheckedChange={(checked) =>
                    updateSettings("privacy", { shareAnalytics: checked })
                  }
                />
              </div>

              <Separator />

              <div className="pt-4">
                <h3 className="font-semibold mb-2">Legal</h3>
                <div className="space-y-2">
                  <Button variant="link" className="h-auto p-0 text-primary">
                    Privacy Policy
                  </Button>
                  <br />
                  <Button variant="link" className="h-auto p-0 text-primary">
                    Terms of Service
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;

import { Card } from "@/components/ui/card";
import { useProgressData } from "@/hooks/useProgressData";
import { AchievementBadge } from "@/components/progress/AchievementBadge";
import { StreakCalendar } from "@/components/progress/StreakCalendar";
import { Button } from "@/components/ui/button";
import { Download, TrendingUp, Clock, Target } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress as ProgressBar } from "@/components/ui/progress";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";

const Progress = () => {
  const { stats, accuracyData, topicPerformance, achievements } = useProgressData();

  // Generate mock calendar data
  const generateCalendarData = () => {
    const days = [];
    for (let i = 29; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      days.push({
        date,
        completed: Math.random() > 0.3,
        sessionsCount: Math.floor(Math.random() * 3),
      });
    }
    return days;
  };

  const handleExport = () => {
    const report = `
EnglishTutor Progress Report
============================
Generated: ${new Date().toLocaleDateString()}

Overall Statistics:
- Average Accuracy: ${stats.averageAccuracy}%
- Total Practice Hours: ${stats.totalHours}
- Total Sessions: ${stats.totalSessions}
- Current Streak: ${stats.currentStreak} days

Topic Performance:
${topicPerformance.map(t => `- ${t.topic}: ${t.accuracy}% (${t.sessions} sessions)`).join("\n")}

Recent Achievements:
${achievements.map(a => `- ${a.title}: ${a.description}`).join("\n")}
    `.trim();

    const blob = new Blob([report], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `englishtutor-progress-${new Date().toISOString().split("T")[0]}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="container max-w-4xl mx-auto p-4 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Your Progress</h1>
        <Button variant="outline" size="sm" onClick={handleExport}>
          <Download className="h-4 w-4 mr-2" />
          Export Report
        </Button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-full bg-accent/20 flex items-center justify-center">
              <TrendingUp className="h-6 w-6 text-accent" />
            </div>
            <div>
              <p className="text-2xl font-bold">{stats.averageAccuracy}%</p>
              <p className="text-xs text-muted-foreground">Avg Accuracy</p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center">
              <Clock className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold">{stats.totalHours}</p>
              <p className="text-xs text-muted-foreground">Hours Practiced</p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-full bg-warning/20 flex items-center justify-center">
              <Target className="h-6 w-6 text-warning" />
            </div>
            <div>
              <p className="text-2xl font-bold">{stats.totalSessions}</p>
              <p className="text-xs text-muted-foreground">Total Sessions</p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-full bg-secondary/20 flex items-center justify-center">
              <span className="text-2xl">🔥</span>
            </div>
            <div>
              <p className="text-2xl font-bold">{stats.currentStreak}</p>
              <p className="text-xs text-muted-foreground">Day Streak</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Calendar */}
      <StreakCalendar days={generateCalendarData()} />

      {/* Detailed Charts */}
      <Tabs defaultValue="accuracy" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="accuracy">Accuracy</TabsTrigger>
          <TabsTrigger value="time">Practice Time</TabsTrigger>
          <TabsTrigger value="topics">Topics</TabsTrigger>
        </TabsList>

        <TabsContent value="accuracy" className="space-y-4">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">30-Day Accuracy Trend</h3>
            <ChartContainer
              config={{
                accuracy: {
                  label: "Accuracy",
                  color: "hsl(var(--primary))",
                },
              }}
              className="h-[300px]"
            >
              <BarChart data={accuracyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="accuracy" fill="var(--color-accuracy)" radius={8} />
              </BarChart>
            </ChartContainer>
          </Card>
        </TabsContent>

        <TabsContent value="time" className="space-y-4">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Weekly Practice Time</h3>
            <div className="space-y-4">
              {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map(
                (day, index) => {
                  const minutes = Math.floor(Math.random() * 60 + 15);
                  return (
                    <div key={day}>
                      <div className="flex justify-between text-sm mb-2">
                        <span>{day}</span>
                        <span className="text-muted-foreground">{minutes} min</span>
                      </div>
                      <ProgressBar value={(minutes / 75) * 100} />
                    </div>
                  );
                }
              )}
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="topics" className="space-y-4">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Topic Performance</h3>
            <div className="space-y-4">
              {topicPerformance.map((topic) => (
                <div key={topic.topic}>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="font-medium">{topic.topic}</span>
                    <span className="text-muted-foreground">
                      {topic.accuracy}% · {topic.sessions} sessions
                    </span>
                  </div>
                  <ProgressBar value={topic.accuracy} />
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Recent Achievements */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Recent Achievements</h3>
        <div className="space-y-3">
          {achievements.map((achievement) => (
            <AchievementBadge key={achievement.id} achievement={achievement} />
          ))}
        </div>
      </Card>
    </div>
  );
};

export default Progress;

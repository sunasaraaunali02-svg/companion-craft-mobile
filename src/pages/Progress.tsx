import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, TrendingUp, Clock, Target } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Progress = () => {
  return (
    <div className="container max-w-4xl mx-auto p-4 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Your Progress</h1>
        <Button variant="outline" size="sm">
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
              <p className="text-2xl font-bold">85%</p>
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
              <p className="text-2xl font-bold">45</p>
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
              <p className="text-2xl font-bold">127</p>
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
              <p className="text-2xl font-bold">7</p>
              <p className="text-xs text-muted-foreground">Day Streak</p>
            </div>
          </div>
        </Card>
      </div>

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
            <div className="h-[200px] flex items-end justify-between gap-2">
              {Array.from({ length: 30 }).map((_, i) => (
                <div
                  key={i}
                  className="flex-1 bg-primary/20 rounded-t hover:bg-primary/40 transition-colors"
                  style={{ height: `${Math.random() * 80 + 20}%` }}
                />
              ))}
            </div>
            <div className="flex justify-between mt-2 text-xs text-muted-foreground">
              <span>30 days ago</span>
              <span>Today</span>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="time" className="space-y-4">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Weekly Practice Time</h3>
            <div className="space-y-3">
              {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, i) => (
                <div key={day} className="flex items-center gap-3">
                  <span className="text-sm font-medium w-12">{day}</span>
                  <div className="flex-1 bg-muted rounded-full h-8 overflow-hidden">
                    <div
                      className="bg-primary h-full flex items-center justify-end pr-2"
                      style={{ width: `${Math.random() * 80 + 20}%` }}
                    >
                      <span className="text-xs text-primary-foreground font-medium">
                        {Math.floor(Math.random() * 45 + 15)}m
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="topics" className="space-y-4">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Topic Performance</h3>
            <div className="space-y-4">
              {[
                { topic: "Daily Life", score: 92, sessions: 45 },
                { topic: "Business", score: 85, sessions: 32 },
                { topic: "Travel", score: 88, sessions: 28 },
                { topic: "Technology", score: 81, sessions: 22 },
              ].map((item) => (
                <div key={item.topic} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">{item.topic}</span>
                    <span className="text-muted-foreground">
                      {item.sessions} sessions
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex-1 bg-muted rounded-full h-2 overflow-hidden">
                      <div
                        className="bg-accent h-full"
                        style={{ width: `${item.score}%` }}
                      />
                    </div>
                    <span className="text-sm font-bold text-accent">
                      {item.score}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Recent Achievements */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Recent Achievements</h3>
        <div className="grid grid-cols-2 gap-4">
          {[
            { icon: "🎯", title: "Perfect Week", desc: "7-day streak" },
            { icon: "⭐", title: "Grammar Master", desc: "95% accuracy" },
            { icon: "💬", title: "Conversation Pro", desc: "50 conversations" },
            { icon: "🚀", title: "Early Bird", desc: "Practice at 6 AM" },
          ].map((achievement) => (
            <div
              key={achievement.title}
              className="p-4 bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg text-center"
            >
              <div className="text-3xl mb-2">{achievement.icon}</div>
              <p className="font-semibold text-sm">{achievement.title}</p>
              <p className="text-xs text-muted-foreground">{achievement.desc}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default Progress;

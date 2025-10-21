import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mic, TrendingUp, Clock, MessageCircle, Target, Flame } from "lucide-react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";

const Home = () => {
  // Mock data - in production, this would come from your state management
  const userStats = {
    streak: 7,
    accuracy: 85,
    minutesToday: 45,
    totalSessions: 127,
  };

  const recentSessions = [
    { id: 1, topic: "Daily Life Practice", time: "2 hours ago", score: 92 },
    { id: 2, topic: "Business Conversation", time: "Yesterday", score: 88 },
    { id: 3, topic: "Travel Vocabulary", time: "2 days ago", score: 94 },
  ];

  const suggestedTopics = [
    "Travel", "Business", "Technology", "Health", "Culture", "Food"
  ];

  return (
    <div className="container max-w-4xl mx-auto p-4 space-y-6">
      {/* Welcome Banner */}
      <Card className="p-6 bg-gradient-to-br from-primary/10 via-primary/5 to-accent/10 border-primary/20">
        <div className="flex items-start justify-between mb-2">
          <div>
            <h1 className="text-2xl font-bold mb-1">Welcome back!</h1>
            <p className="text-muted-foreground">
              Ready to practice your English speaking skills today?
            </p>
          </div>
          <Badge variant="secondary" className="gap-1 px-2 py-1">
            <Flame className="h-3 w-3 text-warning" />
            {userStats.streak} day streak
          </Badge>
        </div>
      </Card>

      {/* Quick Actions */}
      <div className="grid sm:grid-cols-2 gap-4">
        <Link to="/practice" className="block">
          <Card className="p-6 hover:shadow-lg transition-all hover:scale-[1.02] cursor-pointer bg-gradient-to-br from-primary/5 to-transparent">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center">
                <Mic className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">Practice Speaking</h3>
                <p className="text-sm text-muted-foreground">Start a new session</p>
              </div>
            </div>
          </Card>
        </Link>

        <Link to="/conversation" className="block">
          <Card className="p-6 hover:shadow-lg transition-all hover:scale-[1.02] cursor-pointer bg-gradient-to-br from-accent/5 to-transparent">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-accent/20 flex items-center justify-center">
                <MessageCircle className="h-6 w-6 text-accent" />
              </div>
              <div>
                <h3 className="font-semibold">AI Conversation</h3>
                <p className="text-sm text-muted-foreground">Chat with AI tutor</p>
              </div>
            </div>
          </Card>
        </Link>
      </div>

      {/* Daily Stats */}
      <div className="grid grid-cols-3 gap-4">
        <Card className="p-4 text-center hover:shadow-md transition-shadow">
          <div className="flex flex-col items-center gap-2">
            <div className="h-10 w-10 rounded-full bg-accent/20 flex items-center justify-center">
              <TrendingUp className="h-5 w-5 text-accent" />
            </div>
            <div className="text-2xl font-bold text-accent">{userStats.accuracy}%</div>
            <div className="text-xs text-muted-foreground">Avg Accuracy</div>
          </div>
        </Card>
        <Card className="p-4 text-center hover:shadow-md transition-shadow">
          <div className="flex flex-col items-center gap-2">
            <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
              <Clock className="h-5 w-5 text-primary" />
            </div>
            <div className="text-2xl font-bold text-primary">{userStats.minutesToday}</div>
            <div className="text-xs text-muted-foreground">Min Today</div>
          </div>
        </Card>
        <Card className="p-4 text-center hover:shadow-md transition-shadow">
          <div className="flex flex-col items-center gap-2">
            <div className="h-10 w-10 rounded-full bg-secondary/20 flex items-center justify-center">
              <Target className="h-5 w-5 text-secondary" />
            </div>
            <div className="text-2xl font-bold text-secondary">{userStats.totalSessions}</div>
            <div className="text-xs text-muted-foreground">Sessions</div>
          </div>
        </Card>
      </div>

      {/* Recent Sessions */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Recent Sessions</h2>
          <Link to="/history" className="text-sm text-primary hover:underline font-medium">
            View All →
          </Link>
        </div>
        <div className="space-y-3">
          {recentSessions.map((session) => (
            <div
              key={session.id}
              className="flex items-center justify-between p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-3 min-w-0 flex-1">
                <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                  <Mic className="h-5 w-5 text-primary" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-medium truncate">{session.topic}</p>
                  <p className="text-sm text-muted-foreground">{session.time}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <Badge variant="secondary" className="gap-1">
                  <TrendingUp className="h-3 w-3" />
                  {session.score}%
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Suggested Topics */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4">Suggested Topics Today</h2>
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {suggestedTopics.map((topic) => (
            <Link key={topic} to="/practice">
              <Button
                variant="outline"
                className="whitespace-nowrap hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                {topic}
              </Button>
            </Link>
          ))}
        </div>
      </Card>

      {/* Quick Tip */}
      <Card className="p-6 bg-gradient-to-br from-accent/5 to-transparent border-accent/20">
        <div className="flex items-start gap-3">
          <div className="h-10 w-10 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
            <span className="text-xl">💡</span>
          </div>
          <div>
            <h3 className="font-semibold mb-1">Daily Tip</h3>
            <p className="text-sm text-muted-foreground">
              Practice for at least 15 minutes daily to maintain your streak and see
              consistent improvement in your speaking skills.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Home;

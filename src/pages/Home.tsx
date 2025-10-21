import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mic, TrendingUp, Clock } from "lucide-react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="container max-w-4xl mx-auto p-4 space-y-6">
      {/* Welcome Banner */}
      <Card className="p-6 bg-gradient-to-br from-primary/10 to-accent/10">
        <h1 className="text-2xl font-bold mb-2">Welcome back!</h1>
        <p className="text-muted-foreground">
          Ready to practice your English speaking skills today?
        </p>
      </Card>

      {/* Quick Start */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4">Quick Start</h2>
        <Link to="/practice">
          <Button className="w-full h-14 text-lg" size="lg">
            <Mic className="mr-2 h-5 w-5" />
            Start Practice Session
          </Button>
        </Link>
      </Card>

      {/* Daily Stats */}
      <div className="grid grid-cols-3 gap-4">
        <Card className="p-4 text-center">
          <div className="text-3xl font-bold text-primary mb-1">7</div>
          <div className="text-xs text-muted-foreground">Day Streak</div>
        </Card>
        <Card className="p-4 text-center">
          <div className="text-3xl font-bold text-accent mb-1">85%</div>
          <div className="text-xs text-muted-foreground">Accuracy</div>
        </Card>
        <Card className="p-4 text-center">
          <div className="text-3xl font-bold text-secondary mb-1">45</div>
          <div className="text-xs text-muted-foreground">Minutes</div>
        </Card>
      </div>

      {/* Recent Sessions */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Recent Sessions</h2>
          <Link to="/history" className="text-sm text-primary hover:underline">
            View All
          </Link>
        </div>
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="flex items-center justify-between p-3 bg-muted/50 rounded-lg"
            >
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
                  <Mic className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium">Daily Life Practice</p>
                  <p className="text-sm text-muted-foreground">2 hours ago</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-accent" />
                <span className="text-sm font-medium">92%</span>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Suggested Topics */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4">Suggested Topics Today</h2>
        <div className="flex gap-2 overflow-x-auto pb-2">
          {["Travel", "Business", "Technology", "Health", "Culture"].map((topic) => (
            <Button key={topic} variant="outline" className="whitespace-nowrap">
              {topic}
            </Button>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default Home;

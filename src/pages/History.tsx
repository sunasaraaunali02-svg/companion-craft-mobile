import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Filter, Mic, TrendingUp, Calendar } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const History = () => {
  return (
    <div className="container max-w-4xl mx-auto p-4 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold mb-2">Practice History</h1>
        <p className="text-muted-foreground">View and review your past sessions</p>
      </div>

      {/* Search and Filter */}
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search sessions..." className="pl-10" />
        </div>
        <Select defaultValue="all">
          <SelectTrigger className="w-[140px]">
            <Filter className="h-4 w-4 mr-2" />
            <SelectValue placeholder="Filter" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Topics</SelectItem>
            <SelectItem value="daily">Daily Life</SelectItem>
            <SelectItem value="business">Business</SelectItem>
            <SelectItem value="travel">Travel</SelectItem>
            <SelectItem value="tech">Technology</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Session List */}
      <div className="space-y-3">
        {[
          {
            id: 1,
            topic: "Daily Life Practice",
            date: "Today, 2:30 PM",
            duration: "15 min",
            accuracy: 92,
            type: "practice",
          },
          {
            id: 2,
            topic: "Business Conversation",
            date: "Yesterday, 6:45 PM",
            duration: "22 min",
            accuracy: 88,
            type: "conversation",
          },
          {
            id: 3,
            topic: "Travel Vocabulary",
            date: "2 days ago",
            duration: "18 min",
            accuracy: 94,
            type: "practice",
          },
          {
            id: 4,
            topic: "Technology Discussion",
            date: "3 days ago",
            duration: "25 min",
            accuracy: 85,
            type: "conversation",
          },
          {
            id: 5,
            topic: "Daily Life Practice",
            date: "4 days ago",
            duration: "12 min",
            accuracy: 90,
            type: "practice",
          },
        ].map((session) => (
          <Card
            key={session.id}
            className="p-4 hover:shadow-md transition-shadow cursor-pointer"
          >
            <div className="flex items-start gap-4">
              <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                <Mic className="h-6 w-6 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div>
                    <h3 className="font-semibold truncate">{session.topic}</h3>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                      <Calendar className="h-3 w-3" />
                      <span>{session.date}</span>
                      <span>•</span>
                      <span>{session.duration}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-accent flex-shrink-0">
                    <TrendingUp className="h-4 w-4" />
                    <span className="text-sm font-bold">{session.accuracy}%</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="h-8 text-xs">
                    View Details
                  </Button>
                  <Button variant="ghost" size="sm" className="h-8 text-xs">
                    Review
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Load More */}
      <div className="text-center">
        <Button variant="outline">Load More Sessions</Button>
      </div>
    </div>
  );
};

export default History;

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useSessionHistory } from "@/hooks/useSessionHistory";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Star, Trash2, Download, Clock, Target } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

const History = () => {
  const {
    sessions,
    searchQuery,
    setSearchQuery,
    topicFilter,
    setTopicFilter,
    sortBy,
    setSortBy,
    toggleFavorite,
    deleteSession,
  } = useSessionHistory();

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  const exportSession = (session: any) => {
    const content = `
EnglishTutor Session Export
===========================
Date: ${session.date.toLocaleString()}
Topic: ${session.topic}
Duration: ${formatDuration(session.duration)}
Accuracy: ${session.accuracy}%
Grammar Errors: ${session.grammarErrors}

Transcript:
${session.transcript}
    `.trim();

    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `session-${session.id}-${session.date.toISOString().split("T")[0]}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="container max-w-4xl mx-auto p-4 space-y-6">
      <h1 className="text-2xl font-bold">Session History</h1>

      {/* Filters and Search */}
      <Card className="p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search transcripts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          <Select value={topicFilter} onValueChange={setTopicFilter}>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Filter by topic" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Topics</SelectItem>
              <SelectItem value="Daily Life">Daily Life</SelectItem>
              <SelectItem value="Business">Business</SelectItem>
              <SelectItem value="Travel">Travel</SelectItem>
              <SelectItem value="Technology">Technology</SelectItem>
            </SelectContent>
          </Select>

          <Select value={sortBy} onValueChange={(value: any) => setSortBy(value)}>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="date">Date</SelectItem>
              <SelectItem value="accuracy">Accuracy</SelectItem>
              <SelectItem value="duration">Duration</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </Card>

      {/* Sessions List */}
      <div className="space-y-4">
        {sessions.length === 0 ? (
          <Card className="p-12 text-center">
            <p className="text-muted-foreground">No sessions found matching your filters.</p>
          </Card>
        ) : (
          sessions.map((session) => (
            <Card key={session.id} className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 space-y-3">
                  <div className="flex items-center gap-3 flex-wrap">
                    <h3 className="font-semibold text-lg">{session.topic}</h3>
                    <Badge variant="secondary">{session.date.toLocaleDateString()}</Badge>
                    {session.isFavorite && (
                      <Star className="h-4 w-4 fill-warning text-warning" />
                    )}
                  </div>

                  <div className="flex items-center gap-6 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      {formatDuration(session.duration)}
                    </div>
                    <div className="flex items-center gap-2">
                      <Target className="h-4 w-4" />
                      {session.accuracy}% accuracy
                    </div>
                    <div>
                      {session.grammarErrors} {session.grammarErrors === 1 ? "error" : "errors"}
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {session.transcript}
                  </p>
                </div>

                <div className="flex flex-col gap-2">
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => toggleFavorite(session.id)}
                  >
                    <Star
                      className={`h-4 w-4 ${
                        session.isFavorite ? "fill-warning text-warning" : ""
                      }`}
                    />
                  </Button>

                  <Dialog>
                    <DialogTrigger asChild>
                      <Button size="icon" variant="ghost">
                        <Search className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>{session.topic} Session</DialogTitle>
                        <DialogDescription>
                          {session.date.toLocaleString()} · {formatDuration(session.duration)}
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm text-muted-foreground">Accuracy</p>
                            <p className="text-2xl font-bold">{session.accuracy}%</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Grammar Errors</p>
                            <p className="text-2xl font-bold">{session.grammarErrors}</p>
                          </div>
                        </div>
                        <div>
                          <p className="text-sm font-medium mb-2">Full Transcript</p>
                          <ScrollArea className="h-[300px] rounded-md border p-4">
                            <p className="text-sm">{session.transcript}</p>
                          </ScrollArea>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>

                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => exportSession(session)}
                  >
                    <Download className="h-4 w-4" />
                  </Button>

                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => deleteSession(session.id)}
                  >
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>

      {/* Summary Stats */}
      {sessions.length > 0 && (
        <Card className="p-6">
          <h3 className="font-semibold mb-4">Session Summary</h3>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Total Sessions</p>
              <p className="text-2xl font-bold">{sessions.length}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Average Accuracy</p>
              <p className="text-2xl font-bold">
                {Math.round(
                  sessions.reduce((acc, s) => acc + s.accuracy, 0) / sessions.length
                )}%
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Time</p>
              <p className="text-2xl font-bold">
                {formatDuration(sessions.reduce((acc, s) => acc + s.duration, 0))}
              </p>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};

export default History;

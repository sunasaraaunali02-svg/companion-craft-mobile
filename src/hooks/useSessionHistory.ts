import { useState, useMemo } from "react";

export interface HistorySession {
  id: string;
  topic: string;
  date: Date;
  duration: number; // in seconds
  accuracy: number;
  grammarErrors: number;
  transcript: string;
  isFavorite: boolean;
}

export const useSessionHistory = () => {
  const [sessions, setSessions] = useState<HistorySession[]>([
    {
      id: "1",
      topic: "Daily Life",
      date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      duration: 420,
      accuracy: 92,
      grammarErrors: 3,
      transcript: "I wake up at 7 AM every morning. Then I have breakfast and go to work.",
      isFavorite: true,
    },
    {
      id: "2",
      topic: "Business",
      date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      duration: 600,
      accuracy: 88,
      grammarErrors: 5,
      transcript: "Let me discuss the quarterly results with the team.",
      isFavorite: false,
    },
    {
      id: "3",
      topic: "Travel",
      date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      duration: 480,
      accuracy: 85,
      grammarErrors: 7,
      transcript: "I love traveling to different countries and experiencing new cultures.",
      isFavorite: false,
    },
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [topicFilter, setTopicFilter] = useState<string>("all");
  const [sortBy, setSortBy] = useState<"date" | "accuracy" | "duration">("date");

  const filteredSessions = useMemo(() => {
    let filtered = sessions;

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter((session) =>
        session.transcript.toLowerCase().includes(searchQuery.toLowerCase()) ||
        session.topic.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply topic filter
    if (topicFilter !== "all") {
      filtered = filtered.filter((session) => session.topic === topicFilter);
    }

    // Apply sorting
    filtered = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case "date":
          return b.date.getTime() - a.date.getTime();
        case "accuracy":
          return b.accuracy - a.accuracy;
        case "duration":
          return b.duration - a.duration;
        default:
          return 0;
      }
    });

    return filtered;
  }, [sessions, searchQuery, topicFilter, sortBy]);

  const toggleFavorite = (sessionId: string) => {
    setSessions((prev) =>
      prev.map((session) =>
        session.id === sessionId
          ? { ...session, isFavorite: !session.isFavorite }
          : session
      )
    );
  };

  const deleteSession = (sessionId: string) => {
    setSessions((prev) => prev.filter((session) => session.id !== sessionId));
  };

  return {
    sessions: filteredSessions,
    searchQuery,
    setSearchQuery,
    topicFilter,
    setTopicFilter,
    sortBy,
    setSortBy,
    toggleFavorite,
    deleteSession,
  };
};

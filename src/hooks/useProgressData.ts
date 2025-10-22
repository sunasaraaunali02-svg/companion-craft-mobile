import { useState, useEffect } from "react";

export interface ProgressStats {
  averageAccuracy: number;
  totalHours: number;
  totalSessions: number;
  currentStreak: number;
}

export interface AccuracyDataPoint {
  date: string;
  accuracy: number;
}

export interface TopicPerformance {
  topic: string;
  accuracy: number;
  sessions: number;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  type: "streak" | "accuracy" | "sessions" | "milestone";
  unlockedAt: Date;
}

export const useProgressData = () => {
  const [stats, setStats] = useState<ProgressStats>({
    averageAccuracy: 87,
    totalHours: 12.5,
    totalSessions: 45,
    currentStreak: 7,
  });

  const [accuracyData, setAccuracyData] = useState<AccuracyDataPoint[]>([]);
  const [topicPerformance, setTopicPerformance] = useState<TopicPerformance[]>([]);
  const [achievements, setAchievements] = useState<Achievement[]>([]);

  useEffect(() => {
    // Mock accuracy data for the last 30 days
    const generateAccuracyData = () => {
      const data: AccuracyDataPoint[] = [];
      for (let i = 29; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        data.push({
          date: date.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
          accuracy: 70 + Math.random() * 30,
        });
      }
      return data;
    };

    // Mock topic performance data
    const generateTopicData = (): TopicPerformance[] => [
      { topic: "Daily Life", accuracy: 92, sessions: 15 },
      { topic: "Business", accuracy: 85, sessions: 10 },
      { topic: "Travel", accuracy: 88, sessions: 12 },
      { topic: "Technology", accuracy: 83, sessions: 8 },
    ];

    // Mock achievements
    const generateAchievements = (): Achievement[] => [
      {
        id: "1",
        title: "Week Warrior",
        description: "Maintained a 7-day practice streak",
        type: "streak",
        unlockedAt: new Date(),
      },
      {
        id: "2",
        title: "Accuracy Master",
        description: "Achieved 95% accuracy in a session",
        type: "accuracy",
        unlockedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      },
      {
        id: "3",
        title: "50 Sessions",
        description: "Completed 50 practice sessions",
        type: "sessions",
        unlockedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
      },
    ];

    setAccuracyData(generateAccuracyData());
    setTopicPerformance(generateTopicData());
    setAchievements(generateAchievements());
  }, []);

  return {
    stats,
    accuracyData,
    topicPerformance,
    achievements,
  };
};

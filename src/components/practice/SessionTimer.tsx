import { useEffect, useState } from "react";
import { Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface SessionTimerProps {
  isActive: boolean;
  startTime?: Date;
}

const SessionTimer = ({ isActive, startTime }: SessionTimerProps) => {
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isActive && startTime) {
      interval = setInterval(() => {
        const now = new Date().getTime();
        const start = startTime.getTime();
        const diff = Math.floor((now - start) / 1000);
        setDuration(diff);
      }, 1000);
    } else {
      setDuration(0);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, startTime]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  if (!isActive) return null;

  return (
    <Badge variant="secondary" className="gap-2 px-3 py-1.5">
      <Clock className="h-3 w-3" />
      <span className="font-mono font-medium">{formatTime(duration)}</span>
    </Badge>
  );
};

export default SessionTimer;

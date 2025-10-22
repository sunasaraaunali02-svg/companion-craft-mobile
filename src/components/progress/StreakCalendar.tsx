import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StreakDay {
  date: Date;
  completed: boolean;
  sessionsCount: number;
}

interface StreakCalendarProps {
  days: StreakDay[];
}

export const StreakCalendar = ({ days }: StreakCalendarProps) => {
  return (
    <Card className="p-4">
      <h3 className="text-sm font-semibold mb-4">30-Day Activity</h3>
      <div className="grid grid-cols-7 gap-2">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day} className="text-xs text-muted-foreground text-center">
            {day}
          </div>
        ))}
        {days.map((day, index) => (
          <div
            key={index}
            className={cn(
              "aspect-square rounded-md flex items-center justify-center text-xs",
              day.completed
                ? "bg-primary text-primary-foreground font-medium"
                : "bg-muted text-muted-foreground"
            )}
            title={`${day.date.toLocaleDateString()} - ${day.sessionsCount} sessions`}
          >
            {day.date.getDate()}
          </div>
        ))}
      </div>
    </Card>
  );
};

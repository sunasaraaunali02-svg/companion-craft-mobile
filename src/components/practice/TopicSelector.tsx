import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { BookOpen } from "lucide-react";

interface Topic {
  id: string;
  name: string;
  description: string;
}

const topics: Topic[] = [
  { id: "daily-life", name: "Daily Life", description: "Everyday conversations and routines" },
  { id: "business", name: "Business English", description: "Professional communication" },
  { id: "travel", name: "Travel & Tourism", description: "Traveling and exploring" },
  { id: "technology", name: "Technology", description: "Tech and digital world" },
  { id: "academic", name: "Academic English", description: "Educational discussions" },
  { id: "health", name: "Health & Wellness", description: "Medical and fitness topics" },
  { id: "food", name: "Food & Dining", description: "Culinary conversations" },
  { id: "culture", name: "Culture & Arts", description: "Cultural topics and entertainment" },
];

interface TopicSelectorProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

const TopicSelector = ({ value, onChange, disabled }: TopicSelectorProps) => {
  const selectedTopic = topics.find((t) => t.id === value);

  return (
    <Card className="p-6">
      <div className="flex items-center gap-2 mb-4">
        <BookOpen className="h-5 w-5 text-primary" />
        <h2 className="text-lg font-semibold">Practice Topic</h2>
      </div>

      <Select value={value} onValueChange={onChange} disabled={disabled}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Choose a topic to practice" />
        </SelectTrigger>
        <SelectContent>
          {topics.map((topic) => (
            <SelectItem key={topic.id} value={topic.id}>
              <div className="flex flex-col">
                <span className="font-medium">{topic.name}</span>
                <span className="text-xs text-muted-foreground">
                  {topic.description}
                </span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {selectedTopic && (
        <div className="mt-4 p-3 bg-muted/50 rounded-lg">
          <p className="text-sm text-muted-foreground">
            {selectedTopic.description}
          </p>
        </div>
      )}
    </Card>
  );
};

export default TopicSelector;

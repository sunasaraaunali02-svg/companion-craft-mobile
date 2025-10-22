import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

interface DifficultySelectorProps {
  value: "beginner" | "intermediate" | "advanced";
  onChange: (value: "beginner" | "intermediate" | "advanced") => void;
  disabled?: boolean;
}

export const DifficultySelector = ({ value, onChange, disabled }: DifficultySelectorProps) => {
  const levels = ["beginner", "intermediate", "advanced"] as const;
  const currentIndex = levels.indexOf(value);

  const handleChange = (values: number[]) => {
    onChange(levels[values[0]]);
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <Label className="text-sm">Difficulty Level</Label>
        <span className="text-sm font-medium capitalize">{value}</span>
      </div>
      <Slider
        value={[currentIndex]}
        onValueChange={handleChange}
        max={2}
        step={1}
        disabled={disabled}
        className="w-full"
      />
      <div className="flex justify-between text-xs text-muted-foreground">
        <span>Beginner</span>
        <span>Intermediate</span>
        <span>Advanced</span>
      </div>
    </div>
  );
};

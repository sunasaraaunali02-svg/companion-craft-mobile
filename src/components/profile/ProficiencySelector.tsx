import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card } from "@/components/ui/card";

interface ProficiencySelectorProps {
  value: "A1" | "A2" | "B1" | "B2" | "C1" | "C2";
  onChange: (value: "A1" | "A2" | "B1" | "B2" | "C1" | "C2") => void;
}

const levels = [
  { value: "A1", label: "A1 - Beginner", description: "Basic phrases and simple conversations" },
  { value: "A2", label: "A2 - Elementary", description: "Simple routine tasks and familiar topics" },
  { value: "B1", label: "B1 - Intermediate", description: "Main points on familiar matters" },
  { value: "B2", label: "B2 - Upper Intermediate", description: "Complex texts and spontaneous interaction" },
  { value: "C1", label: "C1 - Advanced", description: "Fluent and spontaneous expression" },
  { value: "C2", label: "C2 - Proficiency", description: "Near-native level mastery" },
] as const;

export const ProficiencySelector = ({ value, onChange }: ProficiencySelectorProps) => {
  return (
    <div className="space-y-4">
      <Label>Language Proficiency Level (CEFR)</Label>
      <RadioGroup value={value} onValueChange={onChange as (value: string) => void}>
        {levels.map((level) => (
          <Card key={level.value} className="p-4 hover:bg-accent/50 transition-colors">
            <div className="flex items-start gap-3">
              <RadioGroupItem value={level.value} id={level.value} className="mt-1" />
              <div className="flex-1">
                <Label htmlFor={level.value} className="font-semibold cursor-pointer">
                  {level.label}
                </Label>
                <p className="text-xs text-muted-foreground mt-1">{level.description}</p>
              </div>
            </div>
          </Card>
        ))}
      </RadioGroup>
    </div>
  );
};

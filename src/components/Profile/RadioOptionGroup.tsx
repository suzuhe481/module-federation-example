import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface RadioOption {
  value: string;
  label: string;
  description?: string;
}

interface RadioOptionGroupProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: RadioOption[];
}

export const RadioOptionGroup = ({
  label,
  value,
  onChange,
  options,
}: RadioOptionGroupProps) => {
  return (
    <div className="space-y-3">
      <Label className="text-sm font-medium text-text-base">{label}</Label>
      <RadioGroup
        value={value}
        onValueChange={onChange}
        className="grid grid-cols-1 sm:grid-cols-3 gap-3"
      >
        {options.map((option) => {
          const isSelected = value === option.value;

          return (
            <Label
              key={option.value}
              htmlFor={`radio-${option.value}`}
              className={`flex items-center gap-3 p-4 rounded-lg border cursor-pointer transition-all ${
                isSelected
                  ? "border-primary/50 bg-primary/8 shadow-[0_0_12px_rgba(118,200,180,0.1)]"
                  : "border-accent/20 bg-surface-3/30 hover:border-accent/40 hover:bg-surface-3/50"
              }`}
            >
              <RadioGroupItem
                value={option.value}
                id={`radio-${option.value}`}
                className={
                  isSelected
                    ? "border-primary text-primary"
                    : "border-text-muted"
                }
              />
              <span
                className={`text-sm font-medium ${isSelected ? "text-text-base" : "text-text-muted"}`}
              >
                {option.label}
              </span>
            </Label>
          );
        })}
      </RadioGroup>
    </div>
  );
};

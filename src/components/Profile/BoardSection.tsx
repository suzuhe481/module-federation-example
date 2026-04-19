import { Settings2, Save, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { RadioOptionGroup } from "./RadioOptionGroup";

interface BoardSectionProps {
  cardContent: string;
  onCardContentChange: (value: string) => void;
  cardSpacing: string;
  onCardSpacingChange: (value: string) => void;
  textSize: string;
  onTextSizeChange: (value: string) => void;
  onSave?: () => void;
  onCancel?: () => void;
  isDirty?: boolean;
  isSaving?: boolean;
}

export const BoardSection = ({
  cardContent,
  onCardContentChange,
  cardSpacing,
  onCardSpacingChange,
  textSize,
  onTextSizeChange,
  onSave,
  onCancel,
  isDirty = false,
  isSaving = false,
}: BoardSectionProps) => (
  <section id="board" className="scroll-mt-24">
    <div className="rounded-xl border border-accent/20 bg-surface-2 shadow-[0_0_20px_rgba(0,0,0,0.3)]">
      <div className="px-6 pt-6 pb-4 border-b border-accent/10">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-primary/15 border border-primary/30 flex items-center justify-center">
            <Settings2 className="w-4 h-4 text-black dark:text-primary" />
          </div>
          <div>
            <h2 className="text-base font-semibold text-text-base font-title tracking-wide">
              Board Settings
            </h2>
            <p className="text-xs text-text-muted">
              Customize how your board looks and feels
            </p>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-8">
        <RadioOptionGroup
          label="Card Content"
          value={cardContent}
          onChange={onCardContentChange}
          options={[
            { value: "art-title", label: "Art + Title" },
            { value: "title-only", label: "Title Only" },
            { value: "art-only", label: "Art Only" },
          ]}
        />

        <Separator className="bg-accent/10" />

        <RadioOptionGroup
          label="Card Spacing"
          value={cardSpacing}
          onChange={onCardSpacingChange}
          options={[
            { value: "compact", label: "Compact" },
            { value: "normal", label: "Normal" },
            { value: "comfortable", label: "Comfortable" },
          ]}
        />

        <Separator className="bg-accent/10" />

        <RadioOptionGroup
          label="Text Size"
          value={textSize}
          onChange={onTextSizeChange}
          options={[
            { value: "small", label: "Small" },
            { value: "medium", label: "Medium" },
            { value: "large", label: "Large" },
          ]}
        />

        <Separator className="bg-accent/10" />

        <div className="flex items-center gap-3 pt-1">
          <Button
            onClick={onSave}
            disabled={!isDirty || isSaving}
            className="bg-primary hover:bg-primary/80 text-black shadow-[0_0_12px_rgba(118,200,180,0.15)] cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <Save className="w-4 h-4" />
            {isSaving ? "Saving…" : "Save Changes"}
          </Button>
          <Button
            variant="outline"
            onClick={onCancel}
            disabled={!isDirty || isSaving}
            className="border-accent/30 text-text-muted hover:text-text-base hover:bg-surface-3/50 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Cancel
          </Button>
          {isDirty && (
            <p className="text-xs text-text-muted/70 italic">Unsaved changes</p>
          )}
        </div>
      </div>
    </div>
  </section>
);

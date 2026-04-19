import { User, Save, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ProfileSectionProps {
  firstName: string;
  lastName: string;
  onFirstNameChange: (v: string) => void;
  onLastNameChange: (v: string) => void;
  onSave?: () => void;
  onCancel?: () => void;
  isDirty?: boolean;
  isSaving?: boolean;
  saveError?: string | null;
}

export const ProfileSection = ({
  firstName,
  lastName,
  onFirstNameChange,
  onLastNameChange,
  onSave,
  onCancel,
  isDirty = false,
  isSaving = false,
  saveError = null,
}: ProfileSectionProps) => (
  <section id="profile" className="scroll-mt-24">
    <div className="rounded-xl border border-accent/20 bg-surface-2 shadow-[0_0_20px_rgba(0,0,0,0.3)]">
      <div className="px-6 pt-6 pb-4 border-b border-accent/10">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-primary/15 border border-primary/30 flex items-center justify-center">
            <User className="w-4 h-4 text-black dark:text-primary" />
          </div>
          <div>
            <h2 className="text-base font-semibold text-text-base font-title tracking-wide">
              Profile
            </h2>
            <p className="text-xs text-text-muted">Update your display name</p>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <Label
              htmlFor="first-name"
              className="text-sm font-medium text-text-base"
            >
              First Name
            </Label>
            <Input
              id="first-name"
              value={firstName}
              onChange={(e) => onFirstNameChange(e.target.value)}
              maxLength={30}
              required
              placeholder="First name"
              className="bg-surface-3/50 border-accent/30 text-text-base placeholder:text-text-muted/50 focus-visible:ring-primary/30 focus-visible:border-primary/50"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <Label
              htmlFor="last-name"
              className="text-sm font-medium text-text-base"
            >
              Last Name{" "}
              <span className="text-text-muted font-normal">(optional)</span>
            </Label>
            <Input
              id="last-name"
              value={lastName}
              onChange={(e) => onLastNameChange(e.target.value)}
              maxLength={30}
              placeholder="Last name"
              className="bg-surface-3/50 border-accent/30 text-text-base placeholder:text-text-muted/50 focus-visible:ring-primary/30 focus-visible:border-primary/50"
            />
          </div>
        </div>

        <div className="flex items-center gap-3 pt-1">
          <Button
            onClick={onSave}
            disabled={!isDirty || isSaving || firstName.trim().length === 0}
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

        {saveError && <p className="text-xs text-destructive">{saveError}</p>}
      </div>
    </div>
  </section>
);

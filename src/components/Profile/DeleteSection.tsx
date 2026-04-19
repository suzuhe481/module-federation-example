import { useState } from "react";
import { Skull, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface DeleteSectionProps {
  totalGames: number;
  totalLists: number;
  onDelete?: () => void;
}

export const DeleteSection = ({
  totalGames,
  totalLists,
  onDelete,
}: DeleteSectionProps) => {
  const [open, setOpen] = useState(false);

  return (
    <section id="delete" className="scroll-mt-24">
      <div className="rounded-xl border border-destructive/30 bg-surface-2 shadow-[0_0_20px_rgba(0,0,0,0.3)]">
        <div className="px-6 pt-6 pb-4 border-b border-destructive/15">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-destructive/15 border border-destructive/30 flex items-center justify-center">
              <Skull className="w-4 h-4 text-destructive" />
            </div>
            <div>
              <h2 className="text-base font-semibold text-destructive font-title tracking-wide">
                Point of No Return
              </h2>
              <p className="text-xs text-text-muted">
                Permanently delete your account and all associated data
              </p>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-4">
          <div className="flex gap-3 p-4 rounded-lg bg-destructive/8 border border-destructive/20">
            <AlertTriangle className="w-4 h-4 text-destructive shrink-0 mt-0.5" />
            <p className="text-sm text-text-muted leading-relaxed">
              <span className="text-text-base font-medium">Warning:</span> This
              action is irreversible. All your games, lists, tags, and settings
              will be permanently deleted. There&apos;s no respawning from this
              one.
            </p>
          </div>

          <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogTrigger asChild>
              <Button
                variant="destructive"
                className="w-full sm:w-auto cursor-pointer hover:brightness-90 transition-all"
              >
                <Skull className="w-4 h-4" />
                Delete My Account
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent onOverlayClick={() => setOpen(false)}>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This is the Point of No Return. Deleting your account will
                  permanently erase{" "}
                  <span className="text-text-base font-medium">
                    {totalGames} games
                  </span>{" "}
                  across{" "}
                  <span className="text-text-base font-medium">
                    {totalLists} lists
                  </span>
                  , along with all your tags and settings. There is no undo. No
                  save state. No second life.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Take Me Back</AlertDialogCancel>
                <AlertDialogAction onClick={onDelete}>
                  Delete Everything
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </section>
  );
};

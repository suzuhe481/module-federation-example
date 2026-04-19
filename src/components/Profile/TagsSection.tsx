import { useEffect, useRef, useState } from "react";
import { Tags, Plus, Hash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { CheckIcon, CloseXIcon, PencilIcon } from "@/assets/icons/uiIcons";
import { MAX_TAGS, MAX_TAG_NAME_LENGTH } from "@/constants/tags";
import type { TagWithCount } from "@/types/games";

interface TagsSectionProps {
  tags: TagWithCount[];
  onAddTag: (tagName: string) => void;
  onDeleteTag: (tagId: string) => void;
  onEditTag: (tagId: string, newName: string) => void;
}

export const TagsSection = ({
  tags,
  onAddTag,
  onDeleteTag,
  onEditTag,
}: TagsSectionProps) => {
  const [newTag, setNewTag] = useState("");
  const [editingTagId, setEditingTagId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState("");
  const [deletingTagId, setDeletingTagId] = useState<string | null>(null);
  const editContainerRef = useRef<HTMLDivElement | null>(null);

  const isDuplicate = (name: string) =>
    tags.some((t) => t.tag_name.toLowerCase() === name.trim().toLowerCase());

  const handleAddTag = () => {
    const trimmed = newTag.trim();
    if (trimmed && trimmed.length <= 20 && !isDuplicate(trimmed)) {
      onAddTag(trimmed);
      setNewTag("");
    }
  };

  const handleEditTag = (tagId: string) => {
    const trimmed = editValue.trim();
    if (trimmed && trimmed.length <= 20) {
      onEditTag(tagId, trimmed);
      setEditingTagId(null);
      setEditValue("");
    }
  };

  const startEditing = (tag: TagWithCount) => {
    setEditingTagId(tag.id);
    setEditValue(tag.tag_name);
  };

  const cancelEditing = () => {
    setEditingTagId(null);
    setEditValue("");
  };

  useEffect(() => {
    if (!editingTagId) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (
        editContainerRef.current &&
        !editContainerRef.current.contains(e.target as Node)
      ) {
        cancelEditing();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [editingTagId]);

  const isAtLimit = tags.length >= MAX_TAGS;
  const isAddDisabled =
    !newTag.trim() ||
    isDuplicate(newTag.trim()) ||
    newTag.trim().length > MAX_TAG_NAME_LENGTH ||
    isAtLimit;

  const deletingTag = tags.find((t) => t.id === deletingTagId) ?? null;

  return (
    <section id="tags" className="scroll-mt-24">
      <div className="rounded-xl border border-accent/20 bg-surface-2 shadow-[0_0_20px_rgba(0,0,0,0.3)]">
        <div className="px-6 pt-6 pb-4 border-b border-accent/10">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-primary/15 border border-primary/30 flex items-center justify-center">
              <Tags className="w-4 h-4 text-black dark:text-primary" />
            </div>
            <div>
              <h2 className="text-base font-semibold text-text-base font-title tracking-wide">
                Tags
              </h2>
              <p className="text-xs text-text-muted">
                Create and manage tags to organize your games
              </p>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-6">
          <div className="space-y-2">
            <Label className="text-sm font-medium text-text-base">
              New Tag
            </Label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Input
                  placeholder="Enter tag name"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value.slice(0, 20))}
                  onKeyDown={(e) =>
                    e.key === "Enter" && !isAddDisabled && handleAddTag()
                  }
                  className="pr-14 bg-surface-3/50 border-accent/20 text-text-base placeholder:text-text-muted focus:border-primary/50 focus:ring-primary/20"
                />
                <span
                  className={`absolute right-3 top-1/2 -translate-y-1/2 text-xs tabular-nums pointer-events-none ${
                    newTag.length >= 20
                      ? "text-destructive"
                      : newTag.length >= 15
                        ? "text-warning"
                        : "text-text-muted"
                  }`}
                >
                  {newTag.length}/20
                </span>
              </div>
              <Button
                onClick={handleAddTag}
                disabled={isAddDisabled}
                size="default"
                className="bg-primary hover:bg-primary/80 text-black shrink-0 shadow-[0_0_12px_rgba(118,200,180,0.15)] cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                Add
              </Button>
            </div>
            {isAtLimit && (
              <p className="text-xs text-warning">
                You&apos;ve reached the {MAX_TAGS}-tag limit. Delete a tag to
                add a new one.
              </p>
            )}
            {!isAtLimit && isDuplicate(newTag.trim()) && newTag.trim() && (
              <p className="text-xs text-warning">
                A tag with this name already exists.
              </p>
            )}
          </div>

          <Separator className="bg-accent/10" />

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label className="text-sm font-medium text-text-base">
                Your Tags
              </Label>
              <span className="text-xs text-text-muted tabular-nums">
                {tags.length} / {MAX_TAGS}
              </span>
            </div>

            {tags.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-8 rounded-lg border border-dashed border-accent/20 bg-surface-3/20">
                <Hash className="w-8 h-8 text-text-muted/40 mb-2" />
                <p className="text-sm text-text-muted">
                  No tags yet. Create your first tag above!
                </p>
              </div>
            ) : (
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <div key={tag.id}>
                    {editingTagId === tag.id ? (
                      <div
                        ref={editContainerRef}
                        className="flex items-center justify-between gap-1 text-sm px-2 py-1 rounded-md bg-surface-1 border border-primary/40"
                      >
                        <input
                          type="text"
                          value={editValue}
                          onChange={(e) =>
                            setEditValue(e.target.value.slice(0, 20))
                          }
                          onKeyDown={(e) => {
                            if (e.key === "Enter") handleEditTag(tag.id);
                            if (e.key === "Escape") cancelEditing();
                          }}
                          className="bg-transparent outline-none text-text-base placeholder:text-text-muted min-w-0 font-primary w-28"
                          autoFocus
                        />
                        <div className="flex flex-row gap-0">
                          <button
                            onClick={() => handleEditTag(tag.id)}
                            className="p-0.5 rounded-sm cursor-pointer text-green-500 hover:text-green-400 disabled:opacity-40"
                            aria-label="Save edit"
                          >
                            <CheckIcon className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={cancelEditing}
                            className="p-0.5 rounded-sm cursor-pointer text-red-500 hover:text-red-400"
                            aria-label="Cancel edit"
                          >
                            <CloseXIcon className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="group flex items-center gap-1.5 text-sm px-2 py-1 rounded-sm bg-surface-1 border border-accent/20 text-text-base hover:border-accent/40 hover:bg-surface-2 transition-colors font-primary">
                        <span>{tag.tag_name}</span>
                        {tag.game_count > 0 && (
                          <span className="text-text-muted/60 tabular-nums">
                            ×{tag.game_count}
                          </span>
                        )}
                        <div className="flex items-center gap-0 ml-0.5 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={() => startEditing(tag)}
                            className="p-0.5 rounded-sm cursor-pointer text-text-muted hover:text-text-base transition-colors"
                            aria-label={`Edit ${tag.tag_name}`}
                          >
                            <PencilIcon className="w-3 h-3" />
                          </button>
                          <button
                            onClick={() => setDeletingTagId(tag.id)}
                            className="p-0.5 rounded-sm cursor-pointer text-text-muted hover:text-red-500 transition-colors"
                            aria-label={`Delete ${tag.tag_name}`}
                          >
                            <CloseXIcon className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <AlertDialog
        open={deletingTagId !== null}
        onOpenChange={(open) => {
          if (!open) setDeletingTagId(null);
        }}
      >
        <AlertDialogContent onOverlayClick={() => setDeletingTagId(null)}>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Delete tag &quot;{deletingTag?.tag_name}&quot;?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This will remove the tag from{" "}
              <span className="text-text-base font-medium">
                {deletingTag?.game_count ?? 0} game
                {(deletingTag?.game_count ?? 0) !== 1 ? "s" : ""}
              </span>
              . This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setDeletingTagId(null)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                if (deletingTagId) {
                  onDeleteTag(deletingTagId);
                  setDeletingTagId(null);
                }
              }}
            >
              Delete Tag
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </section>
  );
};

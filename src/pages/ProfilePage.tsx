import { useEffect, useRef, useState } from "react";
import { useShallow } from "zustand/shallow";

import { useAuthStore } from "@/stores/useAuthStore";
import { useBoardSettingsStore } from "@/stores/useBoardSettingsStore";

import { CardContent, CardSpacing, TextSize } from "@/constants/settings";
import { getLimitsForRole } from "@/constants/lists";

import type { TagWithCount } from "@/types/games";
import { mockBoardData, mockTags } from "@/data/mockData";

import { Skeleton } from "@/components/ui/skeleton";
import { ProfileHeader } from "@/components/Profile/ProfileHeader";
import { ProfileNav } from "@/components/Profile/ProfileNav";
import { ProfileSection } from "@/components/Profile/ProfileSection";
import { StatsSection } from "@/components/Profile/StatsSection";
import { LimitsSection } from "@/components/Profile/LimitsSection";
import { BoardSection } from "@/components/Profile/BoardSection";
import { TagsSection } from "@/components/Profile/TagsSection";
import { DeleteSection } from "@/components/Profile/DeleteSection";

const SECTION_IDS = [
  "profile",
  "stats",
  "limits",
  "board",
  "tags",
  "delete",
] as const;

export function ProfilePage() {
  // ── Auth ──────────────────────────────────────────────────────────────────
  const { user, profile, role, isLoading, setProfile } = useAuthStore(
    useShallow((s) => ({
      user: s.user,
      profile: s.profile,
      role: s.role,
      isLoading: s.isLoading,
      setProfile: s.setProfile,
    })),
  );

  // ── Profile name ─────────────────────────────────────────────────────────
  const [firstName, setFirstName] = useState(profile?.first_name ?? "");
  const [lastName, setLastName] = useState(profile?.last_name ?? "");
  const profileSnapshot = useRef({
    firstName: profile?.first_name ?? "",
    lastName: profile?.last_name ?? "",
  });
  const [isProfileSaving, setIsProfileSaving] = useState(false);
  const [profileSaveError, setProfileSaveError] = useState<string | null>(null);

  useEffect(() => {
    if (profile && !profileSnapshot.current.firstName) {
      const fn = profile.first_name ?? "";
      const ln = profile.last_name ?? "";
      setFirstName(fn);
      setLastName(ln);
      profileSnapshot.current = { firstName: fn, lastName: ln };
    }
  }, [profile]);

  const profileDirty =
    // eslint-disable-next-line react-hooks/refs
    firstName.trim() !== profileSnapshot.current.firstName.trim() ||
    // eslint-disable-next-line react-hooks/refs
    (lastName ?? "").trim() !== (profileSnapshot.current.lastName ?? "").trim();

  const handleProfileSave = async () => {
    setProfileSaveError(null);
    setIsProfileSaving(true);
    try {
      const updated = {
        first_name: firstName.trim(),
        last_name: lastName.trim() || null,
      };
      setProfile(updated);
      profileSnapshot.current = {
        firstName: updated.first_name,
        lastName: updated.last_name ?? "",
      };
    } finally {
      setIsProfileSaving(false);
    }
  };

  const handleProfileCancel = () => {
    setProfileSaveError(null);
    setFirstName(profileSnapshot.current.firstName);
    setLastName(profileSnapshot.current.lastName);
  };

  // ── Board settings ────────────────────────────────────────────────────────
  const {
    cardContent,
    setCardContent,
    cardSpacing,
    setCardSpacing,
    textSize,
    setTextSize,
  } = useBoardSettingsStore(
    useShallow((s) => ({
      cardContent: s.cardContent,
      setCardContent: s.setCardContent,
      cardSpacing: s.cardSpacing,
      setCardSpacing: s.setCardSpacing,
      textSize: s.textSize,
      setTextSize: s.setTextSize,
    })),
  );

  const boardSnapshot = useRef({ cardContent, cardSpacing, textSize });
  const [boardDirty, setBoardDirty] = useState(false);
  const [isBoardSaving, setIsBoardSaving] = useState(false);
  const [boardSaveError, setBoardSaveError] = useState<string | null>(null);

  const handleCardContentChange = (v: string) => {
    setCardContent(v as CardContent);
    setBoardDirty(true);
  };
  const handleCardSpacingChange = (v: string) => {
    setCardSpacing(v as CardSpacing);
    setBoardDirty(true);
  };
  const handleTextSizeChange = (v: string) => {
    setTextSize(v as TextSize);
    setBoardDirty(true);
  };

  const handleBoardSave = async () => {
    setBoardSaveError(null);
    setIsBoardSaving(true);
    try {
      boardSnapshot.current = { cardContent, cardSpacing, textSize };
      setBoardDirty(false);
    } finally {
      setIsBoardSaving(false);
    }
  };

  const handleBoardCancel = () => {
    setBoardSaveError(null);
    setCardContent(boardSnapshot.current.cardContent);
    setCardSpacing(boardSnapshot.current.cardSpacing);
    setTextSize(boardSnapshot.current.textSize);
    setBoardDirty(false);
  };

  // ── In-memory data ────────────────────────────────────────────────────────
  const [boardData] = useState(mockBoardData);
  const [tags, setTags] = useState<TagWithCount[]>(mockTags);

  const handleAddTag = (tagName: string) => {
    setTags((prev) => [
      ...prev,
      {
        id: `tag-${Date.now()}`,
        tag_name: tagName,
        created_at: new Date().toISOString(),
        game_count: 0,
      },
    ]);
  };

  const handleDeleteTag = (tagId: string) => {
    setTags((prev) => prev.filter((t) => t.id !== tagId));
  };

  const handleEditTag = (tagId: string, newName: string) => {
    if (tagId.startsWith("temp-")) return;
    setTags((prev) =>
      prev.map((t) => (t.id === tagId ? { ...t, tag_name: newName } : t)),
    );
  };

  const handleDelete = () => {
    console.log("delete account (no-op in demo)");
  };

  // ── Derived values ────────────────────────────────────────────────────────
  const limits = getLimitsForRole(role, false);
  const totalGames = boardData.games.length;
  const totalLists = boardData.lists.length;
  const memberSince = user?.created_at ? new Date(user.created_at) : new Date();

  const userName = profile?.first_name
    ? `${profile.first_name}${profile.last_name ? ` ${profile.last_name}` : ""}`
    : undefined;

  // ── Navigation & scroll tracking ──────────────────────────────────────────
  const [activeSection, setActiveSection] = useState("stats");
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const intersecting = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (intersecting.length > 0)
          setActiveSection(intersecting[0].target.id);
      },
      { rootMargin: "-20% 0px -70% 0px", threshold: 0 },
    );

    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleNavigate = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
    setActiveSection(sectionId);
  };

  // ── Loading / auth guard ──────────────────────────────────────────────────
  if (isLoading) return <LoadingSkeleton />;
  if (!user) return null;

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <>
      <ProfileHeader
        activeSection={activeSection}
        onNavigate={handleNavigate}
        mobileNavOpen={mobileNavOpen}
        onMobileNavOpenChange={setMobileNavOpen}
        title="Profile"
        userName={userName}
        userEmail={user.email}
      />

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Page title — desktop only */}
        <div className="hidden lg:flex items-center gap-4 mb-8 pb-6 border-b border-accent/15">
          <div>
            <h1 className="text-2xl font-bold text-text-base font-title tracking-wide">
              {userName ?? "Profile"}
            </h1>
            <p className="text-sm text-text-muted mt-0.5">{user.email}</p>
          </div>
          {role === "admin" && (
            <span className="ml-auto px-2.5 py-1 rounded-md text-xs font-semibold bg-primary/15 border border-primary/30 text-foreground font-title tracking-wider">
              ADMIN
            </span>
          )}
        </div>

        <div className="flex gap-8">
          {/* Desktop sidebar */}
          <aside className="hidden lg:block w-52 shrink-0">
            <ProfileNav
              activeSection={activeSection}
              onNavigate={handleNavigate}
            />
          </aside>

          {/* Main content */}
          <div className="flex-1 min-w-0 flex flex-col gap-6">
            <ProfileSection
              firstName={firstName}
              lastName={lastName}
              onFirstNameChange={setFirstName}
              onLastNameChange={setLastName}
              onSave={handleProfileSave}
              onCancel={handleProfileCancel}
              isDirty={profileDirty}
              isSaving={isProfileSaving}
              saveError={profileSaveError}
            />

            <StatsSection
              totalGames={totalGames}
              totalLists={totalLists}
              memberSince={memberSince}
            />

            <LimitsSection
              gamesUsed={totalGames}
              gamesLimit={limits.maxGamesPerList * limits.maxLists}
              gamesPerListLimit={limits.maxGamesPerList}
              listsUsed={totalLists}
              listsLimit={limits.maxLists}
              tagsUsed={tags.length}
            />

            {boardSaveError && (
              <p className="text-xs text-destructive text-center mt-1">
                {boardSaveError}
              </p>
            )}
            <BoardSection
              cardContent={cardContent}
              onCardContentChange={handleCardContentChange}
              cardSpacing={cardSpacing}
              onCardSpacingChange={handleCardSpacingChange}
              textSize={textSize}
              onTextSizeChange={handleTextSizeChange}
              onSave={handleBoardSave}
              onCancel={handleBoardCancel}
              isDirty={boardDirty}
              isSaving={isBoardSaving}
            />

            <TagsSection
              tags={tags}
              onAddTag={handleAddTag}
              onDeleteTag={handleDeleteTag}
              onEditTag={handleEditTag}
            />

            <DeleteSection
              totalGames={totalGames}
              totalLists={totalLists}
              onDelete={handleDelete}
            />
          </div>
        </div>
      </div>
    </>
  );
}

function LoadingSkeleton() {
  return (
    <>
      <div className="border-b border-accent/15 bg-surface-1/95 h-14 lg:hidden" />
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="hidden lg:flex items-center gap-4 mb-8 pb-6 border-b border-accent/15">
          <div className="space-y-2">
            <Skeleton className="h-7 w-40 bg-surface-3/50" />
            <Skeleton className="h-4 w-56 bg-surface-3/30" />
          </div>
        </div>
        <div className="flex gap-8">
          <div className="hidden lg:flex flex-col gap-1 w-52 shrink-0">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton
                key={i}
                className="h-10 w-full rounded-lg bg-surface-3/40"
              />
            ))}
          </div>
          <div className="flex-1 space-y-6">
            <Skeleton className="h-44 w-full rounded-xl bg-surface-2" />
            <Skeleton className="h-52 w-full rounded-xl bg-surface-2" />
            <Skeleton className="h-36 w-full rounded-xl bg-surface-2" />
            <Skeleton className="h-64 w-full rounded-xl bg-surface-2" />
            <Skeleton className="h-48 w-full rounded-xl bg-surface-2" />
            <Skeleton className="h-40 w-full rounded-xl bg-surface-2" />
          </div>
        </div>
      </div>
    </>
  );
}

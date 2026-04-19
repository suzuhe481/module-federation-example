import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ProfileNav } from "./ProfileNav";

interface ProfileHeaderProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  mobileNavOpen: boolean;
  onMobileNavOpenChange: (open: boolean) => void;
  title?: string;
  hiddenSections?: string[];
  userName?: string;
  userEmail?: string;
}

export const ProfileHeader = ({
  activeSection,
  onNavigate,
  mobileNavOpen,
  onMobileNavOpenChange,
  title = "Profile",
  hiddenSections = [],
  userName,
  userEmail,
}: ProfileHeaderProps) => {
  const handleNavigate = (sectionId: string) => {
    onNavigate(sectionId);
    onMobileNavOpenChange(false);
  };

  return (
    <header className="border-b border-accent/15 sticky top-0 bg-surface-1/95 backdrop-blur-md z-40 lg:hidden">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-3">
        <Sheet open={mobileNavOpen} onOpenChange={onMobileNavOpenChange}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="shrink-0 text-text-muted hover:text-text-base hover:bg-surface-3/50 cursor-pointer"
            >
              <Menu className="w-5 h-5" />
              <span className="sr-only">Open navigation</span>
            </Button>
          </SheetTrigger>

          <SheetContent
            side="left"
            className="w-72 bg-surface-1 border-accent/20"
          >
            <SheetHeader className="mb-2">
              <SheetTitle className="text-text-base font-title tracking-wide">
                {title}
              </SheetTitle>
              {(userName || userEmail) && (
                <div className="space-y-0.5 pt-1 pb-2 border-b border-accent/15">
                  {userName && (
                    <p className="text-sm font-medium text-text-base">
                      {userName}
                    </p>
                  )}
                  {userEmail && (
                    <p className="text-xs text-text-muted truncate">
                      {userEmail}
                    </p>
                  )}
                </div>
              )}
              <SheetDescription className="sr-only">
                Navigate to different sections
              </SheetDescription>
            </SheetHeader>
            <div className="mt-4">
              <ProfileNav
                activeSection={activeSection}
                onNavigate={handleNavigate}
                isMobile
                hiddenSections={hiddenSections}
              />
            </div>
          </SheetContent>
        </Sheet>

        <div className="flex-1 min-w-0">
          <h1 className="text-base font-semibold text-text-base font-title tracking-wide leading-tight">
            {title}
          </h1>
          {(userName || userEmail) && (
            <p className="text-xs text-text-muted truncate leading-tight">
              {userName ?? userEmail}
            </p>
          )}
        </div>
      </div>
    </header>
  );
};

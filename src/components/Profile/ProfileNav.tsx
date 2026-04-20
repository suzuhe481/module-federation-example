import { User, BarChart3, Gauge, Settings2, Tags, Skull } from "lucide-react";

// eslint-disable-next-line react-refresh/only-export-components
export const navItems = [
  { id: "profile", label: "Profile", icon: User },
  { id: "stats", label: "Stats", icon: BarChart3 },
  { id: "limits", label: "Limits", icon: Gauge },
  { id: "board", label: "Board Settings", icon: Settings2 },
  { id: "tags", label: "Tags", icon: Tags },
  { id: "delete", label: "Point of No Return", icon: Skull },
];

interface ProfileNavProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  isMobile?: boolean;
  hiddenSections?: string[];
}

export const ProfileNav = ({
  activeSection,
  onNavigate,
  isMobile = false,
  hiddenSections = [],
}: ProfileNavProps) => {
  const visibleItems = navItems.filter(
    (item) => !hiddenSections.includes(item.id),
  );

  return (
    <nav
      className={
        isMobile ? "flex flex-col gap-1" : "flex flex-col gap-1 sticky top-8"
      }
    >
      {visibleItems.map((item) => {
        const Icon = item.icon;
        const isDelete = item.id === "delete";
        const isActive = activeSection === item.id;

        return (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-left transition-all text-sm cursor-pointer ${
              isActive
                ? isDelete
                  ? "bg-destructive/15 text-destructive border border-destructive/20"
                  : "bg-primary/12 text-black dark:text-primary border border-primary/20"
                : isDelete
                  ? "text-destructive/80 hover:text-destructive hover:bg-destructive/8 border border-transparent"
                  : "text-text-muted hover:text-text-base hover:bg-surface-3/50 border border-transparent"
            }`}
          >
            <Icon className="w-4 h-4 shrink-0" />
            <span className="font-medium">{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
};

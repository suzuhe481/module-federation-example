import { BarChart3, Gamepad2, List } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { MembershipTimer } from "./MembershipTimer";
import { useCountUp } from "@/hooks/useCountUp";

interface StatsSectionProps {
  totalGames: number;
  totalLists: number;
  memberSince: Date;
}

export const StatsSection = ({
  totalGames,
  totalLists,
  memberSince,
}: StatsSectionProps) => (
  <section id="stats" className="scroll-mt-24">
    <div className="rounded-xl border border-accent/20 bg-surface-2 shadow-[0_0_20px_rgba(0,0,0,0.3)]">
      <div className="px-6 pt-6 pb-4 border-b border-accent/10">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-primary/15 border border-primary/30 flex items-center justify-center">
            <BarChart3 className="w-4 h-4 text-black dark:text-primary" />
          </div>
          <div>
            <h2 className="text-base font-semibold text-text-base font-title tracking-wide">
              Stats
            </h2>
            <p className="text-xs text-text-muted">
              Your Game Vault at a glance
            </p>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <StatCard
            icon={<Gamepad2 className="w-4 h-4 text-primary" />}
            label="Total Games"
            value={totalGames}
          />
          <StatCard
            icon={<List className="w-4 h-4 text-primary" />}
            label="Total Lists"
            value={totalLists}
          />
        </div>

        <Separator className="bg-accent/10" />

        <MembershipTimer memberSince={memberSince} />
      </div>
    </div>
  </section>
);

const StatCard = ({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
}) => {
  const animatedValue = useCountUp(value, 1200);

  return (
    <div className="p-4 rounded-lg bg-surface-3/50 border border-accent/20 flex flex-col gap-1">
      <div className="flex items-center gap-1.5 text-text-muted">
        {icon}
        <span className="text-xs">{label}</span>
      </div>
      <p className="text-3xl font-bold text-text-base font-title tabular-nums">
        {animatedValue.toLocaleString()}
      </p>
    </div>
  );
};

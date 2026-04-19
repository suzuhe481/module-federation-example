import { Gauge } from "lucide-react";
import { LimitBar } from "./LimitBar";
import { MAX_TAGS } from "@/constants/tags";

interface LimitsSectionProps {
  gamesUsed: number;
  gamesLimit: number;
  gamesPerListLimit: number;
  listsUsed: number;
  listsLimit: number;
  tagsUsed: number;
}

export const LimitsSection = ({
  gamesUsed,
  gamesLimit,
  gamesPerListLimit,
  listsUsed,
  listsLimit,
  tagsUsed,
}: LimitsSectionProps) => {
  const isUnlimited = !isFinite(gamesLimit) && !isFinite(listsLimit);

  return (
    <section id="limits" className="scroll-mt-24">
      <div className="rounded-xl border border-accent/20 bg-surface-2 shadow-[0_0_20px_rgba(0,0,0,0.3)]">
        <div className="px-6 pt-6 pb-4 border-b border-accent/10">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-primary/15 border border-primary/30 flex items-center justify-center">
              <Gauge className="w-4 h-4 text-black dark:text-primary" />
            </div>
            <div>
              <h2 className="text-base font-semibold text-text-base font-title tracking-wide">
                Limits
              </h2>
              <p className="text-xs text-text-muted">
                {isUnlimited
                  ? "Unlimited storage — admin privileges"
                  : "Your current usage limits"}
              </p>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-6">
          <LimitBar
            label="Games"
            used={gamesUsed}
            limit={gamesLimit}
            sublabel={
              isFinite(gamesPerListLimit)
                ? `${gamesPerListLimit} games per list max`
                : undefined
            }
          />
          <LimitBar label="Lists" used={listsUsed} limit={listsLimit} />
          <LimitBar label="Tags" used={tagsUsed} limit={MAX_TAGS} />
        </div>
      </div>
    </section>
  );
};

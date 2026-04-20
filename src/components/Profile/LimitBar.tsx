interface LimitBarProps {
  label: string;
  used: number;
  limit: number;
  sublabel?: string;
}

export const LimitBar = ({ label, used, limit, sublabel }: LimitBarProps) => {
  const isUnlimited = !isFinite(limit);

  const percentage = isUnlimited ? 100 : Math.min((used / limit) * 100, 100);
  const isNearLimit = !isUnlimited && percentage >= 80;
  const isCritical = !isUnlimited && percentage >= 95;
  const isFull = !isUnlimited && percentage >= 100;

  const warningText = isFull
    ? "You've reached your limit."
    : isCritical
      ? "You've almost reached your limit."
      : "Approaching your limit.";

  const limitNumberDisplayColor = isUnlimited
    ? "text-amber-700 dark:text-amber-400"
    : isCritical
      ? "text-destructive"
      : isNearLimit
        ? "text-warning"
        : "text-text-muted";

  return (
    <div className="space-y-2.5">
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium text-text-base">{label}</span>
        <span
          className={`text-sm tabular-nums font-mono font-bold ${limitNumberDisplayColor}`}
        >
          {used} / {isUnlimited ? "Unlimited" : limit}
        </span>
      </div>
      <div className="h-2 rounded-full bg-surface-3/80 border border-accent/10 overflow-hidden">
        <div
          className={
            isUnlimited
              ? "h-full w-full rounded-full bg-amber-400"
              : `h-full rounded-full transition-all duration-500 ${
                  isCritical
                    ? "bg-destructive"
                    : isNearLimit
                      ? "bg-warning"
                      : "bg-primary"
                }`
          }
          style={isUnlimited ? undefined : { width: `${percentage}%` }}
        />
      </div>
      {isNearLimit && (
        <p
          className={`text-xs ${isCritical ? "text-destructive" : "text-warning"}`}
        >
          {warningText}
        </p>
      )}
      {sublabel && <p className="text-xs text-text-muted/60">{sublabel}</p>}
    </div>
  );
};

import { useState, useEffect } from "react";

interface MembershipTimerProps {
  memberSince: Date;
}

export const MembershipTimer = ({ memberSince }: MembershipTimerProps) => {
  const [elapsed, setElapsed] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateElapsed = () => {
      const now = new Date();
      const diff = now.getTime() - memberSince.getTime();

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
      );
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setElapsed({ days, hours, minutes, seconds });
    };

    calculateElapsed();
    const interval = setInterval(calculateElapsed, 1000);

    return () => clearInterval(interval);
  }, [memberSince]);

  return (
    <div className="space-y-3">
      <p className="text-sm text-text-muted">
        Member since{" "}
        <span className="text-text-base font-medium">
          {memberSince.toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          })}
        </span>
      </p>
      <div className="grid grid-cols-4 gap-3">
        <TimeUnit value={elapsed.days} label="Days" />
        <TimeUnit value={elapsed.hours} label="Hours" />
        <TimeUnit value={elapsed.minutes} label="Minutes" />
        <TimeUnit value={elapsed.seconds} label="Seconds" />
      </div>
    </div>
  );
};

const TimeUnit = ({ value, label }: { value: number; label: string }) => (
  <div className="text-center p-3 rounded-lg bg-surface-3/50 border border-accent/20">
    <p className="text-2xl font-mono font-bold text-text-base tabular-nums">
      {value.toString().padStart(2, "0")}
    </p>
    <p className="text-xs text-text-muted mt-0.5">{label}</p>
  </div>
);

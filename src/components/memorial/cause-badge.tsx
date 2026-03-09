import { cn, CAUSE_LABELS } from "@/lib/utils";
import type { CauseOfDeath } from "@/types";

const CAUSE_ICONS: Record<CauseOfDeath, string> = {
  NO_TIME: "⧗",
  TOO_COMPLEX: "⌬",
  LOST_INTEREST: "◌",
  NO_MONEY: "⊘",
  SCOPE_CREEP: "∞",
  NO_MARKET: "◈",
  BAD_TIMING: "↯",
  BURNOUT: "⊗",
  WRONG_TECH: "⚙",
  LIFE_CHANGE: "⟳",
  BETTER_ALTERNATIVE: "→",
  COMPETITION: "⧖",
  TECHNICAL_DEBT: "⛓",
  TEAM_SPLIT: "⋈",
  ACQUIRED: "➡",
  OTHER: "·",
};

const CAUSE_COLORS: Record<CauseOfDeath, string> = {
  NO_TIME: "text-amber-400/70 bg-amber-400/8 border-amber-400/20",
  TOO_COMPLEX: "text-purple-400/70 bg-purple-400/8 border-purple-400/20",
  LOST_INTEREST: "text-slate-400/70 bg-slate-400/8 border-slate-400/20",
  NO_MONEY: "text-red-400/70 bg-red-400/8 border-red-400/20",
  SCOPE_CREEP: "text-orange-400/70 bg-orange-400/8 border-orange-400/20",
  NO_MARKET: "text-zinc-400/70 bg-zinc-400/8 border-zinc-400/20",
  BAD_TIMING: "text-blue-400/70 bg-blue-400/8 border-blue-400/20",
  BURNOUT: "text-rose-400/70 bg-rose-400/8 border-rose-400/20",
  WRONG_TECH: "text-cyan-400/70 bg-cyan-400/8 border-cyan-400/20",
  LIFE_CHANGE: "text-teal-400/70 bg-teal-400/8 border-teal-400/20",
  BETTER_ALTERNATIVE: "text-green-400/70 bg-green-400/8 border-green-400/20",
  COMPETITION: "text-indigo-400/70 bg-indigo-400/8 border-indigo-400/20",
  TECHNICAL_DEBT: "text-yellow-400/70 bg-yellow-400/8 border-yellow-400/20",
  TEAM_SPLIT: "text-pink-400/70 bg-pink-400/8 border-pink-400/20",
  ACQUIRED: "text-emerald-400/70 bg-emerald-400/8 border-emerald-400/20",
  OTHER: "text-muted-foreground bg-muted/20 border-border",
};

interface CauseBadgeProps {
  cause: CauseOfDeath;
  size?: "sm" | "md";
  showIcon?: boolean;
  className?: string;
}

export function CauseBadge({ cause, size = "sm", showIcon = true, className }: CauseBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-memorial border font-mono",
        size === "sm" ? "px-2 py-0.5 text-2xs" : "px-2.5 py-1 text-xs",
        CAUSE_COLORS[cause],
        className,
      )}
    >
      {showIcon && <span>{CAUSE_ICONS[cause]}</span>}
      {CAUSE_LABELS[cause]}
    </span>
  );
}

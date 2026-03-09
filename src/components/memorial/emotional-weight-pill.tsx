import { cn, EMOTIONAL_LABELS, EMOTIONAL_COLORS } from "@/lib/utils";
import type { EmotionalWeight } from "@/types";

const EMOTIONAL_ICONS: Record<EmotionalWeight, string> = {
  LIGHT: "○",
  NOSTALGIC: "◎",
  HEAVY: "●",
  HAUNTING: "◉",
  LIBERATING: "◯",
  BITTERSWEET: "◑",
};

interface EmotionalWeightPillProps {
  weight: EmotionalWeight;
  size?: "sm" | "md";
  showLabel?: boolean;
  className?: string;
}

export function EmotionalWeightPill({ weight, size = "md", showLabel = false, className }: EmotionalWeightPillProps) {
  const color = EMOTIONAL_COLORS[weight];

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border font-mono",
        size === "sm" ? "px-2 py-0.5 text-2xs" : "px-2.5 py-1 text-xs",
        className,
      )}
      style={{
        color: color,
        borderColor: `${color}30`,
        backgroundColor: `${color}0e`,
      }}
      title={EMOTIONAL_LABELS[weight]}
    >
      <span className={size === "sm" ? "text-xs" : "text-sm"}>{EMOTIONAL_ICONS[weight]}</span>
      {showLabel && <span>{EMOTIONAL_LABELS[weight]}</span>}
    </span>
  );
}

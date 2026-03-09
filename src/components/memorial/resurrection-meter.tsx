"use client";

import { motion } from "framer-motion";
import {
  cn,
  resurrectionPercent,
  RESURRECTION_LABELS,
  RESURRECTION_DESCRIPTIONS,
  RESURRECTION_COLORS,
} from "@/lib/utils";
import type { ResurrectionPotential } from "@/types";

interface ResurrectionMeterProps {
  potential: ResurrectionPotential;
  className?: string;
  showLabel?: boolean;
  showDescription?: boolean;
}

export function ResurrectionMeter({
  potential,
  className,
  showLabel = true,
  showDescription = false,
}: ResurrectionMeterProps) {
  const percent = resurrectionPercent(potential);
  const color = RESURRECTION_COLORS[potential];

  return (
    <div className={cn("space-y-2", className)}>
      {showLabel && (
        <div className="flex items-center justify-between">
          <span className="text-2xs font-mono uppercase tracking-wider text-muted-foreground/60">
            Potencial de reencarnação
          </span>
          <span className="text-xs font-mono" style={{ color }}>
            {RESURRECTION_LABELS[potential]}
          </span>
        </div>
      )}
      <div className="resurrection-track">
        <motion.div
          className="resurrection-fill"
          style={{ background: `linear-gradient(90deg, ${color}80, ${color})` }}
          initial={{ width: 0 }}
          animate={{ width: `${percent}%` }}
          transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
        />
      </div>
      {showDescription && (
        <p className="text-xs text-muted-foreground italic">{RESURRECTION_DESCRIPTIONS[potential]}</p>
      )}
    </div>
  );
}

"use client";

import { cn } from "@/lib/utils";
import type { ReactNode } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

interface MemorialEmptyStateProps {
  icon?: ReactNode;
  title: string;
  description: string;
  /** Small italic footnote below the description */
  hint?: string;
  action?: {
    label: string;
    href: string;
  };
  secondaryAction?: {
    label: string;
    href: string;
  };
  className?: string;
  /** Accent color scheme: gold (default), verdigris (resurrection), crimson (danger) */
  accent?: "gold" | "verdigris" | "crimson";
}

const ACCENT_STYLES = {
  gold: {
    outerRing: "border-gold/8",
    innerRing: "border-gold/14",
    corner: "border-gold/25",
    divider: "text-gold/20",
    glow: "rgba(201,169,110,0.05)",
    btn: "border-gold/30 text-gold hover:bg-gold/10",
  },
  verdigris: {
    outerRing: "border-teal-500/10",
    innerRing: "border-teal-400/18",
    corner: "border-teal-500/30",
    divider: "text-teal-400/25",
    glow: "rgba(61,122,106,0.07)",
    btn: "border-teal-700/50 text-teal-400 hover:bg-teal-900/20",
  },
  crimson: {
    outerRing: "border-red-900/12",
    innerRing: "border-red-700/20",
    corner: "border-red-700/28",
    divider: "text-red-700/22",
    glow: "rgba(139,58,58,0.06)",
    btn: "border-red-900/50 text-red-400/80 hover:bg-red-950/20",
  },
};

export function MemorialEmptyState({
  icon,
  title,
  description,
  hint,
  action,
  secondaryAction,
  className,
  accent = "gold",
}: MemorialEmptyStateProps) {
  const s = ACCENT_STYLES[accent];

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={cn("relative flex flex-col items-center justify-center text-center py-24 px-6", className)}
    >
      {/* Ambient radial glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: `radial-gradient(ellipse 50% 45% at 50% 38%, ${s.glow} 0%, transparent 70%)`,
        }}
      />

      {/* ── Top ornamental rule ── */}
      <div className="relative z-10 mb-12 flex w-full max-w-[260px] items-center gap-4">
        <div className="h-px flex-1 bg-gradient-to-r from-transparent to-border/35" />
        <span className={cn("font-mono text-[9px] tracking-[0.8em]", s.divider)}>✦</span>
        <div className="h-px flex-1 bg-gradient-to-l from-transparent to-border/35" />
      </div>

      {/* ── Icon composition ── */}
      <div className="relative z-10 mb-10">
        {/* Outer breathing ring */}
        <div className={cn("absolute rounded-full border animate-breathe", s.outerRing)} style={{ inset: "-2rem" }} />
        {/* Inner ring */}
        <div className={cn("absolute rounded-full border", s.innerRing)} style={{ inset: "-0.9rem" }} />

        {/* Tombstone box */}
        <div
          className="relative flex h-20 w-20 items-center justify-center border border-border/50 bg-gradient-to-br from-card/80 to-background/60"
          style={{ borderRadius: "3px" }}
        >
          {/* Corner marks — cartouche style */}
          <span className={cn("absolute left-1.5 top-1.5 block h-2.5 w-2.5 border-l border-t", s.corner)} />
          <span className={cn("absolute right-1.5 top-1.5 block h-2.5 w-2.5 border-r border-t", s.corner)} />
          <span className={cn("absolute bottom-1.5 left-1.5 block h-2.5 w-2.5 border-b border-l", s.corner)} />
          <span className={cn("absolute bottom-1.5 right-1.5 block h-2.5 w-2.5 border-b border-r", s.corner)} />

          <span className="text-3xl" style={{ opacity: 0.18 }}>
            {icon ?? "⚰"}
          </span>
        </div>
      </div>

      {/* ── Text ── */}
      <div className="relative z-10 max-w-[300px] space-y-3">
        <h3 className="font-serif text-2xl font-medium leading-tight tracking-tight text-parchment">{title}</h3>
        <p className="text-sm leading-relaxed text-muted-foreground">{description}</p>
        {hint && <p className="pt-1 text-xs italic leading-relaxed text-muted-foreground/40">{hint}</p>}
      </div>

      {/* ── Actions ── */}
      {(action || secondaryAction) && (
        <div className="relative z-10 mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          {action && (
            <Link
              href={action.href}
              className={cn(
                "inline-flex items-center gap-2 rounded-memorial border px-5 py-2.5 font-mono text-sm transition-colors",
                s.btn,
              )}
            >
              {action.label}
            </Link>
          )}
          {secondaryAction && (
            <Link
              href={secondaryAction.href}
              className="inline-flex items-center gap-2 rounded-memorial border border-border/40 px-5 py-2.5 text-sm text-muted-foreground transition-colors hover:border-border/80 hover:text-parchment"
            >
              {secondaryAction.label}
            </Link>
          )}
        </div>
      )}

      {/* ── Bottom ornamental rule ── */}
      <div className="relative z-10 mt-14 flex w-full max-w-[260px] items-center gap-4">
        <div className="h-px flex-1 bg-gradient-to-r from-transparent to-border/35" />
        <span className={cn("font-mono text-[9px] tracking-[0.8em]", s.divider)}>✦</span>
        <div className="h-px flex-1 bg-gradient-to-l from-transparent to-border/35" />
      </div>
    </motion.div>
  );
}

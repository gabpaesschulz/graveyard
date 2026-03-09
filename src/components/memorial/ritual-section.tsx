"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface RitualSectionProps {
  title: string;
  subtitle?: string;
  ornament?: string;
  children: ReactNode;
  className?: string;
  id?: string;
}

export function RitualSection({ title, subtitle, ornament = "◆", children, className, id }: RitualSectionProps) {
  return (
    <motion.section
      id={id}
      className={cn("space-y-6", className)}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="flex items-start gap-4 pb-5 border-b border-border/35">
        {/* Ornament badge */}
        <div className="shrink-0 w-7 h-7 rounded-sm border border-gold/20 bg-gold/5 flex items-center justify-center mt-0.5">
          <span
            className="font-mono leading-none"
            style={{ fontSize: "9px", color: "rgba(201,169,110,0.55)", letterSpacing: "0.05em" }}
          >
            {ornament}
          </span>
        </div>
        <div className="min-w-0">
          <h2
            className="font-serif text-parchment font-bold leading-snug tracking-tight"
            style={{ fontSize: "clamp(1.0625rem, 2vw, 1.1875rem)" }}
          >
            {title}
          </h2>
          {subtitle && <p className="text-[0.8125rem] text-muted-foreground/50 mt-1 leading-snug">{subtitle}</p>}
        </div>
      </div>
      <div>{children}</div>
    </motion.section>
  );
}

// ─── Archive Panel: a parchment-toned content box ─────────────────

interface ArchivePanelProps {
  children: ReactNode;
  className?: string;
  variant?: "default" | "gold" | "crimson" | "verdigris";
}

export function ArchivePanel({ children, className, variant = "default" }: ArchivePanelProps) {
  const variantStyles: Record<string, React.CSSProperties> = {
    default: {
      background: "hsl(258, 20%, 7%)",
      border: "1px solid hsl(258, 14%, 16%)",
      boxShadow: "inset 0 1px 0 rgba(255,255,255,0.025), 0 2px 8px rgba(0,0,0,0.25)",
    },
    gold: {
      background: "rgba(201,169,110,0.04)",
      border: "1px solid rgba(201,169,110,0.16)",
      boxShadow: "inset 0 1px 0 rgba(201,169,110,0.06), 0 2px 8px rgba(0,0,0,0.2)",
    },
    crimson: {
      background: "rgba(139,58,58,0.07)",
      border: "1px solid rgba(139,58,58,0.18)",
      boxShadow: "inset 0 1px 0 rgba(184,92,92,0.04), 0 2px 8px rgba(0,0,0,0.2)",
    },
    verdigris: {
      background: "rgba(61,122,106,0.07)",
      border: "1px solid rgba(61,122,106,0.18)",
      boxShadow: "inset 0 1px 0 rgba(90,168,144,0.04), 0 2px 8px rgba(0,0,0,0.2)",
    },
  };

  return (
    <div className={cn("rounded-sm p-5 leading-relaxed", className)} style={variantStyles[variant]}>
      {children}
    </div>
  );
}

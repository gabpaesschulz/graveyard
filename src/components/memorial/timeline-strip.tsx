"use client";

import { motion } from "framer-motion";
import { cn, formatDateFull } from "@/lib/utils";
import type { TimelineEventType, EventType } from "@/types";

const EVENT_ICONS: Record<EventType, string> = {
  BIRTH: "◎",
  MILESTONE: "◆",
  SETBACK: "▼",
  PIVOT: "◈",
  NEAR_MISS: "◇",
  DEATH: "✕",
  AFTERMATH: "⟳",
};

const EVENT_COLORS: Record<EventType, string> = {
  BIRTH: "#3d7a6a",
  MILESTONE: "#c9a96e",
  SETBACK: "#8b3a3a",
  PIVOT: "#7c5c8c",
  NEAR_MISS: "#a06b3c",
  DEATH: "#5c1f1f",
  AFTERMATH: "#3d7a6a",
};

interface TimelineStripProps {
  events: TimelineEventType[];
  className?: string;
}

export function TimelineStrip({ events, className }: TimelineStripProps) {
  const sorted = [...events].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  return (
    <div className={cn("space-y-0", className)}>
      {sorted.map((event, index) => {
        const color = EVENT_COLORS[event.eventType];
        const icon = EVENT_ICONS[event.eventType];
        const isLast = index === sorted.length - 1;

        return (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1, duration: 0.4 }}
            className="flex gap-4"
          >
            {/* Timeline spine */}
            <div className="flex flex-col items-center">
              <div
                className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border text-xs"
                style={{
                  color,
                  borderColor: `${color}40`,
                  backgroundColor: `${color}10`,
                }}
              >
                {icon}
              </div>
              {!isLast && <div className="w-px flex-1 bg-border/50 my-1" />}
            </div>

            {/* Content */}
            <div className={cn("pb-6 min-w-0", isLast && "pb-0")}>
              <div className="flex flex-wrap items-baseline gap-2 mb-1">
                <span className="font-medium text-parchment text-sm">{event.title}</span>
                <span className="text-2xs font-mono text-muted-foreground/60">{formatDateFull(event.date)}</span>
              </div>
              {event.description && (
                <p className="text-sm text-muted-foreground leading-relaxed">{event.description}</p>
              )}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

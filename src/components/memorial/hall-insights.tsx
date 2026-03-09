"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { CAUSE_LABELS } from "@/lib/utils";
import type { ProjectCard, CauseOfDeath } from "@/types";

interface HallInsightsProps {
  projects: ProjectCard[];
}

function computeInsights(projects: ProjectCard[]): string[] {
  if (projects.length < 2) return [];

  const insights: string[] = [];

  // Most common cause of death
  const causeCounts = projects.reduce<Record<string, number>>((acc, p) => {
    acc[p.causeOfDeath] = (acc[p.causeOfDeath] ?? 0) + 1;
    return acc;
  }, {});
  const [topCause, topCount] = Object.entries(causeCounts).sort((a, b) => b[1] - a[1])[0];
  if (topCount > 1) {
    insights.push(
      `"${CAUSE_LABELS[topCause as CauseOfDeath]}" foi responsável pela morte de ${topCount} projetos aqui.`,
    );
  }

  // Resurrection candidates
  const resurrectCount = projects.filter((p) => ["HIGH", "INEVITABLE"].includes(p.resurrectionPotential)).length;
  if (resurrectCount > 0) {
    insights.push(
      `${resurrectCount} ${resurrectCount === 1 ? "projeto ainda pulsa" : "projetos ainda pulsam"} com potencial de reencarnação.`,
    );
  }

  // Pre-MVP deaths
  const preMvp = projects.filter((p) => ["IDEA", "SKETCH", "PROTOTYPE"].includes(p.stage)).length;
  const preMvpPct = Math.round((preMvp / projects.length) * 100);
  if (preMvp > 1 && preMvpPct >= 30) {
    insights.push(`${preMvpPct}% dos projetos aqui morreram antes de chegar ao MVP.`);
  }

  // Real users
  const withUsers = projects.filter((p) => p.hadRealUsers).length;
  if (withUsers > 0) {
    insights.push(
      `${withUsers} ${withUsers === 1 ? "projeto teve" : "projetos tiveram"} usuários reais antes de serem enterrados.`,
    );
  }

  // Haunting or heavy emotional weight
  const heavy = projects.filter((p) => ["HEAVY", "HAUNTING"].includes(p.emotionalWeight)).length;
  if (heavy > 0) {
    insights.push(
      `${heavy} ${heavy === 1 ? "memorial carrega" : "memoriais carregam"} um peso emocional pesado ou assombroso.`,
    );
  }

  return insights;
}

export function HallInsights({ projects }: HallInsightsProps) {
  const insight = useMemo(() => {
    const all = computeInsights(projects);
    if (all.length === 0) return null;
    // Rotate daily so the same user sees a fresh insight each visit
    const dayIndex = new Date().getDay();
    return all[dayIndex % all.length];
  }, [projects]);

  if (!insight) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.5 }}
      className="flex items-center gap-2.5 px-4 py-2.5 rounded-memorial border border-gold/10 bg-gold/[0.03] text-xs text-muted-foreground/60"
    >
      <span className="text-gold/30 font-mono shrink-0" aria-hidden>
        ◈
      </span>
      <span className="italic">{insight}</span>
    </motion.div>
  );
}

"use client";

import { memo } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { StarIcon } from "lucide-react";
import {
  cn,
  formatDate,
  formatRelative,
  calculateLifespan,
  STAGE_LABELS,
  EMOTIONAL_COLORS,
  resurrectionPercent,
  RESURRECTION_LABELS,
} from "@/lib/utils";
import { CauseBadge } from "./cause-badge";
import { EmotionalWeightPill } from "./emotional-weight-pill";
import type { ProjectCard } from "@/types";

interface MemorialCardProps {
  project: ProjectCard;
  index?: number;
  className?: string;
  isWeeklyHighlight?: boolean;
  isFavorite?: boolean;
  onFavorite?: (id: string) => void;
  onTagClick?: (tag: string) => void;
}

function MemorialCardBase({
  project,
  index = 0,
  className,
  isWeeklyHighlight = false,
  isFavorite = false,
  onFavorite,
  onTagClick,
}: MemorialCardProps) {
  const lifespan = calculateLifespan(project.bornAt, project.diedAt);
  const resPercent = resurrectionPercent(project.resurrectionPotential);
  const emotionColor = EMOTIONAL_COLORS[project.emotionalWeight];

  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: index * 0.07,
        duration: 0.55,
        ease: [0.16, 1, 0.3, 1],
      }}
      whileHover={{ y: -4, transition: { type: "spring", stiffness: 420, damping: 28, mass: 0.75 } }}
      whileTap={{ scale: 0.987, transition: { duration: 0.1 } }}
      style={{ willChange: "transform" }}
      className="relative"
    >
      {isWeeklyHighlight && (
        <div
          className="absolute -inset-px rounded-memorial pointer-events-none z-10"
          style={{ boxShadow: "0 0 0 1px rgba(201,169,110,0.35), 0 0 20px rgba(201,169,110,0.08)" }}
        />
      )}
      <Link href={`/hall/${project.slug}`} className="block group">
        <article className={cn("card-memorial corner-ornament p-4 sm:p-6 cursor-pointer", className)}>
          {" "}
          {/* Emotion color left accent */}
          <div
            className="absolute left-0 top-0 bottom-0 w-0.5 pointer-events-none"
            style={{ background: `linear-gradient(to bottom, ${emotionColor}55, ${emotionColor}12)` }}
          />{" "}
          {/* Header */}
          <div className="flex items-start justify-between gap-3 mb-4">
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2 mb-2">
                {isWeeklyHighlight && (
                  <span className="text-[10px] font-mono text-gold/65 tracking-widest uppercase">★&thinsp;semana</span>
                )}
                <span className="text-[10px] font-mono uppercase tracking-[0.18em] text-muted-foreground/40">
                  {STAGE_LABELS[project.stage]}
                </span>
              </div>
              <h3 className="font-serif font-bold text-parchment text-[1.05rem] leading-tight group-hover:text-gold transition-colors duration-200 truncate">
                {project.name}
              </h3>
              {project.slogan && (
                <p className="text-[0.75rem] text-muted-foreground/50 mt-1 truncate leading-snug">{project.slogan}</p>
              )}
            </div>
            <div className="flex items-start gap-1.5 shrink-0">
              {onFavorite && (
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    onFavorite(project.id);
                  }}
                  aria-label={isFavorite ? "Remover dos favoritos" : "Salvar nos favoritos"}
                  aria-pressed={isFavorite}
                  className={cn(
                    "p-1 rounded transition-all duration-150 mt-0.5",
                    isFavorite ? "text-gold" : "text-transparent group-hover:text-muted-foreground/40 hover:!text-gold",
                  )}
                >
                  <StarIcon className={cn("h-3.5 w-3.5", isFavorite && "fill-current")} />
                </button>
              )}
              <EmotionalWeightPill weight={project.emotionalWeight} size="sm" />
            </div>
          </div>
          {/* Epitaph */}
          <blockquote className="epitaph text-[0.875rem] leading-[1.65] mb-5 line-clamp-2">
            {project.epitaph}
          </blockquote>
          {/* Meta row */}
          {(project.bornAt || project.diedAt) && (
            <div className="flex items-center gap-2 text-[10px] text-muted-foreground/35 font-mono mb-4 flex-wrap">
              {project.bornAt && project.diedAt ? (
                <span>
                  {formatDate(project.bornAt)}&thinsp;→&thinsp;{formatDate(project.diedAt)}
                </span>
              ) : project.diedAt ? (
                <span>†&thinsp;{formatDate(project.diedAt)}</span>
              ) : null}
              {project.diedAt && (
                <>
                  <span className="text-border/40">·</span>
                  <span className="text-gold/30 italic">{formatRelative(project.diedAt)}</span>
                </>
              )}
              {lifespan !== "—" && (
                <>
                  <span className="text-border/40">·</span>
                  <span className="text-muted-foreground/25">{lifespan}</span>
                </>
              )}
            </div>
          )}
          {/* Cause */}
          <div className="mb-5">
            <CauseBadge cause={project.causeOfDeath} />
          </div>
          {/* Resurrection meter */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-mono uppercase tracking-[0.16em] text-muted-foreground/38">
                Reencarnação
              </span>
              <span className="text-[10px] text-gold/55 font-mono">
                {RESURRECTION_LABELS[project.resurrectionPotential]}
              </span>
            </div>
            <div className="resurrection-track">
              <motion.div
                className="resurrection-fill"
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: `${resPercent}%`, opacity: 1 }}
                transition={{ delay: index * 0.07 + 0.4, duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
              />
            </div>
          </div>
          {/* Tags */}
          {project.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-5 pt-4 border-t border-border/30">
              {project.tags.slice(0, 4).map((tag) => (
                <span
                  key={tag.id}
                  onClick={
                    onTagClick
                      ? (e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          onTagClick(tag.name);
                        }
                      : undefined
                  }
                  className={cn(
                    "text-[10px] px-1.5 py-0.5 rounded-sm border border-border/40 bg-muted/20 text-muted-foreground/45 font-mono tracking-wide transition-all duration-150",
                    onTagClick && "hover:border-gold/25 hover:bg-gold/8 hover:text-gold/70 cursor-pointer",
                  )}
                >
                  {tag.name}
                </span>
              ))}
              {project.tags.length > 4 && (
                <span className="text-[10px] px-1 py-0.5 text-muted-foreground/30 font-mono">
                  +{project.tags.length - 4}
                </span>
              )}
            </div>
          )}
        </article>
      </Link>
    </motion.div>
  );
}

// memo prevents unnecessary re-renders when parent re-renders due to filter/sort/search
// but this card's own props (project, index, isFavorite, isWeeklyHighlight) haven't changed
export const MemorialCard = memo(MemorialCardBase);

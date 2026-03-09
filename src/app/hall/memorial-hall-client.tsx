"use client";

import { useState, useMemo, useCallback, memo } from "react";
import { motion } from "framer-motion";
import { SearchIcon, GridIcon, LayoutListIcon, StarIcon, XIcon, ArrowRightIcon } from "lucide-react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { MemorialCard } from "@/components/memorial/memorial-card";
import { MemorialEmptyState } from "@/components/memorial/memorial-empty-state";
import { CauseBadge } from "@/components/memorial/cause-badge";
import { HallInsights } from "@/components/memorial/hall-insights";
import { useFavorites } from "@/hooks/use-favorites";
import {
  cn,
  formatDate,
  CAUSE_LABELS,
  STAGE_LABELS,
  TYPE_LABELS,
  EMOTIONAL_COLORS,
  EMOTIONAL_LABELS,
  resurrectionPercent,
  getISOWeek,
} from "@/lib/utils";
import type { ProjectCard } from "@/types";

// ─── Sort order maps ──────────────────────────────────────────────
const EMOTIONAL_ORDER: Record<string, number> = {
  LIGHT: 1,
  LIBERATING: 2,
  BITTERSWEET: 3,
  NOSTALGIC: 4,
  HEAVY: 5,
  HAUNTING: 6,
};
const RES_ORDER: Record<string, number> = { NONE: 0, LOW: 1, MEDIUM: 2, HIGH: 3, INEVITABLE: 4 };

/** Deterministically picks a project id based on ISO week + year */
function getWeeklyHighlightId(projects: ProjectCard[]): string | null {
  if (projects.length === 0) return null;
  const now = new Date();
  const seed = now.getFullYear() * 100 + getISOWeek(now);
  return projects[seed % projects.length].id;
}

// ─── Archive row ──────────────────────────────────────────────────
const ArchiveRow = memo(function ArchiveRow({
  project,
  index,
  isFavorite,
  onFavorite,
  onTagClick,
}: {
  project: ProjectCard;
  index: number;
  isFavorite: boolean;
  onFavorite: (id: string) => void;
  onTagClick?: (tag: string) => void;
}) {
  const resPercent = resurrectionPercent(project.resurrectionPotential);

  return (
    <Link
      href={`/hall/${project.slug}`}
      className="group/row flex items-center gap-3 px-4 py-3 hover:bg-card/40 hover:pl-5 transition-all duration-200"
    >
      <span className="text-2xs text-muted-foreground/25 font-mono w-5 shrink-0 text-right tabular-nums">
        {String(index + 1).padStart(2, "0")}
      </span>

      <div className="flex-1 min-w-0">
        <div className="flex items-baseline gap-2 min-w-0">
          <span className="text-sm font-medium text-parchment-muted group-hover/row:text-parchment transition-colors truncate">
            {project.name}
          </span>
          {project.slogan && (
            <span className="text-xs text-muted-foreground/35 truncate hidden md:block">{project.slogan}</span>
          )}
        </div>
      </div>

      {/* Tags — appear on hover */}
      {project.tags.length > 0 && (
        <div className="hidden xl:flex gap-1 shrink-0 opacity-0 group-hover/row:opacity-100 transition-opacity">
          {project.tags.slice(0, 2).map((tag) => (
            <span
              key={tag.id}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onTagClick?.(tag.name);
              }}
              className="text-2xs px-1.5 py-0.5 rounded bg-muted/30 text-muted-foreground/50 font-mono hover:bg-gold/10 hover:text-gold transition-colors cursor-pointer"
            >
              #{tag.name}
            </span>
          ))}
        </div>
      )}

      <div className="shrink-0 hidden md:block">
        <CauseBadge cause={project.causeOfDeath} />
      </div>

      <div
        className="h-2 w-2 rounded-full shrink-0 hidden sm:block ring-1 ring-white/10"
        style={{ backgroundColor: EMOTIONAL_COLORS[project.emotionalWeight] }}
        title={EMOTIONAL_LABELS[project.emotionalWeight]}
      />

      <div className="w-14 shrink-0 hidden lg:block">
        <div className="h-1 rounded-full bg-muted/25 overflow-hidden">
          <div
            className="h-full rounded-full"
            style={{
              width: `${resPercent}%`,
              background: "linear-gradient(90deg, rgba(201,169,110,0.4), rgba(201,169,110,0.7))",
            }}
          />
        </div>
      </div>

      {project.diedAt && (
        <span className="text-2xs text-muted-foreground/35 font-mono shrink-0 hidden sm:block w-16 text-right tabular-nums">
          {formatDate(project.diedAt)}
        </span>
      )}

      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          onFavorite(project.id);
        }}
        className={cn(
          "shrink-0 p-1.5 rounded transition-all",
          isFavorite ? "text-gold" : "text-transparent group-hover/row:text-muted-foreground/30 hover:!text-gold",
        )}
        aria-label={isFavorite ? "Remover dos favoritos" : "Salvar nos favoritos"}
        aria-pressed={isFavorite}
      >
        <StarIcon className={cn("h-3.5 w-3.5", isFavorite && "fill-current")} />
      </button>

      <ArrowRightIcon className="h-3.5 w-3.5 text-muted-foreground/15 group-hover/row:text-gold/35 transition-colors shrink-0" />
    </Link>
  );
});

// ─── Main client ──────────────────────────────────────────────────
interface MemorialHallClientProps {
  projects: ProjectCard[];
}

export function MemorialHallClient({ projects }: MemorialHallClientProps) {
  const [search, setSearch] = useState("");
  const [filterCause, setFilterCause] = useState<string>("all");
  const [filterStage, setFilterStage] = useState<string>("all");
  const [filterType, setFilterType] = useState<string>("all");
  const [filterTag, setFilterTag] = useState<string>("");
  const [filterFavorites, setFilterFavorites] = useState(false);
  const [sortBy, setSortBy] = useState("createdAt");
  const [view, setView] = useState<"grid" | "archive">("grid");

  const { favorites, toggle, hydrated } = useFavorites();

  const weeklyHighlightId = useMemo(() => getWeeklyHighlightId(projects), [projects]);

  const handleTagClick = useCallback((tagName: string) => {
    setFilterTag(tagName);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const filtered = useMemo(() => {
    let result = [...projects];

    // Tag chip filter
    if (filterTag) {
      result = result.filter((p) => p.tags.some((t) => t.name.toLowerCase() === filterTag.toLowerCase()));
    }

    // Search: supports #tag syntax
    if (search) {
      if (search.startsWith("#")) {
        const tagQuery = search.slice(1).toLowerCase();
        result = result.filter((p) => p.tags.some((t) => t.name.toLowerCase().includes(tagQuery)));
      } else {
        const q = search.toLowerCase();
        result = result.filter(
          (p) =>
            p.name.toLowerCase().includes(q) ||
            p.epitaph.toLowerCase().includes(q) ||
            p.description?.toLowerCase().includes(q) ||
            p.slogan?.toLowerCase().includes(q) ||
            p.tags.some((t) => t.name.toLowerCase().includes(q)),
        );
      }
    }

    if (filterCause !== "all") result = result.filter((p) => p.causeOfDeath === filterCause);
    if (filterStage !== "all") result = result.filter((p) => p.stage === filterStage);
    if (filterType !== "all") result = result.filter((p) => p.type === filterType);
    if (filterFavorites && hydrated) result = result.filter((p) => favorites.has(p.id));

    result.sort((a, b) => {
      if (sortBy === "name") return a.name.localeCompare(b.name);
      if (sortBy === "diedAt") {
        const da = a.diedAt ? new Date(a.diedAt).getTime() : 0;
        const db = b.diedAt ? new Date(b.diedAt).getTime() : 0;
        return db - da;
      }
      if (sortBy === "emotionalWeight") {
        return (EMOTIONAL_ORDER[b.emotionalWeight] ?? 0) - (EMOTIONAL_ORDER[a.emotionalWeight] ?? 0);
      }
      if (sortBy === "resurrectionPotential") {
        return (RES_ORDER[b.resurrectionPotential] ?? 0) - (RES_ORDER[a.resurrectionPotential] ?? 0);
      }
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

    return result;
  }, [projects, search, filterCause, filterStage, filterType, filterTag, filterFavorites, sortBy, favorites, hydrated]);

  const hasActiveFilters =
    filterCause !== "all" ||
    filterStage !== "all" ||
    filterType !== "all" ||
    !!filterTag ||
    filterFavorites ||
    !!search;

  const clearAllFilters = useCallback(() => {
    setSearch("");
    setFilterCause("all");
    setFilterStage("all");
    setFilterType("all");
    setFilterTag("");
    setFilterFavorites(false);
  }, []);

  // pre-compute header stats once — projects prop is stable between renders
  const headerStats = useMemo(
    () => [
      { label: "Enterrados", value: projects.length, color: "#c9a96e" },
      { label: "Com usuários reais", value: projects.filter((p) => p.hadRealUsers).length, color: "#3d7a6a" },
      {
        label: "Potencial de reencarnação",
        value: projects.filter((p) => ["HIGH", "INEVITABLE"].includes(p.resurrectionPotential)).length,
        color: "#7c5c8c",
      },
    ],
    [projects],
  );

  return (
    <main className="flex-1">
      {/* Page header */}
      <div className="relative border-b border-border/40 overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 70% 90% at 50% 0%, rgba(201,169,110,0.065) 0%, transparent 65%), radial-gradient(ellipse 30% 40% at 90% 50%, rgba(61,122,106,0.03) 0%, transparent 60%)",
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(201,169,110,0.055) 1px, transparent 1px)",
            backgroundSize: "30px 30px",
            maskImage: "radial-gradient(ellipse 80% 100% at 80% 50%, black 0%, transparent 100%)",
          }}
        />
        <div className="absolute top-0 left-0 right-0 line-gold" />
        <div className="container py-12 sm:py-16 relative">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-3 mb-5"
          >
            <div className="h-px w-8 bg-gold/30" />
            <span className="text-[10px] font-mono uppercase tracking-[0.22em] text-gold/50">Salão Memorial</span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.06, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif font-black text-parchment mb-4 tracking-tight"
            style={{ fontSize: "clamp(1.9rem, 4vw, 3.25rem)", letterSpacing: "-0.025em" }}
          >
            Os projetos que quase foram
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.12 }}
            className="max-w-xl leading-relaxed text-[0.9375rem]"
            style={{ color: "hsl(38 10% 50%)" }}
          >
            Um arquivo permanente de ideias, produtos e iniciativas que ficaram no meio do caminho.
          </motion.p>

          {/* Stats row */}
          <div className="flex flex-wrap items-center gap-8 mt-10 pt-8 border-t border-border/30">
            {headerStats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.08, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col gap-1.5"
              >
                <span
                  className="font-serif font-black leading-none tabular-nums"
                  style={{ fontSize: "clamp(1.9rem, 3vw, 2.75rem)", color: stat.color, letterSpacing: "-0.02em" }}
                >
                  {stat.value}
                </span>
                <span className="text-[10px] font-mono uppercase tracking-[0.15em] text-muted-foreground/45">
                  {stat.label}
                </span>
              </motion.div>
            ))}
            {hydrated && favorites.size > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.39 }}
                className="flex flex-col gap-1.5"
              >
                <span
                  className="font-serif font-black leading-none tabular-nums text-gold"
                  style={{ fontSize: "clamp(1.9rem, 3vw, 2.75rem)", letterSpacing: "-0.02em" }}
                >
                  {favorites.size}
                </span>
                <span className="text-[10px] font-mono uppercase tracking-[0.15em] text-muted-foreground/45">
                  favoritos
                </span>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* Filters bar */}
      <div className="sticky top-16 z-40 border-b border-border/40 bg-background/88 backdrop-blur-xl backdrop-saturate-150">
        <div className="absolute inset-x-0 top-0 line-gold" />
        <div className="container py-2.5">
          <div className="flex flex-col gap-2">
            {/* Row 1: Search + tag chip + favorites + view toggle */}
            <div className="flex items-center gap-2 flex-wrap">
              <div className="relative flex-1 min-w-[160px] max-w-sm">
                <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground/50" />
                <Input
                  placeholder="Buscar... ou #tag"
                  aria-label="Buscar projetos ou filtrar por tag"
                  className="pl-9 h-9 bg-card border-border text-sm"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                {search && (
                  <button
                    onClick={() => setSearch("")}
                    aria-label="Limpar busca"
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground/40 hover:text-muted-foreground"
                  >
                    <XIcon className="h-3.5 w-3.5" />
                  </button>
                )}
              </div>

              {/* Active tag chip */}
              {filterTag && (
                <div className="flex items-center gap-1.5 h-9 px-3 bg-gold/10 border border-gold/30 rounded-sm text-[11px] text-gold font-mono shrink-0 tracking-wide">
                  #{filterTag}
                  <button
                    onClick={() => setFilterTag("")}
                    aria-label="Remover filtro de tag"
                    className="hover:text-parchment transition-colors"
                  >
                    <XIcon className="h-3 w-3" />
                  </button>
                </div>
              )}

              {/* Favorites toggle */}
              <button
                onClick={() => setFilterFavorites((v) => !v)}
                aria-label="Mostrar apenas favoritos"
                aria-pressed={filterFavorites}
                className={cn(
                  "h-9 px-2.5 sm:px-3 rounded-sm border text-sm flex items-center gap-1.5 transition-all shrink-0",
                  filterFavorites
                    ? "bg-gold/10 border-gold/30 text-gold"
                    : "bg-card border-border text-muted-foreground hover:text-parchment",
                )}
              >
                <StarIcon className={cn("h-3.5 w-3.5", filterFavorites && "fill-current")} />
                {filterFavorites && <span className="text-xs font-mono">Favoritos</span>}
              </button>

              <div className="ml-auto flex items-center gap-2 shrink-0">
                {hasActiveFilters && (
                  <button
                    onClick={clearAllFilters}
                    className="text-xs text-muted-foreground/50 hover:text-parchment transition-colors font-mono"
                  >
                    limpar
                  </button>
                )}

                {/* Sort */}
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="h-8 w-auto bg-card border-border text-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="createdAt">Mais recente</SelectItem>
                    <SelectItem value="diedAt">Data da morte</SelectItem>
                    <SelectItem value="name">Nome A–Z</SelectItem>
                    <SelectItem value="emotionalWeight">Peso emocional</SelectItem>
                    <SelectItem value="resurrectionPotential">Chance de reencarnação</SelectItem>
                  </SelectContent>
                </Select>

                <div
                  role="group"
                  aria-label="Modo de exibição"
                  className="flex rounded-sm border border-border overflow-hidden"
                >
                  <button
                    onClick={() => setView("grid")}
                    aria-label="Visualizar em galeria"
                    aria-pressed={view === "grid"}
                    className={cn(
                      "p-2 transition-colors",
                      view === "grid"
                        ? "bg-gold/10 text-gold"
                        : "text-muted-foreground hover:text-parchment hover:bg-card",
                    )}
                  >
                    <GridIcon className="h-3.5 w-3.5" />
                  </button>
                  <button
                    onClick={() => setView("archive")}
                    aria-label="Visualizar como arquivo"
                    aria-pressed={view === "archive"}
                    className={cn(
                      "p-2 transition-colors",
                      view === "archive"
                        ? "bg-gold/10 text-gold"
                        : "text-muted-foreground hover:text-parchment hover:bg-card",
                    )}
                  >
                    <LayoutListIcon className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Row 2: Dropdown filters */}
            <div className="flex items-center gap-2 overflow-x-auto scrollbar-none pb-0.5">
              <Select value={filterCause} onValueChange={setFilterCause}>
                <SelectTrigger className="h-8 w-auto shrink-0 min-w-[120px] bg-card border-border text-xs">
                  <SelectValue placeholder="Causa" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas as causas</SelectItem>
                  {Object.entries(CAUSE_LABELS).map(([key, label]) => (
                    <SelectItem key={key} value={key}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={filterStage} onValueChange={setFilterStage}>
                <SelectTrigger className="h-8 w-auto shrink-0 min-w-[110px] bg-card border-border text-xs">
                  <SelectValue placeholder="Estágio" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os estágios</SelectItem>
                  {Object.entries(STAGE_LABELS).map(([key, label]) => (
                    <SelectItem key={key} value={key}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="h-8 w-auto shrink-0 min-w-[100px] bg-card border-border text-xs">
                  <SelectValue placeholder="Tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os tipos</SelectItem>
                  {Object.entries(TYPE_LABELS).map(([key, label]) => (
                    <SelectItem key={key} value={key}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container py-8 sm:py-10">
        {projects.length === 0 ? (
          <MemorialEmptyState
            icon="⚰"
            title="O cemitério abre suas portas"
            description="Nenhum projeto foi sepultado ainda. Todo arquivo começa com um único nome gravado na pedra."
            action={{ label: "+ Realizar o primeiro funeral", href: "/new" }}
          />
        ) : filtered.length === 0 ? (
          <MemorialEmptyState
            icon={filterFavorites ? "★" : "◌"}
            title={filterFavorites ? "Nenhum favorito ainda" : "Silêncio entre os túmulos"}
            description={
              filterFavorites
                ? "Salve memoriais com a estrela para vê-los aqui."
                : "Nenhum memorial encontrado para os filtros aplicados."
            }
            action={
              hasActiveFilters
                ? { label: "Limpar filtros", href: "/hall" }
                : { label: "Registrar um memorial", href: "/new" }
            }
          />
        ) : (
          <>
            <div className="flex items-center justify-between mb-6">
              <p className="text-[0.8125rem] text-muted-foreground/70">
                <span className="text-parchment font-medium">{filtered.length}</span>{" "}
                {filtered.length === 1 ? "memorial" : "memoriais"}
                {filtered.length !== projects.length && (
                  <span className="text-muted-foreground/50"> de {projects.length}</span>
                )}
                {filterTag && <span className="ml-2 text-gold/70 font-mono text-xs">#{filterTag}</span>}
              </p>
              {view === "archive" && (
                <p className="text-xs text-muted-foreground/35 font-mono hidden md:block">
                  Projeto · Causa · Emoção · Reenc. · Data
                </p>
              )}
            </div>

            {/* Auto insights */}
            {!hasActiveFilters && (
              <div className="mb-6">
                <HallInsights projects={projects} />
              </div>
            )}

            {/* Gallery view */}
            {view === "grid" && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {filtered.map((project, i) => (
                  <MemorialCard
                    key={project.id}
                    project={project}
                    index={i}
                    isFavorite={hydrated && favorites.has(project.id)}
                    onFavorite={toggle}
                    onTagClick={handleTagClick}
                    isWeeklyHighlight={project.id === weeklyHighlightId}
                  />
                ))}
              </div>
            )}

            {/* Archive view */}
            {view === "archive" && (
              <div className="rounded-sm border border-border/40 overflow-hidden">
                <div className="flex items-center gap-3 px-4 py-2 bg-card/60 border-b border-border/40">
                  <span className="w-5 shrink-0" />
                  <span className="flex-1 text-2xs font-mono uppercase tracking-wider text-muted-foreground/35">
                    Projeto
                  </span>
                  <span className="hidden md:block shrink-0 w-28 text-2xs font-mono uppercase tracking-wider text-muted-foreground/35">
                    Causa
                  </span>
                  <span className="hidden sm:block shrink-0 w-3" />
                  <span className="hidden lg:block shrink-0 w-14 text-2xs font-mono uppercase tracking-wider text-muted-foreground/35">
                    Reenc.
                  </span>
                  <span className="hidden sm:block shrink-0 w-16 text-right text-2xs font-mono uppercase tracking-wider text-muted-foreground/35">
                    Morte
                  </span>
                  <span className="shrink-0 w-8" />
                  <span className="shrink-0 w-4" />
                </div>
                <div className="divide-y divide-border/30">
                  {filtered.map((project, i) => (
                    <ArchiveRow
                      key={project.id}
                      project={project}
                      index={i}
                      isFavorite={hydrated && favorites.has(project.id)}
                      onFavorite={toggle}
                      onTagClick={handleTagClick}
                    />
                  ))}
                </div>
              </div>
            )}

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-12 text-center"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="flex-1 h-px bg-border/30" />
                <span className="text-gold/25 text-xs font-mono tracking-widest">✦</span>
                <div className="flex-1 h-px bg-border/30" />
              </div>
              <p className="text-[0.8125rem] mb-5" style={{ color: "hsl(38 10% 46%)" }}>
                Tem um projeto que merece um enterro digno?
              </p>
              <Link href="/new">
                <Button variant="ghost" className="text-gold border border-gold/30 hover:bg-gold/10">
                  Criar um memorial
                </Button>
              </Link>
            </motion.div>
          </>
        )}
      </div>
    </main>
  );
}

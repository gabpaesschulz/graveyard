"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import {
  SearchIcon,
  ArrowRightIcon,
  BookOpenIcon,
  BarChart2Icon,
  SparklesIcon,
  PlusIcon,
  FlowerIcon,
  SkullIcon,
  HomeIcon,
  StarIcon,
  XIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { ProjectWithRelations } from "@/types";

// ─── Global trigger ───────────────────────────────────────────────
type Listener = (open: boolean) => void;
const listeners = new Set<Listener>();

export function triggerCommandPalette() {
  listeners.forEach((fn) => fn(true));
}

// ─── Types ────────────────────────────────────────────────────────
interface CommandItem {
  id: string;
  label: string;
  description?: string;
  icon: React.ReactNode;
  action: () => void;
  group: string;
  keywords?: string;
}

// ─── Component ────────────────────────────────────────────────────
export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const [projects, setProjects] = useState<ProjectWithRelations[]>([]);
  const [loaded, setLoaded] = useState(false);
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  // Register global open listener
  useEffect(() => {
    const fn: Listener = (v) => setOpen(v);
    listeners.add(fn);
    return () => {
      listeners.delete(fn);
    };
  }, []);

  // ⌘K / Ctrl+K shortcut
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  // Lazy-load projects on first open
  useEffect(() => {
    if (open && !loaded) {
      fetch("/api/projects")
        .then((r) => r.json())
        .then((data: ProjectWithRelations[]) => {
          setProjects(data);
          setLoaded(true);
        })
        .catch(() => setLoaded(true));
    }
    if (open) {
      setQuery("");
      setActiveIndex(0);
      setTimeout(() => inputRef.current?.focus(), 30);
    }
  }, [open, loaded]);

  const go = useCallback(
    (href: string) => {
      router.push(href);
      setOpen(false);
    },
    [router],
  );

  const NAVIGATION: CommandItem[] = [
    {
      id: "nav-hall",
      label: "Memorial Hall",
      description: "Galeria de todos os memoriais",
      icon: <BookOpenIcon className="h-4 w-4" />,
      action: () => go("/hall"),
      group: "Navegação",
      keywords: "hall memorial projetos lista galeria",
    },
    {
      id: "nav-new",
      label: "Novo memorial",
      description: "Registrar um projeto morto",
      icon: <PlusIcon className="h-4 w-4" />,
      action: () => go("/new"),
      group: "Navegação",
      keywords: "criar novo projeto funeral enterrar registrar",
    },
    {
      id: "nav-home",
      label: "Início",
      description: "Página inicial",
      icon: <HomeIcon className="h-4 w-4" />,
      action: () => go("/"),
      group: "Navegação",
      keywords: "home início página principal",
    },
    {
      id: "nav-analytics",
      label: "Estatísticas",
      description: "Painel de análises e dados",
      icon: <BarChart2Icon className="h-4 w-4" />,
      action: () => go("/analytics"),
      group: "Navegação",
      keywords: "analytics dados gráficos painel análise",
    },
    {
      id: "nav-reincarnation",
      label: "Reencarnação",
      description: "Projetos com potencial de reviver",
      icon: <SparklesIcon className="h-4 w-4" />,
      action: () => go("/reincarnation"),
      group: "Navegação",
      keywords: "reencarnação potencial reviver ressurreição",
    },
    {
      id: "nav-manifesto",
      label: "Manifesto",
      description: "Por que isso importa",
      icon: <FlowerIcon className="h-4 w-4" />,
      action: () => go("/manifesto"),
      group: "Navegação",
      keywords: "manifesto filosofia porquê",
    },
  ];

  const projectCommands: CommandItem[] = projects.map((p) => ({
    id: `p-${p.id}`,
    label: p.name,
    description: p.epitaph,
    icon: <SkullIcon className="h-4 w-4" />,
    action: () => go(`/hall/${p.slug}`),
    group: "Memoriais",
    keywords: [p.slogan, p.description, ...p.tags.map((t) => t.name), p.causeOfDeath, p.stage, p.type]
      .filter(Boolean)
      .join(" "),
  }));

  const ALL = [...NAVIGATION, ...projectCommands];

  const filtered = query.trim()
    ? ALL.filter((cmd) => {
        const q = query.toLowerCase();
        return (
          cmd.label.toLowerCase().includes(q) ||
          cmd.description?.toLowerCase().includes(q) ||
          (cmd.keywords?.toLowerCase().includes(q) ?? false)
        );
      })
    : ALL;

  const grouped = filtered.reduce<Record<string, CommandItem[]>>((acc, item) => {
    (acc[item.group] ??= []).push(item);
    return acc;
  }, {});

  // Keyboard navigation
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActiveIndex((i) => Math.min(i + 1, filtered.length - 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setActiveIndex((i) => Math.max(i - 1, 0));
      } else if (e.key === "Enter") {
        e.preventDefault();
        filtered[activeIndex]?.action();
      } else if (e.key === "Escape") {
        setOpen(false);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, activeIndex, filtered]);

  useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[999] flex items-start justify-center pt-[13vh] px-4">
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />

          {/* Panel */}
          <motion.div
            key="panel"
            initial={{ opacity: 0, y: -18, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.18, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="relative z-10 w-full max-w-xl bg-[#0e0e12] border border-gold/20 rounded-xl overflow-hidden"
            style={{
              boxShadow:
                "0 0 0 1px rgba(201,169,110,0.06), 0 32px 80px rgba(0,0,0,0.85), 0 0 60px rgba(201,169,110,0.03)",
            }}
          >
            {/* Search input */}
            <div className="flex items-center gap-3 px-4 py-3.5 border-b border-white/5">
              <SearchIcon className="h-4 w-4 text-muted-foreground/50 shrink-0" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Buscar memoriais, páginas..."
                className="flex-1 bg-transparent text-parchment placeholder:text-muted-foreground/35 text-sm outline-none"
              />
              {query ? (
                <button
                  onClick={() => setQuery("")}
                  className="text-muted-foreground/40 hover:text-muted-foreground transition-colors"
                >
                  <XIcon className="h-3.5 w-3.5" />
                </button>
              ) : (
                <div className="flex items-center gap-1">
                  <StarIcon className="h-3 w-3 text-gold/25" />
                  <span className="text-[10px] text-muted-foreground/25 font-mono">
                    {projects.length > 0 ? `${projects.length} memoriais` : "carregando..."}
                  </span>
                </div>
              )}
            </div>

            {/* Results */}
            <div className="max-h-[380px] overflow-y-auto overscroll-contain py-2">
              {filtered.length === 0 ? (
                <div className="py-14 text-center">
                  <p className="text-sm text-muted-foreground/40">Nenhum resultado para &ldquo;{query}&rdquo;</p>
                </div>
              ) : (
                (() => {
                  let flatIdx = 0;
                  return Object.entries(grouped).map(([group, items]) => (
                    <div key={group} className="mb-1 last:mb-0">
                      <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground/30 px-3 pt-3 pb-1.5">
                        {group}
                      </p>
                      {items.map((item) => {
                        const idx = flatIdx++;
                        const isActive = idx === activeIndex;
                        return (
                          <button
                            key={item.id}
                            onClick={item.action}
                            onMouseEnter={() => setActiveIndex(idx)}
                            className={cn(
                              "w-full flex items-center gap-3 px-3 py-2.5 mx-1 rounded-lg text-left transition-colors",
                              "w-[calc(100%-8px)]",
                              isActive
                                ? "bg-gold/8 text-parchment"
                                : "text-muted-foreground hover:text-parchment hover:bg-white/3",
                            )}
                          >
                            <span
                              className={cn(
                                "shrink-0 transition-colors",
                                isActive ? "text-gold" : "text-muted-foreground/35",
                              )}
                            >
                              {item.icon}
                            </span>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium truncate">{item.label}</p>
                              {item.description && (
                                <p className="text-xs text-muted-foreground/45 truncate mt-0.5 leading-snug">
                                  {item.description}
                                </p>
                              )}
                            </div>
                            {isActive && <ArrowRightIcon className="h-3.5 w-3.5 text-gold/40 shrink-0" />}
                          </button>
                        );
                      })}
                    </div>
                  ));
                })()
              )}
            </div>

            {/* Footer */}
            <div className="border-t border-white/5 px-4 py-2.5 flex items-center gap-3 text-[10px] text-muted-foreground/25 font-mono">
              <span>
                <kbd className="border border-white/10 rounded px-1 py-px mr-1">↑↓</kbd>navegar
              </span>
              <span>
                <kbd className="border border-white/10 rounded px-1 py-px mr-1">↵</kbd>abrir
              </span>
              <span>
                <kbd className="border border-white/10 rounded px-1 py-px mr-1">esc</kbd>fechar
              </span>
              <span className="ml-auto">
                {filtered.length} resultado{filtered.length !== 1 ? "s" : ""}
              </span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

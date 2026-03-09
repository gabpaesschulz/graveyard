import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { formatDistanceToNow, format, differenceInDays } from "date-fns";
import { ptBR } from "date-fns/locale";
import type {
  CauseOfDeath,
  LifecycleStage,
  EmotionalWeight,
  ProjectType,
  ResurrectionPotential,
  LessonCategory,
  AfterlifeStrategy,
  ArtifactType,
} from "@/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// ─── Date utilities ───────────────────────────────────────────────

export function formatDate(date: Date | string | null): string {
  if (!date) return "Data desconhecida";
  const d = typeof date === "string" ? new Date(date) : date;
  return format(d, "MMM yyyy", { locale: ptBR });
}

export function formatDateFull(date: Date | string | null): string {
  if (!date) return "—";
  const d = typeof date === "string" ? new Date(date) : date;
  return format(d, "d 'de' MMMM 'de' yyyy", { locale: ptBR });
}

export function formatRelative(date: Date | string | null): string {
  if (!date) return "há algum tempo";
  const d = typeof date === "string" ? new Date(date) : date;
  return formatDistanceToNow(d, { addSuffix: true, locale: ptBR });
}

/** "março de 2023 · há 2 anos" — combines absolute and relative in one line */
export function formatDateCharm(date: Date | string | null): string {
  if (!date) return "data perdida";
  const d = typeof date === "string" ? new Date(date) : date;
  const absolute = format(d, "MMMM 'de' yyyy", { locale: ptBR });
  const relative = formatDistanceToNow(d, { addSuffix: true, locale: ptBR });
  return `${absolute} · ${relative}`;
}

/** "nasceu em março de 2021" / "tombou em novembro de 2023" */
export function formatDateEpitaph(date: Date | string | null, role: "born" | "died"): string {
  if (!date) return role === "born" ? "data de nascimento desconhecida" : "data de morte desconhecida";
  const d = typeof date === "string" ? new Date(date) : date;
  const month = format(d, "MMMM 'de' yyyy", { locale: ptBR });
  return role === "born" ? `nasceu em ${month}` : `tombou em ${month}`;
}

/** Returns the ISO week number of a date (1-53) */
export function getISOWeek(date: Date = new Date()): number {
  const tmp = new Date(date.getTime());
  tmp.setHours(0, 0, 0, 0);
  tmp.setDate(tmp.getDate() + 4 - (tmp.getDay() || 7));
  const yearStart = new Date(tmp.getFullYear(), 0, 1);
  return Math.ceil(((tmp.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
}

export function calculateLifespan(born: Date | null, died: Date | null): string {
  if (!born || !died) return "—";
  const days = differenceInDays(died, born);
  if (days < 30) return `${days} dias`;
  if (days < 365) return `${Math.floor(days / 30)} meses`;
  const years = Math.floor(days / 365);
  const months = Math.floor((days % 365) / 30);
  if (months === 0) return `${years} ano${years > 1 ? "s" : ""}`;
  return `${years} ano${years > 1 ? "s" : ""} e ${months} ${months > 1 ? "meses" : "mês"}`;
}

// ─── Label maps ───────────────────────────────────────────────────

export const CAUSE_LABELS: Record<CauseOfDeath, string> = {
  NO_TIME: "Falta de tempo",
  TOO_COMPLEX: "Complexidade excessiva",
  LOST_INTEREST: "Perda de interesse",
  NO_MONEY: "Falta de recursos",
  SCOPE_CREEP: "Escopo infinito",
  NO_MARKET: "Sem mercado",
  BAD_TIMING: "Timing ruim",
  BURNOUT: "Burnout",
  WRONG_TECH: "Tecnologia errada",
  LIFE_CHANGE: "Mudança de vida",
  BETTER_ALTERNATIVE: "Alternativa melhor surgiu",
  COMPETITION: "Competição",
  TECHNICAL_DEBT: "Dívida técnica",
  TEAM_SPLIT: "Separação de time",
  ACQUIRED: "Adquirido / absorvido",
  OTHER: "Outras causas",
};

export const STAGE_LABELS: Record<LifecycleStage, string> = {
  IDEA: "Ideia",
  SKETCH: "Esboço",
  PROTOTYPE: "Protótipo",
  MVP: "MVP",
  BETA: "Beta",
  LAUNCHED: "Lançado",
  HIATUS: "Em hiato",
};

export const TYPE_LABELS: Record<ProjectType, string> = {
  MICRO_SAAS: "Micro SaaS",
  PERSONAL_APP: "App pessoal",
  STARTUP: "Startup",
  GAME: "Jogo",
  BLOG: "Blog / Conteúdo",
  TOOL: "Ferramenta",
  EXTENSION: "Extensão",
  COMMUNITY: "Comunidade",
  LIBRARY: "Biblioteca",
  API: "API",
  DESIGN_PROJECT: "Projeto de design",
  CONTENT: "Conteúdo",
  OTHER: "Outro",
};

export const EMOTIONAL_LABELS: Record<EmotionalWeight, string> = {
  LIGHT: "Leve",
  NOSTALGIC: "Nostálgico",
  HEAVY: "Pesado",
  HAUNTING: "Assombroso",
  LIBERATING: "Libertador",
  BITTERSWEET: "Agridoce",
};

export const RESURRECTION_LABELS: Record<ResurrectionPotential, string> = {
  NONE: "Que descanse em paz",
  LOW: "Improvável",
  MEDIUM: "Talvez um dia",
  HIGH: "Pensando nisso",
  INEVITABLE: "Vai voltar",
};

export const RESURRECTION_DESCRIPTIONS: Record<ResurrectionPotential, string> = {
  NONE: "Esse capítulo está encerrado para sempre.",
  LOW: "Quase impossível, mas o mundo é estranho.",
  MEDIUM: "Pode renascer de outra forma, em outro momento.",
  HIGH: "Ideias concretas estão se formando.",
  INEVITABLE: "É uma questão de quando, não de se.",
};

// ─── Color maps ───────────────────────────────────────────────────

export const EMOTIONAL_COLORS: Record<EmotionalWeight, string> = {
  LIGHT: "#5a9a7a",
  NOSTALGIC: "#c9a96e",
  HEAVY: "#8b3a3a",
  HAUNTING: "#7c5c8c",
  LIBERATING: "#3d7a6a",
  BITTERSWEET: "#a06b3c",
};

export const RESURRECTION_COLORS: Record<ResurrectionPotential, string> = {
  NONE: "#5a5675",
  LOW: "#8b7355",
  MEDIUM: "#c9a96e",
  HIGH: "#8bc49e",
  INEVITABLE: "#3d7a6a",
};

// ─── Slug generation ──────────────────────────────────────────────

export function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

// ─── Resurrection meter percentage ───────────────────────────────

export function resurrectionPercent(potential: ResurrectionPotential): number {
  const map: Record<ResurrectionPotential, number> = {
    NONE: 0,
    LOW: 20,
    MEDIUM: 45,
    HIGH: 72,
    INEVITABLE: 95,
  };
  return map[potential];
}

// ─── Lesson category labels ───────────────────────────────────────

export const LESSON_CATEGORY_LABELS: Record<LessonCategory, string> = {
  TECHNICAL: "Técnico",
  BUSINESS: "Negócio",
  PERSONAL: "Pessoal",
  PROCESS: "Processo",
  TEAM: "Time",
  GENERAL: "Geral",
};

// ─── Pivot type labels ────────────────────────────────────────────

export const PIVOT_LABELS: Record<AfterlifeStrategy, string> = {
  REVIVAL: "Reviver como está",
  PIVOT: "Pivotar o conceito",
  COMPONENT_REUSE: "Reutilizar partes",
  NEW_FORM: "Nova forma",
  ABSORBED: "Fundir em outro projeto",
  OPEN_SOURCE: "Abrir o código",
  TEACH_IT: "Transformar em conteúdo",
  ARCHIVE: "Apenas preservar a memória",
};

// ─── Artifact type icons & labels ────────────────────────────────

export const ARTIFACT_TYPE_ICONS: Record<ArtifactType, string> = {
  SCREENSHOT: "◫",
  CODE_REPO: "⌥",
  DESIGN: "◈",
  DOCUMENT: "◻",
  VIDEO: "▷",
  AUDIO: "♪",
  PRESENTATION: "◧",
  PROTOTYPE: "◎",
  LINK: "⊹",
  NOTE: "◦",
  OTHER: "◦",
};

import {
  ProjectType,
  LifecycleStage,
  CauseOfDeath,
  EmotionalWeight,
  ResurrectionPotential,
  Visibility,
  ArtifactType,
  LessonCategory,
  AfterlifeStrategy,
  RevivalStatus,
  EventType,
} from "@prisma/client";

export type {
  ProjectType,
  LifecycleStage,
  CauseOfDeath,
  EmotionalWeight,
  ResurrectionPotential,
  Visibility,
  ArtifactType,
  LessonCategory,
  AfterlifeStrategy,
  RevivalStatus,
  EventType,
};

// ─── Shared relation shapes ───────────────────────────────────────
export type TagType = {
  id: string;
  name: string;
};

export type ProjectArtifact = {
  id: string;
  projectId: string;
  type: ArtifactType;
  title: string;
  description: string | null;
  url: string | null;
  filename: string | null;
  order: number;
  createdAt: Date;
};

export type LessonType = {
  id: string;
  projectId: string;
  title: string | null;
  body: string;
  category: LessonCategory;
  order: number;
  createdAt: Date;
};

export type ReincarnationIdeaType = {
  id: string;
  projectId: string;
  title: string;
  description: string | null;
  strategy: AfterlifeStrategy;
  feasibilityScore: number;
  status: RevivalStatus;
  createdAt: Date;
};

export type TimelineEventType = {
  id: string;
  projectId: string;
  date: Date;
  title: string;
  description: string | null;
  eventType: EventType;
  order: number;
  createdAt: Date;
};

// ─── Project scalars (shared base) ───────────────────────────────
type ProjectBase = {
  id: string;
  slug: string;
  name: string;
  slogan: string | null;
  description: string | null;
  epitaph: string;
  coverImageUrl: string | null;
  type: ProjectType;
  stage: LifecycleStage;
  visibility: Visibility;
  causeOfDeath: CauseOfDeath;
  emotionalWeight: EmotionalWeight;
  resurrectionPotential: ResurrectionPotential;
  bornAt: Date | null;
  diedAt: Date | null;
  techStack: string[];
  targetAudience: string | null;
  hadRealUsers: boolean;
  userCount: number | null;
  whatItWantedToBe: string | null;
  whatWentWrong: string | null;
  whatStillWorks: string | null;
  whatWasRepurposed: string | null;
  mostPromisingMoment: string | null;
  momentOfReckoning: string | null;
  symptoms: string[];
  dreams: string[];
  farewellLetter: string | null;
  createdAt: Date;
  updatedAt: Date;
};

// ─── Hall-listing projection (only what cards need) ───────────────
/** Lean type used in the Memorial Hall grid/archive view. */
export type ProjectCard = ProjectBase & {
  tags: TagType[];
};

// ─── Full project with all relations (detail page) ────────────────
export type ProjectWithRelations = ProjectBase & {
  tags: TagType[];
  artifacts: ProjectArtifact[];
  lessons: LessonType[];
  reincarnationIdeas: ReincarnationIdeaType[];
  timeline: TimelineEventType[];
};

// ─── Filter types ────────────────────────────────────────────────
export type ProjectFilters = {
  search?: string;
  type?: ProjectType;
  stage?: LifecycleStage;
  causeOfDeath?: CauseOfDeath;
  emotionalWeight?: EmotionalWeight;
  resurrectionPotential?: ResurrectionPotential;
  sortBy?: "createdAt" | "diedAt" | "name" | "resurrectionPotential";
  sortOrder?: "asc" | "desc";
};

// ─── Analytics types ─────────────────────────────────────────────
export type AnalyticsData = {
  totalProjects: number;
  totalWithRealUsers: number;
  avgLifespanDays: number | null;
  topCauses: { cause: CauseOfDeath; count: number }[];
  topStages: { stage: LifecycleStage; count: number }[];
  topTypes: { type: ProjectType; count: number }[];
  resurrectionBreakdown: { potential: ResurrectionPotential; count: number }[];
  emotionalBreakdown: { weight: EmotionalWeight; count: number }[];
  topTechStack: { tech: string; count: number }[];
  reincarnationCount: number;
};

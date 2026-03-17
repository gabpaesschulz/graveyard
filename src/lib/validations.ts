import { z } from "zod";

const ProjectType = z.enum([
  "MICRO_SAAS", "PERSONAL_APP", "STARTUP", "GAME", "BLOG", "TOOL",
  "EXTENSION", "COMMUNITY", "LIBRARY", "API", "DESIGN_PROJECT", "CONTENT", "OTHER",
]);
const LifecycleStage = z.enum([
  "IDEA", "SKETCH", "PROTOTYPE", "MVP", "BETA", "LAUNCHED", "HIATUS",
]);
const CauseOfDeath = z.enum([
  "NO_TIME", "TOO_COMPLEX", "LOST_INTEREST", "NO_MONEY", "SCOPE_CREEP",
  "NO_MARKET", "BAD_TIMING", "BURNOUT", "WRONG_TECH", "LIFE_CHANGE",
  "BETTER_ALTERNATIVE", "COMPETITION", "TECHNICAL_DEBT", "TEAM_SPLIT", "ACQUIRED", "OTHER",
]);
const EmotionalWeight = z.enum([
  "LIGHT", "NOSTALGIC", "HEAVY", "HAUNTING", "LIBERATING", "BITTERSWEET",
]);
const ResurrectionPotential = z.enum(["NONE", "LOW", "MEDIUM", "HIGH", "INEVITABLE"]);
const LessonCategory = z.enum(["TECHNICAL", "BUSINESS", "PERSONAL", "PROCESS", "TEAM", "GENERAL"]);
const AfterlifeStrategy = z.enum([
  "REVIVAL", "PIVOT", "COMPONENT_REUSE", "NEW_FORM", "ABSORBED", "OPEN_SOURCE", "TEACH_IT", "ARCHIVE",
]);

export const createProjectSchema = z.object({
  name: z.string().min(1, "Dê um nome a este projeto").max(100),
  slogan: z.string().max(200).optional(),
  description: z.string().max(2000).optional(),
  epitaph: z.string().min(10, "O epitáfio precisa de pelo menos 10 caracteres").max(500, "Um epitáfio deve ser breve"),
  type: ProjectType,
  stage: LifecycleStage,
  causeOfDeath: CauseOfDeath,
  emotionalWeight: EmotionalWeight,
  resurrectionPotential: ResurrectionPotential,
  bornAt: z.string().optional(),
  diedAt: z.string().optional(),
  techStack: z.array(z.string()).optional().default([]),
  targetAudience: z.string().max(500).optional(),
  hadRealUsers: z.boolean().optional().default(false),
  userCount: z.number().int().positive().optional(),
  whatItWantedToBe: z.string().max(2000).optional(),
  whatWentWrong: z.string().max(2000).optional(),
  whatStillWorks: z.string().max(2000).optional(),
  whatWasRepurposed: z.string().max(2000).optional(),
  mostPromisingMoment: z.string().max(2000).optional(),
  momentOfReckoning: z.string().max(2000).optional(),
  symptoms: z.array(z.string()).optional().default([]),
  dreams: z.array(z.string()).optional().default([]),
  farewellLetter: z.string().max(5000).optional(),
  tags: z.array(z.string().min(1).max(50)).optional().default([]),
  lessons: z
    .array(
      z.object({
        body: z.string().min(1).max(1000),
        category: LessonCategory,
      }),
    )
    .optional()
    .default([]),
  reincarnationIdeas: z
    .array(
      z.object({
        title: z.string().min(1).max(200),
        description: z.string().max(1000).optional(),
        strategy: AfterlifeStrategy,
        feasibilityScore: z.number().int().min(1).max(10),
      }),
    )
    .optional()
    .default([]),
});

export type CreateProjectInput = z.infer<typeof createProjectSchema>;

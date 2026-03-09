import { z } from "zod";
import {
  ProjectType,
  LifecycleStage,
  CauseOfDeath,
  EmotionalWeight,
  ResurrectionPotential,
  LessonCategory,
  AfterlifeStrategy,
} from "@prisma/client";

export const createProjectSchema = z.object({
  name: z.string().min(1, "Dê um nome a este projeto").max(100),
  slogan: z.string().max(200).optional(),
  description: z.string().max(2000).optional(),
  epitaph: z.string().min(10, "O epitáfio precisa de pelo menos 10 caracteres").max(500, "Um epitáfio deve ser breve"),
  type: z.nativeEnum(ProjectType),
  stage: z.nativeEnum(LifecycleStage),
  causeOfDeath: z.nativeEnum(CauseOfDeath),
  emotionalWeight: z.nativeEnum(EmotionalWeight),
  resurrectionPotential: z.nativeEnum(ResurrectionPotential),
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
        category: z.nativeEnum(LessonCategory),
      }),
    )
    .optional()
    .default([]),
  reincarnationIdeas: z
    .array(
      z.object({
        title: z.string().min(1).max(200),
        description: z.string().max(1000).optional(),
        strategy: z.nativeEnum(AfterlifeStrategy),
        feasibilityScore: z.number().int().min(1).max(10),
      }),
    )
    .optional()
    .default([]),
});

export type CreateProjectInput = z.infer<typeof createProjectSchema>;

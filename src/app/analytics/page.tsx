import { prisma } from "@/lib/prisma";
import { Visibility } from "@prisma/client";
import { AnalyticsClient } from "./analytics-client";
import { CAUSE_LABELS, STAGE_LABELS, TYPE_LABELS, EMOTIONAL_LABELS, RESURRECTION_LABELS } from "@/lib/utils";
import type { CauseOfDeath, LifecycleStage, ProjectType, EmotionalWeight, ResurrectionPotential } from "@/types";

export const revalidate = 3600;

export const metadata = {
  title: "Necrologia · Graveyard",
  description: "O registro oficial dos projetos sepultados — números, causas, padrões e o que sobreviveu.",
};

export default async function AnalyticsPage() {
  const [causeGroups, stageGroups, typeGroups, emotionGroups, resurrectionGroups, projectsForTech, totalLessons] =
    await Promise.all([
      prisma.project.groupBy({ by: ["causeOfDeath"], where: { visibility: Visibility.PUBLIC }, _count: true }),
      prisma.project.groupBy({ by: ["stage"], where: { visibility: Visibility.PUBLIC }, _count: true }),
      prisma.project.groupBy({ by: ["type"], where: { visibility: Visibility.PUBLIC }, _count: true }),
      prisma.project.groupBy({ by: ["emotionalWeight"], where: { visibility: Visibility.PUBLIC }, _count: true }),
      prisma.project.groupBy({
        by: ["resurrectionPotential"],
        where: { visibility: Visibility.PUBLIC },
        _count: true,
      }),
      prisma.project.findMany({
        where: { visibility: Visibility.PUBLIC },
        select: { techStack: true, hadRealUsers: true, userCount: true },
      }),
      prisma.lesson.count(),
    ]);

  // Tech stack must still be aggregated in JS (it's a scalar array field)
  const techMap: Record<string, number> = {};
  let withRealUsers = 0;
  let totalUserCount = 0;

  for (const p of projectsForTech) {
    for (const t of p.techStack) {
      techMap[t] = (techMap[t] ?? 0) + 1;
    }
    if (p.hadRealUsers) withRealUsers++;
    if (p.userCount) totalUserCount += p.userCount;
  }

  const topTech = Object.entries(techMap)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 12)
    .map(([name, count]) => ({ name, count }));

  return (
    <AnalyticsClient
      totalProjects={causeGroups.reduce((s, g) => s + g._count, 0)}
      totalLessons={totalLessons}
      withRealUsers={withRealUsers}
      totalUserCount={totalUserCount}
      causesData={causeGroups.map((g) => ({
        name: CAUSE_LABELS[g.causeOfDeath as CauseOfDeath] ?? g.causeOfDeath,
        value: g._count,
      }))}
      stagesData={stageGroups.map((g) => ({
        name: STAGE_LABELS[g.stage as LifecycleStage] ?? g.stage,
        value: g._count,
      }))}
      typesData={typeGroups.map((g) => ({ name: TYPE_LABELS[g.type as ProjectType] ?? g.type, value: g._count }))}
      emotionData={emotionGroups.map((g) => ({
        name: EMOTIONAL_LABELS[g.emotionalWeight as EmotionalWeight] ?? g.emotionalWeight,
        value: g._count,
      }))}
      resurrectionData={resurrectionGroups.map((g) => ({
        name: RESURRECTION_LABELS[g.resurrectionPotential as ResurrectionPotential] ?? g.resurrectionPotential,
        value: g._count,
      }))}
      topTech={topTech}
    />
  );
}

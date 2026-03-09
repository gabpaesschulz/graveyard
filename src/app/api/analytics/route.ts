import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { Visibility } from "@prisma/client";

export async function GET() {
  try {
    const [
      causeGroups,
      stageGroups,
      typeGroups,
      emotionGroups,
      resurrectionGroups,
      projectsForTech,
      withRealUsersCount,
      totalUserCountAgg,
      totalLessons,
    ] = await Promise.all([
      prisma.project.groupBy({ by: ["causeOfDeath"], where: { visibility: Visibility.PUBLIC }, _count: true }),
      prisma.project.groupBy({ by: ["stage"], where: { visibility: Visibility.PUBLIC }, _count: true }),
      prisma.project.groupBy({ by: ["type"], where: { visibility: Visibility.PUBLIC }, _count: true }),
      prisma.project.groupBy({ by: ["emotionalWeight"], where: { visibility: Visibility.PUBLIC }, _count: true }),
      prisma.project.groupBy({
        by: ["resurrectionPotential"],
        where: { visibility: Visibility.PUBLIC },
        _count: true,
      }),
      // techStack is a scalar array — must aggregate in application code
      prisma.project.findMany({
        where: { visibility: Visibility.PUBLIC },
        select: { techStack: true },
      }),
      prisma.project.count({ where: { visibility: Visibility.PUBLIC, hadRealUsers: true } }),
      prisma.project.aggregate({
        where: { visibility: Visibility.PUBLIC, userCount: { not: null } },
        _sum: { userCount: true },
      }),
      prisma.lesson.count(),
    ]);

    const techCount: Record<string, number> = {};
    for (const { techStack } of projectsForTech) {
      for (const tech of techStack) {
        techCount[tech] = (techCount[tech] ?? 0) + 1;
      }
    }

    return NextResponse.json({
      totalProjects: causeGroups.reduce((s, g) => s + g._count, 0),
      totalLessons,
      withRealUsers: withRealUsersCount,
      totalUserCount: totalUserCountAgg._sum.userCount ?? 0,
      causeCount: Object.fromEntries(causeGroups.map((g) => [g.causeOfDeath, g._count])),
      stageCount: Object.fromEntries(stageGroups.map((g) => [g.stage, g._count])),
      typeCount: Object.fromEntries(typeGroups.map((g) => [g.type, g._count])),
      emotionCount: Object.fromEntries(emotionGroups.map((g) => [g.emotionalWeight, g._count])),
      resurrectionCount: Object.fromEntries(resurrectionGroups.map((g) => [g.resurrectionPotential, g._count])),
      techCount,
    });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

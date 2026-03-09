import { prisma } from "@/lib/prisma";
import { createProjectSchema } from "@/lib/validations";
import { generateSlug } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";
import { CauseOfDeath, LifecycleStage, ProjectType, Visibility } from "@prisma/client";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const cause = searchParams.get("cause") ?? undefined;
  const stage = searchParams.get("stage") ?? undefined;
  const type = searchParams.get("type") ?? undefined;
  const q = searchParams.get("q") ?? undefined;

  try {
    const projects = await prisma.project.findMany({
      where: {
        visibility: Visibility.PUBLIC,
        ...(cause ? { causeOfDeath: cause as CauseOfDeath } : {}),
        ...(stage ? { stage: stage as LifecycleStage } : {}),
        ...(type ? { type: type as ProjectType } : {}),
        ...(q
          ? {
              OR: [
                { name: { contains: q, mode: "insensitive" } },
                { slogan: { contains: q, mode: "insensitive" } },
                { epitaph: { contains: q, mode: "insensitive" } },
              ],
            }
          : {}),
      },
      include: { tags: true, lessons: true, reincarnationIdeas: true, timeline: true, artifacts: true },
      orderBy: { diedAt: "desc" },
    });

    return NextResponse.json(projects);
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const parsed = createProjectSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 422 });
  }

  const data = parsed.data;
  const baseSlug = generateSlug(data.name);
  let slug = baseSlug;
  let attempt = 0;

  // Ensure unique slug
  while (await prisma.project.findUnique({ where: { slug } })) {
    attempt++;
    slug = `${baseSlug}-${attempt}`;
  }

  try {
    const project = await prisma.project.create({
      data: {
        slug,
        name: data.name,
        slogan: data.slogan,
        description: data.description,
        type: data.type,
        stage: data.stage,
        causeOfDeath: data.causeOfDeath,
        emotionalWeight: data.emotionalWeight,
        resurrectionPotential: data.resurrectionPotential,
        bornAt: data.bornAt ? new Date(data.bornAt) : null,
        diedAt: data.diedAt ? new Date(data.diedAt) : null,
        epitaph: data.epitaph,
        whatItWantedToBe: data.whatItWantedToBe,
        whatWentWrong: data.whatWentWrong,
        whatStillWorks: data.whatStillWorks,
        whatWasRepurposed: data.whatWasRepurposed,
        mostPromisingMoment: data.mostPromisingMoment,
        momentOfReckoning: data.momentOfReckoning,
        farewellLetter: data.farewellLetter,
        targetAudience: data.targetAudience,
        hadRealUsers: data.hadRealUsers,
        userCount: data.userCount,
        techStack: data.techStack,
        symptoms: data.symptoms,
        dreams: data.dreams,
        visibility: Visibility.PUBLIC,
        tags: data.tags.length
          ? {
              connectOrCreate: data.tags.map((name) => ({
                where: { name },
                create: { name },
              })),
            }
          : undefined,
        lessons: data.lessons.length
          ? {
              create: data.lessons.map((l, i) => ({
                body: l.body,
                category: l.category,
                order: i,
              })),
            }
          : undefined,
        reincarnationIdeas: data.reincarnationIdeas.length
          ? {
              create: data.reincarnationIdeas.map((r) => ({
                title: r.title,
                description: r.description,
                strategy: r.strategy,
                feasibilityScore: r.feasibilityScore,
              })),
            }
          : undefined,
      },
      include: { tags: true, lessons: true, reincarnationIdeas: true, timeline: true, artifacts: true },
    });

    return NextResponse.json(project, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Failed to create project" }, { status: 500 });
  }
}

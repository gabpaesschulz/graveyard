import { prisma } from "@/lib/prisma";
import { createProjectSchema } from "@/lib/validations";
import { NextRequest, NextResponse } from "next/server";

const WITH_RELATIONS = {
  tags: true,
  lessons: true,
  reincarnationIdeas: true,
  timeline: true,
  artifacts: true,
} as const;

export async function GET(_: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = await prisma.project.findUnique({ where: { slug }, include: WITH_RELATIONS });
  if (!project) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(project);
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const parsed = createProjectSchema.partial().safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 422 });
  }

  try {
    const { tags, lessons, reincarnationIdeas, ...scalarFields } = parsed.data;
    const project = await prisma.project.update({
      where: { slug },
      data: scalarFields as Parameters<typeof prisma.project.update>[0]["data"],
      include: WITH_RELATIONS,
    });
    return NextResponse.json(project);
  } catch {
    return NextResponse.json({ error: "Project not found or update failed" }, { status: 404 });
  }
}

export async function DELETE(_: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  try {
    await prisma.project.delete({ where: { slug } });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Project not found" }, { status: 404 });
  }
}

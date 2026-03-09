import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ProjectDetailClient } from "./project-detail-client";

export const revalidate = 3600;

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = await prisma.project.findUnique({ where: { slug } });
  if (!project) return { title: "Memorial não encontrado" };

  return {
    title: `${project.name} — Memorial`,
    description: project.epitaph,
  };
}

export async function generateStaticParams() {
  const projects = await prisma.project.findMany({ select: { slug: true } });
  return projects.map((p) => ({ slug: p.slug }));
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;

  const project = await prisma.project.findUnique({
    where: { slug },
    include: {
      tags: true,
      artifacts: true,
      lessons: { orderBy: { order: "asc" } },
      reincarnationIdeas: { orderBy: { createdAt: "asc" } },
      timeline: { orderBy: { order: "asc" } },
    },
  });

  if (!project) notFound();

  return <ProjectDetailClient project={project} />;
}

import { prisma } from "@/lib/prisma";
import { Visibility } from "@prisma/client";
import { MemorialHallClient } from "./memorial-hall-client";
import type { Metadata } from "next";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Salão Memorial · Graveyard",
  description: "A galeria de projetos sepultados. Cada um com nome, epitáfio e causa da morte.",
};

export default async function HallPage() {
  const projects = await prisma.project.findMany({
    where: { visibility: Visibility.PUBLIC },
    include: { tags: true },
    orderBy: { createdAt: "desc" },
  });

  return <MemorialHallClient projects={projects} />;
}


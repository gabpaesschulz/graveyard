import { prisma } from "@/lib/prisma";
import { Visibility } from "@prisma/client";
import { ResurrectionClient } from "./resurrection-client";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Reencarnação · Graveyard",
  description:
    "Projetos que não morreram para sempre. Ideias com potencial de retornar — em nova forma, no momento certo.",
};

export default async function ReincarnationPage() {
  const projects = await prisma.project.findMany({
    where: {
      visibility: Visibility.PUBLIC,
      resurrectionPotential: { in: ["HIGH", "INEVITABLE"] },
    },
    include: { reincarnationIdeas: true, tags: true },
    orderBy: { resurrectionPotential: "desc" },
  });

  return <ResurrectionClient projects={projects} />;
}

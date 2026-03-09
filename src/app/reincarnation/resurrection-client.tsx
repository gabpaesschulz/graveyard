"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { SparklesIcon, ArrowRightIcon } from "lucide-react";
import { ResurrectionMeter } from "@/components/memorial/resurrection-meter";
import { MemorialEmptyState } from "@/components/memorial/memorial-empty-state";
import { RESURRECTION_LABELS, RESURRECTION_COLORS, TYPE_LABELS, formatDate } from "@/lib/utils";
import type { Prisma } from "@prisma/client";

const STRATEGY_LABELS: Record<string, string> = {
  REVIVAL: "Reviver como está",
  PIVOT: "Pivotar o conceito",
  COMPONENT_REUSE: "Reutilizar partes",
  NEW_FORM: "Nova forma",
  ABSORBED: "Fundir em outro",
  OPEN_SOURCE: "Abrir o código",
  TEACH_IT: "Virar conteúdo",
  ARCHIVE: "Preservar a memória",
};

type ProjectWithIdeas = Prisma.ProjectGetPayload<{
  include: { reincarnationIdeas: true; tags: true };
}>;

interface ResurrectionClientProps {
  projects: ProjectWithIdeas[];
}

export function ResurrectionClient({ projects }: ResurrectionClientProps) {
  return (
    <main className="flex-1">
      {/* Header */}
      <div className="relative border-b border-border/50 overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-teal-500/20 to-transparent" />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse 60% 40% at 50% 0%, rgba(61,122,106,0.06) 0%, transparent 70%)",
          }}
        />
        {/* Dot grid */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(61,122,106,0.07) 1px, transparent 1px)",
            backgroundSize: "30px 30px",
            maskImage: "radial-gradient(ellipse 80% 100% at 75% 50%, black 0%, transparent 100%)",
          }}
        />
        <div className="container py-10 sm:py-14 relative">
          <div className="flex items-center gap-3 mb-3">
            <SparklesIcon className="h-5 w-5 text-teal-400/60" />
            <p className="text-xs font-mono uppercase tracking-widest text-teal-400/50">Arquivo · Reencarnação</p>
          </div>
          <motion.h1
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif text-3xl sm:text-4xl text-parchment mb-3"
          >
            O que pode voltar
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="text-muted-foreground max-w-2xl"
          >
            Nem todo projeto morreu para sempre. Alguns esperam a hora certa, a tecnologia certa, ou a coragem certa.
            Estes têm potencial de renascer — em nova forma.
          </motion.p>
          <div className="flex items-center gap-2 mt-5 text-sm text-teal-400/60 font-mono">
            <span>{projects.length} projetos elegíveis</span>
            <span className="text-border/60">·</span>
            <span>{projects.reduce((a, p) => a + p.reincarnationIdeas.length, 0)} planos de ressurreição</span>
          </div>
        </div>
      </div>

      <div className="container py-8 sm:py-14 space-y-6 sm:space-y-10">
        {projects.map((project, i) => (
          <motion.article
            key={project.id}
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.07, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -2, transition: { type: "spring", stiffness: 420, damping: 28 } }}
            style={{ willChange: "transform" }}
            className="card-memorial p-5 md:p-8 relative"
          >
            {/* Resurrection potential accent */}
            <div
              className="absolute inset-x-0 top-0 h-px pointer-events-none"
              style={{
                background: `linear-gradient(90deg, transparent, ${RESURRECTION_COLORS[project.resurrectionPotential]}80, transparent)`,
              }}
            />
            {/* Project header */}
            <div className="flex flex-col md:flex-row md:items-start gap-4 mb-6">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-mono text-muted-foreground/50 uppercase tracking-wider">
                    {TYPE_LABELS[project.type]}
                  </span>
                  {project.diedAt && (
                    <>
                      <span className="text-border/40">·</span>
                      <span className="text-xs font-mono text-muted-foreground/50">
                        Morreu {formatDate(project.diedAt)}
                      </span>
                    </>
                  )}
                </div>
                <Link href={`/hall/${project.slug}`} className="group">
                  <h2 className="font-serif text-2xl text-parchment group-hover:text-gold transition-colors mb-1">
                    {project.name}
                  </h2>
                </Link>
                {project.slogan && <p className="text-sm text-muted-foreground">{project.slogan}</p>}
              </div>
              <div className="w-full md:w-56 shrink-0">
                <p className="text-xs font-mono uppercase tracking-wider text-teal-400/50 mb-2">
                  {RESURRECTION_LABELS[project.resurrectionPotential]}
                </p>
                <ResurrectionMeter potential={project.resurrectionPotential} showLabel={false} />
              </div>
            </div>

            {/* Ideas */}
            {project.reincarnationIdeas.length > 0 && (
              <div className="space-y-3 mt-4 pt-4 border-t border-border/30">
                <p className="text-xs font-mono uppercase tracking-wider text-teal-400/50 mb-3">
                  Planos de reencarnação
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {project.reincarnationIdeas.map((idea) => (
                    <div
                      key={idea.id}
                      className="p-4 rounded-memorial border border-teal-900/30 bg-teal-950/10 hover:border-teal-700/30 transition-colors"
                    >
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <p className="text-sm font-medium text-parchment">{idea.title}</p>
                        <span className="text-2xs px-1.5 py-0.5 rounded-sm border border-teal-900/30 text-teal-400/50 font-mono shrink-0">
                          {STRATEGY_LABELS[idea.strategy]}
                        </span>
                      </div>
                      {idea.description && (
                        <p className="text-xs text-muted-foreground leading-relaxed">{idea.description}</p>
                      )}
                      <div className="flex items-center gap-2 mt-2.5">
                        <span className="text-2xs text-muted-foreground/50 font-mono">Viabilidade</span>
                        <div className="flex-1 h-1 rounded-full bg-teal-950/50 overflow-hidden">
                          <div
                            className="h-full rounded-full bg-teal-600/50"
                            style={{ width: `${idea.feasibilityScore * 10}%` }}
                          />
                        </div>
                        <span className="text-2xs text-teal-400/50 font-mono">{idea.feasibilityScore}/10</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-5 pt-4 border-t border-border/30">
              <Link
                href={`/hall/${project.slug}`}
                className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-parchment transition-colors group"
              >
                Ver memorial completo
                <ArrowRightIcon className="h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          </motion.article>
        ))}

        {projects.length === 0 && (
          <MemorialEmptyState
            icon="✦"
            title="Nenhum espírito aguarda ressurreição"
            description="Projetos com alto ou inevitável potencial de retorno aparecem aqui. Registre projetos e avalie seu potencial de reencarnação para consultá-los."
            hint="A ressurreição só é possível para os que foram devidamente sepultados."
            action={{ label: "Ver todos os memoriais", href: "/hall" }}
            secondaryAction={{ label: "Realizar um funeral", href: "/new" }}
            accent="verdigris"
          />
        )}
      </div>
    </main>
  );
}

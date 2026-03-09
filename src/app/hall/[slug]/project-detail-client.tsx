"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowLeftIcon,
  CalendarIcon,
  UsersIcon,
  CodeIcon,
  LayersIcon,
  SparklesIcon,
  BookOpenIcon,
  HeartIcon,
  MailIcon,
  SproutIcon,
  FlameIcon,
  StarIcon,
} from "lucide-react";
import { CauseBadge } from "@/components/memorial/cause-badge";
import { EmotionalWeightPill } from "@/components/memorial/emotional-weight-pill";
import { ResurrectionMeter } from "@/components/memorial/resurrection-meter";
import { TimelineStrip } from "@/components/memorial/timeline-strip";
import { RitualSection, ArchivePanel } from "@/components/memorial/ritual-section";
import {
  cn,
  formatDate,
  formatDateFull,
  formatRelative,
  formatDateEpitaph,
  calculateLifespan,
  STAGE_LABELS,
  TYPE_LABELS,
  EMOTIONAL_LABELS,
  LESSON_CATEGORY_LABELS,
  PIVOT_LABELS,
  ARTIFACT_TYPE_ICONS,
} from "@/lib/utils";
import { useFavorites } from "@/hooks/use-favorites";
import type { ProjectWithRelations } from "@/types";

interface ProjectDetailClientProps {
  project: ProjectWithRelations;
}

export function ProjectDetailClient({ project }: ProjectDetailClientProps) {
  const lifespan = calculateLifespan(project.bornAt, project.diedAt);
  const { isFavorite, toggle } = useFavorites();
  const isFav = isFavorite(project.id);

  return (
    <main className="flex-1">
      {/* Memorial header */}
      <div className="relative overflow-hidden border-b border-border/50">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse 80% 120% at 50% -5%, rgba(201,169,110,0.08) 0%, transparent 60%)",
          }}
        />{" "}
        {/* Dot grid */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(201,169,110,0.06) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
            maskImage: "radial-gradient(ellipse 80% 100% at 80% 50%, black 0%, transparent 100%)",
          }}
        />{" "}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
        <div className="container py-10 sm:py-14 relative">
          {/* Back */}
          <Link
            href="/hall"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-parchment transition-all duration-200 mb-6 sm:mb-10 group"
          >
            <ArrowLeftIcon className="h-3.5 w-3.5 group-hover:-translate-x-1 transition-transform duration-200 ease-out" />
            Voltar ao memorial
          </Link>

          {/* Ornamental divider */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0.5 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-4 mb-7"
          >
            <div className="h-px flex-1 max-w-[72px] bg-gradient-to-r from-transparent to-gold/25" />
            <span className="text-gold/30 text-[10px] font-mono tracking-[0.4em]">✦ ✦ ✦</span>
            <div className="h-px flex-1 max-w-[72px] bg-gradient-to-l from-transparent to-gold/25" />
          </motion.div>

          {/* Name */}
          <motion.h1
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05, duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif font-bold text-parchment tracking-tight mb-2"
            style={{ fontSize: "clamp(2.4rem, 5.5vw, 4rem)", lineHeight: "1.05" }}
          >
            {project.name}
          </motion.h1>

          {/* Slogan */}
          {project.slogan && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="text-muted-foreground/70 text-base mb-5"
            >
              {project.slogan}
            </motion.p>
          )}

          {/* Dates — gravestone style */}
          {project.bornAt && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.12 }}
              className="flex flex-wrap items-center gap-2.5 mb-8"
            >
              <CalendarIcon className="h-3 w-3 text-gold/30" />
              <span className="text-xs font-mono text-muted-foreground/50 italic">
                {formatDateEpitaph(project.bornAt, "born")}
              </span>
              <span className="text-gold/40 font-serif text-base leading-none">†</span>
              <span className="text-xs font-mono text-muted-foreground/50 italic">
                {project.diedAt ? formatDateEpitaph(project.diedAt, "died") : "ainda vivo"}
              </span>
              {lifespan !== "—" && <span className="text-xs text-muted-foreground/30 font-mono">· {lifespan}</span>}
              {project.diedAt && (
                <span className="text-[10px] font-mono text-gold/30 italic">({formatRelative(project.diedAt)})</span>
              )}
            </motion.div>
          )}

          {/* Epitaph */}
          <motion.blockquote
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="relative max-w-2xl mb-10 pl-7"
          >
            <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-gold/50 via-gold/20 to-transparent" />
            <span
              className="absolute -top-6 left-3 font-serif leading-none pointer-events-none select-none"
              style={{
                fontSize: "5rem",
                color: "rgba(201,169,110,0.1)",
                fontFamily: "'Playfair Display', Georgia, serif",
              }}
            >
              “
            </span>
            <p className="epitaph text-lg sm:text-xl md:text-2xl leading-relaxed">{project.epitaph}</p>
          </motion.blockquote>

          {/* Meta strip */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap items-center gap-2"
          >
            <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground/50 px-2.5 py-1 rounded-memorial border border-border/40 bg-card/40">
              {TYPE_LABELS[project.type]}
            </span>
            <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground/50 px-2.5 py-1 rounded-memorial border border-border/40 bg-card/40">
              {STAGE_LABELS[project.stage]}
            </span>
            <CauseBadge cause={project.causeOfDeath} size="md" />
            <EmotionalWeightPill weight={project.emotionalWeight} showLabel />
            {project.hadRealUsers && (
              <div className="flex items-center gap-1.5 text-xs font-mono text-muted-foreground/50 px-2.5 py-1 rounded-memorial border border-border/40 bg-card/40">
                <UsersIcon className="h-3 w-3 text-gold/40" />
                {project.userCount ? `${project.userCount} usuários` : "Teve usuários reais"}
              </div>
            )}
          </motion.div>
        </div>
      </div>

      {/* Main content */}
      <div className="container py-10 sm:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8 lg:gap-10">
          {/* Left: narrative */}
          <div className="space-y-10 sm:space-y-14 min-w-0 order-2 lg:order-1">
            {/* What it wanted to be */}
            {project.whatItWantedToBe && (
              <RitualSection title="O que queria ser" ornament="I">
                <ArchivePanel variant="gold">
                  <p className="text-sm leading-relaxed text-parchment-muted">{project.whatItWantedToBe}</p>
                </ArchivePanel>
              </RitualSection>
            )}

            {/* What went wrong */}
            {project.whatWentWrong && (
              <RitualSection title="O que deu errado" ornament="II">
                <ArchivePanel variant="crimson">
                  <p className="text-sm leading-relaxed text-parchment-muted">{project.whatWentWrong}</p>
                </ArchivePanel>

                {/* Symptoms */}
                {project.symptoms.length > 0 && (
                  <div className="mt-5">
                    <p className="text-xs font-mono uppercase tracking-wider text-muted-foreground/60 mb-3">
                      Sintomas antes da morte
                    </p>
                    <ul className="space-y-2">
                      {project.symptoms.map((symptom, i) => (
                        <li key={i} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                          <span className="text-red-500/40 mt-1 shrink-0 font-mono">▸</span>
                          {symptom}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </RitualSection>
            )}

            {/* Dreams */}
            {project.dreams.length > 0 && (
              <RitualSection title="Sonhos interrompidos" ornament="III">
                <div className="space-y-2">
                  {project.dreams.map((dream, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-3 p-3 rounded-memorial border border-border/40 bg-card/30"
                    >
                      <span className="text-gold/30 font-mono text-xs mt-0.5 shrink-0">✦</span>
                      <p className="text-sm text-parchment-muted">{dream}</p>
                    </div>
                  ))}
                </div>
              </RitualSection>
            )}

            {/* What still works */}
            {project.whatStillWorks && (
              <RitualSection title="O que ainda vive" subtitle="O que sobreviveu ao colapso" ornament="IV">
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  className="relative rounded-memorial border border-teal-700/25 bg-teal-950/10 overflow-hidden"
                  style={{ boxShadow: "0 0 24px rgba(61,122,106,0.06) inset" }}
                >
                  <div className="absolute top-3 right-3">
                    <SproutIcon className="h-4 w-4 text-teal-500/20" />
                  </div>
                  <div className="p-5">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-40" />
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-500/60" />
                      </span>
                      <span className="text-2xs font-mono uppercase tracking-wider text-teal-400/60">Ainda pulsa</span>
                    </div>
                    <p className="text-sm leading-relaxed text-parchment-muted">{project.whatStillWorks}</p>
                  </div>
                </motion.div>

                {project.whatWasRepurposed && (
                  <div className="mt-4 p-4 rounded-memorial border border-teal-900/30 bg-teal-950/10">
                    <p className="text-xs font-mono uppercase tracking-wider text-teal-400/60 mb-2">
                      O que foi reaproveitado
                    </p>
                    <p className="text-sm text-muted-foreground leading-relaxed">{project.whatWasRepurposed}</p>
                  </div>
                )}
              </RitualSection>
            )}

            {/* Timeline */}
            {project.timeline.length > 0 && (
              <RitualSection title="Linha do tempo" ornament="V">
                <TimelineStrip events={project.timeline} />
              </RitualSection>
            )}

            {/* Most promising moment */}
            {project.mostPromisingMoment && (
              <RitualSection title="O momento mais promissor" ornament="VI">
                <ArchivePanel>
                  <p className="text-sm leading-relaxed text-parchment-muted italic">
                    &ldquo;{project.mostPromisingMoment}&rdquo;
                  </p>
                </ArchivePanel>
              </RitualSection>
            )}

            {/* Moment of reckoning */}
            {project.momentOfReckoning && (
              <RitualSection title="O momento em que ficou claro" ornament="VII">
                <ArchivePanel variant="crimson">
                  <p className="text-sm leading-relaxed text-parchment-muted italic">
                    &ldquo;{project.momentOfReckoning}&rdquo;
                  </p>
                </ArchivePanel>
              </RitualSection>
            )}

            {/* Lessons */}
            {project.lessons.length > 0 && (
              <RitualSection title="Lições herdadas" subtitle="O que sobrevive ao projeto" ornament="VIII">
                <div className="space-y-3">
                  {project.lessons.map((lesson, i) => (
                    <motion.div
                      key={lesson.id}
                      initial={{ opacity: 0, x: -14 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.07, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                      viewport={{ once: true }}
                      whileHover={{ x: 2, transition: { type: "spring", stiffness: 400, damping: 30 } }}
                      className="flex items-start gap-3 p-4 rounded-memorial border border-border/50 bg-card/40 hover:border-gold/20 transition-colors cursor-default"
                    >
                      <span className="text-gold/40 font-mono text-xs mt-0.5 shrink-0 w-4">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div>
                        <p className="text-sm text-parchment-muted leading-relaxed">{lesson.body}</p>
                        <span className="text-2xs font-mono uppercase tracking-wider text-muted-foreground/50 mt-1 block">
                          {LESSON_CATEGORY_LABELS[lesson.category]}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </RitualSection>
            )}

            {/* Reincarnation ideas */}
            {project.reincarnationIdeas.length > 0 && (
              <RitualSection
                title="Plano de reencarnação"
                subtitle="Se ele voltasse, em que forma seria?"
                ornament="IX"
              >
                <div className="space-y-4">
                  {project.reincarnationIdeas.map((idea, i) => {
                    const isHot = idea.feasibilityScore >= 7;
                    return (
                      <motion.div
                        key={idea.id}
                        initial={{ opacity: 0, y: 14 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.09, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                        className="relative p-5 rounded-memorial border transition-colors"
                        style={{
                          borderColor: isHot ? "rgba(61,122,106,0.45)" : "rgba(61,122,106,0.2)",
                          background: isHot ? "rgba(61,122,106,0.07)" : "rgba(61,122,106,0.03)",
                          boxShadow: isHot ? "0 0 20px rgba(61,122,106,0.06) inset" : undefined,
                        }}
                      >
                        {isHot && (
                          <div className="absolute top-3 right-3">
                            <FlameIcon className="h-3.5 w-3.5 text-teal-400/40" />
                          </div>
                        )}
                        <div className="flex items-start justify-between gap-3 mb-2 pr-6">
                          <h4 className="font-serif font-medium text-parchment leading-snug">{idea.title}</h4>
                          <span className="text-2xs font-mono px-2 py-0.5 rounded-sm border border-teal-900/40 text-teal-400/60 shrink-0 whitespace-nowrap">
                            {PIVOT_LABELS[idea.strategy]}
                          </span>
                        </div>
                        {idea.description && (
                          <p className="text-sm text-muted-foreground leading-relaxed mb-4">{idea.description}</p>
                        )}
                        <div className="flex items-center gap-3">
                          <span className="text-2xs text-muted-foreground/50 font-mono shrink-0">Viabilidade</span>
                          <div className="flex-1 resurrection-track">
                            <motion.div
                              className="resurrection-fill"
                              style={{
                                background: isHot
                                  ? "linear-gradient(90deg, #3d7a6a80, #3d7a6a)"
                                  : "linear-gradient(90deg, #3d7a6a50, #3d7a6a80)",
                              }}
                              initial={{ width: 0, opacity: 0 }}
                              whileInView={{ width: `${idea.feasibilityScore * 10}%`, opacity: 1 }}
                              viewport={{ once: true }}
                              transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
                            />
                          </div>
                          <span
                            className="text-xs font-mono w-8 text-right shrink-0"
                            style={{ color: isHot ? "rgba(61,180,130,0.7)" : "rgba(61,122,106,0.5)" }}
                          >
                            {idea.feasibilityScore}/10
                          </span>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </RitualSection>
            )}

            {/* Artifacts */}
            {project.artifacts.length > 0 && (
              <RitualSection title="Artefatos sobreviventes" subtitle="Registros que ficaram para trás" ornament="X">
                <div className="space-y-2">
                  {project.artifacts.map((artifact) => (
                    <div
                      key={artifact.id}
                      className="flex items-start gap-3 p-4 rounded-memorial border border-border/50 bg-card/30 hover:border-gold/20 transition-colors group"
                    >
                      <span className="text-gold/30 font-mono text-xs mt-0.5 shrink-0 w-6">
                        {ARTIFACT_TYPE_ICONS[artifact.type]}
                      </span>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <p className="text-sm font-medium text-parchment-muted">{artifact.title}</p>
                          <span className="text-2xs font-mono text-muted-foreground/50 shrink-0">
                            {artifact.type.replace(/_/g, " ").toLowerCase()}
                          </span>
                        </div>
                        {artifact.description && (
                          <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{artifact.description}</p>
                        )}
                        {artifact.url && (
                          <a
                            href={artifact.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-gold/50 hover:text-gold/80 transition-colors mt-1 inline-block font-mono truncate max-w-full"
                          >
                            {artifact.url}
                          </a>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </RitualSection>
            )}

            {/* Farewell letter */}
            {project.farewellLetter && (
              <RitualSection title="Carta de despedida" ornament="XI">
                <div className="relative">
                  <div className="absolute -top-3 right-5 w-9 h-9 rounded-full border border-gold/25 bg-gold/5 flex items-center justify-center shadow-sm z-10">
                    <MailIcon className="h-4 w-4 text-gold/40" />
                  </div>
                  <ArchivePanel variant="gold" className="pt-8">
                    <p className="text-sm leading-loose text-parchment-muted italic whitespace-pre-line">
                      {project.farewellLetter}
                    </p>
                    <div className="mt-5 pt-4 border-t border-gold/10 flex items-center gap-2">
                      <div className="h-px flex-1 bg-gold/10" />
                      <span className="text-gold/25 text-xs font-mono">fim</span>
                      <div className="h-px flex-1 bg-gold/10" />
                    </div>
                  </ArchivePanel>
                </div>
              </RitualSection>
            )}
          </div>

          {/* Right: sidebar */}
          <motion.aside
            className="space-y-4 sm:space-y-6 order-1 lg:order-2 lg:sticky lg:top-6 lg:self-start"
            initial={{ opacity: 0, x: 18 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.22, duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Resurrection meter */}
            <div className="card-memorial p-5 relative">
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-teal-500/35 to-transparent" />
              <div className="flex items-center justify-between mb-4">
                <p className="text-xs font-mono uppercase tracking-wider text-gold/60">Reencarnação</p>
                <SparklesIcon className="h-3.5 w-3.5 text-gold/30" />
              </div>
              <ResurrectionMeter potential={project.resurrectionPotential} showLabel={true} showDescription={true} />
            </div>

            {/* Quick facts */}
            <div className="card-memorial p-5 space-y-4">
              <div className="flex items-center gap-3">
                <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-gold/55">Ficha memorial</p>
                <div className="flex-1 h-px bg-border/40" />
              </div>

              <div className="space-y-3 divide-y divide-border/30">
                {[
                  { label: "Tipo", value: TYPE_LABELS[project.type], icon: LayersIcon },
                  { label: "Estágio", value: STAGE_LABELS[project.stage], icon: BookOpenIcon },
                  { label: "Peso emocional", value: EMOTIONAL_LABELS[project.emotionalWeight], icon: HeartIcon },
                ].map(({ label, value, icon: Icon }) => (
                  <div key={label} className="flex items-start gap-3 pt-3 first:pt-0">
                    <Icon className="h-3.5 w-3.5 text-gold/40 mt-0.5 shrink-0" />
                    <div>
                      <p className="text-2xs text-muted-foreground/50 font-mono uppercase tracking-wider mb-0.5">
                        {label}
                      </p>
                      <p className="text-sm text-parchment-muted">{value}</p>
                    </div>
                  </div>
                ))}

                {project.bornAt && (
                  <div className="flex items-start gap-3 pt-3">
                    <CalendarIcon className="h-3.5 w-3.5 text-gold/40 mt-0.5 shrink-0" />
                    <div>
                      <p className="text-2xs text-muted-foreground/50 font-mono uppercase tracking-wider mb-0.5">
                        Período
                      </p>
                      <p className="text-xs text-parchment-muted font-mono">
                        {formatDateFull(project.bornAt)}
                        {project.diedAt && (
                          <>
                            <br />
                            <span className="text-gold/40">†</span> {formatDateFull(project.diedAt)}
                          </>
                        )}
                      </p>
                      {lifespan !== "—" && (
                        <p className="text-2xs text-muted-foreground/40 mt-0.5 font-mono">{lifespan}</p>
                      )}
                      {project.diedAt && (
                        <p className="text-2xs text-gold/30 mt-0.5 font-mono italic">
                          {formatRelative(project.diedAt)}
                        </p>
                      )}
                    </div>
                  </div>
                )}

                {project.hadRealUsers && (
                  <div className="flex items-start gap-3 pt-3">
                    <UsersIcon className="h-3.5 w-3.5 text-gold/40 mt-0.5 shrink-0" />
                    <div>
                      <p className="text-2xs text-muted-foreground/50 font-mono uppercase tracking-wider mb-0.5">
                        Usuários reais
                      </p>
                      <p className="text-sm text-parchment-muted">
                        {project.userCount ? `${project.userCount} usuários` : "Sim"}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Tech stack */}
            {project.techStack.length > 0 && (
              <div className="card-memorial p-5">
                <div className="flex items-center gap-2 mb-4">
                  <CodeIcon className="h-3.5 w-3.5 text-gold/40" />
                  <p className="text-xs font-mono uppercase tracking-wider text-gold/60">Stack</p>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="text-[10px] font-mono px-2 py-0.5 rounded-sm border border-border/50 text-muted-foreground/60 bg-muted/15 hover:border-gold/25 hover:text-muted-foreground/85 transition-colors duration-150"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Tags */}
            {project.tags.length > 0 && (
              <div className="card-memorial p-5">
                <p className="text-xs font-mono uppercase tracking-wider text-gold/60 mb-3">Tags</p>
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <span
                      key={tag.id}
                      className="text-2xs font-mono px-2 py-0.5 rounded-sm border border-gold/20 text-gold/60 bg-gold/5"
                    >
                      #{tag.name}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Favorite */}
            <button
              onClick={() => toggle(project.id)}
              aria-label={isFav ? "Remover dos favoritos" : "Salvar nos favoritos"}
              aria-pressed={isFav}
              className={cn(
                "w-full flex items-center justify-center gap-2 p-3 rounded-memorial border transition-all text-sm",
                isFav
                  ? "bg-gold/10 border-gold/30 text-gold"
                  : "border-border/50 bg-card/30 text-muted-foreground hover:border-gold/20 hover:text-parchment",
              )}
            >
              <StarIcon className={cn("h-3.5 w-3.5", isFav && "fill-current")} />
              {isFav ? "Nos favoritos" : "Salvar nos favoritos"}
            </button>

            {/* Navigate */}
            <div className="flex flex-col gap-2">
              <Link
                href="/hall"
                className="flex items-center gap-2 p-3.5 rounded-sm border border-border/45 bg-card/20 hover:border-border/70 hover:bg-card/40 transition-all duration-200 text-[0.8125rem] text-muted-foreground/65 hover:text-parchment/90 group"
              >
                <ArrowLeftIcon className="h-3.5 w-3.5 group-hover:-translate-x-0.5 transition-transform duration-200" />
                Voltar ao memorial
              </Link>
              <Link
                href="/new"
                className="flex items-center gap-2 p-3.5 rounded-sm border border-gold/20 bg-gold/5 hover:bg-gold/10 hover:border-gold/35 transition-all duration-200 text-[0.8125rem] text-gold/70 hover:text-gold"
              >
                <SparklesIcon className="h-3.5 w-3.5" />
                Registrar outro projeto
              </Link>
            </div>
          </motion.aside>
        </div>
      </div>
    </main>
  );
}

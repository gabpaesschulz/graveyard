"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import Link from "next/link";
import { ArrowRightIcon, ArrowUpRightIcon } from "lucide-react";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { RotatingQuote } from "@/components/memorial/rotating-quote";

// -- Data ----------------------------------------------------------------------

const HERO_CARDS = [
  {
    name: "Orbit Habit",
    epitaph: "Queria ser lindo demais para funcionar.",
    stage: "PROTOTYPE",
    cause: "Escopo infinito",
    color: "#c9a96e",
    percent: 45,
    year: "2023",
  },
  {
    name: "Draftloom",
    epitaph: "As palavras ainda flutuam. Sem para onde ir.",
    stage: "BETA",
    cause: "Competição",
    color: "#8b6060",
    percent: 20,
    year: "2024",
  },
  {
    name: "Halfbuilt",
    epitaph: "Morreu fazendo o que pregava.",
    stage: "PROTOTYPE",
    cause: "Ironia do universo",
    color: "#3d7a6a",
    percent: 72,
    year: "2023",
  },
];

const MARQUEE_NAMES = [
  "Orbit Habit",
  "Quietcart",
  "Draftloom",
  "Tabern",
  "Glassroom",
  "Halfbuilt",
  "Someday Studio",
  "Aftertab",
  "North of MVP",
  "Vellichor",
];

const STATS = [
  { value: "10", label: "projetos enterrados" },
  { value: "1.983", label: "usuários alcançados" },
  { value: "27", label: "lições preservadas" },
  { value: "17", label: "ideias de reencarnação" },
];

const STEPS = [
  {
    number: "01",
    title: "Registrar",
    body: "Documente cada projeto morto com o rigor de um obituário premium. Nome, epitáfio, causa da morte, o que queria ser.",
    color: "#c9a96e",
  },
  {
    number: "02",
    title: "Honrar",
    body: "Reconheça o que ele representou. Cada projeto carregava sonhos reais, horas de trabalho, esperança genuína.",
    color: "#3d7a6a",
  },
  {
    number: "03",
    title: "Extrair",
    body: "Identifique lições, componentes reutilizáveis e sementes para o próximo ciclo. A morte de um projeto não é o fim da ideia.",
    color: "#7c5c8c",
  },
];

const FEATURES = [
  {
    roman: "I",
    title: "Obituário completo",
    body: "Nome, epitáfio, causa da morte, estágio, peso emocional. Um registro que trata o projeto com a seriedade que merecia.",
  },
  {
    roman: "II",
    title: "Linha do tempo",
    body: "Nascimento, marcos, crises, o momento da morte. Cada projeto tem uma história que vale preservar.",
  },
  {
    roman: "III",
    title: "Laboratório de reencarnação",
    body: "Pivots, componentes reutilizáveis, novos formatos. Ideias boas não morrem — elas esperam o momento certo.",
  },
  {
    roman: "IV",
    title: "Lições herdadas",
    body: "Preservadas e categorizadas. Para que o próximo projeto não repita os mesmos erros.",
  },
];

const SAMPLE_PROJECTS = [
  {
    name: "Orbit Habit",
    epitaph: "Queria ser lindo demais para funcionar. E era.",
    type: "App pessoal",
    cause: "Escopo infinito",
    year: "2023",
    slug: "orbit-habit",
    color: "#c9a96e",
  },
  {
    name: "Draftloom",
    epitaph: "As palavras ainda flutuam. Só não têm mais para onde ir.",
    type: "Ferramenta",
    cause: "Competição",
    year: "2024",
    slug: "draftloom",
    color: "#8b6060",
  },
  {
    name: "Halfbuilt",
    epitaph: "Morreu fazendo o que pregava. A ironia perfeita.",
    type: "Ferramenta",
    cause: "Ironia do universo",
    year: "2023",
    slug: "halfbuilt",
    color: "#3d7a6a",
  },
];

// -- Primitives -----------------------------------------------------------------

function FadeIn({
  children,
  delay = 0,
  className = "",
  direction = "up",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  direction?: "up" | "left" | "right" | "none";
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const y = direction === "up" ? 28 : 0;
  const x = direction === "left" ? -24 : direction === "right" ? 24 : 0;
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y, x }}
      animate={inView ? { opacity: 1, y: 0, x: 0 } : {}}
      transition={{ delay, duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 mb-5">
      <div className="h-px w-6 bg-gold/40" />
      <span className="text-2xs font-mono uppercase tracking-[0.2em] text-gold/60">{children}</span>
    </div>
  );
}

function Ornament() {
  return (
    <div className="container">
      <div className="flex items-center gap-4">
        <div className="flex-1 h-px bg-border/40" />
        <span className="text-gold/25 font-mono text-sm">✦</span>
        <div className="flex-1 h-px bg-border/40" />
      </div>
    </div>
  );
}

export default function LandingPage() {
  return (
    <main className="overflow-x-hidden">
      {/* HERO */}
      <section className="relative min-h-[92vh] flex flex-col justify-center py-24 md:py-0">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 80% 50% at 50% -5%, rgba(201,169,110,0.08) 0%, transparent 70%), radial-gradient(ellipse 40% 40% at 80% 65%, rgba(61,122,106,0.04) 0%, transparent 60%)",
            }}
          />
          {/* Dot grid overlay */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: "radial-gradient(circle, rgba(201,169,110,0.065) 1px, transparent 1px)",
              backgroundSize: "32px 32px",
              maskImage: "radial-gradient(ellipse 75% 90% at 72% 50%, black 0%, transparent 100%)",
            }}
          />
          {/* Large decorative cross */}
          <div
            className="absolute right-0 top-1/2 select-none pointer-events-none"
            style={{
              fontSize: "28rem",
              lineHeight: 1,
              color: "rgba(201,169,110,0.017)",
              fontFamily: "'Playfair Display', Georgia, serif",
              fontWeight: "bold",
              transform: "translateY(-50%) translateX(16%)",
            }}
          >
            †
          </div>
        </div>
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
        <div className="container relative">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_460px] gap-12 xl:gap-20 items-center">
            <div className="max-w-2xl">
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="flex items-center gap-3 mb-10"
              >
                <div className="h-px w-10 bg-gold/40" />
                <span className="text-2xs font-mono uppercase tracking-[0.25em] text-gold/55">
                  Memorial digital · Est. 2024
                </span>
              </motion.div>
              <div className="mb-8 space-y-1">
                <motion.p
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08, duration: 0.6 }}
                  className="font-serif italic text-parchment/45 leading-snug"
                  style={{ fontSize: "clamp(1.1rem, 2.2vw, 1.5rem)" }}
                >
                  Nem todo projeto
                </motion.p>
                <motion.h1
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.14, duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className="font-serif font-bold text-parchment leading-[0.9] tracking-tight"
                  style={{ fontSize: "clamp(3.4rem, 7.5vw, 6rem)" }}
                >
                  falhou.
                </motion.h1>
                <motion.div
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className="font-serif leading-snug"
                  style={{ fontSize: "clamp(1.2rem, 2.8vw, 2rem)" }}
                >
                  <span className="text-parchment/65">Alguns merecem um </span>
                  <span className="text-gold italic">enterro digno.</span>
                </motion.div>
              </div>
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="text-muted-foreground text-base md:text-lg leading-relaxed mb-10 max-w-lg text-balance"
              >
                Transforme ideias abandonadas em memória, aprendizado e matéria-prima para o próximo ciclo. Um memorial
                para os projetos que não chegaram lá, mas ainda deixaram algo vivo em você.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="flex flex-wrap items-center gap-3 mb-10"
              >
                <Link href="/new">
                  <Button
                    size="lg"
                    className="gap-2 bg-gold text-background hover:bg-gold/90 font-medium h-11 px-6"
                    style={{ boxShadow: "0 0 28px rgba(201,169,110,0.2), 0 2px 10px rgba(0,0,0,0.5)" }}
                  >
                    Criar um funeral <ArrowRightIcon className="h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/hall">
                  <Button
                    size="lg"
                    variant="ghost"
                    className="gap-2 text-parchment-muted border border-border hover:bg-card/80 hover:text-parchment hover:border-gold/20 h-11 px-6 transition-all duration-200"
                  >
                    Ver o memorial
                  </Button>
                </Link>
              </motion.div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.58 }}
                className="flex items-center gap-3 pt-6 border-t border-border/35"
              >
                <div className="flex items-center gap-1">
                  {["#c9a96e", "#8b6060", "#3d7a6a", "#7c5c8c", "#a06b3c"].map((color, i) => (
                    <div
                      key={i}
                      className="h-6 w-6 rounded-full border flex items-center justify-center"
                      style={{ background: `${color}14`, borderColor: `${color}30`, fontSize: "8px", color }}
                    >
                      †
                    </div>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-parchment font-medium">10 projetos</span> já enterrados com dignidade
                </p>
              </motion.div>{" "}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="pt-2"
              >
                <RotatingQuote />
              </motion.div>{" "}
            </div>
            {/* Cards */}
            <div className="relative h-[420px] hidden lg:block">
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: "radial-gradient(ellipse 70% 70% at 50% 50%, rgba(201,169,110,0.05) 0%, transparent 70%)",
                }}
              />
              {/* Ground glow */}
              <div
                className="absolute bottom-0 left-1/2 -translate-x-1/2 pointer-events-none"
                style={{
                  width: "85%",
                  height: "64px",
                  background:
                    "radial-gradient(ellipse 100% 100% at 50% 100%, rgba(201,169,110,0.13) 0%, transparent 100%)",
                  filter: "blur(16px)",
                }}
              />
              {HERO_CARDS.map((card, i) => (
                <motion.div
                  key={card.name}
                  initial={{ opacity: 0, y: 40, rotate: (i - 1) * 2.5 }}
                  animate={{ opacity: 1, y: 0, rotate: (i - 1) * 2.5 }}
                  transition={{ delay: 0.38 + i * 0.14, duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
                  whileHover={{ y: -8, rotate: 0, zIndex: 20, scale: 1.02, transition: { duration: 0.22 } }}
                  style={{
                    position: "absolute",
                    top: `${i * 54}px`,
                    left: `${i * 18}px`,
                    right: `${(2 - i) * 18}px`,
                    zIndex: 3 - i,
                  }}
                  className="card-memorial corner-ornament p-5 cursor-default"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="flex items-center gap-1.5 mb-1.5">
                        <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground/35">
                          {card.stage}
                        </span>
                        <span className="text-muted-foreground/20 text-[10px]">·</span>
                        <span className="text-[10px] font-mono text-muted-foreground/35">{card.year}</span>
                      </div>
                      <h3 className="font-serif font-semibold text-parchment">{card.name}</h3>
                    </div>
                    <span
                      className="text-[10px] font-mono px-1.5 py-0.5 rounded-sm border"
                      style={{
                        color: `${card.color}bb`,
                        borderColor: `${card.color}25`,
                        background: `${card.color}0c`,
                      }}
                    >
                      R.I.P.
                    </span>
                  </div>
                  <p className="epitaph text-sm leading-snug mb-4 text-parchment/55">{card.epitaph}</p>
                  <div className="mb-3">
                    <div className="flex justify-between items-center mb-1.5">
                      <span className="text-[10px] font-mono text-muted-foreground/35 uppercase tracking-wider">
                        Reencarnação
                      </span>
                      <span className="text-[10px] text-gold/50 font-mono">{card.percent}%</span>
                    </div>
                    <div className="resurrection-track">
                      <motion.div
                        className="resurrection-fill"
                        initial={{ width: 0 }}
                        animate={{ width: `${card.percent}%` }}
                        transition={{ delay: 0.9 + i * 0.15, duration: 1.1, ease: "easeOut" }}
                      />
                    </div>
                  </div>
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-sm border border-border/40 text-muted-foreground/35 bg-muted/10">
                    {card.cause}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <div className="border-y border-border/35 py-3 bg-card/10 overflow-hidden">
        <div
          className="flex whitespace-nowrap"
          style={{ animation: "marquee-scroll 40s linear infinite", width: "max-content" }}
        >
          {[...MARQUEE_NAMES, ...MARQUEE_NAMES, ...MARQUEE_NAMES].map((name, i) => (
            <span key={i} className="inline-flex items-center gap-5 px-4">
              <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-muted-foreground/25">{name}</span>
              <span className="text-gold/18 text-[9px]">✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* STATS */}
      <section className="py-16 md:py-20">
        <div className="container max-w-4xl">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-border/30 border border-border/30 rounded-sm overflow-hidden">
            {STATS.map((stat, i) => (
              <FadeIn key={stat.label} delay={i * 0.08}>
                <div className="p-8 text-center bg-card/10 hover:bg-card/30 transition-colors duration-300">
                  <div
                    className="font-serif font-bold tabular-nums mb-1.5"
                    style={{
                      fontSize: "clamp(2.2rem, 4vw, 3.4rem)",
                      background: "linear-gradient(160deg, #c9a96e 0%, rgba(201,169,110,0.55) 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    {stat.value}
                  </div>
                  <div className="text-2xs font-mono uppercase tracking-[0.15em] text-muted-foreground/45">
                    {stat.label}
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <Ornament />

      {/* PULL QUOTE */}
      <section className="py-16 md:py-28 lg:py-36">
        <div className="container max-w-3xl text-center">
          <FadeIn>
            <span className="font-serif text-gold/15 leading-none block mb-4 select-none" style={{ fontSize: "5rem" }}>
              "
            </span>
            <blockquote
              className="font-serif italic text-parchment/75 leading-relaxed mb-8 text-balance"
              style={{ fontSize: "clamp(1.25rem, 2.8vw, 1.9rem)" }}
            >
              Nenhuma linha de código é desperdiçada.
              <br />
              Nenhum wireframe é inútil.
              <br />
              <span className="text-parchment/50">Todo projeto morto ensinou algo que o próximo carregará.</span>
            </blockquote>
            <div className="flex items-center justify-center gap-4">
              <div className="h-px w-10 bg-gold/20" />
              <Link
                href="/manifesto"
                className="text-2xs font-mono uppercase tracking-[0.2em] text-gold/45 hover:text-gold/70 transition-colors"
              >
                O Manifesto do Graveyard
              </Link>
              <div className="h-px w-10 bg-gold/20" />
            </div>
          </FadeIn>
        </div>
      </section>

      <Ornament />

      {/* HOW IT WORKS */}
      <section className="py-14 md:py-24 lg:py-32">
        <div className="container max-w-5xl">
          <FadeIn className="mb-16">
            <SectionLabel>O processo</SectionLabel>
            <h2
              className="font-serif text-parchment font-bold leading-tight max-w-lg"
              style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)" }}
            >
              Um funeral tem rituais.
              <br />
              <span className="text-gold italic">Este também.</span>
            </h2>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {STEPS.map((item, i) => (
              <FadeIn key={item.number} delay={i * 0.12}>
                <div className="card-memorial p-5 sm:p-7 h-full group">
                  <div className="flex items-start justify-between mb-6">
                    <span
                      className="font-mono font-bold leading-none select-none"
                      style={{
                        fontSize: "clamp(3.5rem, 6vw, 5rem)",
                        background: `linear-gradient(160deg, ${item.color}45 0%, ${item.color}08 100%)`,
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                      }}
                    >
                      {item.number}
                    </span>
                    <div
                      className="h-px w-8 mt-7 transition-all duration-500 group-hover:w-14"
                      style={{ background: `${item.color}45` }}
                    />
                  </div>
                  <h3 className="font-serif text-parchment font-semibold text-xl mb-3">{item.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{item.body}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-20 border-y border-border/35 bg-card/15">
        <div className="container max-w-5xl">
          <FadeIn className="mb-14">
            <SectionLabel>O que o memorial oferece</SectionLabel>
            <h2
              className="font-serif text-parchment font-bold max-w-xl"
              style={{ fontSize: "clamp(1.6rem, 3vw, 2.4rem)" }}
            >
              Tudo que um projeto merecia ter recebido <span className="text-parchment/50 italic">em vida.</span>
            </h2>
          </FadeIn>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {FEATURES.map((f, i) => (
              <FadeIn key={f.title} delay={i * 0.09}>
                <motion.div
                  className="flex gap-5 p-6 rounded-sm border border-border/45 bg-card/25 hover:border-gold/20 hover:bg-card/45 transition-colors duration-300 group h-full"
                  whileHover={{ y: -3, transition: { type: "spring", stiffness: 420, damping: 28 } }}
                  style={{ willChange: "transform" }}
                >
                  <div className="shrink-0 pt-0.5">
                    <span className="font-mono text-xs text-gold/25 group-hover:text-gold/45 transition-colors duration-300">
                      {f.roman}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-serif text-parchment font-semibold mb-2 text-base">{f.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{f.body}</p>
                  </div>
                </motion.div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* SAMPLE PROJECTS */}
      <section className="py-14 md:py-24 lg:py-32">
        <div className="container max-w-5xl">
          <FadeIn className="mb-14">
            <SectionLabel>No memorial agora</SectionLabel>
            <div className="flex items-end justify-between gap-4">
              <h2
                className="font-serif text-parchment font-bold max-w-sm"
                style={{ fontSize: "clamp(1.6rem, 3vw, 2.4rem)" }}
              >
                Projetos que quase foram.
              </h2>
              <Link
                href="/hall"
                className="hidden md:inline-flex items-center gap-1.5 text-2xs font-mono uppercase tracking-widest text-gold/40 hover:text-gold/70 transition-colors duration-200"
              >
                Ver todos <ArrowRightIcon className="h-3 w-3" />
              </Link>
            </div>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
            {SAMPLE_PROJECTS.map((p, i) => (
              <FadeIn key={p.name} delay={i * 0.12}>
                <Link href={`/hall/${p.slug}`} className="block group h-full">
                  <motion.div
                    className="card-memorial corner-ornament p-6 h-full flex flex-col"
                    whileHover={{ y: -4, transition: { type: "spring", stiffness: 420, damping: 28, mass: 0.75 } }}
                    whileTap={{ scale: 0.987, transition: { duration: 0.1 } }}
                    style={{ willChange: "transform" }}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground/35">
                        {p.type}
                      </span>
                      <span className="text-[10px] font-mono text-muted-foreground/25">{p.year}</span>
                    </div>
                    <h3 className="font-serif font-semibold text-parchment group-hover:text-gold transition-colors duration-200 mb-3 text-lg leading-snug">
                      {p.name}
                    </h3>
                    <p className="epitaph text-sm leading-relaxed flex-1 mb-5 text-parchment/50">{p.epitaph}</p>
                    <div className="flex items-center justify-between pt-3 border-t border-border/35">
                      <span
                        className="text-[10px] font-mono px-2 py-0.5 rounded-sm border"
                        style={{ color: `${p.color}99`, borderColor: `${p.color}22`, background: `${p.color}09` }}
                      >
                        {p.cause}
                      </span>
                      <ArrowUpRightIcon className="h-3.5 w-3.5 text-muted-foreground/25 group-hover:text-gold/55 transition-colors duration-200" />
                    </div>
                  </motion.div>
                </Link>
              </FadeIn>
            ))}
          </div>
          <FadeIn className="flex justify-center md:hidden">
            <Link href="/hall">
              <Button variant="ghost" size="sm" className="gap-2 text-gold border border-gold/25 hover:bg-gold/8">
                Ver todos os memoriais <ArrowRightIcon className="h-3.5 w-3.5" />
              </Button>
            </Link>
          </FadeIn>
        </div>
      </section>

      {/* WHAT SURVIVES */}
      <section className="py-20 bg-card/15 border-y border-border/35">
        <div className="container max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 xl:gap-20 items-center">
            <FadeIn direction="left">
              <SectionLabel>O que sobrevive</SectionLabel>
              <h2
                className="font-serif text-parchment font-bold leading-tight mb-6"
                style={{ fontSize: "clamp(1.5rem, 2.8vw, 2.2rem)" }}
              >
                Projetos mortos são matéria-prima,<span className="text-gold italic"> não lixo.</span>
              </h2>
              <div className="space-y-4 text-muted-foreground text-sm leading-relaxed">
                <p>
                  Cada projeto que não chegou lá deixou algo. Às vezes é código reaproveitável. Às vezes é um
                  aprendizado sobre o que você não deve fazer. Às vezes é apenas a certeza de que a ideia era boa, mas o
                  momento era errado.
                </p>
                <p>O Graveyard transforma abandono em arquivo. Para que projetos mortos alimentem projetos vivos.</p>
              </div>
              <Link
                href="/reincarnation"
                className="inline-flex items-center gap-2 mt-7 text-2xs font-mono uppercase tracking-[0.18em] text-gold/45 hover:text-gold/75 transition-colors duration-200"
              >
                Ver laboratório de reencarnação <ArrowRightIcon className="h-3 w-3" />
              </Link>
            </FadeIn>
            <FadeIn delay={0.18} direction="right">
              <div className="space-y-2.5">
                {[
                  {
                    icon: "📚",
                    label: "Lições aprendidas",
                    desc: "Preservadas, categorizadas e consultáveis",
                    color: "#c9a96e",
                  },
                  {
                    icon: "🧩",
                    label: "Componentes reutilizáveis",
                    desc: "Código, designs, ideias, nomes, conceitos",
                    color: "#3d7a6a",
                  },
                  {
                    icon: "🔮",
                    label: "Planos de reencarnação",
                    desc: "Pivots, open source, novos formatos",
                    color: "#7c5c8c",
                  },
                  {
                    icon: "📦",
                    label: "Arquivos e artefatos",
                    desc: "Screenshots, docs, repos, links históricos",
                    color: "#8b6060",
                  },
                ].map((item, i) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: 16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.08 + i * 0.1, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                    whileHover={{ x: 4, transition: { type: "spring", stiffness: 400, damping: 30 } }}
                    className="flex items-start gap-4 p-4 rounded-sm border border-border/40 bg-card/35 hover:border-gold/18 hover:bg-card/55 transition-colors duration-300"
                  >
                    <span className="mt-0.5 text-base shrink-0" style={{ color: `${item.color}65` }}>
                      {item.icon}
                    </span>
                    <div>
                      <p className="text-sm font-medium text-parchment/85">{item.label}</p>
                      <p className="text-xs text-muted-foreground/55 mt-0.5">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-20 md:py-32 lg:py-44 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 70% 70% at 50% 115%, rgba(201,169,110,0.07) 0%, transparent 65%), radial-gradient(ellipse 40% 40% at 15% 50%, rgba(61,122,106,0.03) 0%, transparent 55%)",
            }}
          />
          {/* Dot grid */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: "radial-gradient(circle, rgba(201,169,110,0.06) 1px, transparent 1px)",
              backgroundSize: "28px 28px",
              maskImage: "radial-gradient(ellipse 75% 75% at 50% 50%, black 0%, transparent 100%)",
            }}
          />
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/15 to-transparent" />
        <div className="container max-w-3xl">
          <FadeIn className="text-center">
            <div className="flex items-center justify-center gap-5 mb-10">
              <div className="h-px w-20 bg-gradient-to-r from-transparent to-gold/18" />
              <span className="text-gold/25 font-mono" style={{ fontSize: "1.3rem" }}>
                ✦
              </span>
              <div className="h-px w-20 bg-gradient-to-l from-transparent to-gold/18" />
            </div>
            <h2
              className="font-serif text-parchment font-bold leading-tight mb-4"
              style={{ fontSize: "clamp(2rem, 4.5vw, 3.4rem)" }}
            >
              Seu próximo projeto vai morrer.
            </h2>
            <p className="font-serif italic text-gold/65 mb-7" style={{ fontSize: "clamp(1.1rem, 2.2vw, 1.5rem)" }}>
              Pelo menos dê a ele um bom epitáfio.
            </p>
            <p className="text-muted-foreground text-base leading-relaxed mb-10 max-w-lg mx-auto text-balance">
              Dê ao projeto o enterro que ele merece. Preserve o que sobrou. Honre o que ele tentou ser. Aprenda com o
              que passou.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 mb-8">
              <Link href="/new">
                <Button
                  size="lg"
                  className="gap-2 bg-gold text-background hover:bg-gold/90 font-medium h-12 px-8 text-base"
                  style={{ boxShadow: "0 0 36px rgba(201,169,110,0.22), 0 2px 14px rgba(0,0,0,0.55)" }}
                >
                  Começar o ritual <ArrowRightIcon className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/manifesto">
                <Button
                  size="lg"
                  variant="ghost"
                  className="text-parchment-muted border border-border hover:bg-card/80 hover:border-gold/20 hover:text-parchment h-12 px-7 transition-all duration-200"
                >
                  Ler o manifesto
                </Button>
              </Link>
            </div>
            <p className="text-2xs font-mono text-muted-foreground/25 uppercase tracking-[0.2em]">
              Gratuito · Sem cadastro · Sem julgamento
            </p>
          </FadeIn>
        </div>
      </section>
    </main>
  );
}

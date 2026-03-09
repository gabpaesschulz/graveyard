"use client";

import { useState, useRef, type KeyboardEvent } from "react";
import { useRouter } from "next/navigation";
import { useForm, FormProvider, type UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import Link from "next/link";
import { ArrowLeftIcon, ArrowRightIcon, CheckIcon, FlameIcon, XIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { createProjectSchema } from "@/lib/validations";
import { CAUSE_LABELS, STAGE_LABELS, TYPE_LABELS, EMOTIONAL_LABELS, RESURRECTION_LABELS, cn } from "@/lib/utils";
import { z } from "zod";

type FormInput = z.input<typeof createProjectSchema>;
type FormOutput = z.output<typeof createProjectSchema>;
type WizardForm = UseFormReturn<FormInput, unknown, FormOutput>;

// ── Step definitions ──────────────────────────────────────────────────────────

const STEPS = [
  {
    id: 1,
    title: "Identidade",
    subtitle: "Quem foi este projeto?",
    epigraph: "Todo projeto já foi um sonho com nome.",
  },
  {
    id: 2,
    title: "Cronologia",
    subtitle: "Quando viveu e morreu?",
    epigraph: "Nasceu em algum dia de entusiasmo. Morreu em algum dia de silêncio.",
  },
  {
    id: 3,
    title: "Diagnóstico",
    subtitle: "Como foi encerrado?",
    epigraph: "Todo funeral começa com um diagnóstico honesto.",
  },
  {
    id: 4,
    title: "Narrativa",
    subtitle: "O que queria ser?",
    epigraph: "Escreva para o projeto que você queria que existisse.",
  },
  {
    id: 5,
    title: "Rastros",
    subtitle: "O que ficou para trás?",
    epigraph: "Toda morte deixa rastros. Alguns valem ser preservados.",
  },
  {
    id: 6,
    title: "Cerimônia",
    subtitle: "Confirmar o registro",
    epigraph: "Uma vez registrado, ele existirá para sempre no arquivo.",
  },
];

const TOTAL = STEPS.length;

// ── Enum option lists ─────────────────────────────────────────────────────────

const STAGE_OPTIONS = [
  { value: "IDEA", label: "Ideia", description: "Nunca saiu do papel" },
  { value: "SKETCH", label: "Esboço", description: "Wireframes e anotações" },
  { value: "PROTOTYPE", label: "Protótipo", description: "Algo funcionando" },
  { value: "MVP", label: "MVP", description: "Versão mínima pronta" },
  { value: "BETA", label: "Beta", description: "Com alguns usuários reais" },
  { value: "LAUNCHED", label: "Lançado", description: "Foi ao ar e estava rodando" },
  { value: "HIATUS", label: "Em hiato", description: "Em pausa sem data de retorno" },
] as const;

const EMOTIONAL_OPTIONS = [
  { value: "LIGHT", label: "Leve", description: "Sem grandes arrependimentos", accent: "#5a9a7a" },
  {
    value: "NOSTALGIC",
    label: "Nostálgico",
    description: "Boas memórias misturadas com melancolia",
    accent: "#c9a96e",
  },
  { value: "HEAVY", label: "Pesado", description: "Difícil de revisitar", accent: "#8b3a3a" },
  {
    value: "HAUNTING",
    label: "Assombroso",
    description: "Volta à mente inesperadamente",
    accent: "#7c5c8c",
  },
  { value: "LIBERATING", label: "Libertador", description: "Morreu na hora certa", accent: "#3d7a6a" },
  {
    value: "BITTERSWEET",
    label: "Agridoce",
    description: "Mistura de orgulho e tristeza",
    accent: "#c97a3a",
  },
] as const;

const RESURRECTION_OPTIONS = [
  {
    value: "NONE",
    label: "Que descanse em paz",
    description: "Esse capítulo está encerrado para sempre.",
  },
  {
    value: "LOW",
    label: "Improvável",
    description: "Quase impossível, mas o mundo é estranho.",
  },
  {
    value: "MEDIUM",
    label: "Talvez um dia",
    description: "Pode renascer de outra forma, em outro momento.",
  },
  {
    value: "HIGH",
    label: "Pensando nisso",
    description: "Ideias concretas estão se formando.",
  },
  {
    value: "INEVITABLE",
    label: "Vai voltar",
    description: "É uma questão de quando, não de se.",
  },
] as const;

const CAUSE_EMOJI: Record<string, string> = {
  NO_TIME: "⧗",
  TOO_COMPLEX: "⌬",
  LOST_INTEREST: "◌",
  NO_MONEY: "⊘",
  SCOPE_CREEP: "∞",
  NO_MARKET: "◈",
  BAD_TIMING: "↯",
  BURNOUT: "⊗",
  WRONG_TECH: "⚙",
  LIFE_CHANGE: "⟳",
  BETTER_ALTERNATIVE: "→",
  COMPETITION: "⧖",
  TECHNICAL_DEBT: "⛓",
  TEAM_SPLIT: "⋈",
  OTHER: "·",
};

// ── Shared UI components ──────────────────────────────────────────────────────

function FieldRow({
  label,
  required,
  children,
  hint,
  error,
  charCount,
  charLimit,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
  hint?: string;
  error?: string;
  charCount?: number;
  charLimit?: number;
}) {
  return (
    <div className="space-y-1.5">
      <div className="flex items-baseline justify-between gap-2">
        <Label className="text-sm text-parchment-muted/80 font-normal">
          {label}
          {required && <span className="text-crimson/50 ml-0.5">*</span>}
        </Label>
        {charLimit !== undefined && charCount !== undefined && (
          <span
            className={cn(
              "text-2xs font-mono tabular-nums shrink-0 transition-colors",
              charCount > charLimit * 0.9 ? "text-crimson/60" : "text-muted-foreground/35",
            )}
          >
            {charCount} / {charLimit}
          </span>
        )}
      </div>
      {children}
      {error ? (
        <p className="text-xs text-crimson/70 flex items-center gap-1.5">
          <span className="inline-block w-1 h-1 rounded-full bg-crimson/60 shrink-0" />
          {error}
        </p>
      ) : hint ? (
        <p className="text-2xs text-muted-foreground/45 leading-relaxed">{hint}</p>
      ) : null}
    </div>
  );
}

function CardSelector<T extends string>({
  value,
  onChange,
  options,
  columns = 2,
}: {
  value: T | undefined;
  onChange: (v: T) => void;
  options: ReadonlyArray<{
    value: T;
    label: string;
    description?: string;
    accent?: string;
  }>;
  columns?: 1 | 2 | 3;
}) {
  const gridCls = columns === 1 ? "grid-cols-1" : columns === 3 ? "grid-cols-3" : "grid-cols-2";

  return (
    <div className={cn("grid gap-2", gridCls)}>
      {options.map((opt) => {
        const active = value === opt.value;
        return (
          <button
            key={opt.value}
            type="button"
            onClick={() => onChange(opt.value)}
            className={cn(
              "relative text-left p-3 rounded-[3px] border transition-all duration-150 text-sm",
              active
                ? "text-parchment"
                : "border-border/50 bg-card/30 text-muted-foreground hover:border-border/70 hover:bg-card/50 hover:text-parchment-muted",
            )}
            style={
              active && opt.accent
                ? { borderColor: `${opt.accent}90`, backgroundColor: `${opt.accent}18` }
                : active
                  ? {
                      borderColor: "rgba(201,169,110,0.55)",
                      backgroundColor: "rgba(201,169,110,0.1)",
                    }
                  : {}
            }
          >
            <div className="flex items-start justify-between gap-2">
              <span className="font-medium leading-tight text-sm">{opt.label}</span>
              {active && (
                <CheckIcon
                  className="h-3.5 w-3.5 shrink-0 mt-0.5"
                  style={opt.accent ? { color: opt.accent } : { color: "#c9a96e" }}
                />
              )}
            </div>
            {opt.description && (
              <p className="text-2xs text-muted-foreground/55 mt-1 leading-relaxed">{opt.description}</p>
            )}
          </button>
        );
      })}
    </div>
  );
}

function ChipInput({
  label,
  value,
  onChange,
  hint,
  placeholder = "Digite e pressione Enter…",
}: {
  label: string;
  value: string[];
  onChange: (v: string[]) => void;
  hint?: string;
  placeholder?: string;
}) {
  const [raw, setRaw] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  function commit(text: string) {
    const chips = text
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
    onChange([...new Set([...value, ...chips])]);
    setRaw("");
  }

  function handleKey(e: KeyboardEvent<HTMLInputElement>) {
    if ((e.key === "Enter" || e.key === ",") && raw.trim()) {
      e.preventDefault();
      commit(raw);
    } else if (e.key === "Backspace" && raw === "" && value.length > 0) {
      onChange(value.slice(0, -1));
    }
  }

  return (
    <FieldRow label={label} hint={hint}>
      <div
        className="min-h-10 flex flex-wrap gap-1.5 p-2 rounded-[3px] border border-border/60 bg-card/50 cursor-text focus-within:border-border focus-within:ring-1 focus-within:ring-ring/20 transition-colors"
        onClick={() => inputRef.current?.focus()}
      >
        {value.map((chip) => (
          <span
            key={chip}
            className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-gold/10 border border-gold/25 text-xs text-parchment-muted"
          >
            {chip}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onChange(value.filter((c) => c !== chip));
              }}
              className="hover:text-crimson/60 transition-colors ml-0.5"
            >
              <XIcon className="h-2.5 w-2.5" />
            </button>
          </span>
        ))}
        <input
          ref={inputRef}
          value={raw}
          onChange={(e) => setRaw(e.target.value)}
          onKeyDown={handleKey}
          onBlur={() => {
            if (raw.trim()) commit(raw);
          }}
          placeholder={value.length === 0 ? placeholder : ""}
          className="flex-1 min-w-20 bg-transparent text-sm outline-none placeholder:text-muted-foreground/35 text-parchment"
        />
      </div>
    </FieldRow>
  );
}

// ── Step 1 — Identidade ───────────────────────────────────────────────────────

function StepIdentity({ form }: { form: WizardForm }) {
  const {
    register,
    setValue,
    watch,
    formState: { errors },
  } = form;

  const desc = (watch("description") as string) ?? "";

  return (
    <div className="space-y-6">
      <FieldRow
        label="Nome do projeto"
        required
        hint="O nome que você usava quando falava sobre ele."
        error={errors.name?.message as string | undefined}
      >
        <Input
          {...register("name")}
          placeholder="ex: Orbit Habit"
          className="bg-card/50 border-border/60 text-base"
          autoFocus
        />
      </FieldRow>

      <FieldRow label="Slogan" hint="A frase com que você o apresentaria ao mundo em 30 segundos.">
        <Input
          {...register("slogan")}
          placeholder="ex: The habit tracker for overthinkers"
          className="bg-card/50 border-border/60"
        />
      </FieldRow>

      <FieldRow
        label="Tipo"
        required
        hint="Qual categoria melhor define o que era este projeto?"
        error={errors.type?.message as string | undefined}
      >
        <Select onValueChange={(v) => setValue("type", v as FormInput["type"])} defaultValue={watch("type")}>
          <SelectTrigger className="bg-card/50 border-border/60">
            <SelectValue placeholder="Selecione o tipo…" />
          </SelectTrigger>
          <SelectContent className="bg-popover border-border">
            {Object.entries(TYPE_LABELS).map(([k, v]) => (
              <SelectItem key={k} value={k}>
                {v}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </FieldRow>

      <FieldRow
        label="Descrição"
        hint="Explique o que era, em poucas linhas. Para alguém que nunca ouviu falar."
        charCount={desc.length}
        charLimit={500}
      >
        <Textarea
          {...register("description")}
          rows={3}
          placeholder="Era um app que ajudava pessoas a…"
          className="bg-card/50 border-border/60 resize-none"
        />
      </FieldRow>
    </div>
  );
}

// ── Step 2 — Cronologia ───────────────────────────────────────────────────────

function StepChronology({ form }: { form: WizardForm }) {
  const {
    register,
    setValue,
    watch,
    formState: { errors },
  } = form;

  const bornAt = watch("bornAt") as string | undefined;
  const diedAt = watch("diedAt") as string | undefined;
  const stage = watch("stage") as string | undefined;

  let lifespan: string | null = null;
  if (bornAt && diedAt) {
    try {
      const days = Math.floor((new Date(diedAt).getTime() - new Date(bornAt).getTime()) / 86_400_000);
      if (days > 0) {
        if (days < 30) {
          lifespan = `${days} dia${days > 1 ? "s" : ""}`;
        } else if (days < 365) {
          const m = Math.floor(days / 30);
          lifespan = `${m} ${m > 1 ? "meses" : "mês"}`;
        } else {
          const y = Math.floor(days / 365);
          const m = Math.floor((days % 365) / 30);
          lifespan =
            m > 0 ? `${y} ano${y > 1 ? "s" : ""} e ${m} ${m > 1 ? "meses" : "mês"}` : `${y} ano${y > 1 ? "s" : ""}`;
        }
      }
    } catch {
      /* ignore */
    }
  }

  return (
    <div className="space-y-6">
      <FieldRow
        label="Estágio em que morreu"
        required
        hint="Até onde chegou antes de parar? Seja honesto — todo estágio tem valor."
        error={errors.stage?.message as string | undefined}
      >
        <CardSelector
          value={stage as (typeof STAGE_OPTIONS)[number]["value"] | undefined}
          onChange={(v) => setValue("stage", v)}
          options={STAGE_OPTIONS}
          columns={2}
        />
      </FieldRow>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        <FieldRow label="Nasceu em" hint="Quando você começou">
          <Input type="date" {...register("bornAt")} className="bg-card/50 border-border/60" />
        </FieldRow>
        <FieldRow label="Morreu em" hint="Quando você parou de vez">
          <Input type="date" {...register("diedAt")} className="bg-card/50 border-border/60" />
        </FieldRow>
      </div>

      <AnimatePresence>
        {lifespan && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            className="flex items-center gap-3 px-4 py-3 rounded-[3px] bg-muted/20 border border-border/40"
          >
            <span className="text-2xs text-muted-foreground/50 uppercase tracking-wider font-mono">Viveu por</span>
            <span className="font-serif text-parchment-muted text-sm">{lifespan}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── Step 3 — Diagnóstico ──────────────────────────────────────────────────────

function StepDiagnosis({ form }: { form: WizardForm }) {
  const {
    setValue,
    watch,
    formState: { errors },
  } = form;

  return (
    <div className="space-y-6">
      <FieldRow
        label="Causa da morte"
        required
        hint="Seja honesto. Não existe resposta certa — apenas a sua."
        error={errors.causeOfDeath?.message as string | undefined}
      >
        <Select
          onValueChange={(v) => setValue("causeOfDeath", v as FormInput["causeOfDeath"])}
          defaultValue={watch("causeOfDeath")}
        >
          <SelectTrigger className="bg-card/50 border-border/60">
            <SelectValue placeholder="O que o matou?" />
          </SelectTrigger>
          <SelectContent className="bg-popover border-border">
            {Object.entries(CAUSE_LABELS).map(([k, v]) => (
              <SelectItem key={k} value={k}>
                <span className="mr-2">{CAUSE_EMOJI[k]}</span>
                {v}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </FieldRow>

      <FieldRow
        label="Peso emocional"
        required
        hint="Como você se sente quando pensa neste projeto hoje?"
        error={errors.emotionalWeight?.message as string | undefined}
      >
        <CardSelector
          value={watch("emotionalWeight") as (typeof EMOTIONAL_OPTIONS)[number]["value"] | undefined}
          onChange={(v) => setValue("emotionalWeight", v)}
          options={EMOTIONAL_OPTIONS}
          columns={2}
        />
      </FieldRow>

      <FieldRow
        label="Potencial de ressurreição"
        required
        hint="Você acredita que ele pode voltar, de alguma forma?"
        error={errors.resurrectionPotential?.message as string | undefined}
      >
        <CardSelector
          value={watch("resurrectionPotential") as (typeof RESURRECTION_OPTIONS)[number]["value"] | undefined}
          onChange={(v) => setValue("resurrectionPotential", v)}
          options={RESURRECTION_OPTIONS}
          columns={1}
        />
      </FieldRow>
    </div>
  );
}

// ── Step 4 — Narrativa ────────────────────────────────────────────────────────

function StepNarrative({ form }: { form: WizardForm }) {
  const {
    register,
    watch,
    formState: { errors },
  } = form;

  const epitaph = (watch("epitaph") as string) ?? "";
  const whatItWantedToBe = (watch("whatItWantedToBe") as string) ?? "";
  const whatWentWrong = (watch("whatWentWrong") as string) ?? "";

  return (
    <div className="space-y-6">
      <FieldRow
        label="Epitáfio"
        required
        hint="Uma frase para a eternidade. Poético, honesto, ou os dois."
        error={errors.epitaph?.message as string | undefined}
        charCount={epitaph.length}
        charLimit={200}
      >
        <Textarea
          {...register("epitaph")}
          rows={2}
          placeholder="Nasceu com muita ambição, morreu com muito código e pouco usuário."
          className="bg-card/50 border-border/60 resize-none font-serif text-base"
        />
      </FieldRow>

      <FieldRow
        label="O que queria ser"
        hint="Qual era a visão original? O sonho maior que motivou tudo isso?"
        charCount={whatItWantedToBe.length}
        charLimit={1000}
      >
        <Textarea
          {...register("whatItWantedToBe")}
          rows={3}
          placeholder="Queria ser a ferramenta que…"
          className="bg-card/50 border-border/60 resize-none"
        />
      </FieldRow>

      <FieldRow
        label="O que deu errado"
        hint="Seja honesto consigo. Ninguém vai ler isso a não ser que você queira."
        charCount={whatWentWrong.length}
        charLimit={1000}
      >
        <Textarea
          {...register("whatWentWrong")}
          rows={3}
          placeholder="O principal problema foi…"
          className="bg-card/50 border-border/60 resize-none"
        />
      </FieldRow>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        <FieldRow label="O momento mais promissor" hint="Quando você acreditou de verdade que ia funcionar.">
          <Textarea
            {...register("mostPromisingMoment")}
            rows={3}
            placeholder="Foi quando…"
            className="bg-card/50 border-border/60 resize-none"
          />
        </FieldRow>
        <FieldRow label="O momento em que ficou claro" hint="Quando você soube, lá no fundo, que havia acabado.">
          <Textarea
            {...register("momentOfReckoning")}
            rows={3}
            placeholder="Foi quando percebi que…"
            className="bg-card/50 border-border/60 resize-none"
          />
        </FieldRow>
      </div>
    </div>
  );
}

// ── Step 5 — Rastros ──────────────────────────────────────────────────────────

function StepLegacy({ form }: { form: WizardForm }) {
  const { register, setValue, watch } = form;

  const hadRealUsers = watch("hadRealUsers") as boolean;
  const farewellLetter = (watch("farewellLetter") as string) ?? "";

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        <ChipInput
          label="Sintomas antes da morte"
          value={(watch("symptoms") as string[]) ?? []}
          onChange={(v) => setValue("symptoms", v)}
          hint="Sinais de que estava morrendo — falta de foco, escopo crescendo…"
          placeholder="ex: procrastinação…"
        />
        <ChipInput
          label="Sonhos interrompidos"
          value={(watch("dreams") as string[]) ?? []}
          onChange={(v) => setValue("dreams", v)}
          hint="Features e visões que nunca aconteceram"
          placeholder="ex: modo offline…"
        />
      </div>

      <ChipInput
        label="Stack tecnológico"
        value={(watch("techStack") as string[]) ?? []}
        onChange={(v) => setValue("techStack", v)}
        hint="Linguagens, frameworks e ferramentas usadas"
        placeholder="ex: Next.js, Prisma, Postgres…"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        <FieldRow label="O que ainda funciona" hint="Código, conceitos ou peças que sobreviveram.">
          <Textarea
            {...register("whatStillWorks")}
            rows={3}
            placeholder="O módulo de auth, o design…"
            className="bg-card/50 border-border/60 resize-none"
          />
        </FieldRow>
        <FieldRow label="O que foi reaproveitado" hint="Alguma parte migrou para outro projeto?">
          <Textarea
            {...register("whatWasRepurposed")}
            rows={3}
            placeholder="O sistema de notificações virou…"
            className="bg-card/50 border-border/60 resize-none"
          />
        </FieldRow>
      </div>

      <FieldRow label="Para quem era" hint="Qual era o público-alvo original?">
        <Input
          {...register("targetAudience")}
          placeholder="ex: Freelancers que precisam gerenciar múltiplos clientes"
          className="bg-card/50 border-border/60"
        />
      </FieldRow>

      {/* Real users toggle */}
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setValue("hadRealUsers", !hadRealUsers)}
            className={cn(
              "relative w-10 h-5 rounded-full transition-colors border shrink-0",
              hadRealUsers ? "bg-gold/20 border-gold/40" : "bg-muted/20 border-border/60",
            )}
          >
            <span
              className={cn(
                "absolute top-0.5 w-4 h-4 rounded-full transition-transform",
                hadRealUsers ? "translate-x-5 bg-gold" : "translate-x-0.5 bg-muted-foreground/40",
              )}
            />
          </button>
          <div>
            <p className="text-sm text-parchment-muted">
              {hadRealUsers ? "Teve usuários reais" : "Não chegou a ter usuários"}
            </p>
            <p className="text-2xs text-muted-foreground/45">
              {hadRealUsers ? "Alguém além de você usou este projeto." : "Era só seu, até o fim."}
            </p>
          </div>
        </div>

        <AnimatePresence>
          {hadRealUsers && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <FieldRow label="Quantos usuários?" hint="Número aproximado. Não precisa ser exato.">
                <Input
                  type="number"
                  {...register("userCount", { valueAsNumber: true })}
                  placeholder="ex: 47"
                  className="bg-card/50 border-border/60 w-36"
                />
              </FieldRow>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <FieldRow
        label="Carta de despedida"
        hint="Uma mensagem para o seu projeto. Pode ser pessoal, sentimental, ou raivosa."
        charCount={farewellLetter.length}
        charLimit={2000}
      >
        <Textarea
          {...register("farewellLetter")}
          rows={5}
          placeholder="Querido projeto, você nunca soube, mas…"
          className="bg-card/50 border-border/60 resize-none font-serif"
        />
      </FieldRow>
    </div>
  );
}

// ── Step 6 — Cerimônia (review) ───────────────────────────────────────────────

function StepCeremony({ data }: { data: Partial<FormInput> }) {
  const techStack = data.techStack as string[] | undefined;
  const symptoms = data.symptoms as string[] | undefined;
  const dreams = data.dreams as string[] | undefined;

  const sections = [
    {
      icon: "🪦",
      title: "Identidade",
      rows: [
        { label: "Nome", value: data.name },
        { label: "Slogan", value: data.slogan },
        {
          label: "Tipo",
          value: data.type ? TYPE_LABELS[data.type as keyof typeof TYPE_LABELS] : undefined,
        },
        { label: "Descrição", value: data.description },
      ],
    },
    {
      icon: "📅",
      title: "Cronologia",
      rows: [
        {
          label: "Estágio",
          value: data.stage ? STAGE_LABELS[data.stage as keyof typeof STAGE_LABELS] : undefined,
        },
        { label: "Nasceu em", value: data.bornAt },
        { label: "Morreu em", value: data.diedAt },
      ],
    },
    {
      icon: "💀",
      title: "Diagnóstico",
      rows: [
        {
          label: "Causa da morte",
          value: data.causeOfDeath
            ? `${CAUSE_EMOJI[data.causeOfDeath as string] ?? ""} ${CAUSE_LABELS[data.causeOfDeath as keyof typeof CAUSE_LABELS]}`
            : undefined,
        },
        {
          label: "Peso emocional",
          value: data.emotionalWeight
            ? EMOTIONAL_LABELS[data.emotionalWeight as keyof typeof EMOTIONAL_LABELS]
            : undefined,
        },
        {
          label: "Ressurreição",
          value: data.resurrectionPotential
            ? RESURRECTION_LABELS[data.resurrectionPotential as keyof typeof RESURRECTION_LABELS]
            : undefined,
        },
      ],
    },
    {
      icon: "🔮",
      title: "Rastros",
      rows: [
        {
          label: "Stack",
          value: techStack?.length ? techStack.join(", ") : undefined,
        },
        {
          label: "Sintomas",
          value: symptoms?.length ? symptoms.join(", ") : undefined,
        },
        {
          label: "Sonhos",
          value: dreams?.length ? dreams.join(", ") : undefined,
        },
        {
          label: "Usuários",
          value: data.hadRealUsers ? (data.userCount ? `${data.userCount} usuários` : "Sim") : "Não chegou a ter",
        },
      ],
    },
  ]
    .map((s) => ({ ...s, rows: s.rows.filter((r) => r.value) }))
    .filter((s) => s.rows.length > 0);

  return (
    <div className="space-y-5">
      {/* Epitaph block */}
      {data.epitaph && (
        <div className="text-center py-5">
          <div className="flex justify-center mb-3">
            <FlameIcon className="h-4 w-4 text-crimson/40 animate-flicker" />
          </div>
          <blockquote className="epitaph text-sm leading-relaxed max-w-sm mx-auto text-parchment-muted/80">
            &ldquo;{data.epitaph}&rdquo;
          </blockquote>
        </div>
      )}

      {/* Sections grid */}
      <div className="grid grid-cols-2 gap-3">
        {sections.map((section) => (
          <div key={section.title} className="card-memorial p-4 space-y-3">
            <div className="flex items-center gap-1.5">
              <span className="text-sm">{section.icon}</span>
              <span className="text-2xs text-muted-foreground/50 uppercase tracking-wider font-mono">
                {section.title}
              </span>
            </div>
            {section.rows.map((row) => (
              <div key={row.label} className="space-y-0.5">
                <p className="text-2xs text-muted-foreground/45">{row.label}</p>
                <p className="text-xs text-parchment-muted leading-relaxed line-clamp-2">{row.value}</p>
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Farewell letter preview */}
      {data.farewellLetter && (
        <div className="card-memorial p-5 border-l-2 border-gold/15">
          <p className="text-2xs text-muted-foreground/40 uppercase tracking-wider font-mono mb-2">
            Carta de despedida
          </p>
          <p className="epitaph text-xs leading-relaxed text-parchment-muted/70 line-clamp-4">{data.farewellLetter}</p>
        </div>
      )}

      {/* Confirmation note */}
      <div className="text-center space-y-1 pt-2">
        <p className="text-sm text-muted-foreground/60">Ao confirmar, este projeto será eternizado no memorial.</p>
        <p className="text-2xs text-muted-foreground/35">
          Você poderá editar ou remover o registro a qualquer momento.
        </p>
      </div>
    </div>
  );
}

// ── Progress header ───────────────────────────────────────────────────────────

function ProgressHeader({ step, onGoTo }: { step: number; onGoTo: (s: number) => void }) {
  const current = STEPS[step - 1];

  return (
    <div className="mb-6 sm:mb-8 space-y-4 sm:space-y-5">
      {/* Step dots + animated connector lines */}
      <div className="flex items-center">
        {STEPS.map((s, i) => (
          <div key={s.id} className="flex items-center flex-1 last:flex-none">
            <button
              type="button"
              disabled={step <= s.id}
              onClick={() => step > s.id && onGoTo(s.id)}
              className={cn(
                "flex items-center justify-center w-6 h-6 rounded-full border text-2xs font-mono transition-all duration-200 shrink-0",
                step === s.id
                  ? "bg-gold/15 border-gold/50 text-gold shadow-gold-glow scale-110"
                  : step > s.id
                    ? "bg-gold/10 border-gold/25 text-gold/50 cursor-pointer hover:border-gold/45 hover:bg-gold/15"
                    : "border-border/35 text-muted-foreground/25 cursor-default",
              )}
            >
              {step > s.id ? <CheckIcon className="h-3 w-3" /> : s.id}
            </button>
            {i < STEPS.length - 1 && (
              <div className="flex-1 h-px mx-1 bg-border/25 relative overflow-hidden">
                <motion.div
                  className="absolute inset-y-0 left-0 bg-gold/35"
                  initial={false}
                  animate={{ width: step > s.id ? "100%" : "0%" }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Step label — animates on change */}
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.18 }}
        >
          <div className="flex items-baseline justify-between">
            <h2 className="font-serif text-xl text-parchment">{current.title}</h2>
            <span className="text-xs font-mono text-muted-foreground/30">
              {step} / {TOTAL}
            </span>
          </div>
          <p className="text-sm text-muted-foreground mt-0.5">{current.subtitle}</p>
          <p className="text-xs italic text-muted-foreground/35 mt-2">&ldquo;{current.epigraph}&rdquo;</p>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

// ── Main wizard ───────────────────────────────────────────────────────────────

export default function NewPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [dir, setDir] = useState<1 | -1>(1);
  const [submitting, setSubmitting] = useState(false);

  const methods = useForm<FormInput, unknown, FormOutput>({
    resolver: zodResolver(createProjectSchema),
    defaultValues: {
      techStack: [],
      symptoms: [],
      dreams: [],
      hadRealUsers: false,
    },
  });

  const { handleSubmit, watch, trigger } = methods;

  const STEP_FIELDS: Record<number, (keyof FormInput)[]> = {
    1: ["name", "type"],
    2: ["stage"],
    3: ["causeOfDeath", "emotionalWeight", "resurrectionPotential"],
    4: ["epitaph"],
    5: [],
  };

  async function next() {
    const fields = STEP_FIELDS[step];
    const valid = !fields?.length || (await trigger(fields));
    if (valid) {
      setDir(1);
      setStep((s) => s + 1);
    }
  }

  function prev() {
    setDir(-1);
    setStep((s) => s - 1);
  }

  function goTo(s: number) {
    setDir(s > step ? 1 : -1);
    setStep(s);
  }

  async function onSubmit(data: FormOutput) {
    setSubmitting(true);
    try {
      const res = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Falha ao registrar");
      const project = await res.json();
      toast.success("Projeto registrado no memorial.");
      router.push(`/hall/${project.slug}`);
    } catch {
      toast.error("Erro ao registrar o projeto. Tente novamente.");
      setSubmitting(false);
    }
  }

  const variants = {
    enter: (d: number) => ({ opacity: 0, x: d > 0 ? 22 : -22, filter: "blur(2px)" }),
    center: { opacity: 1, x: 0, filter: "blur(0px)" },
    exit: (d: number) => ({ opacity: 0, x: d > 0 ? -22 : 22, filter: "blur(2px)" }),
  };

  const stepContent: Record<number, React.ReactNode> = {
    1: <StepIdentity form={methods} />,
    2: <StepChronology form={methods} />,
    3: <StepDiagnosis form={methods} />,
    4: <StepNarrative form={methods} />,
    5: <StepLegacy form={methods} />,
    6: <StepCeremony data={watch()} />,
  };

  return (
    <main className="flex-1">
      {/* Hero */}
      <div className="relative overflow-hidden border-b border-border/50">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
        <div className="container py-8 sm:py-12">
          <Link
            href="/hall"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-parchment transition-colors mb-5 sm:mb-8 group"
          >
            <ArrowLeftIcon className="h-3.5 w-3.5 group-hover:-translate-x-0.5 transition-transform" />
            Voltar ao memorial
          </Link>
          <div className="flex items-center gap-3 mb-2">
            <FlameIcon className="h-5 w-5 text-crimson/60" />
            <h1 className="font-serif text-3xl text-parchment">Registrar um funeral</h1>
          </div>
          <p className="text-muted-foreground text-sm">Dê um nome à perda. Eternize o projeto no arquivo.</p>
        </div>
      </div>

      {/* Wizard */}
      <div className="container py-6 sm:py-10">
        <div className="max-w-2xl mx-auto">
          <ProgressHeader step={step} onGoTo={goTo} />

          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <AnimatePresence mode="wait" custom={dir}>
                <motion.div
                  key={step}
                  custom={dir}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                >
                  {stepContent[step]}
                </motion.div>
              </AnimatePresence>

              <div className="flex items-center justify-between mt-8 sm:mt-10 pt-5 sm:pt-6 border-t border-border/40">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={prev}
                  disabled={step === 1}
                  className="text-muted-foreground h-10 px-4"
                >
                  <ArrowLeftIcon className="h-3.5 w-3.5 mr-1.5" />
                  Anterior
                </Button>

                {step < TOTAL ? (
                  <Button
                    type="button"
                    onClick={next}
                    className="bg-gold/10 hover:bg-gold/20 border border-gold/30 text-gold h-10 px-5"
                  >
                    Próximo
                    <ArrowRightIcon className="h-3.5 w-3.5 ml-1.5" />
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    disabled={submitting}
                    className="bg-crimson/20 hover:bg-crimson/30 border border-crimson/40 text-parchment gap-2 h-10 px-5"
                  >
                    {submitting ? "Registrando…" : "Selar o funeral"}
                    <FlameIcon className="h-3.5 w-3.5" />
                  </Button>
                )}
              </div>
            </form>
          </FormProvider>
        </div>
      </div>
    </main>
  );
}

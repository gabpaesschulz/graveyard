"use client";

import { motion } from "framer-motion";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, PieChart, Pie, Legend } from "recharts";
import { MemorialEmptyState } from "@/components/memorial/memorial-empty-state";

const GOLD = "#c9a96e";
const CRIMSON = "#8b3a3a";
const TEAL = "#3d7a6a";
const MUTED = "#6b6252";

const PALETTE = [GOLD, CRIMSON, TEAL, "#7a5c3d", "#4a5c7a", "#6a3d7a", "#3d6a3a", "#7a6a3d", "#3d3a7a", "#7a3d5c"];

interface ChartEntry {
  name: string;
  value: number;
}

interface AnalyticsClientProps {
  totalProjects: number;
  totalLessons: number;
  withRealUsers: number;
  totalUserCount: number;
  causesData: ChartEntry[];
  stagesData: ChartEntry[];
  typesData: ChartEntry[];
  emotionData: ChartEntry[];
  resurrectionData: ChartEntry[];
  topTech: { name: string; count: number }[];
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-card border border-border/60 rounded-memorial px-3 py-2 text-xs text-parchment-muted shadow-lg">
      <p className="font-mono">{label ?? payload[0].name}</p>
      <p className="text-gold font-medium">{payload[0].value} projetos</p>
    </div>
  );
};

function Stat({
  label,
  value,
  sub,
  accent = GOLD,
}: {
  label: string;
  value: string | number;
  sub?: string;
  accent?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      className="card-memorial p-6 sm:p-7 text-center relative overflow-hidden group"
    >
      <div
        className="absolute inset-x-0 top-0 h-px"
        style={{ background: `linear-gradient(90deg, transparent, ${accent}80, transparent)` }}
      />
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ background: `radial-gradient(ellipse 80% 60% at 50% 110%, ${accent}08 0%, transparent 70%)` }}
      />
      <p
        className="font-serif font-black mb-2 leading-none tabular-nums"
        style={{ fontSize: "clamp(2.2rem, 4vw, 3.2rem)", color: accent, letterSpacing: "-0.025em" }}
      >
        {value}
      </p>
      <p className="text-[0.8125rem] font-medium leading-snug" style={{ color: "hsl(38 10% 56%)" }}>
        {label}
      </p>
      {sub && <p className="text-[10px] text-muted-foreground/35 mt-2 font-mono tracking-wide">{sub}</p>}
    </motion.div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="space-y-5">
      <div className="flex items-center gap-4">
        <div className="h-px flex-1 bg-border/40" />
        <div className="flex items-center gap-2">
          <span className="text-gold/25 text-xs font-mono">✶</span>
          <h2 className="font-serif text-lg text-parchment whitespace-nowrap">{title}</h2>
          <span className="text-gold/25 text-xs font-mono">✶</span>
        </div>
        <div className="h-px flex-1 bg-border/40" />
      </div>
      {children}
    </section>
  );
}

export function AnalyticsClient({
  totalProjects,
  totalLessons,
  withRealUsers,
  totalUserCount,
  causesData,
  stagesData,
  typesData,
  emotionData,
  resurrectionData,
  topTech,
}: AnalyticsClientProps) {
  /* Zero-state: no projects archived yet */
  if (totalProjects === 0) {
    return (
      <main className="flex-1 flex items-center justify-center">
        <MemorialEmptyState
          icon="⌬"
          title="O arquivo está vazio"
          description="Nenhum projeto foi registrado ainda. As estatísticas precisam de dados para existir — e os dados precisam de mortos."
          hint="Registre seu primeiro projeto para começar a ver os números."
          action={{ label: "+ Realizar o primeiro funeral", href: "/new" }}
        />
      </main>
    );
  }

  return (
    <main className="flex-1">
      <div className="relative border-b border-border/40 overflow-hidden">
        <div className="absolute top-0 left-0 right-0 line-gold" />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse 70% 80% at 50% 0%, rgba(201,169,110,0.05) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(201,169,110,0.05) 1px, transparent 1px)",
            backgroundSize: "30px 30px",
            maskImage: "radial-gradient(ellipse 80% 100% at 80% 50%, black 0%, transparent 100%)",
          }}
        />
        <div className="container py-14 relative">
          <p className="text-[10px] font-mono uppercase tracking-[0.22em] text-gold/45 mb-4">Arquivo · Estatísticas</p>
          <h1
            className="font-serif font-black text-parchment mb-3 tracking-tight"
            style={{ fontSize: "clamp(2rem, 4vw, 3rem)", letterSpacing: "-0.025em" }}
          >
            O custo do que foi
          </h1>
          <p className="max-w-xl leading-relaxed" style={{ color: "hsl(38 10% 50%)" }}>
            Números são a única honestidade que os projetos deixam para trás.
          </p>
        </div>
      </div>

      <div className="container py-10 sm:py-14 space-y-10 sm:space-y-16">
        {/* KPIs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Stat label="projetos sepultados" value={totalProjects} accent={GOLD} />
          <Stat label="lições herdadas" value={totalLessons} accent={TEAL} />
          <Stat
            label="tiveram usuários reais"
            value={withRealUsers}
            sub={`${Math.round((withRealUsers / totalProjects) * 100)}% do total`}
            accent={CRIMSON}
          />
          <Stat label="usuários totais alcançados" value={totalUserCount.toLocaleString("pt-BR")} accent="#7c5c8c" />
        </div>

        {/* Causes */}
        <Section title="Causas da morte">
          <div className="card-memorial p-4 sm:p-6 h-[220px] sm:h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={causesData} layout="vertical" margin={{ left: 0, right: 8 }}>
                <XAxis type="number" tick={{ fill: MUTED, fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis
                  dataKey="name"
                  type="category"
                  width={120}
                  tick={{ fill: "#a09580", fontSize: 10 }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(201,169,110,0.04)" }} />
                <Bar dataKey="value" radius={[0, 3, 3, 0]}>
                  {causesData.map((_, i) => (
                    <Cell key={i} fill={i === 0 ? CRIMSON : PALETTE[i % PALETTE.length]} fillOpacity={0.7} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Section>

        {/* Stages + Types side by side */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Section title="Estágio da morte">
            <div className="card-memorial p-4 sm:p-6 h-[200px] sm:h-[240px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={stagesData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="45%"
                    outerRadius={60}
                    strokeWidth={0}
                  >
                    {stagesData.map((_, i) => (
                      <Cell key={i} fill={PALETTE[i % PALETTE.length]} fillOpacity={0.75} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                  <Legend wrapperStyle={{ fontSize: "10px", color: "#a09580" }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </Section>

          <Section title="Tipo de projeto">
            <div className="card-memorial p-4 sm:p-6 h-[200px] sm:h-[240px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={typesData} margin={{ bottom: 24 }}>
                  <XAxis
                    dataKey="name"
                    tick={{ fill: "#a09580", fontSize: 10 }}
                    axisLine={false}
                    tickLine={false}
                    interval={0}
                    angle={-20}
                    textAnchor="end"
                  />
                  <YAxis tick={{ fill: MUTED, fontSize: 11 }} axisLine={false} tickLine={false} />
                  <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(201,169,110,0.04)" }} />
                  <Bar dataKey="value" radius={[3, 3, 0, 0]}>
                    {typesData.map((_, i) => (
                      <Cell key={i} fill={PALETTE[i % PALETTE.length]} fillOpacity={0.7} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Section>
        </div>

        {/* Emotional + Resurrection */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Section title="Peso emocional">
            <div className="card-memorial p-4 sm:p-6 h-[200px] sm:h-[240px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={emotionData} layout="vertical" margin={{ left: 0, right: 8 }}>
                  <XAxis type="number" tick={{ fill: MUTED, fontSize: 10 }} axisLine={false} tickLine={false} />
                  <YAxis
                    dataKey="name"
                    type="category"
                    width={90}
                    tick={{ fill: "#a09580", fontSize: 10 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(201,169,110,0.04)" }} />
                  <Bar dataKey="value" radius={[0, 3, 3, 0]}>
                    {emotionData.map((_, i) => (
                      <Cell key={i} fill={PALETTE[i % PALETTE.length]} fillOpacity={0.7} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Section>

          <Section title="Potencial de reencarnação">
            <div className="card-memorial p-4 sm:p-6 h-[200px] sm:h-[240px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={resurrectionData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="45%"
                    outerRadius={60}
                    strokeWidth={0}
                  >
                    {resurrectionData.map((_, i) => (
                      <Cell key={i} fill={i <= 1 ? MUTED : i <= 2 ? TEAL : GOLD} fillOpacity={0.75} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                  <Legend wrapperStyle={{ fontSize: "10px", color: "#a09580" }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </Section>
        </div>

        {/* Top tech stack */}
        {topTech.length > 0 && (
          <Section title="Stack mais usada">
            <div className="card-memorial p-4 sm:p-6 h-[220px] sm:h-[260px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={topTech} margin={{ bottom: 24 }}>
                  <XAxis
                    dataKey="name"
                    tick={{ fill: "#a09580", fontSize: 11 }}
                    axisLine={false}
                    tickLine={false}
                    interval={0}
                    angle={-25}
                    textAnchor="end"
                  />
                  <YAxis tick={{ fill: MUTED, fontSize: 11 }} axisLine={false} tickLine={false} />
                  <Tooltip
                    cursor={{ fill: "rgba(201,169,110,0.04)" }}
                    contentStyle={{
                      background: "var(--card)",
                      border: "1px solid rgba(201,169,110,0.1)",
                      borderRadius: "4px",
                      fontSize: "11px",
                    }}
                  />
                  <Bar dataKey="count" radius={[3, 3, 0, 0]}>
                    {topTech.map((_, i) => (
                      <Cell key={i} fill={GOLD} fillOpacity={0.4 + ((topTech.length - i) / topTech.length) * 0.4} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Section>
        )}
      </div>
    </main>
  );
}

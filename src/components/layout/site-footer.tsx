import Link from "next/link";

const NAV_LINKS = [
  { href: "/hall", label: "Salão Memorial" },
  { href: "/new", label: "Novo Funeral" },
  { href: "/analytics", label: "Necrologia" },
  { href: "/reincarnation", label: "Reencarnação" },
];

const PHILOSOPHY_LINKS = [
  { href: "/manifesto", label: "Manifesto" },
  { href: "/", label: "Sobre o projeto" },
];

export function SiteFooter() {
  return (
    <footer className="relative border-t border-border/40 mt-auto overflow-hidden">
      {/* Gold atmospheric top accent */}
      <div className="absolute top-0 left-0 right-0 line-gold" />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 60% 50% at 50% 0%, rgba(201,169,110,0.04) 0%, transparent 60%)",
        }}
      />

      <div className="container py-10 md:py-14 relative">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-10 mb-10 md:mb-12">
          {/* Brand */}
          <div className="col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <div
                className="flex items-center justify-center w-7 h-7 rounded-sm border text-gold text-sm"
                style={{ borderColor: "rgba(201,169,110,0.28)", background: "rgba(201,169,110,0.07)" }}
              >
                ⚰
              </div>
              <span className="font-serif font-bold text-parchment tracking-tight" style={{ fontSize: "0.9375rem" }}>
                Graveyard
              </span>
            </div>
            <p
              className="leading-relaxed max-w-xs text-[0.875rem] text-parchment-muted/55"
              style={{ lineHeight: "1.7" }}
            >
              Nem todo projeto chegou lá. Alguns simplesmente merecem um enterro à altura. Um arquivo para o que foi
              tentado, não apenas para o que foi concluído.
            </p>
            <p className="text-[10px] font-mono mt-5 tracking-[0.12em] text-gold/32">
              — Para os projetos que não chegaram lá, mas valeram cada linha —
            </p>
          </div>

          {/* Navigation */}
          <div>
            <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-gold/45 mb-4">Memorial</p>
            <nav aria-label="Memorial" className="flex flex-col gap-2.5">
              {NAV_LINKS.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className="text-[0.8125rem] text-parchment-muted/45 hover:text-parchment/85 transition-colors duration-200 hover-underline-gold w-fit"
                >
                  {label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Philosophy */}
          <div>
            <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-gold/45 mb-4">Filosofia</p>
            <nav aria-label="Filosofia" className="flex flex-col gap-2.5">
              {PHILOSOPHY_LINKS.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className="text-[0.8125rem] text-parchment-muted/45 hover:text-parchment/85 transition-colors duration-200 hover-underline-gold w-fit"
                >
                  {label}
                </Link>
              ))}
            </nav>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 border-t border-border/30 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[10px] font-mono tracking-[0.08em] text-gold/28">
            © {new Date().getFullYear()} Graveyard · Todos os projetos mortos, honrados.
          </p>
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] font-mono text-gold/20">Construído com</span>
            <span className="text-[10px] font-mono text-gold/35">Next.js · Prisma · Framer Motion</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

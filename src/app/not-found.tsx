import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex-1 flex items-center justify-center">
      <div className="relative text-center max-w-md px-8 py-20">
        {/* Ambient glow */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background: "radial-gradient(ellipse 70% 50% at 50% 40%, rgba(201,169,110,0.04) 0%, transparent 70%)",
          }}
        />

        {/* Top ornamental rule */}
        <div className="relative z-10 flex items-center gap-4 mb-10">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent to-border/40" />
          <span className="font-mono text-[9px] tracking-[0.8em] text-gold/18">✦</span>
          <div className="flex-1 h-px bg-gradient-to-l from-transparent to-border/40" />
        </div>

        {/* 404 tombstone composition */}
        <div className="relative z-10 mb-10">
          {/* Giant ghost number */}
          <p
            className="font-mono font-bold select-none leading-none tracking-tighter text-gold/5"
            style={{ fontSize: "clamp(5rem, 18vw, 8rem)" }}
          >
            404
          </p>

          {/* Plaque overlay */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div
              className="relative border border-border/30 bg-background/60 px-5 py-2.5 backdrop-blur-sm"
              style={{ borderRadius: "2px" }}
            >
              {/* Corner marks */}
              <span className="absolute top-1 left-1 block h-2 w-2 border-t border-l border-gold/20" />
              <span className="absolute top-1 right-1 block h-2 w-2 border-t border-r border-gold/20" />
              <span className="absolute bottom-1 left-1 block h-2 w-2 border-b border-l border-gold/20" />
              <span className="absolute bottom-1 right-1 block h-2 w-2 border-b border-r border-gold/20" />
              <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-gold/30">sepultado sem registro</p>
            </div>
          </div>
        </div>

        {/* Epitaph */}
        <div className="relative z-10 space-y-4 mb-10">
          <h1 className="font-serif text-3xl text-parchment leading-tight">Este memorial não existe</h1>
          <p className="text-muted-foreground text-sm leading-relaxed max-w-xs mx-auto">
            O projeto que você procura pode ter sido removido, renomeado, ou nunca chegou a ser registrado. Alguns
            morrem antes mesmo do epitáfio.
          </p>
        </div>

        {/* Actions */}
        <div className="relative z-10 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/hall"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-memorial border border-gold/30 bg-gold/5 hover:bg-gold/10 text-sm text-gold transition-colors"
          >
            Ver o memorial
          </Link>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-memorial border border-border/50 hover:border-border text-sm text-muted-foreground hover:text-parchment transition-colors"
          >
            Ir para o início
          </Link>
        </div>

        {/* Bottom ornamental rule */}
        <div className="relative z-10 flex items-center gap-4 mt-12">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent to-border/30" />
          <span className="font-mono text-[9px] tracking-[0.8em] text-gold/12">✦</span>
          <div className="flex-1 h-px bg-gradient-to-l from-transparent to-border/30" />
        </div>
      </div>
    </main>
  );
}

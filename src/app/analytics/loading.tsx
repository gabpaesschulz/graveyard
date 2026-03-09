import { Skeleton } from "@/components/ui/skeleton";

export default function AnalyticsLoading() {
  return (
    <main className="flex-1">
      <div className="border-b border-border/50">
        <div className="container py-14">
          {/* Thematic loading inscription */}
          <div className="flex items-center gap-2.5 mb-5">
            <span className="relative flex h-1.5 w-1.5 shrink-0">
              <span
                className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold/40 opacity-75"
                style={{ animationDuration: "2.2s" }}
              />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-gold/50" />
            </span>
            <span className="animate-pulse font-mono text-xs uppercase tracking-[0.22em] text-gold/35">
              contabilizando as perdas
            </span>
          </div>

          <Skeleton className="mb-3 h-10 w-56 bg-muted/30" />
          <Skeleton className="h-4 w-72 bg-muted/20" />
        </div>
      </div>
      <div className="container py-14 space-y-14">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="rounded-memorial border border-border/40 bg-card/30 p-6 text-center space-y-3">
              <Skeleton className="h-10 w-12 mx-auto bg-muted/25" />
              <Skeleton className="h-3 w-24 mx-auto bg-muted/20" />
            </div>
          ))}
        </div>
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="space-y-5">
            <div className="flex items-center gap-3">
              <Skeleton className="h-px flex-1 bg-muted/20" />
              <Skeleton className="h-5 w-36 bg-muted/25" />
              <Skeleton className="h-px flex-1 bg-muted/20" />
            </div>
            <div className="rounded-memorial border border-border/40 bg-card/30 p-6">
              <Skeleton className="w-full bg-muted/15 rounded" style={{ height: 240 }} />
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}

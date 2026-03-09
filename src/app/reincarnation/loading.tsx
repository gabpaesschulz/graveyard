import { Skeleton } from "@/components/ui/skeleton";

export default function ReincarnationLoading() {
  return (
    <main className="flex-1">
      <div className="border-b border-border/50">
        <div className="container py-14">
          {/* Thematic loading inscription — teal for resurrection theme */}
          <div className="flex items-center gap-2.5 mb-5">
            <span className="relative flex h-1.5 w-1.5 shrink-0">
              <span
                className="absolute inline-flex h-full w-full animate-ping rounded-full bg-teal-400/40 opacity-75"
                style={{ animationDuration: "2.6s" }}
              />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-teal-400/50" />
            </span>
            <span className="animate-pulse font-mono text-xs uppercase tracking-[0.22em] text-teal-400/35">
              invocando os que podem voltar
            </span>
          </div>

          <Skeleton className="mb-3 h-10 w-48 bg-muted/30" />
          <Skeleton className="mb-1 h-4 w-96 bg-muted/20" />
          <Skeleton className="h-4 w-80 bg-muted/15" />
        </div>
      </div>
      <div className="container py-14 space-y-8">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="rounded-memorial border border-border/40 bg-card/30 p-8 space-y-5">
            <div className="flex flex-col md:flex-row md:items-start gap-4">
              <div className="flex-1 space-y-2">
                <Skeleton className="h-3 w-28 bg-muted/25" />
                <Skeleton className="h-7 w-48 bg-muted/30" />
                <Skeleton className="h-4 w-64 bg-muted/20" />
              </div>
              <div className="w-56 space-y-2">
                <Skeleton className="h-3 w-24 bg-muted/25" />
                <Skeleton className="h-2 w-full bg-muted/20 rounded-full" />
              </div>
            </div>
            <div className="pt-4 border-t border-border/30 grid grid-cols-1 md:grid-cols-2 gap-3">
              {Array.from({ length: 2 }).map((_, j) => (
                <div key={j} className="rounded-memorial border border-teal-900/20 bg-teal-950/5 p-4 space-y-2">
                  <Skeleton className="h-4 w-32 bg-muted/20" />
                  <Skeleton className="h-3 w-full bg-muted/15" />
                  <Skeleton className="h-2 w-full bg-muted/15 rounded-full" />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}

import { Skeleton } from "@/components/ui/skeleton";

export default function HallLoading() {
  return (
    <main className="flex-1">
      {/* Page header */}
      <div className="border-b border-border/50">
        <div className="container py-14">
          {/* Thematic loading inscription */}
          <div className="flex items-center gap-2.5 mb-6">
            <span className="relative flex h-1.5 w-1.5 shrink-0">
              <span
                className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold/40 opacity-75"
                style={{ animationDuration: "2s" }}
              />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-gold/50" />
            </span>
            <span className="animate-pulse font-mono text-xs uppercase tracking-[0.22em] text-gold/35">
              percorrendo os corredores do memorial
            </span>
          </div>

          <Skeleton className="mb-3 h-10 w-64 bg-muted/30" />
          <Skeleton className="mb-8 h-4 w-80 bg-muted/20" />

          {/* Stats row skeleton */}
          <div className="flex items-center gap-6">
            <Skeleton className="h-5 w-24 bg-muted/20" />
            <Skeleton className="h-5 w-32 bg-muted/20" />
            <Skeleton className="h-5 w-36 bg-muted/20" />
          </div>
        </div>
      </div>

      {/* Sticky filter bar skeleton */}
      <div className="border-b border-border/50">
        <div className="container py-3">
          <div className="flex flex-wrap items-center gap-3">
            <Skeleton className="h-9 w-48 rounded-memorial bg-muted/20" />
            <Skeleton className="h-9 w-36 rounded-memorial bg-muted/20" />
            <Skeleton className="h-9 w-36 rounded-memorial bg-muted/20" />
            <Skeleton className="h-9 w-36 rounded-memorial bg-muted/20" />
            <div className="ml-auto flex gap-2">
              <Skeleton className="h-9 w-28 rounded-memorial bg-muted/20" />
              <Skeleton className="h-9 w-16 rounded-memorial bg-muted/20" />
            </div>
          </div>
        </div>
      </div>

      {/* Cards skeleton */}
      <div className="container py-10">
        <Skeleton className="mb-6 h-4 w-24 bg-muted/20" />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="space-y-4 rounded-memorial border border-border/40 bg-card/30 p-6"
              style={{ opacity: 1 - i * 0.055 }}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-3 w-20 bg-muted/30" />
                  <Skeleton className="h-6 w-40 bg-muted/25" />
                </div>
                <Skeleton className="h-6 w-20 rounded-sm bg-muted/20" />
              </div>
              <Skeleton className="h-3 w-full bg-muted/20" />
              <Skeleton className="h-3 w-4/5 bg-muted/20" />
              <div className="mt-4 flex items-center gap-2">
                <Skeleton className="h-1.5 flex-1 rounded-full bg-muted/20" />
              </div>
              <div className="flex gap-1.5">
                <Skeleton className="h-5 w-12 rounded-sm bg-muted/20" />
                <Skeleton className="h-5 w-16 rounded-sm bg-muted/20" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

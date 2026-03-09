import { Skeleton } from "@/components/ui/skeleton";

export default function ProjectDetailLoading() {
  return (
    <main className="flex-1">
      <div className="border-b border-border/50">
        <div className="container py-14">
          {/* Thematic loading inscription */}
          <div className="flex items-center gap-2.5 mb-8">
            <span className="relative flex h-1.5 w-1.5 shrink-0">
              <span
                className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold/40 opacity-75"
                style={{ animationDuration: "2.4s" }}
              />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-gold/50" />
            </span>
            <span className="animate-pulse font-mono text-xs uppercase tracking-[0.22em] text-gold/35">
              exumando o memorial
            </span>
          </div>
          <div className="flex flex-wrap gap-2 mb-5">
            <Skeleton className="h-6 w-24 bg-muted/20 rounded-sm" />
            <Skeleton className="h-6 w-32 bg-muted/20 rounded-sm" />
          </div>
          <Skeleton className="h-12 w-72 mb-3 bg-muted/30" />
          <Skeleton className="h-5 w-56 mb-6 bg-muted/20" />
          <Skeleton className="h-6 w-full max-w-xl mb-1 bg-muted/20" />
          <Skeleton className="h-6 w-4/5 max-w-xl mb-8 bg-muted/15" />
          <div className="flex flex-wrap gap-4">
            <Skeleton className="h-4 w-40 bg-muted/20" />
            <Skeleton className="h-6 w-28 bg-muted/20 rounded-sm" />
            <Skeleton className="h-6 w-24 bg-muted/20 rounded-sm" />
          </div>
        </div>
      </div>
      <div className="container py-14">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-10">
          <div className="space-y-12">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="space-y-4">
                <div className="flex items-center gap-3">
                  <Skeleton className="h-px flex-1 bg-muted/20" />
                  <Skeleton className="h-4 w-32 bg-muted/25" />
                  <Skeleton className="h-px flex-1 bg-muted/20" />
                </div>
                <div className="rounded-memorial border border-border/30 bg-card/30 p-5 space-y-2">
                  <Skeleton className="h-4 w-full bg-muted/20" />
                  <Skeleton className="h-4 w-5/6 bg-muted/20" />
                  <Skeleton className="h-4 w-4/5 bg-muted/15" />
                </div>
              </div>
            ))}
          </div>
          <aside className="space-y-5">
            <div className="rounded-memorial border border-border/40 bg-card/30 p-5 space-y-3">
              <Skeleton className="h-3 w-32 bg-muted/25" />
              <Skeleton className="h-2 w-full bg-muted/20 rounded-full" />
              <Skeleton className="h-3 w-24 bg-muted/15" />
            </div>
            <div className="rounded-memorial border border-border/40 bg-card/30 p-5 space-y-4">
              <Skeleton className="h-3 w-24 bg-muted/25" />
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="flex gap-3">
                  <Skeleton className="h-3.5 w-3.5 bg-muted/20 shrink-0 mt-0.5" />
                  <div className="space-y-1.5 flex-1">
                    <Skeleton className="h-2.5 w-16 bg-muted/20" />
                    <Skeleton className="h-4 w-28 bg-muted/20" />
                  </div>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}

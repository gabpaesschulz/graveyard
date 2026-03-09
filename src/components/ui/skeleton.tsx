import { cn } from "@/lib/utils";

function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("relative overflow-hidden rounded-md bg-muted/20", className)} {...props}>
      <span className="absolute inset-0 animate-shimmer" aria-hidden="true" />
    </div>
  );
}

export { Skeleton };

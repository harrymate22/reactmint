export default function Loading() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500 w-full">
      {/* Title & Description Skeleton */}
      <div className="space-y-4">
        <div className="h-12 w-3/4 max-w-sm rounded-lg bg-foreground/10 animate-pulse" />
        <div className="space-y-2 pt-2">
          <div className="h-4 w-full rounded bg-foreground/10 animate-pulse" />
          <div className="h-4 w-11/12 rounded bg-foreground/10 animate-pulse" />
          <div className="h-4 w-4/5 rounded bg-foreground/10 animate-pulse" />
        </div>
      </div>

      {/* Tabs & Content Box Skeleton */}
      <div className="space-y-4 pt-4">
        <div className="flex gap-2">
          <div className="h-9 w-20 rounded-md bg-foreground/10 animate-pulse" />
          <div className="h-9 w-20 rounded-md bg-foreground/10 animate-pulse" />
          <div className="h-9 w-20 rounded-md bg-foreground/10 animate-pulse" />
        </div>
        <div className="h-[350px] w-full rounded-xl bg-foreground/10 animate-pulse" />
      </div>
    </div>
  );
}

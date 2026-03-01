import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500 w-full">
      {/* Title & Description Skeleton */}
      <div className="space-y-4">
        <Skeleton className="h-12 w-3/4 max-w-sm rounded-lg" />
        <div className="space-y-2 pt-2">
          <Skeleton className="h-4 w-full rounded" />
          <Skeleton className="h-4 w-11/12 rounded" />
          <Skeleton className="h-4 w-4/5 rounded" />
        </div>
      </div>

      {/* Tabs & Content Box Skeleton */}
      <div className="space-y-4 pt-4">
        <div className="flex gap-2">
          <Skeleton className="h-9 w-20 rounded-md" />
          <Skeleton className="h-9 w-20 rounded-md" />
          <Skeleton className="h-9 w-20 rounded-md" />
        </div>
        <Skeleton className="h-[350px] w-full rounded-xl" />
      </div>
    </div>
  );
}

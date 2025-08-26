import { Skeleton } from "@/shared/components/ui/skeleton";

export const ArticlesGridSkeleton = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {Array.from({ length: 8 }).map((_, index) => (
        <Skeleton key={index} className="w-full h-48" />
      ))}
    </div>
  );
};

import { Card } from "@/shared/components/ui/card";
import { Skeleton } from "@/shared/components/ui/skeleton";

export const PostCardSkeletons = ({ count = 1 }: { count: number }) => {
  const arr = Array.from({ length: count }, (_, index) => index);
  return (
    <>
      {arr.map((index) => (
        <Card key={index} className="post-card bg-background animate-pulse p-0">
          <Skeleton className="w-full h-full" />
        </Card>
      ))}
    </>
  );
};

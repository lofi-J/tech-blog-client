import { Post } from "@/generated/graphql";
import { Skeleton } from "@/shared/components/ui/skeleton";
import { ArticleListCard } from "./article-list-card";

type ArticlesListDisplayProps = {
  posts: Post[];
  loading: boolean;
};

export const ArticlesListDisplay = ({
  posts,
  loading,
}: ArticlesListDisplayProps) => {
  if (loading) {
    return (
      <div className="flex flex-col gap-4">
        {Array.from({ length: 10 }).map((_, index) => (
          <Skeleton
            key={`articles-list-display-skeleton-${index}`}
            className="w-full h-[90px]"
          />
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {posts.map((post) => (
        <ArticleListCard key={post.id} post={post} />
      ))}
    </div>
  );
};

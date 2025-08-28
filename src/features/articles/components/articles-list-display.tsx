import { Post } from "@/generated/graphql";
import { Divider } from "@/shared/components/divider";
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
        {Array.from({ length: 4 }).map((_, index) => (
          <Skeleton
            key={`articles-list-display-skeleton-${index}`}
            className="w-full h-[90px]"
          />
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      {posts.map((post, index) => (
        <div key={`${post.id}-${index}`}>
          <ArticleListCard post={post} />
          {posts.length - 1 !== index && (
            <Divider
              direction="horizontal"
              size="sm"
              className="my-6"
              color="secondary"
            />
          )}
        </div>
      ))}
    </div>
  );
};

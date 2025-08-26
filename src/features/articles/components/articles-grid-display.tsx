import { Post } from "@/generated/graphql";
import { ArticleCard } from "./article-card";
import { ArticlesGridSkeleton } from "./articles-grid-skeleton";

type ArticlesGridDisplayProps = {
  posts: Post[];
  loading: boolean;
};

export const ArticlesGridDisplay = ({
  posts,
  loading,
}: ArticlesGridDisplayProps) => {
  if (loading) return <ArticlesGridSkeleton />;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {posts.map((post) => (
        <ArticleCard key={post.id} post={post} maxLine={3} />
      ))}
    </div>
  );
};

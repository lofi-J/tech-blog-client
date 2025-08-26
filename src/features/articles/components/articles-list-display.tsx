import { Post } from "@/generated/graphql";
import { ArticleCard } from "./article-card";

type ArticlesListDisplayProps = {
  posts: Post[];
  loading: boolean;
};

export const ArticlesListDisplay = ({
  posts,
  loading,
}: ArticlesListDisplayProps) => {
  if (loading) return <div>Loading...</div>; // TODO: add skeleton

  return (
    <div className="flex flex-col gap-4">
      {posts.map((post) => (
        <ArticleCard key={post.id} post={post} /> // TODO: add list 전용 card component
      ))}
    </div>
  );
};

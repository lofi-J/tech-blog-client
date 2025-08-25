import { Post } from "@/generated/graphql";
import { ClientPostCard } from "./client-post-card";

type ArticlesListDisplayProps = {
  posts: Post[];
  loading: boolean;
};

export const ArticlesListDisplay = ({
  posts,
  loading,
}: ArticlesListDisplayProps) => {
  if (loading) return <div>Loading...</div>; // TODO: add skeleton

  if (posts.length === 0) return <div>No posts found</div>; // TODO: add no posts found component

  return (
    <div className="flex flex-col gap-4">
      {posts.map((post) => (
        <ClientPostCard key={post.id} post={post} /> // TODO: add list 전용 card component
      ))}
    </div>
  );
};

"use client";

import { Post } from "@/generated/graphql";
import { ClientPostCard } from "./client-post-card";

type ArticlesGridDisplayProps = {
  posts: Post[];
  loading: boolean;
};

export const ArticlesGridDisplay = ({
  posts,
  loading,
}: ArticlesGridDisplayProps) => {
  if (loading) return <div>Loading...</div>; // TODO: add skeleton

  if (posts.length === 0) return <div>No posts found</div>; // TODO: add no posts found component

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {posts.map((post) => (
        <ClientPostCard key={post.id} post={post} />
      ))}
    </div>
  );
};

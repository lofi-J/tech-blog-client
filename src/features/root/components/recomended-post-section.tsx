"use client";

import { PostCard } from "@/features/posts/components/post-card";
import { PostCardSkeletons } from "@/features/posts/components/post-card-skeleton";
import { useGetAllPostsQuery } from "@/generated/graphql";

const SKELETON_COUNT = 6;

export const RecomendedPostSection = () => {
  const { data, loading, error } = useGetAllPostsQuery({
    variables: {
      inputs: {
        orderBy: "POPULAR_LIKES",
        limit: SKELETON_COUNT,
        offset: 0,
      },
    },
  });
  const posts = data?.getAllPosts.posts ?? [];

  if (error) {
    console.error(error);
    return null;
  }

  return (
    <div className="flex flex-wrap gap-10 justify-center items-center">
      {loading ? (
        <PostCardSkeletons count={SKELETON_COUNT} />
      ) : (
        posts.map((post) => <PostCard post={post} key={post.id} />)
      )}
    </div>
  );
};

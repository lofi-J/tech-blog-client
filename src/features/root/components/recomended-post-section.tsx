import client from "@/client";
import { PostCard } from "@/features/posts/components/post-card";
import { PostCardSkeletons } from "@/features/posts/components/post-card-skeleton";
import { GetAllPostsDocument, GetAllPostsQuery } from "@/generated/graphql";
import { Suspense } from "react";

const SKELETON_COUNT = 6;

async function PostsList() {
  try {
    const { data } = await client.query<GetAllPostsQuery>({
      query: GetAllPostsDocument,
      variables: {
        inputs: {
          orderBy: "POPULAR_LIKES",
          limit: SKELETON_COUNT,
          offset: 0,
        },
      },
      // 서버에서 캐시를 사용하지 않도록 설정
      fetchPolicy: "no-cache",
    });

    const posts = data?.getAllPosts.posts ?? [];

    return (
      <div className="flex flex-wrap gap-10 justify-center items-center">
        {posts.map((post) => (
          <PostCard post={post} key={post.id} />
        ))}
      </div>
    );
  } catch (error) {
    console.error("Failed to fetch posts:", error);
    return (
      <div className="text-center text-red-500">
        포스트를 불러오는데 실패했습니다.
      </div>
    );
  }
}

export const RecomendedPostSection = () => {
  return (
    <Suspense
      fallback={
        <div className="flex flex-wrap gap-10 justify-center items-center">
          <PostCardSkeletons count={SKELETON_COUNT} />
        </div>
      }
    >
      <PostsList />
    </Suspense>
  );
};

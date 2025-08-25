import client from "@/client";
import { ArticlesCardSkeletons } from "@/features/articles/components/articles-card-skeleton";
import { PostCard } from "@/features/articles/components/post-card";
import { GetAllPostsDocument, GetAllPostsQuery } from "@/generated/graphql";
import { Suspense } from "react";

const SKELETON_COUNT = 6;

async function PostsList() {
  try {
    const { data } = await client.query<GetAllPostsQuery>({
      query: GetAllPostsDocument,
      variables: {
        inputs: {
          orderBy: "LATEST",
          limit: SKELETON_COUNT,
          offset: 0,
        },
      },
      fetchPolicy: "cache-first",
    });

    const posts = data?.getAllPosts.posts ?? [];

    return (
      <section className="f-col gap-3">
        <h2 className="rts-14 font-semibold grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-4 justify-start">
          최근 포스팅
        </h2>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-4">
          {posts.map((post) => (
            <PostCard post={post} key={post.id} />
          ))}
        </div>
      </section>
    );
  } catch (error) {
    console.error("Failed to fetch posts:", error);
    return null;
  }
}

export const RecomendedPostSection = () => {
  return (
    <Suspense
      fallback={
        <section className="flex-col-container gap-3">
          <h2 className="rts-14 font-semibold grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-4 justify-start">
            최근 포스팅
          </h2>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-4">
            <ArticlesCardSkeletons count={SKELETON_COUNT} />
          </div>
        </section>
      }
    >
      <PostsList />
    </Suspense>
  );
};

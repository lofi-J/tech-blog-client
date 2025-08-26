import client from "@/client";
import { ArticleCard } from "@/features/articles/components/article-card";
import { ArticlesCardSkeletons } from "@/features/articles/components/articles-card-skeleton";
import { GetAllPostsDocument, GetAllPostsQuery } from "@/generated/graphql";
import { Suspense } from "react";

const SKELETON_COUNT = 6;

export const RecomendedPostSection = async () => {
  const { data, error } = await client.query<GetAllPostsQuery>({
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

  if (error) {
    console.error("Failed to fetch posts:", error);
    return null;
  }

  const posts = data?.getAllPosts.posts ?? [];

  return (
    <Suspense
      fallback={
        <section className="flex-col-container gap-3">
          <h2 className="rts-18 font-semibold grid grid-cols-4 gap-4 justify-start">
            최근 포스팅
          </h2>
          <div className="grid grid-cols-4 gap-4">
            <ArticlesCardSkeletons count={SKELETON_COUNT} />
          </div>
        </section>
      }
    >
      <section className="f-col gap-3">
        <h2 className="rts-18 font-semibold grid grid-cols-4 gap-4 justify-start">
          최근 포스팅
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {posts.map((post) => (
            <ArticleCard key={post.id} post={post} maxLine={3} />
          ))}
        </div>
      </section>
    </Suspense>
  );
};

import client from "@/client";
import { ArticlesGridDisplay } from "@/features/articles/components/articles-grid-display";
import { ArticlesGridSkeleton } from "@/features/articles/components/articles-grid-skeleton";
import { GetAllPostsDocument, GetAllPostsQuery } from "@/generated/graphql";
import { Suspense } from "react";

const ARTICLES_COUNT = 4;

export const RecomendedArticlesSection = async () => {
  const { data, error } = await client.query<GetAllPostsQuery>({
    query: GetAllPostsDocument,
    variables: {
      inputs: {
        orderBy: "LATEST",
        limit: ARTICLES_COUNT,
        offset: 0,
      },
    },
    fetchPolicy: "network-only",
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
          <ArticlesGridSkeleton />
        </section>
      }
    >
      <section className="f-col gap-3">
        <h2 className="rts-18 font-semibold grid grid-cols-4 gap-4 justify-start">
          최근 포스팅
        </h2>
        <ArticlesGridDisplay posts={posts} loading={false} />
      </section>
    </Suspense>
  );
};

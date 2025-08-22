"use client";

import { ClientPostCard } from "@/features/articles/components/client-post-card";
import { CategorySlider } from "@/features/tags/components/category-slider";
import { useGetPostsByTagQuery } from "@/generated/graphql";
import { Loader } from "@/shared/components/loader";
import PostIcon from "@/shared/icons/post.svg";
import { useState } from "react";

export default function PostsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>();

  const { data, loading } = useGetPostsByTagQuery({
    variables: { tag: selectedCategory ?? "" },
    skip: !selectedCategory,
    fetchPolicy: "cache-and-network",
  });

  const articles = data?.getPostsByTag.posts;

  return (
    <div className="py-8">
      <h1 className="text-4xl font-bold mb-8 flex items-center gap-2 justify-center">
        <PostIcon className="size-10" />
        Articles
      </h1>
      <p className="text-sm text-center">
        추천하는 카테고리를 선택하고 원하시는 포스트를 확인해 보세요.
      </p>
      <div className="flex flex-col items-center gap-3 mt-20 px-4">
        <h2 className="font-semibold w-full text-left px-4">
          Recommend category
        </h2>
        <CategorySlider
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
      </div>
      <div className="flex flex-col items-center gap-3 mt-20 px-4">
        <h2 className="font-semibold w-full text-left px-4">
          {selectedCategory} articles
        </h2>
        <div className="grid grid-cols-3 gap-4">
          {loading ? (
            <Loader />
          ) : (
            articles?.map((article) => (
              <ClientPostCard key={article.hash_code} post={article} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

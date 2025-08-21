"use client";

import { CategorySlider } from "@/features/tags/components/category-slider";
import PostIcon from "@/shared/icons/post.svg";
import { useState } from "react";

export default function PostsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>();

  // TODO: 카테고리 선택 시 해당 카테고리의 포스트 목록 조회

  return (
    <div className="py-8">
      <h1 className="text-4xl font-bold mb-8 flex items-center gap-2 justify-center">
        <PostIcon className="size-10" />
        Articles
      </h1>
      <p className="text-sm text-center">
        추천하는 카테고리를 선택하고 원하시는 포스트를 확인해 보세요.
      </p>
      <div className="flex flex-col items-center gap-2 mt-20">
        <h2 className="font-semibold">Recommend category</h2>
        <CategorySlider
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
      </div>
      <div className="flex flex-col items-center gap-2 mt-20">
        <h2 className="font-semibold">{selectedCategory} articles</h2>
        <div className="grid grid-cols-3">
          {/* <PostCard post={'' as Post} /> */}
          <div className="min-w-[300px] bg-amber-300"></div>
          <div className="min-w-[300px] bg-amber-300"></div>
          <div className="min-w-[300px] bg-amber-300"></div>
          <div className="min-w-[300px] bg-amber-300"></div>
        </div>
      </div>
    </div>
  );
}

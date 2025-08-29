"use client";

import { useProgressBar } from "@/shared/hooks/use-progress-bar";

export const HeaderArticleProgressBar = () => {
  const { progressRate } = useProgressBar("article-content");

  return (
    <div className="absolute top-[var(--header-height)] left-0 w-full h-[1.5px]">
      <div
        className="h-full bg-highlight rounded-full mr-auto"
        style={{ width: `${progressRate}%` }}
      />
    </div>
  );
};

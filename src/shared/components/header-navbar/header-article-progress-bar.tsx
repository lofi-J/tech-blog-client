"use client";

import { useProgressBar } from "@/shared/hooks/use-progress-bar";
import { usePathname } from "next/navigation";

export const HeaderArticleProgressBar = () => {
  const pathname = usePathname();
  const { progressRate } = useProgressBar("article-content");

  // /articles/[slug] 패턴인 경우에만 진행률 바를 표시
  const isArticlePage = /^\/articles\/[^\/]+$/.test(pathname);

  if (!isArticlePage) {
    return null;
  }

  return (
    <div className="absolute top-[var(--header-height)] left-0 w-full h-[1.5px]">
      <div
        className="h-full bg-highlight rounded-full mr-auto"
        style={{ width: `${progressRate}%` }}
      />
    </div>
  );
};

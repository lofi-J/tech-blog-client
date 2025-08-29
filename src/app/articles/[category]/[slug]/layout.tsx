"use client";

import { ArticleCommentator } from "@/features/articles/components/article-commentator";
import { ArticleNavigator } from "@/features/articles/components/article-navigator";
import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function ArticleDetailLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { slug } = useParams<{ slug: string }>();

  const articleRef = useRef<HTMLDivElement>(null);

  const [helpWord, setHelpWord] = useState("");

  useEffect(() => {
    const articleElm = articleRef.current;

    const handleMouseUp = (event: MouseEvent) => {
      if (!articleElm) return;

      // 마우스 좌표가 Article 요소 영역 안에 있는지 확인
      const rect = articleElm.getBoundingClientRect();
      const { clientX, clientY } = event;

      const isInsideElement =
        clientX >= rect.left &&
        clientX <= rect.right &&
        clientY >= rect.top &&
        clientY <= rect.bottom;

      if (isInsideElement) {
        const word = getSelection()?.toString();
        setHelpWord(word || "");
      }
    };

    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [articleRef]);

  return (
    <div className="relative grid grid-cols-1 xl:grid-cols-[1fr_3fr_1fr] gap-8 xl:gap-12 justify-between">
      {/* Commentator */}
      <div
        data-zen-hideable="slide-left"
        className="relative hidden xl:flex justify-center"
      >
        <div className="max-h-[600px] w-full max-w-[250px] sticky top-[var(--header-height)] transition-all duration-200 ease-in-out pt-4">
          <ArticleCommentator slug={slug} helpWord={helpWord} />
        </div>
      </div>

      {/* Article */}
      <div
        ref={articleRef}
        className="prose lg:max-w-[800px] max-w-[600px] w-full mx-auto pb-30 px-4"
      >
        {children}
      </div>

      {/* Navigator */}
      <div
        data-zen-hideable="slide-right"
        className="relative hidden xl:flex justify-center"
      >
        <div className="max-h-[600px] w-full max-w-[250px] sticky top-[var(--header-height)] transition-all duration-200 ease-in-out pt-4">
          <ArticleNavigator />
        </div>
      </div>
    </div>
  );
}

"use client";

import { cn } from "@/shared/lib/utils";
import { useCallback, useEffect, useState } from "react";

type HeadingItem = {
  id: string;
  text: string;
  level: number;
  isActive: boolean;
};

export const ArticleNavigator = () => {
  const [headings, setHeadings] = useState<HeadingItem[]>([]);
  const [activeId, setActiveId] = useState<string>("");

  // 페이지의 모든 헤딩 요소를 찾아서 목차 생성
  useEffect(() => {
    const articleElement = document.querySelector("article");
    if (!articleElement) return;

    const headingElements = articleElement.querySelectorAll(
      "h1, h2, h3, h4, h5, h6",
    );
    const headingItems: HeadingItem[] = [];

    headingElements.forEach((element, index) => {
      const id = element.id || `heading-${index}`;
      const text = element.textContent || "";
      const level = parseInt(element.tagName.charAt(1));

      // ID가 없으면 추가
      if (!element.id) {
        element.id = id;
      }

      headingItems.push({
        id,
        text,
        level,
        isActive: false,
      });
    });

    setHeadings(headingItems);
  }, []);

  // 스크롤 위치에 따라 활성 헤딩 감지
  useEffect(() => {
    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-10% 0px -60% 0px",
        threshold: 0,
      },
    );

    headings.forEach((heading) => {
      const element = document.getElementById(heading.id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, [headings]);

  // 헤딩 클릭 시 해당 위치로 스크롤
  const scrollToHeading = useCallback((id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const headerHeight = 56;
      const elementPosition = element.offsetTop - headerHeight - 20;

      window.scrollTo({
        top: elementPosition,
        behavior: "smooth",
      });
    }
  }, []);

  // 헤딩 레벨에 따른 스타일
  const getHeadingStyle = useCallback((level: number) => {
    switch (level) {
      case 1:
        return "text-[12px] font-semibold";
      case 2:
        return "text-[12px] font-medium ml-2";
      case 3:
        return "text-[12px] font-normal ml-4";
      case 4:
        return "text-[12px] font-normal ml-6";
      case 5:
        return "text-[12px] font-normal ml-8";
      case 6:
        return "text-[12px] font-normal ml-10";
      default:
        return "text-[12px]";
    }
  }, []);

  if (headings.length === 0) {
    return null;
  }

  return (
    <div className="w-full max-w-[250px] px-3 py-4">
      <h3 className="text-[14px] font-semibold mb-4 text-foreground">
        On this page
      </h3>

      <nav className="space-y-1 max-h-[500px] overflow-y-auto">
        {headings.map((heading) => (
          <button
            key={heading.id}
            onClick={() => scrollToHeading(heading.id)}
            className={cn(
              "w-full text-left px-2 py-1 rounded transition-all duration-200 hover:text-accent-foreground truncate text-[12px] text-muted-foreground leading-relaxed",
              activeId === heading.id && "text-highlight font-semibold",
              getHeadingStyle(heading.level),
            )}
            title={heading.text}
          >
            {heading.text}
          </button>
        ))}
      </nav>
    </div>
  );
};

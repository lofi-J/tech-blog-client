"use client";

import { fetchIndex } from "@/shared/lib/utils";
import Fuse from "fuse.js";
import { useEffect, useMemo, useState } from "react";

type HelperItem = {
  keyword: string;
  description: string;
};

type ArticleCommentatorProps = {
  slug: string;
  helpWord: string;
};

export const ArticleCommentator = ({
  slug,
  helpWord,
}: ArticleCommentatorProps) => {
  const [loadingHelperIndex, setLoadingHelperIndex] = useState(false);
  const [helperIndex, setHelperIndex] = useState<HelperItem[]>([]);
  const [helpResult, setHelpResult] = useState<HelperItem | null>(null);

  const fuse = useMemo(() => {
    return new Fuse(helperIndex, {
      keys: ["keyword"],
      threshold: 0.3,
      includeScore: true,
      includeMatches: true,
      minMatchCharLength: 2,
      shouldSort: true,
    });
  }, [helperIndex]);

  useEffect(() => {
    if (helpWord && helpWord.trim().length > 1) {
      const result = fuse.search(helpWord);

      if (result.length > 0) {
        setHelpResult(result[0].item);
      } else {
        setHelpResult(null);
      }
    } else {
      setHelpResult(null);
    }
  }, [helpWord, fuse]);

  // fetch helper index
  useEffect(() => {
    fetchIndex<HelperItem[]>(
      `/helper-index/${slug}.json`,
      setLoadingHelperIndex,
    ).then((data) => {
      setHelperIndex(data ?? []);
    });
  }, [slug]);

  if (loadingHelperIndex || helperIndex.length === 0) {
    return null;
  }

  return (
    <div className="w-full max-w-[250px] px-3 py-4">
      <h3 className="text-[14px] font-semibold mb-4 text-foreground">
        Commentary
      </h3>

      {helpResult ? (
        <div className="space-y-1">
          <span className="text-[13px] font-semibold text-primary">
            {helpResult.keyword}
          </span>

          <p className="text-[11px] text-muted-foreground leading-relaxed">
            {helpResult.description}
          </p>
        </div>
      ) : (
        <p className="text-xs text-muted-foreground">
          텍스트를 선택하면 도움말이 표시됩니다.
        </p>
      )}
    </div>
  );
};

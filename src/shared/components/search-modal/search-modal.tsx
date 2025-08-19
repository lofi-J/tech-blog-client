"use client";

import Fuse from "fuse.js";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useSearchModal } from "../../context/search-modal-provider";
import { fetchIndex } from "../../lib/utils";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Input } from "../ui/input";
import { SearchModalFeatureItem } from "./search-modal-feature-item";
import {
  Index,
  SearchArticleResultItem,
  SearchResult,
} from "./search-modal-result-article-item";

// index 파일 경로
const INDEX_PATH = "/search-index/index.json";

export const SearchModal = () => {
  const { isOpen, setIsOpen } = useSearchModal();
  const [keyword, setKeyword] = useState("");
  const [searchResult, setSearchResult] = useState<SearchResult[]>([]);
  const [index, setIndex] = useState<Index>();
  const [loading, setLoading] = useState<boolean>(false);

  const closeModal = () => setIsOpen(false);

  const isEmptySearchResult = searchResult.length === 0;

  // Input onChange Fn
  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setKeyword(e.target.value);
    },
    []
  );

  // create fuse instance
  const fuse = useMemo(
    () =>
      new Fuse(index ?? [], {
        // 검색 필드 및 가중치 부여
        keys: [
          { name: "title", weight: 0.6 },
          { name: "description", weight: 0.4 },
          { name: "tags", weight: 0.3 },
          { name: "date", weight: 0.3 },
          { name: "content", weight: 0.2 },
        ],
        // 매칭 정확도 (0.0~1.0, 낮을수록 엄격)
        threshold: 0.4,

        // 결과에 점수 포함
        includeScore: true,

        // 매칭된 부분 정보 포함 (하이라이트용)
        includeMatches: true,

        // 최소 검색어 길이
        minMatchCharLength: 2,

        // 검색어를 공백으로 분리하여 AND 검색
        useExtendedSearch: false,

        // 대소문자 구분 안함
        isCaseSensitive: true,

        // 검색 결과 최대 개수
        // limit: 50,
      }),
    [index]
  );

  // search from index.json
  useEffect(() => {
    const result = fuse.search(keyword);
    setSearchResult(result);
  }, [keyword, fuse]);

  useEffect(() => {
    fetchIndex(INDEX_PATH, setLoading).then(setIndex);
  }, []);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent
        showCloseButton={false}
        disableDescription={true}
        className="top-[40%] p-0 gap-0 min-h-[400px] max-h-[400px] overflow-y-auto min-w-[400px] max-w-[400px] scrollbar-hide flex flex-col"
      >
        {/* ==== Search Input ==== */}
        <DialogHeader className="p-2 sticky top-0 left-0 right-0 bg-background z-10 h-fit">
          <DialogTitle>
            <Input
              id="search-input"
              placeholder="Search Posts and Features..."
              type="search"
              className="w-full placeholder:text-[12px]"
              value={keyword}
              onChange={handleSearchChange}
            />
          </DialogTitle>
        </DialogHeader>
        {/* ==== /Search Input ==== */}

        {/* ==== Search Results ==== */}
        <div className="flex flex-col flex-warp gap-2 p-2 flex-1">
          {!isEmptySearchResult && (
            <div className="flex flex-col gap-1">
              <div className="text-muted-foreground text-[12px] px-2">
                Posts
              </div>
              {searchResult.map((result, index) => (
                <SearchArticleResultItem
                  key={`search-result-${index}`}
                  result={result}
                  closeModal={closeModal}
                  loading={loading}
                />
              ))}
            </div>
          )}
          {isEmptySearchResult && (
            <div className="flex flex-col gap-1">
              <div className="flex items-center justify-center min-h-30">
                <em className="text-muted-foreground text-[12px]">
                  검색 결과가 없습니다....
                </em>
              </div>
              <div className="text-muted-foreground text-[12px] px-2">
                Features
              </div>
              <div className="flex flex-col gap-1">
                <SearchModalFeatureItem
                  feature="toggle-zen-mode"
                  closeModal={closeModal}
                />
                <SearchModalFeatureItem
                  feature="change-highlight-color"
                  closeModal={closeModal}
                />
                <SearchModalFeatureItem
                  feature="toggle-theme"
                  closeModal={closeModal}
                />
              </div>
            </div>
          )}
        </div>
        {/* ==== /Search Results ==== */}
      </DialogContent>
    </Dialog>
  );
};

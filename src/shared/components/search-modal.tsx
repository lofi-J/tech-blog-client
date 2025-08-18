"use client";

import Fuse, { FuseResult } from "fuse.js";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import { fetchIndex } from "../lib/utils";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Input } from "./ui/input";

// 검색 인덱스 아이템 타입
type SearchIndexItem = {
  title: string;
  slug: string;
  description: string;
  date: string;
  tags: string[];
  content: string;
};

// Fuse.js 검색 결과 타입 (fuse.search()가 반환하는 타입)
type SearchResult = FuseResult<SearchIndexItem>;

export type Index = SearchIndexItem[] | undefined;

type SearchModalProps = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};

// index 파일 경로
const INDEX_PATH = "/search-index/index.json";

export const SearchModal = ({ isOpen, setIsOpen }: SearchModalProps) => {
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
          { name: "tags", weight: 0.2 },
          { name: "content", weight: 0.2 },
          { name: "date", weight: 0.2 },
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
        <DialogHeader className="p-2 sticky top-0 left-0 right-0 bg-background z-10 h-fit">
          <DialogTitle>
            <Input
              id="search-input"
              placeholder="Search any keywords..."
              type="search"
              className="w-full placeholder:text-[12px]"
              value={keyword}
              onChange={handleSearchChange}
            />
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col flex-warp gap-2 p-2">
          {isEmptySearchResult && <EmptySearchResult isLoading={loading} />}
          {!isEmptySearchResult &&
            searchResult.map((result, index) => (
              <SearchArticleResultItem
                key={`search-result-${index}`}
                result={result}
                closeModal={closeModal}
              />
            ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

// TODO: empty state content example: setting, recommend, etc...
const EmptySearchResult = ({ isLoading }: { isLoading: boolean }) => {
  return (
    <div className="flex justify-center items-center h-full">
      {isLoading ? (
        <div className="text-muted-foreground text-sm">Loading...</div>
      ) : (
        <div className="text-muted-foreground text-sm">No results found</div>
      )}
    </div>
  );
};

type SearchResultItemProps = {
  result: SearchResult;
  closeModal: () => void;
};

const SearchArticleResultItem = ({
  result,
  closeModal,
}: SearchResultItemProps) => {
  const { item, score, matches, refIndex } = result;
  const { title, slug, description, date, tags } = item;

  return (
    <Link
      href={`/posts/article/${slug}`}
      onClick={closeModal}
      className="p-3 hover:bg-muted/50 rounded-md cursor-pointer border border-border/50 hover:border-border transition-colors"
    >
      <div className="flex flex-col gap-2">
        <h3 className="font-medium text-sm line-clamp-1">{title}</h3>
        <p className="text-xs text-muted-foreground line-clamp-2">
          {description}
        </p>
        <div className="flex items-center justify-between">
          <div className="flex gap-1 flex-wrap">
            {tags.slice(0, 3).map((tag: string, index: number) => (
              <span
                key={index}
                className="text-xs px-2 py-0.5 bg-primary/10 text-primary rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
          <span className="text-xs text-muted-foreground">{date}</span>
        </div>
      </div>
    </Link>
  );
};

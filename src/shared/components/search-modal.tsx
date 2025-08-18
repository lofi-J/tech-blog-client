"use client";

import Fuse from "fuse.js";
import { useCallback, useEffect, useMemo, useState } from "react";
import { fetchIndex } from "../lib/utils";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Input } from "./ui/input";

type SearchResultType = "post" | "skill" | "setting";

// TODO : action callback?
type SearchResult = {
  type: SearchResultType;
  icon: React.ReactNode;
  title: string;
};

export type Index =
  | {
      title: string;
      slug: string;
      description: string;
      date: string;
      tags: string[];
      content: string;
    }[]
  | undefined;

type SearchModalProps = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};

// index 파일 경로
const INDEX_PATH = "/search-index/dummy.json";

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

  // search from index TODO : search and sosrting [post, skill, setting]
  useEffect(() => {
    const result = fuse.search(keyword);
    setSearchResult(result as unknown as SearchResult[]);
  }, [keyword, fuse]);

  useEffect(() => {
    console.log("fetching index");
    fetchIndex(INDEX_PATH, setLoading).then(setIndex);
  }, []);

  console.log("index");
  console.log(index);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent
        showCloseButton={false}
        disableDescription={true}
        className="top-[40%] p-0 gap-0 min-h-[400px] max-h-[400px] overflow-y-auto min-w-[400px] max-w-[400px] scrollbar-hide"
      >
        <DialogHeader className="p-2 sticky top-0 left-0 right-0 bg-background z-10">
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
              <div
                key={`search-result-${index}`}
                className="flex flex-wrap justify-between items-center"
                onClick={() => {
                  closeModal();
                }}
              >
                <pre
                  className="
                    text-xs 
                    whitespace-pre-wrap 
                    break-words 
                    overflow-wrap-anywhere
                    w-full
                    font-mono
                  "
                >
                  {JSON.stringify(result, null, 2)}
                </pre>
              </div>
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

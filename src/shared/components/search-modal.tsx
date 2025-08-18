"use client";

import { useCallback, useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Input } from "./ui/input";

type SearchResultType = "post" | "skill" | "setting";

// TODO : action callback?
type SearchResult = {
  type: SearchResultType;
  icon: React.ReactNode;
  title: string;
};

type SearchModalProps = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};

export const SearchModal = ({ isOpen, setIsOpen }: SearchModalProps) => {
  const [keyword, setKeyword] = useState("");
  const [searchResult, setSearchResult] = useState<SearchResult[]>([]);

  const closeModal = () => setIsOpen(false);

  const isEmptySearchResult = searchResult.length === 0;

  // Input onChange Fn
  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setKeyword(e.target.value);
    },
    []
  );

  // search from index TODO : search and sosrting [post, skill, setting]
  useEffect(() => {
    setSearchResult([]);
  }, [keyword]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent
        showCloseButton={false}
        disableDescription={true}
        className="p-0 gap-0"
      >
        <DialogHeader className="p-2">
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
        <div className="p-2">
          {isEmptySearchResult && <EmptySearchResult />}
          {!isEmptySearchResult &&
            searchResult.map((result) => (
              <div
                key={`${result.type}-${result.title}`}
                className="bg-red-400"
                onClick={() => {
                  console.log(result);
                  closeModal();
                }}
              >
                {result.title}
              </div>
            ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

// TODO: empty state content example: setting, recommend, etc...
const EmptySearchResult = () => {
  return (
    <div className="flex justify-center items-center h-full">
      <div className="text-muted-foreground text-sm">No results found</div>
    </div>
  );
};

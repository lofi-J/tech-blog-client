"use client";

import { useSearchModal } from "@/shared/context/search-modal-provider";
import { useIsBelow } from "@/shared/hooks/use-media";
import SearchIcon from "@/shared/icons/search.svg";
import { useCallback } from "react";
import { Kbd } from "../kbd";
import { Button } from "../ui/button";

export const HeaderModalTrigger = () => {
  const { openModal } = useSearchModal();
  const isSmallerThanTablet = useIsBelow("md");

  const onClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      e.stopPropagation();
      openModal();
    },
    [openModal],
  );

  if (isSmallerThanTablet) {
    return (
      <div className="flex items-center justify-center bg-secondary rounded-sm size-9">
        <Button variant="ghost" onClick={onClick}>
          <SearchIcon width={20} height={20} />
        </Button>
      </div>
    );
  }

  return (
    <Button
      variant="ghost"
      onClick={onClick}
      className="px-4 min-w-[200px] bg-secondary flex gap-4 items-center justify-between hover:bg-secondary/80"
    >
      <span className="text-muted-foreground text-[13px] font-light">
        Search any keywords...
      </span>
      <span className="flex items-center gap-1">
        <Kbd className="text-[14px]">⌘</Kbd>
        <Kbd>K</Kbd>
      </span>
    </Button>
  );
};

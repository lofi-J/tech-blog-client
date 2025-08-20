"use client";

import { useSearchModal } from "@/shared/context/search-modal-provider";
import { useCallback } from "react";
import { Kbd } from "../kbd";
import { Button } from "../ui/button";

export const HeaderModalTrigger = () => {
  const { openModal } = useSearchModal();

  const onClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      e.stopPropagation();
      openModal();
    },
    [openModal],
  );

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

"use client";

import { useRegisterKeymap } from "@/shared/hooks/use-register-keymap";
import { cn } from "@/shared/lib/utils";
import { useEffect, useState } from "react";
import { SearchModal } from "../search-modal";
import { Button } from "../ui/button";

export const HeaderModalTrigger = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { registerKeyMap, unregisterKeyMap } = useRegisterKeymap();

  const openModal = () => setIsOpen(true);

  const onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    openModal();
  };

  // warn: must be dependency array empty
  useEffect(() => {
    registerKeyMap.current = {
      commandKey: "⌘",
      key: "k",
      callback: openModal,
    };

    return () => unregisterKeyMap.current?.();
  }, []);

  return (
    <>
      <SearchModal isOpen={isOpen} setIsOpen={setIsOpen} />
      <Button
        variant="ghost"
        onClick={onClick}
        className="px-2 min-w-[200px] bg-secondary flex items-center justify-between hover:bg-secondary/80"
      >
        <span className="text-muted-foreground text-[13px] font-light">
          Search any keywords...
        </span>
        <span className="flex items-center gap-1">
          <Kbd className="text-[14px]">⌘</Kbd>
          <Kbd>K</Kbd>
        </span>
      </Button>
    </>
  );
};

const Kbd = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <kbd
      className={cn(
        "text-foreground bg-background border border-border rounded-[4px] px-1 text-[11px] text-center w-5 h-5 flex items-center justify-center",
        className
      )}
    >
      {children}
    </kbd>
  );
};

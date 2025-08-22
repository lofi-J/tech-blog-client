"use client";

import CloseIcon from "@/shared/icons/close.svg";
import { cn } from "@/shared/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { atom, useAtom } from "jotai";
import { useEffect } from "react";
import { TypoLogo } from "../typo-logo";
import { Button } from "../ui/button";

export const mobileSidebarAtom = atom(false);

let scrollPosition = 0;

export const MobileMenuSidebar = () => {
  const [isOpen, setIsOpen] = useAtom(mobileSidebarAtom);

  useEffect(() => {
    if (isOpen) {
      scrollPosition = window.scrollY;
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
      window.scrollTo(0, scrollPosition);
    }
  }, [isOpen]);

  const closeSidebar = () => {
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ x: "-100%" }}
        animate={{ x: 0 }}
        exit={{ x: "-100%" }}
        transition={{
          type: "tween",
          duration: 0.01,
          ease: "linear",
        }}
        className={cn(
          "fixed inset-0 w-screen h-screen bg-background z-50 overflow-hidden transition-all duration-300",
          isOpen ? "block" : "hidden",
        )}
      >
        <div className="container mx-auto flex flex-col items-start flex-1">
          <div className="flex items-center justify-between w-full p-4 header-height">
            <TypoLogo className="text-xl font-bold cursor-pointer" />
            <Button
              variant="secondary"
              onClick={closeSidebar}
              className="size-9 rounded-sm"
            >
              <CloseIcon width={20} height={20} />
            </Button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

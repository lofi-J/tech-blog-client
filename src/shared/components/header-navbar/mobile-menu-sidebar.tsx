"use client";

import { menuConfig } from "@/shared/config/menu-config";
import CloseIcon from "@/shared/icons/close.svg";
import { cn } from "@/shared/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { atom, useAtom } from "jotai";
import Link from "next/link";
import { useEffect } from "react";
import { TypoLogo } from "../typo-logo";
import { Button } from "../ui/button";
import { ToggleThemeButton } from "./toggle-theme-button";

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
        <div className="container mx-auto flex flex-col items-start flex-1 px-4">
          {/* 헤더 */}
          <div className="flex items-center justify-between w-full header-height">
            <TypoLogo className="text-xl font-bold cursor-pointer" />
            <Button
              variant="secondary"
              onClick={closeSidebar}
              className="size-9 rounded-sm"
            >
              <CloseIcon width={20} height={20} />
            </Button>
          </div>
          {/* 메뉴 리스트 */}
          <nav className="flex flex-col gap-4 mt-8">
            <h3 className="font-semibold text-[18px] text-foreground">Links</h3>
            {menuConfig.map((menu) => (
              <div
                key={`m-menu-${menu.label}`}
                className="flex items-center justify-start flex-1"
              >
                <Link
                  href={menu.href}
                  className="font-semibold text-[14px] hover:text-[var(--highlight-color)]"
                >
                  {menu.label}
                </Link>
              </div>
            ))}
          </nav>
          {/* 기능 리스트 */}
          <div className="flex flex-col items-start gap-4 mt-8 w-full">
            <h3 className="font-semibold text-[18px] text-foreground">
              Features
            </h3>
            <div className="flex items-center justify-start flex-1">
              <ToggleThemeButton />
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

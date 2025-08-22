"use client";

import HamburgerIcon from "@/shared/icons/hamburger.svg";
import { useSetAtom } from "jotai";
import { Button } from "../ui/button";
import { mobileSidebarAtom } from "./mobile-menu-sidebar";

export const HeaderMobileHamburger = () => {
  const setIsOpen = useSetAtom(mobileSidebarAtom);

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="bg-secondary rounded-sm flex items-center gap-2 md:hidden">
      <Button variant="ghost" className="size-9" onClick={toggleMenu}>
        <HamburgerIcon width={20} height={20} />
      </Button>
    </div>
  );
};

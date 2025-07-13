"use client";

import { HEADER_BANNER_HEIGHT } from "@/shared/constant/layout";
import Link from "next/link";
import { ToggleThemeButton } from "./toggle-theme-button";

export const HeaderBanner = () => {
  return (
    <header role="banner" className="bg-background sticky top-0 z-50 w-full">
      <div className="px-4">
        <div
          className={`h-[${HEADER_BANNER_HEIGHT}px] flex items-center justify-between`}
        >
          <nav>
            <ul>
              <li>
                <Link href="/">Home</Link>
              </li>
            </ul>
          </nav>
          <ToggleThemeButton />
        </div>
      </div>
    </header>
  );
};

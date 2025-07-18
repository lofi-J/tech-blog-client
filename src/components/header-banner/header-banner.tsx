"use client";

import Link from "next/link";
import { ToggleThemeButton } from "./toggle-theme-button";

export const HeaderBanner = () => {
  return (
    <header
      role="banner"
      className="bg-background sticky top-0 z-50 w-full header-height flex items-center"
    >
      <div className="px-4 w-full">
        <div className="flex items-center justify-between">
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

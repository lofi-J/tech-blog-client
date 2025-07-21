"use client";

import Link from "next/link";
import { TypoLogo } from "../typo-logo";
import { ToggleThemeButton } from "./toggle-theme-button";

export const HeaderBanner = () => {
  return (
    <header
      role="banner"
      className="bg-background sticky top-0 z-50 w-full header-height flex items-center"
    >
      <div className="px-4 flex-between w-full">
        <nav className="flex items-center gap-10">
          <Link href="/">
            <TypoLogo />
          </Link>
          <ul className="flex-center gap-4 text-sm">
            <li>
              <Link href="/">HOME</Link>
            </li>
            <li>
              <Link href="/">한국어</Link>
            </li>
            <li>
              <Link href="/">HOME</Link>
            </li>
          </ul>
        </nav>
        <ToggleThemeButton />
      </div>
    </header>
  );
};

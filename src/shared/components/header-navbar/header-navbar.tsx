import Link from "next/link";
import { Divider } from "../divider";
import { TypoLogo } from "../typo-logo";
import { HeaderColorPicker } from "./header-color-picker";
import { HeaderModalTrigger } from "./header-modal-trigger";
import { ToggleThemeButton } from "./toggle-theme-button";

export const HeaderNavbar = () => {
  return (
    <header
      role="banner"
      data-zen-hideable="slide-up"
      className="bg-background sticky top-0 z-50 w-full header-height flex items-center  container mx-auto"
    >
      <div className="px-4 flex-between w-full">
        <nav className="flex items-center gap-10">
          <Link href="/">
            <TypoLogo className="text-xl font-bold cursor-pointer" />
          </Link>
          <ul className="flex-center gap-5 text-sm">
            <li>
              <Link
                href="/articles"
                className="font-semibold hover:text-[var(--highlight-color)]"
              >
                Articles
              </Link>
            </li>
            <li>
              <Link
                href="/toys"
                className="font-semibold hover:text-[var(--highlight-color)]"
              >
                Toy Projects
              </Link>
            </li>
          </ul>
        </nav>
        <div className="flex items-center gap-3">
          <HeaderModalTrigger />
          <Divider
            size="sm"
            direction="vertical"
            className="py-1"
            color="secondary"
          />
          <HeaderColorPicker />
          <Divider
            size="sm"
            direction="vertical"
            className="py-1"
            color="secondary"
          />
          <ToggleThemeButton />
        </div>
      </div>
    </header>
  );
};

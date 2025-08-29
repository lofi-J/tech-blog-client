import Link from "next/link";
import { Divider } from "../divider";
import { TypoLogo } from "../typo-logo";
import { HeaderArticleProgressBar } from "./header-article-progress-bar";
import { HeaderColorPicker } from "./header-color-picker";
import { HeaderMobileHamburger } from "./header-mobile-hamburger";
import { HeaderModalTrigger } from "./header-modal-trigger";
import { ToggleThemeButton } from "./toggle-theme-button";

export const HeaderNavbar = () => {
  return (
    <header
      role="banner"
      id="main-header"
      data-zen-hideable="slide-up"
      data-zen-hoverable="slide-up"
      className="bg-background/80 backdrop-blur-sm sticky top-0 z-50 w-full header-height flex items-center flex-container"
    >
      <div className="px-4 flex-between w-full">
        <nav className="flex items-center gap-10">
          <Link href="/">
            <TypoLogo className="text-xl font-bold cursor-pointer" />
          </Link>
          <ul className="f-center gap-5 text-sm md:flex hidden">
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
        <div className="flex items-center gap-2">
          <HeaderModalTrigger />
          <Divider
            size="sm"
            direction="vertical"
            className="py-1"
            color="secondary"
          />
          <HeaderColorPicker className="hidden md:block" />
          <Divider
            size="sm"
            direction="vertical"
            className="py-1 hidden md:block"
            color="secondary"
          />
          <ToggleThemeButton className="hidden md:block" />
          <HeaderMobileHamburger />
        </div>
      </div>

      {/* articles progress bar */}
      <HeaderArticleProgressBar />
    </header>
  );
};

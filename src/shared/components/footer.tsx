import GithubIcon from "@/shared/icons/github.svg";
import MailIcon from "@/shared/icons/mail.svg";
import Link from "next/link";
import { TypoLogo } from "./typo-logo";

export const Footer = () => {
  return (
    <footer
      id="footer"
      data-zen-hideable="slide-down"
      className="w-full border-t border-accent mt-20 flex-container"
    >
      <div className="container mx-auto mt-9">
        <div className="f-col md:flex-row md:items-start md:justify-between">
          {/* Blog Info */}
          <div className="f-col items-start justify-start">
            <TypoLogo className="text-2xl font-bold mb-8" />
            <h3 className="sr-only">Lofi-J Tech Story</h3>
            <p className="mb-4 text-sm">
              성장과 기술 탐구를 기록하는 공간입니다.
              <br /> 프론트엔드, 백엔드, 그리고 새로운 기술 트렌드에 대한
              인사이트를 공유합니다.
            </p>
            <div className="hidden md:flex space-x-4">
              <a
                href="mailto:lofi2505@gmail.com"
                className="text-foreground transition-colors"
              >
                <span className="sr-only">Email</span>
                <MailIcon className="size-7" />
              </a>
              <a
                href="https://github.com/lofi-J"
                className="text-foreground transition-colors"
              >
                <span className="sr-only">GitHub</span>
                <GithubIcon className="size-7" fill="currentColor" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex gap-15 mt-10 md:mt-0">
            <div className="f-col justify-start gap-4">
              <h4 className="text-sm font-semibold">Resources</h4>
              <ul className="f-col justify-between gap-2">
                <li>
                  <FooterQuickLinks href="/">Home</FooterQuickLinks>
                </li>
                <li>
                  <FooterQuickLinks href="/posts">Articles</FooterQuickLinks>
                </li>
                <li>
                  <FooterQuickLinks href="/toys">Toy Projects</FooterQuickLinks>
                </li>
                <li>
                  <FooterQuickLinks href="/playground">
                    Playground
                  </FooterQuickLinks>
                </li>
              </ul>
            </div>
            <div className="f-col justify-start gap-4">
              <h4 className="text-sm font-semibold">Categories</h4>
              <ul className="f-col justify-between gap-2">
                <li>
                  <FooterQuickLinks href="/posts">Frontend</FooterQuickLinks>
                </li>
                <li>
                  <FooterQuickLinks href="/posts">Backend</FooterQuickLinks>
                </li>
                <li>
                  <FooterQuickLinks href="/posts">DevOps</FooterQuickLinks>
                </li>
              </ul>
            </div>
            <div className="f-col justify-start gap-4">
              <h4 className="text-sm font-semibold">Lofi-J</h4>
              <ul className="f-col justify-between gap-2">
                <li>
                  <FooterQuickLinks href="https://lofi-j.github.io">
                    Homepage
                  </FooterQuickLinks>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-accent mt-4 py-4 flex justify-between items-center">
          <p className="text-sm text-muted-foreground">
            Copyright © 2025, All rights reserved.
          </p>
          <div className="flex gap-4 items-center md:hidden only-mobile">
            <a
              href="mailto:lofi2505@gmail.com"
              className="text-foreground transition-colors"
            >
              <span className="sr-only">Email</span>
              <MailIcon className="size-5" />
            </a>
            <a
              href="https://github.com/lofi-J"
              className="text-foreground transition-colors"
            >
              <span className="sr-only">GitHub</span>
              <GithubIcon className="size-5" fill="currentColor" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

const FooterQuickLinks = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => {
  return (
    <Link
      href={href}
      className="text-sm font-light text-foreground transition-colors hover:text-highlight"
    >
      {children}
    </Link>
  );
};

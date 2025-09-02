import { FaReact } from "react-icons/fa";
import { IoLogoJavascript } from "react-icons/io5";

import { SiTypescript } from "react-icons/si";

import { IconType } from "react-icons/lib";

import { BsTerminalFill } from "react-icons/bs";
import { FaRust } from "react-icons/fa";
import { IoLogoCss3 } from "react-icons/io";

import { cn } from "../lib/utils";

export type Language =
  | "javascript"
  | "typescript"
  | "react"
  | "rust"
  | "css"
  | "bash";
export type Category = Language | "git";

const languageIcons: Record<Language, IconType> = {
  javascript: IoLogoJavascript,
  typescript: SiTypescript,
  react: FaReact,
  rust: FaRust,
  css: IoLogoCss3,
  bash: BsTerminalFill,
};

export const LanguageIcon = ({
  language,
  className,
}: {
  language: Language;
  className?: string;
}) => {
  const Icon = languageIcons[language];
  return (
    <span className={cn("rts-14 font-jetbrains-mono", className)}>
      <Icon className="size-full" />
    </span>
  );
};

// language가 Language에 없을 경우 default javascript로 처리
export const guranteeLanguage = (language: string): Language => {
  if (language in languageIcons) {
    return language as Language;
  }
  return "javascript";
};

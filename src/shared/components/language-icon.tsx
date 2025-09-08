import { FaFileAlt, FaJava, FaReact } from "react-icons/fa";
import { IoLogoJavascript } from "react-icons/io5";

import { DiJqueryLogo } from "react-icons/di";
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
  | "bash"
  | "jsp"
  | "txt"
  | "java"
  | "jquery";

export type Category = Language | "git";

const languageIcons: Record<Language, IconType> = {
  javascript: IoLogoJavascript,
  typescript: SiTypescript,
  react: FaReact,
  rust: FaRust,
  css: IoLogoCss3,
  bash: BsTerminalFill,
  jsp: IoLogoCss3,
  java: FaJava,
  txt: FaFileAlt,
  jquery: DiJqueryLogo,
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

// language가 Language에 없을 경우 default text 처리
export const guranteeLanguage = (language: string): Language => {
  if (language in languageIcons) {
    return language as Language;
  }
  return "txt";
};

// icon color config
export const skillColorConfig: Record<Category, string> = {
  javascript: "#f1db4e",
  typescript: "#3278c6",
  react: "#21d9fe",
  rust: "#f6771c",
  css: "#2d53e5",
  git: "#de4c36",
  bash: "#000000",
  jsp: "#0000ff",
  txt: "#333",
  java: "#0000ff",
  jquery: "#0000ff",
};

import CssIcon from "@/shared/icons/css.svg";
import GitIcon from "@/shared/icons/git.svg";
import GithubIcon from "@/shared/icons/github.svg";
import HtmlIcon from "@/shared/icons/html.svg";
import JavascriptIcon from "@/shared/icons/javascript.svg";
import NestJsIcon from "@/shared/icons/nestjs.svg";
import NextJsIcon from "@/shared/icons/next.svg";
import ReactIcon from "@/shared/icons/react.svg";
import TailwindIcon from "@/shared/icons/tailwind.svg";
import TypescriptIcon from "@/shared/icons/typescript.svg";
import { Badge } from "../components/ui/badge";
import { cn } from "../lib/utils";

export type SkillName =
  | "react"
  | "next"
  | "nest"
  | "typescript"
  | "javascript"
  | "tailwind"
  | "html"
  | "css"
  | "git"
  | "github";

const skillIconMap = {
  react: ReactIcon,
  next: NextJsIcon,
  nest: NestJsIcon,
  typescript: TypescriptIcon,
  javascript: JavascriptIcon,
  tailwind: TailwindIcon,
  html: HtmlIcon,
  css: CssIcon,
  git: GitIcon,
  github: GithubIcon,
};

type SkillIconProps = {
  name: SkillName;
  size?: "sm" | "md" | "lg";
  className?: string;
};

export const SkillIcon = ({ name, size = "md", className }: SkillIconProps) => {
  const Icon = skillIconMap[name];
  const sizeClass =
    size === "sm" ? "size-4" : size === "md" ? "size-5" : "size-6";

  if (!Icon) {
    return (
      <Badge
        variant="outline"
        className={cn("text-[10px] font-semibold py-0 px-1", className)}
      >
        {name}
      </Badge>
    );
  }

  return <Icon className={cn(sizeClass, className)} />;
};

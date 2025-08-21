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
import { cn } from "../lib/utils";

export type SkillName =
  | "react"
  | "nextjs"
  | "nestjs"
  | "typescript"
  | "javascript"
  | "tailwind"
  | "html"
  | "css"
  | "git"
  | "github";

const skillIconMap: Record<
  SkillName,
  React.FC<React.SVGProps<SVGSVGElement>>
> = {
  react: ReactIcon,
  nextjs: NextJsIcon,
  nestjs: NestJsIcon,
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
  fallbackLength?: number;
  className?: string;
};

export const SkillIcon = ({
  name,
  size = "md",
  className,
  fallbackLength,
}: SkillIconProps) => {
  const Icon = skillIconMap[name];
  const sizeClass =
    size === "sm" ? "size-4" : size === "md" ? "size-5" : "size-6";

  if (!Icon) {
    return (
      <div
        className={cn(
          "font-semibold flex items-center justify-center",
          className,
        )}
      >
        {name.slice(0, fallbackLength)}
      </div>
    );
  }

  return <Icon className={cn(sizeClass, className)} />;
};

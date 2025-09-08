import GitIcon from "@/shared/icons/git.svg";
import HTMLIcon from "@/shared/icons/html.svg";
import JavaScriptIcon from "@/shared/icons/javascript.svg";
import JSPIcon from "@/shared/icons/jsp.svg";
import ReactIcon from "@/shared/icons/react.svg";
import RustIcon from "@/shared/icons/rust.svg";
import TypeScriptIcon from "@/shared/icons/typescript.svg";
import { cn } from "@/shared/lib/utils";

export type CategoryName =
  | "TypeScript"
  | "Rust"
  | "JavaScript"
  | "React.js"
  | "JSP"
  | "Git"
  | "HTML";

type CategoryIconComponent = React.ComponentType<React.SVGProps<SVGSVGElement>>;

type CategoryIconProps = {
  categoryName: CategoryName;
  className?: string;
  size?: number | string;
};

const categoryIcons: Record<CategoryName, CategoryIconComponent> = {
  Rust: RustIcon,
  TypeScript: TypeScriptIcon,
  JavaScript: JavaScriptIcon,
  "React.js": ReactIcon,
  JSP: JSPIcon,
  Git: GitIcon,
  HTML: HTMLIcon,
};

const customClassName: Record<CategoryName, string> = {
  Rust: "rounded-full bg-white",
  TypeScript: "",
  JavaScript: "",
  "React.js": "",
  JSP: "bg-white",
  Git: "",
  HTML: "",
};

export const CategoryIcon = ({
  categoryName,
  className,
  size,
}: CategoryIconProps) => {
  const Component = categoryIcons[categoryName];
  return (
    <div className={cn(customClassName[categoryName], className)}>
      <Component width={size} height={size} />
    </div>
  );
};

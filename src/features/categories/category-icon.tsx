import JavaScriptIcon from "@/shared/icons/javascript.svg";
import ReactIcon from "@/shared/icons/react.svg";
import RustIcon from "@/shared/icons/rust.svg";
import TypeScriptIcon from "@/shared/icons/typescript.svg";
import { cn } from "@/shared/lib/utils";

export type CategoryName = "TypeScript" | "Rust" | "JavaScript" | "React.js";

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
};

const customClassName: Record<CategoryName, string> = {
  Rust: "rounded-full bg-white",
  TypeScript: "",
  JavaScript: "",
  "React.js": "",
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

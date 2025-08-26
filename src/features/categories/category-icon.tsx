import RustIcon from "@/shared/icons/rust.svg";

export type CategoryName = "Rust";

type CategoryIconComponent = React.ComponentType<React.SVGProps<SVGSVGElement>>;

type CategoryIconProps = {
  categoryName: CategoryName;
  className?: string;
  size?: number;
};

const categoryIcons: Record<CategoryName, CategoryIconComponent> = {
  Rust: RustIcon,
};

const customClassName: Record<CategoryName, string> = {
  Rust: "rounded-full bg-white",
};

export const CategoryIcon = ({
  categoryName,
  className,
  size,
}: CategoryIconProps) => {
  const Component = categoryIcons[categoryName];
  return (
    <div className={customClassName[categoryName]}>
      <Component className={className} width={size} height={size} />
    </div>
  );
};

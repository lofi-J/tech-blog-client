import { cn } from "../lib/utils";

type DividerProps = {
  direction: "horizontal" | "vertical";
  size: "sm" | "md" | "lg";
  className?: string;
  color?: "foreground" | "muted" | "secondary" | "primary";
};

export const Divider = ({
  size,
  direction,
  className,
  color = "foreground",
}: DividerProps) => {
  // 크기별 Tailwind 클래스
  const sizeClasses = {
    sm: direction === "horizontal" ? "h-px" : "w-px",
    md: direction === "horizontal" ? "h-0.5" : "w-0.5",
    lg: direction === "horizontal" ? "h-1" : "w-1",
  };

  // 방향별 기본 클래스
  const directionClasses = {
    horizontal: "flex flex-row min-w-px self-stretch",
    vertical: "flex flex-col min-h-px self-stretch",
  };

  // 색상별 클래스
  const colorClasses = {
    foreground: "bg-foreground",
    muted: "bg-muted",
    secondary: "bg-secondary",
    primary: "bg-primary",
  };

  return (
    <div
      className={cn(directionClasses[direction], sizeClasses[size], className)}
    >
      <div className={cn("h-full w-full rounded-sm", colorClasses[color])} />
    </div>
  );
};

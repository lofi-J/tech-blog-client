import { CSSProperties } from "react";
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
  const sizeMap = {
    sm: "1px",
    md: "2.5px",
    lg: "4px",
  };

  const horizontalStyle: CSSProperties = {
    display: "flex",
    flexDirection: "row",
    minWidth: "1px",
    height: sizeMap[size],
    alignSelf: "stretch",
  };

  const verticalStyle: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    width: sizeMap[size],
    minHeight: "1px",
    alignSelf: "stretch",
  };

  return (
    <div
      className={className}
      style={direction === "horizontal" ? horizontalStyle : verticalStyle}
    >
      <div
        className={cn(
          "h-full w-full rounded-sm",
          color === "foreground" && "bg-foreground",
          color === "muted" && "bg-muted",
          color === "secondary" && "bg-secondary",
          color === "primary" && "bg-primary"
        )}
      />
    </div>
  );
};

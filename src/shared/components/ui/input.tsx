import * as React from "react";

import { cn } from "@/shared/lib/utils";

function Input({
  className,
  type,
  style,
  ...props
}: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      style={{
        // 강제로 자동완성 스타일 제거
        WebkitBoxShadow: "0 0 0 1000px hsl(var(--background)) inset",
        WebkitTextFillColor: "hsl(var(--foreground))",
        transition: "background-color 5000s ease-in-out 0s",
        ...style,
      }}
      className={cn(
        "file:text-foreground placeholder:text-muted-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        "auto-complete-color", // utilities
        className
      )}
      {...props}
    />
  );
}

export { Input };

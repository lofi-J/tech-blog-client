import { cn } from "../lib/utils";

export const Kbd = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <kbd
      className={cn(
        "text-foreground bg-background border border-border rounded-[4px] px-1 text-[11px] text-center w-5 h-5 flex items-center justify-center",
        className,
      )}
    >
      {children}
    </kbd>
  );
};

import { cn } from "../lib/utils";

export const TypoLogo = ({ className }: { className?: string }) => {
  return (
    <div
      className={cn("flex items-center justify-center", className)}
      id="logo"
    >
      LOFI-J
    </div>
  );
};

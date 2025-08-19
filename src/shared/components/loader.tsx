import { cn } from "../lib/utils";

type LoaderSize = "sm" | "md" | "lg";

type LoaderProps = {
  size?: LoaderSize;
  className?: string;
};

export const Loader = ({ className }: LoaderProps) => {
  return (
    <div className={cn("loader", className)}>
      <div
        className="orbe"
        style={{ "--index": 0 } as React.CSSProperties}
      ></div>
      <div
        className="orbe"
        style={{ "--index": 1 } as React.CSSProperties}
      ></div>
      <div
        className="orbe"
        style={{ "--index": 2 } as React.CSSProperties}
      ></div>
      <div
        className="orbe"
        style={{ "--index": 3 } as React.CSSProperties}
      ></div>
      <div
        className="orbe"
        style={{ "--index": 4 } as React.CSSProperties}
      ></div>
    </div>
  );
};

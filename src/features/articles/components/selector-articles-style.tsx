import { PostDisplayStyle } from "@/app/articles/page";
import { cn } from "@/shared/lib/utils";
import { LayoutGridIcon, LayoutListIcon, Table2Icon } from "lucide-react";

type SelectorArticlesStyleProps = {
  selectedArticlesStyle: PostDisplayStyle;
  setSelectedArticlesStyle: (style: PostDisplayStyle) => void;
  className?: string;
};

export const SelectorArticlesStyle = ({
  selectedArticlesStyle,
  setSelectedArticlesStyle,
  className,
}: SelectorArticlesStyleProps) => {
  const handleClick = (style: PostDisplayStyle) => {
    setSelectedArticlesStyle(style);
  };

  return (
    <div
      className={cn(
        "flex items-center h-9 rounded-2xl border border-input overflow-hidden",
        className
      )}
    >
      <button
        className={cn(
          "text-muted-foreground px-3 hover:bg-muted py-2",
          selectedArticlesStyle === "table" &&
            "bg-input text-foreground hover:bg-input"
        )}
        onClick={() => handleClick("table")}
      >
        <Table2Icon className="w-5 h-5" />
      </button>
      <button
        className={cn(
          "text-muted-foreground px-3 py-2 hover:bg-muted hover:text-foreground",
          selectedArticlesStyle === "grid" &&
            "bg-input text-foreground hover:bg-input"
        )}
        onClick={() => handleClick("grid")}
      >
        <LayoutGridIcon className="w-5 h-5" />
      </button>
      <button
        className={cn(
          "text-muted-foreground px-3 py-2 hover:bg-muted hover:text-foreground",
          selectedArticlesStyle === "list" &&
            "bg-input text-foreground hover:bg-input"
        )}
        onClick={() => handleClick("list")}
      >
        <LayoutListIcon className="w-5 h-5" />
      </button>
    </div>
  );
};

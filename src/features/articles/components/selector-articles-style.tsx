import { ArticleDisplayStyle } from "@/app/articles/page";
import { LocalStorageKeys } from "@/shared/config/local-storage";
import { cn } from "@/shared/lib/utils";
import { LayoutGridIcon, LayoutListIcon, Table2Icon } from "lucide-react";

type SelectorArticlesStyleProps = {
  selectedDisplayStyle: ArticleDisplayStyle;
  setSelectedDisplayStyle: (style: ArticleDisplayStyle) => void;
  className?: string;
};

export const SelectorArticlesStyle = ({
  selectedDisplayStyle,
  setSelectedDisplayStyle,
  className,
}: SelectorArticlesStyleProps) => {
  const handleClick = (style: ArticleDisplayStyle) => {
    localStorage.setItem(LocalStorageKeys.articlesDisplayStyle, style);
    setSelectedDisplayStyle(style);
  };

  return (
    <div
      className={cn(
        "flex items-center h-9 rounded-2xl border border-input overflow-hidden",
        className,
      )}
    >
      <button
        className={cn(
          "text-muted-foreground px-3 py-2 hover:bg-muted hover:text-foreground",
          selectedDisplayStyle === "grid" &&
            "bg-input text-foreground hover:bg-input",
        )}
        onClick={() => handleClick("grid")}
      >
        <LayoutGridIcon className="w-5 h-5" />
      </button>
      <button
        className={cn(
          "text-muted-foreground px-3 py-2 hover:bg-muted hover:text-foreground",
          selectedDisplayStyle === "list" &&
            "bg-input text-foreground hover:bg-input",
        )}
        onClick={() => handleClick("list")}
      >
        <LayoutListIcon className="w-5 h-5" />
      </button>
      <button
        className={cn(
          "text-muted-foreground px-3 hover:bg-muted py-2",
          selectedDisplayStyle === "table" &&
            "bg-input text-foreground hover:bg-input",
        )}
        onClick={() => handleClick("table")}
      >
        <Table2Icon className="w-5 h-5" />
      </button>
    </div>
  );
};

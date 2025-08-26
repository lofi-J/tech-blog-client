import {
  CategoryIcon,
  CategoryName,
} from "@/features/categories/category-icon";
import { formatDate } from "date-fns/format";
import { FuseResult } from "fuse.js";
import Link from "next/link";
import { Loader } from "../loader";
import { Badge } from "../ui/badge";

// 검색 인덱스 아이템 타입
type SearchIndexItem = {
  content: string;
  metadata: {
    title: string;
    category: string;
    slug: string;
    description: string;
    published: string;
    tags: string[];
  };
};

export type Index = SearchIndexItem[] | undefined;

// Fuse.js 검색 결과 타입 (fuse.search()가 반환하는 타입)
export type SearchResult = FuseResult<SearchIndexItem>;

type SearchResultItemProps = {
  result: SearchResult;
  closeModal: () => void;
  loading: boolean;
};

export const SearchArticleResultItem = ({
  result,
  closeModal,
  loading,
}: SearchResultItemProps) => {
  const { item } = result;
  const { title, slug, description, published, tags, category } = item.metadata;

  if (loading) {
    return (
      <div className="w-full flex items-center justify-center self-center mt-10">
        <Loader />
      </div>
    );
  }

  const tagList = tags.slice(0, Math.min(tags.length, 3));

  return (
    <Link
      href={`/articles/${slug}`}
      onClick={closeModal}
      className="p-3 hover:bg-muted/50 rounded-md cursor-pointer border border-border/50 hover:border-border transition-colors"
    >
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <h3 className="font-medium rts-14 line-clamp-1">{title}</h3>
          <CategoryIcon categoryName={category as CategoryName} size={20} />
        </div>
        <p className="rts-12 text-muted-foreground line-clamp-2">
          {description}
        </p>
        <div className="flex items-center justify-between">
          <div className="flex gap-1 items-center justify-start">
            {tagList.map((tag, index) => (
              <Badge
                key={`${tag}-${index}`}
                variant="outline"
                className="rts-11"
              >
                {tag}
              </Badge>
            ))}
          </div>
          <span className="rts-12 text-muted-foreground">
            {formatDate(new Date(published), "yyyy.MM.dd")}
          </span>
        </div>
      </div>
    </Link>
  );
};

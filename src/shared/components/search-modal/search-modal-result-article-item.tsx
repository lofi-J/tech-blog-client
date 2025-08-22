import { SkillIcon, SkillName } from "@/shared/icons/skill-icon";
import { FuseResult } from "fuse.js";
import Link from "next/link";
import { Loader } from "../loader";

// 검색 인덱스 아이템 타입
type SearchIndexItem = {
  title: string;
  slug: string;
  description: string;
  date: string;
  tags: string[];
  content: string;
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
  const { title, slug, description, date, tags } = item;

  if (loading) {
    return <Loader />;
  }

  return (
    <Link
      href={`/articles/${slug}`}
      onClick={closeModal}
      className="p-3 hover:bg-muted/50 rounded-md cursor-pointer border border-border/50 hover:border-border transition-colors"
    >
      <div className="flex flex-col gap-2">
        <h3 className="font-medium text-sm line-clamp-1">{title}</h3>
        <p className="text-xs text-muted-foreground line-clamp-2">
          {description}
        </p>
        <div className="flex items-center justify-between">
          <div className="flex gap-1 items-center justify-start">
            {tags.slice(0, 3).map((tag: string, index: number) => (
              <SkillIcon
                key={`skill-avatar-${index}`}
                name={tag as SkillName}
                size="sm"
              />
            ))}
          </div>
          <span className="text-xs text-muted-foreground">{date}</span>
        </div>
      </div>
    </Link>
  );
};

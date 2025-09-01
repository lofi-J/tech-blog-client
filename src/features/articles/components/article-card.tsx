import {
  CategoryIcon,
  CategoryName,
} from "@/features/categories/category-icon";
import { Post } from "@/generated/graphql";
import { Badge } from "@/shared/components/ui/badge";
import { cn } from "@/shared/lib/utils";
import { formatCategoryLink } from "@/shared/lib/utils/format-link";
import { formatDate } from "date-fns";
import Image from "next/image";
import Link from "next/link";

type ArticleCardProps = {
  post: Post;
  maxLine?: 1 | 2 | 3 | 4 | 5 | 6;
  className?: string;
};

export const LINE_CLAMP_MAP = {
  1: "line-clamp-1",
  2: "line-clamp-2",
  3: "line-clamp-3",
  4: "line-clamp-4",
  5: "line-clamp-5",
  6: "line-clamp-6",
};

export const ArticleCard = ({ post, maxLine, className }: ArticleCardProps) => {
  const { title, published, category, thumbnail, description, tags } = post;

  return (
    <div className="w-full">
      <article
        className={cn("flex flex-col rounded-md shadow-md bg-card", className)}
      >
        {thumbnail && (
          <Image
            src={thumbnail}
            alt={title}
            width={300}
            height={160}
            className="w-full h-auto object-cover rounded-t-md aspect-video"
            priority
          />
        )}

        <div className="flex flex-col p-4">
          <Link
            href={`/articles/${formatCategoryLink(post.category)}/${post.slug}`}
            className="text-rts-15 font-bold hover:text-highlight transition-all duration-300"
          >
            <h3 className="line-clamp-1">{title}</h3>
          </Link>
          <Link
            href={`/articles/${formatCategoryLink(post.category)}/${post.slug}`}
          >
            <p className={cn("rts-13 mt-2", `${LINE_CLAMP_MAP[maxLine || 3]}`)}>
              {description}
            </p>
          </Link>

          <div className="flex items-center gap-2 mt-2">
            {tags?.slice(0, Math.min(tags.length, 2)).map((tag) => (
              <Badge
                key={tag.id}
                variant="outline"
                className="rts-11 max-w-20 line-clamp-1 truncate"
              >
                {tag.tag_name}
              </Badge>
            ))}
          </div>

          <div className="mt-2 flex items-center justify-between">
            <CategoryIcon categoryName={category as CategoryName} size={24} />
            <p className="rts-12 text-muted-foreground">
              {formatDate(new Date(published), "yyyy.MM.dd")}
            </p>
          </div>
        </div>
      </article>
    </div>
  );
};

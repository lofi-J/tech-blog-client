import {
  CategoryIcon,
  CategoryName,
} from "@/features/categories/category-icon";
import { Post } from "@/generated/graphql";
import { cn } from "@/shared/lib/utils";
import { formatDate } from "date-fns";
import Image from "next/image";

type ArticleCardProps = {
  post: Post;
  maxLine?: 1 | 2 | 3 | 4 | 5 | 6;
  className?: string;
};

export const ArticleCard = async ({
  post,
  maxLine,
  className,
}: ArticleCardProps) => {
  const { title, published, category, thumbnail, description } = post;

  return (
    <article
      className={cn("flex flex-col rounded-md shadow-card bg-card", className)}
    >
      {thumbnail && (
        <Image
          src={thumbnail}
          alt={title}
          width={300}
          height={160}
          className="w-full h-auto object-cover rounded-t-md"
        />
      )}

      <div className="flex flex-col p-4">
        <h3 className="text-rts-14 font-bold">{title}</h3>
        <p className={cn("rts-12 mt-2 min-h-[70px]", `line-clamp-${maxLine}`)}>
          {description}
        </p>

        <div className="mt-2 flex items-center justify-between">
          <CategoryIcon categoryName={category as CategoryName} size={24} />
          <p className="text-sm text-gray-500">
            {formatDate(new Date(published), "yyyy.MM.dd")}
          </p>
        </div>
      </div>
    </article>
  );
};

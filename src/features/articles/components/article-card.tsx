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

  console.log(category); // category icon component 추가

  return (
    <article className={cn("w-full min-h-[380px]", className)}>
      <h3 className="text-rts-14 font-bold">{title}</h3>

      {thumbnail && (
        <div className="mt-2">
          <Image
            src={thumbnail}
            alt={title}
            width={300}
            height={160}
            className="w-full h-auto object-cover"
          />
        </div>
      )}

      <p className={cn(`rts-12`, `line-clamp-${maxLine}`)}>{description}</p>

      <div className="mt-4 flex items-center justify-between">
        <p className="text-sm text-gray-500">
          {formatDate(new Date(published), "yyyy.MM.dd")}
        </p>
      </div>
    </article>
  );
};

import { Post } from "@/generated/graphql";
import { formatCategoryLink } from "@/shared/lib/utils/format-link";
import { formatDate } from "date-fns";
import Image from "next/image";
import Link from "next/link";

type ArticleListCardProps = {
  post: Post;
};

export const ArticleListCard = ({ post }: ArticleListCardProps) => {
  const { slug, title, published, thumbnail, description } = post;

  return (
    <Link
      href={`/articles/${formatCategoryLink(post.category)}/${slug}`}
      className="flex items-center gap-5 md:gap-10 lg:gap-13 hover:text-highlight"
    >
      <div className="f-col">
        <div className="flex items-center justify-between gap-10">
          <h3 className="rts-18 font-bold mb-2 line-clamp-1">{title}</h3>
          <span className="text-xs text-muted-foreground">
            {formatDate(new Date(published), "yyyy.MM.dd")}
          </span>
        </div>
        <p className="rts-14 line-clamp-2">{description}</p>
      </div>

      {/* Thumbnail Image */}
      <div className="max-w-[160px]">
        {thumbnail && (
          <Image
            src={thumbnail}
            alt={title}
            width={160}
            height={107}
            className="h-auto w-auto rounded-sm object-cover aspect-video"
            priority
          />
        )}
      </div>
    </Link>
  );
};

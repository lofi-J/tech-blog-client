import { Post } from "@/generated/graphql";
import { formatDate } from "date-fns";
import Image from "next/image";

type ArticleListCardProps = {
  post: Post;
};

export const ArticleListCard = ({ post }: ArticleListCardProps) => {
  const { title, published, thumbnail, description } = post;

  return (
    <div className="flex items-center gap-5 md:gap-10 lg:gap-13">
      <div className="f-col">
        <div className="flex items-center justify-between">
          <h3 className="rts-18 font-bold mb-2">{title}</h3>
          <span className="text-xs text-muted-foreground">
            {formatDate(new Date(published), "yyyy.MM.dd")}
          </span>
        </div>
        <p className="rts-14 line-clamp-3">{description}</p>
      </div>

      {/* Thumbnail Image */}
      {thumbnail && (
        <Image
          src={thumbnail}
          alt={title}
          width={160}
          height={107}
          className="min-w-[160px] h-auto rounded-sm object-contain"
        />
      )}
    </div>
  );
};

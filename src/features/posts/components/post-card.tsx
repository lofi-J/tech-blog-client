import { Post } from "@/generated/graphql";
import { SkillAvatar } from "@/shared/components/skill-avatar";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { formatDate } from "@/shared/lib/utils/date-fns";
import Link from "next/link";

type PostCardProps = {
  post: Post;
};

export const PostCard = ({ post }: PostCardProps) => {
  const { slug, title, published, updated_at, tags, stats } = post;

  const firstTag = (tags && tags[0]?.tag_name) ?? "";

  return (
    <Card className="post-card bg-background">
      <CardHeader className="flex flex-col gap-2">
        <div className="flex w-full justify-between items-center">
          <span>{formatDate(published, "yyyy-MM-dd")}</span>
          <SkillAvatar skillName={firstTag} sizeClass="size-6" />
        </div>
        <Link href={`/posts/article/${slug}`} className="hover:underline">
          <CardTitle className="text-2xl font-bold">{title}</CardTitle>
        </Link>
      </CardHeader>
      <CardContent>
        <p>{published}</p>
        <p>{updated_at}</p>
      </CardContent>
    </Card>
  );
};

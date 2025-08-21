"use client";

import { Post } from "@/generated/graphql";
import { Button } from "@/shared/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { Skeleton } from "@/shared/components/ui/skeleton";
import { usePostContent } from "@/shared/hooks/use-post-content";
import { SkillIcon, SkillName } from "@/shared/icons/skill-icon";
import { formatDate } from "@/shared/lib/utils/date-fns";
import Link from "next/link";

type ClientPostCardProps = {
  post: Post;
  maxContentLine?: number;
};

export const ClientPostCard = ({
  post,
  maxContentLine = 8,
}: ClientPostCardProps) => {
  const { slug, title, published, tags, updated_at } = post;
  const firstTag = (tags && tags[0]?.tag_name) ?? "";
  const formattedDate = formatDate(updated_at ?? published, "yyyy-MM-dd");

  const {
    data,
    loading: contentLoading,
    error: contentError,
  } = usePostContent(slug);

  // MDX 내용 처리
  const processedContent = data?.content
    ? data.content
        .replace(/#+\s/g, "")
        .split("\n")
        .slice(2, maxContentLine)
        .join("\n")
    : "";

  // 클라이언트 카드에서는 미리보기만 렌더 → MDX 실행 제거로 단순화
  const loading = contentLoading;
  const error = contentError;

  if (loading) {
    return <Skeleton className="w-full h-[200px]" />;
  }

  if (error) {
    console.error(error);
    return (
      <Card className="bg-background w-full">
        <CardContent>
          <Skeleton className="w-full h-[250px]" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="flex flex-col justify-between bg-background w-full h-[250px] py-4">
      <CardHeader className="flex flex-col gap-2">
        <div className="flex w-full justify-between items-center">
          <span className="text-sm text-muted-foreground">{formattedDate}</span>
          <SkillIcon name={firstTag as SkillName} size="lg" />
        </div>
        <Link href={`/articles/${slug}`} className="hover:underline">
          <CardTitle>{title}</CardTitle>
        </Link>
      </CardHeader>
      <CardContent>
        <div className="prose prose-sm max-w-none">
          <div className="text-muted-foreground text-sm">
            {processedContent && (
              <p className="mt-2">
                {processedContent.substring(0, 100)}
                {processedContent.length > 100 ? "..." : ""}
              </p>
            )}
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" size="sm" className="w-full">
          <Link
            href={`/articles/${slug}`}
            className="text-sm text-muted-foreground"
          >
            Read More
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

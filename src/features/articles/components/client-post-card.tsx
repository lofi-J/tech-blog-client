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
import { SkillIcon, SkillName } from "@/shared/icons/skill-icon";
import { formatDate } from "@/shared/lib/utils/date-fns";
import Link from "next/link";

type ClientPostCardProps = {
  post: Post;
};

export const ClientPostCard = ({ post }: ClientPostCardProps) => {
  const { slug, title, published, tags, updated_at, description } = post;
  const firstTag = (tags && tags[0]?.tag_name) ?? "";
  const formattedDate = formatDate(updated_at ?? published, "yyyy-MM-dd");

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
      <div className="flex flex-col justify-between flex-1">
        <CardContent>
          <div className="prose prose-sm max-w-none">
            <p className="text-muted-foreground text-sm">{description}</p>
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
      </div>
    </Card>
  );
};

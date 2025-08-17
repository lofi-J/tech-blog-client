import { getPostBySlug } from "@/core-lib/mdx";
import { Post } from "@/generated/graphql";
import { getPreviewMDXComponents } from "@/mdx-components";
import { SkillAvatar } from "@/shared/components/skill-avatar";
import { Button } from "@/shared/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { formatDate } from "@/shared/lib/utils/date-fns";
import { compile, run } from "@mdx-js/mdx";
import Link from "next/link";
import * as runtime from "react/jsx-runtime";

type PostCardProps = {
  post: Post;
  maxContentLine?: number;
};

export const PostCard = async ({ post, maxContentLine = 8 }: PostCardProps) => {
  const { slug, title, published, updated_at, tags, stats } = post;

  const firstTag = (tags && tags[0]?.tag_name) ?? "";

  const { content } = getPostBySlug(slug);
  const components = getPreviewMDXComponents();

  // # heading 제거
  const formattedContent = content.replace(/#+\s/g, "");

  // 2~10 줄까지만 렌더
  const lines = formattedContent.split("\n");
  const restContent = lines.slice(2, maxContentLine).join("\n");

  const compiled = await compile(restContent, {
    outputFormat: "function-body",
    development: false,
  });
  const { default: Content } = await run(compiled, runtime);

  return (
    <Card className="post-card bg-background">
      <CardHeader className="flex flex-col gap-2">
        <div className="flex w-full justify-between items-center">
          <span className="text-sm text-muted-foreground">
            {formatDate(published, "yyyy-MM-dd")}
          </span>
          <SkillAvatar skillName={firstTag} sizeClass="size-6" />
        </div>
        <Link href={`/posts/article/${slug}`} className="hover:underline">
          <CardTitle>{title}</CardTitle>
        </Link>
      </CardHeader>
      <CardContent>
        <div className="prose prose-sm max-w-none">
          <Content components={components} />
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" size="sm" className="w-full">
          <Link
            href={`/posts/article/${slug}`}
            className="text-sm text-muted-foreground"
          >
            Read More
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

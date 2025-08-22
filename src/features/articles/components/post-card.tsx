import { getPostBySlug } from "@/core-lib/mdx";
import { Post } from "@/generated/graphql";
import { getPreviewMDXComponents } from "@/mdx-components";
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
import { compile, run } from "@mdx-js/mdx";
import Link from "next/link";
import * as runtime from "react/jsx-runtime";

type PostCardProps = {
  post: Post;
  maxContentLine?: number;
};

// SSR로 렌더링할 때 사용
export const PostCard = async ({ post, maxContentLine = 8 }: PostCardProps) => {
  const { slug, title, published, tags } = post;

  const firstTag = (tags && tags[0]?.tag_name) ?? "";

  const { content } = getPostBySlug(slug);
  const components = getPreviewMDXComponents();

  // # heading 제거
  const formattedContent = content.replace(/#+\s/g, "");

  // 2 ~ maxContentLine 줄까지만 렌더
  const lines = formattedContent.split("\n");
  const restContent = lines.slice(2, maxContentLine).join("\n");

  const compiled = await compile(restContent, {
    outputFormat: "function-body",
    development: false,
  });
  const { default: Content } = await run(compiled, runtime);

  return (
    <Card className="bg-background w-full">
      <CardHeader className="flex flex-col gap-2">
        <div className="flex w-full justify-between items-center">
          <span className="text-sm text-muted-foreground">
            {formatDate(published, "yyyy-MM-dd")}
          </span>
          <SkillIcon name={firstTag as SkillName} size="lg" />
        </div>
        <Link href={`/articles/${slug}`} className="hover:underline">
          <CardTitle>{title}</CardTitle>
        </Link>
      </CardHeader>
      <div className="flex flex-col flex-1 justify-between">
        <CardContent>
          <div className="prose prose-sm max-w-none">
            <Content components={components} />
          </div>
        </CardContent>
        <CardFooter className="md:mt-4 mt-3">
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

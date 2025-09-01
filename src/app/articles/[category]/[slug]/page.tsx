import {
  CategoryIcon,
  CategoryName,
} from "@/features/categories/category-icon";
import { IncreasePostViewsDocument } from "@/generated/graphql";
import { getMDXComponents } from "@/mdx-components";
import { getAllPostSlugs, getPostBySlug } from "@/mdx/mdx";
import { rehypeCodeFilename } from "@/plugins/rehype-code-filename";
import { Badge } from "@/shared/components/ui/badge";
import { createServerApolloClient } from "@/shared/lib/api/create-apollo-client";
import {
  ensureClassName,
  ensureProperties,
} from "@/shared/lib/utils/type-safe";
import { RehypeNode, RehypePrettyCodeOptions } from "@/types/rehype";
import { compile, run } from "@mdx-js/mdx";
import { formatDate } from "date-fns";
import { Metadata } from "next";
import { headers } from "next/headers";
import Image from "next/image";
import { notFound } from "next/navigation";
import * as runtime from "react/jsx-runtime";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";

interface PageProps {
  params: Promise<{
    category: string;
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const slugs = getAllPostSlugs();
  return slugs.map((slug) => {
    const [category, ...slugParts] = slug.split("/");
    return {
      category,
      slug: slugParts.join("/"),
    };
  });
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  try {
    const { category, slug } = await params;
    const fullSlug = `${category}/${slug}`;
    const post = getPostBySlug(fullSlug);

    return {
      title: `${post.metadata.category} | ${post.metadata.title} - Lofi-J`,
      description: post.metadata.description,
      openGraph: {
        title: post.metadata.title,
        description: post.metadata.description,
        type: "article",
        publishedTime: post.metadata.published,
        tags: post.metadata.tags,
      },
      twitter: {
        card: "summary_large_image",
        title: post.metadata.title,
        description: post.metadata.description,
      },
    };
  } catch {
    return {
      title: "Page Not Found",
      description: "The requested page could not be found.",
    };
  }
}

export default async function ArticlePage({ params }: PageProps) {
  const { category, slug } = await params;

  let post;
  try {
    post = getPostBySlug(`${category}/${slug}`);
  } catch {
    notFound();
  }

  try {
    const headerList = await headers();
    const client = createServerApolloClient(headerList.get("cookie") || "");
    client.mutate({
      mutation: IncreasePostViewsDocument,
      variables: { slug },
    });
  } catch {
    console.error("Failed to create Apollo client");
  }

  const components = getMDXComponents();

  // Compile and run MDX (@mdx-js/mdx)
  const compiled = await compile(post.content, {
    outputFormat: "function-body",
    development: false,
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      rehypeSlug, // 헤딩에 ID 추가
      rehypeAutolinkHeadings, // 헤딩에 자동 링크 추가
      [
        rehypePrettyCode,
        {
          keepBackground: false, // CSS 변수 배경색 사용
          defaultLang: "javascript",
          // 모든 코드 블록에 일관된 하이라이팅 적용
          onVisitLine(node: RehypeNode) {
            // 빈 줄은 번호 표시 안함
            if (node.children && node.children.length === 0) {
              node.children = [{ type: "text", value: " " } as RehypeNode];
            }
          },
          onVisitHighlightedLine(node: RehypeNode) {
            // 하이라이트된 라인 스타일링
            const properties = ensureProperties(node);
            const className = ensureClassName(properties);
            className.push("highlighted");
          },
        } satisfies RehypePrettyCodeOptions,
      ],
      rehypeCodeFilename, // rehypePrettyCode 후에 실행
    ],
  });
  const { default: Content } = await run(compiled, runtime);

  const {
    title,
    category: postCategory,
    published,
    tags,
    thumbnail,
  } = post.metadata;

  return (
    <article id="article-content" className="w-full">
      <header className="mb-8">
        <h1 className="rts-h1 font-bold mb-8">{title}</h1>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <span className="rts-14 font-semibold">Lofi-J</span>
            <span className="w-[3px] h-[3px] bg-foreground rounded-full" />
            <time className="rts-14">
              {formatDate(new Date(published), "yyyy-MM-dd")}
            </time>
          </div>
          <div>
            <CategoryIcon
              categoryName={postCategory as CategoryName}
              size={24}
            />
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-3 mt-4">
          {tags?.map((tag, index) => (
            <Badge key={`${tag}-${index}`} variant="highlight">
              {tag}
            </Badge>
          ))}
        </div>
      </header>

      {/* Thumbnail */}
      {thumbnail && (
        <div className="flex items-center justify-center my-8">
          <Image
            src={thumbnail}
            alt={`${title} thumbnail`}
            width={600}
            height={350}
            priority
            className="w-[80%] h-auto aspect-auto rounded-md shadow-md mx-auto"
          />
        </div>
      )}

      <main className="prose-content">
        <Content components={components} />
      </main>
    </article>
  );
}

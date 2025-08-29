import {
  CategoryIcon,
  CategoryName,
} from "@/features/categories/category-icon";
import { getMDXComponents } from "@/mdx-components";
import { getAllPostSlugs, getPostBySlug } from "@/mdx/mdx";
import { Badge } from "@/shared/components/ui/badge";
import { compile, run } from "@mdx-js/mdx";
import { formatDate } from "date-fns";
import { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import * as runtime from "react/jsx-runtime";

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
  const fullSlug = `${category}/${slug}`;
  let post;

  try {
    post = getPostBySlug(fullSlug);
  } catch {
    notFound();
  }

  const components = getMDXComponents();

  // Compile and run MDX (@mdx-js/mdx)
  const compiled = await compile(post.content, {
    outputFormat: "function-body",
    development: false,
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

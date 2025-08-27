import { getMDXComponents } from "@/mdx-components";
import { getAllPostSlugs, getPostBySlug } from "@/mdx/mdx";
import { compile, run } from "@mdx-js/mdx";
import { formatDate } from "date-fns";
import { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import * as runtime from "react/jsx-runtime";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const slugs = getAllPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  try {
    const { slug } = await params;
    const post = getPostBySlug(slug);

    return {
      title: post.metadata.title,
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
  const { slug } = await params;
  let post;

  try {
    post = getPostBySlug(slug);
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

  const { title, category, published, tags, thumbnail } = post.metadata;

  return (
    <article className="prose prose-lg max-w-none">
      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-4">{title}</h1>
        <div className="flex items-center gap-1">
          <span className="rts-14 font-semibold">Lofi-J</span>
          <span className="w-[3px] h-[3px] bg-foreground rounded-full" />
          <time className="rts-14">
            {formatDate(new Date(published), "yyyy-MM-dd")}
          </time>
        </div>
      </header>

      {/* Thumbnail */}
      {thumbnail && (
        <div className="flex items-center justify-center my-8">
          <Image src={thumbnail} alt={title} width={600} height={350} />
        </div>
      )}

      <main className="prose-content">
        <Content components={components} />
      </main>
    </article>
  );
}

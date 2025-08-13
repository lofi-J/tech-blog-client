import { getAllPostSlugs, getPostBySlug } from "@/lib/mdx";
import { useMDXComponents } from "@/mdx-components";
import { compile, run } from "@mdx-js/mdx";
import { Metadata } from "next";
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
        publishedTime: post.metadata.date,
        tags: post.metadata.tags,
      },
      twitter: {
        card: "summary_large_image",
        title: post.metadata.title,
        description: post.metadata.description,
      },
    };
  } catch (error) {
    return {
      title: "Post Not Found",
      description: "The requested post could not be found.",
    };
  }
}

export default async function PostPage({ params }: PageProps) {
  const { slug } = await params;
  let post;

  try {
    post = getPostBySlug(slug);
  } catch (error) {
    notFound();
  }

  const components = useMDXComponents();

  // Compile and run MDX (@mdx-js/mdx)
  const compiled = await compile(post.content, {
    outputFormat: "function-body",
    development: false,
  });
  const { default: Content } = await run(compiled, runtime);

  return (
    <article className="prose prose-lg max-w-none">
      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-4">{post.metadata.title}</h1>
        <div className="flex flex-wrap gap-2 mb-4">
          {post.metadata.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
            >
              {tag}
            </span>
          ))}
        </div>
        <time className="text-gray-600 text-sm">
          {new Date(post.metadata.date).toLocaleDateString("ko-KR", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </time>
      </header>

      <div className="prose-content">
        <Content components={components} />
      </div>
    </article>
  );
}

import fs from "fs";
import matter from "gray-matter";
import path from "path";

const contentDirectory = path.join(process.cwd(), "src/content");

export interface PostMetadata {
  title: string;
  description: string;
  date: string;
  tags: string[];
}

export interface Post {
  slug: string;
  metadata: PostMetadata;
  content: string;
}

export function getAllPostSlugs(): string[] {
  const files = fs.readdirSync(contentDirectory);
  return files
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(".mdx", ""));
}

export function getPostBySlug(slug: string): Post {
  const filePath = path.join(contentDirectory, `${slug}.mdx`);

  if (!fs.existsSync(filePath)) {
    throw new Error(`Post not found: ${slug}`);
  }

  const fileContents = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(fileContents);

  return {
    slug,
    metadata: data as PostMetadata,
    content,
  };
}

export function getAllPosts(): Post[] {
  const slugs = getAllPostSlugs();
  return slugs
    .map((slug) => getPostBySlug(slug))
    .sort(
      (a, b) =>
        new Date(b.metadata.date).getTime() -
        new Date(a.metadata.date).getTime(),
    );
}

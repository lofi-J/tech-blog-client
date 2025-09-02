import fs from "fs";
import matter from "gray-matter";
import path from "path";

const contentDirectory = path.join(process.cwd(), "src/content");

export interface PostMetadata {
  title: string;
  description: string;
  category: string;
  tags?: string[];
  thumbnail: string | null;
  published: string;
}

export interface Post {
  slug: string;
  metadata: PostMetadata;
  content: string;
}

// 카테고리 폴더 내의 모든 MDX 파일을 재귀적으로 찾는 함수
function getAllMdxFiles(
  dir: string,
): Array<{ filePath: string; slug: string }> {
  const items = fs.readdirSync(dir, { withFileTypes: true });
  const mdxFiles: Array<{ filePath: string; slug: string }> = [];

  for (const item of items) {
    const fullPath = path.join(dir, item.name);

    if (item.isDirectory()) {
      // 디렉토리인 경우 재귀적으로 탐색
      mdxFiles.push(...getAllMdxFiles(fullPath));
    } else if (item.isFile() && item.name.endsWith(".mdx")) {
      // MDX 파일인 경우
      const relativePath = path.relative(contentDirectory, fullPath);
      const slug = relativePath.replace(/\.mdx$/, "");
      mdxFiles.push({ filePath: fullPath, slug });
    }
  }

  return mdxFiles;
}

export function getAllPostSlugs(): string[] {
  const mdxFiles = getAllMdxFiles(contentDirectory);
  return mdxFiles.map(({ slug }) => slug);
}

export function getPostBySlug(slug: string): Post {
  // slug에서 카테고리 경로를 포함한 전체 경로 생성
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
  const mdxFiles = getAllMdxFiles(contentDirectory);

  return mdxFiles
    .map(({ filePath, slug }) => {
      const fileContents = fs.readFileSync(filePath, "utf8");
      const { data, content } = matter(fileContents);

      return {
        slug,
        metadata: data as PostMetadata,
        content,
      };
    })
    .sort(
      (a, b) =>
        new Date(b.metadata.published).getTime() -
        new Date(a.metadata.published).getTime(),
    );
}

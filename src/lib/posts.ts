import fs from "fs";
import path from "path";

const postsDirectory = path.join(process.cwd(), "src/app/posts");

export interface PostData {
  slug: string;
  title: string;
  description?: string;
  date?: string;
  category?: string;
  tags?: string[];
}

function extractFrontmatter(content: string) {
  const frontmatterRegex = /^---\s*\n(.*?)\n---\s*\n/;
  const match = content.match(frontmatterRegex);

  if (!match) return {};

  const frontmatter = match[1];
  const metadata: any = {};

  frontmatter.split("\n").forEach((line) => {
    const colonIndex = line.indexOf(":");
    if (colonIndex > 0) {
      const key = line.substring(0, colonIndex).trim();
      let value = line.substring(colonIndex + 1).trim();

      // Remove quotes
      value = value.replace(/^["']|["']$/g, "");

      // Parse arrays
      if (value.startsWith("[") && value.endsWith("]")) {
        try {
          value = JSON.parse(value);
        } catch (e) {
          // Keep as string if parsing fails
        }
      }

      metadata[key] = value;
    }
  });

  return metadata;
}

function getAllMDXFiles(dir: string, basePath = ""): string[] {
  const files: string[] = [];

  if (!fs.existsSync(dir)) return files;

  const items = fs.readdirSync(dir);

  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      files.push(...getAllMDXFiles(fullPath, path.join(basePath, item)));
    } else if (item === "page.mdx") {
      files.push(basePath);
    }
  }

  return files.filter(Boolean);
}

export function getAllPosts(): PostData[] {
  const slugs = getAllMDXFiles(postsDirectory);

  const posts = slugs.map((slug) => {
    const fullPath = path.join(postsDirectory, slug, "page.mdx");
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const metadata = extractFrontmatter(fileContents);

    return {
      slug,
      title: metadata.title || slug.replace(/\//g, " "),
      description: metadata.description,
      date: metadata.date,
      category: metadata.category,
      tags: metadata.tags || [],
    };
  });

  // Sort by date (newest first)
  return posts.sort((a, b) => {
    if (a.date && b.date) {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    }
    return 0;
  });
}

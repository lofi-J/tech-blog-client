import { getAllPosts } from "@/lib/posts";
import Link from "next/link";

export default function PostsPage() {
  const posts = getAllPosts();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">블로그 포스트</h1>

      {posts.length === 0 ? (
        <p className="text-muted-foreground">아직 포스트가 없습니다.</p>
      ) : (
        <div className="grid gap-6">
          {posts.map((post) => (
            <article
              key={post.slug}
              className="border rounded-lg p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <Link href={`/posts/${post.slug}`} className="group">
                    <h2 className="text-2xl font-semibold mb-2 group-hover:text-blue-600 transition-colors">
                      {post.title}
                    </h2>
                  </Link>
                  {post.description && (
                    <p className="text-muted-foreground mb-3">
                      {post.description}
                    </p>
                  )}
                </div>
                {post.category && (
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                    {post.category}
                  </span>
                )}
              </div>

              <div className="flex items-center justify-between text-sm text-muted-foreground">
                {post.date && (
                  <time>{new Date(post.date).toLocaleDateString("ko-KR")}</time>
                )}
                {post.tags && post.tags.length > 0 && (
                  <div className="flex gap-2">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-gray-100 rounded text-xs"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}

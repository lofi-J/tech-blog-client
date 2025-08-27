import { ArticleCommentator } from "@/features/articles/components/article-commentator";
import { ArticleNavigator } from "@/features/articles/components/article-navigator";

export default function ArticleDetailLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative">
      {/* Commentator */}
      <div className="fixed left-0 top-1/2 -translate-y-1/2 bg-red-300">
        <div className="w-[300px] max-h-[600px]">
          <ArticleCommentator />
        </div>
      </div>

      {/* Article */}
      <div className="w-[768px] mx-auto">{children}</div>

      {/* Navigator */}
      <div className="fixed right-0 top-1/2 -translate-y-1/2 bg-blue-300">
        <div className="w-[300px] max-h-[600px]">
          <ArticleNavigator />
        </div>
      </div>
    </div>
  );
}

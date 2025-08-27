import { ArticleCommentator } from "@/features/articles/components/article-commentator";
import { ArticleNavigator } from "@/features/articles/components/article-navigator";

export default function ArticleDetailLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative grid grid-cols-1 2xl:grid-cols-[1fr_1fr_1fr] gap-10 justify-between min-w-screen">
      {/* Commentator */}
      <div className="relative h-full hidden 2xl:flex justify-center">
        <div className="max-h-[600px] w-[250px] sticky top-1/10">
          <ArticleCommentator />
        </div>
      </div>

      {/* Article */}
      <div className="2xl:max-w-[800px] lg:max-w-[650px] max-w-[600px] w-full mx-auto">
        {children}
      </div>

      {/* Navigator */}
      <div className="relative h-full hidden 2xl:flex justify-center">
        <div className="max-h-[600px] w-[250px] sticky top-1/10">
          <ArticleNavigator />
        </div>
      </div>
    </div>
  );
}

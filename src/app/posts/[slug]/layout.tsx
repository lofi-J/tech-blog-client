import { PostSidebar } from "@/features/posts/components/post-sidebar";

export default function PostDetailLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="container mx-auto">
      <PostSidebar title="사이드 바" />
      {children}
    </div>
  );
}

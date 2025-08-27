import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Introduction - Lofi-J Posts",
  description: "frontend developer lofi-J's Posts",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function PostsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="mx-auto px-4 py-8 flex-1 flex flex-col">{children}</div>
  );
}

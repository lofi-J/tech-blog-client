import { Metadata } from "next";

export const metadata: Metadata = {
  title: "React 기초",
  description: "React의 기본 개념과 컴포넌트 작성법을 배워봅니다",
};

export default function MetadataLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="container mx-auto">layout{children}</div>;
}

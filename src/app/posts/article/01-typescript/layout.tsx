import { Metadata } from "next";

export const metadata: Metadata = {
  title: "TypeScript 기초",
  description: "TypeScript의 기본 개념과 사용법을 알아봅니다",
};

export default function MetadataLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="container mx-auto">layout{children}</div>;
}

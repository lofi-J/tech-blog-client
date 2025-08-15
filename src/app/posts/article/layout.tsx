export default function ArticleLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between">
        <div>test1</div>
        <div>test2</div>
      </div>
      {children}
    </div>
  );
}

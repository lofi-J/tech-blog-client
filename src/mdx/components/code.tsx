"use client";

export const MdxCode = ({ children }: { children: React.ReactNode }) => {
  return (
    <code className="px-1 pt-0.5 pb-1 rounded-sm rts-14 font-jetbrains-mono mdx-bg color-force">
      {children}
    </code>
  );
};

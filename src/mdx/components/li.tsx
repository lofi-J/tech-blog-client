"use client";

export const MdxLi = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex items-start h-full">
      <div className="p-1 pt-0.5 h-full mt-1 mr-1">
        <Bullet />
      </div>
      <li className="mdx-text rts-14 list-none">{children}</li>
    </div>
  );
};

const Bullet = () => {
  return <div className="w-1 h-1 bg-foreground rounded-full" />;
};

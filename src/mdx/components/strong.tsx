"use client";

import { helpWordAtom } from "@/app/articles/[category]/[slug]/layout";
import { useSetAtom } from "jotai";

export const MdxStrong = ({ children }: { children: React.ReactNode }) => {
  const setHelpWord = useSetAtom(helpWordAtom);
  const onClick = () => setHelpWord(children as string);
  return (
    <strong
      className="font-bold mdx-text rts-14 text-highlight cursor-help"
      onClick={onClick}
    >
      {children}
    </strong>
  );
};

"use client";

import { helpWordAtom } from "@/features/articles/atoms/help-word-atom";
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

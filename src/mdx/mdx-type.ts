import { JSX } from "react";

export type MdxProps<T extends keyof JSX.IntrinsicElements> = {
  children: React.ReactNode;
  props: React.ComponentProps<T>;
};

// pre 요소 전용 타입
export type MdxPreProps = MdxProps<"pre"> & {
  "data-language"?: string;
  "data-filename"?: string;
};

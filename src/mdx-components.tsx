import { MDXComponents } from "mdx/types";
import Image, { ImageProps } from "next/image";
import { MdxCode } from "./mdx/components/code";
import { MdxLi } from "./mdx/components/li";
import { MdxPre } from "./mdx/components/pre";
import { MdxStrong } from "./mdx/components/strong";

const components: MDXComponents = {
  h1: ({ children }) => (
    <h1 className="rts-h1 font-bold mb-8 mdx-text">{children}</h1>
  ),
  h2: ({ children }) => (
    <h2 className="rts-h2 font-bold mb-4 mt-12 mdx-text">{children}</h2>
  ),
  h3: ({ children }) => (
    <h3 className="rts-h3 font-bold mb-3 mt-10 mdx-text">{children}</h3>
  ),
  h4: ({ children }) => (
    <h4 className="rts-h4 font-bold mb-2 mt-8 mdx-text">{children}</h4>
  ),
  p: ({ children }) => <p className="mb-4 mdx-text rts-14">{children}</p>,
  ul: ({ children }) => (
    <ul className="mb-4 list-disc list-inside space-y-2 mdx-text rts-14">
      {children}
    </ul>
  ),
  li: ({ children }) => <MdxLi>{children}</MdxLi>,
  strong: ({ children }) => <MdxStrong>{children}</MdxStrong>,
  code: ({ children }) => <MdxCode>{children}</MdxCode>,
  pre: ({ children, ...props }) => <MdxPre {...props}>{children}</MdxPre>,
  del: ({ children }) => (
    <del className="line-through text-muted-foreground mdx-text rts-14">
      {children}
    </del>
  ),
  Image: (props: ImageProps) => {
    return (
      <Image
        {...props}
        alt={props.alt ?? "unknown image"}
        className="w-full h-auto aspect-auto"
      />
    );
  },
};

// 서버 컴포넌트에서 사용할 함수
export function getMDXComponents(
  otherComponents?: MDXComponents
): MDXComponents {
  return {
    ...components,
    ...otherComponents,
  };
}

// 클라이언트 컴포넌트에서 사용하는 Hook
export function useMDXComponents(
  otherComponents?: MDXComponents
): MDXComponents {
  return getMDXComponents(otherComponents);
}

import { MDXComponents } from "mdx/types";
import Image, { ImageProps } from "next/image";
import { MdxPre } from "./mdx/components/pre";

const components: MDXComponents = {
  h1: ({ children }) => (
    <h1 className="rts-18 font-bold mb-6 mdx-text">{children}</h1>
  ),
  h2: ({ children }) => (
    <h2 className="rts-17 font-bold mb-4 mt-8 mdx-text">{children}</h2>
  ),
  h3: ({ children }) => (
    <h3 className="rts-16 font-bold mb-3 mt-6 mdx-text">{children}</h3>
  ),
  p: ({ children }) => <p className="mb-4 mdx-text rts-14">{children}</p>,
  ul: ({ children }) => (
    <ul className="mb-4 list-disc list-inside space-y-2 mdx-text rts-14">
      {children}
    </ul>
  ),
  li: ({ children }) => <li className="mdx-text rts-14">{children}</li>,
  strong: ({ children }) => (
    <strong className="font-bold mdx-text rts-14">{children}</strong>
  ),
  code: ({ children }) => (
    <code className="px-1 py-0.5 mdx-bg rounded-sm rts-14 font-jetbrains-mono mdx-code">
      {children}
    </code>
  ),
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
  otherComponents?: MDXComponents,
): MDXComponents {
  return {
    ...components,
    ...otherComponents,
  };
}

// 클라이언트 컴포넌트에서 사용하는 Hook
export function useMDXComponents(
  otherComponents?: MDXComponents,
): MDXComponents {
  return getMDXComponents(otherComponents);
}

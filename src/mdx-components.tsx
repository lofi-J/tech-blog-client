import { MDXComponents } from "mdx/types";
import Image, { ImageProps } from "next/image";

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
    <code className="px-1 py-0.5 mdx-bg rounded-sm rts-14 font-mono mdx-code">
      {children}
    </code>
  ),
  pre: ({ children }) => (
    <pre className="mb-4 p-4 rounded-lg overflow-x-auto mdx-text rts-14">
      {children}
    </pre>
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

const previewComponents: MDXComponents = {
  h1: ({ children }) => <h1 className="rts-16 font-bold mb-4">{children}</h1>,
  h2: ({ children }) => (
    <h2 className="rts-15 font-semibold mb-3">{children}</h2>
  ),
  h3: ({ children }) => (
    <h3 className="rts-14 font-semibold mb-3 text-gray-800">{children}</h3>
  ),
  p: ({ children }) => (
    <p className="mb-2 rts-14 leading-5 line-clamp-3">{children}</p>
  ),
  ul: ({ children }) => (
    <ul className="mb-4 list-disc list-inside space-y-2 rts-14 truncate">
      {children}
    </ul>
  ),
  li: ({ children }) => (
    <li className="leading-4 rts-12 truncate">{children}</li>
  ),
  strong: ({ children }) => (
    <strong className="font-semibold rts-12 leading-4">{children}</strong>
  ),
  code: ({ children }) => (
    <code className="px-1 py-0.5 bg-gray-100 rounded text-sm font-mono text-pink-600 rts-12">
      {children}
    </code>
  ),
  pre: ({ children }) => (
    <pre className="mb-4 p-2 bg-gray-900 rounded-lg overflow-x-auto rts-12">
      {children}
    </pre>
  ),
  Image: (props: ImageProps) => {
    return (
      <Image
        {...props}
        alt={props.alt ?? "unknown image"}
        className="w-full h-auto"
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

export function getPreviewMDXComponents(
  otherComponents?: MDXComponents,
): MDXComponents {
  return {
    ...previewComponents,
    ...otherComponents,
  };
}

// 클라이언트 컴포넌트에서 사용하는 Hook
export function useMDXComponents(
  otherComponents?: MDXComponents,
): MDXComponents {
  return getMDXComponents(otherComponents);
}

export function usePreviewMDXComponents(
  otherComponents?: MDXComponents,
): MDXComponents {
  return getPreviewMDXComponents(otherComponents);
}

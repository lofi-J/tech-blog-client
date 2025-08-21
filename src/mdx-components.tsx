import { MDXComponents } from "mdx/types";

const components: MDXComponents = {
  h1: ({ children }) => (
    <h1 className="text-3xl font-bold mb-6 mdx-text">{children}</h1>
  ),
  h2: ({ children }) => (
    <h2 className="text-2xl font-bold mb-4 mt-8 mdx-text">{children}</h2>
  ),
  h3: ({ children }) => (
    <h3 className="text-xl font-bold mb-3 mt-6 mdx-text">{children}</h3>
  ),
  p: ({ children }) => <p className="mb-4 mdx-text text-sm">{children}</p>,
  ul: ({ children }) => (
    <ul className="mb-4 list-disc list-inside space-y-2 mdx-text text-sm">
      {children}
    </ul>
  ),
  li: ({ children }) => <li className="mdx-text text-sm">{children}</li>,
  strong: ({ children }) => (
    <strong className="font-bold mdx-text text-sm">{children}</strong>
  ),
  code: ({ children }) => (
    <code className="px-1 py-0.5 mdx-bg rounded-sm text-sm font-mono mdx-code">
      {children}
    </code>
  ),
  pre: ({ children }) => (
    <pre className="mb-4 p-4 rounded-lg overflow-x-auto mdx-text text-sm">
      {children}
    </pre>
  ),
};

const previewComponents: MDXComponents = {
  h1: ({ children }) => (
    <h1 className="text-[16px] font-bold mb-4">{children}</h1>
  ),
  h2: ({ children }) => (
    <h2 className="text-[14px] font-semibold mb-3 mt-8">{children}</h2>
  ),
  h3: ({ children }) => (
    <h3 className="text-[12px] font-semibold mb-2 mt-6 text-gray-800">
      {children}
    </h3>
  ),
  p: ({ children }) => <p className="mb-2 leading-4 text-[12px]">{children}</p>,
  ul: ({ children }) => (
    <ul className="mb-4 list-disc list-inside space-y-2 text-[10px]">
      {children}
    </ul>
  ),
  li: ({ children }) => <li className="leading-4 text-[11px]">{children}</li>,
  strong: ({ children }) => (
    <strong className="font-semibold text-[11px]">{children}</strong>
  ),
  code: ({ children }) => (
    <code className="px-1 py-0.5 bg-gray-100 rounded text-sm font-mono text-pink-600 text-[10px]">
      {children}
    </code>
  ),
  pre: ({ children }) => (
    <pre className="mb-4 p-2 bg-gray-900 rounded-lg overflow-x-auto text-[10px]">
      {children}
    </pre>
  ),
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

export function getPreviewMDXComponents(
  otherComponents?: MDXComponents
): MDXComponents {
  return {
    ...previewComponents,
    ...otherComponents,
  };
}

// 클라이언트 컴포넌트에서 사용하는 Hook
export function useMDXComponents(
  otherComponents?: MDXComponents
): MDXComponents {
  return getMDXComponents(otherComponents);
}

export function usePreviewMDXComponents(
  otherComponents?: MDXComponents
): MDXComponents {
  return getPreviewMDXComponents(otherComponents);
}

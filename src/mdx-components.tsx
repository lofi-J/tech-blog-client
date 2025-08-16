import { MDXComponents } from "mdx/types";

const components: MDXComponents = {
  h1: ({ children }) => (
    <h1 className="text-4xl font-bold mb-6 text-gray-900">{children}</h1>
  ),
  h2: ({ children }) => (
    <h2 className="text-3xl font-semibold mb-4 mt-8 text-gray-800">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="text-2xl font-semibold mb-3 mt-6 text-gray-800">
      {children}
    </h3>
  ),
  p: ({ children }) => (
    <p className="mb-4 leading-7 text-gray-700">{children}</p>
  ),
  ul: ({ children }) => (
    <ul className="mb-4 list-disc list-inside space-y-2 text-gray-700">
      {children}
    </ul>
  ),
  li: ({ children }) => <li className="leading-6">{children}</li>,
  strong: ({ children }) => (
    <strong className="font-semibold text-gray-900">{children}</strong>
  ),
  code: ({ children }) => (
    <code className="px-2 py-1 bg-gray-100 rounded text-sm font-mono text-pink-600">
      {children}
    </code>
  ),
  pre: ({ children }) => (
    <pre className="mb-4 p-4 bg-gray-900 text-gray-100 rounded-lg overflow-x-auto">
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

// 클라이언트 컴포넌트에서 사용하는 Hook
export function useMDXComponents(
  otherComponents?: MDXComponents
): MDXComponents {
  return getMDXComponents(otherComponents);
}

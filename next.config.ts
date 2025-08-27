import createMDX from "@next/mdx";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // TurboPack 설정
  turbopack: {
    rules: {
      "*.svg": {
        loaders: ["@svgr/webpack"],
        as: "*.js",
      },
    },
  },
  // webpack 설정
  webpack: (config) => {
    // @ts-expect-error 타입 에러 무시
    const fileLoaderRule = config.module.rules.find((rule) =>
      rule.test?.test?.(".svg")
    );

    config.module.rules.push(
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /url/,
      },
      {
        test: /\.svg$/i,
        issuer: fileLoaderRule.issuer,
        resourceQuery: { not: [...fileLoaderRule.resourceQuery.not, /url/] },
        use: [
          {
            loader: "@svgr/webpack",
            options: {
              typescript: true,
              ext: "tsx",
            },
          },
        ],
      }
    );
    fileLoaderRule.exclude = /\.svg$/i;
    return config;
  },
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],

  // 이미지 도메인 허용
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};

const withMDX = createMDX({
  // MDX 관련 옵션들을 여기에 설정
  options: {
    remarkPlugins: [], // Markdown 파싱 단계에서 적용할 플러그인들
    rehypePlugins: [], // HTML 변환 단계에서 적용할 플러그인들
    providerImportSource: "@mdx-js/react",
  },
});

export default withMDX(nextConfig);

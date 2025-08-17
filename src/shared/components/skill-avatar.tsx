import { cn } from "@/shared/lib/utils";
import { useEffect, useState } from "react";
import { AvatarFallback } from "./ui/avatar";
import { Skeleton } from "./ui/skeleton";

type SkillAvatarProps = {
  skillName: string;
  sizeClass?: string; // ex) "size-6", "size-8", "w-6 h-6"
  avatarClassName?: string; // Avatar 외곽 사이즈/스타일 제어
};

// skillName을 아이콘 이름 형식으로 변환하는 함수
const normalizeSkillName = (skillName: string): string => {
  const skillMap: Record<string, string> = {
    // 프로그래밍 언어
    javascript: "JavaScript",
    js: "JavaScript",
    typescript: "TypeScript",
    ts: "TypeScript",
    react: "React",
    vue: "Vue",
    angular: "Angular",
    node: "NodeJS",
    nodejs: "NodeJS",
    python: "Python",
    java: "Java",
    csharp: "CSharp",
    "c#": "CSharp",
    cpp: "Cpp",
    "c++": "Cpp",
    c: "C",
    go: "Go",
    rust: "Rust",
    php: "Php",
    ruby: "Ruby",
    swift: "Swift",
    kotlin: "Kotlin",
    scala: "Scala",
    dart: "Dart",
    flutter: "Flutter",

    // 클라우드 & 인프라
    aws: "AwsDark",
    amazon: "AwsDark",
    azure: "Azure",
    gcp: "Gcp",
    google: "Gcp",
    docker: "Docker",
    kubernetes: "Kubernetes",
    k8s: "Kubernetes",

    // 버전 관리
    git: "Git",
    github: "GitHub",
    gitlab: "GitLab",
    bitbucket: "Bitbucket",

    // 웹 기술
    html: "Html5",
    html5: "Html5",
    css: "Css3",
    css3: "Css3",
    sass: "Sass",
    scss: "Sass",
    less: "Less",
    tailwind: "Tailwindcss",
    tailwindcss: "Tailwindcss",
    bootstrap: "Bootstrap",
    material: "Materialui",
    materialui: "Materialui",
    mui: "Materialui",

    // 프레임워크
    next: "Nextjs",
    nextjs: "Nextjs",
    nuxt: "Nuxtjs",
    nuxtjs: "Nuxtjs",
    vite: "Vite",
    webpack: "Webpack",
    rollup: "Rollup",

    // 개발 도구
    eslint: "Eslint",
    prettier: "Prettier",
    jest: "Jest",
    vitest: "Vitest",
    cypress: "Cypress",
    playwright: "Playwright",

    // 데이터베이스
    mongodb: "Mongodb",
    mysql: "Mysql",
    postgresql: "Postgresql",
    postgres: "Postgresql",
    redis: "Redis",

    // 서비스
    firebase: "Firebase",
    supabase: "Supabase",
    vercel: "Vercel",
    netlify: "Netlify",

    // 디자인 도구
    figma: "Figma",
    sketch: "Sketch",
    adobe: "AdobeXd",
    adobexd: "AdobeXd",
    xd: "AdobeXd",
    invision: "Invision",
    zeplin: "Zeplin",

    // 소셜 & 커뮤니케이션
    slack: "Slack",
    discord: "Discord",
    telegram: "Telegram",
    whatsapp: "Whatsapp",
    linkedin: "Linkedin",
    twitter: "Twitter",
    x: "Twitter",
    facebook: "Facebook",
    instagram: "Instagram",
    youtube: "Youtube",
    twitch: "Twitch",
    reddit: "Reddit",
    stackoverflow: "Stackoverflow",
    medium: "Medium",
    dev: "Dev",
    hashnode: "Hashnode",
  };

  // 1. 정확한 매칭 시도
  const exactMatch = skillMap[skillName.toLowerCase()];
  if (exactMatch) {
    return exactMatch;
  }

  // 2. 일반적인 변환 규칙 적용
  // camelCase나 kebab-case를 PascalCase로 변환
  const normalized = skillName
    .toLowerCase()
    .replace(/[-_\s]+/g, " ") // 하이픈, 언더스코어, 공백을 공백으로 통일
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join("");

  return normalized;
};

// fallback 텍스트 생성 함수
const getFallbackText = (skillName: string) => {
  return skillName.slice(0, 2).toUpperCase();
};

export const SkillAvatar = ({
  skillName,
  sizeClass = "size-4",
  avatarClassName,
}: SkillAvatarProps) => {
  const [IconComponent, setIconComponent] =
    useState<React.ComponentType | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!skillName || skillName.trim() === "") {
      setIsLoading(false);
      return;
    }

    const loadIcon = async () => {
      try {
        const mod = await import("@fdorantesm/react-skill-icons");
        const normalizedIconName = normalizeSkillName(skillName);

        if (
          mod[normalizedIconName as keyof typeof mod] &&
          typeof mod[normalizedIconName as keyof typeof mod] === "function"
        ) {
          setIconComponent(
            () =>
              mod[normalizedIconName as keyof typeof mod] as React.ComponentType
          );
        } else {
          console.warn(`Icon not found: ${normalizedIconName}`);
        }
      } catch (error) {
        console.warn(`Failed to load icon for skill: ${skillName}`, error);
      } finally {
        setIsLoading(false);
      }
    };

    loadIcon();
  }, [skillName]);

  const fallback = getFallbackText(skillName);

  return (
    <>
      {isLoading ? (
        <Skeleton className={cn("rounded-full", sizeClass)} />
      ) : IconComponent ? (
        <div
          className={cn(
            sizeClass,
            "inline-flex items-center justify-center [&>svg]:size-full [&>svg]:block"
          )}
        >
          <IconComponent />
        </div>
      ) : (
        <AvatarFallback>{fallback}</AvatarFallback>
      )}
    </>
  );
};

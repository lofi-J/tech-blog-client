import { Category } from "@/shared/components/language-icon";

export const formatCategory = (category: string): Category => {
  switch (category) {
    case "React.js":
      return "react";
    case "JavaScript":
      return "javascript";
    case "TypeScript":
      return "typescript";
    case "Rust":
      return "rust";
    case "Git":
      return "git";
    default:
      console.warn("category 매핑이 필요함. (formatCategory Fn)");
      throw new Error(`Invalid category: ${category}`);
  }
};

export const formatCategoryLink = (category?: string | null): string => {
  if (!category) {
    return "404";
  }
  return formatCategory(category);
};

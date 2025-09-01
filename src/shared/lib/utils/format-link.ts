import { Language } from "@/shared/components/language-icon";

export const formatCategory = (category: string): Language => {
  switch (category) {
    case "React.js":
      return "react";
    case "JavaScript":
      return "javascript";
    case "TypeScript":
      return "typescript";
    case "Rust":
      return "rust";
    default:
      console.warn("category 매핑이 필요할 수 있음.");
      throw new Error(`Invalid category: ${category}`);
  }
};

export const formatCategoryLink = (category?: string | null): string => {
  if (!category) {
    return "404";
  }
  return formatCategory(category);
};

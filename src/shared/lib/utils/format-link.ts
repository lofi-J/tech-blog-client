export const formatCategoryLink = (category?: string | null): string => {
  if (!category) {
    return "404";
  }

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
      return category.toLowerCase().replace(/\s+/g, "-");
  }
};

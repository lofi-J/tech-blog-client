import { useTheme } from "next-themes";

export const useFeature = () => {
  const { theme, setTheme, systemTheme } = useTheme();

  const toggleTheme = () => {
    if (theme === "undefined") {
      setTheme(systemTheme === "dark" ? "light" : "dark");
    } else {
      setTheme(theme === "dark" ? "light" : "dark");
    }
  };

  const toggleZenMode = () => {
    console.log("[wip] toggle-zen-mode");
  };

  return { toggleTheme, toggleZenMode };
};

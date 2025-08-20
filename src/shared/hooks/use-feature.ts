import { useSetAtom } from "jotai";
import { useTheme } from "next-themes";
import { openColorPicker } from "../components/header-navbar/header-color-picker";

export const useFeature = () => {
  const { theme, setTheme, systemTheme } = useTheme();
  const setOpenColorPicker = useSetAtom(openColorPicker);

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

  const pickerOpen = () => {
    setOpenColorPicker(true);
  };

  return { toggleTheme, toggleZenMode, openColorPicker: pickerOpen };
};

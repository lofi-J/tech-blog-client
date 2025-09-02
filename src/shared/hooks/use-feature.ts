import { useSetAtom } from "jotai";
import { useTheme } from "next-themes";
import { openColorPickerAtom } from "../components/header-navbar/header-color-picker";
import { useZenMode } from "../context/zen-mode-provider";

export const useFeature = () => {
  const { theme, setTheme, systemTheme } = useTheme();
  const { toggleZenMode } = useZenMode();
  const setOpenColorPicker = useSetAtom(openColorPickerAtom);

  const toggleTheme = () => {
    if (theme === "undefined") {
      setTheme(systemTheme === "dark" ? "light" : "dark");
    } else {
      setTheme(theme === "dark" ? "light" : "dark");
    }
  };

  const openColorPicker = () => {
    setOpenColorPicker(true);
  };

  return { toggleTheme, openColorPicker, toggleZenMode };
};

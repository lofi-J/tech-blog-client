import MoonIcon from "@/shared/icons/moon.svg";
import SunIcon from "@/shared/icons/sun.svg";
import { AnimatePresence, motion } from "framer-motion";
import { useTheme } from "next-themes";
import { useState } from "react";

export const ToggleThemeButton = () => {
  const { theme, setTheme } = useTheme();
  const [mobileTap, setMobileTap] = useState(false);
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  const toggleTheme = () => {
    if (isMobile) {
      setMobileTap(true);
      setTimeout(() => setMobileTap(false), 250);
    }
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <div className="">
      <AnimatePresence mode="wait" initial={false}>
        <motion.button
          aria-label="Toggle theme"
          className="plan-hover rounded-md p-1.5 border-0"
          onClick={toggleTheme}
          animate={{
            scale: mobileTap ? 1.2 : 1,
            opacity: mobileTap ? 0.7 : 1,
          }}
          transition={{
            type: "spring",
            stiffness: 500,
            damping: 30,
            duration: 0.25,
          }}
        >
          {theme === "dark" ? (
            <MoonIcon width={16} height={16} />
          ) : (
            <SunIcon width={16} height={16} />
          )}
        </motion.button>
      </AnimatePresence>
    </div>
  );
};

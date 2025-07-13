import MoonIcon from "@/shared/icons/moon.svg";
import SunIcon from "@/shared/icons/sun.svg";
import clsx from "clsx";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export const ToggleThemeButton = () => {
  const { theme, setTheme } = useTheme();
  const [isAnimating, setIsAnimating] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    setIsAnimating(true);
    setTheme(theme === "light" ? "dark" : "light");

    // 애니메이션 완료 후 상태 리셋
    setTimeout(() => {
      setIsAnimating(false);
    }, 300);
  };

  if (!mounted) {
    return (
      <div className="border-1 hover:border-accent-foreground rounded-md w-8 h-8 flex items-center justify-center">
        <div className="w-5 h-5 bg-gray-300 rounded animate-pulse" />
      </div>
    );
  }

  return (
    <div className="border-1 hover:border-accent-foreground rounded-md w-8 h-8 flex items-center justify-center transition-all duration-200 hover:scale-105 hover:shadow-md">
      <button
        onClick={toggleTheme}
        className={clsx(
          "text-accent-foreground relative transition-all duration-300",
          isAnimating && "theme-toggle-fade"
        )}
        disabled={isAnimating}
      >
        <div className="relative w-5 h-5">
          {/* Moon Icon */}
          <div
            className={clsx(
              "absolute inset-0 transition-all duration-500 ease-in-out",
              theme === "light"
                ? "opacity-100 rotate-0 scale-100"
                : "opacity-0 -rotate-90 scale-75"
            )}
          >
            <MoonIcon width={20} height={20} />
          </div>

          {/* Sun Icon */}
          <div
            className={clsx(
              "absolute inset-0 transition-all duration-500 ease-in-out",
              theme === "dark"
                ? "opacity-100 rotate-0 scale-100"
                : "opacity-0 -rotate-90 scale-75"
            )}
          >
            <SunIcon width={20} height={20} />
          </div>
        </div>
      </button>
    </div>
  );
};

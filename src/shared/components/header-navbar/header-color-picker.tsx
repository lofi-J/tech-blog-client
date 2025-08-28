"use client";

import { useColor } from "@/shared/context/color-provider";
import { Theme } from "@/shared/context/theme-provider";
import { cn } from "@/shared/lib/utils";
import { atom, useAtom } from "jotai";
import { useTheme } from "next-themes";
import { useEffect, useRef } from "react";
import * as ColorPicker from "react-colorful";

export const COLOR_SET = {
  dark: {
    red: "#ca232b",
    orange: "#f25116",
    yellow: "#7ccf00",
    green: "#2fe564",
    blue: "#2b7fff",
    purple: "#ad46ff",
  },
  light: {
    red: "#ca232b",
    orange: "#ff3e00",
    yellow: "#7fab00",
    green: "#2fe564",
    blue: "#2079ff",
    purple: "#8200ff",
  },
};

// Jota global variable
export const openColorPicker = atom(false);

export const HeaderColorPicker = ({ className }: { className?: string }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useAtom(openColorPicker);
  const { highlightColor, setHighlightColor } = useColor();
  const { theme } = useTheme();

  const getDefaultTheme = (theme?: string): Theme => {
    if (!theme) {
      return "dark";
    }
    if (theme === "dark") {
      return "dark";
    }
    return "light";
  };

  const handleColorChange = (newColor: string) => {
    setHighlightColor(newColor);
  };

  const handleToggle = (event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    setOpen((prev) => !prev);
  };

  // 외부 클릭 시 컬러 피커 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const container = containerRef.current;
      if (container && !container.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open, setOpen]);

  return (
    <div
      ref={containerRef}
      className={cn("size-9 cursor-pointer relative", className)}
    >
      <div
        onClick={handleToggle}
        className="flex items-center justify-center w-full h-full rounded-sm border border-border hover:border-border/80 transition-colors"
      >
        <div
          className="w-[65%] h-[65%] rounded-full border border-border/20"
          style={{ backgroundColor: highlightColor }}
        />
      </div>
      {open && (
        <div className="absolute top-10 right-0 z-50 bg-background border border-border rounded-lg p-3 shadow-lg">
          <div className="f-col gap-1">
            <ColorPicker.HexAlphaColorPicker
              color={highlightColor}
              onChange={handleColorChange}
            />
            <div className="f-col gap-1">
              <div className="text-[12px] font-semibold text-highlight cursor-default">
                Recommended color
              </div>
              <div className="flex gap-1.5 items-center justify-around">
                <ColorCircle
                  color={COLOR_SET[getDefaultTheme(theme)].red}
                  setHighlightColor={handleColorChange}
                />
                <ColorCircle
                  color={COLOR_SET[getDefaultTheme(theme)].orange}
                  setHighlightColor={handleColorChange}
                />
                <ColorCircle
                  color={COLOR_SET[getDefaultTheme(theme)].yellow}
                  setHighlightColor={handleColorChange}
                />
                <ColorCircle
                  color={COLOR_SET[getDefaultTheme(theme)].green}
                  setHighlightColor={handleColorChange}
                />
                <ColorCircle
                  color={COLOR_SET[getDefaultTheme(theme)].blue}
                  setHighlightColor={handleColorChange}
                />
                <ColorCircle
                  color={COLOR_SET[getDefaultTheme(theme)].purple}
                  setHighlightColor={handleColorChange}
                />
              </div>
              <div className="mt-2">
                <ColorPicker.HexColorInput
                  color={highlightColor}
                  onChange={handleColorChange}
                  className="w-full rounded-sm bg-input/60 border border-secondary px-2 focus-visible:outline-none"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const ColorCircle = ({
  color,
  setHighlightColor,
  className,
}: {
  color: string;
  setHighlightColor: (color: string) => void;
  className?: string;
}) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  return (
    <button
      onClick={() => setHighlightColor(color)}
      className={cn(
        "hover:scale-110 transition-all duration-300 cursor-pointer w-[25px] h-[25px] rounded-full border",
        className,
        isDark ? "border-white" : "border-black"
      )}
      style={{ backgroundColor: color }}
      aria-label={color}
    />
  );
};

"use client";

import { useColor } from "@/shared/context/color-provider";
import { cn } from "@/shared/lib/utils";
import { atom, useAtom } from "jotai";
import { useEffect, useRef } from "react";
import * as ColorPicker from "react-colorful";

// Jota global variable
export const openColorPicker = atom(false);

export const HeaderColorPicker = ({ className }: { className?: string }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useAtom(openColorPicker);
  const { highlightColor, setHighlightColor } = useColor();

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
          <ColorPicker.HexAlphaColorPicker
            color={highlightColor}
            onChange={handleColorChange}
          />
        </div>
      )}
    </div>
  );
};

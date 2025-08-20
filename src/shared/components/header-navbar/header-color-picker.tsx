"use client";

import { useColor } from "@/shared/context/color-provider";
import { atom, useAtom } from "jotai";
import { useEffect, useRef } from "react";
import * as ColorPicker from "react-colorful";

// Jota global variable
export const openColorPicker = atom(false);

export const HeaderColorPicker = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useAtom(openColorPicker);
  const { highlightColor, setHighlightColor } = useColor();

  const handleColorChange = (newColor: string) => {
    setHighlightColor(newColor);
  };

  // 외부 클릭 시 컬러 피커 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
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
      ref={ref}
      className="size-9 cursor-pointer relative"
      onClick={() => setOpen(!open)}
    >
      <div className="flex items-center justify-center w-full h-full rounded-sm border border-border hover:border-border/80 transition-colors">
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

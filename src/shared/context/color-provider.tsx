"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

type ColorContextValue = {
  highlightColor: string;
  setHighlightColor: (color: string) => void;
};

const ColorContext = createContext<ColorContextValue | undefined>(undefined);

type ColorProviderProps = {
  children: ReactNode;
};

export const ColorProvider = ({ children }: ColorProviderProps) => {
  // 기본값은 기존 CSS 변수 또는 fallback 색상
  const [highlightColor, setHighlightColor] = useState("#3b82f6");

  // 컴포넌트 마운트 시 기존 CSS 변수 값 읽어오기
  useEffect(() => {
    const root = document.documentElement;
    const existingColor = getComputedStyle(root)
      .getPropertyValue("--highlight-color")
      .trim();

    if (existingColor) {
      setHighlightColor(existingColor);
    }
  }, []);

  // 색상이 변경될 때마다 CSS 변수 업데이트
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty("--highlight-color", highlightColor);
  }, [highlightColor]);

  const value: ColorContextValue = {
    highlightColor,
    setHighlightColor,
  };

  return (
    <ColorContext.Provider value={value}>{children}</ColorContext.Provider>
  );
};

export const useColor = () => {
  const context = useContext(ColorContext);
  if (!context) {
    throw new Error("useColor must be used within ColorProvider");
  }
  return context;
};

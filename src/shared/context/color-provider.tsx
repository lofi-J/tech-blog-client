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

const DEFAULT_HIGHLIGHT_COLOR = "#2079ff";

export const ColorProvider = ({ children }: ColorProviderProps) => {
  // 기본값 설정 (SSR 고려)
  const [highlightColor, setHighlightColor] = useState(DEFAULT_HIGHLIGHT_COLOR);
  const [isInitialized, setIsInitialized] = useState(false);

  const setCSSVariable = (color: string) => {
    const root = document.documentElement;
    root.style.setProperty("--highlight-color", color);
  };

  // 컴포넌트 마운트 시 localStorage에서 색상 로드
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedColor = localStorage.getItem("highlightColor");

      if (savedColor) {
        setHighlightColor(savedColor);
        setCSSVariable(savedColor);
      } else {
        // localStorage가 비어있으면 기본값으로 CSS 변수 설정
        setCSSVariable(DEFAULT_HIGHLIGHT_COLOR);
      }
      setIsInitialized(true);
    }
  }, []);

  // 색상이 변경될 때마다 CSS 변수 및 localStorage 업데이트 (초기 로드 후에만)
  useEffect(() => {
    if (isInitialized && highlightColor && typeof window !== "undefined") {
      setCSSVariable(highlightColor);
      localStorage.setItem("highlightColor", highlightColor);
    }
  }, [highlightColor, isInitialized]);

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

"use client";

import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";

type ZenModeContextValue = {
  isZenMode: boolean;
  setIsZenMode: (isZenMode: boolean) => void;
  toggleZenMode: () => void;
};

const ZenModeContext = createContext<ZenModeContextValue>({
  isZenMode: false,
  setIsZenMode: () => {},
  toggleZenMode: () => {},
});

export function ZenModeProvider({ children }: PropsWithChildren) {
  const [isZenMode, setIsZenMode] = useState(false);

  const toggleZenMode = () => {
    setIsZenMode((prev) => !prev);
  };

  // zen 모드 상태에 따라 data-zen-hideable 속성을 가진 요소들 숨기기/보이기
  useEffect(() => {
    const elements = document.querySelectorAll(
      "[data-zen-hideable]",
    ) as NodeListOf<HTMLElement>;

    elements.forEach((element) => {
      const animationType = element.getAttribute("data-zen-hideable");

      if (isZenMode) {
        // zen 모드 활성화 - 요소 숨기기
        element.style.opacity = "0";
        element.style.pointerEvents = "none";
        element.style.transition =
          "transform 0.3s ease-out, opacity 0.3s ease-out";

        switch (animationType) {
          case "slide-up":
            element.style.transform = "translateY(-100%)";
            break;
          case "slide-down":
            element.style.transform = "translateY(100%)";
            break;
          case "slide-left":
            element.style.transform = "translateX(-100%)";
            break;
          case "slide-right":
            element.style.transform = "translateX(100%)";
            break;
          case "fade":
            element.style.transform = "none";
            break;
          default:
            element.style.transform = "translateY(-20px)";
        }
      } else {
        // zen 모드 비활성화 - 요소 보이기
        element.style.transform = "translate(0, 0)";
        element.style.opacity = "1";
        element.style.pointerEvents = "auto";
      }
    });
  }, [isZenMode]);

  const value: ZenModeContextValue = {
    isZenMode,
    setIsZenMode,
    toggleZenMode,
  };

  return (
    <ZenModeContext.Provider value={value}>{children}</ZenModeContext.Provider>
  );
}

export const useZenMode = () => {
  const context = useContext(ZenModeContext);
  if (!context) {
    throw new Error("useZenMode must be used within ZenModeProvider");
  }
  return context;
};

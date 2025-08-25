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
      "[data-zen-hideable]"
    ) as NodeListOf<HTMLElement>;

    elements.forEach((element) => {
      const animationType = element.getAttribute("data-zen-hideable");

      if (isZenMode) {
        // 원래 스타일 값들을 저장 (한 번만)
        if (!element.dataset.originalStyles) {
          const computedStyle = getComputedStyle(element);
          const originalStyles = {
            display: computedStyle.display,
            height: element.offsetHeight + "px",
            width: element.offsetWidth + "px",
            marginTop: computedStyle.marginTop,
            marginBottom: computedStyle.marginBottom,
            marginLeft: computedStyle.marginLeft,
            marginRight: computedStyle.marginRight,
            paddingTop: computedStyle.paddingTop,
            paddingBottom: computedStyle.paddingBottom,
            paddingLeft: computedStyle.paddingLeft,
            paddingRight: computedStyle.paddingRight,
          };
          element.dataset.originalStyles = JSON.stringify(originalStyles);
        }

        // zen 모드 활성화 - 요소 자연스럽게 숨기기
        element.style.transition = "all 0.3s ease-out";
        element.style.overflow = "hidden";

        // 애니메이션 적용
        requestAnimationFrame(() => {
          switch (animationType) {
            case "slide-up":
              element.style.height = "0";
              element.style.paddingTop = "0";
              element.style.paddingBottom = "0";
              element.style.marginTop = "0";
              element.style.marginBottom = "0";
              element.style.transform = "translateY(-20px)";
              element.style.opacity = "0";
              break;
            case "slide-down":
              element.style.height = "0";
              element.style.paddingTop = "0";
              element.style.paddingBottom = "0";
              element.style.marginTop = "0";
              element.style.marginBottom = "0";
              element.style.transform = "translateY(20px)";
              element.style.opacity = "0";
              break;
            case "slide-left":
              element.style.width = "0";
              element.style.paddingLeft = "0";
              element.style.paddingRight = "0";
              element.style.marginLeft = "0";
              element.style.marginRight = "0";
              element.style.transform = "translateX(-20px)";
              element.style.opacity = "0";
              break;
            case "slide-right":
              element.style.width = "0";
              element.style.paddingLeft = "0";
              element.style.paddingRight = "0";
              element.style.marginLeft = "0";
              element.style.marginRight = "0";
              element.style.transform = "translateX(20px)";
              element.style.opacity = "0";
              break;
            case "fade":
              element.style.opacity = "0";
              element.style.transform = "scale(0.95)";
              break;
            default:
              element.style.height = "0";
              element.style.paddingTop = "0";
              element.style.paddingBottom = "0";
              element.style.marginTop = "0";
              element.style.marginBottom = "0";
              element.style.opacity = "0";
          }
          element.style.pointerEvents = "none";
        });
      } else {
        // zen 모드 비활성화 - 요소 자연스럽게 복원
        if (element.dataset.originalStyles) {
          const originalStyles = JSON.parse(element.dataset.originalStyles);

          element.style.transition = "all 0.3s ease-out";
          element.style.overflow = "hidden";

          // 원래 스타일로 복원
          requestAnimationFrame(() => {
            element.style.display = originalStyles.display;
            element.style.height = originalStyles.height;
            element.style.width = originalStyles.width;
            element.style.marginTop = originalStyles.marginTop;
            element.style.marginBottom = originalStyles.marginBottom;
            element.style.marginLeft = originalStyles.marginLeft;
            element.style.marginRight = originalStyles.marginRight;
            element.style.paddingTop = originalStyles.paddingTop;
            element.style.paddingBottom = originalStyles.paddingBottom;
            element.style.paddingLeft = originalStyles.paddingLeft;
            element.style.paddingRight = originalStyles.paddingRight;
            element.style.transform = "translate(0, 0) scale(1)";
            element.style.opacity = "1";
            element.style.pointerEvents = "auto";
          });

          // 애니메이션 완료 후 불필요한 스타일 제거
          setTimeout(() => {
            element.style.height = "";
            element.style.width = "";
            element.style.overflow = "";
            element.style.transition = "";
          }, 400);
        }
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

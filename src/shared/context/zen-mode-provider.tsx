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

    const showElement = (element: HTMLElement) => {
      if (element.dataset.originalStyles) {
        const originalStyles = JSON.parse(element.dataset.originalStyles);

        element.style.transition = "all 0.3s ease-out";
        element.style.overflow = "hidden";

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
      }
    };

    const hideElement = (
      element: HTMLElement,
      animationType: string | null,
    ) => {
      element.style.transition = "all 0.3s ease-out";
      element.style.overflow = "hidden";

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
    };

    const createHoverZone = (
      element: HTMLElement,
      animationType: string | null,
    ) => {
      // 기존 hover zone이 있으면 제거
      const existingZone = document.querySelector(
        `[data-zen-hover-zone-for="${element.id || element.getAttribute("data-zen-id")}"]`,
      );
      if (existingZone) {
        existingZone.remove();
      }

      // 원본 요소의 위치와 크기 정보 저장
      const rect = element.getBoundingClientRect();
      const originalStyles = JSON.parse(element.dataset.originalStyles || "{}");

      // 고유 ID 생성 (없으면)
      if (!element.id && !element.getAttribute("data-zen-id")) {
        element.setAttribute(
          "data-zen-id",
          `zen-element-${Math.random().toString(36).substr(2, 9)}`,
        );
      }
      const elementId = element.id || element.getAttribute("data-zen-id");

      // 보이지 않는 hover zone 생성
      const hoverZone = document.createElement("div");
      hoverZone.setAttribute("data-zen-hover-zone-for", elementId!);
      hoverZone.style.cssText = `
        position: fixed;
        top: ${rect.top}px;
        left: ${rect.left}px;
        width: ${rect.width}px;
        height: ${animationType === "slide-up" ? "20px" : originalStyles.height || "60px"};
        z-index: 9999;
        pointer-events: auto;
        background: transparent;
      `;

      // 애니메이션 타입에 따라 hover zone 위치 조정
      switch (animationType) {
        case "slide-up":
          hoverZone.style.top = `${rect.top}px`;
          break;
        case "slide-down":
          hoverZone.style.bottom = `${window.innerHeight - rect.bottom}px`;
          hoverZone.style.top = "auto";
          break;
        case "slide-left":
          hoverZone.style.left = `${rect.left}px`;
          hoverZone.style.width = "20px";
          break;
        case "slide-right":
          hoverZone.style.right = `${window.innerWidth - rect.right}px`;
          hoverZone.style.left = "auto";
          hoverZone.style.width = "20px";
          break;
      }

      // hover zone에 이벤트 리스너 추가
      const handleMouseEnter = () => {
        if (isZenMode) {
          showElement(element);
        }
      };

      const handleMouseLeave = () => {
        if (isZenMode) {
          hideElement(element, animationType);
        }
      };

      hoverZone.addEventListener("mouseenter", handleMouseEnter);
      hoverZone.addEventListener("mouseleave", handleMouseLeave);

      // element에도 이벤트 리스너 추가 (보이는 상태에서)
      element.addEventListener("mouseenter", handleMouseEnter);
      element.addEventListener("mouseleave", handleMouseLeave);

      // cleanup 함수를 위해 저장
      (hoverZone as any)._zenHandleMouseEnter = handleMouseEnter;
      (hoverZone as any)._zenHandleMouseLeave = handleMouseLeave;
      (element as any)._zenHandleMouseEnter = handleMouseEnter;
      (element as any)._zenHandleMouseLeave = handleMouseLeave;

      document.body.appendChild(hoverZone);
      return hoverZone;
    };

    elements.forEach((element) => {
      const animationType = element.getAttribute("data-zen-hideable");
      const isHoverable = element.hasAttribute("data-zen-hoverable");

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

        // hoverable 요소들에 hover zone 생성
        if (isHoverable) {
          createHoverZone(element, animationType);
        }

        // zen 모드 활성화 - 요소 숨기기
        hideElement(element, animationType);
      } else {
        // hover zone 제거
        if (isHoverable) {
          const elementId = element.id || element.getAttribute("data-zen-id");
          const hoverZone = document.querySelector(
            `[data-zen-hover-zone-for="${elementId}"]`,
          ) as HTMLElement;

          if (hoverZone) {
            const handleMouseEnter = (hoverZone as any)._zenHandleMouseEnter;
            const handleMouseLeave = (hoverZone as any)._zenHandleMouseLeave;

            if (handleMouseEnter) {
              hoverZone.removeEventListener("mouseenter", handleMouseEnter);
              element.removeEventListener("mouseenter", handleMouseEnter);
            }
            if (handleMouseLeave) {
              hoverZone.removeEventListener("mouseleave", handleMouseLeave);
              element.removeEventListener("mouseleave", handleMouseLeave);
            }

            hoverZone.remove();
          }

          delete (element as any)._zenHandleMouseEnter;
          delete (element as any)._zenHandleMouseLeave;
        }

        // zen 모드 비활성화 - 요소 복원
        if (element.dataset.originalStyles) {
          showElement(element);

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

    // cleanup 함수
    return () => {
      elements.forEach((element) => {
        const isHoverable = element.hasAttribute("data-zen-hoverable");
        if (isHoverable) {
          const elementId = element.id || element.getAttribute("data-zen-id");
          const hoverZone = document.querySelector(
            `[data-zen-hover-zone-for="${elementId}"]`,
          ) as HTMLElement;

          if (hoverZone) {
            const handleMouseEnter = (hoverZone as any)._zenHandleMouseEnter;
            const handleMouseLeave = (hoverZone as any)._zenHandleMouseLeave;

            if (handleMouseEnter) {
              hoverZone.removeEventListener("mouseenter", handleMouseEnter);
              element.removeEventListener("mouseenter", handleMouseEnter);
            }
            if (handleMouseLeave) {
              hoverZone.removeEventListener("mouseleave", handleMouseLeave);
              element.removeEventListener("mouseleave", handleMouseLeave);
            }

            hoverZone.remove();
          }

          delete (element as any)._zenHandleMouseEnter;
          delete (element as any)._zenHandleMouseLeave;
        }
      });
    };
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

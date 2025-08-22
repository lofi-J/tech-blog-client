"use client";

import { useEffect, useState } from "react";

type Breakpoint = "xs" | "sm" | "md" | "lg" | "xl" | "2xl";

// default tailwind breakpoints
const breakpoints = {
  xs: 0, // 0px 이상
  sm: 640, // 640px 이상
  md: 768, // 768px 이상
  lg: 1024, // 1024px 이상
  xl: 1280, // 1280px 이상
  "2xl": 1536, // 1536px 이상
} as const;

// 특정 breakpoint 미만인지 확인
export const useBreakpoint = (breakpoint: Breakpoint) => {
  const [isBelow, setIsBelow] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(
      `(max-width: ${breakpoints[breakpoint] - 1}px)`,
    );

    const handleChange = (e: MediaQueryListEvent) => {
      setIsBelow(e.matches);
    };

    setIsBelow(mediaQuery.matches);
    mediaQuery.addEventListener("change", handleChange);

    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [breakpoint]);

  return isBelow;
};

// 현재 활성화된 breakpoint 반환
export const useCurrentBreakpoint = (): Breakpoint => {
  const [currentBreakpoint, setCurrentBreakpoint] = useState<Breakpoint>("xs");

  useEffect(() => {
    const updateBreakpoint = () => {
      const width = window.innerWidth;

      if (width >= breakpoints["2xl"]) {
        setCurrentBreakpoint("2xl");
      } else if (width >= breakpoints.xl) {
        setCurrentBreakpoint("xl");
      } else if (width >= breakpoints.lg) {
        setCurrentBreakpoint("lg");
      } else if (width >= breakpoints.md) {
        setCurrentBreakpoint("md");
      } else if (width >= breakpoints.sm) {
        setCurrentBreakpoint("sm");
      } else {
        setCurrentBreakpoint("xs");
      }
    };

    // 초기값 설정
    updateBreakpoint();

    // 리사이즈 이벤트 리스너
    window.addEventListener("resize", updateBreakpoint);

    return () => window.removeEventListener("resize", updateBreakpoint);
  }, []);

  return currentBreakpoint;
};

/**
 * width < 640px
 * @returns true if the current breakpoint is "xs" or "sm"
 */
export const useIsMobile = () => {
  const currentBreakpoint = useCurrentBreakpoint();
  return currentBreakpoint === "xs" || currentBreakpoint === "sm";
};

/**
 * width >= 768px
 * @returns true if the current breakpoint is "md"
 */
export const useIsTablet = () => {
  const currentBreakpoint = useCurrentBreakpoint();
  return currentBreakpoint === "md";
};

/**
 * width >= 1024px
 * @returns true if the current breakpoint is "lg", "xl", or "2xl"
 */
export const useIsDesktop = () => {
  const currentBreakpoint = useCurrentBreakpoint();
  return ["lg", "xl", "2xl"].includes(currentBreakpoint);
};

/**
 * 특정 breakpoint 이상인지 확인
 * @param breakpoint - 비교할 breakpoint
 * @returns true if the current breakpoint is equal to or greater than the given breakpoint
 */
export const useIsAbove = (breakpoint: Breakpoint) => {
  const current = useCurrentBreakpoint();
  const breakpointOrder: Breakpoint[] = ["xs", "sm", "md", "lg", "xl", "2xl"];
  return (
    breakpointOrder.indexOf(current) >= breakpointOrder.indexOf(breakpoint)
  );
};

/**
 * 특정 breakpoint 미만인지 확인
 * @param breakpoint - 비교할 breakpoint
 * @returns true if the current breakpoint is less than the given breakpoint
 */
export const useIsBelow = (breakpoint: Breakpoint) => {
  const current = useCurrentBreakpoint();
  const breakpointOrder: Breakpoint[] = ["xs", "sm", "md", "lg", "xl", "2xl"];
  return breakpointOrder.indexOf(current) < breakpointOrder.indexOf(breakpoint);
};

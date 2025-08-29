import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

interface ProgressBarOptions {
  offsetTop?: number; // 상단 여백 (헤더 높이 등)
  offsetBottom?: number; // 하단 여백 (푸터 높이 등)
}

export const useProgressBar = (
  domId: string,
  options: ProgressBarOptions = {}
) => {
  const pathname = usePathname();
  const [progressRate, setProgressRate] = useState(0);
  const { offsetTop = 0, offsetBottom = 0 } = options;

  useEffect(() => {
    const targetElement = document.getElementById(domId);
    if (!targetElement) return;

    const calculateProgress = () => {
      const rect = targetElement.getBoundingClientRect();
      const elementTop = rect.top + window.scrollY;
      const elementHeight = targetElement.offsetHeight;
      const viewportHeight = window.innerHeight;
      const currentScrollY = window.scrollY;

      // 여백을 고려한 실제 측정 시작/끝 지점
      const startPoint = elementTop - offsetTop;
      const endPoint =
        elementTop + elementHeight - viewportHeight + offsetBottom;

      const scrollableDistance = endPoint - startPoint;

      if (scrollableDistance <= 0) {
        setProgressRate(currentScrollY >= startPoint ? 100 : 0);
        return;
      }

      const scrolledDistance = currentScrollY - startPoint;
      const progress = (scrolledDistance / scrollableDistance) * 100;

      setProgressRate(Math.min(100, Math.max(0, progress)));
    };

    calculateProgress();
    window.addEventListener("scroll", calculateProgress, { passive: true });
    window.addEventListener("resize", calculateProgress, { passive: true });

    return () => {
      window.removeEventListener("scroll", calculateProgress);
      window.removeEventListener("resize", calculateProgress);
    };
  }, [domId, offsetTop, offsetBottom, pathname]);

  return { progressRate };
};

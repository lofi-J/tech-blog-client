import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Index } from "../components/search-modal";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * 백엔드 헬스체크를 수행하는 유틸 함수
 * @param baseUrl - 백엔드 서버의 기본 URL (기본값: process.env.NEXT_PUBLIC_API_URL 또는 'http://localhost:3001')
 * @param timeout - 요청 타임아웃 (기본값: 5000ms)
 * @returns Promise<boolean> - 헬스체크 성공 여부
 */
export async function healthCheck(
  baseUrl?: string,
  timeout: number = 5000,
): Promise<{ status: boolean; message: string }> {
  try {
    const url = `${baseUrl || process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001"}/health`;

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    const response = await fetch(url, {
      method: "GET",
      signal: controller.signal,
      headers: {
        "Content-Type": "application/json",
      },
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      return {
        status: false,
        message: "Health check failed",
      };
    }

    return {
      status: true,
      message: "Health check success",
    };
  } catch (error) {
    console.error("Health check error:", error);
    return {
      status: false,
      message: "Health check failed",
    };
  }
}

export async function fetchIndex(
  path: string,
  setLoading: (loading: boolean) => void,
): Promise<Index> {
  try {
    setLoading(true);
    const res = await fetch(path);
    const data = await res.json();
    return data;
  } catch {
    return undefined;
  } finally {
    setLoading(false);
  }
}

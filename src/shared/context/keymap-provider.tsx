"use client";

import { createContext, ReactNode, useContext, useEffect } from "react";
import { useSearchModal } from "./search-modal-provider";

type KeymapContextValue = Record<string, unknown>; // 추후 제공할 기능이 생길경우 수정

const KeymapContext = createContext<KeymapContextValue | undefined>(undefined);

type KeymapProviderProps = {
  children: ReactNode;
};

export const KeymapProvider = ({ children }: KeymapProviderProps) => {
  const { openModal } = useSearchModal();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Cmd+K (Mac) 또는 Ctrl+K (Windows/Linux)
      if ((event.metaKey || event.ctrlKey) && event.key === "k") {
        event.preventDefault();
        event.stopPropagation();
        openModal();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [openModal]);

  const value: KeymapContextValue = {};

  return (
    <KeymapContext.Provider value={value}>{children}</KeymapContext.Provider>
  );
};

export const useKeymap = () => {
  const context = useContext(KeymapContext);
  if (!context) {
    throw new Error("useKeymap must be used within KeymapProvider");
  }
  return context;
};

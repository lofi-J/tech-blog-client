"use client";

import { createContext, PropsWithChildren, useContext, useState } from "react";

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

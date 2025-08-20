"use client";

import { createContext, ReactNode, useContext, useEffect } from "react";
import { KeyMapConfig, KeyMapName } from "../config/keymap";
import { useFeature } from "../hooks/use-feature";
import { useSearchModal } from "./search-modal-provider";
import { useZenMode } from "./zen-mode-provider";

type KeymapAction = () => void;

type KeymapContextValue = {
  registerKeymap: (name: KeyMapName, action: KeymapAction) => void;
  unregisterKeymap: (name: KeyMapName) => void;
};

const KeymapContext = createContext<KeymapContextValue | undefined>(undefined);

type KeymapProviderProps = {
  children: ReactNode;
};

export const KeymapProvider = ({ children }: KeymapProviderProps) => {
  const { openModal } = useSearchModal();
  const { toggleZenMode } = useZenMode();
  const { toggleTheme } = useFeature();

  // 각 기능별 단축키
  const searchModalKey = KeyMapConfig["search-modal"].key;
  const toggleZenModeKey = KeyMapConfig["toggle-zen-mode"].key;
  const toggleThemeKey = KeyMapConfig["toggle-theme"].key;

  useEffect(() => {
    const keymapActions: Record<KeyMapName, KeymapAction> = {
      "search-modal": openModal,
      "toggle-zen-mode": toggleZenMode,
      "toggle-theme": toggleTheme,
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      const { metaKey, ctrlKey, key } = event;
      const isMacCmd = metaKey || ctrlKey;

      const blockDefaultEvent = () => {
        event.preventDefault();
        event.stopPropagation();
      };

      if (isMacCmd && key.toLowerCase() === searchModalKey) {
        blockDefaultEvent();
        keymapActions["search-modal"]();
      }

      if (isMacCmd && key.toLowerCase() === toggleZenModeKey) {
        blockDefaultEvent();
        keymapActions["toggle-zen-mode"]();
      }

      if (isMacCmd && key.toLowerCase() === toggleThemeKey) {
        blockDefaultEvent();
        keymapActions["toggle-theme"]();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [
    openModal,
    toggleZenMode,
    toggleTheme,
    toggleThemeKey,
    toggleZenModeKey,
    searchModalKey,
  ]);

  const registerKeymap = (name: KeyMapName, action: KeymapAction) => {
    // 동적 키맵 등록 기능 (추후 필요시 구현)
    console.log(`Registering keymap: ${name}`);
    console.log(name, action);
  };

  const unregisterKeymap = (name: KeyMapName) => {
    // 동적 키맵 해제 기능 (추후 필요시 구현)
    console.log(`Unregistering keymap: ${name}`);
  };

  const value: KeymapContextValue = {
    registerKeymap,
    unregisterKeymap,
  };

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

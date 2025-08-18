import { useEffect, useMemo, useRef } from "react";

type RegisterKeyMap = {
  commandKey?: CommandKeys;
  key: string;
  callback: () => void;
};

type CommandKeys = "⌘" | "⌥" | "⇧" | "⌃";
type CommandKeyValues = "meta" | "alt" | "shift" | "ctrl";

export const useRegisterKeymap = () => {
  const registerKeyMap = useRef<RegisterKeyMap | null>(null);
  const unregisterKeyMap = useRef<() => void>(null);

  const isMac =
    typeof window !== "undefined" && window.navigator.platform.includes("Mac");

  const CommandKeyMap: Record<CommandKeys, CommandKeyValues> = useMemo(() => {
    return {
      "⌘": isMac ? "meta" : "ctrl",
      "⌥": "alt",
      "⇧": "shift",
      "⌃": "ctrl",
    };
  }, [isMac]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!registerKeyMap.current) return;

      const { commandKey, key, callback } = registerKeyMap.current;
      const isRegistable = key && callback;

      if (registerKeyMap.current && isRegistable) {
        if (
          commandKey &&
          event.key === CommandKeyMap[commandKey] &&
          event.key === key
        ) {
          callback();
        } else if (event.key === key) {
          callback();
        }
      }
    };

    if (registerKeyMap.current) {
      window.addEventListener("keydown", handleKeyDown);
    }

    unregisterKeyMap.current = () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [registerKeyMap, CommandKeyMap]);

  return {
    registerKeyMap,
    unregisterKeyMap,
  };
};

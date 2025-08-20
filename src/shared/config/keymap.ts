export type CommandKeys = "⌘" | "⌥" | "⇧" | "⌃";
export type CommandKeyValues = "meta" | "alt" | "shift" | "ctrl";

export type KeyMap = {
  commandKey: CommandKeys;
  key: string;
};

export type KeyMapName = "search-modal" | "toggle-zen-mode" | "toggle-theme";

export const KeyMapConfig: Record<KeyMapName, KeyMap> = {
  "search-modal": {
    commandKey: "⌘",
    key: "k",
  },
  "toggle-zen-mode": {
    commandKey: "⌘",
    key: "enter",
  },
  "toggle-theme": {
    commandKey: "⌘",
    key: "d",
  },
};

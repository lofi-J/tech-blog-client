export type CommandKeys = "⌘" | "⌥" | "⇧" | "⌃";
export type CommandKeyValues = "meta" | "alt" | "shift" | "ctrl";

export type KeyMap = {
  commandKey: CommandKeys;
  key: string;
};

export type KeyMapName = "toggle-zen-mode";

export const KeyMapConfig: Record<KeyMapName, KeyMap> = {
  "toggle-zen-mode": {
    commandKey: "⌘",
    key: "j",
  },
};

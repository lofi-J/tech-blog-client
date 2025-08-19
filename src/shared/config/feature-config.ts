import { KeyMap, KeyMapConfig } from "./keymap";

export type FeatureName =
  | "toggle-theme"
  | "toggle-zen-mode"
  | "change-highlight-color";

export type SearchModalFeatureConfig = {
  title: string;
  description: string;
  keyMap?: KeyMap;
};

export const featureConfig: Record<FeatureName, SearchModalFeatureConfig> = {
  "toggle-theme": {
    title: "Toggle Theme",
    description: "블로그 테마를 변경합니다",
  },
  "toggle-zen-mode": {
    title: "Toggle Zen mode",
    description: "Zen 모드를 토글합니다",
    keyMap: KeyMapConfig["toggle-zen-mode"],
  },
  "change-highlight-color": {
    title: "Change Highlight Color",
    description: "블로그 하이라이트 색상을 변경합니다",
  },
};

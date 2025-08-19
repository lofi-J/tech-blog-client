"use client";

import { featureConfig, FeatureName } from "@/shared/config/feature-config";
import { Theme } from "@/shared/context/theme-provider";
import { useFeature } from "@/shared/hooks/use-feature";
import MoonIcon from "@/shared/icons/moon.svg";
import PickerIcon from "@/shared/icons/picker.svg";
import SunIcon from "@/shared/icons/sun.svg";
import { ZenIcon } from "@/shared/icons/zen-icon";
import { useTheme } from "next-themes";
import { Kbd } from "../kbd";

export const SearchModalFeatureItem = ({
  feature,
  closeModal,
}: {
  feature: FeatureName;
  closeModal: () => void;
}) => {
  const { toggleTheme, toggleZenMode } = useFeature();
  const { theme, systemTheme } = useTheme();
  const { title, description, keyMap } = featureConfig[feature];

  const getIcon = () => {
    if (feature === "toggle-theme") {
      if (theme === "undefined")
        return systemTheme === "dark" ? <MoonIcon /> : <SunIcon />;
      return theme === "dark" ? <MoonIcon /> : <SunIcon />;
    }
    if (feature === "toggle-zen-mode") {
      return <ZenIcon theme={theme as Theme} />;
    }
    if (feature === "change-highlight-color") {
      return <PickerIcon />;
    }
  };

  const handleClick = () => {
    switch (feature) {
      case "toggle-theme":
        toggleTheme();
        break;
      case "toggle-zen-mode":
        toggleZenMode();
        closeModal();
        break;
      case "change-highlight-color":
        console.log("[wip] change-highlight-color");
        break;
    }
  };

  return (
    <button
      className="flex items-center justify-between p-2 hover:bg-muted/50 rounded-md cursor-pointer border border-border/50 hover:border-border transition-colors"
      onClick={handleClick}
    >
      <div className="flex items-center justify-center gap-2">
        <div className="flex items-center justify-center size-4">
          {getIcon()}
        </div>
        <h3 className="text-[12px] font-semibold">{title}</h3>
        <p className="text-[11px] text-muted-foreground pl-5">{description}</p>
      </div>

      {keyMap && (
        <div className="flex items-center justify-center">
          <span className="flex items-center gap-1">
            <Kbd className="text-[14px]">{keyMap.commandKey}</Kbd>
            <Kbd>{keyMap.key}</Kbd>
          </span>
        </div>
      )}
    </button>
  );
};

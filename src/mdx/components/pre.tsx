import { CopyButton } from "@/shared/components/copy-button";
import {
  guranteeLanguage,
  LanguageIcon,
} from "@/shared/components/language-icon";
import { MdxPreProps } from "../mdx-type";

export const MdxPre = ({ children, ...props }: MdxPreProps) => {
  const code = typeof children === "string" ? children : "";
  const language = props["data-language"] || "javascript";
  const filename = props["data-filename"];
  return (
    <pre
      className="rounded-lg overflow-x-auto mdx-text rts-14 mdx-code-bg relative"
      {...props}
    >
      <div className="flex items-center justify-between pb-2 mb-4 border-b border-input">
        <div className="flex items-center gap-2">
          <LanguageIcon
            language={guranteeLanguage(language)}
            className="size-5"
          />
          {filename && (
            <span className="rts-14 font-jetbrains-mono">{filename}</span>
          )}
        </div>
        <CopyButton code={code} />
      </div>
      {children}
    </pre>
  );
};

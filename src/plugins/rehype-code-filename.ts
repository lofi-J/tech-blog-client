import { isFilename } from "@/shared/lib/utils/regx";
import type { Element, Root } from "hast";
import type { Plugin } from "unified";
import { visit } from "unist-util-visit";

// Plugin 타입 사용 (Transformer 대신)
export const rehypeCodeFilename: Plugin<[], Root> = () => {
  return (tree: Root) => {
    visit(tree, "element", (node: Element) => {
      if (node.tagName === "pre" && node.children?.length) {
        const codeElement = node.children[0] as Element;

        if (codeElement?.tagName === "code" && codeElement.data?.meta) {
          const meta = codeElement.data.meta as string;

          node.properties = node.properties || {};

          if (isFilename(meta)) {
            node.properties["data-filename"] = meta;
          } else {
            node.properties["data-normal-text"] = meta;
          }
        }
      }
    });
  };
};

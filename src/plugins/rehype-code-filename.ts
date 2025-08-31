import { isFilename } from "@/shared/lib/utils/regx";
import { visit } from "unist-util-visit";

export function rehypeCodeFilename() {
  return (tree: any) => {
    visit(tree, "element", (node: any) => {
      // pre > code 구조에서 pre 태그를 찾기
      if (node.tagName === "pre" && node.children && node.children.length > 0) {
        const codeElement = node.children[0] as any;

        if (
          codeElement &&
          codeElement.tagName === "code" &&
          codeElement.data?.meta
        ) {
          const meta = codeElement.data.meta as string;

          if (!node.properties) {
            node.properties = {};
          }

          if (isFilename(meta)) {
            node.properties["data-filename"] = meta;
          } else {
            node.properties["data-normal-text"] = meta;
          }
        }
      }
    });
  };
}

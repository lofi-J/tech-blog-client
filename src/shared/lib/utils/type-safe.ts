import { RehypeNode } from "@/types/rehype";

export const ensureProperties = (
  node: RehypeNode
): NonNullable<RehypeNode["properties"]> => {
  if (!node.properties) {
    node.properties = {};
  }
  return node.properties;
};

export const ensureClassName = (
  properties: NonNullable<RehypeNode["properties"]>
): string[] => {
  if (!properties.className) {
    properties.className = [];
  }
  if (!Array.isArray(properties.className)) {
    properties.className = [];
  }
  return properties.className;
};

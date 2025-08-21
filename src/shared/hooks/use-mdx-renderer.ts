import { run } from "@mdx-js/mdx";
import React, { useEffect, useState } from "react";
import * as runtime from "react/jsx-runtime";

export interface UseMdxRendererResult {
  Component: React.ComponentType<any> | null;
  loading: boolean;
  error: string | null;
}

export const useMdxRenderer = (
  compiledMdx: string | undefined
): UseMdxRendererResult => {
  const [Component, setComponent] = useState<React.ComponentType<any> | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!compiledMdx) {
      setComponent(null);
      return;
    }

    const renderMdx = async () => {
      setLoading(true);
      setError(null);

      try {
        if (typeof compiledMdx !== "string") {
          console.error(
            "Compiled MDX is not a string:",
            typeof compiledMdx,
            compiledMdx
          );
          throw new Error("Invalid compiled MDX format");
        }

        const { default: MdxComponent } = await run(compiledMdx, runtime);

        if (!MdxComponent) {
          throw new Error("MDX component not found");
        }

        setComponent(
          () => (props: any) => React.createElement(MdxComponent, props)
        );
      } catch (err) {
        console.error("MDX render error:", err);
        setError(err instanceof Error ? err.message : "Failed to render MDX");
        setComponent(null);
      } finally {
        setLoading(false);
      }
    };

    renderMdx();
  }, [compiledMdx]);

  return { Component, loading, error };
};

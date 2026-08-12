/// <reference types="vite/client" />

declare module "*.mdx" {
  import type { ComponentType, ReactNode } from "react";
  import type { ContentMeta, GlossaryEntry } from "./content/types";

  type MdxComponents = {
    [key: string]: ComponentType<Record<string, unknown>> | keyof HTMLElementTagNameMap;
  };

  export const meta: ContentMeta;
  export const glossary: GlossaryEntry[] | undefined;
  const MDXComponent: ComponentType<{ components?: MdxComponents; children?: ReactNode }>;
  export default MDXComponent;
}

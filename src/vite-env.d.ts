/// <reference types="vite/client" />

declare module "*.mdx" {
  import type { ComponentType } from "react";
  import type { ContentMeta } from "./content/types";

  export const meta: ContentMeta;
  const MDXComponent: ComponentType;
  export default MDXComponent;
}

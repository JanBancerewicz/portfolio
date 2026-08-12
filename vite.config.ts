import mdx from "@mdx-js/rollup";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import rehypeKatex from "rehype-katex";
import rehypePrettyCode, {
  type Options as RehypePrettyCodeOptions,
} from "rehype-pretty-code";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import { defineConfig } from "vite";

/**
 * `BASE_PATH` lets the same source target either a user site
 * (`https://<user>.github.io/` → "/") or a project site
 * (`https://<user>.github.io/<repo>/` → "/<repo>/").
 */

const prettyCodeOptions: RehypePrettyCodeOptions = {
  // Dual themes → CSS vars (--shiki-light / --shiki-dark); switched via
  // [data-theme] in index.css to match the site toggle.
  theme: {
    light: "github-light",
    dark: "github-dark",
  },
  keepBackground: false,
  bypassInlineCode: true,
  defaultLang: {
    block: "text",
  },
};

export default defineConfig({
  base: process.env.BASE_PATH ?? "/",
  plugins: [
    // MDX must compile before anything else touches the file, and the React
    // transform has to claim .mdx as well — otherwise the JSX that MDX emits
    // reaches Vite's import analysis untransformed and fails to parse.
    // remark-gfm: tables, strikethrough, task lists, autolinks.
    // remark-math + rehype-katex: $…$ / $$…$$ → KaTeX HTML at build time.
    // rehype-pretty-code: fenced blocks (python, bash, …) highlighted at build.
    {
      enforce: "pre",
      ...mdx({
        remarkPlugins: [remarkGfm, remarkMath],
        rehypePlugins: [rehypeKatex, [rehypePrettyCode, prettyCodeOptions]],
      }),
    },
    react({ include: /\.(mdx|jsx|tsx|js|ts)$/ }),
    tailwindcss(),
  ],
  build: {
    chunkSizeWarningLimit: 700,
    /**
     * Covers and posters must stay real files. Vite inlines assets under 4kB as
     * `data:` URIs, which is right for the 38 tech icons but wrong for anything
     * that has to appear in an `og:image` — a social card needs a fetchable
     * http(s) URL, and a data URI silently breaks link previews.
     */
    assetsInlineLimit: (filePath) =>
      !/\/(cover|poster)\.svg$/.test(filePath),
  },
});

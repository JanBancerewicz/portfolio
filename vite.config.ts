import mdx from "@mdx-js/rollup";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

/**
 * `BASE_PATH` lets the same source target either a user site
 * (`https://<user>.github.io/` → "/") or a project site
 * (`https://<user>.github.io/<repo>/` → "/<repo>/").
 */
export default defineConfig({
  base: process.env.BASE_PATH ?? "/",
  plugins: [
    // MDX must compile before anything else touches the file, and the React
    // transform has to claim .mdx as well — otherwise the JSX that MDX emits
    // reaches Vite's import analysis untransformed and fails to parse.
    { enforce: "pre", ...mdx() },
    react({ include: /\.(mdx|jsx|tsx|js|ts)$/ }),
    tailwindcss(),
  ],
  build: {
    chunkSizeWarningLimit: 700,
  },
});

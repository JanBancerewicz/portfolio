import { StrictMode } from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router";
import App from "./App";
import { contentRoutes } from "./content";
import { ThemeProvider } from "./theme/ThemeProvider";

/** Every path that gets its own physical directory in the build output. */
export const routes = ["/", "/projects", "/blog", ...contentRoutes];

// Re-exported so the prerender step can rewrite each file's <head> without
// importing application code a second time.
export { metaFor } from "./lib/seo";

// Must match the client's BrowserRouter basename, or every generated href
// differs between the static HTML and the hydrated tree.
const basename = import.meta.env.BASE_URL.replace(/\/$/, "");

export function render(url: string) {
  return renderToString(
    <StrictMode>
      <ThemeProvider>
        <StaticRouter basename={basename} location={`${basename}${url}`}>
          <App />
        </StaticRouter>
      </ThemeProvider>
    </StrictMode>,
  );
}

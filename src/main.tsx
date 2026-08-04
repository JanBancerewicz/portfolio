import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { ThemeProvider } from "./theme/ThemeProvider";
import "./index.css";

const basename = import.meta.env.BASE_URL.replace(/\/$/, "");

const tree = (
  <StrictMode>
    <ThemeProvider>
      <BrowserRouter basename={basename}>
        <App />
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>
);

// Tells the failsafe in index.html that the app booted, so it leaves the
// reveal-hiding "js" class in place.
document.documentElement.setAttribute("data-booted", "");

const container = document.getElementById("root")!;

// The build prerenders every route to static HTML, so an already-populated
// container means we hydrate rather than throw the markup away.
if (container.hasChildNodes()) {
  hydrateRoot(container, tree);
} else {
  createRoot(container).render(tree);
}

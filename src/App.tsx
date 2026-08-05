import { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { Footer } from "./components/layout/Footer";
import { Header } from "./components/layout/Header";
import { ArticlePage } from "./components/pages/ArticlePage";
import { BlogIndexPage } from "./components/pages/BlogIndexPage";
import { Home } from "./components/pages/Home";
import { NotFoundPage } from "./components/pages/NotFoundPage";
import { ProjectsIndexPage } from "./components/pages/ProjectsIndexPage";

/**
 * Routes that end on a full-height pinned section and must therefore be the
 * last thing on the page — anything after them is something you can overshoot
 * into at the exact moment the layout is asking you to stop.
 */
const ROUTES_WITHOUT_FOOTER = ["/projects"];

export default function App() {
  const { pathname } = useLocation();
  // A static host serves this route as `/projects/`, while the prerender asks
  // for `/projects` — compare without the trailing slash or the two disagree
  // and the footer reappears after hydration.
  const route = pathname.replace(/\/+$/, "") || "/";
  const showFooter = !ROUTES_WITHOUT_FOOTER.includes(route);

  return (
    <>
      <ScrollBehaviour />
      <Header />
      <main id="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<ProjectsIndexPage />} />
          <Route
            path="/projects/:slug"
            element={<ArticlePage kind="project" />}
          />
          <Route path="/blog" element={<BlogIndexPage />} />
          <Route path="/blog/:slug" element={<ArticlePage kind="post" />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      {showFooter ? <Footer /> : null}
    </>
  );
}

/**
 * Route changes jump to the top instantly — navigation is not an animation.
 * In-page hash links keep the browser's smooth scroll.
 */
function ScrollBehaviour() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const target = document.querySelector(location.hash);
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
        return;
      }
    }

    window.scrollTo({ top: 0, behavior: "auto" });
  }, [location.hash, location.key, location.pathname]);

  return null;
}

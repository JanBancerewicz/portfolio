import { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { Footer } from "./components/layout/Footer";
import { Navbar } from "./components/layout/Navbar";
import { ScrollProgress } from "./components/layout/ScrollProgress";
import { CaseStudyPage } from "./components/pages/CaseStudyPage";
import { NotFoundPage } from "./components/pages/NotFoundPage";
import { Certificates } from "./components/sections/Certificates";
import { Hackathons } from "./components/sections/Hackathons";
import { Hero } from "./components/sections/Hero";
import { Links } from "./components/sections/Links";
import { PinnedProjects } from "./components/sections/PinnedProjects";
import { Resume } from "./components/sections/Resume";
import { TechMarquee } from "./components/sections/TechMarquee";
import { NetworkBackground } from "./components/ui/NetworkBackground";

function AppShell() {
  return (
    <div className="theme-surface min-h-screen overflow-x-clip bg-background text-foreground">
      <NetworkBackground />
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0 bg-[linear-gradient(to_right,var(--grid-line)_1px,transparent_1px),linear-gradient(to_bottom,var(--grid-line-soft)_1px,transparent_1px)] bg-[size:72px_72px] transition-opacity duration-300"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(ellipse_at_top,var(--overlay-top),transparent_45%),linear-gradient(180deg,var(--overlay-mid),color-mix(in_srgb,var(--overlay-bottom)_92%,transparent)_62%,var(--overlay-bottom))] transition-[background] duration-300"
      />
      <div className="relative z-10">
        <HashScroll />
        <ScrollProgress />
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/projects/:slug" element={<CaseStudyPage kind="project" />} />
          <Route
            path="/hackathons/:slug"
            element={<CaseStudyPage kind="hackathon" />}
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <Footer />
      </div>
    </div>
  );
}

function HashScroll() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      window.setTimeout(() => {
        document
          .querySelector(location.hash)
          ?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 0);
      return;
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location.hash, location.pathname]);

  return null;
}

function HomePage() {
  return (
    <main className="mx-auto flex w-full max-w-7xl flex-col px-5 sm:px-6 lg:px-8">
      <Hero />
      <TechMarquee />
      <PinnedProjects />
      <Hackathons />
      <Certificates />
      <Resume />
      <Links />
    </main>
  );
}

export default function App() {
  return <AppShell />;
}

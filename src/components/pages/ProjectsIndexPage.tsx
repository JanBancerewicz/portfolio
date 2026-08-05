import { Link } from "react-router-dom";
import { projectEntries } from "../../content";
import { Reveal } from "../motion/Reveal";
import { SplitLines } from "../motion/SplitLines";
import { Container } from "../ui/Container";
import { ProjectRail } from "../ui/ProjectRail";

/**
 * A character-select screen, not a document: a compact masthead and then the
 * shelf, which is the last thing on the page. Because the pinned section is
 * exactly as tall as the rail's travel and nothing follows it — no contact
 * block, and `App` withholds the footer for this route — scrolling to the
 * bottom lands on the final reel instead of shooting past it.
 */
export function ProjectsIndexPage() {
  return (
    <div>
      <Container>
        <Reveal
          className="flex items-baseline justify-between gap-6 border-b border-rule pb-4 pt-20 md:pt-24"
          duration={480}
        >
          <Link to="/" className="label text-ink">
            ← Back to index
          </Link>
          <span className="label">{projectEntries.length} projects</span>
        </Reveal>

        <SplitLines
          className="display mt-7 text-[clamp(1.875rem,4.4vw,3.5rem)]"
          delay={100}
          step={70}
        >
          Showcase of <em>selected projects</em>.
        </SplitLines>

        <Reveal className="mt-5 max-w-3xl" delay={280}>
          <p className="text-[1.0625rem] leading-relaxed text-ink-muted md:text-[1.125rem]">
            Full-stack applications and research projects and that show my passion for software engineering.
            Built to deliver value and learn from each project.
          </p>
        </Reveal>
      </Container>

      {/*
        Deliberately not wrapped in <Reveal>: it leaves an inline `transform` on
        the wrapper, which creates a containing block and breaks the sticky
        positioning the pinned rail depends on.
      */}
      <div className="mt-4 md:mt-5">
        <ProjectRail entries={projectEntries} />
      </div>
    </div>
  );
}

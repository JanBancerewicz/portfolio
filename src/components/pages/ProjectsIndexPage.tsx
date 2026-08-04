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
    <main>
      <Container>
        <Reveal
          className="flex items-baseline justify-between gap-6 border-b border-rule pb-4 pt-28 md:pt-32"
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
          Everything I have <em>actually shipped</em>.
        </SplitLines>
      </Container>

      {/*
        Deliberately not wrapped in <Reveal>: it leaves an inline `transform` on
        the wrapper, which creates a containing block and breaks the sticky
        positioning the pinned rail depends on.
      */}
      <div className="mt-6 md:mt-8">
        <ProjectRail entries={projectEntries} />
      </div>
    </main>
  );
}

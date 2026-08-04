import { Link } from "react-router-dom";
import { Reveal } from "../motion/Reveal";
import { SplitLines } from "../motion/SplitLines";
import { Container } from "../ui/Container";

export function NotFoundPage() {
  return (
    <main className="flex min-h-[70vh] items-center">
      <Container>
        <span className="label">Error 404</span>
        <SplitLines className="display mt-6 text-[clamp(2.5rem,8vw,6rem)]">
          This page does
          <br />
          not <em>exist</em>. 404
        </SplitLines>

        <Reveal className="mt-8 flex flex-wrap gap-3" delay={280}>
          <Link
            to="/"
            className="press rounded-full bg-ink px-6 py-3.5 text-[1rem] font-medium text-paper transition-colors duration-200 hover:bg-accent hover:text-accent-ink"
          >
            Back to the homepage
          </Link>
          <Link
            to="/projects"
            className="press rounded-full border border-rule-strong px-6 py-3.5 text-[1rem] font-medium transition-colors duration-200 hover:border-ink"
          >
            See the projects
          </Link>
        </Reveal>
      </Container>
    </main>
  );
}

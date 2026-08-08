import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { Reveal } from "../motion/Reveal";
import { SplitLines } from "../motion/SplitLines";
import { Container } from "./Container";

type PageIntroProps = {
  eyebrow: string;
  title: ReactNode;
  lede?: ReactNode;
  meta?: ReactNode;
};

/** Masthead shared by every subpage, so they read as one publication. */
export function PageIntro({ eyebrow, title, lede, meta }: PageIntroProps) {
  return (
    <Container>
      <Reveal
        className="flex items-baseline justify-between gap-6 border-b border-rule pb-4 pt-20 md:pt-24"
        duration={480}
      >
        <Link to="/" className="label text-ink">
          ← Back to index
        </Link>
        <span className="label">{eyebrow}</span>
      </Reveal>

      <SplitLines
        as="h1"
        className="display mt-10 text-[clamp(2.5rem,7.5vw,6.5rem)] md:mt-14"
        delay={100}
      >
        {title}
      </SplitLines>

      {lede ? (
        <Reveal className="mt-8 max-w-2xl" delay={320}>
          <p className="text-[1.125rem] leading-relaxed text-ink-muted md:text-lg">
            {lede}
          </p>
        </Reveal>
      ) : null}

      {meta ? (
        <Reveal className="mt-10" delay={400}>
          {meta}
        </Reveal>
      ) : null}
    </Container>
  );
}

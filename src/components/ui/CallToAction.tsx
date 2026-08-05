import { site } from "../../data/site";
import { Reveal } from "../motion/Reveal";
import { Container } from "./Container";

/**
 * End-of-article invitation. Every page a visitor can reach ends with a way to
 * start a conversation — that is the whole job of this site.
 */
export function CallToAction({
  headline = "Working on something like this?",
  body = "If any of this is close to a problem on your team, I would like to hear about it. LinkedIn is the fastest way to reach me.",
}: {
  headline?: string;
  body?: string;
}) {
  return (
    <Container>
      <Reveal className="mt-24 border-t border-rule-strong pt-10 md:mt-32">
        <div className="grid gap-8 md:grid-cols-12">
          <div className="md:col-span-7">
            <h2 className="text-[clamp(1.75rem,4vw,2.75rem)] font-medium leading-[1.05] tracking-[-0.04em]">
              {headline}
            </h2>
            <p className="mt-4 max-w-lg text-ink-muted">{body}</p>
          </div>

          <div className="flex flex-col gap-3 md:col-span-5 md:items-end md:justify-start">
            <a
              href={site.links.linkedin}
              target="_blank"
              rel="noreferrer noopener"
              className="press group inline-flex items-center justify-between gap-8 rounded-full bg-ink px-6 py-3.5 text-[1rem] font-medium text-paper transition-colors duration-200 hover:bg-accent hover:text-accent-ink"
            >
              Get in touch on LinkedIn
              <span className="transition-transform duration-200 ease-out group-hover:translate-x-0.5">
                ↗
              </span>
            </a>
            <a
              href={`mailto:${site.email}`}
              className="press group inline-flex items-center justify-between gap-8 rounded-sm border border-rule-strong px-6 py-3.5 text-[1rem] font-medium transition-colors duration-200 hover:border-ink"
            >
              {site.email}
              <span className="transition-transform duration-200 ease-out group-hover:translate-x-0.5">
                →
              </span>
            </a>
          </div>
        </div>
      </Reveal>
    </Container>
  );
}

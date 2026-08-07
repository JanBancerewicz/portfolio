import { site } from "../../data/site";
import { Reveal } from "../motion/Reveal";
import { SplitLines } from "../motion/SplitLines";
import { Container } from "../ui/Container";
import { Terminal } from "../ui/Terminal";

/**
 * Shared by the homepage and every index page, so there is one contact block
 * in the repo rather than a copy per route. Only its section number changes.
 */
export function Contact({ index = "07" }: { index?: string }) {
  return (
    <section id="contact" className="scroll-mt-24 pt-28 md:pt-40">
      <Container>
        <div className="border-t-2 border-ink pt-4">
          <h2 className="section-eyebrow">
            <span className="section-eyebrow-index">{index}</span>
            <span className="mx-2 text-rule-strong">/</span>
            Contact
          </h2>
        </div>

        <div className="mt-12 grid gap-14 md:mt-16 md:grid-cols-12 md:gap-10">
          <div className="md:col-span-7">
            <SplitLines
              as="h2"
              className="display text-[clamp(2.5rem,7vw,5.5rem)]"
              step={80}
            >
              If this matches what
              <br />
              you are <em>looking for</em>
              <br />
              – say hello.
            </SplitLines>

            <Reveal className="mt-8 max-w-lg" delay={160}>
              <p className="text-[1.125rem] leading-relaxed text-ink-muted">
                LinkedIn or email, whichever you prefer – I read everything and
                reply within a day or two. Tell me what you are building and I
                will tell you honestly whether I am the right person for it.
              </p>
              {site.availability.open ? (
                <p className="mt-4 text-[1rem] text-ink-muted">
                  <span className="font-medium text-ink">
                    {site.availability.label}.
                  </span>{" "}
                  {site.availability.detail}. Based in {site.location},
                  comfortable working remote across European time zones.
                </p>
              ) : null}
            </Reveal>

            <Reveal className="mt-10 flex flex-col gap-3 sm:flex-row" delay={240}>
              <a
                href={site.links.linkedin}
                target="_blank"
                rel="noreferrer noopener"
                className="press group inline-flex items-center justify-between gap-8 rounded-full bg-accent px-6 py-3.5 text-[1rem] font-medium text-accent-ink transition-colors duration-200"
              >
                Message me on LinkedIn
                <span className="transition-transform duration-200 ease-out group-hover:translate-x-0.5">
                  ↗
                </span>
              </a>
              <a
                href={`mailto:${site.email}`}
                className="press group inline-flex items-center justify-between gap-8 rounded-sm border border-rule-strong px-6 py-3.5 text-[1rem] font-medium transition-colors duration-200 hover:border-ink"
              >
                Email instead
                <span className="transition-transform duration-200 ease-out group-hover:translate-x-0.5">
                  →
                </span>
              </a>
            </Reveal>

            {/*
              Content-width strip: equal `lg:grid-cols-4` left a hole between the
              short CV label and the long ORCID id. Auto columns + `w-fit` pack
              the four cells and shrink the top rule to match.
            */}
            <Reveal
              className="mt-12 grid w-fit max-w-full gap-x-8 gap-y-px border-t border-rule sm:grid-cols-2 lg:grid-cols-[repeat(4,auto)]"
              stagger={60}
            >
              <ContactRow label="LinkedIn" value="jan-bancerewicz" href={site.links.linkedin} />
              <ContactRow label="GitHub" value="JanBancerewicz" href={site.links.github} />
              <ContactRow label="CV" value="Download PDF" href={site.links.cv} />
              <ContactRow
                label="ORCID"
                value="0009-0001-3898-5576"
                href={site.links.orcid}
                mono
              />
            </Reveal> 
          </div>

          <div className="md:col-span-5">
            <Terminal />
          </div>
        </div>
      </Container>
    </section>
  );
}

function ContactRow({
  label,
  value,
  href,
  mono = false,
}: {
  label: string;
  value: string;
  href: string;
  /** Set an identifier rather than a name — mono, tabular, never broken. */
  mono?: boolean;
}) {
  const external = href.startsWith("http");

  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noreferrer noopener" } : {})}
      className="group flex items-baseline justify-between gap-3 border-b border-rule py-4 sm:flex-col sm:items-start sm:gap-2 sm:border-b-0"
    >
      <span className="label">{label}</span>
      <span
        className={`whitespace-nowrap text-ink-muted transition-colors duration-200 group-hover:text-ink ${
          mono
            ? "font-mono text-[0.875rem] tabular-nums"
            : "text-[1rem]"
        }`}
      >
        <span className="link-wipe">{value}</span>
      </span>
    </a>
  );
}

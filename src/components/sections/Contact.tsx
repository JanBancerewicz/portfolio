import { site } from "../../data/site";
import { Reveal } from "../motion/Reveal";
import { SplitLines } from "../motion/SplitLines";
import { Container } from "../ui/Container";

/**
 * Shared by the homepage and every index page, so there is one contact block
 * in the repo rather than a copy per route. Only its section number changes.
 */
export function Contact({ index = "06" }: { index?: string }) {
  return (
    <section id="contact" className="scroll-mt-24 pt-28 md:pt-40">
      <Container>
        <div className="border-t border-rule-strong pt-3">
          <span className="label">
            {index} <span className="mx-1 text-rule-strong">/</span> Contact
          </span>
        </div>

        <div className="mt-12 grid gap-14 md:mt-16 md:grid-cols-12 md:gap-10">
          <div className="md:col-span-7">
            <SplitLines
              as="h2"
              className="display text-[clamp(2.5rem,7vw,5.5rem)]"
              step={80}
            >
              If any of this looks
              <br />
              like <em>your problem</em> —
              <br />
              say hello.
            </SplitLines>

            <Reveal className="mt-8 max-w-lg" delay={160}>
              <p className="text-[1.125rem] leading-relaxed text-ink-muted">
                The fastest way to reach me is LinkedIn — I read every message and
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
                className="press group inline-flex items-center justify-between gap-8 rounded-full border border-rule-strong px-6 py-3.5 text-[1rem] font-medium transition-colors duration-200 hover:border-ink"
              >
                Email instead
                <span className="transition-transform duration-200 ease-out group-hover:translate-x-0.5">
                  →
                </span>
              </a>
            </Reveal>

            <Reveal className="mt-12 grid gap-px border-t border-rule sm:grid-cols-3" stagger={60}>
              <ContactRow label="LinkedIn" value="jan-bancerewicz" href={site.links.linkedin} />
              <ContactRow label="GitHub" value="JanBancerewicz" href={site.links.github} />
              <ContactRow label="CV" value="Download PDF" href={site.links.cv} />
            </Reveal>
          </div>

          <div className="md:col-span-5">
            <BookACall />
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
}: {
  label: string;
  value: string;
  href: string;
}) {
  const external = href.startsWith("http");

  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noreferrer noopener" } : {})}
      className="group flex items-baseline justify-between gap-3 border-b border-rule py-4 sm:flex-col sm:items-start sm:gap-2 sm:border-b-0"
    >
      <span className="label">{label}</span>
      <span className="text-[1rem] text-ink-muted transition-colors duration-200 group-hover:text-ink">
        <span className="link-wipe">{value}</span>
      </span>
    </a>
  );
}

/**
 * Google Calendar appointment schedule. Renders the real widget once
 * `site.bookingEmbedUrl` is filled in, and an honest placeholder until then —
 * never a fake booking form.
 */
function BookACall() {
  return (
    <Reveal className="sticky top-24" delay={200}>
      <div className="rounded-sm border border-rule bg-paper-raised p-6 shadow-[var(--shadow-card)]">
        <div className="flex items-baseline justify-between gap-4 border-b border-rule pb-3">
          <h3 className="text-lg font-medium tracking-[-0.025em]">Book a call</h3>
          <span className="label">20 min</span>
        </div>

        <p className="mt-4 text-[1rem] leading-relaxed text-ink-muted">
          Prefer talking to typing? Grab a slot straight from my calendar — no
          back-and-forth, no agenda needed.
        </p>

        {site.bookingEmbedUrl ? (
          <div className="mt-5 overflow-hidden rounded-sm border border-rule">
            <iframe
              src={site.bookingEmbedUrl}
              title="Book a call — appointment scheduling"
              className="block h-[560px] w-full border-0"
              loading="lazy"
            />
          </div>
        ) : (
          <div className="mt-5 rounded-sm border border-dashed border-rule-strong bg-paper-sunken px-5 py-8 text-center">
            <p className="label">Calendar embed not configured</p>
            <p className="mx-auto mt-3 max-w-xs text-[0.9375rem] leading-relaxed text-ink-muted">
              Google Calendar → Appointment schedules → Share → Embed, then paste
              the iframe <code className="font-mono text-[0.8em]">src</code> into{" "}
              <code className="font-mono text-[0.8em]">bookingEmbedUrl</code> in{" "}
              <code className="font-mono text-[0.8em]">src/data/site.ts</code>.
            </p>
          </div>
        )}

        <p className="label mt-5">
          Timezone <span className="mx-1 text-rule-strong">/</span>{" "}
          {site.timezone}
        </p>
      </div>
    </Reveal>
  );
}

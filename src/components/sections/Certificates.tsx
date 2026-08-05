import { certificateGroups } from "../../data/certificates";
import { Reveal } from "../motion/Reveal";
import { Container } from "../ui/Container";

/**
 * The one section that does not use `SectionHeader`.
 *
 * Every other block on the page runs rule → eyebrow → lede → content, and six
 * repetitions of the same rhythm is what makes a page feel laid out by machine.
 * Here the masthead moves into a rail that stays put while the groups stream
 * past it — which also suits the content, since this is a list you scan rather
 * than read.
 */
export function Certificates() {
  const total = certificateGroups.reduce(
    (count, group) => count + group.items.length,
    0,
  );

  return (
    <section id="certifications" className="scroll-mt-24 pt-28 md:pt-40">
      <Container>
        <div className="border-t-2 border-ink pt-4 md:grid md:grid-cols-12 md:gap-10">
          <Reveal className="md:col-span-4">
            <div className="md:sticky md:top-28">
              <h2 className="section-eyebrow">
                <span className="section-eyebrow-index">03</span>
                <span className="mx-2 text-rule-strong">/</span>
                Certifications &amp; courses
              </h2>

              <p className="mt-6 max-w-sm text-[1.375rem] leading-snug tracking-[-0.02em] text-ink">
                Academic foundation, published research, and specialized coursework targeting deep learning, LLMs and software engineering.
              </p>

              <p className="label mt-6">
                {total} entries
                <span className="mx-2 text-rule-strong">/</span>
                {certificateGroups.length} sources
              </p>
            </div>
          </Reveal>

          <div className="mt-10 md:col-span-8 md:mt-0">
            {certificateGroups.map((group) => (
              <Reveal
                key={group.issuer}
                className="border-b border-rule pb-6 pt-6 first:pt-0"
                y={14}
              >
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="text-[1.25rem] font-medium tracking-[-0.025em]">
                    {group.issuer}
                  </h3>
                  <span className="label shrink-0">
                    {String(group.items.length).padStart(2, "0")}
                  </span>
                </div>
                <p className="label mt-1.5">{group.note}</p>

                <ul className="mt-4 grid gap-x-8 sm:grid-cols-2">
                  {group.items.map((item) => (
                    <li key={item.title} className="border-t border-rule">
                      <CertificateRow {...item} />
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

function CertificateRow({
  title,
  year,
  credentialUrl,
}: {
  title: string;
  year: string;
  credentialUrl?: string;
}) {
  const content = (
    <>
      <span className="text-[1rem] leading-snug text-ink-muted transition-colors duration-200 group-hover:text-ink">
        {title}
      </span>
      <span className="label shrink-0 pt-0.5">{year}</span>
    </>
  );

  if (!credentialUrl) {
    return (
      <div className="group flex items-start justify-between gap-4 py-3">
        {content}
      </div>
    );
  }

  return (
    <a
      href={credentialUrl}
      target="_blank"
      rel="noreferrer noopener"
      className="group flex items-start justify-between gap-4 py-3"
    >
      {content}
      <span aria-hidden="true" className="sr-only">
        opens in a new tab
      </span>
    </a>
  );
}

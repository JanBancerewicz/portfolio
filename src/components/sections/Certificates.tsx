import { certificateGroups } from "../../data/certificates";
import { Reveal } from "../motion/Reveal";
import { Container } from "../ui/Container";
import { SectionHeader } from "../ui/SectionHeader";

export function Certificates() {
  const total = certificateGroups.reduce(
    (count, group) => count + group.items.length,
    0,
  );

  return (
    <section id="certificates" className="scroll-mt-24 pt-28 md:pt-40">
      <Container>
        <SectionHeader
          index="03"
          title="Certificates &amp; Courses"
          lede={
            <>
              Coursework, published research and the certifications behind it —
              grouped by source so you can skip to the ones you care about.
            </>
          }
          aside={`${total} total`}
        />

        <Reveal className="grid gap-x-10 gap-y-12 md:grid-cols-2 lg:grid-cols-3" stagger={65}>
          {certificateGroups.map((group) => (
            <div key={group.issuer}>
              <div className="flex items-baseline justify-between gap-4 border-b border-rule-strong pb-2.5">
                <h3 className="text-lg font-medium tracking-[-0.025em]">
                  {group.issuer}
                </h3>
                <span className="label shrink-0">
                  {String(group.items.length).padStart(2, "0")}
                </span>
              </div>
              <p className="label mt-2.5">{group.note}</p>

              <ul className="mt-4">
                {group.items.map((item) => (
                  <li key={item.title} className="border-b border-rule">
                    <CertificateRow {...item} />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </Reveal>
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
    return <div className="group flex items-start justify-between gap-4 py-3">{content}</div>;
  }

  return (
    <a
      href={credentialUrl}
      target="_blank"
      rel="noreferrer noopener"
      className="group flex items-start justify-between gap-4 py-3"
    >
      {content}
    </a>
  );
}

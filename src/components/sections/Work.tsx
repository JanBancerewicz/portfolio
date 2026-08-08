import { Link } from "react-router-dom";
import { featuredProjects, projectEntries } from "../../content";
import type { ContentEntry } from "../../content/types";
import { CoverReveal } from "../motion/CoverReveal";
import { Reveal } from "../motion/Reveal";
import { Container } from "../ui/Container";
import { SectionHeader } from "../ui/SectionHeader";

export function Work() {
  // Only entries flagged `featured` in their MDX appear here; the rail on
  // /projects carries the full archive.
  const [lead, ...rest] = featuredProjects;
  if (!lead) return null;

  return (
    <section id="work" className="scroll-mt-24 pt-24 md:pt-24">
      <Container>
        <SectionHeader
          index="01"
          title="Selected work"
          lede={
            <>
              My flagship research and full-stack projects.
              Each breakdown highlights architectural decisions, real-world metrics, and key takeaways.
            </>
          }
          aside={
            <Link to="/projects" className="link-wipe text-ink">
              All {projectEntries.length} projects ↗
            </Link>
          }
        />

        <LeadProject entry={lead} />

        {/*
          Not a symmetric two-up. The order of `featuredProjects` is a ranking,
          so the columns are weighted 7/5 to say so, and the narrower card drops
          half a step to break the shared baseline. Odd cards past the first
          pair fall back to the wider slot.
        */}
        <div className="mt-16 grid gap-x-8 gap-y-14 md:mt-24 md:grid-cols-12 lg:gap-x-12">
          {rest.map((entry, index) => {
            const narrow = index % 2 === 1;
            return (
              <ProjectCard
                key={entry.meta.slug}
                entry={entry}
                index={index + 2}
                ratio="3 / 2"
                className={
                  narrow
                    ? "md:col-span-5 md:mt-14"
                    : "md:col-span-7"
                }
              />
            );
          })}
        </div>
      </Container>
    </section>
  );
}

function LeadProject({ entry }: { entry: ContentEntry }) {
  const { meta } = entry;

  return (
    <Link
      to={`/projects/${meta.slug}`}
      className="group block"
      aria-label={`Read the case study: ${meta.title}`}
    >
      <CoverReveal
        src={meta.coverFeatured ?? meta.cover}
        alt=""
        ratio="2 / 1"
        className="rounded-sm"
      />

      <Reveal className="mt-6 grid gap-6 md:grid-cols-12" delay={120}>
        <div className="md:col-span-7">
          <div className="label mb-3">
            01 <span className="mx-1 text-rule-strong">/</span> {meta.category}{" "}
            <span className="mx-1 text-rule-strong">/</span> {meta.date}
          </div>
          <h3 className="flex items-start gap-3 text-[clamp(2rem,5vw,3.5rem)] font-medium leading-[0.95] tracking-[-0.045em]">
            <span className="link-wipe">{meta.title}</span>
            <span className="mt-2 shrink-0 text-2xl text-accent transition-transform duration-300 ease-out group-hover:translate-x-1 group-hover:-translate-y-1">
              ↗
            </span>
          </h3>
        </div>

        <div className="md:col-span-5 md:pt-1">
          <p className="max-w-md text-ink-muted">{meta.summary}</p>
          <TagRow tags={meta.tags} className="mt-4" />
        </div>
      </Reveal>
    </Link>
  );
}

function ProjectCard({
  entry,
  index,
  ratio,
  className = "",
}: {
  entry: ContentEntry;
  index: number;
  ratio: string;
  className?: string;
}) {
  const { meta } = entry;

  return (
    <Link to={`/projects/${meta.slug}`} className={`group block ${className}`}>
      <CoverReveal src={meta.cover} alt="" ratio={ratio} className="rounded-sm" />

      <Reveal className="mt-5" delay={80}>
        <div className="label mb-2.5">
          {String(index).padStart(2, "0")}{" "}
          <span className="mx-1 text-rule-strong">/</span> {meta.category}{" "}
          <span className="mx-1 text-rule-strong">/</span> {meta.date}
        </div>
        <h3 className="flex items-start gap-2 text-2xl font-medium leading-tight tracking-[-0.035em] md:text-[1.75rem]">
          <span className="link-wipe">{meta.title}</span>
          <span className="shrink-0 text-base text-accent transition-transform duration-300 ease-out group-hover:translate-x-1 group-hover:-translate-y-1">
            ↗
          </span>
        </h3>
        <p className="mt-3 max-w-md text-[1rem] leading-relaxed text-ink-muted">
          {meta.summary}
        </p>
        <TagRow tags={meta.tags} className="mt-4" />
      </Reveal>
    </Link>
  );
}

export function TagRow({
  tags,
  className = "",
}: {
  tags: string[];
  className?: string;
}) {
  return (
    <ul className={`flex flex-wrap gap-x-2 gap-y-2 ${className}`}>
      {tags.map((tag) => (
        <li
          key={tag}
          className="label rounded-full border border-rule px-2.5 py-1 text-ink-muted"
        >
          {tag}
        </li>
      ))}
    </ul>
  );
}

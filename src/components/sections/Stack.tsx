import { techGroups } from "../../data/technologies";
import { Reveal } from "../motion/Reveal";
import { ContourField } from "../ui/ContourField";
import { Container } from "../ui/Container";
import { SectionHeader } from "../ui/SectionHeader";
import { TechIcon } from "../ui/TechIcon";

/**
 * The stack, as a plate of marks rather than a list of words.
 *
 * A comma-separated list of forty tool names is unreadable — nobody parses it,
 * they scan for the two things they came looking for. Marks are scannable at a
 * glance and the name sits underneath for anyone who needs it. Products carry
 * their logo; techniques carry a drawn diagram, so the row admits that "PyTorch"
 * and "Quantization" are not the same kind of noun.
 */
export function Stack() {
  const total = techGroups.reduce((count, group) => count + group.items.length, 0);

  return (
    <section id="stack" className="relative isolate scroll-mt-24 pt-28 md:pt-40">
      <ContourField seed={23} levels={14} intensity={0.02} />
      <Container>
        <SectionHeader
          index="06"
          title="Stack"
          lede={
            <>
              Technologies I reach for by default — tools I’ve trained models with, built pipelines around, and shipped to production.
            </>
          }
          aside={`${total} tools`}
        />

        <div className="border-t border-rule-strong">
          {techGroups.map((group) => (
            <div
              key={group.label}
              className="grid gap-y-5 border-b border-rule py-7 md:grid-cols-12 md:gap-8 md:py-9"
            >
              <div className="md:col-span-3">
                <h3 className="label text-ink">{group.label}</h3>
                <p className="label mt-1.5">
                  {String(group.items.length).padStart(2, "0")}
                </p>
              </div>

              <Reveal
                as="ul"
                className="grid grid-cols-2 gap-x-4 gap-y-5 sm:grid-cols-3 md:col-span-9 lg:grid-cols-4"
                stagger={35}
              >
                {group.items.map((item) => (
                  <li key={item} className="tech-mark group/tool flex items-center gap-3">
                    <TechIcon
                      label={item}
                      className="text-ink-faint transition-colors duration-200 group-hover/tool:text-ink"
                    />
                    <span className="text-[0.9375rem] leading-tight tracking-[-0.01em] text-ink-muted transition-colors duration-200 group-hover/tool:text-ink">
                      {item}
                    </span>
                  </li>
                ))}
              </Reveal>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

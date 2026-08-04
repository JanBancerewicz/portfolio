import { techGroups } from "../../data/technologies";
import { Reveal } from "../motion/Reveal";
import { Container } from "../ui/Container";
import { SectionHeader } from "../ui/SectionHeader";

export function Stack() {
  return (
    <section id="stack" className="scroll-mt-24 pt-28 md:pt-40">
      <Container>
        <SectionHeader
          index="05"
          title="Stack"
          lede={
            <>
              What I reach for by default. The list is short on purpose — these
              are the tools I have actually trained, shipped or deployed with, not
              everything I have opened once.
            </>
          }
        />

        <Reveal className="border-t border-rule" stagger={60}>
          {techGroups.map((group) => (
            <div
              key={group.label}
              className="grid gap-2 border-b border-rule py-5 md:grid-cols-12 md:gap-8 md:py-6"
            >
              <div className="label md:col-span-3 md:pt-1">{group.label}</div>
              <ul className="flex flex-wrap gap-x-6 gap-y-2 md:col-span-9">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="text-[1.125rem] tracking-[-0.02em] text-ink-muted transition-colors duration-200 hover:text-ink"
                  >
                    {item}
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

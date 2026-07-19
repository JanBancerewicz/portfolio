import { ExternalLink } from "lucide-react";
import { links } from "../../data/links";
import { Card } from "../ui/Card";
import { FogReveal } from "../ui/FogReveal";
import { SectionHeading } from "../ui/SectionHeading";

export function Links() {
  return (
    <section id="links" className="scroll-mt-28 py-20 sm:py-24">
      <FogReveal>
        <SectionHeading
          eyebrow="Elsewhere"
          title="Links"
          description="Simple external destinations for future GitHub, LinkedIn, email and CV links."
        />
      </FogReveal>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {links.map((link) => {
          const Icon = link.icon;

          return (
            <FogReveal key={link.label} delay={links.indexOf(link) * 90}>
              <Card className="p-0">
                <a
                  href={link.href}
                  className="flex h-full min-h-36 flex-col justify-between gap-5 p-5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300"
                >
                  <span className="flex items-center justify-between gap-3">
                    <span className="theme-surface inline-flex size-11 items-center justify-center rounded-2xl border border-cyan-300/20 bg-cyan-300/10 text-accent">
                      <Icon size={18} />
                    </span>
                    <ExternalLink size={16} className="shrink-0 text-subtle" />
                  </span>
                  <span>
                    <span className="block text-base font-semibold text-foreground transition-colors duration-300">
                      {link.label}
                    </span>
                    <span className="mt-2 block break-all font-mono text-xs leading-5 text-subtle transition-colors duration-300">
                      {link.caption}
                    </span>
                  </span>
                </a>
              </Card>
            </FogReveal>
          );
        })}
      </div>
    </section>
  );
}

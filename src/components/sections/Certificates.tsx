import { Award, CalendarDays, MoveRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { certificates } from "../../data/certificates";
import { Badge } from "../ui/Badge";
import { FogReveal } from "../ui/FogReveal";
import { SectionHeading } from "../ui/SectionHeading";

const toneClasses = {
  cyan: "from-cyan-300/20 via-blue-500/10 to-transparent border-cyan-300/25",
  violet:
    "from-violet-300/20 via-indigo-500/10 to-transparent border-violet-300/25",
  amber:
    "from-amber-300/20 via-orange-500/10 to-transparent border-amber-300/25",
  rose: "from-rose-300/20 via-fuchsia-500/10 to-transparent border-rose-300/25",
};

export function Certificates() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [sectionHeight, setSectionHeight] = useState(1400);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;

    if (!section || !track) {
      return;
    }

    const updateMetrics = () => {
      const availableWidth = section.clientWidth;
      const maxTranslate = Math.max(0, track.scrollWidth - availableWidth);
      setSectionHeight(window.innerHeight + maxTranslate + 260);
      updateScroll(maxTranslate);
    };

    const updateScroll = (knownMaxTranslate?: number) => {
      const maxTranslate =
        knownMaxTranslate ?? Math.max(0, track.scrollWidth - section.clientWidth);
      const rect = section.getBoundingClientRect();
      const maxScroll = Math.max(1, section.offsetHeight - window.innerHeight);
      const progress = Math.min(
        1,
        Math.max(0, Math.abs(Math.min(0, rect.top)) / maxScroll),
      );

      track.style.transform = `translate3d(${-maxTranslate * progress}px, 0, 0)`;
    };

    updateMetrics();

    const handleScroll = () => updateScroll();
    const handleResize = () => updateMetrics();

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <section
      id="certificates"
      ref={sectionRef}
      className="relative -mx-5 scroll-mt-0 sm:-mx-6 lg:-mx-8"
      style={{ height: sectionHeight }}
    >
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden px-5 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-7xl">
          <FogReveal>
            <SectionHeading
              eyebrow="Certificates"
              title="Horizontal Certificate Scroll"
              description="This section locks into a horizontal certificate rail while the page still scrolls vertically."
            />
          </FogReveal>

          <FogReveal delay={120}>
            <div className="theme-surface mb-6 inline-flex items-center gap-3 rounded-full border border-border bg-surface px-4 py-2 font-mono text-xs text-foreground-soft backdrop-blur-xl">
              <MoveRight size={15} className="text-accent" />
              vertical scroll drives the horizontal rail
            </div>
          </FogReveal>

          <div className="overflow-visible">
            <div
              ref={trackRef}
              data-cert-track
              className="flex w-max gap-5 transition-transform duration-75 ease-linear will-change-transform"
            >
              {certificates.map((certificate, index) => (
                <article
                  key={certificate.title}
                  className="theme-surface group relative h-[360px] w-[82vw] max-w-[420px] shrink-0 overflow-hidden rounded-[2rem] border border-border bg-surface p-6 shadow-[var(--shadow-elevated)] backdrop-blur-xl sm:w-[420px]"
                >
                  <div
                    aria-hidden="true"
                    className={`absolute inset-x-0 top-0 h-36 border-b bg-gradient-to-br ${toneClasses[certificate.tone]}`}
                  />
                  <div className="relative flex h-full flex-col">
                    <div className="flex items-start justify-between gap-4">
                      <div className="theme-surface inline-flex size-12 items-center justify-center rounded-2xl border border-border bg-surface-inset text-foreground">
                        <Award size={22} />
                      </div>
                      <span className="font-mono text-6xl font-semibold text-foreground/10">
                        0{index + 1}
                      </span>
                    </div>

                    <div className="mt-auto">
                      <div className="theme-surface mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-surface-inset px-3 py-1.5 font-mono text-[11px] text-foreground-soft">
                        <CalendarDays size={13} />
                        {certificate.date}
                      </div>
                      <h3 className="text-2xl font-semibold leading-tight text-foreground transition-colors duration-300">
                        {certificate.title}
                      </h3>
                      <p className="mt-3 text-sm text-muted transition-colors duration-300">
                        {certificate.issuer} / {certificate.status}
                      </p>
                      <div className="mt-6 flex flex-wrap gap-2">
                        {certificate.tags.map((tag) => (
                          <Badge key={tag} tone={certificate.tone}>
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

import { utils } from "animejs";
import { useEffect, useRef } from "react";

/**
 * Scroll position readout: a hairline bar pinned above the navigation.
 *
 * Constant, scroll-linked motion, so it is driven directly on `transform`
 * (never through a CSS variable on a parent, which forces a style recalc on
 * every child) and smoothed with a lerp so the bar glides rather than snapping
 * frame to frame.
 */
export function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;

    let current = 0;
    let target = 0;
    let frame = 0;

    // The loop runs only while the bar is catching up, then stops — a portfolio
    // page has no business holding a frame every 16ms when nothing is moving.
    const tick = () => {
      current += (target - current) * 0.18;

      if (Math.abs(target - current) < 0.0004) {
        current = target;
        bar.style.transform = `scaleX(${current})`;
        frame = 0;
        return;
      }

      bar.style.transform = `scaleX(${current})`;
      frame = requestAnimationFrame(tick);
    };

    const measure = () => {
      const scrollable =
        document.documentElement.scrollHeight - window.innerHeight;
      target = scrollable > 0 ? utils.clamp(window.scrollY / scrollable, 0, 1) : 0;
      if (!frame) frame = requestAnimationFrame(tick);
    };

    measure();
    current = target;
    bar.style.transform = `scaleX(${current})`;

    window.addEventListener("scroll", measure, { passive: true });
    window.addEventListener("resize", measure);

    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", measure);
      window.removeEventListener("resize", measure);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-rule/60"
    >
      <div
        ref={barRef}
        className="h-full origin-left bg-accent"
        style={{ transform: "scaleX(0)" }}
      />
    </div>
  );
}

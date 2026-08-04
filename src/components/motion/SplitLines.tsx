import { animate, splitText, stagger, utils } from "animejs";
import {
  createElement,
  useEffect,
  useRef,
  type ElementType,
  type ReactNode,
} from "react";
import { EASE_OUT, prefersReducedMotion } from "../../lib/motion";

/**
 * How far outside each line's box the clip mask is allowed to show, and how far
 * below its resting place a line starts.
 *
 * `.display` sets `line-height: 0.9`, but Inter Tight's glyphs span roughly
 * 1.21em — so descenders (p, y, g, j) and the taller ascenders sit *outside*
 * the line box that Anime.js clips to, and get sliced off mid-animation.
 * `overflow-clip-margin` widens the clip region without touching layout, which
 * is exactly the job; the travel then has to clear the widened region too, or a
 * sliver of the incoming line peeks below the mask before it starts moving.
 *
 * TRAVEL must stay above `1 + BLEED / line-height` — at 0.9 that is 1.39.
 */
const BLEED = "0.34em";
const TRAVEL = "155%";

type SplitLinesProps = {
  as?: ElementType;
  children: ReactNode;
  className?: string;
  delay?: number;
  /** ms between consecutive lines. */
  step?: number;
};

/**
 * Editorial headline reveal: Anime.js splits the heading into lines, wraps each
 * in a clipping mask, and slides them up from behind it. This is the one place
 * where motion is the point — it plays once, on first paint.
 *
 * Three details matter:
 *
 * - `splitText()` resolves asynchronously, so the animation is registered via
 *   `addEffect` rather than run against `split.lines` immediately — that array
 *   is still empty at call time.
 * - The split is torn down as soon as the intro finishes. Left in place it
 *   re-splits on every resize, wrapping the already-wrapped lines in another
 *   visually-hidden layer and collapsing the heading to zero height.
 * - Cleanup restores the original markup outright, because splitting an
 *   already-split heading (which React's double-invoked effects in development
 *   will happily try) causes the same collapse.
 */
/**
 * Widen each line's clip mask so glyphs that overhang the line box survive.
 * Browsers without `overflow-clip-margin` simply keep today's tight clip —
 * nothing about the layout depends on this.
 */
function loosenClipMasks(lines: HTMLElement[]) {
  for (const line of lines) {
    const mask = line.parentElement;
    if (mask) mask.style.overflowClipMargin = BLEED;
  }
}

export function SplitLines({
  as = "h1",
  children,
  className,
  delay = 0,
  step = 90,
}: SplitLinesProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (prefersReducedMotion()) {
      el.setAttribute("data-split-ready", "");
      return;
    }

    const original = el.innerHTML;
    let played = false;
    let restored = false;
    let split: ReturnType<typeof splitText> | undefined;

    const reveal = () => el.setAttribute("data-split-ready", "");

    // If the splitter never reports ready — a font that never resolves, an
    // observer that never fires — show the heading anyway rather than leaving
    // a hole in the page.
    const failsafe = window.setTimeout(reveal, 1500);

    const restore = () => {
      if (restored) return;
      restored = true;
      split?.revert();
      el.innerHTML = original;
    };

    // `splitText()` does its work asynchronously and `revert()` cannot cancel
    // a pass that has not run yet, so a mount/unmount/mount cycle (React's
    // double-invoked effects in development) would leave two splitters racing
    // over the same heading. Creating it a tick later means the teardown wins.
    const start = window.setTimeout(() => {
      split = splitText(el, { lines: { wrap: "clip" } });

      split.addEffect((self) => {
        if (played || !self.lines.length) {
          reveal();
          return;
        }
        played = true;

        loosenClipMasks(self.lines);

        // Apply the starting frame before unhiding, so the first painted frame
        // is the masked one rather than the finished headline.
        utils.set(self.lines, { opacity: 0, translateY: TRAVEL });
        reveal();

        return animate(self.lines, {
          translateY: [TRAVEL, "0%"],
          opacity: [0, 1],
          duration: 900,
          ease: EASE_OUT,
          delay: stagger(step, { start: delay }),
          // Defer a tick so the splitter is not torn down from inside its own
          // effect.
          onComplete: () => window.setTimeout(restore, 0),
        });
      });
    }, 0);

    return () => {
      window.clearTimeout(failsafe);
      window.clearTimeout(start);
      restore();
      el.removeAttribute("data-split-ready");
    };
  }, [delay, step]);

  return createElement(as, { ref, className, "data-split": "" }, children);
}

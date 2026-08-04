import { animate, onScroll, stagger } from "animejs";
import {
  createElement,
  useEffect,
  useRef,
  type ElementType,
  type ReactNode,
} from "react";
import {
  EASE_OUT,
  REVEAL_DURATION,
  REVEAL_STAGGER,
  prefersReducedMotion,
} from "../../lib/motion";

type RevealProps = {
  as?: ElementType;
  children: ReactNode;
  className?: string;
  /** Distance travelled on entry, in px. */
  y?: number;
  /** Delay before the animation starts, in ms. */
  delay?: number;
  duration?: number;
  /**
   * Stagger the element's direct children instead of the element itself.
   * Pass a number to override the per-item delay.
   */
  stagger?: boolean | number;
  id?: string;
};

/**
 * Reveal-on-scroll driven by Anime.js.
 *
 * The hidden starting state lives in CSS scoped to `html.js`, so pre-rendered
 * HTML stays fully visible when JavaScript never runs.
 */
export function Reveal({
  as = "div",
  children,
  className,
  y = 18,
  delay = 0,
  duration = REVEAL_DURATION,
  stagger: staggerItems = false,
  id,
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const grouped = staggerItems !== false;
    if (grouped && !el.children.length) return;
    const targets = grouped ? Array.from(el.children) : el;

    if (prefersReducedMotion()) {
      // Reduced motion still gets the content, just without the travel.
      const fade = animate(targets, {
        opacity: [0, 1],
        duration: 200,
        ease: "linear",
        autoplay: onScroll({ target: el, enter: "bottom-=48 top", repeat: false }),
      });
      return () => void fade.revert();
    }

    const step = typeof staggerItems === "number" ? staggerItems : REVEAL_STAGGER;

    const animation = animate(targets, {
      opacity: [0, 1],
      translateY: [y, 0],
      duration,
      ease: EASE_OUT,
      delay: grouped ? stagger(step, { start: delay }) : delay,
      autoplay: onScroll({ target: el, enter: "bottom-=72 top", repeat: false }),
    });

    return () => void animation.revert();
  }, [delay, duration, staggerItems, y]);

  return createElement(
    as,
    {
      ref,
      id,
      className,
      ...(staggerItems === false
        ? { "data-reveal": "" }
        : { "data-reveal-children": "" }),
    },
    children,
  );
}

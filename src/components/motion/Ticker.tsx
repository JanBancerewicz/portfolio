import { animate, onScroll, utils } from "animejs";
import { useEffect, useRef } from "react";
import { EASE_OUT, prefersReducedMotion } from "../../lib/motion";

type TickerProps = {
  value: number;
  suffix?: string;
  className?: string;
};

/** Digits rolling up to a value when the stat scrolls into view. */
export function Ticker({ value, suffix = "", className }: TickerProps) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (prefersReducedMotion()) {
      el.textContent = `${value}${suffix}`;
      return;
    }

    const state = { n: 0 };
    const animation = animate(state, {
      n: value,
      duration: 1100,
      ease: EASE_OUT,
      onUpdate: () => {
        el.textContent = `${utils.round(state.n, 0)}${suffix}`;
      },
      autoplay: onScroll({ target: el, enter: "bottom-=48 top", repeat: false }),
    });

    return () => void animation.revert();
  }, [suffix, value]);

  return (
    <span ref={ref} className={className}>
      {value}
      {suffix}
    </span>
  );
}

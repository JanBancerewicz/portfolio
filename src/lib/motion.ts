/**
 * Motion primitives.
 *
 * Curves and durations follow the design-engineering standards in
 * `.claude/skills/emil-design-eng`: strong custom curves (the built-in CSS
 * easings are too weak), ease-out for anything entering, sub-300ms for UI
 * feedback, longer only for editorial/explanatory motion.
 */

import { cubicBezier } from "animejs";

/** Mirrors `--ease-out` / `--ease-in-out` in index.css. */
export const EASE_OUT = cubicBezier(0.23, 1, 0.32, 1);
export const EASE_IN_OUT = cubicBezier(0.77, 0, 0.175, 1);

/** Editorial reveals are allowed to be slower than UI feedback. */
export const REVEAL_DURATION = 720;
/** Stagger between grouped items — 30-80ms; longer feels sluggish. */
export const REVEAL_STAGGER = 55;

export function prefersReducedMotion() {
  if (typeof window === "undefined" || !window.matchMedia) return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function canHover() {
  if (typeof window === "undefined" || !window.matchMedia) return false;
  return window.matchMedia("(hover: hover) and (pointer: fine)").matches;
}

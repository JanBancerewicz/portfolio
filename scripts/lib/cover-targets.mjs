/**
 * Cover generator config — source of truth for title / tag / bg / accent.
 * MDX only imports the emitted SVG files; regenerate after editing.
 *
 * Shared fields: dir, coverTitle, category, tag, bg, muteChannel, accent
 * Project-only: extras may include "featured" (+ always get poster)
 * Blog: always emit standard + wide
 *
 * muteChannel: "" | "r"|"g"|"b" | combos "rg"|"rb"|"gb"|"rgb"
 */

/** @typedef {"featured"} ProjectExtra */

/**
 * @type {Array<{
 *   dir: string,
 *   coverTitle: string,
 *   category: string,
 *   tag: string,
 *   bg: string,
 *   muteChannel?: string,
 *   accent?: string,
 *   extras?: ProjectExtra[],
 * }>}
 */
export const projectTargets = [
  {
    dir: "src/content/projects/hrv-mobile-ml",
    coverTitle: "HRV on a Phone",
    category: "Applied ML",
    tag: "PPG",
    bg: "vision",
    muteChannel: "b",
    accent: "mint",
    extras: ["featured"],
  },
  {
    dir: "src/content/projects/core-llm-comments",
    coverTitle: "CORE Comments",
    category: "LLM interpretability",
    tag: "CORE",
    bg: "datacenter",
    muteChannel: "r",
    accent: "purple",
    extras: ["featured"],
  },
  {
    dir: "src/content/projects/qwen-vl-angiography",
    coverTitle: "Qwen for Angio",
    category: "Vision-language",
    tag: "VLM",
    bg: "tokens",
    muteChannel: "b",
    accent: "blue",
    extras: ["featured"],
  },
  {
    dir: "src/content/projects/shelf-vision-pipeline",
    coverTitle: "Shelf Vision",
    category: "Computer vision",
    tag: "CV",
    bg: "graph",
    muteChannel: "g",
    accent: "orange",
  },
  {
    dir: "src/content/projects/jetson-yolo-boat",
    coverTitle: "Boat Vision",
    category: "Edge AI",
    tag: "YOLO",
    bg: "flowchart",
    muteChannel: "b",
    accent: "gold",
  },
  {
    dir: "src/content/projects/pricepoint",
    coverTitle: "Price Point",
    category: "Product",
    tag: "PRICE",
    bg: "graph",
    muteChannel: "",
    accent: "red",
  },
];

/**
 * @type {Array<{
 *   dir: string,
 *   coverTitle: string,
 *   category: string,
 *   tag: string,
 *   bg: string,
 *   muteChannel?: string,
 *   accent?: string,
 * }>}
 */
export const blogTargets = [
  {
    dir: "src/content/blog/reduce-claude-code-token-usage",
    coverTitle: "Cut Token Cost",
    category: "LLM tooling",
    tag: "CACHE",
    bg: "tokens",
    muteChannel: "bg",
    accent: "orange",
  },
  {
    dir: "src/content/blog/what-comments-do-to-a-model",
    coverTitle: "What Comments Do",
    category: "LLM interpretability",
    tag: "PROBE",
    bg: "neural",
    muteChannel: "r",
    accent: "purple",
  },
  {
    dir: "src/content/blog/beating-a-baseline-honestly",
    coverTitle: "Beat the Baseline",
    category: "Machine learning",
    tag: "EVAL",
    bg: "signal",
    muteChannel: "g",
    accent: "mint",
  },
  {
    dir: "src/content/blog/what-a-hackathon-actually-teaches-you",
    coverTitle: "What Not to Build",
    category: "Notes",
    tag: "BUILD",
    bg: "cogwheel",
    muteChannel: "gbr",
    accent: "blue",
  },
];

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

/*
* WALLPAPER_IDS = [
*   "silk",
*   "orbs",
*   "facets",
*   "drapery",
*   "signal",
*   "techgrid",
*   "webpage",
*   "neural",
*   "tokens",
*   "code",
*   "genai",
*   "medical",
*   "finance",
*   "cogwheel",
*   "mesh",
*   "topo",
*   "bloom",
*   "graph",
*   "vision",
*   "flowchart",
*   "datacenter",
];*/

// ACCENTS = { blue, purple, orange, mint, gold, red, berry, coral};


export const projectTargets = [
  {
    dir: "src/content/projects/hrv-mobile-ml",
    coverTitle: "HRV on a Phone",
    category: "Applied ML",
    tag: "PPG",
    bg: "medical",
    muteChannel: "rb",
    accent: "red",
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
    coverTitle: "Qwen-VL for Angiography",
    category: "Vision-language",
    tag: "Segmentation",
    bg: "neural",
    muteChannel: "g",
    accent: "mint",
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
    dir: "src/content/projects/code-analysis-tool",
    coverTitle: "Code Reviewer Plugin",
    category: "Code Parsing",
    tag: "Graph Analysis",
    bg: "graph",
    muteChannel: "gb",
    accent: "gold",
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
    category: "LLM Tooling",
    tag: "Claude Code",
    bg: "tokens",
    muteChannel: "bg",
    accent: "orange",
  },
  {
    dir: "src/content/blog/what-quantization-really-is",
    coverTitle: "Quantization Explained",
    category: "Performance Optimization",
    tag: "LLM",
    bg: "neural",
    muteChannel: "g",
    accent: "blue",
  },
  {
    dir: "src/content/blog/how-to-debug-python-like-a-pro",
    coverTitle: "Learn Python Debugging",
    category: "Notes",
    tag: "Python",
    bg: "cogwheel",
    muteChannel: "rg",
    accent: "gold",
  },
];

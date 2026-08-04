/**
 * Boxes for the hero's mock object-detection overlay.
 *
 * Coordinates are fractions of the hero image, traced from the marked-up
 * reference: `x`/`y` is the top-left corner, `w`/`h` the size. Re-crop the
 * artwork in `scripts/generate-hero-mosaic.mjs` and these need re-measuring.
 */

export type Detection = {
  id: string;
  /** COCO-style class name, as a detector would print it. */
  label: string;
  confidence: number;
  x: number;
  y: number;
  w: number;
  h: number;
  /** The one box that gets the accent treatment and the extra read-out. */
  primary?: boolean;
  /** Which corner the label tag hangs off. */
  tag?: "top-left" | "bottom-left" | "top-right";
};

export const detections: Detection[] = [
  {
    id: "person",
    label: "person",
    confidence: 0.99,
    x: 0.3831,
    y: 0.1155,
    // The marked box runs past the bottom of the crop; clamped to the frame.
    w: 0.2488,
    h: 0.8845,
    primary: true,
    tag: "top-left",
  },
  {
    id: "boat-yacht",
    label: "boat",
    confidence: 0.94,
    x: 0.6476,
    y: 0.5038,
    w: 0.0863,
    h: 0.1046,
    tag: "top-right",
  },
  {
    id: "boat-marina-near",
    label: "boat",
    confidence: 0.88,
    x: 0.3194,
    y: 0.5804,
    w: 0.0698,
    h: 0.1189,
    tag: "top-left",
  },
  {
    id: "boat-marina-far",
    label: "boat",
    confidence: 0.81,
    x: 0.2677,
    y: 0.6224,
    w: 0.069,
    h: 0.0734,
    // Sits under its neighbour so the two labels do not collide.
    tag: "bottom-left",
  },
  {
    id: "boat-foreground",
    label: "boat",
    confidence: 0.76,
    x: 0.0726,
    y: 0.8391,
    w: 0.2032,
    h: 0.1447,
    tag: "top-left",
  },
];

/**
 * The "class attributes" the detector prints for the person box.
 * Keep them short; they are read at a glance, not studied.
 */
export const personTraits = [
  "llm interpretability",
  "computer vision",
  "software engineering",
  "competitive programming",
];

export const personClass = "developer";

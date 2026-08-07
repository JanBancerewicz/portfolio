/**
 * Glyphs for stack entries that have no logo, because they are techniques
 * rather than products — and for the few vendors whose marks `simple-icons`
 * does not carry.
 *
 * Drawn as line diagrams on a 24×24 grid, deliberately unlike the solid brand
 * marks they sit beside: a logo and a method are different kinds of thing, and
 * the row reads better when the drawing says so. Each glyph tries to be the
 * diagram someone would sketch on a whiteboard to explain the term.
 */

export type ConceptIcon = {
  /** What the drawing depicts, for the tooltip and screen readers. */
  title: string;
  /** Stroked paths on a 24×24 viewBox. */
  paths: string[];
};

export const conceptIcons: Record<string, ConceptIcon> = {
  SQL: {
    title: "SQL — relational store",
    paths: [
      "M4 6c0-1.7 3.6-3 8-3s8 1.3 8 3v12c0 1.7-3.6 3-8 3s-8-1.3-8-3z",
      "M4 6c0 1.7 3.6 3 8 3s8-1.3 8-3",
      "M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3",
    ],
  },

  YOLO: {
    title: "YOLO — object detection box",
    paths: [
      "M3 8V4h4",
      "M17 4h4v4",
      "M21 16v4h-4",
      "M7 20H3v-4",
      "M12 9.5v5",
      "M9.5 12h5",
    ],
  },

  "LoRA/PEFT": {
    title: "LoRA — low-rank adaptation",
    paths: [
      // Frozen weight matrix, plus the two thin factors that ride alongside it.
      "M3 4h11v11H3z",
      "M17.5 4h3.5v11h-3.5z",
      "M3 18.5h18V21H3z",
    ],
  },

  Quantization: {
    title: "Quantization — continuous signal, discretised",
    paths: [
      "M3 17c4 0 5-10 9-10s5 7 9 7",
      "M3 17h4v-6h4v3h4v3h6",
    ],
  },

  "RAG Systems": {
    title: "Retrieval-augmented generation",
    paths: [
      "M3 3h7l3 3v9H3z",
      "M6 8h4",
      "M6 11h4",
      "M17 11.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0z",
      "M16.4 14.4 21 19",
    ],
  },

  "LLM Interpretability": {
    title: "Interpretability — probing inside the layers",
    paths: [
      "M3 4h13",
      "M3 8.5h13",
      "M3 13h9",
      "M3 17.5h9",
      "M20.5 14a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0z",
      "M19.6 16.6 22 19",
    ],
  },

  "Multimodal / VLMs": {
    title: "Multimodal — vision and language together",
    paths: [
      "M2 8.5c3-4 7-4 10 0-3 4-7 4-10 0z",
      "M8.4 8.5a1.4 1.4 0 1 1-2.8 0 1.4 1.4 0 0 1 2.8 0z",
      "M14 15h8",
      "M14 19h5",
      "M14 5h8",
    ],
  },

  "Computer Vision": {
    title: "Computer vision — lens aperture",
    paths: [
      "M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z",
      "M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0z",
      "M12 3v6",
      "M12 15v6",
      "M3 12h6",
      "M15 12h6",
    ],
  },

  "Signal Processing": {
    title: "Signal processing — waveform",
    paths: [
      "M1.5 12c2-8 4 8 6 0s4 8 6 0 4 8 6 0",
      "M1.5 20h21",
    ],
  },

  "Model Optimization": {
    title: "Optimisation — loss coming down",
    paths: [
      "M3 3v18h18",
      "M6 6c6 0 5 11 14 12",
      "M17 18.5l3 .5-.5-3",
    ],
  },

  AWS: {
    title: "AWS — cloud infrastructure",
    paths: [
      "M7.5 19a4.5 4.5 0 0 1-.4-9 6 6 0 0 1 11.4 1.6A3.9 3.9 0 0 1 17.5 19z",
    ],
  },

  LlamaIndex: {
    title: "LlamaIndex — indexed retrieval tree",
    paths: [
      "M14 5a2 2 0 1 1-4 0 2 2 0 0 1 4 0z",
      "M8 19a2 2 0 1 1-4 0 2 2 0 0 1 4 0z",
      "M20 19a2 2 0 1 1-4 0 2 2 0 0 1 4 0z",
      "M12 7v5",
      "M6 17v-3h12v3",
    ],
  },

  "REST API": {
    title: "REST API — expose / share",
    paths: [
      // Classic share network: three nodes, zig-zag links (the USB-ish mark).
      "M18 5.5a2 2 0 1 1-4 0 2 2 0 0 1 4 0z",
      "M8.5 12a2 2 0 1 1-4 0 2 2 0 0 1 4 0z",
      "M18 18.5a2 2 0 1 1-4 0 2 2 0 0 1 4 0z",
      "M8.9 10.7 14.1 6.7",
      "M8.9 13.3 14.1 17.3",
    ],
  },
};

export type Hackathon = {
  name: string;
  organiser: string;
  date: string;
  /** Short enough to sit on one line — "1st place", "Finalist", "Top 10". */
  result: string;
  /** Set on genuine wins; drives the accent treatment in the list. */
  highlight?: boolean;
  role: string;
  what: string;
  tags: string[];
  href?: string;
};

export const hackathons: Hackathon[] = [
  {
    name: "EU Critical Infrastructure Hackathon",
    organiser: "Gdańsk",
    date: "Jan 2026",
    result: "1st place — Energy & Offshore",
    highlight: true,
    role: "ML & backend",
    what: "We added a security layer over telemetry from PV inverters, flagging manipulated readings before they reach the operator. Judged by an international panel of industry experts and investors, and we are still developing it.",
    tags: ["Anomaly detection", "Energy", "Python"],
  },
  {
    name: "Neurohackathon HoTB",
    organiser: "Wrocław — the largest neuroscience hackathon in Poland",
    date: "Nov 2025",
    result: "2nd place",
    highlight: true,
    role: "Signal processing & modelling",
    what: "Raw EEG from an 8-channel headband, per-channel frequency and brain-activity features, and a classifier that read emotional state in real time — end to end inside the event.",
    tags: ["EEG", "Realtime ML", "Feature engineering"],
  },
  {
    name: "AMPPZ — Polish Collegiate Programming Contest",
    organiser: "Representing Gdańsk University of Technology",
    date: "2024 & 2025",
    result: "#1 in Pomerania, #3 in 2025",
    highlight: true,
    role: "Team contestant",
    what: "#1 regionally and #34 nationally in 2024, then #3 regionally and #55 nationally in 2025. Competitive programming is where the rest of this got its speed; the next edition is November 2026.",
    tags: ["C++", "Algorithms", "Team of 3"],
  },
  {
    name: "Hackology II",
    organiser: "Lublin",
    date: "May 2026",
    result: "Shipped a full pipeline",
    role: "Computer vision",
    what: "A four-stage pipeline for retail shelf product recognition: YOLO detection, embedding-based retrieval, heuristic reranking, then contextual reranking — scored on COCO-format boxes at mAP@0.5.",
    tags: ["YOLO", "Embeddings", "Reranking"],
  },
  {
    name: "HackYeah",
    organiser: "Poland's largest stationary hackathon",
    date: "2025",
    result: "Solo debut, high score",
    role: "Solo",
    what: "My first hackathon, entered alone and scored well enough to be worth doing again. Everything above followed from it.",
    tags: ["Solo", "24h"],
  },
];

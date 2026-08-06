export type Hackathon = {
  name: string;
  organiser: string;
  date: string;
  /** Short enough to sit on one line — "1st place", "Finalist", "Top 10". */
  result: string;
  /** Podium / win — drives the section aside count, not styling. */
  win?: boolean;
  /** Accent treatment on the result line; independent of whether it was a win. */
  highlight?: boolean;
  role: string;
  what: string;
  tags: string[];
  href?: string;
};

export const hackathons: Hackathon[] = [
  {
    name: "AMPPZ – Polish Collegiate Programming Contest (2x)",
    organiser: "Warsaw – University of Warsaw",
    date: "Nov 2024 & 2025",
    result: "34th nationally in 2024",
    win: false,
    highlight: true,
    role: "Representing Gdańsk University of Technology",
    // what: "Representing Gdańsk Tech at Poland’s collegiate programming contest (ICPC) since 2024, placing #34 nationally in 2024 and #55 in 2025. As President of the Sfera PG Algorithmic Club, I lead team training in advanced algorithms, complex data structures, and high-pressure problem-solving in C++.",
    what: "Representing my university in the Polish collegiate programming contest (ICPC) since 2024, placing #34 nationally in 2024 and #55 in 2025 (out of ~80 teams). \u00A0 As President of the Sfera PG Algorithmic Club, I lead team training in advanced algorithms, complex data structures, and high-pressure problem-solving in C++.",
    tags: ["Algorithms & Data Structures", "ICPC","C++"],
    href: "https://amppz.edu.pl/"
  },
  {
    name: "EU Critical Infrastructure Hackathon",
    organiser: "Gdańsk – Gdańsk Science and Technology Park",
    date: "Jan 2026",
    result: "1st place",
    win: true,
    highlight: true,
    role: "Energy & Offshore category",
    what: "Engineered a security layer for PV inverters, insulating critical grid infrastructure from remote cyberattacks through real-time anomaly detection for remote control. Evaluated and awarded 1st place by an international jury of industry experts.",
    tags: ["Cybersecurity", "Energy", "Modbus32", "Embedded", "React Native"],
    href: "https://criticalhackathon.com/"
  },
  {
    name: "Heroes of the Brain – Neurohackathon",
    organiser: "Wrocław – Wrocław University of Science and Technology",
    date: "Nov 2025",
    result: "2nd place",
    win: true,
    highlight: true,
    role: "Signal processing & modelling",
    what: "Developed AuraCloud, a Brain-Computer Interface translating raw 8-channel EEG into a continuous three-dimensional emotional space (PAD model) and an automated stimulus path using OASIS dataset to actively guide user mood.",
    tags: ["BCI", "EEG", "Signal Processing", "Dash", "Python"],
    href: "https://heroesofthebrain.pwr.edu.pl/"
  },
  {
    name: "Hackology II – AI Hackathon",
    organiser: "Lublin – Lublin University of Technology",
    date: "May 2026",
    result: "Shipped a full pipeline",
    role: "Computer vision & Object Detection",
    what: "Built a 369-class retail product detection pipeline evaluated on mAP@0.5. Combined YOLO and RF-DETR detection with embedding-based retrieval and multi-step reranking to identify products on dense store shelves.",
    tags: ["Computer Vision", "YOLO", "RF-DETR", "Machine Learning","Python"],
    href: "https://hackology.com.pl/"
  },
  {
    name: "HackYeah",
    organiser: "Kraków – Tauron Arena",
    date: "Oct 2025",
    result: "Solo debut, high score",
    role: "Biohacking Category",
    // what: "My first hackathon! I built StressLess – a real-time mobile biofeedback app measuring heart rate and HRV metrics (RMSSD, SDNN, pNN20) directly via smartphone camera PPG. Integrated an LLM pipeline to analyze physiological signals alongside user context, delivering personal stress analysis and biohacking insights.",
    what: "My first hackathon! I built StressLess – a mobile biofeedback app measuring heart rate and HRV via smartphone camera PPG. Combined biometric signals with an LLM pipeline to deliver real-time stress analysis and biohacking insights.",
    tags: ["Android", "Signal Processing", "LLM API", "Java"],
    href: "https://hackyeah.pl/pl/"
  },
];

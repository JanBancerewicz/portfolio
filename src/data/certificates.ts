export type Certificate = {
  title: string;
  year: string;
  credentialUrl?: string;
};

export type CertificateGroup = {
  /** The issuing body — certificates are grouped by source. */
  issuer: string;
  /** Short note on what this issuer's track covers. */
  note: string;
  items: Certificate[];
};

export const certificateGroups: CertificateGroup[] = [
  {
    issuer: "Gdańsk University of Technology",
    note: "BSc Computer Science, final year, 4.41 GPA",
    items: [
      { title: "Bachelor's thesis — defending 2026", year: "2026" },
      { title: "Gradient PG - AI & Machine Learning Science Club — Board Member", year: "2025" },
      { title: "Sfera PG - Algorithmic & Competitive Programming Club — President", year: "2024" },
    ],
  },
  {
    issuer: "Research & programmes",
    note: "Published and peer-reviewed work",
    items: [
      {
        title: "CORE: Comments as a Reasoning — Gradient PG Science Club (Paper in-progress)",
        year: "2026",
        credentialUrl:
          "https://journal.mostwiedzy.pl/TASKQuarterly/article/view/3699",
      },
      {
        title: "Analysis of HRV Using Mobile Devices and Machine Learning — TASK Quarterly",
        year: "2026",
        credentialUrl:
          "https://journal.mostwiedzy.pl/TASKQuarterly/article/view/3699",
      },
      { title: "Europe AI Summer Research programme - participant (Edition in-progress)", year: "2026" },
    ],
  },
  {
    issuer: "DeepLearning.AI / Coursera",
    note: "Deep learning and LLM specialisations",
    items: [
      { title: "PLACEHOLDER — Deep Learning Specialization", year: "2025" },
      { title: "PLACEHOLDER — Generative AI with LLMs", year: "2025" },
      { title: "PLACEHOLDER — Machine Learning Specialization", year: "2024" },
    ],
  },
  {
    issuer: "NVIDIA Deep Learning Institute",
    note: "Applied deep learning and edge inference",
    items: [
      { title: "PLACEHOLDER — Fundamentals of Deep Learning", year: "2025" },
      { title: "PLACEHOLDER — Getting Started with Jetson Nano", year: "2025" },
    ],
  },
  {
    issuer: "Microsoft",
    note: "Cloud and AI platform fundamentals",
    items: [
      { title: "PLACEHOLDER — Azure AI Fundamentals (AI-900)", year: "2025" },
      { title: "PLACEHOLDER — Azure Fundamentals (AZ-900)", year: "2024" },
    ],
  },
  {
    issuer: "Cisco Networking Academy",
    note: "Systems and Python foundations",
    items: [
      { title: "PLACEHOLDER — Python Essentials 1 & 2", year: "2023" },
      { title: "PLACEHOLDER — CCNA: Introduction to Networks", year: "2023" },
    ],
  },
];

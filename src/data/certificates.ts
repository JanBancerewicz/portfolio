export type Certificate = {
  title: string;
  issuer: string;
  date: string;
  status: string;
  tags: string[];
  tone: "cyan" | "violet" | "amber" | "rose";
};

export const certificates: Certificate[] = [
  {
    title: "Certificate Placeholder 01",
    issuer: "Issuer placeholder",
    date: "2026",
    status: "Planned",
    tags: ["frontend", "react"],
    tone: "cyan",
  },
  {
    title: "Certificate Placeholder 02",
    issuer: "Issuer placeholder",
    date: "2026",
    status: "In progress",
    tags: ["typescript", "web"],
    tone: "violet",
  },
  {
    title: "Certificate Placeholder 03",
    issuer: "Issuer placeholder",
    date: "2025",
    status: "Placeholder",
    tags: ["python", "data"],
    tone: "amber",
  },
  {
    title: "Certificate Placeholder 04",
    issuer: "Issuer placeholder",
    date: "2025",
    status: "Placeholder",
    tags: ["ai", "models"],
    tone: "rose",
  },
  {
    title: "Certificate Placeholder 05",
    issuer: "Issuer placeholder",
    date: "2025",
    status: "Placeholder",
    tags: ["cloud", "tools"],
    tone: "cyan",
  },
  {
    title: "Certificate Placeholder 06",
    issuer: "Issuer placeholder",
    date: "2024",
    status: "Placeholder",
    tags: ["backend", "api"],
    tone: "violet",
  },
  {
    title: "Certificate Placeholder 07",
    issuer: "Issuer placeholder",
    date: "2024",
    status: "Placeholder",
    tags: ["mobile", "android"],
    tone: "amber",
  },
  {
    title: "Certificate Placeholder 08",
    issuer: "Issuer placeholder",
    date: "2024",
    status: "Placeholder",
    tags: ["devops", "docker"],
    tone: "rose",
  },
];

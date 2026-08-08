/**
 * Commercial experience, newest first.
 *
 * Real company marks live in `src/assets/logos/` (transparent PNGs). When
 * `logo` is set, `LogoPlate` renders the image and keeps the same hover sheen
 * / shadow swing as the wordmark fallback.
 */

import ergoHestiaLogo from "../assets/logos/ErgoHestia.png";
import energaOperatorLogo from "../assets/logos/EnergaOperator.png";

export type Experience = {
  company: string;
  /** Wordmark split so the first part can carry weight, as most logotypes do. */
  wordmark: { lead: string; tail: string };
  role: string;
  /** ISO `YYYY-MM`. `end: null` means the role is current. */
  start: string;
  end: string | null;
  location: string;
  points: string[];
  stack: string[];
  /** Optional imported image. When set, it replaces the wordmark plate. */
  logo?: string;
  /** Company site — makes the logo plate an outbound link. */
  href?: string;
};

export const experience: Experience[] = [
  {
    company: "ERGO Hestia S.A.",
    wordmark: { lead: "ERGO", tail: "Hestia" },
    logo: ergoHestiaLogo,
    href: "https://www.ergohestia.pl/",
    role: "Data & Software Engineering Intern",
    start: "2026-01",
    end: null,
    location: "Sopot",
    points: [
      "Working in the Pricing department, I develop and maintain PricePoint, the insurance premium calculation system that takes over 200,000 requests a day.",
      "Designed and hosted cloud pipelines on Azure Databricks, developing a translator to convert Earnix risk formulas into scikit-learn prediction models.",
      "Delivered features through a CI/CD workflow, collaborating with the team on iterative deployments.",
    ],
    stack: [
      "Python",
      "SQL",
      "Azure",
      "Databricks",
      "Dynatrace",
      "Git",
      "Agile",
    ],
  },
  {
    company: "Energa Operator S.A.",
    wordmark: { lead: "Energa", tail: "Operator" },
    logo: energaOperatorLogo,
    href: "https://energa-operator.pl/",
    role: "IT Department Intern — DevOps & systems administration",
    start: "2025-07",
    end: "2025-12",
    location: "Gdańsk",
    points: [
      "Administered OT infrastructure across a fleet of 90 virtualized servers, managing VMs and system configurations on both Windows and Linux.",
      "Developed automation scripts in PowerShell and Bash to handle server monitoring, alerting, and backup processes.",
      "Gained hands-on experience with DevOps tasks: deployment, monitoring, and keeping systems up.",

    ],
    stack: [
      "Hyper-V",
      "PowerShell",
      "Bash",
      "Linux",
      "Windows",
      "Azure",
      "Vim",
    ],
  },
];

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

function parse(iso: string) {
  const [year, month] = iso.split("-").map(Number);
  return { year, month };
}

/** "Jan 2026 — present" / "Jul — Dec 2025". */
export function formatPeriod(entry: Experience) {
  const from = parse(entry.start);
  const start = `${MONTHS[from.month - 1]} ${from.year}`;
  if (!entry.end) return `${start} — present`;

  const to = parse(entry.end);
  const end = `${MONTHS[to.month - 1]} ${to.year}`;
  // Same year reads better without repeating it: "Jul — Dec 2025".
  return from.year === to.year
    ? `${MONTHS[from.month - 1]} — ${end}`
    : `${start} — ${end}`;
}

/** Inclusive month count, so a Jul–Dec run counts as six rather than five. */
export function monthsOf(entry: Experience, now = new Date()) {
  const from = parse(entry.start);
  const to = entry.end
    ? parse(entry.end)
    : { year: now.getFullYear(), month: now.getMonth() + 1 };
  return (to.year - from.year) * 12 + (to.month - from.month) + 1;
}

/** Total across every role — computed so it stays true as the current one runs on. */
export function totalMonths(now = new Date()) {
  return experience.reduce((sum, entry) => sum + monthsOf(entry, now), 0);
}

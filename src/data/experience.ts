/**
 * Commercial experience, newest first.
 *
 * `logo` is deliberately optional and currently unset. Neither company has a
 * mark in `simple-icons`, and inventing one would be fabricating somebody
 * else's brand — so the plate falls back to a wordmark set in the site's own
 * type. To use the real marks, drop the files in `src/assets/logos/`, import
 * them here and set `logo`; the component and its hover animation need no
 * change.
 */

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
};

export const experience: Experience[] = [
  {
    company: "ERGO Hestia S.A.",
    wordmark: { lead: "ERGO", tail: "Hestia" },
    role: "Software Engineering Intern",
    start: "2026-01",
    end: null,
    location: "Sopot",
    points: [
      "I develop and maintain PricePoint, the insurance premium calculation system that takes over 200,000 requests a day.",
      "Integrated data pipelines with a cloud data warehouse, so business-critical figures reconcile against their source.",
      "Ship features through CI/CD — code review and iterative deployments with the team.",
    ],
    stack: [
      "Python",
      "SQL",
      "Azure",
      "Databricks",
      "JavaScript",
      "Dynatrace",
      "REST APIs",
      "Git",
      "Jira",
      "Agile",
    ],
  },
  {
    company: "Energa Operator S.A.",
    wordmark: { lead: "Energa", tail: "Operator" },
    role: "IT Department Intern — DevOps & systems administration",
    start: "2025-07",
    end: "2025-12",
    location: "Gdańsk",
    points: [
      "Administered OT infrastructure across a fleet of 90 virtualized servers — VMs and system configuration on both Windows and Linux.",
      "Wrote PowerShell and Bash automation for server monitoring, alerting and backups.",
      "First hands-on DevOps work: deployment, monitoring, and the unglamorous side of keeping systems up.",
    ],
    stack: [
      "Hyper-V",
      "PowerShell",
      "Bash",
      "Linux",
      "Windows",
      "Azure",
      "Vim",
      "Git",
      "nginx",
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

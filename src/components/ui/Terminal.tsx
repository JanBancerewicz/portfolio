import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { site } from "../../data/site";
import { gmailComposeHref } from "../../lib/mailto";

/**
 * A link tree you can type at.
 *
 * Every route out of this page — email, LinkedIn, ORCID, GitHub, CV, the two
 * index pages — is reachable as a command, and the same links are one click
 * away in the chip row underneath for anyone who does not want to type. The
 * shell is deliberately shallow: no parser, no state beyond history, and every
 * command answers in one frame.
 */

/** A run of output text, optionally a link or tonal cue. */
type Segment = {
  text: string;
  href?: string;
  internal?: boolean;
  tone?: "dim" | "accent";
};
type Line = { kind: "prompt" | "out" | "dim" | "error"; segments: Segment[] };

const HOST = "jan@portfolio";
const CWD = "~";

const text = (value: string): Line => ({ kind: "out", segments: [{ text: value }] });
const dim = (value: string): Line => ({ kind: "dim", segments: [{ text: value }] });
const fail = (value: string): Line => ({ kind: "error", segments: [{ text: value }] });
/** Empty visual gap between blocks — terminals read better with air. */
const blank = (): Line => ({ kind: "out", segments: [{ text: "\u00A0" }] });
/** Accent marker + body on one line (e.g. `◆  fact…`). */
const fact = (body: string): Line => ({
  kind: "out",
  segments: [
    { text: "◆  ", tone: "accent" },
    { text: body },
  ],
});
/** Indented continuation under a fact (parentheticals, second clause). */
const factCont = (body: string): Line => ({
  kind: "dim",
  segments: [{ text: `   ${body}` }],
});

const link = (label: string, href: string, internal = false): Line => ({
  kind: "out",
  segments: [{ text: label, href, internal }],
});

/** `ls` output, and the set `cat` knows how to read. */
const FILES: Record<string, () => Line[]> = {
  "about.txt": () => [
    text(`${site.name} — ${site.role}`),
    text(site.location),
    dim(site.availability.label),
  ],
  "email.txt": () => [link(site.email, gmailComposeHref)],
  "linkedin.url": () => [link(site.links.linkedin, site.links.linkedin)],
  "orcid.url": () => [link(site.links.orcid, site.links.orcid)],
  "github.url": () => [link(site.links.github, site.links.github)],
  "resume.pdf": () => [
    dim("binary file — opening instead"),
    link("resume.pdf", site.links.cv),
  ],
};

const DIRECTORIES = ["projects/", "blog/"];

type Command = {
  /** Shown by `help`. */
  describe: string;
  run: (args: string[], api: Api) => Line[] | void;
  /** Offered as a chip under the terminal. */
  suggest?: boolean;
};

type Api = {
  clear: () => void;
  go: (path: string) => void;
  history: string[];
};

const commands: Record<string, Command> = {
  help: {
    describe: "list every command",
    suggest: true,
    run: () => [
      dim("Available commands — type one, or click a chip below."),
      ...Object.entries(commands).map(([name, command]) => ({
        kind: "out" as const,
        segments: [{ text: `  ${name.padEnd(10)} ${command.describe}` }],
      })),
    ],
  },

  whoami: {
    describe: "who is this",
    suggest: true,
    run: () => [
      {
        kind: "out" as const,
        segments: [
          { text: site.name, tone: "accent" as const },
          { text: ` — ${site.role}` },
        ],
      },
      dim(`${site.location}  ·  ${site.availability.label}`),
      blank(),
      fact("Final-year CS student at Gdańsk University of Technology"),
      factCont("(B.Sc. expected Feb 2027)"),
      blank(),
      fact("Over 1 year of commercial IT experience across 2 internships"),
      factCont("(DevOps, Data & Software Engineering)"),
      blank(),
      fact("Personally specializing in LLMs, GenAI architectures, and AI engineering"),
      factCont("— seeking roles in this stack"),
      blank(),
      fact("Hackathons, tech industry events, and scientific clubs are my hobbies"),
      factCont("— always excited to be there"),
    ],
  },

  ls: {
    describe: "list what is here",
    suggest: true,
    run: () => [
      text([...DIRECTORIES, ...Object.keys(FILES)].join("   ")),
      dim("try: cat about.txt"),
    ],
  },

  cat: {
    describe: "read a file",
    run: (args) => {
      const name = args[0];
      if (!name) return [fail("cat: missing file operand")];
      const file = FILES[name];
      if (!file) return [fail(`cat: ${name}: No such file or directory`)];
      return file();
    },
  },

  pwd: {
    describe: "where am I",
    run: () => [text("/home/jan")],
  },

  email: {
    describe: "my email address",
    suggest: true,
    run: () => [
      dim("opens Gmail compose in a new tab"),
      link(site.email, gmailComposeHref),
    ],
  },

  linkedin: {
    describe: "LinkedIn profile (fastest way to reach me)",
    suggest: true,
    run: () => [
      dim("the fastest way to reach me"),
      link(site.links.linkedin, site.links.linkedin),
    ],
  },

  github: {
    describe: "GitHub profile",
    suggest: true,
    run: () => [link(site.links.github, site.links.github)],
  },

  orcid: {
    describe: "ORCID record & publications",
    suggest: true,
    run: () => [link(site.links.orcid, site.links.orcid)],
  },

  cv: {
    describe: "download my CV",
    run: () => [link("resume.pdf", site.links.cv)],
  },

  links: {
    describe: "every link at once",
    suggest: true,
    run: () => [
      dim("— the whole tree —"),
      link(`email     ${site.email}`, gmailComposeHref),
      link(`linkedin  ${site.links.linkedin}`, site.links.linkedin),
      link(`github    ${site.links.github}`, site.links.github),
      link(`orcid     ${site.links.orcid}`, site.links.orcid),
      link("cv        resume.pdf", site.links.cv),
    ],
  },

  projects: {
    describe: "open the project shelf",
    run: (_args, api) => {
      api.go("/projects");
      return [dim("cd /projects …")];
    },
  },

  blog: {
    describe: "open the writing",
    run: (_args, api) => {
      api.go("/blog");
      return [dim("cd /blog …")];
    },
  },

  date: {
    describe: "my local time",
    run: () => [
      text(
        new Intl.DateTimeFormat("en-GB", {
          dateStyle: "full",
          timeStyle: "short",
          timeZone: site.timezone,
        }).format(new Date()),
      ),
      dim(site.timezone),
    ],
  },

  echo: {
    describe: "say something back",
    run: (args) => [text(args.join(" "))],
  },

  history: {
    describe: "what you have typed",
    run: (_args, api) =>
      api.history.length
        ? api.history.map((entry, index) => text(`  ${index + 1}  ${entry}`))
        : [dim("nothing yet")],
  },

  clear: {
    describe: "wipe the screen",
    run: (_args, api) => {
      api.clear();
    },
  },

  sudo: {
    describe: "nice try",
    run: (args) => [
      fail(`${site.name} is not in the sudoers file. This incident will be reported.`),
      ...(args.length ? [dim(`(you asked for: ${args.join(" ")})`)] : []),
    ],
  },
};

const SUGGESTIONS = Object.entries(commands)
  .filter(([, command]) => command.suggest)
  .map(([name]) => name);

const BANNER: Line[] = [
  { kind: "out", segments: [{ text: `${site.name} — ${site.role}` }] },
  dim("An interactive link tree. Type `help` for the command list."),
];

export function Terminal() {
  const [lines, setLines] = useState<Line[]>(BANNER);
  const [value, setValue] = useState("");
  const historyRef = useRef<string[]>([]);
  const cursorRef = useRef(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const screenRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Keep the newest output in view without yanking the whole page around:
  // scroll the screen element itself, never `scrollIntoView`.
  useEffect(() => {
    const screen = screenRef.current;
    if (screen) screen.scrollTop = screen.scrollHeight;
  }, [lines]);

  const run = useCallback(
    (raw: string) => {
      const entry = raw.trim();
      const echo: Line = {
        kind: "prompt",
        segments: [{ text: entry }],
      };

      if (!entry) {
        setLines((current) => [...current, { kind: "prompt", segments: [{ text: "" }] }]);
        return;
      }

      historyRef.current = [...historyRef.current, entry];
      cursorRef.current = -1;

      const [name, ...args] = entry.split(/\s+/);
      const command = commands[name.toLowerCase()];

      if (!command) {
        setLines((current) => [
          ...current,
          echo,
          fail(`${name}: command not found — try \`help\``),
        ]);
        return;
      }

      let cleared = false;
      const api: Api = {
        clear: () => {
          cleared = true;
        },
        go: (path) => navigate(path),
        history: historyRef.current.slice(0, -1),
      };

      const output = command.run(args, api) ?? [];
      setLines((current) => (cleared ? [] : [...current, echo, ...output]));
    },
    [navigate],
  );

  const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      run(value);
      setValue("");
      return;
    }

    // Ctrl+L clears, as it does in a real shell.
    if (event.key === "l" && event.ctrlKey) {
      event.preventDefault();
      setLines([]);
      return;
    }

    if (event.key === "ArrowUp" || event.key === "ArrowDown") {
      const entries = historyRef.current;
      if (!entries.length) return;
      event.preventDefault();

      const next =
        event.key === "ArrowUp"
          ? Math.min(
              entries.length - 1,
              (cursorRef.current === -1 ? -1 : cursorRef.current) + 1,
            )
          : cursorRef.current - 1;

      cursorRef.current = Math.max(-1, next);
      setValue(
        cursorRef.current === -1
          ? ""
          : entries[entries.length - 1 - cursorRef.current],
      );
      return;
    }

    if (event.key === "Tab") {
      event.preventDefault();
      const partial = value.trim().toLowerCase();
      if (!partial) return;
      const match = Object.keys(commands).find((name) => name.startsWith(partial));
      if (match) setValue(match);
    }
  };

  return (
    <div className="sticky top-24">
      <div className="terminal overflow-hidden rounded-sm shadow-[var(--shadow-card)]">
        <div className="flex items-center gap-2 border-b border-white/10 px-4 py-2.5">
          <span className="size-2.5 rounded-full bg-white/20" />
          <span className="size-2.5 rounded-full bg-white/20" />
          <span className="size-2.5 rounded-full bg-white/20" />
          <span className="terminal-chrome ml-2">
            {HOST}: {CWD}
          </span>
        </div>

        {/* Clicking anywhere on the screen should put the caret where you expect —
            except on links, where focus-stealing can cancel mailto / downloads. */}
        <div
          ref={screenRef}
          onClick={(event) => {
            if ((event.target as HTMLElement).closest("a[href]")) return;
            inputRef.current?.focus();
          }}
          className="terminal-screen h-[19rem] overflow-y-auto px-4 py-3.5"
        >
          <div role="log" aria-live="polite" aria-label="Terminal output">
            {lines.map((line, index) => (
              <TerminalLine key={index} line={line} />
            ))}
          </div>

          <form
            onSubmit={(event) => {
              event.preventDefault();
              run(value);
              setValue("");
            }}
            className="flex items-baseline gap-2"
          >
            <span aria-hidden="true" className="terminal-caret shrink-0">
              $
            </span>
            <label className="sr-only" htmlFor="terminal-input">
              Type a command
            </label>
            <input
              id="terminal-input"
              ref={inputRef}
              value={value}
              onChange={(event) => setValue(event.target.value)}
              onKeyDown={onKeyDown}
              className="terminal-input w-full bg-transparent outline-none"
              autoComplete="off"
              autoCapitalize="off"
              autoCorrect="off"
              spellCheck={false}
              placeholder="help"
            />
          </form>
        </div>
      </div>

      <div className="mt-4">
        <p className="label">Try one</p>
        <ul className="mt-2.5 flex flex-wrap gap-2">
          {SUGGESTIONS.map((name) => (
            <li key={name}>
              <button
                type="button"
                onClick={() => {
                  run(name);
                  inputRef.current?.focus();
                }}
                className="press rounded-full border border-rule px-3 py-1.5 font-mono text-[0.8125rem] text-ink-muted transition-colors duration-200 hover:border-ink hover:text-ink"
              >
                {name}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function TerminalLine({ line }: { line: Line }) {
  if (line.kind === "prompt") {
    return (
      <p className="terminal-line">
        <span className="terminal-caret">$</span>{" "}
        <span className="terminal-echo">{line.segments[0]?.text}</span>
      </p>
    );
  }

  return (
    <p className={`terminal-line terminal-${line.kind}`}>
      {line.segments.map((segment, index) =>
        segment.href ? (
          <a
            key={index}
            href={segment.href}
            target={segment.href.startsWith("http") ? "_blank" : undefined}
            rel={segment.href.startsWith("http") ? "noreferrer noopener" : undefined}
            className="terminal-link"
            onClick={(event) => event.stopPropagation()}
          >
            {segment.text}
          </a>
        ) : (
          <span
            key={index}
            className={segment.tone ? `terminal-${segment.tone}` : undefined}
          >
            {segment.text}
          </span>
        ),
      )}
    </p>
  );
}

import { Link } from "react-router-dom";
import { FogReveal } from "../ui/FogReveal";

export function NotFoundPage() {
  return (
    <main className="mx-auto flex min-h-[70vh] w-full max-w-4xl flex-col justify-center px-5 pt-28 sm:px-6 lg:px-8">
      <FogReveal>
        <p className="font-mono text-sm text-accent-soft">404</p>
        <h1 className="mt-4 text-4xl font-semibold text-foreground transition-colors duration-300 sm:text-5xl">
          Page not found
        </h1>
        <p className="mt-5 max-w-xl text-base leading-8 text-muted transition-colors duration-300">
          This project or hackathon page does not exist yet.
        </p>
        <Link
          to="/#home"
          className="mt-8 inline-flex w-fit rounded-full bg-cyan-300 px-5 py-3 font-mono text-sm font-semibold text-slate-950 transition hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300"
        >
          Back home
        </Link>
      </FogReveal>
    </main>
  );
}

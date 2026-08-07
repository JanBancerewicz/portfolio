import { Certificates } from "../sections/Certificates";
import { Contact } from "../sections/Contact";
import { Experience } from "../sections/Experience";
import { Hackathons } from "../sections/Hackathons";
import { Hero } from "../sections/Hero";
import { Stack } from "../sections/Stack";
import { TechRibbon } from "../sections/TechRibbon";
import { Work } from "../sections/Work";
import { Writing } from "../sections/Writing";

export function Home() {
  return (
    <div>
      <Hero />
      <TechRibbon />
      <Work />
      <Hackathons />
      <Experience />
      <Certificates />
      <Writing />
      <Stack />
      <Contact />
    </div>
  );
}

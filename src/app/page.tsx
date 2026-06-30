import { QuickNav } from "@/components/quick-nav";
import { FlipStage } from "@/components/flip-stage";
import { Hero } from "@/components/hero";
import { About } from "@/components/about";
import { Skills } from "@/components/skills";
import { Experience } from "@/components/experience";
import { Projects } from "@/components/projects";
import { Blogs } from "@/components/blogs";
import { Contact } from "@/components/contact";

export default function Home() {
  return (
    <>
      <main>
        {/* Hero + About share ONE pinned portrait that flips grayscale → red */}
        <FlipStage>
          <Hero />
          <About />
        </FlipStage>
        <Skills />
        <Experience />
        <Projects />
        <Blogs />
        <Contact />
      </main>
      <QuickNav />
    </>
  );
}

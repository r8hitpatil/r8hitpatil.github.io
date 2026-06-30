import { WaveText } from "@/components/wave-text";

type Project = {
  name: string;
  year?: string;
  description: string;
  stack: string[];
  live?: string;
  repo?: string;
  planned?: boolean;
};

const PROJECTS: Project[] = [
  {
    name: "Parkcade",
    year: "Jan 2026",
    description:
      "A real-time parking management system with role-based access (OpenFGA) and the booking logic behind slot reservations. Added Redis caching and tuned PostgreSQL queries to keep slot management responsive under concurrent load.",
    stack: ["Node.js", "OpenFGA", "Redis", "PostgreSQL", "Prisma", "Docker"],
    repo: "https://github.com/r8hitpatil",
  },
  {
    name: "QuizForge",
    year: "Mar 2026",
    description:
      "A serverless quiz generator that turns a single user prompt into a full assessment using Google Generative AI, with Firebase handling hosting and real-time data.",
    stack: ["Generative AI", "Firebase", "React", "JavaScript"],
    live: "https://quiz-gen-ai-app.web.app/",
    repo: "https://github.com/r8hitpatil/QuizForge-GenAI-quiz-app",
  },
  {
    name: "LLM Gateway",
    description:
      "A single API endpoint that pools free LLM API keys and lists every model each key can reach across providers, then automatically rotates and falls back when one is rate-limited or down. Configurable priority with fully automated failover.",
    stack: ["NestJS", "TypeScript", "Redis", "REST APIs"],
    planned: true,
  },
  {
    name: "Scalable NestJS Architecture",
    description:
      "A production-grade NestJS backend blueprint — modular domains, queue-backed jobs, and layered caching built to scale cleanly. Multi-tenancy with per-tenant data isolation is next on the roadmap.",
    stack: ["NestJS", "PostgreSQL", "Prisma", "Redis", "Docker"],
    planned: true,
  },
];

export function Projects() {
  return (
    <section
      id="projects"
      className="w-full bg-[#F0EEE7] px-6 py-24 text-[#161616] md:px-12"
    >
      <div className="mx-auto max-w-[1180px]">
        <h2 className="pixel-flat [font-size:clamp(40px,5.5vw,68px)]">
          <WaveText
            text="Projects"
            by="letter"
            amplitude={8}
            stagger={0.06}
            duration={1.5}
          />
        </h2>

        <ul className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2">
          {PROJECTS.map((project) => (
            <li key={project.name}>
              <article className="group flex h-full flex-col rounded-[3px] border-[1.5px] border-[#161616]/15 bg-white p-6 transition-colors hover:border-[#161616]/45">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="text-[clamp(19px,2vw,23px)] leading-tight tracking-tight text-[#161616] [-webkit-text-stroke:0.45px_#161616]">
                    {project.name}
                  </h3>
                  {project.planned ? (
                    <span className="font-pixel-ui shrink-0 rounded-[3px] border border-[#6E56F8]/40 px-2 py-0.5 text-[10px] uppercase tracking-tight text-[#6E56F8]">
                      Planned
                    </span>
                  ) : (
                    <span className="font-pixel-ui shrink-0 pt-1 text-[12px] text-[#6B6864]">
                      {project.year}
                    </span>
                  )}
                </div>

                <p className="mt-3 flex-1 text-[15px] leading-relaxed text-[#3a3a3a]">
                  {project.description}
                </p>

                <ul className="mt-4 flex flex-wrap gap-2">
                  {project.stack.map((tech) => (
                    <li
                      key={tech}
                      className="font-pixel-ui rounded-[3px] border border-[#161616]/20 px-2.5 py-1 text-[11px] tracking-tight text-[#161616]"
                    >
                      {tech}
                    </li>
                  ))}
                </ul>

                <div className="mt-5 flex items-center gap-5">
                  {project.planned ? (
                    <span className="font-pixel-ui inline-flex items-center gap-1.5 text-[13px] tracking-tight text-[#6B6864]">
                      <span aria-hidden className="opacity-50">
                        &gt;
                      </span>
                      coming soon
                    </span>
                  ) : (
                    <>
                      {project.live && (
                        <ProjectLink href={project.live}>live</ProjectLink>
                      )}
                      {project.repo && (
                        <ProjectLink href={project.repo}>code</ProjectLink>
                      )}
                    </>
                  )}
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function ProjectLink({
  href,
  children,
}: {
  href: string;
  children: string;
}) {
  const external = href.startsWith("http");
  return (
    <a
      href={href}
      {...(external
        ? { target: "_blank", rel: "noopener noreferrer" }
        : {})}
      className="font-pixel-ui inline-flex items-center gap-1.5 text-[13px] tracking-tight text-[#161616] transition-colors hover:text-[#6B6864]"
    >
      <span aria-hidden className="opacity-50">
        &gt;
      </span>
      {children}
    </a>
  );
}

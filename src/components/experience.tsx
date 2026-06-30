import { WaveText } from "@/components/wave-text";

type Role = {
  role: string;
  company: string;
  location: string;
  period: string;
  summary: string;
  stack: string[];
};

const EXPERIENCE: Role[] = [
  {
    role: "Full-Stack Developer Intern",
    company: "Shellel",
    location: "Remote, India",
    period: "May 2026 — Present",
    summary:
      "Moved the company's public pages — food database, blog, features, and static pages — from Handlebars to Angular SSR with client hydration, putting the whole public site on one rendering stack without changing any URLs. Wrote the backing REST/JSON APIs in Node.js (NestJS) with MongoDB/Mongoose so each page loads from a single request, owning the backend data flow. Set up a layered cache (CDN edge → SSR → in-memory → MongoDB) so traffic spikes and crawls rarely hit the database, and integrated Google Analytics 4 with environment-specific config to keep dev and production tracking separate.",
    stack: ["Angular SSR", "NestJS", "Node.js", "MongoDB", "Redis", "GA4"],
  },
];

export function Experience() {
  return (
    <section
      id="experience"
      className="w-full bg-[#F0EEE7] px-6 py-24 text-[#161616] md:px-12"
    >
      <div className="mx-auto max-w-[1180px]">
        <h2 className="pixel-flat [font-size:clamp(40px,5.5vw,68px)]">
          <WaveText
            text="Experience"
            by="letter"
            amplitude={8}
            stagger={0.06}
            duration={1.5}
          />
        </h2>

        <ol className="mt-12 flex flex-col gap-4">
          {EXPERIENCE.map((item, i) => (
            <li key={item.company + item.role}>
              <article className="relative rounded-[3px] border-[1.5px] border-[#161616]/15 bg-white p-6 transition-colors hover:border-[#161616]/40 md:p-7">
                <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
                  <div className="flex gap-4">
                    <span className="font-pixel-ui pt-1 text-[13px] text-[#9b988f]">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h3 className="text-[clamp(18px,2vw,22px)] leading-tight tracking-tight text-[#161616] [-webkit-text-stroke:0.45px_#161616]">
                        {item.role}
                      </h3>
                      <p className="font-pixel-ui mt-1.5 text-[13px] text-[#6B6864]">
                        {item.company} · {item.location}
                      </p>
                    </div>
                  </div>
                  <span className="font-pixel-ui shrink-0 text-[12px] text-[#6B6864] md:pt-1">
                    {item.period}
                  </span>
                </div>

                <p className="mt-4 max-w-[820px] text-[15px] leading-relaxed text-[#3a3a3a] md:pl-[40px]">
                  {item.summary}
                </p>

                <ul className="mt-4 flex flex-wrap gap-2 md:pl-[40px]">
                  {item.stack.map((tech) => (
                    <li
                      key={tech}
                      className="font-pixel-ui rounded-[3px] border border-[#161616]/20 px-2.5 py-1 text-[11px] tracking-tight text-[#161616]"
                    >
                      {tech}
                    </li>
                  ))}
                </ul>
              </article>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

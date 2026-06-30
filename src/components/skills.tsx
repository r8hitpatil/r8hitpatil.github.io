import type { IconType } from "react-icons";
import {
  SiReact,
  SiAngular,
  SiTypescript,
  SiJavascript,
  SiHtml5,
  SiCss,
  SiTailwindcss,
  SiNodedotjs,
  SiExpress,
  SiNestjs,
  SiFirebase,
  SiMongodb,
  SiPostgresql,
  SiMysql,
  SiPrisma,
  SiRedis,
  SiGit,
  SiGithub,
  SiDocker,
  SiPython,
  SiVercel,
  SiGooglecloud,
  SiVite,
  SiPostman,
  SiSocketdotio,
  SiJsonwebtokens,
  SiLangchain,
  SiLanggraph,
  SiOpenai,
  SiClaude,
  SiGooglegemini,
} from "react-icons/si";
import { FaJava, FaAws } from "react-icons/fa";
import {
  LuShieldCheck,
  LuLayers,
  LuBoxes,
  LuSparkles,
  LuGauge,
  LuChartLine,
  LuPlug,
} from "react-icons/lu";
import { TbApi, TbVector } from "react-icons/tb";
import { WaveText } from "@/components/wave-text";

type Skill = { name: string; icon: IconType; color: string };

// All skills rendered in the initial server HTML (crawler-friendly).
// Colors are tuned to stay legible on the light background.
const SKILLS: Skill[] = [
  // Frontend
  { name: "React", icon: SiReact, color: "#149ECA" },
  { name: "Angular", icon: SiAngular, color: "#DD0031" },
  { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
  { name: "JavaScript", icon: SiJavascript, color: "#D4A800" },
  { name: "HTML", icon: SiHtml5, color: "#E34F26" },
  { name: "CSS", icon: SiCss, color: "#1572B6" },
  { name: "Tailwind CSS", icon: SiTailwindcss, color: "#0EA5E9" },
  // Backend
  { name: "Node.js", icon: SiNodedotjs, color: "#5FA04E" },
  { name: "Express", icon: SiExpress, color: "#555555" },
  { name: "NestJS", icon: SiNestjs, color: "#E0234E" },
  { name: "Firebase", icon: SiFirebase, color: "#F5820D" },
  { name: "OpenFGA", icon: LuShieldCheck, color: "#6366F1" },
  { name: "REST APIs", icon: TbApi, color: "#0D9488" },
  // Database
  { name: "MongoDB", icon: SiMongodb, color: "#47A248" },
  { name: "PostgreSQL", icon: SiPostgresql, color: "#4169E1" },
  { name: "MySQL", icon: SiMysql, color: "#4479A1" },
  { name: "Prisma", icon: SiPrisma, color: "#2D3748" },
  { name: "Redis", icon: SiRedis, color: "#DC382D" },
  // Languages
  { name: "Java", icon: FaJava, color: "#E76F00" },
  { name: "Python", icon: SiPython, color: "#3776AB" },
  // Tools / DevOps
  { name: "Git", icon: SiGit, color: "#F05032" },
  { name: "GitHub", icon: SiGithub, color: "#181717" },
  { name: "Docker", icon: SiDocker, color: "#2496ED" },
  { name: "Vercel", icon: SiVercel, color: "#111111" },
  { name: "AWS", icon: FaAws, color: "#E8930C" },
  { name: "Google Cloud", icon: SiGooglecloud, color: "#4285F4" },
  { name: "Vite", icon: SiVite, color: "#646CFF" },
  { name: "Postman", icon: SiPostman, color: "#FF6C37" },
  // Realtime / Auth
  { name: "JWT", icon: SiJsonwebtokens, color: "#D6006E" },
  { name: "WebSocket", icon: LuPlug, color: "#0891B2" },
  { name: "Socket.io", icon: SiSocketdotio, color: "#111111" },
  // AI / ML
  { name: "LangChain", icon: SiLangchain, color: "#1C8C7D" },
  { name: "LangGraph", icon: SiLanggraph, color: "#1F9E8E" },
  { name: "RAG", icon: LuLayers, color: "#9333EA" },
  { name: "pgvector", icon: TbVector, color: "#3B82F6" },
  { name: "Embeddings", icon: LuBoxes, color: "#16A34A" },
  { name: "OpenAI", icon: SiOpenai, color: "#0F8C73" },
  { name: "Claude", icon: SiClaude, color: "#D97757" },
  { name: "Gemini", icon: SiGooglegemini, color: "#7C5CFF" },
  { name: "Prompt Engineering", icon: LuSparkles, color: "#D97706" },
  { name: "LLM Evaluation", icon: LuGauge, color: "#DB2777" },
  { name: "Langfuse", icon: LuChartLine, color: "#0D9488" },
];

export function Skills() {
  return (
    <section id="skills" className="w-full bg-[#F0EEE7] px-6 py-24 md:px-12">
      <div className="mx-auto max-w-[1180px]">
        {/* Heading */}
        <h2
          className="max-w-[760px] font-pixel-ui [font-size:clamp(26px,3.2vw,40px)] tracking-tight text-[#1d1d1d]"
          style={{
            lineHeight: 1.3,
            WebkitTextStroke: "0.7px #1d1d1d",
            textShadow:
              "1px 1px 0 rgba(22,22,22,0.26), 2px 2px 0 rgba(22,22,22,0.18), 3px 3px 0 rgba(22,22,22,0.09)",
          }}
        >
          <WaveText
            text="Explore my skills as a full-stack developer."
            by="word"
            amplitude={3}
            stagger={0.045}
            duration={1.9}
          />
        </h2>

        {/* Skill cloud */}
        <ul className="mt-12 flex flex-wrap justify-center gap-x-3 gap-y-4">
          {SKILLS.map(({ name, icon: Icon, color }) => (
            <li key={name}>
              <span
                className="font-pixel-ui inline-flex items-center gap-2.5 rounded-[3px] border-[1.5px] bg-white px-4 py-2.5 text-[12px] tracking-tight text-[#161616]"
                style={{
                  borderColor: `${color}4D`,
                  boxShadow: `0 1px 2px rgba(20,20,20,0.05), 0 0 16px -10px ${color}`,
                }}
              >
                <Icon
                  aria-hidden
                  className="h-[18px] w-[18px] shrink-0"
                  style={{ color }}
                />
                {name}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

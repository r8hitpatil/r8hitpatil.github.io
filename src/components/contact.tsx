"use client";

import { useState } from "react";
import { FaXTwitter, FaInstagram, FaLinkedinIn, FaEnvelope } from "react-icons/fa6";
import type { IconType } from "react-icons";
import { WaveText } from "@/components/wave-text";

const SOCIALS: { label: string; href: string; icon: IconType }[] = [
  { label: "X (Twitter)", href: "https://x.com/r8hitpatil", icon: FaXTwitter },
  { label: "Instagram", href: "https://instagram.com/r8hitpatil", icon: FaInstagram },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/r8hitpatil",
    icon: FaLinkedinIn,
  },
  { label: "Email", href: "mailto:dev.rohitpatil.25@gmail.com", icon: FaEnvelope },
];

// Free Web3Forms access key — set NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY in .env.local.
// The key is bound to the inbox it delivers to, so it's safe to expose client-side.
const ACCESS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;

type Status = "idle" | "submitting" | "success" | "error";

export function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setError("");

    if (!ACCESS_KEY) {
      setStatus("error");
      setError(
        "The contact form isn’t configured yet (missing Web3Forms key).",
      );
      return;
    }

    setStatus("submitting");

    const formData = new FormData(form);
    formData.append("access_key", ACCESS_KEY);
    formData.append("subject", "New message from your portfolio");
    formData.append("from_name", "Portfolio Contact Form");

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { Accept: "application/json" },
        body: formData,
      });
      const data = await res.json();
      if (data.success) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
        setError(data.message || "Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setError("Network error — please try again.");
    }
  }

  return (
    <section
      id="contact"
      className="w-full bg-[#F0EEE7] px-6 py-24 text-[#161616] md:px-12"
    >
      <div className="mx-auto grid max-w-[1180px] grid-cols-1 items-stretch gap-12 md:grid-cols-2">
        {/* ── Left: heading + socials ── */}
        <div className="flex flex-col justify-between">
          <div>
            <h2 className="pixel-flat [font-size:clamp(40px,5.5vw,68px)]">
              <WaveText
                text="Let’s talk."
                by="letter"
                amplitude={8}
                stagger={0.06}
                duration={1.5}
              />
            </h2>
            <p className="mt-4 max-w-[460px] text-[17px] leading-relaxed text-[#3a3a3a]">
              Have a project or need help? Fill out the form, and we&rsquo;ll get
              back to you soon.
            </p>
          </div>

          <ul className="mt-12 flex items-center gap-3">
            {SOCIALS.map(({ label, href, icon: Icon }) => {
              const external = href.startsWith("http");
              return (
                <li key={label}>
                  <a
                    href={href}
                    {...(external
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                    aria-label={label}
                    className="flex h-10 w-10 items-center justify-center rounded-[3px] bg-[#E3E1DA] text-[#161616] transition-colors hover:bg-[#d6d4cc]"
                  >
                    <Icon className="h-[18px] w-[18px]" aria-hidden />
                  </a>
                </li>
              );
            })}
          </ul>
        </div>

        {/* ── Right: form card ── */}
        <div className="rounded-[3px] bg-[#161616] p-7 md:p-8">
          {status === "success" ? (
            <div className="flex h-full min-h-[420px] flex-col items-center justify-center text-center">
              <p className="text-[22px] font-semibold text-white">
                Thanks for reaching out!
              </p>
              <p className="mt-2 text-[15px] text-white/60">
                I&rsquo;ll get back to you soon.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              {/* Honeypot — bots fill it, humans never see it. */}
              <input
                type="checkbox"
                name="botcheck"
                tabIndex={-1}
                autoComplete="off"
                className="hidden"
                aria-hidden
              />

              <Field label="Name" htmlFor="name">
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  placeholder="Enter your name"
                  className={inputClass}
                />
              </Field>

              <Field label="Email" htmlFor="email">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="Enter your email"
                  className={inputClass}
                />
              </Field>

              <Field label="Your Project" htmlFor="project">
                <textarea
                  id="project"
                  name="project"
                  rows={5}
                  required
                  placeholder="Tell us about your project"
                  className={`${inputClass} resize-y`}
                />
              </Field>

              {status === "error" && error && (
                <p
                  role="alert"
                  className="font-pixel-ui rounded-[3px] border border-red-400/30 bg-red-400/10 px-3 py-2 text-[12px] text-red-300"
                >
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={status === "submitting"}
                className="font-pixel-ui mt-1 w-full rounded-[3px] bg-[#F0EEE7] py-4 text-[13px] tracking-tight text-[#161616] transition-transform hover:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {status === "submitting" ? "Sending…" : "Submit"}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

const inputClass =
  "w-full rounded-[3px] border border-white/10 bg-[#1d1d1d] px-4 py-3 text-[15px] text-white placeholder:text-white/40 outline-none transition-colors focus:border-white/30";

function Field({
  label,
  htmlFor,
  children,
}: {
  label: string;
  htmlFor: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={htmlFor}
        className="font-pixel-ui mb-2 block text-[12px] uppercase tracking-tight text-white"
      >
        {label}
      </label>
      {children}
    </div>
  );
}

"use client";

import { useState } from "react";
import { Check, Loader2 } from "lucide-react";
import { contact, site } from "@/content/site";
import { Section, Reveal, Headline } from "@/components/ui/Section";
import { GithubIcon, LinkedinIcon } from "@/components/ui/BrandIcons";

type Status = "idle" | "sending" | "sent" | "error";

export function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    setStatus("sending");
    setError(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(json.error || "Something went wrong.");
      setStatus("sent");
      form.reset();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  return (
    <Section id="contact" label={contact.label}>
      <Headline lines={contact.headline} />
      <Reveal
        delay={0.05}
        className="mt-6 max-w-xl text-base leading-relaxed text-[var(--color-muted)]"
      >
        {contact.blurb}
      </Reveal>

      <div className="mt-16 grid gap-12 border-t border-[var(--color-line)] pt-12 md:grid-cols-2 md:gap-16">
        <Reveal className="space-y-8">
          <div>
            <p className="label">Email</p>
            <a
              href={`mailto:${site.email}`}
              className="mt-1 block font-mono text-sm text-[var(--color-fg)] hover:text-[var(--color-accent)]"
            >
              {site.email}
            </a>
          </div>
          <div>
            <p className="label">Phone</p>
            <a
              href={site.phoneHref}
              className="mt-1 block font-mono text-sm text-[var(--color-fg)] hover:text-[var(--color-accent)]"
            >
              {site.phone}
            </a>
          </div>
          <div>
            <p className="label">Location</p>
            <p className="mt-1 font-mono text-sm text-[var(--color-fg)]">
              {site.location}
            </p>
          </div>
          <div>
            <p className="label">Elsewhere</p>
            <div className="mt-2 flex items-center gap-4">
              <a
                href={site.socials.github}
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="text-[var(--color-muted)] hover:text-[var(--color-fg)]"
              >
                <GithubIcon size={18} />
              </a>
              <a
                href={site.socials.linkedin}
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="text-[var(--color-muted)] hover:text-[var(--color-fg)]"
              >
                <LinkedinIcon size={18} />
              </a>
              <a
                href={site.resumePath}
                target="_blank"
                rel="noreferrer"
                className="label label--accent"
              >
                Résumé ↗
              </a>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.05}>
          <form onSubmit={onSubmit} className="space-y-5" noValidate>
            <input
              type="text"
              name="company"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden
              className="absolute left-[-9999px] h-0 w-0 opacity-0"
            />
            <Field label="Name" name="name" type="text" />
            <Field label="Email" name="email" type="email" />
            <div>
              <label htmlFor="message" className="label">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                minLength={10}
                className="mt-2 w-full resize-y border-b border-[var(--color-line)] bg-transparent pb-2 font-mono text-sm text-[var(--color-fg)] outline-none focus:border-[var(--color-accent)]"
              />
            </div>

            <button
              type="submit"
              disabled={status === "sending"}
              className="inline-flex items-center gap-2 border border-[var(--color-accent)]/40 bg-[var(--color-accent)]/10 px-5 py-3 font-mono text-xs uppercase tracking-widest text-[var(--color-accent)] transition-colors hover:bg-[var(--color-accent)]/20 disabled:opacity-60"
            >
              {status === "sending" && (
                <Loader2 size={14} className="animate-spin" />
              )}
              {status === "sent" && <Check size={14} />}
              {status === "sent"
                ? "Message sent"
                : status === "sending"
                  ? "Transmitting..."
                  : "Send message"}
            </button>

            <p aria-live="polite" className="text-xs">
              {status === "sent" && (
                <span className="text-[var(--color-accent)]">
                  Received — I&apos;ll get back to you.
                </span>
              )}
              {status === "error" && (
                <span className="text-red-400">
                  {error}{" "}
                  <a
                    href={`mailto:${site.email}`}
                    className="underline hover:text-red-300"
                  >
                    Email instead
                  </a>
                </span>
              )}
            </p>
          </form>
        </Reveal>
      </div>
    </Section>
  );
}

function Field({
  label,
  name,
  type,
}: {
  label: string;
  name: string;
  type: string;
}) {
  return (
    <div>
      <label htmlFor={name} className="label">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required
        className="mt-2 w-full border-b border-[var(--color-line)] bg-transparent pb-2 font-mono text-sm text-[var(--color-fg)] outline-none focus:border-[var(--color-accent)]"
      />
    </div>
  );
}

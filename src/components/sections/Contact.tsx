"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Check, Loader2 } from "lucide-react";
import { contact, site } from "@/content/site";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { fadeUp } from "@/lib/motion";

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
    <Section id="contact" index={contact.index} heading={contact.heading}>
      <div className="grid gap-12 md:grid-cols-2 md:gap-16">
        <motion.div variants={fadeUp} className="space-y-6">
          <p className="text-base text-zinc-400 md:text-lg">{contact.blurb}</p>
          <ul className="space-y-4 text-sm">
            <li>
              <a
                href={`mailto:${site.email}`}
                className="flex items-center gap-3 text-zinc-300 transition-colors hover:text-white"
              >
                <Mail size={16} className="text-[var(--color-accent)]" />
                {site.email}
              </a>
            </li>
            <li>
              <a
                href={site.phoneHref}
                className="flex items-center gap-3 text-zinc-300 transition-colors hover:text-white"
              >
                <Phone size={16} className="text-[var(--color-accent)]" />
                {site.phone}
              </a>
            </li>
            <li className="flex items-center gap-3 text-zinc-400">
              <MapPin size={16} className="text-[var(--color-accent)]" />
              {site.location}
            </li>
          </ul>
        </motion.div>

        <motion.form
          variants={fadeUp}
          onSubmit={onSubmit}
          className="space-y-4"
          noValidate
        >
          {/* honeypot */}
          <input
            type="text"
            name="company"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden
            className="absolute left-[-9999px] h-0 w-0 opacity-0"
          />

          <Field label="Name" name="name" type="text" required />
          <Field label="Email" name="email" type="email" required />
          <div>
            <label
              htmlFor="message"
              className="mb-1.5 block font-mono text-xs uppercase tracking-wider text-zinc-500"
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={5}
              minLength={10}
              className="w-full resize-y rounded-lg border border-zinc-700 bg-zinc-900/80 px-3 py-2 text-sm text-zinc-100 outline-none transition-colors focus:border-[var(--color-accent)]"
            />
          </div>

          <div className="flex items-center gap-4 pt-1">
            <Button type="submit" disabled={status === "sending"}>
              {status === "sending" && (
                <Loader2 size={15} className="animate-spin" />
              )}
              {status === "sent" && <Check size={15} />}
              {status === "sent"
                ? "Sent"
                : status === "sending"
                  ? "Sending…"
                  : "Send message"}
            </Button>
            <p aria-live="polite" className="text-xs">
              {status === "sent" && (
                <span className="text-emerald-400">
                  Thanks — I&apos;ll get back to you.
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
          </div>
        </motion.form>
      </div>
    </Section>
  );
}

function Field({
  label,
  name,
  type,
  required,
}: {
  label: string;
  name: string;
  type: string;
  required?: boolean;
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="mb-1.5 block font-mono text-xs uppercase tracking-wider text-zinc-500"
      >
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        className="w-full rounded-lg border border-zinc-700 bg-zinc-900/80 px-3 py-2 text-sm text-zinc-100 outline-none transition-colors focus:border-[var(--color-accent)]"
      />
    </div>
  );
}

"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { work } from "@/content/site";
import { Section, Reveal, Headline } from "@/components/ui/Section";

export function Work() {
  return (
    <Section id="work" label={work.label}>
      <Headline lines={work.headline} />

      <div className="mt-16 space-y-16">
        {work.items.map((p, i) => (
          <Reveal
            as="article"
            key={p.name}
            className="grid gap-8 border-t border-[var(--color-line)] pt-12 md:grid-cols-2 md:gap-12"
          >
            <div className={i % 2 === 1 ? "md:order-2" : ""}>
              <div className="relative aspect-[16/10] overflow-hidden rounded-lg border border-[var(--color-line)] bg-[var(--color-surface)]">
                <Image
                  src={p.image}
                  alt={p.name}
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
            </div>

            <div className="flex flex-col justify-center">
              <p className="font-mono text-xs text-[var(--color-accent)]">
                {p.kind}
              </p>
              <h3 className="mt-2 flex items-center gap-2 text-2xl font-semibold text-[var(--color-fg)]">
                {p.name}
                {p.link && (
                  <a
                    href={p.link}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`Open ${p.name}`}
                    className="text-[var(--color-faint)] hover:text-[var(--color-fg)]"
                  >
                    <ArrowUpRight size={18} />
                  </a>
                )}
              </h3>
              <p className="mt-1 label">{p.role}</p>
              <p className="mt-4 text-sm leading-relaxed text-[var(--color-muted)]">
                {p.blurb}
              </p>

              <ul className="mt-5 space-y-2">
                {p.features.map((f) => (
                  <li
                    key={f}
                    className="relative pl-5 text-sm text-[var(--color-muted)]"
                  >
                    <span className="absolute left-0 text-[var(--color-accent)]">
                      ▹
                    </span>
                    {f}
                  </li>
                ))}
              </ul>

              <ul className="mt-6 flex flex-wrap gap-2">
                {p.stack.map((s) => (
                  <li
                    key={s}
                    className="rounded border border-[var(--color-line)] px-2.5 py-1 font-mono text-[11px] uppercase tracking-wider text-[var(--color-faint)]"
                  >
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

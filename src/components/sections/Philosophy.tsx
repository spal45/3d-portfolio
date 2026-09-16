"use client";

import { philosophy } from "@/content/site";
import { Section, Reveal } from "@/components/ui/Section";

export function Philosophy() {
  return (
    <Section id="philosophy" label={philosophy.label}>
      <div className="grid gap-px overflow-hidden border border-[var(--color-line)] bg-[var(--color-line)] sm:grid-cols-2">
        {philosophy.items.map((item, i) => (
          <Reveal
            key={item.n}
            as="article"
            delay={(i % 2) * 0.06}
            className="bg-[var(--color-bg)] p-8 md:p-10"
          >
            <span className="font-mono text-2xl text-[var(--color-accent)]">
              {item.n}
            </span>
            <h3 className="mt-4 text-xl font-semibold text-[var(--color-fg)]">
              {item.title}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-[var(--color-muted)]">
              {item.body}
            </p>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

"use client";

import { arsenal } from "@/content/site";
import { Section, Reveal, Headline } from "@/components/ui/Section";

export function Arsenal() {
  return (
    <Section id="arsenal" label={arsenal.label}>
      <Headline lines={arsenal.headline} />

      <div className="mt-16 divide-y divide-[var(--color-line)] border-y border-[var(--color-line)]">
        {arsenal.groups.map((g, i) => (
          <Reveal
            key={g.label}
            delay={(i % 3) * 0.04}
            className="grid gap-4 py-6 md:grid-cols-[220px_1fr] md:items-baseline"
          >
            <p className="label">{g.label}</p>
            <ul className="flex flex-wrap gap-x-6 gap-y-2">
              {g.items.map((item) => (
                <li
                  key={item}
                  className="font-mono text-sm text-[var(--color-fg)]"
                >
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

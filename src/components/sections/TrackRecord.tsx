"use client";

import { trackRecord } from "@/content/site";
import { Section, Reveal, Headline } from "@/components/ui/Section";

export function TrackRecord() {
  return (
    <Section id="track-record" label={trackRecord.label}>
      <Headline lines={trackRecord.headline} />

      <div className="mt-16 space-y-24">
        {trackRecord.roles.map((role) => (
          <Reveal as="article" key={role.company}>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
              <span className="label">{role.period}</span>
              <span className="label">{role.place}</span>
            </div>

            <p className="mt-6 font-mono text-xs text-[var(--color-accent)]">
              {role.kicker}
            </p>
            <h3 className="mt-2 text-2xl font-semibold text-[var(--color-fg)] md:text-3xl">
              {role.role}
              <span className="text-[var(--color-faint)]"> · {role.company}</span>
            </h3>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-[var(--color-muted)] md:text-base">
              {role.summary}
            </p>

            <p className="mt-10 label">Key achievements</p>
            <ul className="mt-4 space-y-3 border-l border-[var(--color-line)] pl-5">
              {role.achievements.map((a) => (
                <li
                  key={a}
                  className="relative text-sm leading-relaxed text-[var(--color-muted)]"
                >
                  <span className="absolute -left-5 text-[var(--color-accent)]">
                    ↳
                  </span>
                  {a}
                </li>
              ))}
            </ul>

            <ul className="mt-8 flex flex-wrap gap-2">
              {role.stack.map((s) => (
                <li
                  key={s}
                  className="rounded border border-[var(--color-line)] px-2.5 py-1 font-mono text-[11px] uppercase tracking-wider text-[var(--color-faint)]"
                >
                  {s}
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

import { ArrowDown } from "lucide-react";
import { hero, site } from "@/content/site";
import { ButtonLink } from "@/components/ui/Button";

export function Hero() {
  return (
    <section
      id="hero"
      className="relative mx-auto flex min-h-screen w-full max-w-5xl flex-col justify-center px-6 py-28 md:px-8"
    >
      <p
        className="rise mb-5 inline-flex w-fit items-center gap-2 rounded-full border border-[var(--color-accent)]/20 bg-[var(--color-accent)]/10 px-3 py-1 font-mono text-xs uppercase tracking-wider text-indigo-300"
        style={{ animationDelay: "0.05s" }}
      >
        {hero.eyebrow}
      </p>

      <h1 className="max-w-3xl text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
        {hero.headline.map((line, i) => (
          <span
            key={line}
            className="rise block"
            style={{ animationDelay: `${0.15 + i * 0.12}s` }}
          >
            {i === hero.headline.length - 1 ? (
              <span className="bg-gradient-to-r from-indigo-300 via-white to-violet-300 bg-clip-text text-transparent">
                {line}
              </span>
            ) : (
              line
            )}
          </span>
        ))}
      </h1>

      <p
        className="rise mt-6 max-w-xl text-base text-zinc-400 md:text-lg"
        style={{ animationDelay: "0.4s" }}
      >
        {hero.sub}
      </p>

      <div
        className="rise mt-9 flex flex-wrap gap-4"
        style={{ animationDelay: "0.55s" }}
      >
        {hero.ctas.map((cta) => (
          <ButtonLink
            key={cta.label}
            href={cta.href}
            variant={cta.primary ? "primary" : "outline"}
            {...(cta.href.startsWith("/")
              ? { target: "_blank", rel: "noreferrer" }
              : {})}
          >
            {cta.label}
          </ButtonLink>
        ))}
      </div>

      <a
        href="#about"
        aria-label="Scroll to about"
        className="rise absolute bottom-10 left-6 flex items-center gap-2 text-xs text-zinc-500 md:left-8"
        style={{ animationDelay: "1s" }}
      >
        <ArrowDown size={14} className="animate-bounce" />
        Scroll
      </a>

      <div className="absolute bottom-10 right-6 hidden text-right font-mono text-xs text-zinc-600 md:block md:right-8">
        {site.location}
      </div>
    </section>
  );
}

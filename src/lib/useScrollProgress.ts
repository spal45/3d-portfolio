"use client";

import { useSyncExternalStore } from "react";

// Section order must match the rendered <section id> order in page.tsx.
export const SECTION_IDS = [
  "hero",
  "about",
  "skills",
  "experience",
  "projects",
  "contact",
] as const;

export type SectionId = (typeof SECTION_IDS)[number];

type ScrollState = {
  /** 0..1 progress over the whole scrollable document */
  progress: number;
  /** index into SECTION_IDS of the section currently in view */
  section: number;
  /** signed, decaying scroll velocity in px/frame-ish units */
  velocity: number;
};

let state: ScrollState = { progress: 0, section: 0, velocity: 0 };
const listeners = new Set<() => void>();

let started = false;
let lastY = 0;
let rafId = 0;
let observer: IntersectionObserver | null = null;

function emit() {
  for (const l of listeners) l();
}

function tick() {
  rafId = 0;
  const doc = document.documentElement;
  const max = doc.scrollHeight - window.innerHeight;
  const y = window.scrollY;
  const progress = max > 0 ? Math.min(1, Math.max(0, y / max)) : 0;
  const rawV = y - lastY;
  lastY = y;

  // low-pass filter the velocity so the 3D reaction is smooth
  const velocity = state.velocity * 0.8 + rawV * 0.2;

  if (
    Math.abs(progress - state.progress) > 0.0005 ||
    Math.abs(velocity - state.velocity) > 0.01
  ) {
    state = { ...state, progress, velocity };
    emit();
  } else if (state.velocity !== 0 && Math.abs(velocity) < 0.01) {
    state = { ...state, velocity: 0 };
    emit();
  }
}

function onScroll() {
  if (!rafId) rafId = requestAnimationFrame(tick);
}

function start() {
  if (started || typeof window === "undefined") return;
  started = true;
  lastY = window.scrollY;

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll, { passive: true });

  observer = new IntersectionObserver(
    (entries) => {
      let best: { idx: number; ratio: number } | null = null;
      for (const entry of entries) {
        const idx = SECTION_IDS.indexOf(entry.target.id as SectionId);
        if (idx === -1) continue;
        if (!best || entry.intersectionRatio > best.ratio) {
          best = { idx, ratio: entry.intersectionRatio };
        }
      }
      if (best && best.ratio > 0 && best.idx !== state.section) {
        state = { ...state, section: best.idx };
        emit();
      }
    },
    { threshold: [0.2, 0.4, 0.6] },
  );

  // Sections may mount after this store; retry a couple of frames.
  const attach = (attempt = 0) => {
    let found = 0;
    for (const id of SECTION_IDS) {
      const el = document.getElementById(id);
      if (el) {
        observer!.observe(el);
        found++;
      }
    }
    if (found < SECTION_IDS.length && attempt < 20) {
      requestAnimationFrame(() => attach(attempt + 1));
    }
  };
  attach();

  tick();
}

function subscribe(cb: () => void) {
  listeners.add(cb);
  start();
  return () => {
    listeners.delete(cb);
  };
}

const serverSnapshot: ScrollState = { progress: 0, section: 0, velocity: 0 };

export function useScrollProgress(): ScrollState {
  return useSyncExternalStore(
    subscribe,
    () => state,
    () => serverSnapshot,
  );
}

/** Non-reactive read for use inside requestAnimationFrame / useFrame loops. */
export function getScrollState(): ScrollState {
  return state;
}

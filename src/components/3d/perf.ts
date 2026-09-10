"use client";

import { useSyncExternalStore } from "react";

export type PerfProfile = {
  enable3d: boolean;
  nodeCount: number;
  dpr: [number, number];
};

const FULL: PerfProfile = { enable3d: true, nodeCount: 160, dpr: [1, 2] };
const LITE: PerfProfile = { enable3d: true, nodeCount: 80, dpr: [1, 1.5] };
const OFF: PerfProfile = { enable3d: false, nodeCount: 0, dpr: [1, 1] };

function compute(): PerfProfile {
  if (typeof window === "undefined") return FULL;

  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce) return OFF;

  const coarse = window.matchMedia("(pointer: coarse)").matches;
  const narrow = window.innerWidth < 768;
  const lowCores =
    typeof navigator.hardwareConcurrency === "number" &&
    navigator.hardwareConcurrency <= 4;

  if (narrow || (coarse && lowCores)) return LITE;
  return FULL;
}

let snapshot = compute();

function subscribe(onChange: () => void) {
  const recompute = () => {
    const next = compute();
    if (
      next.enable3d !== snapshot.enable3d ||
      next.nodeCount !== snapshot.nodeCount
    ) {
      snapshot = next;
      onChange();
    }
  };

  const mqs = [
    window.matchMedia("(prefers-reduced-motion: reduce)"),
    window.matchMedia("(pointer: coarse)"),
  ];
  mqs.forEach((mq) => mq.addEventListener("change", recompute));
  window.addEventListener("resize", recompute);
  recompute();

  return () => {
    mqs.forEach((mq) => mq.removeEventListener("change", recompute));
    window.removeEventListener("resize", recompute);
  };
}

export function usePerfProfile(): PerfProfile {
  return useSyncExternalStore(
    subscribe,
    () => snapshot,
    () => FULL,
  );
}

export const SEQUENCE = {
  count: 120,
  width: 1200,
  height: 676,
  dir: "/sequence",
} as const;

export function framePath(i: number): string {
  return `${SEQUENCE.dir}/frame-${String(i).padStart(3, "0")}.jpg`;
}

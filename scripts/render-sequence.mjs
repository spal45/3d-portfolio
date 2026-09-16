// Extracts the scroll-scrubbed hero image sequence from the source video.
// Requires ffmpeg on PATH (`brew install ffmpeg`).
//
//   node scripts/render-sequence.mjs
//
// Output: public/sequence/frame-000.jpg ... frame-(MAX_FRAMES-1).jpg + manifest.json
// Keep FPS/WIDTH/MAX_FRAMES in sync with src/lib/sequence.ts's { count, width, height }.

import { execFileSync } from "node:child_process";
import { mkdirSync, rmSync, readdirSync, unlinkSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const SOURCE = join(root, "scripts", "source-video.mp4");
const OUT = join(root, "public", "sequence");

const FPS = 12; // 12fps * 10s clip = 120 frames before trimming
const WIDTH = 1200; // height derived from the source aspect ratio
const QUALITY = 7; // ffmpeg -q:v, lower = better/heavier
const MAX_FRAMES = 101; // trimmed to frame-000..frame-100 — raise/drop to use the full clip

rmSync(OUT, { recursive: true, force: true });
mkdirSync(OUT, { recursive: true });

execFileSync(
  "ffmpeg",
  [
    "-hide_banner",
    "-loglevel", "error",
    "-i", SOURCE,
    "-vf", `fps=${FPS},scale=${WIDTH}:-2`,
    "-q:v", String(QUALITY),
    "-start_number", "0",
    join(OUT, "frame-%03d.jpg"),
  ],
  { stdio: "inherit" },
);

let files = readdirSync(OUT).filter((f) => f.endsWith(".jpg")).sort();
if (MAX_FRAMES && files.length > MAX_FRAMES) {
  for (const f of files.slice(MAX_FRAMES)) unlinkSync(join(OUT, f));
  files = files.slice(0, MAX_FRAMES);
}
const probe = execFileSync("ffprobe", [
  "-v", "error",
  "-select_streams", "v:0",
  "-show_entries", "stream=width,height",
  "-of", "csv=p=0",
  join(OUT, "frame-000.jpg"),
])
  .toString()
  .trim()
  .split(",");

writeFileSync(
  join(OUT, "manifest.json"),
  JSON.stringify(
    {
      frames: files.length,
      width: Number(probe[0]),
      height: Number(probe[1]),
      pattern: "frame-%03d.jpg",
      source: `source-video.mp4 @ ${FPS}fps`,
    },
    null,
    2,
  ) + "\n",
);

console.log(
  `done: ${files.length} frames at ${probe[0]}x${probe[1]} -> public/sequence`,
);
console.log("update src/lib/sequence.ts { count, width, height } to match.");

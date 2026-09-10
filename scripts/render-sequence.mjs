// Offline renderer for the scroll-scrubbed "engine core" image sequence.
// Run: node scripts/render-sequence.mjs
// Output: public/sequence/frame-000.jpg ... frame-(N-1).jpg + manifest.json

import { createCanvas } from "@napi-rs/canvas";
import { mkdir, writeFile, rm } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT = join(__dirname, "..", "public", "sequence");

const FRAMES = 120;
const W = 1440;
const H = 810;
const QUALITY = 68;

const ACCENT = [56, 189, 248]; // #38bdf8
const ACCENT_HOT = [125, 211, 252]; // #7dd3fc

// --- geometry: fibonacci sphere ---
const N = 340;
const points = [];
const golden = Math.PI * (3 - Math.sqrt(5));
for (let i = 0; i < N; i++) {
  const y = 1 - (i / (N - 1)) * 2;
  const r = Math.sqrt(1 - y * y);
  const theta = golden * i;
  points.push([Math.cos(theta) * r, y, Math.sin(theta) * r]);
}

// nearest-neighbour edges (each point -> 2 closest, deduped)
const edgeSet = new Set();
const edges = [];
for (let i = 0; i < N; i++) {
  const d = [];
  for (let j = 0; j < N; j++) {
    if (i === j) continue;
    const dx = points[i][0] - points[j][0];
    const dy = points[i][1] - points[j][1];
    const dz = points[i][2] - points[j][2];
    d.push([j, dx * dx + dy * dy + dz * dz]);
  }
  d.sort((a, b) => a[1] - b[1]);
  for (let k = 0; k < 2; k++) {
    const j = d[k][0];
    const key = i < j ? `${i}-${j}` : `${j}-${i}`;
    if (!edgeSet.has(key)) {
      edgeSet.add(key);
      edges.push([i, j]);
    }
  }
}

// orbiting particles on tilted rings
const particles = [];
for (let i = 0; i < 90; i++) {
  particles.push({
    radius: 1.35 + Math.random() * 0.5,
    speed: 0.6 + Math.random() * 1.6,
    phase: Math.random() * Math.PI * 2,
    tilt: (Math.random() - 0.5) * 1.1,
    size: 0.6 + Math.random() * 1.6,
  });
}

function rotY([x, y, z], a) {
  const c = Math.cos(a);
  const s = Math.sin(a);
  return [c * x + s * z, y, -s * x + c * z];
}
function rotX([x, y, z], a) {
  const c = Math.cos(a);
  const s = Math.sin(a);
  return [x, c * y - s * z, s * y + c * z];
}

function project([x, y, z], scale, cx, cy) {
  const persp = 3.2 / (3.2 - z); // z in [-1,1]
  return [cx + x * scale * persp, cy + y * scale * persp, z];
}

function rgba([r, g, b], a) {
  return `rgba(${r},${g},${b},${a})`;
}

async function renderFrame(f) {
  const t = f / FRAMES; // 0..1 loop
  const canvas = createCanvas(W, H);
  const ctx = canvas.getContext("2d");

  // background
  ctx.fillStyle = "#050506";
  ctx.fillRect(0, 0, W, H);

  const cx = W * 0.5;
  const cy = H * 0.5;

  // vignette + core glow
  const glow = ctx.createRadialGradient(cx, cy, 0, cx, cy, W * 0.55);
  glow.addColorStop(0, rgba(ACCENT, 0.16));
  glow.addColorStop(0.35, rgba(ACCENT, 0.05));
  glow.addColorStop(1, "rgba(0,0,0,0)");
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, W, H);

  // faint grid
  ctx.strokeStyle = "rgba(120,140,160,0.05)";
  ctx.lineWidth = 1;
  const gap = 90;
  for (let x = (t * gap) % gap; x < W; x += gap) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, H);
    ctx.stroke();
  }
  for (let y = 0; y < H; y += gap) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(W, y);
    ctx.stroke();
  }

  const ay = t * Math.PI * 2;
  const ax = Math.sin(t * Math.PI * 2) * 0.28 + 0.35;
  const scale = H * 0.34;

  const tp = points.map((p) => project(rotX(rotY(p, ay), ax), scale, cx, cy));

  // edges
  for (const [i, j] of edges) {
    const a = tp[i];
    const b = tp[j];
    const depth = (a[2] + b[2]) / 2; // -1..1
    const alpha = 0.05 + ((depth + 1) / 2) * 0.4;
    ctx.strokeStyle = rgba(ACCENT, alpha);
    ctx.lineWidth = 0.6 + ((depth + 1) / 2) * 1.1;
    ctx.beginPath();
    ctx.moveTo(a[0], a[1]);
    ctx.lineTo(b[0], b[1]);
    ctx.stroke();
  }

  // nodes
  for (let i = 0; i < tp.length; i++) {
    const p = tp[i];
    const near = (p[2] + 1) / 2;
    const pulse = 0.5 + 0.5 * Math.sin(t * Math.PI * 2 * 3 + i * 0.4);
    const rad = 0.8 + near * 2.4 + (i % 17 === 0 ? pulse * 2.5 : 0);
    ctx.fillStyle = rgba(i % 17 === 0 ? ACCENT_HOT : ACCENT, 0.25 + near * 0.6);
    ctx.beginPath();
    ctx.arc(p[0], p[1], rad, 0, Math.PI * 2);
    ctx.fill();
  }

  // orbiting particles
  for (const pt of particles) {
    const ang = pt.phase + t * Math.PI * 2 * pt.speed;
    let v = [Math.cos(ang) * pt.radius, 0, Math.sin(ang) * pt.radius];
    v = rotX(v, pt.tilt);
    v = rotX(rotY(v, ay), ax);
    const p = project(v, scale, cx, cy);
    const near = (p[2] + 1) / 2;
    ctx.fillStyle = rgba(ACCENT_HOT, 0.15 + near * 0.5);
    ctx.beginPath();
    ctx.arc(p[0], p[1], pt.size * (0.5 + near), 0, Math.PI * 2);
    ctx.fill();
  }

  // HUD reticle
  ctx.strokeStyle = rgba(ACCENT, 0.35);
  ctx.lineWidth = 1.2;
  const R = scale * 1.7;
  for (let k = 0; k < 4; k++) {
    const a0 = (k * Math.PI) / 2 + t * Math.PI * 2 * 0.15;
    ctx.beginPath();
    ctx.arc(cx, cy, R, a0, a0 + 0.5);
    ctx.stroke();
  }
  ctx.strokeStyle = rgba(ACCENT, 0.12);
  ctx.beginPath();
  ctx.arc(cx, cy, R * 0.62, 0, Math.PI * 2);
  ctx.stroke();

  // edge vignette
  const vig = ctx.createRadialGradient(cx, cy, H * 0.3, cx, cy, W * 0.7);
  vig.addColorStop(0, "rgba(0,0,0,0)");
  vig.addColorStop(1, "rgba(5,5,6,0.9)");
  ctx.fillStyle = vig;
  ctx.fillRect(0, 0, W, H);

  const buf = await canvas.encode("jpeg", QUALITY);
  const name = `frame-${String(f).padStart(3, "0")}.jpg`;
  await writeFile(join(OUT, name), buf);
  return { name, bytes: buf.length };
}

async function main() {
  await rm(OUT, { recursive: true, force: true });
  await mkdir(OUT, { recursive: true });
  let total = 0;
  for (let f = 0; f < FRAMES; f++) {
    const { bytes } = await renderFrame(f);
    total += bytes;
    if (f % 20 === 0) process.stdout.write(`  frame ${f}/${FRAMES}\n`);
  }
  await writeFile(
    join(OUT, "manifest.json"),
    JSON.stringify({ frames: FRAMES, width: W, height: H, pattern: "frame-%03d.jpg" }, null, 2),
  );
  console.log(
    `done: ${FRAMES} frames, ${(total / 1024 / 1024).toFixed(2)} MB total (${Math.round(total / FRAMES / 1024)} KB avg)`,
  );
}

main();

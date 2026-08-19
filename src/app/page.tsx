// src/app/page.tsx
import CanvasContainer from '@/components/3d/CanvasContainer';

export default function Home() {
  return (
    <main className="relative min-h-screen">
      {/* Fixed 3D Background */}
      <CanvasContainer />

      {/* Foreground UI Layer */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 text-center">
        <span className="px-3 py-1 text-xs font-mono tracking-wider uppercase bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 rounded-full mb-4">
          Full-Stack Developer
        </span>
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight max-w-3xl">
          Architecting Scalable Web Systems & Interactive 3D
        </h1>
        <p className="mt-4 text-zinc-400 max-w-xl text-lg">
          Building resilient backends, performant frontends, and immersive WebGL interfaces.
        </p>
        <div className="mt-8 flex gap-4">
          <a
            href="#projects"
            className="px-6 py-3 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-medium transition"
          >
            View Projects
          </a>
          <a
            href="#contact"
            className="px-6 py-3 rounded-lg border border-zinc-700 hover:bg-zinc-800 text-zinc-200 font-medium transition"
          >
            Contact Me
          </a>
        </div>
      </div>
    </main>
  );
}
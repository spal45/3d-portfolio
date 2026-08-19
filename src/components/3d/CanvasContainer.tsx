'use client';

import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import FloatingShape from './FloatingShape';

export default function CanvasContainer() {
  return (
    <div className="fixed inset-0 -z-10 h-screen w-full pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        dpr={[1, 2]} // Performance optimization for Retina / 4K displays
        gl={{ antialias: true, powerPreference: 'high-performance' }}
      >
        <ambientLight intensity={0.8} />
        <directionalLight position={[5, 10, 7]} intensity={1.5} />
        <pointLight position={[-5, -5, -5]} color="#a855f7" intensity={2} />
        
        <Suspense fallback={null}>
          <FloatingShape />
        </Suspense>
      </Canvas>
    </div>
  );
}
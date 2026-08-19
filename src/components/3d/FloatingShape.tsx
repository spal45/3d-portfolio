'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

export default function FloatingShape() {
  const meshRef = useRef<THREE.Mesh>(null);

  // Subtle continuous rotation on every frame
  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.2;
      meshRef.current.rotation.y += delta * 0.3;
    }
  });

  return (
    <Float speed={2.5} rotationIntensity={1.2} floatIntensity={1.5}>
      <mesh ref={meshRef} scale={1.8}>
        <icosahedronGeometry args={[1, 4]} />
        <MeshDistortMaterial
          color="#4f46e5"
          attach="material"
          distort={0.35}
          speed={2}
          roughness={0.1}
          metalness={0.9}
        />
      </mesh>
    </Float>
  );
}
import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import type * as THREE from "three";

interface ParticleFieldProps {
  mouseX?: number;
  mouseY?: number;
  count?: number;
}

export function ParticleField({
  mouseX = 0,
  mouseY = 0,
  count = 150,
}: ParticleFieldProps) {
  const meshRef = useRef<THREE.Points>(null);

  const [positions, colors] = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10;

      const isCyan = Math.random() > 0.5;
      if (isCyan) {
        // Cyan color in linear RGB
        colors[i * 3] = 0.3;
        colors[i * 3 + 1] = 0.9;
        colors[i * 3 + 2] = 1.0;
      } else {
        // White
        colors[i * 3] = 0.9;
        colors[i * 3 + 1] = 0.9;
        colors[i * 3 + 2] = 1.0;
      }
    }
    return [positions, colors];
  }, [count]);

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.elapsedTime;
    meshRef.current.rotation.y = time * 0.03 + mouseX * 0.3;
    meshRef.current.rotation.x = time * 0.02 + mouseY * 0.2;
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.06}
        vertexColors
        transparent
        opacity={0.7}
        sizeAttenuation
      />
    </points>
  );
}

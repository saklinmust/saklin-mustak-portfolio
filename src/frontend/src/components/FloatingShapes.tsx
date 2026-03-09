import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import type * as THREE from "three";

interface ShapeProps {
  position: [number, number, number];
  rotation: [number, number, number];
  color: string;
  emissive: string;
  geometry: "torus" | "octahedron" | "icosahedron" | "tetrahedron";
  speed: number;
  scale?: number;
}

function Shape({
  position,
  rotation,
  color,
  emissive,
  geometry,
  speed,
  scale = 1,
}: ShapeProps) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!ref.current) return;
    const time = state.clock.elapsedTime;
    ref.current.rotation.x = rotation[0] + time * speed * 0.5;
    ref.current.rotation.y = rotation[1] + time * speed;
    ref.current.rotation.z = rotation[2] + time * speed * 0.3;
    ref.current.position.y = position[1] + Math.sin(time * speed * 0.8) * 0.3;
  });

  return (
    <mesh ref={ref} position={position} scale={scale}>
      {geometry === "torus" && <torusGeometry args={[0.8, 0.25, 16, 64]} />}
      {geometry === "octahedron" && <octahedronGeometry args={[0.8]} />}
      {geometry === "icosahedron" && <icosahedronGeometry args={[0.8, 0]} />}
      {geometry === "tetrahedron" && <tetrahedronGeometry args={[0.8]} />}
      <meshPhongMaterial
        color={color}
        emissive={emissive}
        emissiveIntensity={0.4}
        wireframe
        transparent
        opacity={0.5}
      />
    </mesh>
  );
}

export function FloatingShapes() {
  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[5, 5, 5]} intensity={0.5} color="#00e5ff" />
      <pointLight position={[-5, -5, -5]} intensity={0.3} color="#7c3aed" />

      <Shape
        position={[-4, 1.5, -2]}
        rotation={[0.3, 0.5, 0]}
        color="#00e5ff"
        emissive="#00e5ff"
        geometry="torus"
        speed={0.4}
        scale={1.2}
      />
      <Shape
        position={[4, -1, -3]}
        rotation={[0.5, 0.3, 0.2]}
        color="#7c3aed"
        emissive="#7c3aed"
        geometry="octahedron"
        speed={0.35}
        scale={0.9}
      />
      <Shape
        position={[0, 2.5, -4]}
        rotation={[0.1, 0.2, 0.3]}
        color="#10d9c0"
        emissive="#10d9c0"
        geometry="icosahedron"
        speed={0.28}
        scale={1.1}
      />
      <Shape
        position={[-3, -2, -2]}
        rotation={[0.4, 0.1, 0.5]}
        color="#00e5ff"
        emissive="#00e5ff"
        geometry="tetrahedron"
        speed={0.45}
        scale={0.7}
      />
      <Shape
        position={[3.5, 2, -5]}
        rotation={[0.2, 0.6, 0.1]}
        color="#7c3aed"
        emissive="#7c3aed"
        geometry="torus"
        speed={0.3}
        scale={0.8}
      />
    </>
  );
}

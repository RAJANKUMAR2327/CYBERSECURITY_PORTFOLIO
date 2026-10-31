import { Sphere } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";

export default function Shield() {
  const meshRef = useRef();

  useFrame(({ clock }) => {
    if (!meshRef.current) return;

    meshRef.current.material.opacity =
      0.06 + Math.sin(clock.elapsedTime * 3) * 0.02;
  });

  return (
    <Sphere
      ref={meshRef}
      args={[1.16, 64, 64]}
    >
      <meshBasicMaterial
        color="#00F5FF"
        transparent
        opacity={0.06}
        wireframe
        toneMapped={false}
      />
    </Sphere>
  );
}
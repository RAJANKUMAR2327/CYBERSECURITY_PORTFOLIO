import * as THREE from "three";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";

export default function CyberShield() {
  const shield = useRef();

  useFrame(({ clock }) => {
    if (!shield.current) return;

    shield.current.rotation.y += 0.0008;

    shield.current.material.opacity =
      0.08 + Math.sin(clock.elapsedTime * 2) * 0.02;
  });

  return (
    <mesh ref={shield} scale={1.22}>
      <sphereGeometry args={[1.05, 64, 64]} />

      <meshBasicMaterial
        color="#00F5FF"
        transparent
        opacity={0.08}
        side={THREE.DoubleSide}
        wireframe
      />
    </mesh>
  );
}
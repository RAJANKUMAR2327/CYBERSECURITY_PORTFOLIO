import { Cylinder } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";

export default function ScannerBeam() {
  const beam = useRef();

  useFrame(({ clock }) => {
    if (!beam.current) return;

    beam.current.position.y =
      Math.sin(clock.elapsedTime * 2) * 0.7;

    beam.current.material.opacity =
      0.15 + Math.sin(clock.elapsedTime * 5) * 0.05;
  });

  return (
    <Cylinder
      ref={beam}
      args={[0.015, 0.015, 3.2, 32]}
      rotation={[0, 0, Math.PI / 2]}
    >
      <meshBasicMaterial
        color="#00F5FF"
        transparent
        opacity={0.2}
        toneMapped={false}
      />
    </Cylinder>
  );
}
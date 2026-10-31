import { Sphere } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";

export default function ThreatPulse() {
  const pulse = useRef();

  useFrame(({ clock }) => {
    if (!pulse.current) return;

    const t = (clock.elapsedTime % 2) / 2;

    const scale = 1 + t * 0.6;

    pulse.current.scale.set(scale, scale, scale);

    pulse.current.material.opacity = 0.25 * (1 - t);
  });

  return (
    <Sphere ref={pulse} args={[1.05, 64, 64]}>
      <meshBasicMaterial
        color="#00F5FF"
        transparent
        opacity={0.25}
        wireframe
        toneMapped={false}
      />
    </Sphere>
  );
}
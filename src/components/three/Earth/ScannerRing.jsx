import { Torus } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";

export default function ScannerRing() {
  const ring = useRef();

  useFrame(({ clock }) => {
    if (!ring.current) return;

    const t = clock.elapsedTime;

    // Move up and down
    ring.current.position.y = Math.sin(t * 0.8) * 1.05;

    // Rotate
    ring.current.rotation.x += 0.01;

    // Pulse
    const s = 1 + Math.sin(t * 3) * 0.04;
    ring.current.scale.set(s, s, s);
  });

  return (
    <Torus
      ref={ring}
      args={[1.12, 0.025, 24, 150]}
      rotation={[Math.PI / 2, 0, 0]}
    >
      <meshBasicMaterial
        color="#00F5FF"
        transparent
        opacity={1}
        toneMapped={false}
      />
    </Torus>
  );
}
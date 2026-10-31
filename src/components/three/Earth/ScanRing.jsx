import { Torus } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";

export default function ScanRing() {
  const ref = useRef();

  useFrame(({ clock }) => {
    if (!ref.current) return;

    ref.current.position.y =
      -1 + ((clock.elapsedTime * 0.4) % 2);

    ref.current.rotation.x += 0.01;
  });

  return (
    <Torus
      ref={ref}
      args={[1.08, 0.01, 16, 150]}
      rotation={[Math.PI / 2, 0, 0]}
    >
      <meshBasicMaterial
        color="#00F5FF"
        transparent
        opacity={0.6}
        toneMapped={false}
      />
    </Torus>
  );
}
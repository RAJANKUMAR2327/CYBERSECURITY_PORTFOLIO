import { Sphere } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";

export default function PacketFlow() {
  const packet = useRef();

  useFrame(({ clock }) => {
    if (!packet.current) return;

    const t = (Math.sin(clock.elapsedTime) + 1) / 2;

    const x = -0.65 + (0.72 + 0.65) * t;
    const y = 0.42 + Math.sin(t * Math.PI) * 0.8;
    const z = 0.52 + (0.68 - 0.52) * t;

    packet.current.position.set(x, y, z);
  });

  return (
    <Sphere ref={packet} args={[0.025, 16, 16]}>
      <meshBasicMaterial
        color="#00F5FF"
        toneMapped={false}
      />
    </Sphere>
  );
}
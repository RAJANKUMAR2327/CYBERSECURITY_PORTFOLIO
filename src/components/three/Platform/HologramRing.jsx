import { useRef } from "react";
import { useFrame } from "@react-three/fiber";

export default function HologramRing() {
  const ref = useRef();

  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.z -= 0.002;
    }
  });

  return (
    <mesh
      ref={ref}
      rotation={[Math.PI / 2, 0, 0]}
      position={[0, -1.18, 0]}
    >
      <torusGeometry args={[1.42, 0.025, 32, 200]} />

      <meshBasicMaterial
        color="#00F5FF"
        transparent
        opacity={1}
        toneMapped={false}
      />
    </mesh>
  );
}
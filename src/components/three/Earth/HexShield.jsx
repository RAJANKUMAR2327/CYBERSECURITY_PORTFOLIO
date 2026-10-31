import { Torus } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";

export default function HexShield() {
  const group = useRef();

  useFrame(() => {
    if (!group.current) return;

    group.current.rotation.y += 0.002;
    group.current.rotation.z += 0.001;
  });

  return (
    <group ref={group}>
      <Torus
        args={[1.18, 0.004, 16, 6]}
        rotation={[Math.PI / 2, 0, 0]}
      >
        <meshBasicMaterial
          color="#00F5FF"
          transparent
          opacity={0.35}
          toneMapped={false}
        />
      </Torus>

      <Torus
        args={[1.18, 0.004, 16, 6]}
        rotation={[0, Math.PI / 2, 0]}
      >
        <meshBasicMaterial
          color="#00F5FF"
          transparent
          opacity={0.25}
          toneMapped={false}
        />
      </Torus>

      <Torus
        args={[1.18, 0.004, 16, 6]}
        rotation={[0.8, 0.8, 0]}
      >
        <meshBasicMaterial
          color="#7C3AED"
          transparent
          opacity={0.25}
          toneMapped={false}
        />
      </Torus>
    </group>
  );
}
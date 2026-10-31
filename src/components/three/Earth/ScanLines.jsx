import { useFrame } from "@react-three/fiber";
import { useRef } from "react";

export default function ScanLines() {
  const group = useRef();

  useFrame(({ clock }) => {
    if (group.current) {
      group.current.position.y =
        Math.sin(clock.elapsedTime * 0.6) * 0.9;
    }
  });

  return (
    <group ref={group}>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.12, 0.008, 16, 100]} />

        <meshBasicMaterial
          color="#00F5FF"
          transparent
          opacity={0.7}
          toneMapped={false}
        />
      </mesh>
    </group>
  );
}
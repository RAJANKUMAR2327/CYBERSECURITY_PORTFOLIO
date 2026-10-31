import { Sphere } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";

export default function LightOrbs() {
  const group = useRef();

  useFrame(({ clock }) => {
    if (!group.current) return;

    group.current.rotation.y = clock.elapsedTime * 0.05;
  });

  return (
    <group ref={group}>
      {[...Array(20)].map((_, i) => {
        const angle = (i / 20) * Math.PI * 2;

        return (
          <Sphere
            key={i}
            args={[0.04, 16, 16]}
            position={[
              Math.cos(angle) * 10,
              Math.sin(i) * 4,
              Math.sin(angle) * 10,
            ]}
          >
            <meshBasicMaterial
              color={i % 2 ? "#00F5FF" : "#7C3AED"}
              toneMapped={false}
            />
          </Sphere>
        );
      })}
    </group>
  );
}
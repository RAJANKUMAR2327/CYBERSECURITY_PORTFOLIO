import { Text } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";

const techs = [
  "React",
  "Three.js",
  "Python",
  "FastAPI",
  "Tailwind",
];

export default function TechIcons() {
  const group = useRef();

  useFrame(({ clock }) => {
    if (!group.current) return;

    group.current.rotation.y = clock.elapsedTime * 0.12;
  });

  return (
    <group ref={group}>
      {techs.map((tech, index) => {
        const angle = (index / techs.length) * Math.PI * 2;

        const x = Math.cos(angle) * 2.1;
        const z = Math.sin(angle) * 2.1;

        return (
          <Text
            key={tech}
            scale={1 + Math.sin(index) * 0.15}
            position={[
              x,
              Math.sin(index) * 0.35,
              z
            ]}
            fontSize={0.08}
            color="#00F5FF"
            anchorX="center"
            anchorY="middle"
          >
            {tech}
          </Text>
        );
      })}
    </group>
  );
}
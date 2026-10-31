import { useFrame } from "@react-three/fiber";
import { useRef } from "react";

import TechLogo from "./TechLogo";

const icons = [
  "/icons/react.png",
  "/icons/python.png",
  "/icons/mongodb.png",
  "/icons/tailwind.png",
  "/icons/threejs.png",
];

export default function TechOrbit() {
  const group = useRef();

  useFrame(({ clock }) => {
    if (!group.current) return;

    group.current.rotation.y = clock.elapsedTime * 0.15;
  });

  return (
    <group ref={group}>
      {icons.map((icon, i) => {
        const angle = (i / icons.length) * Math.PI * 2;

        return (
          <TechLogo
            key={i}
            texture={icon}
            position={[
              Math.cos(angle) * 2.2,
              Math.sin(i) * 0.4,
              Math.sin(angle) * 2.2,
            ]}
          />
        );
      })}
    </group>
  );
}
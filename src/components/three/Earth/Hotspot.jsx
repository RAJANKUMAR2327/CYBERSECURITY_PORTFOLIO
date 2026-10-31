import { Sphere } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";

export default function Hotspot({
  position,
  color = "#00F5FF",
  onClick,
}) {
  const ref = useRef();
  const [hovered, setHovered] = useState(false);

  useFrame(({ clock }) => {
    if (!ref.current) return;

    const targetScale = hovered ? 1.6 : 1.2;
    const s =
      targetScale +
      Math.sin(clock.elapsedTime * 5) * 0.15;
    ref.current.scale.set(s, s, s);
  });

  return (
    <Sphere
      ref={ref}
      args={[0.04, 24, 24]}
      position={position}
      onPointerOver={() => {
        setHovered(true);
        document.body.style.cursor = "pointer";
      }}
      onPointerOut={() => {
        setHovered(false);
        document.body.style.cursor = "default";
      }}
      onClick={onClick}
    >
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={2}
      />
    </Sphere>
  );
}
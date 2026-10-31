import { Text } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";

export default function FloatingLabel({
  text,
  radius = 1.6,
  speed = 0.3,
  offset = 0,
  color = "#00F5FF",
}) {
  const ref = useRef();

  useFrame(({ clock }) => {
    if (!ref.current) return;

    const t = clock.elapsedTime * speed + offset;

    ref.current.position.x = Math.cos(t) * radius;
    ref.current.position.z = Math.sin(t) * radius;
    ref.current.position.y = Math.sin(t * 2) * 0.2;

    ref.current.lookAt(0, 0.35, 0);
  });

  return (
    <Text
      ref={ref}
      fontSize={0.08}
      color={color}
      anchorX="center"
      anchorY="middle"
    >
      {text}
    </Text>
  );
}
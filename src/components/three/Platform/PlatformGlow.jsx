import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { animated, useSpring } from "@react-spring/three";

export default function PlatformGlow() {
  const ref = useRef();

  const glow = useSpring({
    from: {
      scale: 0,
    },
    to: {
      scale: 1,
    },
    delay: 600,
  });

  useFrame(({ clock }) => {
    if (!ref.current) return;

    const s = 1 + Math.sin(clock.elapsedTime * 2) * 0.08;

    // Subtly pulses the mesh scale on top of the initial spring animation
    ref.current.scale.set(s, s, s);
  });

  return (
    <animated.mesh
      ref={ref}
      scale={glow.scale}
      rotation={[-Math.PI / 2, 0, 0]}
      position={[0, -1.55, 0]}
    >
      <circleGeometry args={[1.4, 64]} />

      <meshBasicMaterial
        color="#00F5FF"
        transparent
        opacity={0.18}
        toneMapped={false}
      />
    </animated.mesh>
  );
}
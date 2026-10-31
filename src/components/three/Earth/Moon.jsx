import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";

export default function Moon() {
  const moonRef = useRef();

  const moonTexture = useLoader(
    TextureLoader,
    "/textures/moon/moon.jpg"
  );

  useFrame(({ clock }) => {
    if (!moonRef.current) return;

    const t = clock.elapsedTime * 0.25;

    moonRef.current.position.x = Math.cos(t) * 3.2;
    moonRef.current.position.z = Math.sin(t) * 3.2;
    moonRef.current.position.y = Math.sin(t * 0.5) * 0.3;

    moonRef.current.rotation.y += 0.003;
  });

  return (
    <mesh 
    ref={moonRef}
    castShadow
    receiveShadow
    >
      <sphereGeometry args={[0.23, 64, 64]} />

      <meshStandardMaterial
        map={moonTexture}
        roughness={1}
        metalness={0}
      />
    </mesh>
  );
}
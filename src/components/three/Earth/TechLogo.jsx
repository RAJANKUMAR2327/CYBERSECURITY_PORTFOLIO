import { Billboard, Plane } from "@react-three/drei";
import { useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";
import { useState } from "react";

export default function TechLogo({
  texture,
  position,
  scale = 0.28,
}) {
  const [hovered, setHovered] = useState(false);

  const map = useLoader(TextureLoader, texture);

  return (
    <Billboard position={position}>
      <Plane
        args={[
          hovered ? scale * 1.3 : scale,
          hovered ? scale * 1.3 : scale,
        ]}
        onPointerOver={() => {
          setHovered(true);
          document.body.style.cursor = "pointer";
        }}
        onPointerOut={() => {
          setHovered(false);
          document.body.style.cursor = "default";
        }}
      >
        <meshBasicMaterial
          map={map}
          transparent
          toneMapped={false}
        />
      </Plane>
    </Billboard>
  );
}
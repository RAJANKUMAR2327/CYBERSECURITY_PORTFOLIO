import { Ring } from "@react-three/drei";

export default function Galaxy() {
  return (
    <Ring
      args={[4.5, 7, 128]}
      rotation={[-Math.PI / 2, 0, 0]}
      position={[0, 0, -8]}
    >
      <meshBasicMaterial
        color="#00F5FF"
        transparent
        opacity={0.05}
        side={2}
        toneMapped={false}
      />
    </Ring>
  );
}
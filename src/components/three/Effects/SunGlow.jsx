export default function SunGlow() {
  return (
    <mesh position={[8, 5, -12]}>
      <sphereGeometry args={[1.8, 32, 32]} />

      <meshBasicMaterial
        color="#60A5FA"
        transparent
        opacity={0.35}
        toneMapped={false}
      />
    </mesh>
  );
}
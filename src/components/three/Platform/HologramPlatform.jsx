import EnergyRing from "./EnergyRing";

export default function HologramPlatform() {
  return (
    <group position={[0, -1.55, 0]}>

      {/* Invisible shadow receiver */}
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        receiveShadow
      >
        <circleGeometry args={[1.8, 64]} />
        <shadowMaterial opacity={0.25} />
      </mesh>

      <EnergyRing
        radius={1.20}
        tube={0.02}
        color="#00F5FF"
        speed={0.003}
      />

      <EnergyRing
        radius={1.35}
        tube={0.015}
        color="#7C3AED"
        speed={-0.002}
      />

      <EnergyRing
        radius={1.00}
        tube={0.02}
        color="#00FFD5"
        speed={0.004}
      />

    </group>
  );
}
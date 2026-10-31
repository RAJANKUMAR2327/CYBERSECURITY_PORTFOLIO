export default function Lighting() {
  return (
    <>
      {/* Ambient space light */}
      <ambientLight intensity={0.28} />

      {/* Main Sun */}
      <directionalLight
        position={[8, 4, 6]}
        intensity={3}
        color="#ffffff"
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />

      {/* Cyan fill light */}
      <pointLight
        position={[-4, 2, 5]}
        intensity={1.2}
        color="#00F5FF"
      />

      {/* Purple rim light */}
      <pointLight
        position={[4, -2, -5]}
        intensity={0.6}
        color="#7C3AED"
      />

      {/* Soft sky/ground fill (replaces the CDN-hosted HDR environment) */}
      <hemisphereLight args={["#1e3a8a", "#020617", 0.35]} />
    </>
  );
}
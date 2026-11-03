import Hotspot from "./Hotspot";

export default function ProjectHotspots({
  setSelectedProject,
}) {
  const toggle = (id) =>
    setSelectedProject((prev) => (prev === id ? null : id));

  return (
    <>
      <Hotspot
        position={[0.65, 0.35, 0.72]}
        color="#00F5FF"
        onClick={() => toggle(0)}
      />

      <Hotspot
        position={[-0.72, 0.42, 0.42]}
        color="#7C3AED"
        onClick={() => toggle(1)}
      />

      <Hotspot
        position={[0.45, -0.55, 0.82]}
        color="#00FFD5"
        onClick={() => toggle(2)}
      />

      <Hotspot
        position={[-0.55, -0.45, 0.78]}
        color="#00FF88"
        onClick={() => toggle(3)}
      />

      <Hotspot
        position={[0.05, 0.78, 0.65]}
        color="#FFB020"
        onClick={() => toggle(4)}
      />
    </>
  );
}
import Hotspot from "./Hotspot";
import { HOTSPOTS } from "./hotspotLayout";

export default function ProjectHotspots({ setSelectedProject }) {
  const toggle = (id) =>
    setSelectedProject((prev) => (prev === id ? null : id));

  return (
    <>
      {HOTSPOTS.map((h) => (
        <Hotspot
          key={h.id}
          position={h.position}
          color={h.color}
          onClick={() => toggle(h.id)}
        />
      ))}
    </>
  );
}

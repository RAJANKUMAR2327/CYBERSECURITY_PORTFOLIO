import projects from "../../../data/projects";

// One hotspot per project, placed automatically on the front hemisphere with a
// golden-angle spiral, so adding or removing a project needs no 3D edits.
const PALETTE = [
  "#00F5FF",
  "#7C3AED",
  "#00FFD5",
  "#00FF88",
  "#FFB020",
  "#FF4D8D",
  "#4DA3FF",
  "#B6FF4D",
];
const GOLDEN_ANGLE = Math.PI * (3 - Math.sqrt(5));
const MAX_POLAR = 1.1; // radians from the camera axis (about 63 degrees)
export const HOTSPOT_RADIUS = 1.08; // just outside the Earth (radius 1.05)

export function buildHotspots(list = projects) {
  const n = list.length;
  return list.map((project, i) => {
    const t = n === 1 ? 0 : (i + 0.5) / n;
    const polar = Math.acos(1 - t * (1 - Math.cos(MAX_POLAR)));
    const azimuth = i * GOLDEN_ANGLE + 0.6;

    // unit direction, +z points at the camera
    const x = Math.sin(polar) * Math.cos(azimuth);
    const y = Math.sin(polar) * Math.sin(azimuth);
    const z = Math.cos(polar);

    // Euler (XYZ) rotation that turns this direction to face the camera:
    // yaw about Y first, then pitch about X.
    const yaw = Math.atan2(x, z);
    const pitch = Math.atan2(y, Math.hypot(x, z));

    return {
      id: project.id,
      color: PALETTE[i % PALETTE.length],
      position: [x * HOTSPOT_RADIUS, y * HOTSPOT_RADIUS, z * HOTSPOT_RADIUS],
      rotation: [pitch, -yaw, 0],
    };
  });
}

export const HOTSPOTS = buildHotspots();

import { describe, expect, it } from "vitest";
import projects from "../../../data/projects";
import { buildHotspots, HOTSPOT_RADIUS, HOTSPOTS } from "./hotspotLayout";

describe("Earth project hotspot layout", () => {
  it("creates exactly one hotspot for each project, preserving IDs", () => {
    expect(HOTSPOTS).toHaveLength(projects.length);
    expect(HOTSPOTS.map((point) => point.id)).toEqual(projects.map((project) => project.id));
  });

  it("places every hotspot on the configured shell radius", () => {
    for (const point of HOTSPOTS) {
      const radius = Math.hypot(...point.position);
      expect(radius).toBeCloseTo(HOTSPOT_RADIUS, 8);
    }
  });

  it("returns finite coordinates, rotations and colors", () => {
    for (const point of HOTSPOTS) {
      expect(point.position).toHaveLength(3);
      expect(point.rotation).toHaveLength(3);
      expect([...point.position, ...point.rotation].every(Number.isFinite)).toBe(true);
      expect(point.color).toMatch(/^#[0-9A-F]{6}$/i);
    }
  });

  it("handles empty and single-project inputs", () => {
    expect(buildHotspots([])).toEqual([]);
    const [single] = buildHotspots([{ id: "only" }]);
    expect(single.id).toBe("only");
    expect(single.position[2]).toBeCloseTo(HOTSPOT_RADIUS, 8);
  });

  it("is deterministic for the same project list", () => {
    expect(buildHotspots(projects)).toEqual(buildHotspots(projects));
  });
});

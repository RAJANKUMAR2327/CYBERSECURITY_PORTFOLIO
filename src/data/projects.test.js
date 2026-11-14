import { describe, expect, it } from "vitest";
import projects from "./projects";

describe("cybersecurity project evidence and metadata", () => {
  it("has unique project IDs and non-empty titles, descriptions and tech stacks", () => {
    const ids = projects.map((project) => project.id);
    expect(new Set(ids).size).toBe(ids.length);
    for (const project of projects) {
      expect(project.title.trim()).not.toBe("");
      expect(project.description.trim()).not.toBe("");
      expect(project.tech.length).toBeGreaterThan(0);
    }
  });

  it("uses valid HTTPS URLs for published project repositories and demos", () => {
    for (const project of projects) {
      for (const field of ["github", "live"]) {
        if (project[field]) {
          expect(() => new URL(project[field])).not.toThrow();
          expect(new URL(project[field]).protocol).toBe("https:");
        }
      }
    }
  });

  it("documents security design claims with supporting case-study fields", () => {
    const pdg = projects.find((project) => /Personal Digital Guardian/i.test(project.title));
    const netguard = projects.find((project) => /NetGuard AI/i.test(project.title));
    expect(pdg).toBeTruthy();
    expect(pdg.architecture.length).toBeGreaterThan(0);
    expect(pdg.engineeringDecisions.length).toBeGreaterThan(0);
    expect(pdg.evaluationStatus).toMatch(/Known limits|limits/i);

    expect(netguard).toBeTruthy();
    expect(netguard.architecture.length).toBeGreaterThan(0);
    expect(netguard.engineeringDecisions.length).toBeGreaterThan(0);
    expect(netguard.evaluationStatus).toMatch(/synthetic|real-world/i);
  });

  it("does not present an evaluation status as an empty claim", () => {
    for (const project of projects) {
      if (project.evaluationStatus !== undefined) {
        expect(project.evaluationStatus.trim().length).toBeGreaterThan(20);
      }
    }
  });
});

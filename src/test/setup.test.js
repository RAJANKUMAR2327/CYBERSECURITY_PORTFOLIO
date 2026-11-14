
import { describe, it, expect } from "vitest";

describe("Portfolio test setup", () => {
  it("should run Vitest successfully", () => {
    expect(1 + 1).toBe(2);
  });

  it("should recognize the portfolio project name", () => {
    const projectName = "PORTPOLIO";
    expect(projectName).toBe("PORTPOLIO");
  });

  it("should verify that the project name is not empty", () => {
    const projectName = "Cybersecurity Portfolio";
    expect(projectName.length).toBeGreaterThan(0);
  });
});

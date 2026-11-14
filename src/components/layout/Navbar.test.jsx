import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import Navbar from "./Navbar";

describe("Navbar", () => {
  it("renders the primary navigation and links to real section IDs", () => {
    render(<Navbar />);
    const nav = screen.getByRole("navigation", { name: "Primary" });
    const expected = ["Home", "About", "Skills", "Projects", "Writing", "Certifications", "Experience", "Education", "Contact"];

    for (const label of expected) {
      expect(within(nav).getByRole("link", { name: label })).toHaveAttribute(
        "href",
        `#${label.toLowerCase()}`
      );
    }
  });

  it("opens the mobile menu and exposes its links", async () => {
    const user = userEvent.setup();
    render(<Navbar />);
    const toggle = screen.getByRole("button", { name: "Open navigation menu" });

    await user.click(toggle);
    expect(screen.getByRole("button", { name: "Close navigation menu" })).toHaveAttribute("aria-expanded", "true");

    const mobileProjects = screen.getAllByRole("link", { name: "Projects" });
    expect(mobileProjects.length).toBeGreaterThan(1);
  });

  it("closes the mobile menu after a section link is selected", async () => {
    const user = userEvent.setup();
    render(<Navbar />);
    await user.click(screen.getByRole("button", { name: "Open navigation menu" }));

    const projectLinks = screen.getAllByRole("link", { name: "Projects" });
    await user.click(projectLinks[projectLinks.length - 1]);

    expect(screen.getByRole("button", { name: "Open navigation menu" })).toHaveAttribute("aria-expanded", "false");
  });

  it("provides a downloadable resume link", () => {
    render(<Navbar />);
    const resumeLinks = screen.getAllByRole("link", { name: "Resume" });
    expect(resumeLinks[0]).toHaveAttribute("href", "/resume.pdf");
    expect(resumeLinks[0]).toHaveAttribute("download", "Rajan_Kumar_Resume.pdf");
  });
});

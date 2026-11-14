import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import Projects from "./Projects";
import projects from "../../data/projects";

describe("Projects section", () => {
  it("renders every project and its technology tags", () => {
    render(<Projects />);
    for (const project of projects) {
      expect(screen.getByRole("heading", { name: project.title })).toBeInTheDocument();
      for (const technology of project.tech) {
        expect(screen.getAllByText(technology).length).toBeGreaterThan(0);
      }
    }
  });

  it("shows the first project's case study by default", () => {
    render(<Projects />);
    expect(screen.getByText(projects[0].whyItMatters)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /hide case study/i })).toHaveAttribute("aria-expanded", "true");
  });

  it("expands and collapses a project case study", async () => {
    const user = userEvent.setup();
    render(<Projects />);
    const second = projects[1];
    const cardHeading = screen.getByRole("heading", { name: second.title });
    const card = cardHeading.closest("div.glass");
    const toggle = within(card).getByRole("button", { name: /view case study/i });

    await user.click(toggle);
    expect(toggle).toHaveAttribute("aria-expanded", "true");
    expect(within(card).getByText(second.whyItMatters)).toBeInTheDocument();

    await user.click(within(card).getByRole("button", { name: /hide case study/i }));
    expect(within(card).queryByText(second.whyItMatters)).not.toBeInTheDocument();
  });

  it("opens external project links safely in a new tab", () => {
    render(<Projects />);
    const github = screen.getAllByRole("link", { name: /code/i })[0];
    expect(github).toHaveAttribute("target", "_blank");
    expect(github).toHaveAttribute("rel", "noopener noreferrer");
    expect(github).toHaveAttribute("href", projects[0].github);
  });
});

import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Contact from "./Contact";
import socials from "../../data/socials";

describe("Contact section", () => {
  it("renders the contact call to action and contact details", () => {
    render(<Contact />);
    expect(screen.getByRole("heading", { name: /let's build something meaningful/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /email me/i })).toHaveAttribute("href", `mailto:${socials.email}`);
    expect(screen.getByText(socials.email)).toBeInTheDocument();
    expect(screen.getByText(socials.location)).toBeInTheDocument();
  });

  it("uses safe external links for LinkedIn, GitHub and developer portfolio", () => {
    render(<Contact />);
    for (const [name, href] of [
      ["LinkedIn", socials.linkedin],
      ["GitHub", socials.github],
      ["Developer Portfolio", socials.devPortfolio],
    ]) {
      const link = screen.getByRole("link", { name: new RegExp(name, "i") });
      expect(link).toHaveAttribute("href", href);
      expect(link).toHaveAttribute("target", "_blank");
      expect(link).toHaveAttribute("rel", "noopener noreferrer");
    }
  });

  it("creates a normalized telephone link", () => {
    render(<Contact />);
    expect(screen.getByRole("link", { name: socials.phone })).toHaveAttribute(
      "href",
      `tel:${socials.phone.replace(/\s+/g, "")}`
    );
  });
});

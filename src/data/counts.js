import projects from "./projects";
import certificates from "./certificates";
import experience from "./experience";

// Single source of truth for every number shown on the page.
export const projectCount = projects.length;
export const certificationCount = certificates.filter((c) => !c.internship).length;
export const internshipCount = experience.filter((e) =>
  /intern/i.test(e.role)
).length;

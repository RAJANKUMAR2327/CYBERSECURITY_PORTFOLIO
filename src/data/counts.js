import projects from "./projects";
import certificates from "./certificates";
import experience from "./experience";

// Single source of truth for every number shown on the page.
export const projectCount = projects.length;

const isCisco = (c) => c.issuer.startsWith("Cisco");

// Non-Cisco certificates with an uploaded proof image (internships counted separately).
export const verifiedCertificateCount = certificates.filter(
  (c) => !c.internship && !isCisco(c) && c.proof
).length;

// Cisco Networking Academy courses (Credly badge links or certificate images).
export const courseCount = certificates.filter(isCisco).length;

export const internshipCount = experience.filter(
  (e) => e.kind === "internship"
).length;
export const trainingCount = experience.filter(
  (e) => e.kind === "training"
).length;
export const experienceCount = experience.length;

export const detectorCount =
  projects.find((p) => p.detectors)?.detectors ?? 0;

export const domains = ["Cybersecurity", "Full-Stack", "Applied AI/ML"];
export const flagshipProject = projects[0].title.split(" — ")[0];

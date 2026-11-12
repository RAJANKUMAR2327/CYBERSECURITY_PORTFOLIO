# Rajan Kumar — Portfolio

A cybersecurity/AI-engineering portfolio built as an interactive 3D
experience: a rotating Earth with clickable project hotspots, set against
an animated space background, with real project, certification, and
internship data pulled from verified sources.

## Tech Stack

- **React 19** + **Vite** — app shell and dev/build tooling
- **Tailwind CSS 4** (via `@tailwindcss/vite`) — styling
- **Framer Motion** — section reveals, transitions, mobile menu
- **React Three Fiber** + **drei** + **Three.js** — the 3D Earth scene
- **@react-three/postprocessing** — bloom/post-processing effects
- **react-type-animation** — hero typing effect (the stat counters are built on Framer Motion)
- **lucide-react** — icon set

## Features

- Interactive 3D Earth with clickable project hotspots
- Sections: Hero, At a Glance, About, Skills, Projects, Certifications, Experience, Education, Contact
- Keyboard fallback: the project buttons below the globe appear on focus
- Certificate lightbox — click a verified certification or internship to
  view the real certificate image full-screen
- Working mobile navigation with a slide-down menu
- Downloadable resume (`public/resume.pdf`)
- Reduced-motion support for CSS animations (`prefers-reduced-motion`)

## Project Architecture

```
src/
├── components/
│   ├── background/     # animated space background (stars, nebula, dust...)
│   ├── Hero/            # hero section subcomponents (LeftPanel, Stats, etc.)
│   ├── layout/           # Navbar, Footer
│   ├── three/            # the entire 3D Earth scene
│   │   ├── Earth/         # Earth mesh, clouds, hotspots, data packets...
│   │   ├── Effects/        # lighting, camera, post-processing
│   │   └── Platform/        # hologram platform under the Earth
│   └── ui/                # Lightbox, ProjectCard3D
├── data/                  # <- all real content lives here
│   ├── projects.js
│   ├── skills.js
│   ├── experience.js
│   ├── education.js
│   ├── certificates.js
│   └── socials.js
├── sections/               # top-level page sections, one folder each
├── App.jsx
└── main.jsx
```

**Single source of truth:** every real piece of content — projects,
certifications, skills, experience, contact info — lives in `src/data/`.
Both the normal sections *and* the 3D Earth's project cards read from the
same files. Don't hardcode project/cert data anywhere else.

## Running Locally

```bash
npm install
npm run dev
```

Then open the local URL Vite prints (usually `http://localhost:5173`).

## Build

```bash
npm run build
npm run preview   # sanity-check the production build locally
```

## Deployment

This is a static Vite app — it deploys cleanly to Vercel, Netlify, or
GitHub Pages. Vercel auto-detects the Vite framework preset; no extra
config needed.

## Adding a Project

1. Add an entry to `src/data/projects.js` with the next sequential `id` (same fields as the existing entries).
2. That's it for the 3D globe: `src/components/three/Earth/hotspotLayout.js` places one hotspot per project
   automatically, computes the rotation that turns it to face the camera, and the camera framing is shared.
3. Counts shown on the page come from `src/data/counts.js`; don't hardcode them.

## Writing section

Edit `src/data/writing.js`. Each note has a `source` line naming the file or document in the project that backs it
up; keep that honest.

## Adding a Certificate / Internship with Proof

1. Drop the certificate image in `public/certificates/`.
2. Add a `proof: "/certificates/yourfile.jpg"` field to the matching entry
   in `src/data/certificates.js` or `src/data/experience.js`.
3. The click-to-expand lightbox behavior is automatic — no component code
   changes needed.

## Known Limitations

- Use `npm ci` for reproducible installs; `package-lock.json` is committed.
- **Reduced-motion support is partial.** CSS animations and the Earth's
  auto-rotation respect `prefers-reduced-motion`; some Framer Motion and
  other Three.js animations (orbiting objects, background blobs) do not yet.
- The 3D hotspots themselves aren't keyboard-operable, but visually hidden
  project buttons (shown on focus) and the Projects section provide the same access.
- The Earth is not draggable: `OrbitControls` was removed because `CameraController` overwrote the camera every frame, and it also captured touch scrolling on phones. The globe rotates itself and reacts to mouse movement.
- Not yet checked in a real browser or on a physical phone.

## Building for production

Set `SITE_URL` so the build injects the canonical link and the absolute
`og:image` / `twitter:image` URLs that social crawlers require:

```bash
SITE_URL=https://your-site.example npm run build
```

Without it the build still works, but link previews will be plain.
On Vercel, set `SITE_URL` under Project Settings → Environment Variables.
See `.env.example`.
Use `npm ci` on a machine matching the lockfile's platform bindings.

## Performance tiers

`src/utils/perf.js` picks a **lite** tier on phones, touch-first devices, machines with
<=4 GB RAM or <=4 logical cores, Data Saver, or reduced-motion; everything else gets **full**.
Lite drops bloom, shadows, antialiasing, decorative 3D effects and the animated blurred
background, and uses lower-poly spheres. Force a tier for testing with `?perf=lite` or
`?perf=full` on the URL. The 3D bundle only starts loading after the page is idle.

## Device support

Tested in headless Chromium at 320, 360, 390, 414 (phones), 844x390 (landscape phone), 768 and
1024 (tablets), 1280, 1440, 1920 and 2560 wide: no horizontal scroll, no overlapping hero blocks,
no text under 12px.

- **Layouts:** phones/tablets are single-column; `lg` (1024px) is a 2-column hero; the 4-column hero
  with side panels only turns on at the custom `3xl` breakpoint (1800px, defined in `index.css`).
- **Phones:** floating hero cards are hidden below `md`; long certificate list collapses to 6 with
  "Show all"; the mobile menu scrolls on short screens.
- **Touch:** on `pointer: coarse` devices, elements with the `tap` class get a 12px invisible hit-area.
- **Notches / address bars:** `viewport-fit=cover`, safe-area padding, and `svh`/`dvh` heights.
- **Dark base colour** is set on `<html>`, so there is never a white flash or white overscroll.

## SEO, accessibility and print

- **Structured data:** `vite.config.js` injects a schema.org `Person` JSON-LD block (name, college, links from
  `src/data/socials.js`) whenever a site URL is known (`SITE_URL`, or Vercel's production URL).
- **Installable basics:** `site.webmanifest`, `apple-touch-icon.png`, `icon-192.png`, `icon-512.png`; a branded
  `404.html` is served for unknown paths.
- **Keyboard & screen readers:** "Skip to content" link, visible focus ring (`:focus-visible`), labelled nav,
  full subtitle text for screen readers (the typewriter effect is visual only), chart alternatives via `aria-label`.
- **Print:** `Ctrl+P` gives a clean white, link-expanded version (no 3D, background or animations).
- **Semester chart:** edit `semesters` in `src/data/education.js`; bars start at SGPA 6.0 and the caption says so.
- **Architecture diagrams:** each project's `architecture` array renders as a numbered flow; use
  `"Title — detail"` or `"Title (detail)"` to get a title and a sub-line.

## Build outputs and measured quality

- `robots.txt` and `sitemap.xml` are generated at build time with the real site URL (`SITE_URL` or Vercel's
  production URL); without a URL only a plain `robots.txt` is produced.
- The 3D bundle is only downloaded when the browser supports WebGL **and** the globe is near the viewport, so phones
  and no-WebGL browsers skip most of it. The fallback card shows instead.
- Lighthouse (lab run in headless Chromium without GPU or internet, so treat as indicative):
  mobile 71 → 92 performance, desktop 94 → 100; accessibility 100 on both; layout shift 0.27 → 0.02.


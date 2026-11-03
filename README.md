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
- Sections: Hero, About, Skills, Projects, Certifications, Experience, Contact
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

1. Add an entry to `src/data/projects.js` with the next sequential `id`.
2. To make it clickable on the 3D Earth too, add a matching `<Hotspot>` in
   `src/components/three/Earth/ProjectHotspots.jsx` using `toggle(<id>)`,
   and append one entry each to the `rotations` array in
   `Earth/EarthModel.jsx` and the `positions` array in
   `Effects/CameraController.jsx` (index = id + 1; index 0 is the default view).
3. Counts shown on the page come from `src/data/counts.js`; don't hardcode them.

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

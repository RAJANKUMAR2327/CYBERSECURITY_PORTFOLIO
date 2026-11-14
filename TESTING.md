# React portfolio tests

These tests are written for the source tree in this project. The supplied `src.zip`
contained the `src/` directory but not the root `package.json`, lockfile, or Vite
configuration, so dependency versions and the existing test script could not be
verified here.

## Install test dependencies

From the project root (the folder containing `package.json`):

```bash
npm install -D vitest @vitejs/plugin-react jsdom @testing-library/react @testing-library/jest-dom @testing-library/user-event
```

If the project already has compatible versions of any package, keep those versions
rather than installing duplicates.

## Configure Vitest

Copy `vitest.config.js` from this bundle to the project root. Add or merge these
scripts in `package.json`:

```json
{
  "scripts": {
    "test": "vitest run",
    "test:watch": "vitest"
  }
}
```

The configuration loads `src/test/setup.js`, which registers the jest-dom matchers.

## Run

```bash
npm test
```

For one test file:

```bash
npx vitest run src/components/layout/Navbar.test.jsx
```

## What is covered

- Navbar: section anchors, mobile menu open/close, resume download.
- Projects: data-driven card rendering, technology labels, case-study expansion,
  safe external links.
- Contact: email, phone, social links and contact details.
- Cybersecurity portfolio data: project metadata, repository URLs, architecture
  and evaluation evidence.
- Earth visualization: one hotspot per project, deterministic positions and
  correct shell radius.

## Important scope note

The current `Contact.jsx` is a contact-information section with `mailto:` and
`tel:` links. It does **not** contain a contact form, input validation, submission
handler, API call, or success/error state. These tests deliberately test the
existing behavior rather than pretending a form exists. A separate form feature
needs implementation before form-submission tests can be meaningful.

These tests validate the portfolio UI and its displayed security-project evidence.
They do not prove the underlying PDG or NetGuard backend security controls (such
as authentication, token rotation, tenant isolation, rate limiting, packet
classification, or authorization). Those require tests in the respective backend
repositories and controlled integration environments.

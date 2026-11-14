# Vitest test-environment fixes

Copy `vitest.config.js` into the project root, replacing the existing file.
Copy `src/test/setup.js` into the matching path (create `src/test` if needed).

These changes:
- load `@testing-library/jest-dom/vitest`, enabling `toHaveAttribute`, `toBeInTheDocument`, etc.
- provide a jsdom-compatible `IntersectionObserver` for Framer Motion `whileInView` components.

Then run from the project root:

```powershell
npm test -- --run
```

This patch fixes the two environment errors shown in the test output. It does not claim that all component assertions pass; any remaining failures should be reviewed against the actual rendered component behavior.

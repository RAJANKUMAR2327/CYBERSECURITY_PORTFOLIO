// Picks a rendering tier once per page load.
// "lite" = phones, touch-first devices, low-memory / low-core machines,
// Data Saver, or reduced-motion. Force a tier with ?perf=lite or ?perf=full.
function detect() {
  if (typeof window === "undefined") return "full";

  const forced = new URLSearchParams(window.location.search).get("perf");
  if (forced === "lite" || forced === "full") return forced;

  const mq = (q) => window.matchMedia(q).matches;
  const nav = navigator;
  const weak =
    (nav.deviceMemory && nav.deviceMemory <= 4) ||
    (nav.hardwareConcurrency && nav.hardwareConcurrency <= 4);
  const saveData = nav.connection && nav.connection.saveData;

  return mq("(max-width: 767px)") ||
    mq("(pointer: coarse)") ||
    mq("(prefers-reduced-motion: reduce)") ||
    weak ||
    saveData
    ? "lite"
    : "full";
}

export const LITE = detect() === "lite";

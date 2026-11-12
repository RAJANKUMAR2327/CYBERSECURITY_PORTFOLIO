// True when this browser can create a WebGL context. Checked once.
let cached;
export function hasWebGL() {
  if (cached !== undefined) return cached;
  try {
    const c = document.createElement("canvas");
    cached = Boolean(
      window.WebGLRenderingContext &&
        (c.getContext("webgl2") || c.getContext("webgl"))
    );
  } catch {
    cached = false;
  }
  return cached;
}

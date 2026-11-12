export default function EarthFallback() {
  return (
    <div className="relative w-[min(620px,90vw)] aspect-square flex items-center justify-center">
      <div className="glass rounded-full w-full h-full flex flex-col items-center justify-center text-center p-8">
        <div className="w-20 h-20 rounded-full bg-cyan-400/10 border border-cyan-400/30 mb-4 flex items-center justify-center">
          <span className="cyber text-2xl text-cyan-400">RK</span>
        </div>
        <p className="text-gray-400 text-sm">
          3D visualization unavailable in this browser.
          <br />
          Scroll down — the projects and content below work normally.
        </p>
      </div>
    </div>
  );
}

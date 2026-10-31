import AnimatedGrid from "./AnimatedGrid";
import GlowBlobs from "./GlowBlobs";
import MouseGlow from "./MouseGlow";
import Particles from "./Particles";

export default function Background() {
  return (
    <div className="fixed inset-0 -z-50 overflow-hidden bg-[#030712]">

      {/* Base Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#030712] via-[#061126] to-[#020617]" />

      {/* Aurora / Glow */}
      <GlowBlobs />

      {/* Animated Cyber Grid */}
      <AnimatedGrid />

      {/* Floating Particles */}
      <Particles />

      {/* Top Glow */}
      <div className="absolute left-1/2 top-0 h-[700px] w-[700px] -translate-x-1/2 rounded-full bg-cyan-500/10 blur-[180px]" />

      {/* Bottom Right Purple Glow */}
      <div className="absolute bottom-[-200px] right-[-150px] h-[500px] w-[500px] rounded-full bg-purple-600/10 blur-[170px]" />

      {/* Bottom Left Cyan Glow */}
      <div className="absolute bottom-[-150px] left-[-100px] h-[450px] w-[450px] rounded-full bg-cyan-400/10 blur-[160px]" />

      {/* Mouse Interaction */}
      <MouseGlow />

    </div>
  );
}
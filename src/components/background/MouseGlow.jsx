import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect } from "react";

export default function MouseGlow() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth follow
  const x = useSpring(mouseX, {
    stiffness: 120,
    damping: 18,
    mass: 0.3,
  });

  const y = useSpring(mouseY, {
    stiffness: 120,
    damping: 18,
    mass: 0.3,
  });

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseX.set(e.clientX - 250);
      mouseY.set(e.clientY - 250);
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [mouseX, mouseY]);

  return (
    <motion.div
      className="pointer-events-none fixed z-0 h-[500px] w-[500px] rounded-full"
      style={{
        x,
        y,
        background:
          "radial-gradient(circle, rgba(0,245,255,0.18) 0%, rgba(0,245,255,0.08) 35%, transparent 75%)",
        filter: "blur(80px)",
      }}
    />
  );
}
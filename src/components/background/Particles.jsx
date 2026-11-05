import { motion } from "framer-motion";
import { useMemo } from "react";
import seededRandom from "../../utils/seededRandom";

export default function Particles() {
  const particles = useMemo(() => {
    const rand = seededRandom(11);
    return Array.from({ length: 28 }, () => ({
      size: rand() * 4 + 2,
      left: rand() * 100,
      top: rand() * 100,
      duration: 8 + rand() * 10,
      delay: rand() * 5,
      opacity: 0.2 + rand() * 0.5,
    }));
  }, []);

  return (
    <>
      {particles.map((particle, index) => (
        <motion.span
          key={index}
          className="absolute rounded-full bg-cyan-400"
          style={{
            width: particle.size,
            height: particle.size,
            left: `${particle.left}%`,
            top: `${particle.top}%`,
            opacity: particle.opacity,
            boxShadow: "0 0 12px rgba(0,245,255,0.7)",
          }}
          animate={{
            y: [-15, 15, -15],
            x: [-8, 8, -8],
            opacity: [
              particle.opacity,
              particle.opacity + 0.3,
              particle.opacity,
            ],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </>
  );
}
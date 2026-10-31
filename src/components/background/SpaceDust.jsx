import { Sparkles } from "@react-three/drei";

export default function SpaceDust() {
  return (
    <>
      <Sparkles
        count={400}
        scale={20}
        size={3}
        speed={0.2}
        opacity={0.7}
      />

      <Sparkles
        count={200}
        scale={12}
        size={6}
        speed={0.4}
        opacity={0.35}
      />
    </>
  );
}
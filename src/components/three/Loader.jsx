import { Html, useProgress } from "@react-three/drei";

export default function Loader() {
  const { progress } = useProgress();

  return (
    <Html center>
      <div className="text-cyan-400 font-mono text-lg">
        Loading Earth... {progress.toFixed(0)}%
      </div>
    </Html>
  );
}
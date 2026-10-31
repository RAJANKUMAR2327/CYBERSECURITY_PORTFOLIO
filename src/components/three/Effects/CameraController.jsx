import { useThree, useFrame } from "@react-three/fiber";
import { useSpring } from "@react-spring/three";
import { useEffect } from "react";

// Initial camera position
const initialPosition = [0, 8, 18];

// Target positions: index 0 is the default view, then one per project
const positions = [
  [0, 0, 3.5],
  [0.5, 0.2, 2.8],
  [-0.5, 0.4, 2.8],
  [0, -0.5, 2.8],
  [-0.4, -0.3, 2.8],
  [0.1, 0.5, 2.8],
];

export default function CameraController({ selectedProject }) {
  const { camera } = useThree();

  const target =
    selectedProject != null &&
    positions[selectedProject + 1] !== undefined
      ? positions[selectedProject + 1]
      : positions[0];

  // Set the initial camera position once
  useEffect(() => {
    camera.position.set(...initialPosition);
    camera.lookAt(0, 0.35, 0);
  }, [camera]);

  const [{ position }, api] = useSpring(() => ({
    position: initialPosition,
    config: {
      mass: 2,
      tension: 120,
      friction: 30,
    },
  }));

  // Animate to the target whenever it changes
  useEffect(() => {
    api.start({
      position: target,
    });
  }, [api, target]);

  useFrame(({ clock }) => {
    const p = position.get();

    if (selectedProject == null) {
      // Floating animation after reaching the default position
      camera.position.set(
        p[0] + Math.sin(clock.elapsedTime * 0.2) * 0.1,
        p[1] + Math.cos(clock.elapsedTime * 0.15) * 0.05,
        p[2]
      );
    } else {
      camera.position.set(p[0], p[1], p[2]);
    }

    camera.lookAt(0, 0.35, 0);
  });

  return null;
}
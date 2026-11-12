import { useThree, useFrame } from "@react-three/fiber";
import { useSpring } from "@react-spring/three";
import { useEffect } from "react";

// Initial camera position
const initialPosition = [0, 8, 18];

// Default framing, and the closer framing used for any selected project.
// The selected hotspot is rotated to face the camera, so one offset works for all.
const DEFAULT_POSITION = [0, 0, 3.5];
const FOCUS_POSITION = [0.45, 0.15, 2.8];

export default function CameraController({ selectedProject }) {
  const { camera } = useThree();

  const target = selectedProject != null ? FOCUS_POSITION : DEFAULT_POSITION;

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
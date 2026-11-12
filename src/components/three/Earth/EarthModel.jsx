import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useSpring, animated } from "@react-spring/three";

import Earth from "./Earth";
import Clouds from "./Clouds";
import Atmosphere from "./Atmosphere";
import NetworkArcs from "./NetworkArcs";
import Nodes from "./Nodes";

import DataPackets from "./DataPacket";
import ScanLines from "./ScanLines";
import DataStream from "./DataStream";
import Satellite from "./Satellite";
import OrbitRing from "./OrbitRing";
import ScanRing from "./ScanRing";
import PacketFlow from "./PacketFlow";
import FloatingLabel from "./FloatingLabel";
import Shield from "./Shield";
import CyberShield from "./CyberShield";
import FresnelGlow from "./FresnelGlow";
import ScannerRing from "./ScannerRing";
import HexShield from "./HexShield";
import ThreatPulse from "./ThreatPulse";
import ProjectHotspots from "./ProjectHotspots";
import TechIcons from "./TechIcons";
import TechOrbit from "./TechOrbit";
import ScannerBeam from "./ScannerBeam";
import AlertBeacon from "./AlertBeacon";
import StatusLabels from "./StatusLabels";
import { LITE } from "../../../utils/perf";
import { HOTSPOTS } from "./hotspotLayout";

export default function EarthModel({
  selectedProject,
  setSelectedProject,
}) {
  const group = useRef();
  const { mouse } = useThree();

  // 1. Intro Animation Spring (Mounting transition scaled to 0.9 base)
  const intro = useSpring({
    from: {
      scale: [0, 0, 0],
      rotation: [0, Math.PI * 2, 0],
    },
    to: {
      scale: [0.9, 0.9, 0.9],
      rotation: [0, 0, 0],
    },
    config: {
      mass: 2,
      tension: 120,
      friction: 24,
    },
  });

  // 2. Selected Project Rotation Spring: turn the chosen hotspot to face the camera
  const target =
    selectedProject === null || selectedProject === undefined
      ? [0, 0, 0]
      : HOTSPOTS.find((h) => h.id === selectedProject)?.rotation ?? [0, 0, 0];
  const { projectRotation } = useSpring({
    projectRotation: target,
    config: { mass: 1, tension: 170, friction: 26 },
  });

  const reduceMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  useFrame(({ clock }, delta) => {
    if (!group.current) return;

    const hasSelection = selectedProject !== null && selectedProject !== undefined;
    if (hasSelection) {
      // Stop spinning and ease to the nearest full turn so the chosen
      // hotspot faces the camera exactly.
      const turn = Math.PI * 2;
      const cur = group.current.rotation.y;
      group.current.rotation.y +=
        (Math.round(cur / turn) * turn - cur) * Math.min(1, delta * 4);
    } else if (!reduceMotion) {
      // Sinusoidal rotation speed (rad/s), frame-rate independent
      const speed = 0.06 + Math.sin(clock.elapsedTime * 0.2) * 0.018;
      group.current.rotation.y += speed * delta;
    }

    // Interactive mouse parallax tilt
    group.current.rotation.x = mouse.y * 0.15;
    group.current.rotation.z = -mouse.x * 0.15;

    // Breathing pulse scale animation relative to 0.9 base scale
    const breathingScale = reduceMotion
      ? 0.9
      : 0.9 + Math.sin(clock.elapsedTime * 1.5) * 0.009;
    group.current.scale.set(breathingScale, breathingScale, breathingScale);
  });

  return (
    <animated.group
      ref={group}
      position={[0, 0.15, 0]}
      scale={intro.scale}
      rotation={intro.rotation}
    >
      {/* Inner animated group handles project switching springs */}
      <animated.group rotation={projectRotation}>
        <Earth />
        <Clouds />

        <Atmosphere />
        <FresnelGlow />
        <CyberShield />
        <NetworkArcs />
        <Nodes />
        <ProjectHotspots
          setSelectedProject={setSelectedProject}
        />
        <OrbitRing />

        {!LITE && (
          <>
            <HexShield />
            <ScannerRing />
            <ScannerBeam />
            <AlertBeacon />
            <StatusLabels />
            <ThreatPulse />
            <Shield />

            <ScanLines />
            <group rotation={[0.5, 0, 0]}> <ScanLines /> </group>
            <group rotation={[-0.5, 0, 0]}> <ScanLines /> </group>

            <ScanRing />
            <PacketFlow />
            <TechOrbit />
            <TechIcons />

            <FloatingLabel text="AI" radius={1.7} speed={0.30} offset={0} />
            <FloatingLabel text="SECURE" radius={1.9} speed={0.22} offset={2} />
            <FloatingLabel text="ONLINE" radius={1.8} speed={0.18} offset={4} />
            <FloatingLabel text="ENCRYPTED" radius={2.0} speed={0.15} offset={6} />

            <DataPackets />
            <group rotation={[0, 2, 0]}> <DataPackets /> </group>
            <group rotation={[0, -2, 0]}> <DataPackets /> </group>

            <DataStream />
            <Satellite />
          </>
        )}
      </animated.group>
    </animated.group>
  );
}
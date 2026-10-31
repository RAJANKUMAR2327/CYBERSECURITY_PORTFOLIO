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

export default function EarthModel({
  selectedProject,
  setSelectedProject,
}) {
  const group = useRef();
  const { mouse } = useThree();

  // Rotation presets based on selected project
  const rotations = [
    [0, 0, 0],
    [0.2, 1.4, 0],
    [-0.3, -1.2, 0],
    [0.5, 2.2, 0],
    [-0.4, 3.4, 0],
    [0.3, -2.4, 0],
  ];

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

  // 2. Selected Project Rotation Spring
  const rotationIndex =
    selectedProject === null || selectedProject === undefined
      ? 0
      : selectedProject + 1;
  const { projectRotation } = useSpring({
    projectRotation: rotations[rotationIndex] || rotations[0],
    config: { mass: 1, tension: 170, friction: 26 },
  });

  useFrame(({ clock }) => {
    if (!group.current) return;

    // Sinusoidal variable continuous Y rotation speed
    const speed = 0.001 + Math.sin(clock.elapsedTime * 0.2) * 0.0003;
    group.current.rotation.y += speed;

    // Interactive mouse parallax tilt
    group.current.rotation.x = mouse.y * 0.15;
    group.current.rotation.z = -mouse.x * 0.15;

    // Breathing pulse scale animation relative to 0.9 base scale
    const breathingScale = 0.9 + Math.sin(clock.elapsedTime * 1.5) * 0.009;
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
        <NetworkArcs />
        <PacketFlow />
        <Nodes />
        <ProjectHotspots
          setSelectedProject={setSelectedProject}
        />
        <DataPackets />
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
        <OrbitRing />
      </animated.group>
    </animated.group>
  );
}
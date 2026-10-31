import { Stars } from "@react-three/drei";

import Lighting from "./Effects/Lighting";
import SunGlow from "./Effects/SunGlow";
import EarthModel from "./Earth/EarthModel";
import PlatformGlow from "./Platform/PlatformGlow";
import HologramPlatform from "./Platform/HologramPlatform";
import HologramRing from "./Platform/HologramRing";
import FloatingHexagons from "./Effects/FloatingHexagons";
import CameraController from "./Effects/CameraController";
import Nebula from "./Effects/Nebula";
import PostProcessing from "./Effects/PostProcessing";
import Moon from "./Earth/Moon";
import SpaceDust from "../background/SpaceDust";
import NebulaGlow from "../background/NebulaGlow";
import Galaxy from "../background/Galaxy";
import ShootingStars from "../background/ShootingStars";
import Comet from "../background/Comet";
import LightOrbs from "../background/LightOrbs";

export default function Scene({
  selectedProject,
  setSelectedProject,
}) {
  return (
    <>
      <CameraController selectedProject={selectedProject} />
      
      <Lighting />
      <Nebula />
      <SunGlow />
      <NebulaGlow />
      <Galaxy />
      <SpaceDust />
      <ShootingStars />
      <Comet />
      <LightOrbs />

      

      <Stars
        radius={120}
        depth={80}
        count={3500}
        factor={6}
        saturation={0}
        fade
        speed={0.4}
      />

      <FloatingHexagons />

      <EarthModel
        selectedProject={selectedProject}
        setSelectedProject={setSelectedProject}
      />
      <Moon />


      <PlatformGlow />
      <HologramPlatform />
      <HologramRing />

      <PostProcessing />
    </>
  );
}
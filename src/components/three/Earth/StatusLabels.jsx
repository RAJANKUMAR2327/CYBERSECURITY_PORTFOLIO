import { Text } from "@react-three/drei";

export default function StatusLabels() {
  return (
    <>
      <Text
        position={[0, 1.75, 0]}
        fontSize={0.08}
        color="#00F5FF"
        anchorX="center"
      >
        AI ACTIVE
      </Text>

      <Text
        position={[0, -1.75, 0]}
        fontSize={0.08}
        color="#7C3AED"
        anchorX="center"
      >
        CYBER DEFENSE
      </Text>
    </>
  );
}
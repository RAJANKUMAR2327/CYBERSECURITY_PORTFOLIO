import { QuadraticBezierLine } from "@react-three/drei";

const routes = [
  {
    start: [-0.75, 0.35, 0.62],
    mid: [0, 2.1, 0],
    end: [0.82, 0.25, 0.72],
    color: "#00F5FF",
  },
  {
    start: [0.62, -0.55, 0.72],
    mid: [0, -2.0, 0],
    end: [-0.82, -0.22, -0.52],
    color: "#7C3AED",
  },
  {
    start: [0.12, 0.82, -0.52],
    mid: [0, 2.25, 0],
    end: [-0.32, -0.82, 0.92],
    color: "#00FFD5",
  },
];

export default function NetworkArcs() {
  return (
    <>
      {routes.map((route, index) => (
        <QuadraticBezierLine
          key={index}
          start={route.start}
          mid={route.mid}
          end={route.end}
          color={route.color}
          lineWidth={1.5}
        />
      ))}
    </>
  );
}
import { ShieldCheck, Award, Code2 } from "lucide-react";
import {
  projectCount,
  verifiedCertificateCount,
  courseCount,
} from "../../data/counts";

const facts = [
  {
    Icon: ShieldCheck,
    title: "Focus",
    value: "Cybersecurity + AI/ML",
    valueClass: "text-cyan-400 text-sm",
  },
  {
    Icon: Code2,
    title: "Projects",
    value: `${projectCount} featured`,
    valueClass: "text-gray-400 text-sm",
  },
  {
    Icon: Award,
    title: "Certifications",
    value: `${verifiedCertificateCount} verified · ${courseCount} Cisco courses`,
    valueClass: "text-gray-400 text-sm",
  },
];

export default function LeftPanel() {
  return (
    <div className="space-y-5 w-64">
      {facts.map(({ Icon, title, value, valueClass }) => (
        <div key={title} className="glass p-5">
          <div className="flex items-center gap-3">
            <Icon className="text-cyan-400" />
            <div>
              <p className="font-semibold">{title}</p>
              <p className={valueClass}>{value}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

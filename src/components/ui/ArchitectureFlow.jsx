// Turns "Title — detail" / "Title (detail)" strings into a connected flow.
function split(step) {
  const dash = step.indexOf(" — ");
  if (dash > -1) return [step.slice(0, dash), step.slice(dash + 3)];
  const m = step.match(/^(.*?) \((.*)\)$/);
  if (m) return [m[1], m[2]];
  return [step, ""];
}

export default function ArchitectureFlow({ steps }) {
  return (
    <ol className="relative space-y-0" aria-label="Architecture flow">
      {steps.map((step, i) => {
        const [title, detail] = split(step);
        const last = i === steps.length - 1;
        return (
          <li key={step} className="relative flex gap-3 pb-3 last:pb-0">
            {/* rail + node */}
            <div className="flex flex-col items-center shrink-0" aria-hidden="true">
              <span className="w-6 h-6 rounded-full border border-cyan-400/60 bg-cyan-400/10 text-cyan-300 text-[11px] flex items-center justify-center">
                {i + 1}
              </span>
              {!last && (
                <span className="flex-1 w-px bg-gradient-to-b from-cyan-400/50 to-cyan-400/10 mt-1" />
              )}
            </div>

            <div className="flex-1 rounded-xl border border-white/10 bg-white/[0.03] px-3.5 py-2.5">
              <p className="text-white text-sm font-semibold leading-snug">
                {title}
              </p>
              {detail && (
                <p className="text-gray-400 text-xs leading-relaxed mt-0.5">
                  {detail}
                </p>
              )}
            </div>
          </li>
        );
      })}
    </ol>
  );
}

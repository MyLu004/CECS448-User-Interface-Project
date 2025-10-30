// components/academics/left/IconBook.tsx
"use client";

type LegendItem = { label: string; hint: string };

const degreeAuditIcons: LegendItem[] = [
  { label: "Requirement Met", hint: "✓" },
  { label: "Met with In-Progress Work", hint: "⧗" },
  { label: "Met With Planned Work", hint: "◷" },
  { label: "Requirement Not Met", hint: "!" },
  { label: "Exception Made", hint: "✦" },
];

const courseIcons: LegendItem[] = [
  { label: "CSULB Course Graded", hint: "A–F" },
  { label: "CSULB Course In-Progress", hint: "IP" },
  { label: "CSULB Planned Course", hint: "PL" },
  { label: "Transfer/Test/Other Credit", hint: "TR" },
  { label: "What-if Course", hint: "?" },
];

export default function IconBook() {
  return (
    <div className="rounded-xl border border-neutral-200 bg-white shadow-sm">
      <div className="border-b border-neutral-200 px-4 py-3">
        <h2 className="text-sm font-semibold">Legend</h2>
      </div>
      <div className="grid gap-4 p-4 text-sm">
        <div>
          <h3 className="mb-2 font-medium">Degree Audit Icons</h3>
          <ul className="space-y-1">
            {degreeAuditIcons.map((i) => (
              <li key={i.label} className="flex items-center justify-between rounded-md border border-neutral-200 px-3 py-2">
                <span>{i.label}</span>
                <span className="font-semibold text-neutral-600">{i.hint}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-2 font-medium">Course Icons</h3>
          <ul className="space-y-1">
            {courseIcons.map((i) => (
              <li key={i.label} className="flex items-center justify-between rounded-md border border-neutral-200 px-3 py-2">
                <span>{i.label}</span>
                <span className="font-semibold text-neutral-600">{i.hint}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

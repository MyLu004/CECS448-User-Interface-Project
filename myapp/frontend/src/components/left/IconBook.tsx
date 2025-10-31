// components/academics/left/IconBook.tsx
"use client";

import {
  CheckCircleIcon,
} from "@heroicons/react/24/solid";
import type { ReactNode } from "react";


/* ---- Tiny inline SVGs so you don't need more deps ---- */

const DiamondIP = ({ className = "h-5 w-5" }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
    <path className="text-yellow-200" d="M12 2 22 12 12 22 2 12 12 2z" />
    <path className="text-yellow-700" d="M12 7.75a.75.75 0 0 1 .75.75v5a.75.75 0 0 1-1.5 0v-5a.75.75 0 0 1 .75-.75zm0 7.5a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
  </svg>
);

const StarPlanned = ({ className = "h-5 w-5" }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
    <path className="text-blue-400" d="m12 3.5 2.55 5.17 5.71.83-4.13 4.02.98 5.67L12 17.8l-5.11 2.39.98-5.67-4.13-4.02 5.71-.83L12 3.5z"/>
  </svg>
);

const SquareNotMet = ({ className = "h-5 w-5" }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
    <rect x="3" y="3" width="18" height="18" rx="3" className="text-red-500/80" />
  </svg>
);

const TriangleException = ({ className = "h-5 w-5" }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
    <path className="text-purple-200" d="M12 2.75c.52 0 1 .27 1.27.72l8.5 14.75c.53.92-.13 2.08-1.27 2.08H3.5c-1.14 0-1.8-1.16-1.27-2.08l8.5-14.75c.27-.45.75-.72 1.27-.72z"/>
    <path className="text-purple-700" d="M12 7.75a.75.75 0 0 1 .75.75v5a.75.75 0 0 1-1.5 0v-5a.75.75 0 0 1 .75-.75zm0 9a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"/>
  </svg>
);

const ArrowTransfer = ({ className = "h-5 w-5" }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
    <path className="text-green-600" d="M3 12a1 1 0 0 1 1-1h12.59l-2.3-2.3A1 1 0 1 1 15.7 7.3l4 4a1 1 0 0 1 0 1.4l-4 4a1 1 0 1 1-1.41-1.4l2.3-2.3H4a1 1 0 0 1-1-1z"/>
  </svg>
);

const WhatIfQ = ({ className = "h-5 w-5" }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
    <circle cx="12" cy="12" r="10" className="text-teal-100" />
    <path className="text-teal-700" d="M12 16a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm0-10a4 4 0 0 0-4 4h2a2 2 0 1 1 3.45 1.38c-.64.66-1.12 1.08-1.35 1.9-.08.28-.1.5-.1.72h2c0-.2.02-.34.06-.48.1-.35.38-.62.9-1.16C16.67 11.62 17 10.86 17 10a5 5 0 0 0-5-4z"/>
  </svg>
);

/* ---- Data (icon + label) ---- */

type Item = { icon: ReactNode; label: string };

const DEGREE_AUDIT: Item[] = [
  { icon: <CheckCircleIcon className="h-5 w-5 text-green-600" />, label: "Requirement Met" },
  { icon: <DiamondIP />, label: "Met with In-Progress Work" },
  { icon: <StarPlanned />, label: "Met With Planned Work" },
  { icon: <SquareNotMet />, label: "Requirement Not Met" },
  { icon: <TriangleException />, label: "Exception Made" },
];

const COURSE_ICONS: Item[] = [
  { icon: <CheckCircleIcon className="h-5 w-5 text-green-600" />, label: "CSULB Course Graded" },
  { icon: <DiamondIP />, label: "CSULB Course In-Progress" },
  { icon: <StarPlanned />, label: "CSULB Planned Course" },
  { icon: <ArrowTransfer />, label: "Transfer/Test/Other Credit" },
  { icon: <WhatIfQ />, label: "What-If Course" },
];

/* ---- Component ---- */

export default function IconBook() {
  return (
    <div className="rounded-xl border border-neutral-300 bg-white shadow-sm overflow-hidden">
      {/* Header row */}
      <div className="grid grid-cols-2 bg-neutral-300 text-neutral-800">
        <div className="px-2 py-1 text-center font-semibold border-r border-white/60">
          Degree Audit Icons
        </div>
        <div className="px-2 py-1 text-center font-semibold">
          Course Icons
        </div>
      </div>

      {/* Body rows */}
      <div className="grid grid-cols-2">
        {/* Left column */}
        <ul className="divide-y divide-neutral-200 border-r border-neutral-200">
          {DEGREE_AUDIT.map((it) => (
            <li key={it.label} className="flex items-center gap-3 px-4 py-2">
              {it.icon}
              <span className="text-sm">{it.label}</span>
            </li>
          ))}
        </ul>

        {/* Right column */}
        <ul className="divide-y divide-neutral-200">
          {COURSE_ICONS.map((it) => (
            <li key={it.label} className="flex items-center gap-3 px-4 py-2">
              {it.icon}
              <span className="text-sm">{it.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

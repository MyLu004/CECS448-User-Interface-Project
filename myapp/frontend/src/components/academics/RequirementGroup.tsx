// components/academics/RequirementGroup.tsx
"use client";

import { useState } from "react";
import { CheckCircleIcon, ChevronDownIcon } from "@heroicons/react/24/solid";

type Status = "Completed" | "In Progress";

const DiamondIP = ({ className = "h-5 w-5" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
    <path className="text-yellow-200" d="M12 2 22 12 12 22 2 12 12 2z" />
    <path className="text-yellow-700" d="M12 7.75a.75.75 0 0 1 .75.75v5a.75.75 0 0 1-1.5 0v-5a.75.75 0 0 1 .75-.75zm0 7.5a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
  </svg>
);

type Item = {
  id: string;
  label: string;
  status: Status;
  details?: React.ReactNode;
  defaultOpen?: boolean;
};

// Edit these if you want to change which are completed/in progress
const ITEMS: Item[] = [
  {
    id: "engr101",
    label: "ENGR 101",
    status: "Completed",
    defaultOpen: true,
    details: (
      <div className="rounded-xl bg-neutral-100 p-3 text-sm text-neutral-800">
        <p className="font-medium">1 Course/C or Better Grade Required</p>
        <ul className="mt-1 list-disc pl-5">
          <li> Satisfied: WAIVED FOR TRANSFER STUDENTS</li>
        </ul>
      </div>
    ),
  },
  { id: "engr102", label: "ENGR 102", status: "Completed" },
  { id: "cecs105", label: "CECS 105", status: "Completed" },
];

export default function RequirementGroup() {
  const anyInProgress = ITEMS.some((i) => i.status === "In Progress");

  return (
    <section className="rounded-xl border border-neutral-300 bg-white shadow-sm">
      {/* Header: gold bar + overall state icon */}
      <div className="flex items-center justify-between rounded-t-xl bg-[#EBA91B] px-4 py-2 text-sm font-semibold">
        <span>ENGR 101/ENGR 102/CECS 105</span>
        <span className="inline-flex items-center gap-1">
          {anyInProgress ? (
            <DiamondIP className="h-5 w-5" />
          ) : (
            <CheckCircleIcon className="h-5 w-5 text-green-700" aria-hidden />
          )}
        </span>
      </div>

      {/* Subheader note (kept from your layout) */}
      <div className="px-4 py-3 text-sm">
        <p className="font-medium">
          3 Courses/C or Better Grade Required (R-6545)
        </p>
      </div>

      {/* Items */}
      <div className="space-y-2 px-3 pb-4">
        {ITEMS.map((it) => (
          <ItemRow key={it.id} item={it} />
        ))}
      </div>
    </section>
  );
}

function ItemRow({ item }: { item: Item }) {
  const [open, setOpen] = useState(!!item.defaultOpen);

  const badgeClass =
    item.status === "Completed"
      ? "mr-2 rounded bg-emerald-100 px-2 py-0.5 text-xs text-emerald-800"
      : "mr-2 rounded bg-amber-100 px-2 py-0.5 text-xs text-amber-800";

  return (
    <div className="rounded-xl bg-neutral-100">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between rounded-xl px-3 py-2 text-left"
      >
        <div className="flex items-center gap-2">
          <ChevronDownIcon className={`h-5 w-5 transition-transform ${open ? "rotate-180" : ""}`} />
          <span className="font-medium">{item.label}</span>
        </div>

        <div className="flex items-center gap-2">
          <span className={badgeClass}>{item.status}</span>
          {item.status === "In Progress" ? (
            <DiamondIP className="h-5 w-5" />
          ) : (
            <CheckCircleIcon className="h-5 w-5 text-green-600" aria-hidden />
          )}
        </div>
      </button>

      {open && item.details ? <div className="px-3 pb-3">{item.details}</div> : null}
    </div>
  );
}

// components/academics/RequirementGroup.tsx
"use client";

import { useState } from "react";
import { CheckCircleIcon, ChevronDownIcon } from "@heroicons/react/24/solid";

export default function RequirementGroup() {
  // hard-coded demo data
  const items = [
    {
      id: "engr101-a",
      label: "ENGR 101",
      expanded: true,
      satisfied: true,
      details: (
        <div className="text-sm">
          <p className="font-medium">1 Course/C or Better Grade Required</p>
          <ul className="mt-1 list-disc pl-5">
            <li>
              <span className="font-medium">Satisfied:</span> WAIVED FOR
              TRANSFER STUDENTS
            </li>
          </ul>
        </div>
      ),
    },
    { 
        id: "engr102", 
        label: "ENGR 102", 
        expanded: false, 
        satisfied: true,
        details: (
            <div className="text-sm">
            <p className="font-medium">1 Course/C or Better Grade Required</p>
            <ul className="mt-1 list-disc pl-5">
                <li>
                <span className="font-medium">Satisfied:</span> WAIVED FOR
                TRANSFER STUDENTS
                </li>
            </ul>
            </div>
        ), 
    },
    { 
        id: "engr105", 
        label: "ENGR 105", 
        expanded: false, 
        satisfied: true,
        details: (
            <div className="text-sm">
                <p className="font-medium">1 Course/C or Better Grade Required</p>
            </div>
        ), 
    },
  ];

  const [openIds, setOpenIds] = useState<string[]>(
    items.filter((i) => i.expanded).map((i) => i.id)
  );

  const toggle = (id: string) =>
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );

  return (
    <section className="rounded-xl border border-neutral-300 bg-white shadow-sm">
      {/* amber strip header */}
      <div className="flex items-center justify-between rounded-t-xl bg-[#EBA91B] px-4 py-2 text-sm font-semibold">
        <span>ENGR 101/ENGR 102/CECS 105</span>
        <span className="inline-flex items-center gap-1 text-green-700">
          <CheckCircleIcon className="size-5" aria-hidden />
        </span>
      </div>

      {/* requirement summary */}
      <div className="px-4 py-3 text-sm">
        <p className="font-medium">
          3 Courses/C or Better Grade Required (R-6545)
        </p>
      </div>

      {/* collapsible rows */}
      <div className="space-y-2 px-3 pb-4">
        {items.map((item) => {
          const isOpen = openIds.includes(item.id);
          return (
            <div key={item.id} className="rounded-xl bg-neutral-100">
              <button
                type="button"
                onClick={() => toggle(item.id)}
                className="flex w-full items-center justify-between rounded-xl px-3 py-2 text-left"
              >
                <div className="flex items-center gap-2">
                  <ChevronDownIcon
                    className={`size-5 transition-transform ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                  <span className="font-medium">{item.label}</span>
                </div>
                {item.satisfied ? (
                  <CheckCircleIcon
                    className="size-5 text-green-600"
                    aria-hidden
                  />
                ) : null}
              </button>

              {isOpen && item.details ? (
                <div className="px-10 pb-3">{item.details}</div>
              ) : null}
            </div>
          );
        })}
      </div>
    </section>
  );
}

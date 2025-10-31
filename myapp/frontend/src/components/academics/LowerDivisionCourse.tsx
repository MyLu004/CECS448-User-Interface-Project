// components/academics/LowerDivisionCourses.tsx
"use client";

import { useMemo, useState } from "react";
import {
  CheckCircleIcon,
  ChevronDownIcon,
  ArrowUturnLeftIcon,
} from "@heroicons/react/24/solid";

export type LowerDivisionItem = {
  course: string;
  description: string;
  units: number;
  term: string;
  grade: string;
  status?: "ok" | "in-progress" | "transfer" | "withdrawn";
};

const LOWER_DIVISION_ITEMS: LowerDivisionItem[] = [
  { course: "CECS 174", description: "Intro Prog & Problem Solving", units: 3, term: "Fall 2023", grade: "A", status: "ok" },
  { course: "CECS 274", description: "Data Structures", units: 3, term: "Fall 2024", grade: "B", status: "ok" },
  { course: "CECS 277", description: "Object Oriented Programing", units: 3, term: "Spring 2024", grade: "IP", status: "in-progress" },
];

const UNITS_REQUIRED = 26;

//hard-code which course groups should show the right-side check
const SATISFIED_GROUPS = new Set(["CECS 174", "CECS 274", "CECS 277"]);

export default function LowerDivisionCourses() {
  const groups = useMemo(() => {
    const m = new Map<string, LowerDivisionItem[]>();
    for (const row of LOWER_DIVISION_ITEMS) {
      if (!m.has(row.course)) m.set(row.course, []);
      m.get(row.course)!.push(row);
    }
    return Array.from(m.entries());
  }, []);

  const [open, setOpen] = useState<Record<string, boolean>>(
    Object.fromEntries(groups.map(([k]) => [k, true]))
  );

  const completedUnits = useMemo(
    () => LOWER_DIVISION_ITEMS.reduce((sum, r) => sum + (r.grade && r.grade !== "W" ? r.units : 0), 0),
    []
  );

  return (
    <section className="rounded-xl border border-neutral-300 bg-white shadow-sm">
      <div className="flex items-center justify-between rounded-t-xl bg-[#EBA91B] px-4 py-2 text-sm font-semibold">
        <span>Computer Science Specified Lower Division Courses</span>
        <span className="inline-flex items-center gap-1 text-green-700">
          <CheckCircleIcon className="size-5" aria-hidden />
        </span>
      </div>

      <div className="px-4 py-3 text-sm">
        <p className="font-medium">
          {UNITS_REQUIRED} Units Required (R-1183)
          <span className="ml-2 font-normal text-neutral-600">• {completedUnits} completed</span>
        </p>
      </div>

      <div className="space-y-2 px-3 pb-4">
        {groups.map(([course, rows]) => {
          const isOpen = !!open[course];
          const satisfied = SATISFIED_GROUPS.has(course); // ← right-side check toggle

          return (
            <div key={course} className="rounded-xl bg-neutral-100">
              <button
                type="button"
                onClick={() => setOpen((s) => ({ ...s, [course]: !s[course] }))}
                className="flex w-full items-center justify-between rounded-xl px-3 py-2 text-left"
              >
                {/* left side: arrow + label */}
                <div className="flex items-center gap-2">
                  <ChevronDownIcon className={`size-5 transition-transform ${isOpen ? "rotate-180" : ""}`} />
                  <span className="font-medium">{course}</span>
                </div>

                {/* right side: green check if satisfied */}
                {satisfied ? (
                  <CheckCircleIcon className="size-5 text-green-600" aria-label="satisfied" />
                ) : (
                  <span className="size-5" aria-hidden /> // keeps spacing consistent when not satisfied
                )}
              </button>

              {isOpen && (
                <div className="px-2 pb-3">
                  <div className="overflow-hidden rounded-xl border border-neutral-300">
                    <div className="grid grid-cols-[160px,1fr,90px,120px,80px,80px] bg-neutral-200 text-sm font-medium">
                      <div className="px-3 py-2">Course</div>
                      <div className="px-3 py-2">Description</div>
                      <div className="px-3 py-2">Units</div>
                      <div className="px-3 py-2">When</div>
                      <div className="px-3 py-2">Grade</div>
                      <div className="px-3 py-2">Status</div>
                    </div>

                    {rows.map((r, i) => (
                      <div key={i} className="grid grid-cols-[160px,1fr,90px,120px,80px,80px] items-center text-sm">
                        <div className="border-t px-3 py-2">{r.course}</div>
                        <div className="border-t px-3 py-2">{r.description}</div>
                        <div className="border-t px-3 py-2">{r.units.toFixed(2)}</div>
                        <div className="border-t px-3 py-2">{r.term}</div>
                        <div className="border-t px-3 py-2">{r.grade}</div>
                        <div className="border-t px-3 py-2">
                          {r.status === "ok" ? (
                            <ArrowUturnLeftIcon className="mx-auto size-5 text-green-600" aria-label="applied" />
                          ) : r.status === "in-progress" ? (
                            <span className="block text-center">IP</span>
                          ) : r.status === "transfer" ? (
                            <span className="block text-center">TR</span>
                          ) : r.status === "withdrawn" ? (
                            <span className="block text-center">W</span>
                          ) : (
                            <span className="block text-center">—</span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}

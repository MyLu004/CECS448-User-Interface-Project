// components/academics/OverallProgress.tsx
"use client";

type Props = { completed: number; total: number };

export default function OverallProgress({ completed, total }: Props) {
  const pct = Math.min(100, Math.round((completed / total) * 100));

  return (
    <div className="rounded-xl border border-neutral-200 bg-white shadow-sm">
      <div className="bg-[#EBA91B] border-b rounded-t-xl border-t-xl border-neutral-200 px-4 py-3">
        <h2 className="text-center text-base font-semibold">Overall Degree Progress</h2>
      </div>
      <div className="ml-4 p-4">
        {/* <div className="mb-2 text-sm text-neutral-600">
          Completed {completed}/{total} Units ({pct}%)
        </div> */}
        <div className="h-3 w-full overflow-hidden rounded-full bg-neutral-200">
          <div
            className="h-full rounded-full bg-green-500 transition-[width]"
            style={{ width: `${pct}%` }}
            aria-label="degree-progress"
          />
        </div>
        <div className="mt-3 mb-2 text-sm text-neutral-500">
          Completed {completed}/{total} Units ({pct}%)
        </div>
      </div>
    </div>
  );
}

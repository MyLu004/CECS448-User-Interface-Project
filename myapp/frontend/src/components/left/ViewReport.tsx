// components/academics/left/ViewReport.tsx
"use client";

export default function ViewReport() {
  return (
    <div className="rounded-xl border border-neutral-200 bg-white shadow-sm">
      <div className="border-b border-neutral-200 px-4 py-3">
        <h2 className="text-sm font-semibold">View Reports</h2>
      </div>
      <div className="p-4">
        <div className="grid gap-2">
          <button className="rounded-lg border border-neutral-200 px-3 py-2 text-sm hover:bg-neutral-50">
            Degree Audit
          </button>
          <button className="rounded-lg border border-neutral-200 px-3 py-2 text-sm hover:bg-neutral-50">
            General Education Requirements
          </button>
          <button className="rounded-lg border border-neutral-200 px-3 py-2 text-sm hover:bg-neutral-50">
            Computer Science B.S.
          </button>
          {/* add the rest as needed */}
        </div>
      </div>
    </div>
  );
}

// components/academics/left/ViewReport.tsx
"use client";

export default function ViewReport() {
  return (
    <div className="rounded-xl border border-neutral-400 bg-white shadow-sm">
        <div className="bg-[#EBA91B] flex justify-center items-center border-b rounded-t-xl border-neutral-200 px-4 py-3">
            <h2 className="text-sm font-bold">View Reports</h2>
        </div>
      <div className="p-2">
        <div className="grid gap-2">
          <button className="bg-gray-300 rounded-lg border border-neutral-400 px-3 py-2 text-sm hover:bg-[#f2db9d]">
            Degree Audit
          </button>
          <button className="bg-gray-300 rounded-lg border border-neutral-400 px-3 py-2 text-sm hover:bg-[#f2db9d]">
            General Education Requirements
          </button>
          <button className="bg-gray-300 rounded-lg border border-neutral-400 px-3 py-2 text-sm hover:bg-[#f2db9d]">
            Computer Science B.S.
          </button>
          <button className="bg-gray-300 rounded-lg border border-neutral-400 px-3 py-2 text-sm hover:bg-[#f2db9d]">
            Unasigned Courses
          </button>
          <button className="bg-gray-300 rounded-lg border border-neutral-400 px-3 py-2 text-sm hover:bg-[#f2db9d]">
           Unit Requirement Summary
          </button>
          <button className="bg-gray-300 rounded-lg border border-neutral-400 px-3 py-2 text-sm hover:bg-[#f2db9d]">
            Universiry GPA Requirement Summary
          </button>
          <button className="bg-gray-300 rounded-lg border border-neutral-400 px-3 py-2 text-sm hover:bg-[#f2db9d]">
            Transfer Credit Evaluation Status
          </button>
          
        </div>
      </div>
    </div>
  );
}

// components/academics/left/SectionLinks.tsx
"use client";

export default function SectionLinks() {
  return (
    <div className="rounded-xl border border-neutral-200 bg-white shadow-sm">
      <div className="bg-[#EBA91B] flex justify-center items-center border-b rounded-t-xl px-4 py-3">
        <h2 className="text-base font-bold">Section Links</h2>
      </div>
      <ul className="p-1">
        {[
          "Search",
          "Degree Planner",
          "Enroll",
          "My Academics",
          "My Textbooks",
          "Enrollment Adjustments",
        ].map((label) => (
          <li className="border-b border-neutral-400" key={label}>
            <button className="block text-center w-full rounded-lg px-2 py-1 text-[#0000FF] text-left text-sm hover:bg-neutral-50">
              {label}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

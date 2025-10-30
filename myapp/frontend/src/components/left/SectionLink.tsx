// components/academics/left/SectionLinks.tsx
"use client";

export default function SectionLinks() {
  return (
    <div className="rounded-xl border border-neutral-200 bg-white shadow-sm">
      <div className="border-b border-neutral-200 px-4 py-3">
        <h2 className="text-sm font-semibold">Section Links</h2>
      </div>
      <ul className="p-2">
        {[
          "Search",
          "Degree Planner",
          "Enroll",
          "My Academics",
          "My Textbooks",
          "Enrollment Adjustments",
        ].map((label) => (
          <li key={label}>
            <button className="block w-full rounded-lg px-3 py-2 text-left text-sm hover:bg-neutral-50">
              {label}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

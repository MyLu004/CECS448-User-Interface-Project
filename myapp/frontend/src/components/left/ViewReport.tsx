"use client";

import { useContext } from "react";
import { AcademicsUIContext } from "../../components/academics/AcademicsUIContext";

export default function ViewReport() {
  const { selectedReport, setSelectedReport, openAllLowerDivision } = useContext(AcademicsUIContext);

  const handleSelectCS = () => {
    setSelectedReport("cs-bs");
    openAllLowerDivision(); // tell LowerDivision to expand all accordions
  };

  const baseBtn = "rounded-lg border border-neutral-400 px-3 py-2 text-sm transition-colors";
  const grayBtn = "bg-gray-300 hover:bg-gray-100";
  const yellowSelected = "bg-[#f2db9d]";

  return (
    <div className="rounded-xl border border-neutral-400 bg-white shadow-sm">
      <div className="bg-[#EBA91B] flex justify-center items-center border-b rounded-t-xl border-neutral-200 px-4 py-3">
        <h2 className="text-sm font-bold">View Reports</h2>
      </div>
      <div className="p-2">
        <div className="grid gap-2">
          <button className={`${baseBtn} ${grayBtn}`}>Degree Audit</button>
          <button className={`${baseBtn} ${grayBtn}`}>General Education Requirements</button>

          <button
            onClick={handleSelectCS}
            className={`${baseBtn} ${selectedReport === "cs-bs" ? yellowSelected : grayBtn}`}
          >
            Computer Science B.S.
          </button>

          <button className={`${baseBtn} ${grayBtn}`}>Unassigned Courses</button>
          <button className={`${baseBtn} ${grayBtn}`}>Unit Requirement Summary</button>
          <button className={`${baseBtn} ${grayBtn}`}>University GPA Requirement Summary</button>
          <button className={`${baseBtn} ${grayBtn}`}>Transfer Credit Evaluation Status</button>
        </div>
      </div>
    </div>
  );
}

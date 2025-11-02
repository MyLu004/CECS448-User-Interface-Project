"use client";

import { useContext, useEffect } from "react";
import { AcademicsUIContext } from "../../components/academics/AcademicsUIContext";

export default function ViewReport() {
  const { selectedReport, setSelectedReport, openAllLowerDivision } = useContext(AcademicsUIContext);

  // Preselect CS on first render
  useEffect(() => {
    if (selectedReport !== "cs-bs") {
      setSelectedReport("cs-bs");
      openAllLowerDivision();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSelectCS = () => {
    if (selectedReport !== "cs-bs") {
      setSelectedReport("cs-bs");
      openAllLowerDivision(); // tell LowerDivision to expand all accordions
    }
  };

  const handleSelect = (key: string) => () => setSelectedReport(key);

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
          <button
            onClick={handleSelect("degree-audit")}
            className={`${baseBtn} ${selectedReport === "degree-audit" ? yellowSelected : grayBtn}`}
          >
            Degree Audit
          </button>

          <button
            onClick={handleSelect("ge-reqs")}
            className={`${baseBtn} ${selectedReport === "ge-reqs" ? yellowSelected : grayBtn}`}
          >
            General Education Requirements
          </button>

          <button
            onClick={handleSelectCS}
            className={`${baseBtn} ${selectedReport === "cs-bs" ? yellowSelected : grayBtn}`}
          >
            Computer Science B.S.
          </button>

          <button
            onClick={handleSelect("unassigned")}
            className={`${baseBtn} ${selectedReport === "unassigned" ? yellowSelected : grayBtn}`}
          >
            Unassigned Courses
          </button>

          <button
            onClick={handleSelect("unit-summary")}
            className={`${baseBtn} ${selectedReport === "unit-summary" ? yellowSelected : grayBtn}`}
          >
            Unit Requirement Summary
          </button>

          <button
            onClick={handleSelect("gpa-summary")}
            className={`${baseBtn} ${selectedReport === "gpa-summary" ? yellowSelected : grayBtn}`}
          >
            University GPA Requirement Summary
          </button>

          <button
            onClick={handleSelect("transfer-status")}
            className={`${baseBtn} ${selectedReport === "transfer-status" ? yellowSelected : grayBtn}`}
          >
            Transfer Credit Evaluation Status
          </button>
        </div>
      </div>
    </div>
  );
}
  
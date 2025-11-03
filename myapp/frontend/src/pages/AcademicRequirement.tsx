// app/academic-requirements/page.tsx
"use client";

import { useNavigate } from "react-router-dom";

//ACADEMIC CONTEXT TO SHARE THE UI SIGNAL BETWEEN THE FILES
import { AcademicsUIProvider } from "../components/academics/AcademicsUIContext";

// LEFT SIDE INFO: section and link
import LeftInfoTab from "../components/LeftInfoTab";


// RIGHT SIDE INFO: academic 
import OverallProgress from "../components/academics/OverallProgress";
import CurrentAcademicInfo from "../components/academics/CurrentAcademicInfo";
import DegreeChangeNotice from "../components/academics/DegreeChangeNotice";

import RequirementGroup from "../components/academics/RequirementGroup";
import LowerDivisionCourses from "../components/academics/LowerDivisionCourse";

// const state for the navigation
export default function AcademicRequirementsPage() {
  const navigate = useNavigate();

  const progress = { completed: 80, total: 120 };
  const info = {
    name: "Brandon Huett",
    studentId: "0123456789",
    program: "Undergraduate Degree (Fall 2020)",
    plan: "Computer Science BS (Fall 2023)",
    expectedGradTerm: "Fall 2025",
    lastTermRegistered: "Fall 2025",
    standing: "Good Standing",
    overallGPA: "3.6",
    csulbGPA: "3.3",
    status: "On track with course work in progress",
  };

  return (
    <main className="min-h-screen bg-neutral-50">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between px-4 py-2">
          <h1 className="mb-6 text-center text-2xl font-semibold tracking-tight">My Progress</h1>
          <button
            onClick={() => navigate("/")}
            className="rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-indigo-700"
          >
            Back to Home
          </button>
        </div>

        <AcademicsUIProvider>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-[320px_1fr]">
            {/* LEFT */}
            <aside className="space-y-4">
              <LeftInfoTab />
            </aside>

            {/* RIGHT */}
            <section className="space-y-6">
              <OverallProgress completed={progress.completed} total={progress.total} />
              <CurrentAcademicInfo info={info} />

              {/* ONE WRAPPER: Computer Science B.S. */}
              <section className="rounded-lg border border-neutral-200 bg-white shadow-sm">
                <div className="flex items-center justify-between rounded-t-lg bg-[var(--brand-gold,#EBA91B)] px-4 py-2 text-black">
                  <h2 className="text-base font-semibold">Computer Science B.S.</h2>
                  <button
                    className="text-sm text-blue-700 underline underline-offset-2 hover:text-blue-800 cursor-pointer"
                  >
                    Print Report
                  </button>
                </div>

                <div className="p-4 space-y-4">
                  {/* Embedded notice (no own header) */}
                  <DegreeChangeNotice
                    hideHeader
                    message="ENGR 101/ENGR 102/CECS 105 Waived for Transfer Students. Minimum Units changed from 97 to 94."
                  />
                  <RequirementGroup />
                  <LowerDivisionCourses />
                </div>
              </section>
            </section>
          </div>
        </AcademicsUIProvider>
      </div>
    </main>
  );
}

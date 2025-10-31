// app/academic-requirements/page.tsx  (or pages/AcademicRequirementsPage.tsx)
"use client";

import { useNavigate } from "react-router-dom";

// LEFT SIDE INFO: section and link
import LeftInfoTab from "../components/LeftInfoTab"


// RIGHT SIDE INFO: academic 
import OverallProgress from "../components/academics/OverallProgress";
import CurrentAcademicInfo from "../components/academics/CurrentAcademicInfo";
import DegreeChangeNotice from "../components/academics/DegreeChangeNotice";

import RequirementGroup from "../components/academics/RequirementGroup";
import LowerDivisionCourses from "../components/academics/LowerDivisionCourse";

export default function AcademicRequirementsPage() {


  // const state for the navigation
    const navigate = useNavigate();

  // todo: migrate it into the different .ts (maybe)
  // mock data – wire to real data later
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
      {/* Page container */}
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between px-4 py-2 ">
            <h1 className="text-center mb-6 text-2xl font-semibold tracking-tight">My Progress</h1> 


          <div className="">
              <button
                onClick={() => navigate("/")}
                className="block w-full rounded-lg bg-red-600 px-4 py-2 text-white text-center hover:bg-indigo-700"
              >
              Back to Home
              </button>

          </div>

        </div>
        
        

        {/* 2-column layout */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[320px_1fr]">
          {/* LEFT: Info tab */}
          <aside className="space-y-4">
            <LeftInfoTab />
          </aside>

          {/* RIGHT: Dashboard, inclduing multiple component for the academy*/}
          <section className="space-y-6">
            <OverallProgress completed={progress.completed} total={progress.total} />
            <CurrentAcademicInfo info={info} />

            <DegreeChangeNotice
              title="Computer Science B.S."
              message="ENGR 101/ENGR 102/CECS 105 Waived for Transfer Students."
              printLabel="Print Report"
            />
            {/* Add more right-side sections below as you build them */}
            <RequirementGroup />
            <LowerDivisionCourses />
          </section>
        </div>
      </div>
    </main>
  );
}

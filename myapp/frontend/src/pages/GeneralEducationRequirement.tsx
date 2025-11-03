// pages/GeneralEducationRequirement.tsx
"use client";

import { useNavigate } from "react-router-dom";
import { AcademicsUIProvider } from "../components/academics/AcademicsUIContext";
import LeftInfoTab from "../components/LeftInfoTab";
import OverallProgress from "../components/academics/OverallProgress";
import CurrentAcademicInfo from "../components/academics/CurrentAcademicInfo";
import GEAreaCard, { type GEItem } from "../components/academics/GEAreaCard";

/* ---------- Table used inside item.details ---------- */

/* ---------- Page ---------- */
export default function GeneralEducationRequirements() {
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

    const areas = [
        // A1
        {
            areaCode: "",
            areaTitle: "Oral Communication in English (Foundations)",
            rightNote: "",
            items: [
                {
                    id: "a1",
                    note: "GE Category A.1 - 3 Units/C Grade or Better Required (R-2955)", 
                    label: "Oral Communication",                                          
                    status: "Completed",
                    //details: a1Details,
                    defaultOpen: true,
                },
            ] satisfies GEItem[],
        },
        // A2
        {
            areaCode: "",
            areaTitle: "Written Communication in English (Foundations)",
            rightNote: "",
            items: [
                {
                    id: "a2",
                    note: "GE Category A.2 - 3 Units/C Grade or Better Required (R-2954)",
                    label: "Written Communication",
                    status: "Completed",
                },
            ] satisfies GEItem[],
        },
        // A3
        {
            areaCode: "",
            areaTitle: "Critical Thinking (Foundations)",
            rightNote: "",
            items: [
                {
                    id: "a3",
                    note: "GE Category A.3 - 3 Units/C Grade or Better Required (R-2956)",
                    label: "Critical Thinking",
                    status: "In Progress",
                },
            ] satisfies GEItem[],
        },
        // B1/B2/Lab group
        {
            areaCode: "",
            areaTitle: "Life Sciences and Physical Sciences",
            rightNote: "",
            items: [
                {
                    id: "b1b2",
                    note: "GE Category B.1 and B.2 - 6 Units Required (R-3663)", 
                    label: "Life Sciences and Physical Sciences",               
                    status: "Completed",
                },
                { id: "b2", label: "Life Sciences - Category B.2", status: "Completed" },
                { id: "b1", label: "Physical Sciences - Category B.1", status: "Completed" },
                { id: "bLab", label: "Verificdation of Lab Courses Associated with B1 or B2", status: "Completed" },
            ] satisfies GEItem[],
        },

        // B4
        {
            areaCode: "",
            areaTitle: "Mathematics/Quantitative Reasoning (Foundations)",
            rightNote: "",
            items: [
                {
                    id: "b4",
                    note: "GE Category B.4 - 3 Units/C Grade or Better Required",
                    label: "Mathematics/Quantitative Reasoning",
                    status: "Completed",
                },
            ] satisfies GEItem[],
        },
    ] as const;

    return (
        <main className="min-h-screen bg-neutral-50">
            <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                <div className="mb-4 flex items-center justify-between px-4 py-2">
                    <h1 className="text-2xl font-semibold tracking-tight">My Progress</h1>
                    <button
                        onClick={() => navigate("/")}
                        className="rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-indigo-700"
                    >
                        Back to Home
                    </button>
                </div>

                <AcademicsUIProvider>
                    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[320px_1fr]">
                        {/* LEFT: Info */}
                        <aside className="space-y-4">
                            <LeftInfoTab />
                        </aside>

                        {/* RIGHT: Content */}
                        <section className="space-y-6">
                            <OverallProgress completed={progress.completed} total={progress.total} />
                            <CurrentAcademicInfo info={info} />

                            {/* BIG WRAPPER CARD */}
                            <section className="rounded-lg border border-neutral-200 bg-white shadow-sm">
                                <div className="flex items-center justify-between rounded-t-lg bg-[var(--brand-gold,#EBA91B)] px-4 py-2 text-black">
                                    <h2 className="font-semibold">Computer Science B.S.</h2>
                                    <button
                                        className="text-sm text-blue-700 underline underline-offset-2 hover:text-blue-800 cursor-pointer"
                                    >
                                        Print Report
                                    </button>
                                </div>

                                <div className="p-4 space-y-4">
                                    {areas.map((a, idx) => (
                                        <GEAreaCard
                                            key={`${a.areaTitle}-${idx}`}
                                            areaCode={a.areaCode}
                                            areaTitle={a.areaTitle}
                                            rightNote={a.rightNote}
                                            items={a.items}
                                        />
                                    ))}
                                </div>
                            </section>
                        </section>
                    </div>
                </AcademicsUIProvider>
            </div>
        </main>
    );
}

// components/academics/GEAreaCard.tsx
"use client";

import { useState } from "react";
import { CheckCircleIcon, ChevronDownIcon } from "@heroicons/react/24/solid";

export type GEItem = {
    id: string;
    label: string; // dropdown title
    status: "Completed" | "In Progress" | "Planned";
    details?: React.ReactNode;
    defaultOpen?: boolean;
    note?: React.ReactNode; // Line above the dropdown (e.g., "GE Category A.1 ...")
};

// Inline diamond icon for “In Progress”
const DiamondIP = ({ className = "h-5 w-5" }: { className?: string }) => (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
        <path className="text-yellow-200" d="M12 2 22 12 12 22 2 12 12 2z" />
        <path
            className="text-yellow-700"
            d="M12 7.75a.75.75 0 0 1 .75.75v5a.75.75 0 0 1-1.5 0v-5a.75.75 0 0 1 .75-.75zm0 7.5a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"
        />
    </svg>
);

export default function GEAreaCard({
    areaTitle,
    items,
}: {
    areaCode?: string;
    areaTitle: string;
    rightNote?: string;
    items: GEItem[];
}) {
    const allCompleted = items.every((it) => it.status === "Completed");
    const anyInProgress = items.some((it) => it.status === "In Progress");

    return (
        <section className="rounded-lg border border-neutral-200 bg-white shadow-sm">
            <div className="flex items-center justify-between rounded-t-lg bg-[#EBA91B] px-4 py-2 text-black">
                <h3 className="text-base font-semibold">{areaTitle}</h3>
                <div className="flex items-center gap-1">
                    {anyInProgress ? (
                        <DiamondIP className="h-5 w-5 text-amber-700" />
                    ) : allCompleted ? (
                        <CheckCircleIcon className="h-5 w-5 text-green-700" />
                    ) : null}
                </div>
            </div>

            <div className="divide-y divide-neutral-200">
                {items.map((it) => (
                    <GEItemRow key={it.id} item={it} />
                ))}
            </div>
        </section>
    );
}

function GEItemRow({ item }: { item: GEItem }) {
    const [open, setOpen] = useState(false);
    const rowId = `ge-item-${item.id}`;

    const badgeClass =
        item.status === "Completed"
            ? "mr-2 rounded bg-emerald-100 px-2 py-0.5 text-xs text-emerald-800"
            : item.status === "In Progress"
                ? "mr-2 rounded bg-amber-100 px-2 py-0.5 text-xs text-amber-800"
                : "mr-2 rounded bg-neutral-100 px-2 py-0.5 text-xs text-neutral-800";

    return (
        <div className="bg-neutral-50/60">
            {/* Note line above the dropdown */}
            {item.note ? (
                <div className="px-4 py-2 text-sm font-semibold text-neutral-900">
                    {item.note}
                </div>
            ) : null}

            <button
                className="flex w-full items-center gap-3 px-4 py-3 text-left hover:bg-neutral-50 focus:outline-none"
                aria-expanded={open}
                aria-controls={`${rowId}-panel`}
                onClick={() => setOpen((v) => !v)}
            >
                <ChevronDownIcon
                    className={`h-5 w-5 shrink-0 transition-transform ${open ? "rotate-180" : ""}`}
                />
                <span className="flex-1 text-base font-medium text-neutral-900">{item.label}</span>

                <span className={badgeClass}>{item.status}</span>

                {item.status === "In Progress" ? (
                    <DiamondIP className="h-5 w-5 text-amber-700" aria-hidden="true" />
                ) : (
                    <CheckCircleIcon
                        className={
                            item.status === "Completed"
                                ? "h-5 w-5 text-emerald-600"
                                : "h-5 w-5 text-neutral-400"
                        }
                        aria-hidden="true"
                    />
                )}
            </button>

            {open && item.details ? (
                <div id={`${rowId}-panel`} className="px-10 pb-4 text-sm text-neutral-700">
                    {item.details}
                </div>
            ) : null}
        </div>
    );
}

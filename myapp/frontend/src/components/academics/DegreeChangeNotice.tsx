// components/academics/DegreeChangeNotice.tsx
"use client";

export default function DegreeChangeNotice({
  title,
  message,
  printLabel = "Print Report",
  hideHeader = false,
}: {
  title?: string;
  message: string;
  printLabel?: string;
  hideHeader?: boolean;
}) {
  return (
    <section className="rounded-lg border border-neutral-200 bg-white shadow-sm">
      {!hideHeader && (
        <div className="flex items-center justify-between rounded-t-lg bg-[var(--brand-gold,#EBA91B)] px-4 py-2 text-black">
          <h2 className="font-semibold">{title}</h2>
          <button
            className="text-sm text-blue-700 underline underline-offset-2 hover:text-blue-800 cursor-pointer"
          >
            {printLabel}
          </button>
        </div>
      )}

      <div className={hideHeader ? "p-0" : "p-4"}>
        <div className="rounded-xl border border-neutral-200 bg-white p-4">
          <div className="flex items-start gap-3">
            <svg
              viewBox="0 0 24 24"
              className="mt-0.5 h-6 w-6 text-purple-600 flex-shrink-0"
              fill="currentColor"
            >
              <path
                className="text-purple-200"
                d="M12 2.75c.52 0 1 .27 1.27.72l8.5 14.75c.53.92-.13 2.08-1.27 2.08H3.5c-1.14 0-1.8-1.16-1.27-2.08l8.5-14.75c.27-.45.75-.72 1.27-.72z"
              />
              <path
                className="text-purple-700"
                d="M12 7.75a.75.75 0 0 1 .75.75v5a.75.75 0 0 1-1.5 0v-5a.75.75 0 0 1 .75-.75zm0 9a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"
              />
            </svg>

            <p className="text-sm text-neutral-800">{message}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

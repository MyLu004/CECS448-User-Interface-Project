// components/academics/DegreeChangeNotice.tsx
"use client";

type Props = {
  /** First line (bold) */
  title: string;
  /** Second line (regular) */
  message: string;
  /** Optional small link in the top-right */
  printLabel?: string;
  onPrintClick?: () => void;
};

export default function DegreeChangeNotice({ title, message, printLabel = "Print Report", onPrintClick }: Props) {
  return (
    <div className="rounded-xl border shadow-sm">
      <div className="flex items-center justify-between bg-[#EBA91B] border-b rounded-t-xl border-t-xl border-neutral-200 px-4 py-3">
        <h2 className="text-sm text-center font-semibold">{title}</h2>
          {printLabel ? (
          <button className="text-xs font-medium text-amber-900/80 underline underline-offset-2 hover:text-amber-900">
            {printLabel}
          </button>
        ) : null}
      </div>

      
      <div className="flex items-start gap-3 p-4 text-sm text-amber-900">
        <div
          className="relative rounded-xl border border-neutral-200 bg-white shadow-sm"
          role="status"
          aria-live="polite"
        >
        

      <div className="flex items-start gap-3 p-4 text-sm">
        {/* Purple alert icon (inline SVG so no extra deps) */}
        <span
          aria-hidden="true"
          className="inline-flex h-6 w-6 shrink-0 items-center justify-center"
        >
          <svg
            viewBox="0 0 24 24"
            className="h-6 w-6"
            fill="currentColor"
            focusable="false"
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
        </span>

          <div className="space-y-0.5">
            
            <p className="text-neutral-700">{message}</p>
            <p className="text-neutral-700">Minimum Units changed from 97 to 94.</p>
          </div>
        </div>
      </div>


      </div>
    </div>
  );
}

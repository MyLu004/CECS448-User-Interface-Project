// components/academics/DegreeChangeNotice.tsx
"use client";

type Props = { title: string; message: string; printLabel?: string };

export default function DegreeChangeNotice({ title, message, printLabel }: Props) {
  return (
    <div className="rounded-xl border border-amber-300 bg-amber-50 shadow-sm">
      <div className="flex items-center justify-between border-b border-amber-200 px-4 py-3">
        <h2 className="text-sm font-semibold text-amber-900">{title}</h2>
        {printLabel ? (
          <button className="text-xs font-medium text-amber-900/80 underline underline-offset-2 hover:text-amber-900">
            {printLabel}
          </button>
        ) : null}
      </div>
      <div className="flex items-start gap-3 p-4 text-sm text-amber-900">
        <span className="mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full border border-amber-300">
          !
        </span>
        <p>{message}</p>
      </div>
    </div>
  );
}

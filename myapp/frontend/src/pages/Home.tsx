import { useNavigate } from "react-router-dom";
import { ArrowRightIcon } from "@heroicons/react/24/solid";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header / hero */}
      <div className="bg-[#EBA91B] from-amber-500 to-amber-600 text-white border rounded-3xl">
        <div className="mx-auto max-w-6xl px-6 py-10">
          <p className="text-xs/5 uppercase tracking-widest text-white/90">
            CECS 448 • Fall 2025
          </p>
          <h1 className="mt-1 text-3xl font-extrabold drop-shadow-sm">
            TEAM 6: PROJECT 2
          </h1>
          <h4 className="mt-1 font-bold drop-shadow-sm">
            Members: My Lu, Brandon Huett, Marissa Marcarelli, Quynh Le, Simon Vu

          </h4>
          <p className="mt-2 max-w-2xl text-white/90">
            Choose where you’d like to go, or jump to the project resources.
          </p>

          {/* Main actions */}
          <div className="mt-6 flex flex-wrap gap-3">
            <button
              onClick={() => navigate("/academy-requirement")}
              className="inline-flex items-center gap-2 rounded-xl bg-white/95 px-4 py-2 font-medium text-amber-900 shadow hover:bg-white"
            >
              Academic Requirements
              <ArrowRightIcon className="size-4" aria-hidden />
            </button>
            <button
              onClick={() => navigate("/enrollment/class-search")}
              className="inline-flex items-center gap-2 rounded-xl bg-white/95 px-4 py-2 font-medium text-amber-900 shadow hover:bg-white"
            >
              Enrollment
              <ArrowRightIcon className="size-4" aria-hidden />
            </button>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="mx-auto max-w-6xl px-6 py-8">
        {/* Resources card */}
        <section className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-center">
            <h2 className="text-xl font-semibold">Resources</h2>
          </div>

          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {/* GitHub */}
            <a
              href="https://github.com/MyLu004/CECS448-User-Interface-Project"
              target="_blank"
              rel="noreferrer"
              className="group flex items-center justify-between rounded-xl border border-neutral-200 px-4 py-3 hover:border-neutral-300 hover:bg-neutral-50"
            >
              <div className="flex items-center gap-3">
                <GitHubIcon className="size-6 text-neutral-800 group-hover:scale-110 transition" />
                <div>
                  <p className="font-medium">GitHub Repo</p>
                  <p className="text-sm text-neutral-500">Source code & issues</p>
                </div>
              </div>
              <ArrowRightIcon className="size-5 text-neutral-400 group-hover:text-neutral-600" />
            </a>

            {/* Figma */}
            <a
              href="https://www.figma.com/design/BalN3zCiaa0U5G0PXvdGzY/Untitled?node-id=0-1&p=f&t=2CP2QPe4SiZLiacd-0 "
              target="_blank"
              rel="noreferrer"
              className="group flex items-center justify-between rounded-xl border border-neutral-200 px-4 py-3 hover:border-neutral-300 hover:bg-neutral-50"
            >
              <div className="flex items-center gap-3">
                <FigmaIcon className="size-6 group-hover:scale-110 transition" />
                <div>
                  <p className="font-medium">Figma</p>
                  <p className="text-sm text-neutral-500">Designs & prototypes</p>
                </div>
              </div>
              <ArrowRightIcon className="size-5 text-neutral-400 group-hover:text-neutral-600" />
            </a>

            {/* Presentation */}
            <a
              href="https://docs.google.com/presentation/d/1NnNgSHXvDY5Pdc-YNGuNQ06R2xHfoutT9DJPQmrqG40/edit?usp=sharing"
              target="_blank"
              rel="noreferrer"
              className="group flex items-center justify-between rounded-xl border border-neutral-200 px-4 py-3 hover:border-neutral-300 hover:bg-neutral-50"
            >
              <div className="flex items-center gap-3">
                <SlidesIcon className="size-6 text-orange-500 group-hover:scale-110 transition" />
                <div>
                  <p className="font-medium">Presentation</p>
                  <p className="text-sm text-neutral-500">Slides & talking points</p>
                </div>
              </div>
              <ArrowRightIcon className="size-5 text-neutral-400 group-hover:text-neutral-600" />
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}

/* ---------- Tiny inline icons (no extra deps) ---------- */

function GitHubIcon({ className = "size-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={className} fill="currentColor">
      <path d="M12 .5a11.5 11.5 0 0 0-3.64 22.41c.58.11.8-.25.8-.56v-2.1c-3.26.71-3.95-1.4-3.95-1.4-.53-1.36-1.3-1.72-1.3-1.72-1.06-.72.08-.71.08-.71 1.18.08 1.81 1.22 1.81 1.22 1.04 1.8 2.74 1.28 3.41.98.11-.77.41-1.28.74-1.57-2.6-.3-5.34-1.3-5.34-5.78 0-1.28.46-2.34 1.22-3.17-.12-.3-.53-1.52.12-3.18 0 0 1-.32 3.27 1.21a11.34 11.34 0 0 1 5.95 0C17 5.32 18 5.64 18 5.64c.65 1.66.24 2.88.12 3.18.76.83 1.22 1.9 1.22 3.17 0 4.49-2.75 5.47-5.36 5.76.43.37.8 1.1.8 2.22v3.29c0 .31.21.68.81.56A11.5 11.5 0 0 0 12 .5Z" />
    </svg>
  );
}

function FigmaIcon({ className = "size-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 256 384" aria-hidden className={className}>
      <path fill="#EA4C1D" d="M96 256a64 64 0 1 0 64 64v-64H96Z" />
      <path fill="#0ACF83" d="M32 128a64 64 0 0 0 64 64h64V64H96A64 64 0 0 0 32 128Z" />
      <path fill="#A259FF" d="M160 192a64 64 0 0 0 0-128h-32v128h32Z" />
      <path fill="#F24E1E" d="M96 192h32V64H96a64 64 0 0 0 0 128Z" />
      <path fill="#1ABCFE" d="M96 64h32V0H96a64 64 0 0 0 0 64Z" />
    </svg>
  );
}

function SlidesIcon({ className = "size-6 text-orange-500" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={className} fill="currentColor">
      <rect x="3" y="4" width="18" height="14" rx="2" className="opacity-20" />
      <rect x="6" y="7" width="12" height="8" rx="1" />
    </svg>
  );
}

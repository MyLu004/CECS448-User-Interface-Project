// components/academics/CurrentAcademicInfo.tsx
"use client";

type Info = {
  name: string;
  studentId: string;
  program: string;
  plan: string;
  expectedGradTerm: string;
  status: string;
  lastTermRegistered: string;
  standing: string;
  overallGPA: string;
  csulbGPA: string;
};

export default function CurrentAcademicInfo({ info }: { info: Info }) {
  return (
    <div className="rounded-xl border border-neutral-200 bg-white shadow-sm">
      <div className="bg-[#EBA91B] flex justify-center items-center border-b rounded-t-xl border-neutral-200 px-4 py-3">
        <h2 className="text-sm font-semibold">Current Academic Information</h2>
      </div>
      <div className="grid gap-2 p-1 sm:grid-cols-2">
        <InfoRow label="Name" value={info.name} />
        <InfoRow label="Last Term Registered" value={info.lastTermRegistered} />
        <InfoRow label="Student ID" value={info.studentId} />
        <InfoRow label="Academic Standing" value={info.standing} />
        <InfoRow label="Program" value={info.program} />
        <InfoRow label="Overall GPA" value={info.overallGPA} />
        <InfoRow label="Plan" value={info.plan} />
        <InfoRow label="CSULB GPA" value={info.csulbGPA} />
        <InfoRow label="Expected Grad Term" value={info.expectedGradTerm} />
        <InfoRow label="Graduation Status" value={info.status} span />
      </div>
    </div>
  );
}

function InfoRow({
  label,
  value,
  span = false,
}: {
  label: string;
  value: string;
  span?: boolean;
}) {
  return (
    <div className={span ? "sm:col-span-2" : ""}>
        <div className="flex items-center gap-2">
            <div className="font-bold text-xs px-2 w-36 shrink-0">{label}</div>
            <div className=" bg-white px-2 py-1 text-xs flex-1">
            {value}
            </div>
        </div>
</div>
  );
}

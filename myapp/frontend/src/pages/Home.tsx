import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Welcome</h1>
      <p className="mb-6">TEAM 6: Choose where you’d like to go:</p>
      <div className="flex gap-3 bg-neutral-50 ">
        <button onClick={() => navigate("/enrollment/class-search")} className="rounded-lg border px-4 py-2">
          Enrollment
        </button>
        
        <button onClick={() => navigate("/academy-requirement")} className="rounded-lg border px-4 py-2">
          Academy Requirement
        </button>
      </div>
    </div>
  );
}

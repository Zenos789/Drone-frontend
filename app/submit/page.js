"use client";
import { useEffect, useState } from "react";
import { fetchConfig, postLog } from "../api/route";

export default function SubmitPage() {
  const [config, setConfig] = useState(null);
  const [celsius, setCelsius] = useState("");
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let mounted = true;
    fetchConfig()
      .then((data) => mounted && setConfig(data))
      .catch((e) => console.error(e));
    return () => (mounted = false);
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus(null);
    if (!config) return setStatus("Missing config");
    if (!celsius) return setStatus("Enter celsius");

    const payload = {
      drone_id: config.drone_id,
      drone_name: config.drone_name,
      country: config.country,
      celsius: Number(celsius),
    };

    try {
      setLoading(true);
      await postLog(payload);
      setStatus("Submitted successfully");
      setCelsius("");
    } catch (err) {
      console.error(err);
      setStatus("Failed to submit");
    } finally {
      setLoading(false);
    }
  }

  const statusColor = status?.startsWith("Submitted")
    ? "text-green-500" // Success
    : "text-red-500"; // Error

  return (
    // ⬇️ 1. ลบ flex items-center justify-center ออก
    // ⬇️ 2. เพิ่ม pt-16 sm:pt-20 เพื่อดันเนื้อหาลงมาจากด้านบน
    <div className="min-h-screen bg-slate-900 text-slate-200 p-4 sm:p-8 pt-16 sm:pt-20">
      
      {/* 3. เพิ่ม mx-auto กลับเข้ามา เพื่อให้การ์ดอยู่กลางแนวนอน */}
      <div className="bg-slate-800 p-6 sm:p-8 rounded-lg shadow-lg w-full max-w-lg mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center text-slate-100">
          Submit Temperature Log
        </h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <label className="block text-lg font-medium text-slate-300">
            Temperature (°C)
            <input
              type="number"
              step="0.1"
              value={celsius}
              onChange={(e) => setCelsius(e.target.value)}
              className="mt-2 block w-full rounded-md border-slate-600 bg-slate-700 
                         shadow-sm p-3 text-lg text-white
                         focus:border-teal-500 focus:ring-teal-500"
            />
          </label>
          
          <button
            type="submit"
            disabled={loading}
            className="py-3 px-4 border border-transparent rounded-md shadow-sm 
                       text-lg font-medium text-white bg-teal-600 
                       hover:bg-teal-700 
                       focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500
                       disabled:bg-slate-600 disabled:cursor-not-allowed
                       transition duration-150 ease-in-out
                       flex justify-center items-center"
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </form>

        {status && (
          <p className={`mt-4 font-medium text-center text-lg ${statusColor}`}>
            {status}
          </p>
        )}
      </div>
    </div>
  );
}
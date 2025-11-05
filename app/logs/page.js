"use client";
import { useEffect, useState } from "react";
import { fetchLogs } from "../api/route";

export default function LogsPage() {
  const [allLogs, setAllLogs] = useState([]);
  const [paginatedLogs, setPaginatedLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [logsPerPage] = useState(10);

  useEffect(() => {
    let mounted = true;

    async function loadLogs() {
      try {
        if (mounted) setLoading(true);
        const data = await fetchLogs();
        const arr = Array.isArray(data) ? data : data.data || [];
        arr.sort((a, b) => new Date(b.created) - new Date(a.created));
        if (mounted) {
          setAllLogs(arr);
        }
      } catch (err) {
        console.error(err);
        if (mounted) setError(err.message || "Failed to load logs");
      } finally {
        if (mounted) setLoading(false);
      }
    }

    loadLogs();

    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    const indexOfLastLog = currentPage * logsPerPage;
    const indexOfFirstLog = indexOfLastLog - logsPerPage;
    setPaginatedLogs(allLogs.slice(indexOfFirstLog, indexOfLastLog));
  }, [allLogs, currentPage, logsPerPage]);

  const totalPages = Math.ceil(allLogs.length / logsPerPage);

  const handleNext = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const handlePrev = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  // ⬇️ ปรับแก้หน้า Loading ให้สอดคล้องกับธีม
  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 p-8 flex items-center justify-center">
        <p className="text-slate-400 text-lg">Loading logs...</p>
      </div>
    );
  }

  // ⬇️ ปรับแก้หน้า Error ให้สอดคล้องกับธีม
  if (error) {
    return (
      <div className="min-h-screen bg-slate-900 p-8 flex items-center justify-center">
        <p className="font-medium text-red-500 text-lg">Error: {error}</p>
      </div>
    );
  }

  return (
    // ⬇️ 1. ปรับ Layout Wrapper เหมือนหน้า Submit
    <div className="min-h-screen bg-slate-900 text-slate-200 p-4 sm:p-8 pt-16 sm:pt-20">
      
      {/* ⬇️ 2. ปรับการ์ดหลัก (ลบ dark:) */}
      <div className="bg-slate-800 p-6 sm:p-8 rounded-lg shadow-lg w-full max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center text-slate-100">
          Logs
        </h1>

        {/* ⬇️ 3. ปรับสไตล์ตาราง (ลบ dark:) */}
        <div className="overflow-x-auto border border-slate-700 rounded-lg">
          <table className="w-full border-collapse min-w-[600px]">
            <thead className="bg-slate-700">
              <tr>
                <th className="border-b border-slate-600 p-3 text-left text-sm font-semibold text-slate-300 uppercase tracking-wider">
                  Created
                </th>
                <th className="border-b border-slate-600 p-3 text-left text-sm font-semibold text-slate-300 uppercase tracking-wider">
                  Country
                </th>
                <th className="border-b border-slate-600 p-3 text-left text-sm font-semibold text-slate-300 uppercase tracking-wider">
                  Drone ID
                </th>
                <th className="border-b border-slate-600 p-3 text-left text-sm font-semibold text-slate-300 uppercase tracking-wider">
                  Drone Name
                </th>
                <th className="border-b border-slate-600 p-3 text-left text-sm font-semibold text-slate-300 uppercase tracking-wider">
                  Celsius
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700">
              {paginatedLogs.map((r, i) => (
                <tr
                  key={i}
                  className="hover:bg-slate-700/50 transition-colors"
                >
                  <td className="p-3 text-sm text-slate-300 whitespace-nowrap">
                    {new Date(r.created).toLocaleString()}
                  </td>
                  <td className="p-3 text-sm text-slate-300">
                    {r.country}
                  </td>
                  <td className="p-3 text-sm text-slate-300">
                    {r.drone_id}
                  </td>
                  <td className="p-3 text-sm text-slate-300">
                    {r.drone_name}
                  </td>
                  <td className="p-3 text-sm text-slate-300">
                    {r.celsius}
                  </td>
                </tr>
              ))}

              {allLogs.length === 0 && (
                <tr>
                  <td
                    colSpan={5}
                    className="p-4 text-center text-slate-400" // ⬅️ ปรับสี
                  >
                    No logs found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* ⬇️ 4. ปรับสไตล์ Paging (ลบ dark:) */}
        {allLogs.length > logsPerPage && (
          <div className="flex items-center justify-between mt-6">
            <button
              onClick={handlePrev}
              disabled={currentPage === 1}
              className="py-2 px-4 border border-transparent rounded-md shadow-sm 
                         text-sm font-medium text-white bg-teal-600 
                         hover:bg-teal-700 
                         focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500
                         disabled:bg-slate-600 disabled:cursor-not-allowed
                         transition duration-150 ease-in-out"
            >
              Previous
            </button>
            <span className="text-sm text-slate-300">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={handleNext}
              disabled={currentPage === totalPages}
              className="py-2 px-4 border border-transparent rounded-md shadow-sm 
                         text-sm font-medium text-white bg-teal-600 
                         hover:bg-teal-700 
                         focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500
                         disabled:bg-slate-600 disabled:cursor-not-allowed
                         transition duration-150 ease-in-out"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
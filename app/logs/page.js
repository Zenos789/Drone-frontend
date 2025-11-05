"use client"; 
import { useDroneConfig } from '@/context/DroneContext';
import { useState, useEffect } from 'react';

export default function ViewLogsPage() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLogs = async () => {
      setLoading(true);
      try {
        const droneId = process.env.NEXT_PUBLIC_DRONE_ID;
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        
        const response = await fetch(`${apiUrl}/logs/${droneId}`);
        const data = await response.json();
        setLogs(data);
      } catch (error) {
        console.error("Failed to fetch logs:", error);
      }
      setLoading(false);
    };

    fetchLogs();
  }, []);

  return (
    <>
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        View Logs
      </h1>
      
      {loading && <p className="text-gray-600">Loading logs...</p>}
      
      {!loading && (
        // 1. ปรับปรุงตาราง
        <div className="overflow-x-auto rounded-lg shadow-md">
          <table className="min-w-full bg-white">
            {/* 2. ทำให้ Header สวยขึ้น */}
            <thead className="bg-gray-200">
              <tr>
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Created</th>
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Country</th>
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Drone ID</th>
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Drone Name</th>
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Celsius</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {logs.map((log, index) => (
                // 3. เพิ่มสีสลับแถว (Zebra striping)
                <tr key={log.created || index} className="text-gray-800 hover:bg-gray-50 even:bg-slate-50">
                  <td className="py-3 px-4 text-sm whitespace-nowrap">{log.created}</td>
                  <td className="py-3 px-4 text-sm">{log.country}</td>
                  <td className="py-3 px-4 text-sm">{log.drone_id}</td>
                  <td className="py-3 px-4 text-sm">{log.drone_name}</td>
                  <td className="py-3 px-4 text-sm">{log.celsius}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
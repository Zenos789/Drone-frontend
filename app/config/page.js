"use client";
import { useEffect, useState } from "react";
import { fetchConfig } from "../api/route";

export default function Config() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [config, setConfig] = useState(null);

  useEffect(() => {
    let mounted = true;

    async function loadConfig() {
      try {
        if (mounted) setLoading(true);
        const data = await fetchConfig();
        if (mounted) setConfig(data);
      } catch (err) {
        console.error(err);
        if (mounted) setError(err.message || "Failed to fetch");
      } finally {
        if (mounted) setLoading(false);
      }
    }

    loadConfig();
    return () => {
      mounted = false;
    };
  }, []);

  // ปรับ Layout หน้า Loading/Error ให้สอดคล้องกับธีมมืดและอยู่กึ่งกลาง
  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 p-8 flex items-center justify-center">
        <p className="text-slate-400 text-lg">Loading config...</p>
      </div>
    );
  }
  if (error) {
    return (
      <div className="min-h-screen bg-slate-900 p-8 flex items-center justify-center">
        <p className="font-medium text-red-500 text-lg">Error: {error}</p>
      </div>
    );
  }
  if (!config) {
    return (
      <div className="min-h-screen bg-slate-900 p-8 flex items-center justify-center">
        <p className="text-slate-400 text-lg">No config found</p>
      </div>
    );
  }

  const { drone_id, drone_name, light, country } = config;

  return (
    // ตั้งค่าพื้นหลังหลักให้เป็นสีเข้มตามธีม
    <div className="min-h-screen bg-slate-900 text-slate-200 p-4 sm:p-8">
      {/* การ์ดแสดงผลหลัก ใช้สีที่สว่างกว่าพื้นหลังเล็กน้อย */}
      <div className="bg-slate-800 p-6 sm:p-8 rounded-lg shadow-lg w-full max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center text-slate-100">
          Drone Config
        </h1>
        {/* ตารางข้อมูล ปรับสีเส้นและพื้นหลังหัวข้อให้เป็นโทนสีเข้ม */}
        <div className="border border-slate-700 rounded-lg overflow-hidden">
          <table className="border-collapse w-full">
            <tbody>
              <tr className="border-b border-slate-700">
                <td className="p-4 font-semibold bg-slate-700 text-slate-300 w-1/3">
                  Drone ID
                </td>
                <td className="p-4">{drone_id}</td>
              </tr>
              <tr className="border-b border-slate-700">
                <td className="p-4 font-semibold bg-slate-700 text-slate-300">
                  Drone Name
                </td>
                <td className="p-4">{drone_name}</td>
              </tr>
              <tr className="border-b border-slate-700">
                <td className="p-4 font-semibold bg-slate-700 text-slate-300">
                  Light
                </td>
                <td className="p-4">{light}</td>
              </tr>
              <tr>
                <td className="p-4 font-semibold bg-slate-700 text-slate-300">
                  Country
                </td>
                <td className="p-4">{country}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
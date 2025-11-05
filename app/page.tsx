"use client"; 

import { useEffect } from 'react';
import { useDroneConfig } from '../context/DroneContext';

export default function ViewConfigPage() {
  const { config, loading, fetchConfig } = useDroneConfig();

  useEffect(() => {
    fetchConfig();
  }, []);

  return (
    <>
      {/* 1. เปลี่ยนสีหัวข้อเป็นสีเข้ม (เพราะพื้นหลังเป็นสีขาวแล้ว) */}
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        View Config
      </h1>
      
      {loading && <p className="text-gray-600">Loading config...</p>}
      
      {config && (
        // 2. ปรับปรุงการแสดงผลข้อมูล
        <div className="divide-y divide-gray-200">
          <ConfigRow label="Drone ID" value={config.drone_id} />
          <ConfigRow label="Drone Name" value={config.drone_name} />
          <ConfigRow label="Light" value={config.light} />
          <ConfigRow label="Country" value={config.country} />
        </div>
      )}
    </>
  );
}

// 3. (Optional) สร้าง Component ช่วยแสดงผลให้สวยงาม
function ConfigRow({ label, value }: { label: string, value: string | number }) {
  return (
    <div className="py-4 flex">
      <span className="font-medium text-gray-700 w-1/3">{label}</span>
      <span className="text-gray-900 w-2/3">{value}</span>
    </div>
  );
}
"use client"; 

import { createContext, useContext, useState, ReactNode } from 'react';

// 1. กำหนด "รูปร่าง" (Type) ของ Config
interface DroneConfig {
  drone_id: number;
  drone_name: string;
  light: string;
  country: string;
}

// 2. กำหนด "รูปร่าง" (Type) ของ Context
interface DroneContextType {
  config: DroneConfig | null; // Config อาจจะเป็น null ในตอนแรก
  loading: boolean;
  fetchConfig: () => Promise<void>; // fetchConfig เป็นฟังก์ชันที่ไม่รับค่าและไม่คืนค่า
}

// 3. สร้าง Context โดยบอก Type ให้มันรู้ (เริ่มต้นเป็น null)
const DroneContext = createContext<DroneContextType | null>(null);

// 4. กำหนด Type ของ props ที่ Provider จะได้รับ
interface DroneProviderProps {
  children: ReactNode;
}

export function DroneProvider({ children }: DroneProviderProps) {
  // 5. บอก Type ให้ useState ด้วย
  const [config, setConfig] = useState<DroneConfig | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchConfig = async () => {
    if (config) return; 

    setLoading(true);
    try {
      const droneId = process.env.NEXT_PUBLIC_DRONE_ID;
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      
      const response = await fetch(`${apiUrl}/configs/${droneId}`);
      // 6. บอก Type ของ data ที่รับกลับมา
      const data: DroneConfig = await response.json(); 
      setConfig(data);
      
    } catch (error) {
      console.error("Failed to fetch config:", error);
    }
    setLoading(false);
  };

  return (
    <DroneContext.Provider value={{ config, fetchConfig, loading }}>
      {children}
    </DroneContext.Provider>
  );
}

// 7. Hook นี้จะคืนค่า Type ที่ถูกต้อง (DroneContextType)
export function useDroneConfig() {
  const context = useContext(DroneContext);
  if (context === null) {
    // ถ้า context เป็น null (แปลว่าลืมหุ้ม Provider) ให้ throw error
    throw new Error("useDroneConfig must be used within a DroneProvider");
  }
  return context;
}
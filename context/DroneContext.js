"use client"; // <-- บรรทัดนี้สำคัญที่สุด!

import { createContext, useContext, useState } from 'react';

const DroneContext = createContext(null);

export function DroneProvider({ children }) {
  const [config, setConfig] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchConfig = async () => {
    if (config) return; 

    setLoading(true);
    try {
      const droneId = process.env.NEXT_PUBLIC_DRONE_ID;
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;

      const response = await fetch(`${apiUrl}/configs/${droneId}`);
      const data = await response.json();
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

export function useDroneConfig() {
  const context = useContext(DroneContext);
  if (context === null) {
    throw new Error("useDroneConfig must be used within a DroneProvider");
  }
  return context;
}
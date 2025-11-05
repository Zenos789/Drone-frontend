"use client"; 

import { useState, useEffect } from 'react'; 
import { useDroneConfig } from '../context/DroneContext'; 

export default function LogFormPage() {
  const { config, fetchConfig, loading: configLoading } = useDroneConfig(); 
  
  const [celsius, setCelsius] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false); //

  useEffect(() => {
    fetchConfig();
  }, [fetchConfig]);

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    
    if (!config || !celsius) { 
      setMessage('Missing config or celsius value');
      setIsError(true); //
      return;
    }

    setSubmitting(true);
    setMessage('Submitting...');
    setIsError(false);

    const payload = {
      drone_id: config.drone_id,
      drone_name: config.drone_name,
      country: config.country,
      celsius: parseFloat(celsius),
    };

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      
      const response = await fetch(`${apiUrl}/logs`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setMessage('Log created successfully!'); //
        setIsError(false); //
        setCelsius('');
      } else {
        setMessage('Failed to create log.'); //
        setIsError(true); //
      }
    } catch (error) {
      setMessage('Error submitting log.');
      setIsError(true); //
      console.error(error);
    }
    setSubmitting(false);
  };

  if (configLoading) {
    return <p className="text-gray-600">Loading config for form...</p>
  }

  return (
    <>
      <h1 className="text-3xl font-bold mb-6 text-gray-800"> 
        Temperature Log Form
      </h1>
      <form onSubmit={handleSubmit} className="max-w-lg">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="celsius">
            Temperature in Celsius
          </label>
          <input
            id="celsius"
            type="number"
            value={celsius}
            onChange={(e) => setCelsius(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-blue-500" //
            placeholder="Enter temperature"
            required
          />
        </div>
        <div className="flex items-center justify-between">
          <button 
            type="submit" 
            disabled={submitting || configLoading} 
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:bg-gray-400 transition-colors duration-200" //
          >
            Submit Data
          </button>
        </div>
        
        {/* เปลี่ยนสีข้อความตามสถานะ (Error/Success) */}
        {message && (
          <p className={`mt-4 text-sm ${isError ? 'text-red-600' : 'text-green-600'}`}>
            {message}
          </p>
        )}
      </form>
    </>
  );
}
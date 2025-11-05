import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import Link from "next/link"; 
import { DroneProvider } from '@/context/DroneContext';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Drone Dashboard", //
  description: "Assignment 2",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* 1. เปลี่ยนพื้นหลัง body เป็นสีเทาอ่อน */}
      <body className={`${inter.className} bg-slate-100 min-h-screen`}>
        
        <DroneProvider>
          {/* 2. สร้าง Navbar ใหม่ */}
          <header className="bg-white shadow-md">
            <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
              <div className="text-2xl font-bold text-gray-800">
                Drone Dashboard
              </div>
              <div className="space-x-15">
                <Link href="/" className="font-medium text-gray-600 hover:text-blue-500">
                  View Config
                </Link>
                <Link href="/form" className="font-medium text-gray-600 hover:text-blue-500">
                  Temperator Log Form
                </Link>
                <Link href="/logs" className="font-medium text-gray-600 hover:text-blue-500">
                  View Logs
                </Link>
              </div>
            </nav>
          </header>

          {/* 3. สร้างกรอบ (Card) หลักสำหรับเนื้อหา */}
          <div className="container mx-auto p-6">
            <main className="bg-white shadow-lg rounded-lg p-6 min-h-[60vh]">
              {children}
            </main>
          </div>

        </DroneProvider>
      </body>
    </html>
  );
}
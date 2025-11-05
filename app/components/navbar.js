"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/config", label: "Config" },
  { href: "/submit", label: "Submit" },
  { href: "/logs", label: "Logs" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="bg-slate-950 shadow-md border-b border-slate-700">
      {/*
       * ⬇️ แก้ไขบรรทัดนี้ ⬇️
       * ลบ 'max-w-7xl' และ 'mx-auto' ออก
       */}
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="shrink-0 flex items-center">
            <Link href="/" className="text-xl font-bold text-teal-400">
              Drone Portal
            </Link>
          </div>

          <div className="flex items-center space-x-6">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;

              const linkClasses = `
                text-sm font-medium border-b-2 h-full inline-flex items-center
                ${
                  isActive
                    ? "border-teal-500 text-white"
                    : "border-transparent text-gray-400 hover:border-teal-400 hover:text-white"
                }
              `;

              return (
                <Link key={link.label} href={link.href} className={linkClasses}>
                  {link.label}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}
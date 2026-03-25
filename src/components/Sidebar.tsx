"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const settingsLinks = [
  { href: "/settings/rules", label: "Rules" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-56 bg-gray-900 text-gray-300 min-h-screen flex flex-col border-r border-gray-800">
      <div className="px-4 py-5">
        <h1 className="text-white font-semibold text-lg">Antimetal</h1>
      </div>

      <nav className="flex-1 px-3">
        <div className="mt-4">
          <h2 className="px-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
            Settings
          </h2>
          <ul className="mt-2 space-y-1">
            {settingsLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`block px-3 py-2 rounded-md text-sm transition-colors ${
                    pathname === link.href
                      ? "bg-gray-800 text-white"
                      : "hover:bg-gray-800 hover:text-white"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </aside>
  );
}

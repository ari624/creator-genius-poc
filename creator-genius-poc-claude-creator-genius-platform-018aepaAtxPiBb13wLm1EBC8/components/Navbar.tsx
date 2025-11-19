'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BookOpen, Users, FileText } from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname?.startsWith(path);
  };

  return (
    <nav className="gradient-primary sticky top-0 z-50 shadow-elegant-xl">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 hover-scale">
            <div className="text-3xl font-bold text-white">
              🎓 Creator Genius Platform
            </div>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center space-x-2">
            <Link
              href="/manual"
              className={`flex items-center space-x-2 px-6 py-3 rounded-xl text-lg transition-all ${
                isActive('/manual')
                  ? 'bg-white/20 text-white font-semibold'
                  : 'text-white/90 hover:bg-white/10 hover:text-white font-medium'
              }`}
            >
              <BookOpen className="w-6 h-6" />
              <span>Social Media Manual</span>
            </Link>

            <Link
              href="/clients"
              className={`flex items-center space-x-2 px-6 py-3 rounded-xl text-lg transition-all ${
                isActive('/clients')
                  ? 'bg-white/20 text-white font-semibold'
                  : 'text-white/90 hover:bg-white/10 hover:text-white font-medium'
              }`}
            >
              <Users className="w-6 h-6" />
              <span>Client Analyzer</span>
            </Link>

            <Link
              href="/blueprints"
              className={`flex items-center space-x-2 px-6 py-3 rounded-xl text-lg transition-all ${
                isActive('/blueprints')
                  ? 'bg-white/20 text-white font-semibold'
                  : 'text-white/90 hover:bg-white/10 hover:text-white font-medium'
              }`}
            >
              <FileText className="w-6 h-6" />
              <span>Blueprint Generator</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

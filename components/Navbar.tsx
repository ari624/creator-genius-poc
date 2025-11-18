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
    <nav className="gradient-primary sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="text-2xl font-bold text-white">
              🎓 Creator Genius Platform
            </div>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center space-x-1">
            <Link
              href="/manual"
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                isActive('/manual')
                  ? 'bg-white/20 text-white'
                  : 'text-white/80 hover:bg-white/10 hover:text-white'
              }`}
            >
              <BookOpen className="w-5 h-5" />
              <span className="font-medium">Social Media Manual</span>
            </Link>

            <Link
              href="/clients"
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                isActive('/clients')
                  ? 'bg-white/20 text-white'
                  : 'text-white/80 hover:bg-white/10 hover:text-white'
              }`}
            >
              <Users className="w-5 h-5" />
              <span className="font-medium">Client Analyzer</span>
            </Link>

            <Link
              href="/blueprints"
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                isActive('/blueprints')
                  ? 'bg-white/20 text-white'
                  : 'text-white/80 hover:bg-white/10 hover:text-white'
              }`}
            >
              <FileText className="w-5 h-5" />
              <span className="font-medium">Blueprint Generator</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

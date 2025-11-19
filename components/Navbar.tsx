'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BookOpen, Users, FileText, Sparkles } from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname?.startsWith(path);
  };

  return (
    <nav className="gradient-primary sticky top-0 z-50 shadow-elegant-xl backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div className="text-2xl font-bold text-white">
                Creator Genius
              </div>
            </div>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center gap-2">
            <Link
              href="/social-media-manual"
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl transition-all ${
                isActive('/social-media-manual')
                  ? 'bg-white text-purple-700 font-semibold shadow-lg'
                  : 'text-white/90 hover:bg-white/15 hover:text-white font-medium'
              }`}
            >
              <BookOpen className="w-5 h-5" />
              <span className="hidden lg:inline">Social Media Manual</span>
              <span className="lg:hidden">Manual</span>
            </Link>

            <Link
              href="/client-analyzer"
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl transition-all ${
                isActive('/client-analyzer')
                  ? 'bg-white text-purple-700 font-semibold shadow-lg'
                  : 'text-white/90 hover:bg-white/15 hover:text-white font-medium'
              }`}
            >
              <Users className="w-5 h-5" />
              <span className="hidden lg:inline">Client Analyzer</span>
              <span className="lg:hidden">Analyzer</span>
            </Link>

            <Link
              href="/blueprints"
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl transition-all ${
                isActive('/blueprints')
                  ? 'bg-white text-purple-700 font-semibold shadow-lg'
                  : 'text-white/90 hover:bg-white/15 hover:text-white font-medium'
              }`}
            >
              <FileText className="w-5 h-5" />
              <span className="hidden lg:inline">Blueprint Generator</span>
              <span className="lg:hidden">Blueprints</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

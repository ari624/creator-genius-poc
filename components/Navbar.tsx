'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BookOpen, Users, FileText } from '@/components/Icon';

export default function Navbar() {
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname?.startsWith(path);
  };

  return (
    <nav className="gradient-primary" style={{
      position: 'sticky',
      top: 0,
      zIndex: 50,
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
      borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
    }}>
      <div className="container" style={{ padding: '0 var(--spacing-xl)' }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '72px'
        }}>
          {/* Logo */}
          <Link href="/" style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--spacing-sm)',
            transition: 'transform 0.2s ease'
          }}>
            <div style={{
              fontSize: '1.5rem',
              fontWeight: '700',
              color: 'white',
              letterSpacing: '-0.02em'
            }}>
              Creator Genius
            </div>
          </Link>

          {/* Navigation Links */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-sm)' }}>
            <Link
              href="/manual"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--spacing-sm)',
                padding: 'var(--spacing-md) var(--spacing-lg)',
                borderRadius: 'var(--radius-md)',
                fontSize: '0.9375rem',
                fontWeight: isActive('/manual') ? '600' : '500',
                color: 'white',
                background: isActive('/manual') ? 'rgba(255, 255, 255, 0.15)' : 'transparent',
                transition: 'all 0.2s ease'
              }}
              onMouseOver={(e) => {
                if (!isActive('/manual')) {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                }
              }}
              onMouseOut={(e) => {
                if (!isActive('/manual')) {
                  e.currentTarget.style.background = 'transparent';
                }
              }}
            >
              <BookOpen size={20} />
              <span>Manual</span>
            </Link>

            <Link
              href="/clients"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--spacing-sm)',
                padding: 'var(--spacing-md) var(--spacing-lg)',
                borderRadius: 'var(--radius-md)',
                fontSize: '0.9375rem',
                fontWeight: isActive('/clients') ? '600' : '500',
                color: 'white',
                background: isActive('/clients') ? 'rgba(255, 255, 255, 0.15)' : 'transparent',
                transition: 'all 0.2s ease'
              }}
              onMouseOver={(e) => {
                if (!isActive('/clients')) {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                }
              }}
              onMouseOut={(e) => {
                if (!isActive('/clients')) {
                  e.currentTarget.style.background = 'transparent';
                }
              }}
            >
              <Users size={20} />
              <span>Clients</span>
            </Link>

            <Link
              href="/blueprints"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--spacing-sm)',
                padding: 'var(--spacing-md) var(--spacing-lg)',
                borderRadius: 'var(--radius-md)',
                fontSize: '0.9375rem',
                fontWeight: isActive('/blueprints') ? '600' : '500',
                color: 'white',
                background: isActive('/blueprints') ? 'rgba(255, 255, 255, 0.15)' : 'transparent',
                transition: 'all 0.2s ease'
              }}
              onMouseOver={(e) => {
                if (!isActive('/blueprints')) {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                }
              }}
              onMouseOut={(e) => {
                if (!isActive('/blueprints')) {
                  e.currentTarget.style.background = 'transparent';
                }
              }}
            >
              <FileText size={20} />
              <span>Blueprints</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

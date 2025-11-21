'use client';

export const toast = {
  success: (message: string) => {
    if (typeof window !== 'undefined') {
      alert(`✓ ${message}`);
    }
  },
  error: (message: string) => {
    if (typeof window !== 'undefined') {
      alert(`✗ ${message}`);
    }
  },
  info: (message: string) => {
    if (typeof window !== 'undefined') {
      alert(`ℹ ${message}`);
    }
  },
};

export const Toaster = () => null;

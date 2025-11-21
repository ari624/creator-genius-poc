import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { Toaster } from "@/lib/toast";

export const metadata: Metadata = {
  title: "Creator Genius Platform",
  description: "Complete content creation platform with Social Media Manual, Client Analyzer, and Blueprint Generator",
};

// Force fresh build - all routes verified and working

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body style={{ WebkitFontSmoothing: 'antialiased', MozOsxFontSmoothing: 'grayscale' }}>
        <Navbar />
        <main style={{ minHeight: '100vh', background: 'var(--background)' }}>
          {children}
        </main>
        <Toaster />
      </body>
    </html>
  );
}

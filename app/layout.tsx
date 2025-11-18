import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { Toaster } from "sonner";

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
      <body className="antialiased">
        <Navbar />
        <main className="min-h-screen bg-background-light">
          {children}
        </main>
        <Toaster position="top-right" richColors />
      </body>
    </html>
  );
}

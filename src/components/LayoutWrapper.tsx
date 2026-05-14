"use client";

import { usePathname } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAuthPage = pathname === "/login" || pathname === "/signup";

  // Isolated premium viewport layout specifically optimized for authentication forms
  if (isAuthPage) {
    return (
      <div className="min-h-screen flex flex-col justify-center bg-[#0b0f19] relative overflow-hidden">
        {/* Ambient global glow layers for authentication views */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-sky-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />
        
        <main className="flex-1 flex flex-col justify-center p-4 relative z-10">
          {children}
        </main>
      </div>
    );
  }

  // Core administrative Operations Command Center console layout
  return (
    <div className="flex min-h-screen relative">
      {/* Global Sidebar Shell */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col md:pl-64 min-w-0">
        <Header />
        <main className="flex-1 p-6 md:p-8 max-w-7xl w-full mx-auto">
          {children}
        </main>

        {/* Advanced Platform Footer */}
        <Footer />
      </div>
    </div>
  );
}

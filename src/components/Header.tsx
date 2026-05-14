"use client";

import { usePathname } from "next/navigation";
import { Search, Bell } from "lucide-react";

export default function Header() {
  const pathname = usePathname();

  // Helper to format title based on active path
  const getPageTitle = () => {
    if (!pathname || pathname === "/" || pathname === "/dashboard") return "Operational Dashboard";
    if (pathname.startsWith("/projects/")) return "Project Commander";
    if (pathname.startsWith("/projects")) return "Project Directory";
    if (pathname.startsWith("/planner")) return "AI Multi-Agent Studio";
    if (pathname.startsWith("/settings")) return "System Configuration";
    return "Construction AI";
  };

  return (
    <header className="h-20 border-b border-white/5 bg-[#0b0f19]/80 backdrop-blur-md sticky top-0 z-30 px-8 flex items-center justify-between transition-all">
      {/* Left side: Dynamic Page Title */}
      <div className="flex items-center gap-4">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
            {getPageTitle()}
          </h2>
          <p className="text-xs text-slate-400">
            Real-time multi-agent execution pipeline
          </p>
        </div>
      </div>

      {/* Right side: Global Actions / Workspace info */}
      <div className="flex items-center gap-4">
        {/* Mock search box */}
        <div className="relative hidden sm:block w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input 
            type="text" 
            placeholder="Search tasks, risks, agents..." 
            className="w-full bg-white/[0.02] border border-white/5 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-sky-500/40 focus:ring-1 focus:ring-sky-500/40 transition-all"
          />
        </div>

        {/* Global Notifications trigger */}
        <button className="relative p-2.5 rounded-xl bg-white/[0.02] border border-white/5 text-slate-400 hover:text-white hover:bg-white/[0.05] transition-all">
          <Bell className="w-4 h-4" />
          <span className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-sky-400 ring-2 ring-[#0b0f19]" />
        </button>

        {/* Workspace scope selector */}
        <div className="hidden lg:flex items-center gap-2 pl-4 border-l border-white/5">
          <div className="text-right">
            <span className="block text-xs font-semibold text-slate-200">Main Fleet</span>
            <span className="block text-[10px] text-sky-400 font-medium">Production Env</span>
          </div>
        </div>
      </div>
    </header>
  );
}

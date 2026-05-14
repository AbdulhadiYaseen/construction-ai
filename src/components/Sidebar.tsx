"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  FolderKanban, 
  Cpu, 
  Settings, 
  Layers,
  LogIn,
  UserPlus
} from "lucide-react";

export default function Sidebar() {
  const pathname = usePathname();

  const navigation = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Projects", href: "/projects", icon: FolderKanban },
    { name: "AI Studio", href: "/planner", icon: Cpu },
    { name: "Settings", href: "/settings", icon: Settings },
  ];

  const authLinks = [
    { name: "Sign In", href: "/login", icon: LogIn },
    { name: "Register", href: "/signup", icon: UserPlus },
  ];

  return (
    <aside className="w-64 hidden md:flex flex-col fixed inset-y-0 left-0 z-40 bg-[#070b12]/95 border-r border-white/5 backdrop-blur-xl">
      {/* Brand Header */}
      <div className="flex items-center gap-3 px-6 h-20 border-b border-white/5 shrink-0">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-sky-500/20 animate-float">
          <Layers className="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 className="font-bold text-lg text-white tracking-wide flex items-center gap-1.5">
            Construction<span className="text-sky-400">AI</span>
          </h1>
          <p className="text-xs text-slate-500 font-medium tracking-wider uppercase">Command Center</p>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-4 py-6 space-y-6 overflow-y-auto custom-scrollbar">
        {/* Core Operations */}
        <div className="space-y-1.5">
          <div className="px-3 mb-2 text-[10px] font-semibold uppercase tracking-wider text-slate-500">
            Core Operations
          </div>
          {navigation.map((item) => {
            const isActive = pathname === item.href || (pathname?.startsWith(item.href) && item.href !== "/dashboard");
            const Icon = item.icon;

            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-3.5 py-3 rounded-xl font-medium text-sm transition-all duration-300 relative group ${
                  isActive
                    ? "text-white bg-gradient-to-r from-sky-500/10 to-indigo-500/5 border border-sky-500/20 shadow-sm"
                    : "text-slate-400 hover:text-white hover:bg-white/[0.02]"
                }`}
              >
                {isActive && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-sky-400 rounded-r-full shadow-sm shadow-sky-400" />
                )}
                <Icon className={`w-5 h-5 transition-transform duration-300 group-hover:scale-110 ${
                  isActive ? "text-sky-400" : "text-slate-500 group-hover:text-slate-300"
                }`} />
                {item.name}
                
                {item.name === "AI Studio" && (
                  <span className="ml-auto px-1.5 py-0.5 text-[9px] font-bold bg-indigo-500/20 text-indigo-300 rounded-md border border-indigo-500/30">
                    AGENT
                  </span>
                )}
              </Link>
            );
          })}
        </div>

        {/* Access Gateways */}
        <div className="space-y-1.5 pt-2 border-t border-white/5">
          <div className="px-3 mb-2 text-[10px] font-semibold uppercase tracking-wider text-slate-500">
            Access Gateways
          </div>
          {authLinks.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;

            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-medium text-xs transition-all duration-300 ${
                  isActive
                    ? "text-sky-400 bg-sky-500/10 border border-sky-500/20 font-bold"
                    : "text-slate-500 hover:text-slate-300 hover:bg-white/[0.01]"
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? "text-sky-400" : "text-slate-600"}`} />
                {item.name}
              </Link>
            );
          })}
        </div>
      </nav>

      {/* User / System Footprint */}
      <div className="p-4 border-t border-white/5 bg-gradient-to-b from-transparent to-black/20 shrink-0">
        <div className="flex items-center gap-3 px-2 py-2 rounded-lg bg-white/[0.02] border border-white/5">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-slate-700 to-slate-900 flex items-center justify-center text-xs font-bold text-sky-400 border border-white/10">
            OP
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium text-white truncate">Operations Lead</p>
            <p className="text-[10px] text-slate-500 truncate">System Active</p>
          </div>
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
        </div>
      </div>
    </aside>
  );
}

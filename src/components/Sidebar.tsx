"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  FolderKanban, 
  Cpu, 
  Settings, 
  Layers,
  LogIn,
  UserPlus,
  Info,
  Mail
} from "lucide-react";

export default function Sidebar() {
  const pathname = usePathname();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const res = await fetch("/api/auth/me");
        const data = await res.json();
        if (data.success && data.user) {
          setUser(data.user);
        }
      } catch (err) {
        console.warn("Sidebar unable to synchronize token.");
      } finally {
        setLoading(false);
      }
    };

    checkAuthStatus();
  }, [pathname]); // Re-run evaluation on route transitions

  const navigation = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Projects", href: "/projects", icon: FolderKanban },
    { name: "AI Studio", href: "/planner", icon: Cpu },
    { name: "About Us", href: "/about", icon: Info },
    { name: "Contact Us", href: "/contact", icon: Mail },
    { name: "Settings", href: "/settings", icon: Settings },
  ];

  const authLinks = [
    { name: "Sign In", href: "/login", icon: LogIn },
    { name: "Register", href: "/signup", icon: UserPlus },
  ];

  // Compute dynamic user initials
  const getInitials = (name: string) => {
    if (!name) return "OP";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <aside className="w-64 hidden md:flex flex-col fixed inset-y-0 left-0 z-40 bg-[#070b12]/95 border-r border-white/5 backdrop-blur-xl">
      {/* Brand Header */}
      <div className="flex items-center gap-3 px-6 h-20 border-b border-white/5 shrink-0">
        <div className="w-10 h-10 rounded-xl overflow-hidden flex items-center justify-center shadow-lg shadow-sky-500/20 animate-float">
          <img src="/logo.png" alt="Construction AI Logo" className="w-full h-full object-cover" />
        </div>
        <div>
          <h1 className="font-bold text-lg text-white tracking-wide">
            Construc<span className="text-sky-400">tify</span>
          </h1>
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

        {/* Access Gateways (Only visible if fully loaded and NOT signed in) */}
        {!loading && !user && (
          <div className="space-y-1.5 pt-2 border-t border-white/5 animate-fade-in">
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
        )}
      </nav>

      {/* User / System Footprint */}
      <div className="p-4 border-t border-white/5 bg-gradient-to-b from-transparent to-black/20 shrink-0">
        <div className="flex items-center gap-3 px-2.5 py-2.5 rounded-xl bg-white/[0.02] border border-white/5">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-slate-700 to-slate-900 flex items-center justify-center text-[10px] font-bold text-sky-400 border border-white/10 tracking-wider uppercase shrink-0 shadow-inner">
            {user ? getInitials(user.name) : "OP"}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-bold text-white truncate leading-tight">
              {user ? user.name : "Operations Lead"}
            </p>
            <p className="text-[9px] font-mono tracking-wide text-slate-500 uppercase leading-none mt-1">
              {user ? "AUTHORIZED NODE" : "SYSTEM ACTIVE"}
            </p>
          </div>
          <div className={`w-2 h-2 rounded-full animate-pulse shrink-0 ${user ? "bg-emerald-500" : "bg-amber-500"}`} />
        </div>
      </div>
    </aside>
  );
}

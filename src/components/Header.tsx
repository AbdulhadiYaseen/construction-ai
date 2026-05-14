"use client";

import { useState, useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Search, Bell, LogOut, Settings, ChevronDown, User, Loader2, Layers, CheckCircle2, Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  
  const [userName, setUserName] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Global search operational states
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<{ projects: any[]; tasks: any[] }>({
    projects: [],
    tasks: [],
  });
  const [searchDropdownOpen, setSearchDropdownOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  // Fetch active profile on mount to resolve credentials
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch("/api/auth/me");
        const data = await res.json();
        if (data.success && data.user) {
          setUserName(data.user.name);
          setUserEmail(data.user.email);
        }
      } catch (err) {
        console.warn("Auth Status Query Failed: offline node response.");
      }
    };

    fetchProfile();
    setMounted(true);
  }, []);

  // Detect outside clicks to collapse active menus (profile dropdown and search dropdown)
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setSearchDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle debounced search query resolution
  useEffect(() => {
    if (searchQuery.trim().length === 0) {
      setSearchResults({ projects: [], tasks: [] });
      setSearchDropdownOpen(false);
      return;
    }

    setSearchDropdownOpen(true);
    setIsSearching(true);

    const debounceTimer = setTimeout(async () => {
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(searchQuery)}`);
        const data = await res.json();
        if (data.success) {
          setSearchResults({ projects: data.projects || [], tasks: data.tasks || [] });
        }
      } catch (err) {
        console.error("Global search fetch triggered an exception:", err);
      } finally {
        setIsSearching(false);
      }
    }, 300); // 300ms buffer

    return () => clearTimeout(debounceTimer);
  }, [searchQuery]);

  const handleLogout = async () => {
    try {
      const res = await fetch("/api/auth/logout", { method: "POST" });
      if (res.ok) {
        // Fully terminate local routing context and send to gateway
        router.push("/login");
        router.refresh();
      }
    } catch (err) {
      console.error("Sign out error:", err);
    }
  };

  const getPageTitle = () => {
    if (!pathname || pathname === "/" || pathname === "/dashboard") return "Operational Dashboard";
    if (pathname.startsWith("/projects/")) return "Project Commander";
    if (pathname.startsWith("/projects")) return "Project Directory";
    if (pathname.startsWith("/planner")) return "AI Multi-Agent Studio";
    if (pathname.startsWith("/settings")) return "System Configuration";
    return "Construction AI";
  };

  // Extract uppercase initial for aesthetic placeholder
  const initials = userName ? userName.charAt(0).toUpperCase() : "C";

  return (
    <header className="h-20 border-b border-white/5 bg-[#0b0f19]/80 backdrop-blur-md sticky top-0 z-30 px-6 md:px-8 flex items-center justify-between transition-all">
      {/* Left: View Context Title */}
      <div className="flex items-center gap-4">
        <div>
          <h2 className="text-base md:text-xl font-bold text-white tracking-tight flex items-center gap-2">
            {getPageTitle()}
          </h2>
          <p className="text-[10px] md:text-xs text-slate-400 hidden sm:block">
            Real-time multi-agent execution pipeline
          </p>
        </div>
      </div>

      {/* Right: Search / Profile Suite */}
      <div className="flex items-center gap-3 md:gap-4">
        {/* Interactive Global Search Context */}
        <div className="relative hidden lg:block w-64 xl:w-72" ref={searchRef}>
          <div className="relative">
            {isSearching ? (
              <Loader2 className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-sky-400 animate-spin" />
            ) : (
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-500" />
            )}
            <input
              type="text"
              placeholder="Search tasks, projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => searchQuery.trim() && setSearchDropdownOpen(true)}
              className="w-full bg-white/[0.02] border border-white/5 rounded-xl pl-9 pr-4 py-2 text-[11px] text-slate-200 placeholder-slate-500 focus:outline-none focus:border-sky-500/40 focus:ring-1 focus:ring-sky-500/40 transition-all"
            />
          </div>

          {/* Floating Live Search Dropdown */}
          {searchDropdownOpen && (
            <div className="absolute left-0 mt-2 w-80 rounded-2xl bg-[#0e1420] border border-white/10 shadow-2xl p-2 z-50 animate-fade-in max-h-[400px] overflow-y-auto custom-scrollbar">
              {isSearching && (searchResults.projects.length === 0 && searchResults.tasks.length === 0) ? (
                <div className="flex items-center justify-center gap-2 py-6 text-[11px] text-slate-400">
                  <Loader2 className="w-3.5 h-3.5 animate-spin text-sky-400" />
                  Querying database vectors...
                </div>
              ) : searchResults.projects.length === 0 && searchResults.tasks.length === 0 ? (
                <div className="text-center py-6 px-3 text-[11px] text-slate-500">
                  No footprint matches found for &ldquo;<span className="text-slate-300 font-mono">{searchQuery}</span>&rdquo;
                </div>
              ) : (
                <div className="space-y-3">
                  {/* PROJECTS CATEGORY */}
                  {searchResults.projects.length > 0 && (
                    <div>
                      <div className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5 mb-1">
                        <Layers className="w-3 h-3 text-sky-400" />
                        Active Projects ({searchResults.projects.length})
                      </div>
                      <div className="space-y-0.5">
                        {searchResults.projects.map((proj) => (
                          <Link
                            key={`proj-${proj.id}`}
                            href={`/projects/${proj.id}`}
                            onClick={() => {
                              setSearchDropdownOpen(false);
                              setSearchQuery("");
                            }}
                            className="flex items-center justify-between px-2.5 py-2 rounded-xl text-[11px] text-slate-300 hover:bg-white/[0.04] hover:text-white transition-all"
                          >
                            <div className="font-semibold truncate max-w-[180px]">{proj.name}</div>
                            <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-sky-500/10 text-sky-300 border border-sky-500/20 shrink-0 scale-90">
                              {proj.status}
                            </span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* TASKS CATEGORY */}
                  {searchResults.tasks.length > 0 && (
                    <div className={searchResults.projects.length > 0 ? "border-t border-white/5 pt-2" : ""}>
                      <div className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5 mb-1">
                        <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                        Operational Tasks ({searchResults.tasks.length})
                      </div>
                      <div className="space-y-0.5">
                        {searchResults.tasks.map((task) => (
                          <Link
                            key={`task-${task.id}`}
                            href={`/projects/${task.project.id}?tab=tasks`}
                            onClick={() => {
                              setSearchDropdownOpen(false);
                              setSearchQuery("");
                            }}
                            className="block px-2.5 py-2 rounded-xl text-[11px] text-slate-300 hover:bg-white/[0.04] hover:text-white transition-all"
                          >
                            <div className="font-semibold truncate leading-snug">{task.title}</div>
                            {task.project && (
                              <div className="text-[9px] text-slate-500 mt-0.5 truncate">
                                Project: <span className="text-slate-400 italic">{task.project.name}</span>
                              </div>
                            )}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Theme Toggle Switch */}
        <button
          onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
          className="p-2 md:p-2.5 rounded-xl bg-white/[0.02] border border-white/5 text-slate-400 hover:text-white hover:bg-white/[0.05] transition-all shadow-sm"
          title="Toggle Core Aesthetics Theme"
        >
          {mounted && resolvedTheme === "dark" ? (
            <Sun className="w-3.5 h-3.5 md:w-4 h-4 text-amber-400 animate-fade-in" />
          ) : (
            <Moon className="w-3.5 h-3.5 md:w-4 h-4 text-indigo-500 animate-fade-in" />
          )}
        </button>

        {/* Notifications Trigger */}
        {/* <button className="relative p-2 md:p-2.5 rounded-xl bg-white/[0.02] border border-white/5 text-slate-400 hover:text-white hover:bg-white/[0.05] transition-all">
          <Bell className="w-3.5 h-3.5 md:w-4 h-4" />
          <span className="absolute top-1.5 md:top-2 right-1.5 md:right-2 w-1.5 h-1.5 rounded-full bg-sky-400 ring-2 ring-[#0b0f19]" />
        </button> */}

        {/* Static Environment Pod */}
        {/* <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/[0.01] border border-white/5">
          <div className="text-right">
            <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wide">Main Fleet</span>
          </div>
        </div> */}

        {/* Interactive Profile Pod */}
        {userName && (
          <div className="relative pl-3 md:pl-4 border-l border-white/5" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-2 md:gap-2.5 group hover:opacity-90 transition-all p-1 rounded-xl"
            >
              <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-gradient-to-tr from-sky-500 to-indigo-600 flex items-center justify-center font-bold text-xs text-white shadow-md shadow-sky-500/10 shrink-0 border border-white/10 group-hover:scale-105 transition-transform">
                {initials}
              </div>
              
              <div className="hidden sm:block text-left">
                <span className="block text-xs font-bold text-slate-200 leading-tight group-hover:text-white transition-colors">
                  {userName}
                </span>
                <span className="block text-[9px] text-slate-500 leading-none mt-0.5">
                  Operator
                </span>
              </div>

              <ChevronDown className={`w-3 h-3 text-slate-500 group-hover:text-slate-400 transition-transform ${dropdownOpen ? "rotate-180" : ""}`} />
            </button>

            {/* Animated Floating Dropdown Menu */}
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-52 rounded-2xl bg-[#0e1420] border border-white/10 shadow-2xl p-1.5 z-50 animate-fade-in">
                <div className="px-3 py-2 mb-1 border-b border-white/5">
                  <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Active Operator</p>
                  <p className="text-xs font-bold text-slate-200 truncate mt-0.5">{userName}</p>
                  <p className="text-[10px] text-slate-400 truncate opacity-80">{userEmail}</p>
                </div>

                <Link
                  href="/settings"
                  onClick={() => setDropdownOpen(false)}
                  className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs text-slate-300 hover:bg-white/[0.04] hover:text-white transition-all w-full text-left font-medium"
                >
                  <Settings className="w-3.5 h-3.5 text-slate-400" />
                  Console Settings
                </Link>

                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-3 py-2 mt-0.5 rounded-xl text-xs text-rose-400 hover:bg-rose-500/10 hover:text-rose-300 transition-all w-full text-left font-semibold"
                >
                  <LogOut className="w-3.5 h-3.5 shrink-0" />
                  Terminate Session
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
}

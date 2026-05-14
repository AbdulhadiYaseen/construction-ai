"use client";

import Link from "next/link";
import { 
  Cpu, 
  Mail, 
  ArrowRight,
  ShieldAlert,
  BookOpen,
  Heart
} from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-white/5 bg-black/20 mt-auto relative overflow-hidden shrink-0">
      {/* Subtle background accent glow */}
      <div className="absolute bottom-0 right-0 w-[500px] h-[200px] bg-sky-500/5 rounded-full blur-3xl pointer-events-none -z-10" />
      
      <div className="max-w-7xl mx-auto px-6 md:px-8 pt-12 pb-8">
        {/* Multi-column Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-10">
          
          {/* Brand Space Column */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg overflow-hidden flex items-center justify-center bg-gradient-to-tr from-sky-500 to-indigo-600 shadow-md">
                <img src="/logo.png" alt="Constructify AI Logo" className="w-full h-full object-cover" onError={(e) => {
                  // Fallback if img doesn't exist
                  (e.target as HTMLElement).style.display = 'none';
                }} />
              </div>
              <span className="font-extrabold text-base text-white tracking-tight">
                Construct<span className="text-sky-400">ify</span>
              </span>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed max-w-xs">
              Empowering construction planners with Next-Gen multi-agent intelligence platforms. Build stronger, forecast safer, deliver faster.
            </p>
            <div className="flex items-center gap-3 pt-2">
              {/* Inline Twitter (X) Icon */}
              <a href="#" className="p-1.5 rounded-lg bg-white/[0.02] border border-white/5 text-slate-500 hover:text-white hover:bg-sky-500/10 transition-all">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              {/* Inline LinkedIn Icon */}
              <a href="#" className="p-1.5 rounded-lg bg-white/[0.02] border border-white/5 text-slate-500 hover:text-white hover:bg-indigo-500/10 transition-all">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect width="4" height="12" x="2" y="9" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </a>
              {/* Inline GitHub Icon */}
              <a href="#" className="p-1.5 rounded-lg bg-white/[0.02] border border-white/5 text-slate-500 hover:text-white hover:bg-slate-500/10 transition-all">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3">
                  <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                  <path d="M9 18c-4.51 2-5-2-7-2" />
                </svg>
              </a>
            </div>
          </div>

          {/* Core Navigation Column */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-slate-300 tracking-wider uppercase">Platform Core</h4>
            <ul className="space-y-2.5">
              <li>
                <Link href="/dashboard" className="text-[11px] text-slate-500 hover:text-sky-400 flex items-center gap-1.5 group transition-colors">
                  <ArrowRight className="w-3 h-3 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                  Operations Dashboard
                </Link>
              </li>
              <li>
                <Link href="/projects" className="text-[11px] text-slate-500 hover:text-sky-400 flex items-center gap-1.5 group transition-colors">
                  <ArrowRight className="w-3 h-3 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                  Projects Inventory
                </Link>
              </li>
              <li>
                <Link href="/planner" className="text-[11px] text-slate-500 hover:text-sky-400 flex items-center gap-1.5 group transition-colors">
                  <ArrowRight className="w-3 h-3 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                  AI Agent Studio
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-[11px] text-slate-500 hover:text-sky-400 flex items-center gap-1.5 group transition-colors">
                  <ArrowRight className="w-3 h-3 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                  Contact Communications
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources Column */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-slate-300 tracking-wider uppercase">System Resources</h4>
            <ul className="space-y-2.5">
              <li>
                <a href="#" className="text-[11px] text-slate-500 hover:text-indigo-400 flex items-center gap-1.5 group transition-colors">
                  <BookOpen className="w-3 h-3 text-slate-600 group-hover:text-indigo-400" />
                  Documentation
                </a>
              </li>
              <li>
                <a href="#" className="text-[11px] text-slate-500 hover:text-indigo-400 flex items-center gap-1.5 group transition-colors">
                  <Cpu className="w-3 h-3 text-slate-600 group-hover:text-indigo-400" />
                  API Endpoint Logs
                </a>
              </li>
              <li>
                <a href="#" className="text-[11px] text-slate-500 hover:text-indigo-400 flex items-center gap-1.5 group transition-colors">
                  <ShieldAlert className="w-3 h-3 text-slate-600 group-hover:text-indigo-400" />
                  Platform Status
                </a>
              </li>
            </ul>
          </div>

          {/* Corporate Space */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-slate-300 tracking-wider uppercase">Company</h4>
            <ul className="space-y-2.5">
              <li>
                <Link href="/about" className="text-[11px] text-slate-500 hover:text-white transition-colors">
                  About Constructify
                </Link>
              </li>
              <li>
                <a href="#" className="text-[11px] text-slate-500 hover:text-white transition-colors">
                  System Terms
                </a>
              </li>
              <li>
                <a href="mailto:support@constructify.ai" className="text-[11px] text-slate-500 hover:text-white flex items-center gap-1.5 transition-colors">
                  <Mail className="w-3 h-3 text-slate-600" />
                  Contact Node
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Copyright Bar */}
        <div className="pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] font-mono uppercase tracking-widest text-slate-600">
          <div className="flex items-center gap-1.5">
            <span>© {currentYear} Constructify Network Inc.</span>
            <span className="text-slate-700 hidden sm:inline">•</span>
            <span className="hidden sm:flex items-center gap-1">
              Made for builders <Heart className="w-2.5 h-2.5 text-rose-500 animate-pulse" fill="currentColor" />
            </span>
          </div>
          
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.4)] animate-pulse" />
              AGENT SWARM STABLE
            </span>
            <span className="text-slate-700 hidden sm:inline">•</span>
            <span className="font-semibold">v1.3.8-RELEASE</span>
          </div>
        </div>

      </div>
    </footer>
  );
}

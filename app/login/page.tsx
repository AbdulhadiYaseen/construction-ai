"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Mail, Lock, ArrowRight, Layers, Loader2 } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        // Redirect directly to dashboard console
        router.push("/dashboard");
      } else {
        setError(data.message || "Invalid account credentials provided");
      }
    } catch (err) {
      setError("Network error attempting authentication gateway handshake");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 animate-fade-in max-w-5xl mx-auto w-full">
      <div className="glass-panel rounded-3xl w-full overflow-hidden border-white/10 shadow-2xl flex flex-col md:flex-row min-h-[600px]">
        
        {/* LEFT SIDE: Functional Authentication Hub */}
        <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center relative">
          {/* Ambient accent backdrop */}
          <div className="absolute -right-10 -top-10 w-48 h-48 bg-sky-500/5 rounded-full blur-3xl pointer-events-none" />

          {/* Brand Shell */}
          <div className="mb-8 relative z-10">
            <div className="w-12 h-12 rounded-2xl overflow-hidden flex items-center justify-center mb-3 shadow-lg shadow-sky-500/25 animate-float">
              <img src="/logo.png" alt="Construction AI Logo" className="w-full h-full object-cover" />
            </div>
            <h1 className="text-2xl font-extrabold text-white tracking-tight">
              Welcome <span className="text-gradient">Back</span>
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Access the Constructify multi-agent intelligence command center
            </p>
          </div>

          {error && (
            <div className="mb-6 p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-xs text-rose-300 text-center animate-fade-in">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4 relative z-10 w-full">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                System Identity Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  type="email"
                  required
                  placeholder="commander@constructify.ai"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-black/40 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-sky-500 transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Access Key Phrase
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  type="password"
                  required
                  placeholder="••••••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-black/40 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-sky-500 transition-colors"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-3 mt-2 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 text-white font-bold text-xs shadow-lg shadow-sky-500/20 hover:opacity-95 transition-all disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-sky-200" />
                  Authorizing Core...
                </>
              ) : (
                <>
                  Login System
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 pt-5 border-t border-white/5 relative z-10">
            <p className="text-xs text-slate-500">
              Don&apos;t have an operative account?{" "}
              <Link href="/signup" className="text-sky-400 hover:text-sky-300 font-bold transition-colors">
                Register Footprint
              </Link>
            </p>
          </div>
        </div>

        {/* RIGHT SIDE: Immersive Hero Graphics Viewport */}
        <div className="hidden md:flex md:w-1/2 relative bg-slate-950 items-end p-10 border-l border-white/5 overflow-hidden">
          {/* High-Fidelity Generated Background Graphic */}
          <img 
            src="/login.png" 
            alt="Constructify architectural simulation network" 
            className="absolute inset-0 w-full h-full object-cover opacity-80 scale-105 hover:scale-100 transition-transform duration-[10s] ease-out"
          />
          
          {/* Master cinematic overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0b0f19] via-[#0b0f19]/40 to-transparent z-10" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0b0f19] via-transparent to-transparent z-10" />

          {/* Ambient holographic grid overlays */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-sky-500/10 via-transparent to-transparent blur-2xl z-10 pointer-events-none" />

          {/* Floating typography payload */}
          <div className="relative z-20 space-y-3 max-w-xs">
            <div className="inline-flex items-center gap-1.5 bg-sky-500/20 border border-sky-500/30 px-2.5 py-1 rounded text-[10px] font-mono font-bold text-sky-300 tracking-wider uppercase">
              System Active
            </div>
            <h3 className="text-xl font-extrabold text-white leading-tight tracking-tight">
              Synthesize the Future of Architecture
            </h3>
            <p className="text-[11px] text-slate-300 leading-relaxed">
              Empower construction schedules with Gemini-driven sub-agent threads performing micro-adjustments in real-time.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}

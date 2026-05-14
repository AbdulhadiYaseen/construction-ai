"use client";

import { 
  Building2, 
  ShieldCheck, 
  Cpu, 
  Globe, 
  Compass, 
  Award, 
  Users, 
  TrendingUp 
} from "lucide-react";

export default function AboutPage() {
  return (
    <div className="space-y-12 animate-fade-in max-w-5xl mx-auto pb-12">
      {/* Majestic About Us Hero with about-us.png */}
      <div className="relative overflow-hidden rounded-3xl p-10 md:p-16 bg-[#0b0f19] border border-white/10 flex flex-col items-center justify-center text-center group">
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <img 
            src="/about-us.png" 
            alt="About Constructify Simulation Network" 
            className="absolute inset-0 w-full h-full object-cover opacity-30 group-hover:scale-[1.03] transition-transform duration-[10s] ease-out" 
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0b0f19]/40 via-[#0b0f19]/80 to-[#0b0f19]" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0b0f19] via-transparent to-[#0b0f19]" />
        </div>

        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-sky-500/20 border border-sky-500/30 px-4 py-1.5 rounded-full text-[10px] sm:text-xs font-mono text-sky-300 tracking-wider uppercase shadow-inner shadow-sky-500/5 mb-4 animate-float">
            <Building2 className="w-3.5 h-3.5" />
            Constructify Intelligence Network
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white mb-4 leading-tight">
            Automating the <span className="text-gradient">Future of Infrastructure</span>
          </h1>
          <p className="text-sm md:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Constructify merges next-generation structural logic with advanced generative Multi-Agent architecture,
            providing project commanders with live autonomous schedule optimizations and continuous risk mitigation.
          </p>
        </div>
      </div>

      {/* Core Values Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-panel rounded-2xl p-6 border-white/5 group hover:border-sky-500/20 transition-all">
          <div className="w-10 h-10 rounded-xl bg-sky-500/10 flex items-center justify-center text-sky-400 mb-4 group-hover:scale-110 transition-transform">
            <Compass className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-sm text-white mb-1.5">Autonomous Forensics</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Our sub-agents ingest zoning, environmental matrices, and operational constraints, synthesizing 
            dynamic project blueprints without requiring manual drafting operations.
          </p>
        </div>

        <div className="glass-panel rounded-2xl p-6 border-white/5 group hover:border-indigo-500/20 transition-all">
          <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-400 mb-4 group-hover:scale-110 transition-transform">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-sm text-white mb-1.5">Predictive Risk Dampening</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Continuous matrix scanning identifies logistical stalls, budget blowouts, and environmental hazards
            long before ground is ever broken at the physical construction footprint.
          </p>
        </div>

        <div className="glass-panel rounded-2xl p-6 border-white/5 group hover:border-emerald-500/20 transition-all">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 mb-4 group-hover:scale-110 transition-transform">
            <TrendingUp className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-sm text-white mb-1.5">Hyper-Efficient Scaling</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            By automating linear dependencies and background operations, our users execute large-scale 
            commercial footprints with accelerated timelines and robust bottom-line protection.
          </p>
        </div>
      </div>

      {/* The Stack Section */}
      <div className="glass-panel rounded-3xl p-8 md:p-10 border border-white/5 relative overflow-hidden">
        <div className="absolute right-0 top-0 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl -z-10" />
        <div className="absolute left-0 bottom-0 w-72 h-72 bg-sky-500/5 rounded-full blur-3xl -z-10" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="space-y-6">
            <div className="space-y-2">
              <span className="text-[10px] font-bold tracking-widest text-indigo-400 uppercase">Technology Protocol</span>
              <h2 className="text-2xl font-extrabold text-white">The Agentic AI Blueprint</h2>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Constructtify isn&apos;t just database management; it is a living intelligence hub. We utilize the 
              <strong> Google Gemini 1.5 Flash</strong> ecosystem to generate complex JSON relational structures.
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded bg-white/[0.02] border border-white/5 flex items-center justify-center text-[10px] font-bold text-sky-400">1</div>
                <div>
                  <h4 className="text-xs font-bold text-slate-200">Scheduler Sub-Agent</h4>
                  <p className="text-[11px] text-slate-500">Handles task distribution, sequence dependency, and digital assignment vectors.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded bg-white/[0.02] border border-white/5 flex items-center justify-center text-[10px] font-bold text-sky-400">2</div>
                <div>
                  <h4 className="text-xs font-bold text-slate-200">Risk Inspection Sub-Agent</h4>
                  <p className="text-[11px] text-slate-500">Detects weather constraints, supply vulnerabilities, and critical site safety ratings.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded bg-white/[0.02] border border-white/5 flex items-center justify-center text-[10px] font-bold text-sky-400">3</div>
                <div>
                  <h4 className="text-xs font-bold text-slate-200">Systems Operator Node</h4>
                  <p className="text-[11px] text-slate-500">Acts as a back-of-house mitigative commander, automatically logging system decisions.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-black/40 rounded-2xl p-5 border border-white/5 flex flex-col items-center text-center space-y-2">
              <Cpu className="w-6 h-6 text-sky-400 animate-pulse" />
              <span className="text-xs font-bold text-slate-200">Gemini LLM Core</span>
              <p className="text-[10px] text-slate-500">Sub-second parsing and generation cycles.</p>
            </div>
            
            <div className="bg-black/40 rounded-2xl p-5 border border-white/5 flex flex-col items-center text-center space-y-2">
              <Globe className="w-6 h-6 text-indigo-400" />
              <span className="text-xs font-bold text-slate-200">Global Reach</span>
              <p className="text-[10px] text-slate-500">Supports multizonal, high-density footprints.</p>
            </div>

            <div className="bg-black/40 rounded-2xl p-5 border border-white/5 flex flex-col items-center text-center space-y-2">
              <Users className="w-6 h-6 text-teal-400" />
              <span className="text-xs font-bold text-slate-200">Collaborative Ops</span>
              <p className="text-[10px] text-slate-500">Assign specialists and drones instantly.</p>
            </div>

            <div className="bg-black/40 rounded-2xl p-5 border border-white/5 flex flex-col items-center text-center space-y-2">
              <Award className="w-6 h-6 text-amber-400 animate-bounce-slow" />
              <span className="text-xs font-bold text-slate-200">Premium Stack</span>
              <p className="text-[10px] text-slate-500">Next.js 16, Prisma 7, and MySQL core layers.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="text-center space-y-5 border-t border-white/5 pt-10">
        <h3 className="text-lg font-bold text-white">Ready to initialize your next infrastructure cluster?</h3>
        <a 
          href="/planner"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 text-white font-bold text-xs shadow-lg shadow-sky-500/20 hover:opacity-95 transition-all active:scale-95"
        >
          Enter AI Studio Core
        </a>
      </div>
    </div>
  );
}

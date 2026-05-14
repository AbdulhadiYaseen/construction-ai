"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  Cpu, 
  Sparkles, 
  ArrowRight, 
  Send, 
  CheckCircle2, 
  Layers, 
  Loader2 
} from "lucide-react";

export default function AIStudioPage() {
  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");
  const [createdProjectId, setCreatedProjectId] = useState<number | null>(null);
  const [activePreset, setActivePreset] = useState<string | null>(null);

  const presets = [
    {
      title: "Commercial High-Rise",
      desc: "40-story multi-tenant corporate structure with LEED Gold constraint, deep basement foundation, and urban logistical buffer zones.",
    },
    {
      title: "Municipal Infrastructure",
      desc: "Highway interchange expansion layer including pre-cast concrete beam setups, dynamic traffic rerouting phases, and environmental impact mitigation.",
    },
    {
      title: "Residential Development",
      desc: "120-unit sub-division with modular lumber structural framing, centralized automated grid installation, and accelerated delivery paths.",
    },
  ];

  const applyPreset = (title: string, desc: string) => {
    setProjectName(title);
    setProjectDescription(desc);
    setActivePreset(title);
  };

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!projectName || !projectDescription) return;

    setLoading(true);
    setResult("");
    setCreatedProjectId(null);

    try {
      const res = await fetch("/api/planner", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: projectName,
          project: projectDescription,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setResult(data.result);
        if (data.project?.id) {
          setCreatedProjectId(data.project.id);
        }
      } else {
        setResult("Generation error: AI handlers were unable to securely compile operational layers.");
      }
    } catch (err) {
      setResult("Network latency error during multi-agent pipeline negotiation.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 animate-fade-in max-w-5xl mx-auto">
      {/* Structural Top Heading containing single H1 */}
      <div className="text-center max-w-2xl mx-auto pb-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 text-xs font-bold border border-indigo-500/20 uppercase tracking-widest mb-3">
          <Cpu className="w-3.5 h-3.5" /> Multi-Agent Orchestrator
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          AI Blueprint <span className="text-gradient">Studio</span>
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-2 leading-relaxed">
          Inject raw construction parameters, environmental attributes, and timeline targets to autonomously synthesize operational logic paths, risk mitigation, and scheduling layers.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* LEFT COLUMN: Configuration Input Form */}
        <div className="lg:col-span-5 space-y-6">
          <div className="glass-panel rounded-3xl p-6 border-sky-500/10 relative">
            <div className="flex items-center gap-2 mb-4">
              <Layers className="w-4 h-4 text-sky-400" />
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-300">
                Blueprint Input
              </h2>
            </div>

            <form onSubmit={handleGenerate} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1.5">
                  Footprint Designation
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Nexus Logistical Terminal"
                  value={projectName}
                  onChange={(e) => {
                    setProjectName(e.target.value);
                    setActivePreset(null);
                  }}
                  className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-sky-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1.5">
                  Operational Parameters & Scope
                </label>
                <textarea
                  required
                  rows={6}
                  placeholder="Describe building scope, structural layer constraints, specific agent goals, or environmental concerns..."
                  value={projectDescription}
                  onChange={(e) => {
                    setProjectDescription(e.target.value);
                    setActivePreset(null);
                  }}
                  className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-sky-500 transition-colors leading-relaxed"
                />
              </div>

              <button
                type="submit"
                disabled={loading || !projectName || !projectDescription}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 text-white font-bold text-xs shadow-lg shadow-sky-500/20 hover:opacity-95 transition-all disabled:opacity-40"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-sky-200" />
                    Orchestrating Agents...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    Synthesize Execution Layers
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Quick Presets Section */}
          <div className="glass-panel rounded-2xl p-5 space-y-3">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
              Parameter Templates
            </span>
            <div className="space-y-2">
              {presets.map((p) => (
                <button
                  key={p.title}
                  type="button"
                  onClick={() => applyPreset(p.title, p.desc)}
                  className={`w-full text-left p-3 rounded-xl border text-xs transition-all ${
                    activePreset === p.title
                      ? "bg-sky-500/10 border-sky-500/30 text-sky-300"
                      : "bg-white/[0.01] border-white/5 text-slate-400 hover:text-slate-200 hover:bg-white/[0.03]"
                  }`}
                >
                  <strong className="block font-bold text-slate-200 mb-0.5">{p.title}</strong>
                  <span className="line-clamp-2 text-[11px] leading-relaxed opacity-80">{p.desc}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Output Visualization Panel */}
        <div className="lg:col-span-7 flex flex-col">
          <div className="glass-panel rounded-3xl p-6 flex-1 flex flex-col relative overflow-hidden min-h-[450px]">
            {/* Absolute background ambient accent inside output section */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />

            <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-4 relative z-10">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-sky-400" />
                Pipeline Generation Node
              </span>

              {createdProjectId && (
                <Link
                  href={`/projects/${createdProjectId}`}
                  className="flex items-center gap-1 text-xs font-bold text-sky-400 hover:text-sky-300 transition-all bg-sky-500/10 px-3 py-1 rounded-lg border border-sky-500/20 animate-fade-in"
                >
                  Open Footprint Commander
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              )}
            </div>

            {/* Output Display Content */}
            <div className="flex-1 relative z-10 flex flex-col justify-center">
              {loading ? (
                <div className="text-center space-y-4 py-12 animate-fade-in">
                  <div className="relative w-16 h-16 mx-auto">
                    <div className="absolute inset-0 rounded-full border-2 border-sky-500/20 animate-ping" />
                    <div className="absolute inset-2 rounded-full border-2 border-t-sky-400 border-r-indigo-500 animate-spin" />
                    <Cpu className="w-6 h-6 text-sky-400 absolute inset-0 m-auto animate-pulse" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-bold text-xs text-slate-200">Executing Agent Protocol Layers</h3>
                    <p className="text-[11px] text-slate-500">Evaluating multi-tier timelines, allocating contingency tasks...</p>
                  </div>
                </div>
              ) : result ? (
                <div className="space-y-4 animate-fade-in h-full flex flex-col justify-between">
                  {/* Result parsed payload preview box */}
                  <div className="bg-black/40 rounded-2xl p-5 border border-white/5 font-mono text-xs text-slate-300 whitespace-pre-wrap overflow-y-auto max-h-[380px] custom-scrollbar leading-relaxed">
                    {result}
                  </div>

                  <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center gap-2 text-xs text-emerald-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Operations model instantiated successfully inside the primary Prisma node backend.</span>
                  </div>
                </div>
              ) : (
                <div className="text-center max-w-sm mx-auto py-12">
                  <Send className="w-12 h-12 text-slate-700 mx-auto mb-3 animate-float" />
                  <p className="text-xs text-slate-400 font-medium">
                    Awaiting blueprint execution parameters. Fill in the scope to the left and synthesize real-time data matrices.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

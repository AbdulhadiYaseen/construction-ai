"use client";

import { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import Link from "next/link";
import { 
  Cpu, 
  Sparkles, 
  ArrowRight, 
  Send, 
  CheckCircle2, 
  Layers, 
  Loader2,
  Shuffle
} from "lucide-react";

const MASTER_PRESETS = [
  {
    title: "Commercial High-Rise",
    desc: "40-story multi-tenant corporate structure with LEED Gold constraint, deep basement foundation, and urban logistical buffer zones.",
  },
  {
    title: "Municipal Transit Extension",
    desc: "Highway interchange expansion layer including pre-cast concrete beam setups, dynamic traffic rerouting phases, and environmental impact mitigation.",
  },
  {
    title: "Residential Eco-Enclave",
    desc: "120-unit sub-division with modular lumber structural framing, centralized automated grid installation, and accelerated delivery paths.",
  },
  {
    title: "Automated Logistics Hub",
    desc: "500,000 sq ft automated distribution node featuring heavy-duty concrete slab overlays for robotic forklift grids and high-altitude drone gantries.",
  },
  {
    title: "Sub-Oceanic Aqueduct",
    desc: "Freshwater pipeline stretching 12km underwater. Demands specialized diving welded modules, anti-corrosion titanium sheeting, and thermal shields.",
  },
  {
    title: "Aerospace Launchpad Apex",
    desc: "Heavy-lift rocket launch facility requiring extreme density thermal refraction concrete, reinforced blast shielding walls, and high acoustic dampening.",
  },
  {
    title: "Desert Solar Grid Array",
    desc: "3,000-acre solar field installation in arid climate. Includes automatic subterranean trenching, automated crystalline rack setup, and HV sub-station.",
  },
  {
    title: "Bio-Containment Facility",
    desc: "High-security pharmaceutical lab containing Level-4 negative pressure containment chambers, strict HVAC loop systems, and biometric security layers.",
  },
  {
    title: "Hyperloop Transit Conduit",
    desc: "Vacuum-sealed transit tube extending 45km beneath a range. Demands automated boring, constant pressure monitoring, and live seismic sensors.",
  },
  {
    title: "Vertical Farming Arcology",
    desc: "75-story indoor vertical farming complex integrating automated water recycling pumps, nutrient-feed drip networks, and carbon-composite framing.",
  },
  {
    title: "AI Research Lab",
    desc: "State-of-the-art artificial intelligence research facility featuring advanced computing clusters, secure data centers, and collaborative innovation hubs.",
  },
  {
    title: "Quantum Computing Center",
    desc: "Next-generation quantum computing facility with cryogenic cooling systems, shielded data vaults, and ultra-low vibration infrastructure.",
  },
  {
    title: "Space Elevator Anchorage",
    desc: "Massive equatorial construction anchoring a geostationary space elevator. Requires kilometer-deep foundations, self-healing alloys, and atmospheric stability buffers.",
  },
  {
    title: "Asteroid Mining Platform",
    desc: "Orbital construction platform for asteroid mining operations. Requires zero-gravity manufacturing, radiation shielding, and autonomous resource extraction systems.",
  },
  {
    title: "Lunar Base Alpha",
    desc: "Self-sustaining lunar habitat featuring closed-loop life support systems, radiation-shielded modules, and autonomous resource extraction for ISRU operations.",
  },
  {
    title: "Mars Colony Nexus",
    desc: "Self-sustaining Martian settlement with 100+ inhabitants. Includes radiation-shielded habitats, closed-loop life support, underground hydroponic farms, and autonomous rover networks for resource extraction.",
  },
  {
    title: "Venusian Atmospheric Platform",
    desc: "Floating atmospheric city in Venus's upper atmosphere. Requires aerostatic pressure vessels, heat-resistant materials, closed-loop life support, and autonomous cloud-harvesting systems.",
  }
];

export default function AIStudioPage() {
  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");
  const [createdProjectId, setCreatedProjectId] = useState<number | null>(null);
  const [activePreset, setActivePreset] = useState<string | null>(null);
  const [displayedPresets, setDisplayedPresets] = useState<typeof MASTER_PRESETS>([]);
  const [isShuffling, setIsShuffling] = useState(false);

  // Dynamically fetch random unique presets on initial load
  useEffect(() => {
    shufflePresets();
  }, []);

  const shufflePresets = () => {
    setIsShuffling(true);
    
    // Select 3 unique random entries from master array
    const shuffled = [...MASTER_PRESETS].sort(() => 0.5 - Math.random());
    setDisplayedPresets(shuffled.slice(0, 3));

    setTimeout(() => {
      setIsShuffling(false);
    }, 500);
  };

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
      {/* Immersive Banner with AI-agent-studio.png */}
      <div className="relative overflow-hidden rounded-3xl p-8 md:p-10 bg-[#0b0f19] border border-white/10 flex flex-col items-center justify-center text-center group">
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <img 
            src="/AI-agent-studio.png" 
            alt="AI Studio Generator Simulation" 
            className="absolute inset-0 w-full h-full object-cover opacity-25 group-hover:scale-[1.02] transition-transform duration-[8s] ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0b0f19]/50 via-[#0b0f19]/80 to-[#0b0f19]" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0b0f19] via-transparent to-[#0b0f19]" />
        </div>

        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-400 text-[10px] font-bold border border-indigo-500/30 uppercase tracking-widest mb-3">
            <Cpu className="w-3.5 h-3.5 animate-pulse" /> Multi-Agent Orchestrator
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-3">
            AI Blueprint <span className="text-gradient">Studio</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Inject construction parameters to autonomously synthesize operational logic, risk matrices, and scheduled execution layers leveraging live Google Gemini models.
          </p>
        </div>
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

          {/* Dynamic Random Presets Section */}
          <div className="glass-panel rounded-2xl p-5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                Parameter Templates
              </span>
              <button
                onClick={shufflePresets}
                disabled={isShuffling}
                className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-sky-400 hover:text-sky-300 transition-colors disabled:opacity-50"
              >
                <Shuffle className={`w-3 h-3 ${isShuffling ? "animate-spin" : ""}`} />
                Randomize Ideas
              </button>
            </div>
            
            <div className={`space-y-2 transition-all duration-300 ${isShuffling ? "opacity-40 scale-[0.98] blur-[1px]" : "opacity-100 scale-100"}`}>
              {displayedPresets.map((p) => (
                <button
                  key={p.title}
                  type="button"
                  onClick={() => applyPreset(p.title, p.desc)}
                  className={`w-full text-left p-3 rounded-xl border text-xs transition-all duration-200 ${
                    activePreset === p.title
                      ? "bg-sky-500/10 border-sky-500/30 text-sky-300 shadow-[inset_0_0_12px_rgba(56,189,248,0.05)]"
                      : "bg-white/[0.01] border-white/5 text-slate-400 hover:text-slate-200 hover:bg-white/[0.03]"
                  }`}
                >
                  <strong className="block font-bold text-slate-200 mb-0.5 flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-indigo-400 shrink-0 opacity-70" />
                    {p.title}
                  </strong>
                  <span className="line-clamp-2 text-[11px] leading-relaxed opacity-80 pl-4">{p.desc}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Output Panel */}
        <div className="lg:col-span-7 flex flex-col">
          <div className="glass-panel rounded-3xl p-6 flex-1 flex flex-col relative overflow-hidden min-h-[450px]">
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
                  <div className="bg-black/40 rounded-2xl p-5 border border-white/5 text-slate-300 overflow-y-auto max-h-[380px] custom-scrollbar">
                    <ReactMarkdown
                      components={{
                        h1: ({ node, ...props }) => (
                          <h1 className="text-lg font-extrabold text-white mt-6 mb-3 tracking-tight border-b border-white/5 pb-1 first:mt-0" {...props} />
                        ),
                        h2: ({ node, ...props }) => (
                          <h2 className="text-base font-bold text-white mt-5 mb-2.5 tracking-tight first:mt-0" {...props} />
                        ),
                        h3: ({ node, ...props }) => (
                          <h3 className="text-sm font-bold text-sky-400 mt-4 mb-2 flex items-center gap-1 first:mt-0" {...props} />
                        ),
                        h4: ({ node, ...props }) => (
                          <h4 className="text-[11px] font-bold text-slate-200 mt-3 mb-1.5 uppercase tracking-wider first:mt-0" {...props} />
                        ),
                        p: ({ node, ...props }) => (
                          <p className="text-xs text-slate-300 leading-relaxed mb-3 last:mb-0" {...props} />
                        ),
                        ul: ({ node, ...props }) => (
                          <ul className="list-disc pl-4 text-xs text-slate-300 space-y-1.5 mb-4" {...props} />
                        ),
                        ol: ({ node, ...props }) => (
                          <ol className="list-decimal pl-4 text-xs text-slate-300 space-y-1.5 mb-4" {...props} />
                        ),
                        li: ({ node, ...props }) => (
                          <li className="text-xs text-slate-300 pl-1 marker:text-slate-500" {...props} />
                        ),
                        hr: ({ node, ...props }) => (
                          <hr className="my-4 border-white/5" {...props} />
                        ),
                        strong: ({ node, ...props }) => (
                          <strong className="font-bold text-white shadow-sm" {...props} />
                        ),
                        blockquote: ({ node, ...props }) => (
                          <blockquote
                            className="border-l-2 border-sky-500/40 pl-3 my-3 italic text-[11px] text-slate-400 bg-sky-500/5 py-1.5 rounded-r-lg leading-relaxed"
                            {...props}
                          />
                        ),
                        code: ({ node, ...props }) => (
                          <code className="bg-white/[0.04] border border-white/5 rounded px-1 py-0.5 text-[10px] font-mono text-sky-300" {...props} />
                        )
                      }}
                    >
                      {result}
                    </ReactMarkdown>
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

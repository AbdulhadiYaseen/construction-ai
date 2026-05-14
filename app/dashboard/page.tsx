"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { 
  FolderKanban, 
  CheckCircle2, 
  AlertTriangle, 
  Plus, 
  Sparkles, 
  ArrowRight,
  TrendingUp,
  Layers
} from "lucide-react";
import ProjectCard from "@/components/ProjectCard";

interface Project {
  id: number;
  name: string;
  description: string;
  status: string;
  createdAt: string;
  _count?: {
    tasks: number;
    risks: number;
    decisions: number;
  };
}

export default function Dashboard() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  // Quick setup manual modal/form states
  const [showModal, setShowModal] = useState(false);
  const [newProjectName, setNewProjectName] = useState("");
  const [newProjectDesc, setNewProjectDesc] = useState("");
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await fetch("/api/projects");
      const data = await res.json();
      if (data.success) {
        setProjects(data.projects);
      }
    } catch (err) {
      console.error("Failed to fetch project summaries", err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProjectName) return;

    setCreating(true);
    try {
      const res = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newProjectName, description: newProjectDesc }),
      });
      const data = await res.json();
      if (data.success) {
        setProjects([data.project, ...projects]);
        setNewProjectName("");
        setNewProjectDesc("");
        setShowModal(false);
      }
    } catch (err) {
      console.error("Creation error", err);
    } finally {
      setCreating(false);
    }
  };

  // Compute metrics
  const totalProjects = projects.length;
  const activeProjects = projects.filter((p) => p.status.toLowerCase() !== "completed").length;
  const totalTasks = projects.reduce((acc, p) => acc + (p._count?.tasks || 0), 0);
  const totalRisks = projects.reduce((acc, p) => acc + (p._count?.risks || 0), 0);

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Top Banner / Welcome Callout */}
      <div className="relative overflow-hidden rounded-3xl p-8 bg-gradient-to-r from-sky-900/40 via-indigo-900/20 to-[#0b0f19] border border-sky-500/20">
        <div className="absolute top-0 right-0 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 max-w-2xl">
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-sky-500/10 text-sky-400 border border-sky-500/20 uppercase tracking-widest inline-block mb-3">
            System Operations Active
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-3">
            Autonomous Fleet <span className="text-gradient">Commander</span>
          </h1>
          <p className="text-sm text-slate-300 leading-relaxed mb-6">
            Welcome back to the unified multi-agent construction operations console. Real-time plan validation, scheduled risk matrices, and decision-tree tracking are operating optimally.
          </p>

          <div className="flex flex-wrap gap-4">
            <Link
              href="/planner"
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 text-white font-bold text-xs shadow-lg shadow-sky-500/25 hover:opacity-95 transition-all hover:scale-[1.02]"
            >
              <Sparkles className="w-4 h-4" />
              Launch AI Studio
            </Link>

            <button
              onClick={() => setShowModal(true)}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white font-bold text-xs hover:bg-white/[0.08] transition-all"
            >
              <Plus className="w-4 h-4 text-sky-400" />
              Manual Blueprint
            </button>
          </div>
        </div>
      </div>

      {/* Dynamic Key Performance Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Stat 1 */}
        <div className="glass-panel rounded-2xl p-5 relative overflow-hidden">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Total Operations</span>
            <div className="p-2 rounded-xl bg-sky-500/10 text-sky-400 border border-sky-500/20">
              <FolderKanban className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-white">{totalProjects}</span>
            <span className="text-[10px] text-emerald-400 font-bold flex items-center gap-0.5">
              <TrendingUp className="w-3 h-3" /> active
            </span>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-sky-500/40 to-transparent" />
        </div>

        {/* Stat 2 */}
        <div className="glass-panel rounded-2xl p-5 relative overflow-hidden">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Active Status</span>
            <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              <Layers className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-white">{activeProjects}</span>
            <span className="text-[10px] text-slate-500">footprints</span>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-indigo-500/40 to-transparent" />
        </div>

        {/* Stat 3 */}
        <div className="glass-panel rounded-2xl p-5 relative overflow-hidden">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Scheduled Tasks</span>
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-white">{totalTasks}</span>
            <span className="text-[10px] text-slate-500">registered</span>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-emerald-500/40 to-transparent" />
        </div>

        {/* Stat 4 */}
        <div className="glass-panel rounded-2xl p-5 relative overflow-hidden">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Flagged Risks</span>
            <div className="p-2 rounded-xl bg-rose-500/10 text-rose-400 border border-rose-500/20">
              <AlertTriangle className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-white">{totalRisks}</span>
            <span className="text-[10px] text-rose-400 font-bold">requires attention</span>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-rose-500/40 to-transparent" />
        </div>
      </div>

      {/* Main Grid: Projects Overview */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-white tracking-tight">Active Footprints</h2>
            <p className="text-xs text-slate-400">Current operational infrastructure managed by custom AI handlers</p>
          </div>

          <Link
            href="/projects"
            className="flex items-center gap-1 text-xs font-semibold text-sky-400 hover:text-sky-300 transition-all"
          >
            View Directory
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="glass-panel rounded-2xl h-48 animate-pulse bg-white/[0.01]" />
            ))}
          </div>
        ) : projects.length === 0 ? (
          <div className="glass-panel rounded-2xl p-12 text-center max-w-lg mx-auto">
            <FolderKanban className="w-12 h-12 text-slate-600 mx-auto mb-4 animate-float" />
            <h3 className="font-bold text-base text-slate-300 mb-1">No Construction Projects Initialized</h3>
            <p className="text-xs text-slate-500 mb-6 leading-relaxed">
              Start by launching the multi-agent AI Studio to generate complex operational layers autonomously, or configure a basic footprint manually.
            </p>
            <Link
              href="/planner"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-sky-500/10 text-sky-400 font-bold text-xs border border-sky-500/20 hover:bg-sky-500/20 transition-all"
            >
              <Sparkles className="w-3.5 h-3.5" />
              Open AI Studio
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.slice(0, 6).map((proj) => (
              <ProjectCard key={proj.id} project={proj} />
            ))}
          </div>
        )}
      </div>

      {/* Manual Project Creation Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="glass-panel rounded-3xl max-w-md w-full p-6 border border-white/10 shadow-2xl relative">
            <h3 className="text-lg font-bold text-white mb-2">Configure Manual Footprint</h3>
            <p className="text-xs text-slate-400 mb-6">Initialize a base structural layer for agents to augment subsequently.</p>

            <form onSubmit={handleCreateProject} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Project Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Hyperion High-Rise Complex"
                  value={newProjectName}
                  onChange={(e) => setNewProjectName(e.target.value)}
                  className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-sky-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Structural Overview</label>
                <textarea
                  rows={4}
                  placeholder="Briefly describe operational scale, timeline constraint, or zoning attributes..."
                  value={newProjectDesc}
                  onChange={(e) => setNewProjectDesc(e.target.value)}
                  className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-sky-500"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded-xl bg-white/[0.04] text-xs font-semibold text-slate-400 hover:text-white transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={creating}
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 text-xs font-bold text-white shadow-lg shadow-sky-500/20 hover:opacity-90 transition-all disabled:opacity-50"
                >
                  {creating ? "Instantiating..." : "Create Layer"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

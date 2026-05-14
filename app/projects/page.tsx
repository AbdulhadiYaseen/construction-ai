"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { 
  FolderKanban, 
  Search, 
  Plus, 
  Sparkles,
  Layers,
  Filter
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

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");

  // Manual modal states
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
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
      console.error("Failed to load operations directory", err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) return;

    setCreating(true);
    try {
      const res = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, description }),
      });
      const data = await res.json();
      if (data.success) {
        setProjects([data.project, ...projects]);
        setName("");
        setDescription("");
        setShowModal(false);
      }
    } catch (err) {
      console.error("Creation exception", err);
    } finally {
      setCreating(false);
    }
  };

  // Filtered list
  const filteredProjects = projects.filter((proj) => {
    const matchesSearch = proj.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          proj.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "ALL" || proj.status.toUpperCase() === statusFilter.toUpperCase();
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Page Header with Single H1 */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/5">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">
            Operations Directory
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Complete inventory of active, pending, and complete construction sites
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/planner"
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-sky-500/10 text-sky-400 font-bold text-xs border border-sky-500/20 hover:bg-sky-500/20 transition-all shadow-sm"
          >
            <Sparkles className="w-3.5 h-3.5" />
            AI Generator
          </Link>

          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 text-white font-bold text-xs shadow-md shadow-sky-500/20 hover:opacity-95 transition-all"
          >
            <Plus className="w-3.5 h-3.5" />
            Add Footprint
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="glass-panel rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Search */}
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input
            type="text"
            placeholder="Search footprints by tag, zoning..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-black/40 border border-white/5 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-sky-500/50"
          />
        </div>

        {/* Status filters */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
          <Filter className="w-3.5 h-3.5 text-slate-500 hidden md:block mr-1" />
          {["ALL", "PLANNING", "ACTIVE", "COMPLETED"].map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                statusFilter === status
                  ? "bg-sky-500 text-white shadow-sm shadow-sky-500/30"
                  : "bg-white/[0.02] text-slate-400 hover:text-slate-200 border border-white/5"
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Main Container Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="glass-panel rounded-2xl h-48 animate-pulse bg-white/[0.01]" />
          ))}
        </div>
      ) : filteredProjects.length === 0 ? (
        <div className="glass-panel rounded-2xl p-16 text-center max-w-md mx-auto mt-8">
          <Layers className="w-12 h-12 text-slate-600 mx-auto mb-3 animate-float" />
          <h3 className="font-bold text-sm text-slate-300">No Operations Matched</h3>
          <p className="text-xs text-slate-500 mt-1">
            Try adjusting your search query parameters or status filters.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
          {filteredProjects.map((proj) => (
            <ProjectCard key={proj.id} project={proj} />
          ))}
        </div>
      )}

      {/* Creation Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="glass-panel rounded-3xl max-w-md w-full p-6 border border-white/10 shadow-2xl relative">
            <h3 className="text-lg font-bold text-white mb-2">Configure Manual Footprint</h3>
            <p className="text-xs text-slate-400 mb-6">Initialize a base structural layer for agents to augment subsequently.</p>

            <form onSubmit={handleCreate} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Project Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Hyperion High-Rise Complex"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-sky-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Structural Overview</label>
                <textarea
                  rows={4}
                  placeholder="Briefly describe operational scale, timeline constraint, or zoning attributes..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
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

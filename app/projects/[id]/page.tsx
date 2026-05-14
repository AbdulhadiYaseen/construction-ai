"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import { 
  ArrowLeft, 
  Calendar, 
  CheckCircle2, 
  AlertTriangle, 
  Layers, 
  Sparkles, 
  Clock, 
  ShieldAlert, 
  Brain,
  Plus
} from "lucide-react";
import StatusBadge from "@/components/StatusBadge";

interface Task {
  id: number;
  title: string;
  status: string;
  assignedTo?: string | null;
  deadline?: string | null;
}

interface Risk {
  id: number;
  riskType: string;
  severity: string;
}

interface Decision {
  id: number;
  action: string;
  reason: string;
}

interface ProjectDetail {
  id: number;
  name: string;
  description: string;
  status: string;
  createdAt: string;
  tasks: Task[];
  risks: Risk[];
  decisions: Decision[];
}

function ProjectCommanderPageContent() {
  const params = useParams();
  const id = params?.id;

  const searchParams = useSearchParams();
  const tabParam = searchParams?.get("tab");

  const [project, setProject] = useState<ProjectDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState<"tasks" | "risks" | "decisions">("tasks");

  // Handle deep-linking from global search if specific tab is targeted
  useEffect(() => {
    if (tabParam === "tasks" || tabParam === "risks" || tabParam === "decisions") {
      setActiveTab(tabParam);
    }
  }, [tabParam]);

  // Agent feedback mocks
  const [agentTriggering, setAgentTriggering] = useState<string | null>(null);
  const [agentFeedback, setAgentFeedback] = useState("");

  // Timed state transition for completed tasks
  const [recentlyCompletedTaskIds, setRecentlyCompletedTaskIds] = useState<number[]>([]);

  useEffect(() => {
    if (id) {
      fetchProjectDetail();
    }
  }, [id]);

  const fetchProjectDetail = async () => {
    try {
      const res = await fetch(`/api/projects/${id}`);
      const data = await res.json();
      if (data.success) {
        setProject(data.project);
      } else {
        setError(data.error || "Footprint record not found");
      }
    } catch (err) {
      setError("Network error fetching footprint state");
    } finally {
      setLoading(false);
    }
  };

  const triggerAgentIntervention = async (agentName: string) => {
    setAgentTriggering(agentName);
    const type = agentName === "Scheduler Protocol" ? "tasks" : "risks";
    
    setAgentFeedback(`[Agentic Protocol Initiated]: Running live ${agentName} matrix analyzer...`);

    try {
      const res = await fetch(`/api/projects/${id}/optimize`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type }),
      });

      if (res.ok) {
        setTimeout(async () => {
          await fetchProjectDetail();
          setAgentFeedback(
            `[Agentic Protocol Success]: ${agentName} has injected live parameters. View grid populated successfully!`
          );
          setAgentTriggering(null);
          
          // Automatically switch active tab to matching generated item
          setActiveTab(type === "tasks" ? "tasks" : "risks");
        }, 1500);
      } else {
        setAgentFeedback(`[Agentic Error]: Optimization pipeline failed to commit entries.`);
        setAgentTriggering(null);
      }
    } catch (err) {
      setAgentFeedback(`[Network Error]: Unable to reach Agent Controller node.`);
      setAgentTriggering(null);
    }
  };

  const toggleTaskStatus = async (taskId: number, currentStatus: string) => {
    // Cycle status: Active -> Completed, Completed -> Pending
    const nextStatus = currentStatus === "Completed" ? "Pending" : "Completed";

    // Optimistic state update for instant user feedback
    if (project) {
      const revised = project.tasks.map((t) =>
        t.id === taskId ? { ...t, status: nextStatus } : t
      );
      setProject({ ...project, tasks: revised });
    }

    // If marking as completed, add 3-second buffer before visually migrating to completed archive
    if (nextStatus === "Completed") {
      setRecentlyCompletedTaskIds((prev) => [...prev, taskId]);
      setTimeout(() => {
        setRecentlyCompletedTaskIds((prev) => prev.filter((id) => id !== taskId));
      }, 3000);
    } else {
      // If unchecking, immediately pull out of completed category and put in active
      setRecentlyCompletedTaskIds((prev) => prev.filter((id) => id !== taskId));
    }

    try {
      const res = await fetch(`/api/tasks/${taskId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: nextStatus }),
      });

      if (!res.ok) {
        // Sync state from server upon error
        fetchProjectDetail();
      }
    } catch (error) {
      console.error("Relational task commit failed:", error);
      fetchProjectDetail();
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="h-12 w-48 bg-white/[0.02] rounded-xl animate-pulse" />
        <div className="glass-panel rounded-3xl h-64 animate-pulse bg-white/[0.01]" />
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="glass-panel rounded-3xl p-12 text-center max-w-lg mx-auto mt-12">
        <ShieldAlert className="w-12 h-12 text-rose-500 mx-auto mb-4 animate-pulse" />
        <h1 className="text-base font-bold text-white mb-2">Commander Initialization Error</h1>
        <p className="text-xs text-slate-400 mb-6">{error || "Requested entity segment unavailable"}</p>
        <Link
          href="/projects"
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/[0.04] text-xs font-semibold text-slate-300 hover:text-white transition-all"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to Directory
        </Link>
      </div>
    );
  }

  const activeTasks = project.tasks.filter(
    (t) => t.status !== "Completed" || recentlyCompletedTaskIds.includes(t.id)
  );
  
  const completedTasks = project.tasks.filter(
    (t) => t.status === "Completed" && !recentlyCompletedTaskIds.includes(t.id)
  );

  const formattedDate = new Date(project.createdAt).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Top Breadcrumb & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          Directory Inventory
        </Link>

        <div className="flex items-center gap-2">
          <span className="text-[11px] text-slate-500 font-medium">Footprint Hash:</span>
          <code className="bg-white/[0.03] px-2 py-0.5 rounded text-[11px] text-sky-400 font-mono">
            BLD-OP-{project.id}
          </code>
        </div>
      </div>

      {/* Main Structural Banner containing single H1 */}
      <div className="glass-panel rounded-3xl p-8 relative overflow-hidden border-sky-500/10">
        <div className="absolute right-0 top-0 w-96 h-96 bg-gradient-to-bl from-sky-500/10 via-indigo-500/5 to-transparent rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="max-w-xl">
            <div className="flex items-center gap-3 mb-3">
              <StatusBadge status={project.status} />
              <span className="flex items-center gap-1 text-xs text-slate-500">
                <Calendar className="w-3.5 h-3.5" />
                Instantiated {formattedDate}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-2">
              {project.name}
            </h1>
            <p className="text-xs text-slate-300 leading-relaxed">
              {project.description || "No structural summary records bound to this ID footprint."}
            </p>
          </div>

          {/* Quick AI Trigger Pod */}
          <div className="flex flex-col gap-2 shrink-0 bg-black/40 p-4 rounded-2xl border border-white/5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block text-center">
              Agent Pipelines
            </span>
            <div className="flex flex-wrap md:flex-col gap-2">
              <button
                onClick={() => triggerAgentIntervention("Risk Matrix Agent")}
                disabled={!!agentTriggering}
                className="flex items-center gap-2 px-3 py-2 rounded-xl bg-rose-500/10 text-rose-300 hover:bg-rose-500/20 transition-all border border-rose-500/20 text-xs font-semibold disabled:opacity-50"
              >
                <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
                Analyze Risks
              </button>

              <button
                onClick={() => triggerAgentIntervention("Scheduler Protocol")}
                disabled={!!agentTriggering}
                className="flex items-center gap-2 px-3 py-2 rounded-xl bg-emerald-500/10 text-emerald-300 hover:bg-emerald-500/20 transition-all border border-emerald-500/20 text-xs font-semibold disabled:opacity-50"
              >
                <Clock className="w-3.5 h-3.5 text-emerald-400" />
                Optimize Schedule
              </button>
            </div>
          </div>
        </div>

        {/* Realtime Feedback Ticker */}
        {agentFeedback && (
          <div className="mt-6 pt-3 border-t border-white/5 flex items-center gap-2 text-xs font-mono text-sky-300 animate-fade-in bg-sky-500/5 px-3 py-2 rounded-xl">
            <Sparkles className="w-3.5 h-3.5 text-sky-400 shrink-0 animate-spin" />
            <span className="line-clamp-1">{agentFeedback}</span>
          </div>
        )}
      </div>

      {/* Interactive Tabs Layout */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 border-b border-white/5 pb-3 overflow-x-auto">
          <button
            onClick={() => setActiveTab("tasks")}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 ${
              activeTab === "tasks"
                ? "bg-white/[0.06] text-white border border-white/10 shadow-sm"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            Operational Tasks ({project.tasks.length})
          </button>

          <button
            onClick={() => setActiveTab("risks")}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 ${
              activeTab === "risks"
                ? "bg-white/[0.06] text-white border border-white/10 shadow-sm"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
            Risk Factors ({project.risks.length})
          </button>

          <button
            onClick={() => setActiveTab("decisions")}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 ${
              activeTab === "decisions"
                ? "bg-white/[0.06] text-white border border-white/10 shadow-sm"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <Brain className="w-3.5 h-3.5 text-indigo-400" />
            Autonomous Logs ({project.decisions.length})
          </button>
        </div>

        {/* Tab Panels */}
        <div className="pt-2">
          {/* TASKS VIEW */}
          {activeTab === "tasks" && (
            <div className="space-y-8 animate-fade-in">
              {/* 1. ACTIVE TASKS SEGMENT */}
              <div className="space-y-3">
                <div className="flex items-center justify-between border-b border-white/5 pb-2 mb-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Active Checklist
                  </span>
                  <span className="text-[10px] font-mono text-slate-500 bg-white/[0.02] px-2 py-0.5 rounded border border-white/5">
                    {activeTasks.length} remaining
                  </span>
                </div>

                {activeTasks.length === 0 ? (
                  <div className="glass-panel rounded-2xl p-10 text-center max-w-sm mx-auto border-white/5">
                    <CheckCircle2 className="w-8 h-8 text-slate-600 mx-auto mb-2 animate-float" />
                    <p className="text-xs text-slate-400 font-medium">
                      All operational tasks completed or empty.
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {activeTasks.map((task) => {
                      const isDone = task.status === "Completed";
                      const isTransitioning = recentlyCompletedTaskIds.includes(task.id);

                      return (
                        <div
                          key={task.id}
                          className={`glass-panel rounded-xl p-4 flex items-start justify-between gap-3 transition-all duration-300 relative overflow-hidden group ${
                            isDone
                              ? "border-emerald-500/20 bg-emerald-500/[0.02]"
                              : "hover:border-white/10"
                          }`}
                        >
                          {/* 3-Second Loading Transition Bar */}
                          {isTransitioning && (
                            <div
                              className="absolute top-0 left-0 h-0.5 bg-gradient-to-r from-emerald-500 to-teal-400 z-20"
                              style={{
                                animation: "shrink3s 3s linear forwards",
                                width: "100%",
                              }}
                            />
                          )}

                          <div className="flex gap-3 items-start z-10">
                            <button
                              onClick={() => toggleTaskStatus(task.id, task.status)}
                              className="mt-0.5 flex-shrink-0 focus:outline-none select-none relative cursor-pointer group/chk"
                              title={isDone ? "Mark incomplete" : "Mark completed"}
                            >
                              {isDone ? (
                                <CheckCircle2 className="w-[18px] h-[18px] text-emerald-400 bg-emerald-500/10 rounded-full shadow-inner transform active:scale-90 transition-transform" />
                              ) : (
                                <div className="w-[18px] h-[18px] rounded-full border border-slate-600 group-hover/chk:border-sky-400 transform active:scale-90 transition-all bg-white/[0.02]" />
                              )}
                            </button>

                            <div>
                              <div className="flex items-center gap-2 flex-wrap">
                                <h4
                                  className={`font-bold text-xs text-white transition-all ${
                                    isDone ? "line-through text-slate-500 font-medium" : ""
                                  }`}
                                >
                                  {task.title}
                                </h4>
                                {isTransitioning && (
                                  <span className="inline-flex items-center gap-1 text-[9px] font-bold font-mono text-emerald-400 animate-pulse bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20 scale-90">
                                    Archiving in 3s...
                                  </span>
                                )}
                              </div>

                              <div className="flex flex-wrap items-center gap-3 text-[11px] text-slate-400 mt-1.5">
                                {task.assignedTo && (
                                  <span className="bg-white/[0.02] px-2 py-0.5 rounded border border-white/5">
                                    👤 {task.assignedTo}
                                  </span>
                                )}
                                {task.deadline && (
                                  <span className="text-slate-500">
                                    📅 Deadline: <strong className="text-slate-300">{task.deadline}</strong>
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>

                          <button
                            onClick={() => toggleTaskStatus(task.id, task.status)}
                            className="focus:outline-none transform hover:scale-105 active:scale-95 transition-transform z-10"
                            title="Toggle operational state"
                          >
                            <StatusBadge status={task.status} type="task" />
                          </button>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* 2. COMPLETED TASKS ARCHIVE */}
              {completedTasks.length > 0 && (
                <div className="space-y-3 pt-6 border-t border-white/5 animate-fade-in">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                      Completed Archive
                    </span>
                    <span className="text-[10px] font-mono text-slate-600 bg-white/[0.01] px-2 py-0.5 rounded">
                      {completedTasks.length} finished
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {completedTasks.map((task) => (
                      <div
                        key={task.id}
                        className="glass-panel rounded-xl p-4 flex items-start justify-between gap-3 border-emerald-500/10 bg-emerald-950/[0.03] opacity-50 hover:opacity-80 transition-all duration-300 group"
                      >
                        <div className="flex gap-3 items-start">
                          <button
                            onClick={() => toggleTaskStatus(task.id, task.status)}
                            className="mt-0.5 flex-shrink-0 focus:outline-none select-none relative cursor-pointer group/chk"
                            title="Reopen operational task"
                          >
                            <CheckCircle2 className="w-[18px] h-[18px] text-emerald-500/40 bg-emerald-500/[0.02] rounded-full transform active:scale-90 transition-transform" />
                          </button>

                          <div>
                            <h4 className="font-medium text-xs text-slate-500 line-through">
                              {task.title}
                            </h4>
                            <div className="flex flex-wrap items-center gap-2 text-[10px] text-slate-600 mt-1">
                              {task.assignedTo && <span>👤 {task.assignedTo}</span>}
                              <span>• Completed</span>
                            </div>
                          </div>
                        </div>

                        <button
                          onClick={() => toggleTaskStatus(task.id, task.status)}
                          className="focus:outline-none shrink-0"
                          title="Click to reopen"
                        >
                          <span className="px-2 py-0.5 rounded bg-emerald-500/5 text-[9px] font-bold font-mono text-emerald-500/50 border border-emerald-500/10 uppercase scale-90 origin-right block shadow-sm">
                            ARCHIVED
                          </span>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* RISKS VIEW */}
          {activeTab === "risks" && (
            <div className="space-y-3 animate-fade-in">
              {project.risks.length === 0 ? (
                <div className="glass-panel rounded-2xl p-12 text-center max-w-sm mx-auto">
                  <ShieldAlert className="w-10 h-10 text-emerald-500/40 mx-auto mb-2 animate-float" />
                  <p className="text-xs text-emerald-400 font-medium">Zero high-risk parameters captured</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {project.risks.map((risk) => (
                    <div key={risk.id} className="glass-panel rounded-xl p-4 border-l-4 border-l-rose-500 flex items-center justify-between gap-3">
                      <div>
                        <span className="text-[10px] font-bold text-rose-400 uppercase tracking-widest block mb-0.5">
                          {risk.severity} Severity
                        </span>
                        <h4 className="font-bold text-xs text-white">{risk.riskType}</h4>
                      </div>
                      <span className="px-2 py-1 rounded bg-rose-500/10 text-[10px] font-mono text-rose-300 border border-rose-500/20">
                        FLAGGED
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* DECISIONS VIEW */}
          {activeTab === "decisions" && (
            <div className="space-y-3 animate-fade-in">
              {project.decisions.length === 0 ? (
                <div className="glass-panel rounded-2xl p-12 text-center max-w-sm mx-auto">
                  <Brain className="w-10 h-10 text-slate-600 mx-auto mb-2 animate-float" />
                  <p className="text-xs text-slate-400 font-medium">Autonomous tracking log is sparse</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {project.decisions.map((dec) => (
                    <div key={dec.id} className="glass-panel rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="space-y-1">
                        <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                          {dec.action}
                        </span>
                        <p className="text-xs text-slate-300 italic">
                          &ldquo;{dec.reason}&rdquo;
                        </p>
                      </div>
                      <span className="text-[10px] text-slate-500 font-mono shrink-0">
                        AUTONOMOUS EXECUTION
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ProjectCommanderPage() {
  return (
    <Suspense
      fallback={
        <div className="space-y-6">
          <div className="h-12 w-48 bg-white/[0.02] rounded-xl animate-pulse" />
          <div className="glass-panel rounded-3xl h-64 animate-pulse bg-white/[0.01]" />
        </div>
      }
    >
      <ProjectCommanderPageContent />
    </Suspense>
  );
}

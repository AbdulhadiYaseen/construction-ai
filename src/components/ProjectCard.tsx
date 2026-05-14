import { useState } from "react";
import Link from "next/link";
import { Calendar, CheckCircle2, AlertTriangle, ArrowRight, Trash2, Loader2 } from "lucide-react";
import StatusBadge from "./StatusBadge";

interface ProjectCardProps {
  project: {
    id: number;
    name: string;
    description: string;
    status: string;
    createdAt: string | Date;
    _count?: {
      tasks: number;
      risks: number;
      decisions: number;
    };
  };
  onDelete?: (id: number) => void;
}

export default function ProjectCard({ project, onDelete }: ProjectCardProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  const formattedDate = new Date(project.createdAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const tasksCount = project._count?.tasks || 0;
  const risksCount = project._count?.risks || 0;

  const handleDelete = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const confirmed = window.confirm(
      `Are you sure you want to purge "${project.name}"?\nThis will permanently delete all linked tasks, risks, and decision logs.`
    );
    if (!confirmed) return;

    setIsDeleting(true);
    try {
      const res = await fetch(`/api/projects/${project.id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) {
        if (onDelete) {
          onDelete(project.id);
        }
      } else {
        alert(data.error || "Failed to delete project");
      }
    } catch (error) {
      console.error("Deletion failure:", error);
      alert("Network error encountered during deletion.");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="glass-panel glass-panel-hover rounded-2xl p-6 flex flex-col justify-between group relative overflow-hidden">
      {/* Absolute decorative ambient glow blob inside card */}
      <div className="absolute -right-10 -top-10 w-32 h-32 bg-sky-500/5 rounded-full blur-2xl group-hover:bg-sky-500/10 transition-colors" />

      {isDeleting && (
        <div className="absolute inset-0 bg-black/60 backdrop-blur-[1px] flex items-center justify-center z-30 rounded-2xl animate-fade-in">
          <div className="flex flex-col items-center gap-2 text-xs font-mono text-rose-400">
            <Loader2 className="w-5 h-5 animate-spin" />
            <span>Purging...</span>
          </div>
        </div>
      )}

      <div>
        {/* Header */}
        <div className="flex items-start justify-between gap-3 mb-3 relative z-10">
          <StatusBadge status={project.status} />
          
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1 text-[11px] text-slate-500 font-medium">
              <Calendar className="w-3 h-3 text-slate-600" />
              {formattedDate}
            </span>
            
            <button
              onClick={handleDelete}
              disabled={isDeleting}
              className="p-1.5 rounded-lg bg-white/[0.01] border border-white/5 text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 hover:border-rose-500/20 transition-all opacity-40 group-hover:opacity-100 active:scale-90"
              title="Delete operation"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Title & Desc */}
        <h3 className="font-bold text-base text-white group-hover:text-sky-400 transition-colors line-clamp-1 mb-1.5">
          {project.name}
        </h3>
        <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed mb-6">
          {project.description || "No operational summary available for this footprint."}
        </p>
      </div>

      {/* Footer Metrics & Link */}
      <div className="pt-4 border-t border-white/5 flex items-center justify-between mt-auto relative z-10">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 text-xs text-slate-400" title="Registered Tasks">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
            <span className="font-semibold text-slate-200">{tasksCount}</span>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-slate-400" title="Registered Risks">
            <AlertTriangle className={`w-3.5 h-3.5 ${risksCount > 0 ? "text-rose-500" : "text-slate-600"}`} />
            <span className="font-semibold text-slate-200">{risksCount}</span>
          </div>
        </div>

        <Link
          href={`/projects/${project.id}`}
          className="flex items-center gap-1 text-xs font-bold text-sky-400 hover:text-sky-300 transition-all group-hover:translate-x-1"
        >
          Commander
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}

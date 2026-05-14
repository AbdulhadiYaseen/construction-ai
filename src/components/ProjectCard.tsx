import Link from "next/link";
import { Calendar, CheckCircle2, AlertTriangle, ArrowRight } from "lucide-react";
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
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const formattedDate = new Date(project.createdAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const tasksCount = project._count?.tasks || 0;
  const risksCount = project._count?.risks || 0;

  return (
    <div className="glass-panel glass-panel-hover rounded-2xl p-6 flex flex-col justify-between group relative overflow-hidden">
      {/* Absolute decorative ambient glow blob inside card */}
      <div className="absolute -right-10 -top-10 w-32 h-32 bg-sky-500/5 rounded-full blur-2xl group-hover:bg-sky-500/10 transition-colors" />

      <div>
        {/* Header */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <StatusBadge status={project.status} />
          <span className="flex items-center gap-1 text-[11px] text-slate-500 font-medium">
            <Calendar className="w-3 h-3 text-slate-600" />
            {formattedDate}
          </span>
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
      <div className="pt-4 border-t border-white/5 flex items-center justify-between mt-auto">
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

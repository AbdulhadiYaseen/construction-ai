import React from "react";

interface StatusBadgeProps {
  status: string;
  type?: "project" | "task" | "risk";
}

export default function StatusBadge({ status, type = "project" }: StatusBadgeProps) {
  const lower = status.toLowerCase();

  // Curated color mappings tailored for high-tech premium view
  let styleClasses = "bg-slate-500/10 text-slate-400 border-slate-500/20";

  if (lower.includes("plan")) {
    styleClasses = "bg-amber-500/10 text-amber-400 border-amber-500/20";
  } else if (lower.includes("act") || lower.includes("prog")) {
    styleClasses = "bg-sky-500/10 text-sky-400 border-sky-500/20";
  } else if (lower.includes("comp") || lower.includes("done") || lower.includes("low")) {
    styleClasses = "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
  } else if (lower.includes("crit") || lower.includes("high") || lower.includes("fail")) {
    styleClasses = "bg-rose-500/10 text-rose-400 border-rose-500/20";
  } else if (lower.includes("med") || lower.includes("warn")) {
    styleClasses = "bg-orange-500/10 text-orange-400 border-orange-500/20";
  }

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${styleClasses}`}>
      <span className="w-1 h-1 rounded-full bg-current mr-1.5 animate-pulse opacity-80" />
      {status}
    </span>
  );
}

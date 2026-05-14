"use client";

import { useState } from "react";
import { 
  Settings, 
  Key, 
  Cpu, 
  Sliders, 
  ShieldCheck, 
  CheckCircle2 
} from "lucide-react";

export default function SettingsPage() {
  const [apiKey, setApiKey] = useState("••••••••••••••••••••••••••••••••");
  const [modelPreset, setModelPreset] = useState("gpt-4o-mini");
  const [autoSync, setAutoSync] = useState(true);
  const [riskThreshold, setRiskThreshold] = useState("Medium");
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-8 animate-fade-in max-w-4xl mx-auto">
      {/* Structural Heading containing single H1 */}
      <div className="pb-6 border-b border-white/5">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2.5">
          <Settings className="w-7 h-7 text-sky-400" />
          System Configuration
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Tune operational AI weights, external gateway connectivity, and autonomous risk thresholds
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-8">
        {/* Gateway Credentials */}
        <div className="glass-panel rounded-3xl p-6 relative">
          <div className="flex items-center gap-2 mb-4">
            <Key className="w-4 h-4 text-sky-400" />
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-300">
              Gateway Credentials
            </h2>
          </div>

          <div className="max-w-xl space-y-3">
            <label className="block text-xs font-semibold text-slate-400">
              OpenAI Integration Secret Key
            </label>
            <input
              type="text"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-sky-500 font-mono"
            />
            <p className="text-[11px] text-slate-500">
              Used by specialized serverless agents to process spatial descriptions autonomously.
            </p>
          </div>
        </div>

        {/* AI Orchestration Model Preferences */}
        <div className="glass-panel rounded-3xl p-6 relative">
          <div className="flex items-center gap-2 mb-4">
            <Cpu className="w-4 h-4 text-indigo-400" />
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-300">
              Fleet AI Architecture
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-xl">
            {[
              { id: "gpt-4o", label: "GPT-4o Command", badge: "Max Core" },
              { id: "gpt-4o-mini", label: "GPT-4o Mini", badge: "Default" },
              { id: "custom-fleet", label: "Hybrid Core Node", badge: "Fine-Tuned" },
            ].map((m) => (
              <button
                key={m.id}
                type="button"
                onClick={() => setModelPreset(m.id)}
                className={`p-3 rounded-xl border text-left transition-all relative ${
                  modelPreset === m.id
                    ? "bg-indigo-500/10 border-indigo-500/40 text-white"
                    : "bg-white/[0.01] border-white/5 text-slate-400 hover:text-slate-200"
                }`}
              >
                <span className="block text-xs font-bold mb-1">{m.label}</span>
                <span className="text-[9px] px-1.5 py-0.5 rounded bg-white/[0.05] text-slate-400">
                  {m.badge}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Operational Telemetry Constraints */}
        <div className="glass-panel rounded-3xl p-6 relative">
          <div className="flex items-center gap-2 mb-4">
            <Sliders className="w-4 h-4 text-emerald-400" />
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-300">
              Telemetry Constraints
            </h2>
          </div>

          <div className="max-w-xl space-y-5">
            {/* Sync Toggle */}
            <div className="flex items-center justify-between py-2 border-b border-white/5">
              <div>
                <span className="block text-xs font-bold text-slate-200">Continuous Data Synchronization</span>
                <span className="block text-[11px] text-slate-500">Auto-pull task adjustments and sensor updates</span>
              </div>
              <button
                type="button"
                onClick={() => setAutoSync(!autoSync)}
                className={`w-11 h-6 rounded-full transition-colors relative ${
                  autoSync ? "bg-sky-500" : "bg-slate-700"
                }`}
              >
                <span
                  className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${
                    autoSync ? "left-6" : "left-1"
                  }`}
                />
              </button>
            </div>

            {/* Risk Selection */}
            <div>
              <label className="block text-xs font-bold text-slate-200 mb-2">
                Autonomous Risk Flagging Boundary
              </label>
              <div className="flex gap-3">
                {["Low", "Medium", "Strict"].map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setRiskThreshold(t)}
                    className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                      riskThreshold === t
                        ? "bg-white/[0.08] text-white border border-white/10"
                        : "bg-transparent text-slate-500 hover:text-slate-300"
                    }`}
                  >
                    {t} Sensitivity
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Save footer */}
        <div className="flex items-center justify-end gap-4 pt-2">
          {saved && (
            <div className="flex items-center gap-1.5 text-xs text-emerald-400 animate-fade-in">
              <CheckCircle2 className="w-4 h-4" />
              <span>Configuration applied globally</span>
            </div>
          )}

          <button
            type="submit"
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 text-white font-bold text-xs shadow-lg shadow-sky-500/20 hover:opacity-90 transition-all"
          >
            Commit Configurations
          </button>
        </div>
      </form>
    </div>
  );
}

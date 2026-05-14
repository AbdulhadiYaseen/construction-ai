"use client";

import { useState } from "react";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  MessageSquare, 
  Building2, 
  ShieldAlert, 
  Loader2,
  CheckCircle2
} from "lucide-react";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("SUPPORT");
  const [message, setMessage] = useState("");
  
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    setLoading(true);
    // Artificial network pipeline synthesis delay
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setName("");
      setEmail("");
      setMessage("");
      
      // Clear state after some time
      setTimeout(() => setSuccess(false), 6000);
    }, 1500);
  };

  return (
    <div className="space-y-8 animate-fade-in max-w-5xl mx-auto pb-12">
      {/* Cinematic Page Header Banner */}
      <div className="relative overflow-hidden rounded-3xl p-8 md:p-12 bg-[#0b0f19] border border-white/10 flex flex-col items-center justify-center text-center group">
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <img 
            src="/dashboard.png" 
            alt="Constructify Grid Background" 
            className="absolute inset-0 w-full h-full object-cover opacity-20 group-hover:scale-[1.03] transition-transform duration-[10s] ease-out" 
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0b0f19]/50 via-[#0b0f19]/80 to-[#0b0f19]" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0b0f19] via-transparent to-[#0b0f19]" />
        </div>

        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/20 text-sky-300 text-[10px] font-bold border border-sky-500/30 uppercase tracking-widest mb-3">
            <MessageSquare className="w-3.5 h-3.5" /> Communications Network
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight mb-3">
            Get In <span className="text-gradient">Touch</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Have technical inquiries, custom deployment requests, or feedback? Synthesize a Direct Line to the Constructify Operational Command Fleet.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* LEFT SIDE: The Premium Contact Input Panel */}
        <div className="lg:col-span-7">
          <div className="glass-panel rounded-3xl p-6 md:p-8 border border-white/10 relative overflow-hidden h-full">
            <div className="absolute top-0 right-0 w-64 h-64 bg-sky-500/5 rounded-full blur-3xl pointer-events-none" />
            
            <div className="flex items-center gap-2.5 mb-6 relative z-10">
              <div className="w-9 h-9 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400">
                <Mail className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-base font-extrabold text-white tracking-tight">Transmission Terminal</h2>
                <p className="text-[11px] text-slate-500">Submit details directly to centralized ticketing cores.</p>
              </div>
            </div>

            {success ? (
              <div className="flex flex-col items-center justify-center text-center py-12 px-4 space-y-4 animate-fade-in">
                <div className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 animate-bounce-slow">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <div className="space-y-2 max-w-xs">
                  <h3 className="text-base font-bold text-white">Payload Synthesized</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Your secure message transmission has successfully navigated the gateway and reached active agent queues.
                  </p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-semibold text-slate-400">Operative Name</label>
                    <input
                      type="text"
                      required
                      placeholder="Commander Sterling"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-sky-500 transition-colors"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-semibold text-slate-400">Return Email Vector</label>
                    <input
                      type="email"
                      required
                      placeholder="hq@network.io"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-sky-500 transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-slate-400">Classification Segment</label>
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full bg-[#0e1420] border border-white/10 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-sky-500 transition-colors appearance-none"
                  >
                    <option value="SUPPORT">⚙️ System Technical Support</option>
                    <option value="ENTERPRISE">🏢 Enterprise Licensing & Integrations</option>
                    <option value="FEEDBACK">💡 Core Agent Optimization Feedback</option>
                    <option value="SECURITY">🛡️ Grid Security Vulnerability</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-slate-400">Message Narrative</label>
                  <textarea
                    required
                    rows={6}
                    placeholder="Synthesize detailed notes regarding your inquiry or operational request here..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-sky-500 transition-colors leading-relaxed"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 text-white font-bold text-xs shadow-lg shadow-sky-500/20 hover:opacity-95 transition-all disabled:opacity-50 mt-2"
                >
                  {loading ? (
                            <>
                              <Loader2 className="w-4 h-4 animate-spin text-sky-200" />
                              Broadcasting Signals...
                            </>
                          ) : (
                            <>
                              Transmit Secure Payload
                              <Send className="w-4 h-4" />
                            </>
                          )}
                </button>
              </form>
            )}
          </div>
        </div>

        {/* RIGHT SIDE: Interactive Information Widgets */}
        <div className="lg:col-span-5 space-y-6 flex flex-col">
          {/* Top Detail Widget: Support Hub */}
          <div className="glass-panel rounded-3xl p-6 border border-white/5 space-y-5 flex-1 flex flex-col justify-center">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 pb-2 border-b border-white/5">
              Core Anchors
            </h3>

            <div className="space-y-4">
              <div className="flex items-start gap-3 group cursor-pointer">
                <div className="w-8 h-8 rounded-xl bg-white/[0.02] border border-white/5 text-slate-500 group-hover:text-sky-400 group-hover:bg-sky-500/10 flex items-center justify-center shrink-0 transition-all">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-600 group-hover:text-slate-500 transition-colors">Support Node</span>
                  <p className="text-xs font-semibold text-slate-300 mt-0.5 group-hover:text-white transition-colors">ops@constructify.ai</p>
                </div>
              </div>

              <div className="flex items-start gap-3 group cursor-pointer">
                <div className="w-8 h-8 rounded-xl bg-white/[0.02] border border-white/5 text-slate-500 group-hover:text-indigo-400 group-hover:bg-indigo-500/10 flex items-center justify-center shrink-0 transition-all">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-600 group-hover:text-slate-500 transition-colors">Direct Signal</span>
                  <p className="text-xs font-semibold text-slate-300 mt-0.5 group-hover:text-white transition-colors">+1 (800) AUTO-OPS</p>
                </div>
              </div>

              <div className="flex items-start gap-3 group cursor-pointer">
                <div className="w-8 h-8 rounded-xl bg-white/[0.02] border border-white/5 text-slate-500 group-hover:text-emerald-400 group-hover:bg-emerald-500/10 flex items-center justify-center shrink-0 transition-all">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-600 group-hover:text-slate-500 transition-colors">Global Anchorage</span>
                  <p className="text-xs font-semibold text-slate-300 mt-0.5 group-hover:text-white transition-colors">71-A Skyport Square, Arcology City</p>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Detail Widget: Secondary Warning/System Alert Console */}
          <div className="bg-slate-950/50 border border-white/5 rounded-3xl p-6 relative overflow-hidden flex flex-col justify-center">
            <div className="absolute bottom-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-full blur-2xl pointer-events-none" />
            
            <div className="flex items-start gap-3.5 relative z-10">
              <div className="w-10 h-10 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center shrink-0 animate-pulse">
                <ShieldAlert className="w-5 h-5" />
              </div>
              <div className="space-y-1.5">
                <h4 className="text-xs font-bold text-slate-200">High Priority Dispatch</h4>
                <p className="text-[11px] text-slate-500 leading-relaxed">
                  If you are witnessing structural planning failure, or an agent lockup incident, label your transmission classification as **Grid Security** for auto-escalation to human triage queues.
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

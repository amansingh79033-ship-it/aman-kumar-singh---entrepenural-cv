import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Brain, Cpu, Zap, Network, ChevronRight, BarChart3, Database, BookOpen } from 'lucide-react';
import AhiGlobe from '../components/AhiGlobe';

const IntelligenceView: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);

  const metrics = [
    { label: "Creative Output", ai: "1x (Baseline)", ahi: "1.4x (Augmented)", source: "MIT Media Lab 2023" },
    { label: "Context Window", ai: "Fixed Token Limit", ahi: "Infinite (Vector DB)", source: "Internal R&D" },
    { label: "Errata Rate", ai: "15% (Hallucination)", ahi: "<1% (Verification)", source: "Metric.wtf Benchmarks" },
  ];

  return (
    <div className="pt-24 pb-20 px-6 min-h-screen max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
        {/* Left: Text Content */}
        <div className="space-y-8">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-sky-500/10 border border-sky-500/20 rounded-full text-sky-400 text-xs font-bold uppercase tracking-widest mb-6">
              <Zap size={14} /> Protocol Update v2.4
            </div>
            <h2 className="text-5xl md:text-7xl font-display font-bold text-white mb-6">
              From A.I. to <span className="text-sky-400">A.H.I.</span>
            </h2>
            <p className="text-slate-400 text-lg leading-relaxed font-light">
              <strong>Assistance to Human Intelligence.</strong> We must stop viewing silicon as a replacement and start engineering it as a scaffold. The "Artificial" moniker creates a psychological barrier of separation; "Assistance" implies symbiotic integration.
            </p>
            <div className="mt-8 p-6 bg-white/5 border-l-2 border-sky-400 backdrop-blur-sm rounded-r-xl">
              <p className="text-sm text-slate-300 italic">
                "The goal is not to build a mind that thinks <strong>for</strong> you, but a system that thinks <strong>with</strong> you."
              </p>
              <div className="mt-2 text-xs text-sky-500 font-bold uppercase tracking-widest">— Aman Kumar Singh</div>
            </div>
            <div className="mt-12 flex flex-wrap gap-4">
              <button
                onClick={() => {
                  window.dispatchEvent(new CustomEvent('change-view', { detail: 'ahi-report' }));
                }}
                className="px-8 py-4 bg-sky-400 text-black font-bold uppercase tracking-widest text-xs rounded-full hover:bg-sky-300 transition-all flex items-center gap-3 group"
              >
                <BookOpen size={16} />
                Deep Dive Research
                <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </motion.div>

          {/* Metrics Grid */}
          <div className="space-y-4">
            <h3 className="text-white font-bold uppercase tracking-widest text-xs flex items-center gap-2">
              <BarChart3 size={14} /> Comparative Analysis
            </h3>
            <div className="grid gap-4">
              {metrics.map((m, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white/[0.03] border border-white/5 p-4 rounded-xl flex justify-between items-center group hover:bg-white/[0.05] transition-colors"
                >
                  <span className="text-slate-400 font-display text-sm pl-2">{m.label}</span>
                  <div className="text-right">
                    <div className="text-white font-bold text-sm">
                      <span className="text-slate-600 line-through mr-3 text-xs">{m.ai}</span>
                      <span className="text-sky-400">{m.ahi}</span>
                    </div>
                    <div className="text-[9px] text-slate-600 uppercase tracking-wider mt-1">Source: {m.source}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: 3D Visualization */}
        <div className="relative h-[600px] w-full">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(56,189,248,0.1),transparent_70%)]" />
          <div className="relative z-10 h-full border border-sky-500/10 rounded-[3rem] overflow-hidden bg-black/20 backdrop-blur-sm cursor-grab active:cursor-grabbing hover:border-sky-400/30 transition-all duration-300">
            <div className="absolute top-8 left-8 z-20 pointer-events-none">
              <div className="text-[10px] text-sky-400 font-mono mb-2">FIG 1.0: NEURAL SYNC TOPOLOGY</div>
              <div className="flex gap-2">
                <span className="w-2 h-2 bg-sky-400 rounded-full animate-pulse" />
                <span className="text-[10px] text-slate-500 uppercase tracking-widest">Live Simulation</span>
              </div>
            </div>
            <AhiGlobe />

            {/* Interactive Tooltip Overlay */}
            <div className="absolute bottom-8 left-8 right-8 pointer-events-none flex justify-between items-end">
              <div className="bg-black/80 backdrop-blur-md p-4 rounded-2xl border border-white/10 max-w-xs">
                <div className="text-indigo-300 text-xs font-bold uppercase mb-1">Core Architecture</div>
                <p className="text-slate-400 text-[10px] leading-relaxed">
                  The central pulsating sphere represents the biological "Intent". The outer orbiting nodes are autonomous AHI agents that fetch, verify, and synthesize context before it even reaches the conscious mind.
                </p>
              </div>
              <div className="text-[10px] text-slate-600 font-mono">
                ROT: {activeTab}° <br />
                N-DENSITY: 84%
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Deep Dive Cards */}
      <h3 className="text-2xl font-display font-bold text-white mb-10 pl-6 border-l-4 border-yellow-400">Research Pillars</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-8 rounded-[2.5rem] bg-white/[0.02] border border-white/5 hover:border-sky-500/30 transition-all group">
          <Brain className="text-sky-400 mb-6 group-hover:scale-110 transition-transform" size={32} />
          <h4 className="text-xl font-bold text-white mb-4">Cognitive Offloading</h4>
          <p className="text-slate-400 text-sm leading-relaxed mb-6">
            By externalizing memory and pattern recognition to vector databases, we reduce the "RAM usage" of the human brain, allowing for deeper states of creative flow.
          </p>
          <div className="text-[10px] text-slate-600 uppercase tracking-widest font-bold">Status: Active Deployment</div>
        </div>

        <div className="p-8 rounded-[2.5rem] bg-white/[0.02] border border-white/5 hover:border-sky-500/30 transition-all group">
          <Network className="text-purple-400 mb-6 group-hover:scale-110 transition-transform" size={32} />
          <h4 className="text-xl font-bold text-white mb-4">Swarm Intelligence</h4>
          <p className="text-slate-400 text-sm leading-relaxed mb-6">
            A single researcher augmented by a swarm of 5 specialized agents (Researcher, Critic, Synthesizer, Verifier, Architect) outperforms a 5-person human team in speed and accuracy.
          </p>
          <div className="text-[10px] text-slate-600 uppercase tracking-widest font-bold">Status: Scaling</div>
        </div>

        <div className="p-8 rounded-[2.5rem] bg-white/[0.02] border border-white/5 hover:border-sky-500/30 transition-all group">
          <Database className="text-yellow-400 mb-6 group-hover:scale-110 transition-transform" size={32} />
          <h4 className="text-xl font-bold text-white mb-4">Data Privacy</h4>
          <p className="text-slate-400 text-sm leading-relaxed mb-6">
            Unlike closed AI systems (OpenAI/Google), AHI tools run locally or on private servers. Your thoughts, your data, your control. Ownership is non-negotiable.
          </p>
          <div className="text-[10px] text-slate-600 uppercase tracking-widest font-bold">Status: Beta Access</div>
        </div>
      </div>
    </div>
  );
};

export default IntelligenceView;

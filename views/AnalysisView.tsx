import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TrendingDown, Zap, Calendar, X, BarChart3, Globe, ShieldCheck, Microscope, Cuboid, ArrowRight } from 'lucide-react';
import Hologram from '../components/Hologram';
import { useStore } from '../lib/store';

interface Prediction {
  date: string;
  target: string;
  insight: string;
  status: string;
  color: string;
  shape: 'sphere' | 'torus' | 'octahedron';
  trendData: number[];
  details: {
    research: string;
    facts: string[];
    alignment: string;
    metrics: { label: string; value: string; trend: 'up' | 'down' }[];
  };
}

interface NewsItem {
  id: string;
  title: string;
  source: string;
  time: string;
  relevance: string;
}

const AnalysisView: React.FC = () => {
  const [selectedPrediction, setSelectedPrediction] = useState<Prediction | null>(null);

  const predictions: Prediction[] = [
    {
      date: "Q1 2022",
      target: "Project EdTech Bubble",
      insight: "Static units & rogue staff behavior will cause a 90% drop in trust.",
      status: "Verified",
      color: "#f87171",
      shape: "octahedron",
      trendData: [100, 95, 80, 40, 20, 10, 5],
      details: {
        research: "The EdTech bubble burst was mathematically inevitable due to High CAC (Customer Acquisition Cost) vs Low LTV (Lifetime Value). The unit economics were sustained only by VC capital infusion, not revenue.",
        facts: [
          "Valuation crash from $22B to <$1B within 24 months.",
          "Mass layoffs exceeding 25,000 workforce globally in EdTech.",
          "Regulatory scrutiny over predatory loan practices in India."
        ],
        metrics: [
          { label: "Trust Index", value: "-92%", trend: 'down' },
          { label: "Burn Rate", value: "$100M/mo", trend: 'up' },
          { label: "Offline Pivot", value: "Too Late", trend: 'down' }
        ],
        alignment: "Current market shift towards offline/hybrid centers (Allen, PhysicsWallah) confirms the failure of purely digital-only pedagogy for core K-12 education."
      }
    },
    {
      date: "Q4 2023",
      target: "Quick Commerce 2.0",
      insight: "Shift from delivery-speed to 'treatment-speed' essential for survival.",
      status: "In Action",
      color: "#facc15",
      shape: "torus",
      trendData: [10, 25, 45, 70, 85, 95, 100],
      details: {
        research: "Dopamine-driven delivery loops have diminishing returns. The pivot must be from 'Speed' to 'Service Quality' (The Treatment Economy). Consumers value reliability over instant gratification once the novelty wears off.",
        facts: [
          "Blinkit/Zepto overtaking traditional e-commerce in high-density urban zones.",
          "Zepto valuation reached $5B after series G funding.",
          "Integration of non-grocery items now accounts for 25% of GOV."
        ],
        metrics: [
          { label: "SKU Diversity", value: "+300%", trend: 'up' },
          { label: "Dark Store Density", value: "Optimal", trend: 'up' },
          { label: "Margin Growth", value: "+8%", trend: 'up' }
        ],
        alignment: "Rise of 'Dark Stores' as new retail warehouses and the integration of high-margin categories (electronics, gifts) validates the move towards a broader utility model."
      }
    },
    {
      date: "Q2 2024",
      target: "The AHI Pivot",
      insight: "Market will tire of generic LLMs; focus will shift to Human Augmentation (AHI).",
      status: "Emerging",
      color: "#38bdf8",
      shape: "sphere",
      trendData: [5, 15, 30, 50, 65, 80, 90],
      details: {
        research: "LLMs are reasoning engines, not sentient minds. The bottleneck is context synthesis, which AHI (Assistance to Human Intelligence) solves via Vector Retrieval Augmented Generation (RAG) and Agentic Workflows.",
        facts: [
          "Enterprise AI churn rate increased 40% due to hallucination risks.",
          "Gartner Hype Cycle shows 'Generative AI' entering the Trough of Disillusionment.",
          "Rise of 'Small Language Models' (SLMs) running locally on user hardware."
        ],
        metrics: [
          { label: "RAG Adoption", value: "+120%", trend: 'up' },
          { label: "ROI Clarity", value: "Search Phase", trend: 'down' },
          { label: "Local Models", value: "Primary", trend: 'up' }
        ],
        alignment: "Major players like Microsoft (Copilot) & Apple (Intelligence) are rebranding to 'Assistance' features, explicitly moving away from the 'Replacement' rhetoric to 'Augmentation'."
      }
    }
  ];

  const newsFeed: NewsItem[] = [
    { id: '1', title: "Byju's valuation slashed to zero by BlackRock", source: "Bloomberg", time: "2h ago", relevance: "Critical" },
    { id: '2', title: "Zepto raises $665M to triple dark store count", source: "TechCrunch", time: "5h ago", relevance: "Market Shift" },
    { id: '3', title: "Gartner drops GenAI into 'Trough of Disillusionment'", source: "Gartner", time: "1d ago", relevance: "Validation" },
    { id: '4', title: "Local SLMs outperform GPT-4 in niche medical coding", source: "Nature Port", time: "3d ago", relevance: "Strategy" }
  ];

  return (
    <div className="pt-32 pb-20 px-6 min-h-screen max-w-7xl mx-auto relative">
      <div className="flex flex-col lg:flex-row gap-20 items-start">
        <div className="lg:w-1/3 space-y-8 sticky top-32">
          <div>
            <h2 className="text-4xl md:text-6xl font-display font-bold text-white mb-8 leading-none">Market <br /><span className="text-sky-300">Forensics.</span></h2>
            <p className="text-slate-500 leading-relaxed mb-8">
              Utilizing high-level pattern recognition to predict market shifts before they manifest in data.
            </p>
          </div>

          <div className="p-8 glass rounded-3xl border-yellow-200/10">
            <h4 className="text-yellow-100 font-bold text-xs uppercase tracking-widest mb-4">Core Thesis</h4>
            <p className="text-sm italic">"If you wait for the data, you're already behind. Forensics is about reading the vibrations."</p>
          </div>

          <div className="space-y-4">
            <h4 className="text-sky-400 font-bold text-[10px] uppercase tracking-widest px-2">Forensic News Feed</h4>
            <div className="space-y-3">
              {newsFeed.map(news => (
                <div key={news.id} className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-all group">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-[10px] text-sky-500 font-bold">{news.source}</span>
                    <span className="text-[10px] text-slate-600">{news.time}</span>
                  </div>
                  <h5 className="text-sm font-medium text-slate-300 group-hover:text-white transition-colors">{news.title}</h5>
                  <div className="mt-2 text-[8px] uppercase tracking-tighter text-slate-500">{news.relevance}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex-1 space-y-8">
          {predictions.map((p, i) => (
            <motion.div
              key={i}
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: i * 0.1 }}
              onClick={() => setSelectedPrediction(p)}
              className="glass p-12 rounded-[3rem] border-white/5 hover:border-sky-400/20 transition-all group cursor-pointer relative overflow-hidden"
            >
              <div className="absolute right-0 top-0 p-12 opacity-0 group-hover:opacity-10 transition-opacity">
                <Microscope size={120} />
              </div>
              <div className="flex items-center justify-between mb-8 relative z-10">
                <div className="flex items-center gap-3 text-slate-500 text-[10px] font-bold uppercase tracking-widest">
                  <Calendar size={14} /> {p.date}
                </div>
                <span className={`px-4 py-1 text-[9px] font-bold uppercase tracking-widest rounded-full border ${p.status === 'Verified' ? 'bg-red-500/10 text-red-400 border-red-500/20' :
                  p.status === 'In Action' ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20' :
                    'bg-sky-500/10 text-sky-400 border-sky-500/20'
                  }`}>
                  {p.status}
                </span>
              </div>
              <h3 className="text-2xl font-display font-bold text-white mb-4 group-hover:text-sky-300 transition-colors relative z-10">{p.target}</h3>
              <p className="text-slate-400 text-lg font-light leading-relaxed relative z-10">{p.insight}</p>
              <div className="mt-6 flex items-center gap-2 text-sky-400 text-xs font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0">
                View Analysis <BarChart3 size={14} />
              </div>
            </motion.div>
          ))}

          {/* 3D Resource Parallax Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            onClick={() => {
              // We'll need to pass setView if we don't use absolute routing, 
              // but since App uses currentView from its own state, we should trigger it.
              // For now, we'll assume a global setter or window dispatch if needed, 
              // but better to use the store if App.tsx listens to it.
              // Since App.tsx uses local state, I'll update App.tsx to use a store-based view if possible, 
              // OR use a custom event. Let's use a custom event for view switching to avoid state prop drilling.
              window.dispatchEvent(new CustomEvent('change-view', { detail: 'resources' }));
            }}
            className="group relative h-auto md:h-64 w-full glass rounded-[3rem] border-sky-400/20 hover:border-sky-400/50 transition-all cursor-pointer overflow-hidden flex flex-col md:flex-row items-center justify-between px-8 md:px-12 py-10 md:py-0"
            style={{ perspective: "1000px" }}
          >
            <motion.div
              whileHover={{ rotateY: 15, rotateX: -5, scale: 1.02 }}
              className="flex items-center gap-8 z-10"
            >
              <div className="w-20 h-20 bg-sky-400/10 rounded-3xl flex items-center justify-center text-sky-400 border border-sky-400/20 group-hover:bg-sky-400 group-hover:text-black transition-all duration-500 shadow-[0_0_30px_rgba(56,189,248,0.2)]">
                <Cuboid size={40} />
              </div>
              <div>
                <h3 className="text-3xl font-display font-bold text-white mb-2">Resource <span className="text-sky-300">Vault.</span></h3>
                <p className="text-slate-400 text-sm font-light uppercase tracking-widest">Access exclusive Pro assets & technical manuals</p>
              </div>
            </motion.div>

            <div className="flex items-center gap-4 z-10">
              <div className="text-right hidden md:block">
                <div className="text-[10px] text-sky-500 font-bold uppercase tracking-widest mb-1">Status: Restricted</div>
                <div className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">1GB+ Capacity Available</div>
              </div>
              <div className="w-12 h-12 glass rounded-full flex items-center justify-center text-white group-hover:bg-sky-400 group-hover:text-black transition-all">
                <ArrowRight size={20} />
              </div>
            </div>

            {/* Background elements */}
            <div className="absolute inset-0 bg-gradient-to-r from-sky-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-sky-400/5 rounded-full blur-[80px] group-hover:bg-sky-400/10 transition-all" />
          </motion.div>
        </div>
      </div>

      {/* Immersive Overlay */}
      <AnimatePresence>
        {selectedPrediction && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-md flex items-center justify-center p-4 md:p-10"
            onClick={() => setSelectedPrediction(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 50 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-6xl max-h-[90vh] bg-[#050505] border border-white/10 rounded-[3rem] overflow-hidden flex flex-col md:flex-row shadow-2xl relative"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedPrediction(null)}
                className="absolute top-8 right-8 z-50 p-2 bg-white/5 hover:bg-white/10 rounded-full text-white transition-colors"
              >
                <X size={24} />
              </button>

              {/* Left: 3D Visualization */}
              <div className="w-full md:w-5/12 bg-gradient-to-br from-white/[0.02] to-transparent relative min-h-[300px] md:min-h-auto flex items-center justify-center p-8 border-r border-white/5">
                <div className="absolute inset-0">
                  <Hologram color={selectedPrediction.color} shape={selectedPrediction.shape} />
                </div>
                <div className="absolute bottom-10 left-10 z-10">
                  <h2 className="text-4xl font-display font-bold text-white mb-2">{selectedPrediction.target}</h2>
                  <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">
                    Status: <span style={{ color: selectedPrediction.color }}>{selectedPrediction.status}</span>
                  </div>
                </div>
              </div>

              {/* Right: Content */}
              <div className="flex-1 p-10 md:p-16 overflow-y-auto custom-scrollbar">
                <div className="space-y-12">
                  {/* Research */}
                  <div>
                    <h4 className="flex items-center gap-3 text-sky-400 font-bold uppercase tracking-widest text-xs mb-4">
                      <Microscope size={16} /> Research Logic
                    </h4>
                    <p className="text-xl text-slate-300 font-light leading-relaxed border-l-2 border-white/10 pl-6">
                      {selectedPrediction.details.research}
                    </p>
                  </div>

                  {/* Data/Facts */}
                  <div>
                    <h4 className="flex items-center gap-3 text-sky-400 font-bold uppercase tracking-widest text-xs mb-6">
                      <BarChart3 size={16} /> Forensic Metrics
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                      {selectedPrediction.details.metrics.map((metric, i) => (
                        <div key={i} className="glass p-6 rounded-2xl border-white/5 bg-white/[0.02]">
                          <div className="text-slate-500 text-[10px] uppercase tracking-widest mb-2">{metric.label}</div>
                          <div className="flex items-end gap-2">
                            <span className="text-2xl font-bold text-white">{metric.value}</span>
                            <span className={metric.trend === 'up' ? 'text-emerald-400' : 'text-rose-400'}>
                              {metric.trend === 'up' ? '↗' : '↘'}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="space-y-4">
                      {selectedPrediction.details.facts.map((fact, i) => (
                        <div key={i} className="flex items-start gap-4 p-5 rounded-2xl bg-white/[0.03] border border-white/5 text-sm text-slate-400">
                          <div className="w-1.5 h-1.5 rounded-full bg-sky-400 mt-1.5 flex-shrink-0" />
                          {fact}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Interactive Trend Chart */}
                  <div>
                    <h4 className="flex items-center gap-3 text-sky-400 font-bold uppercase tracking-widest text-xs mb-6">
                      <Cuboid size={16} /> Trend Projection
                    </h4>
                    <div className="h-48 w-full glass rounded-2xl p-6 border-white/5 flex items-end justify-between gap-1 overflow-hidden group">
                      {selectedPrediction.trendData.map((val, i) => (
                        <motion.div
                          key={i}
                          initial={{ height: 0 }}
                          animate={{ height: `${val}%` }}
                          transition={{ delay: i * 0.1, duration: 1 }}
                          className="flex-1 rounded-t-lg transition-colors"
                          style={{
                            backgroundColor: selectedPrediction.color,
                            opacity: 0.3 + (i * 0.1)
                          }}
                        />
                      ))}
                    </div>
                    <div className="mt-4 flex justify-between text-[10px] text-slate-600 font-bold uppercase tracking-widest">
                      <span>Threshold</span>
                      <span>Execution Peak</span>
                      <span>Outcome</span>
                    </div>
                  </div>

                  {/* Current Alignment */}
                  <div>
                    <h4 className="flex items-center gap-3 text-sky-400 font-bold uppercase tracking-widest text-xs mb-4">
                      <Globe size={16} /> Current Market Alignment
                    </h4>
                    <div className="p-6 bg-sky-500/5 border border-sky-500/10 rounded-2xl">
                      <p className="text-slate-300 text-sm leading-relaxed">
                        <ShieldCheck className="inline w-4 h-4 mr-2 text-sky-400 mb-1" />
                        {selectedPrediction.details.alignment}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AnalysisView;

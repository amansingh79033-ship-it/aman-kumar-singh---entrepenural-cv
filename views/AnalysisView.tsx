import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TrendingDown, Zap, Calendar, X, BarChart3, Globe, ShieldCheck, Microscope } from 'lucide-react';
import Hologram from '../components/Hologram';

interface Prediction {
  date: string;
  target: string;
  insight: string;
  status: string;
  color: string;
  shape: 'sphere' | 'torus' | 'octahedron';
  details: {
    research: string;
    facts: string[];
    alignment: string;
  };
}

const AnalysisView: React.FC = () => {
  const [selectedPrediction, setSelectedPrediction] = useState<Prediction | null>(null);

  const predictions: Prediction[] = [
    {
      date: "Q1 2022",
      target: "Byju's / Unacademy",
      insight: "Static units & rogue staff behavior will cause a 90% drop in trust.",
      status: "Verified",
      color: "#f87171", // Red
      shape: "octahedron",
      details: {
        research: "The EdTech bubble burst was mathematically inevitable due to High CAC (Customer Acquisition Cost) vs Low LTV (Lifetime Value). The unit economics were sustained only by VC capital infusion, not revenue.",
        facts: [
          "Valuation crash from $22B to <$1B.",
          "Mass layoffs exceeding 25,000 workforce.",
          "Regulatory scrutiny over predatory loan practices."
        ],
        alignment: "Current market shift towards offline/hybrid centers (Allen, PhysicsWallah) confirms the failure of purely digital-only pedagogy for core K-12 education."
      }
    },
    {
      date: "Q4 2023",
      target: "Quick Commerce",
      insight: "Shift from delivery-speed to 'treatment-speed' essential for survival.",
      status: "In Action",
      color: "#facc15", // Yellow
      shape: "torus",
      details: {
        research: "Dopamine-driven delivery loops have diminishing returns. The pivot must be from 'Speed' to 'Service Quality' (The Treatment Economy). Consumers value reliability over instant gratification once the novelty wears off.",
        facts: [
          "Blinkit/Zepto overtaking traditional e-commerce in high-density urban zones.",
          "Average Order Value (AOV) stagnating despite volume growth.",
          "High burn rate in last-mile logistics."
        ],
        alignment: "Rise of 'Dark Stores' as new retail warehouses and the integration of high-margin categories (electronics, gifts) validates the move towards a broader utility model."
      }
    },
    {
      date: "Q2 2024",
      target: "AHI Narrative",
      insight: "Market will tire of LLMs; focus will shift to AHI (Human Augmentation).",
      status: "Emerging",
      color: "#38bdf8", // Blue
      shape: "sphere",
      details: {
        research: "LLMs are reasoning engines, not sentient minds. The bottleneck is context synthesis, which AHI (Assistance to Human Intelligence) solves via Vector Retrieval Augmented Generation (RAG) and Agentic Workflows.",
        facts: [
          "Enterprise AI churn rate increasing due to hallucination risks.",
          "Investor fatigue with generic 'Wrapper' startups.",
          "Rise of 'Small Language Models' (SLMs) running locally."
        ],
        alignment: "Major players like Microsoft (Copilot) & Apple (Intelligence) are rebranding to 'Assistance' features, explicitly moving away from the 'Replacement' rhetoric to 'Augmentation'."
      }
    }
  ];

  return (
    <div className="pt-32 pb-20 px-6 min-h-screen max-w-7xl mx-auto relative">
      <div className="flex flex-col lg:flex-row gap-20 items-start">
        <div className="lg:w-1/3 sticky top-32">
          <h2 className="text-6xl font-display font-bold text-white mb-8 leading-none">Market <br /><span className="text-sky-300">Forensics.</span></h2>
          <p className="text-slate-500 leading-relaxed mb-12">
            Utilizing high-level pattern recognition to predict market shifts before they manifest in data.
          </p>
          <div className="p-8 glass rounded-3xl border-yellow-200/10">
            <h4 className="text-yellow-100 font-bold text-xs uppercase tracking-widest mb-4">Core Thesis</h4>
            <p className="text-sm italic">"If you wait for the data, you're already behind. Forensics is about reading the vibrations."</p>
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
              <div className="flex-1 p-10 md:p-16 overflow-y-auto">
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
                      <BarChart3 size={16} /> Verified Data Points
                    </h4>
                    <div className="grid grid-cols-1 gap-4">
                      {selectedPrediction.details.facts.map((fact, i) => (
                        <div key={i} className="bg-white/5 p-4 rounded-xl border border-white/5 text-sm text-slate-400">
                          {fact}
                        </div>
                      ))}
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

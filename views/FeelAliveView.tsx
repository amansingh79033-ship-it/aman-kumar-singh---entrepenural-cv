import React, { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import ThreeBrain from '../components/ThreeBrain';
import { Brain, Heart, Zap, Leaf, AlertTriangle } from 'lucide-react';

const FeelAliveView: React.FC = () => {
  const [mindParalysisActive, setMindParalysisActive] = useState(false);
  const [focusLevel, setFocusLevel] = useState(100);
  const [distractions, setDistractions] = useState(0);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.8]);

  // Simulate mind paralysis
  const triggerMindParalysis = () => {
    setMindParalysisActive(true);
    let currentFocus = 100;
    let currentDistractions = 0;

    const interval = setInterval(() => {
      currentFocus = Math.max(0, currentFocus - 2);
      currentDistractions = Math.min(100, currentDistractions + 4);
      setFocusLevel(currentFocus);
      setDistractions(currentDistractions);
      if (currentFocus <= 0) clearInterval(interval);
    }, 100);

    setTimeout(() => {
      setMindParalysisActive(false);
      setFocusLevel(100);
      setDistractions(0);
    }, 6000);
  };

  return (
    <div ref={containerRef} className={`min-h-screen relative overflow-hidden transition-colors duration-1000 ${mindParalysisActive ? 'bg-black' : 'bg-[#050505]'}`}>

      {/* Global Distortion Overlay for Mind Paralysis */}
      <AnimatePresence>
        {mindParalysisActive && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 pointer-events-none mix-blend-hard-light"
            style={{
              backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\' opacity=\'0.15\'/%3E%3C/svg%3E")',
              backgroundSize: '100px 100px'
            }}
          />
        )}
      </AnimatePresence>

      <div className={`transition-all duration-1000 ${mindParalysisActive ? 'scale-95 blur-sm brightness-50 grayscale' : ''}`}>

        {/* Ambient Background */}
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-sky-500/10 rounded-full blur-[120px] animate-pulse-slow" />
          <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-violet-500/10 rounded-full blur-[120px] animate-pulse-slow delay-1000" />
        </div>

        {/* Hero Section */}
        <section className="h-screen flex flex-col items-center justify-center relative z-10 px-6">
          <motion.div style={{ opacity: heroOpacity, scale: heroScale }} className="text-center space-y-8">
            <motion.div
              initial={{ opacity: 0, letterSpacing: '1em' }}
              animate={{ opacity: 1, letterSpacing: '0.2em' }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="text-sky-400 font-bold uppercase text-sm tracking-[0.2em]"
            >
              The Neural Experience
            </motion.div>

            <h1 className="text-6xl md:text-9xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-b from-white via-white/80 to-transparent leading-tight select-none">
              <motion.span
                animate={{
                  textShadow: ["0 0 0px rgba(255,255,255,0)", "0 0 20px rgba(255,255,255,0.5)", "0 0 0px rgba(255,255,255,0)"]
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                ALIVE
              </motion.span>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="max-w-md mx-auto text-slate-400 text-lg leading-relaxed"
            >
              Intelligence is not a database. <br />
              <span className="text-white italic">It is a living, breathing act.</span>
            </motion.p>
          </motion.div>

          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute bottom-12 left-1/2 -translate-x-1/2 text-slate-500 text-xs uppercase tracking-widest"
          >
            Scroll to Explore
          </motion.div>
        </section>

        <div className="max-w-7xl mx-auto px-6 pb-32 space-y-32">

          {/* Section 1: The Living Mind (Text + Brain) */}
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1 relative h-[500px] w-full bg-gradient-to-b from-slate-900/0 via-slate-900/20 to-slate-900/0 rounded-[3rem] border border-white/5 overflow-hidden">
              <ThreeBrain className="w-full h-full opacity-80" />
              <div className="absolute bottom-6 left-0 right-0 text-center pointer-events-none">
                <span className="px-4 py-2 rounded-full bg-black/50 backdrop-blur-md border border-white/10 text-xs text-sky-300 font-mono uppercase">
                  Neural Activity: {mindParalysisActive ? 'CRITICAL' : 'OPTIMAL'}
                </span>
              </div>
            </div>

            <div className="order-1 lg:order-2 space-y-8">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="space-y-6"
              >
                <div className="flex items-center gap-3 text-sky-400 mb-2">
                  <Brain size={24} />
                  <span className="text-sm font-bold uppercase tracking-widest">Neuroscience</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-display font-bold text-white leading-tight">
                  The Mind is <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-violet-400">Not a Hard Drive</span>
                </h2>
                <p className="text-slate-400 text-lg leading-relaxed border-l-2 border-white/10 pl-6">
                  Memory is a dynamic, predictive process. When we outsource knowledge to devices, we don't just lose data—we lose the neural pathways that construct deep understanding. This is <span className="text-white">Digital Amnesia</span>.
                </p>
              </motion.div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { title: "No Internal Experience", desc: "AI models predict; they do not feel." },
                  { title: "Dual-Process Theory", desc: "Intuition is fast, trained logic." },
                  { title: "Attention Economy", desc: "Scrolling erodes cognitive patience." },
                  { title: "Active Recall", desc: "We only know what we can reconstruct." }
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ scale: 1.02 }}
                    className="p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors"
                  >
                    <h4 className="text-white font-bold mb-1">{item.title}</h4>
                    <p className="text-slate-500 text-sm">{item.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Section 2: Mind Paralysis Simulation */}
          <section className="relative group">
            <div className="absolute inset-0 bg-red-500/5 rounded-[3rem] blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <div className="glass rounded-[3rem] p-12 md:p-16 border-white/5 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-12 opacity-10 pointer-events-none">
                <AlertTriangle size={200} />
              </div>

              <div className="max-w-2xl relative z-10">
                <h3 className="text-3xl font-display font-bold text-white mb-6">The Paralysis Trap</h3>
                <p className="text-slate-400 text-lg mb-8">
                  Visualize how the pursuit of external validation and infinite scrolling loops degrades cognitive function. Control the simulation below.
                </p>

                <div className="space-y-6">
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-bold uppercase tracking-widest">
                      <span className="text-emerald-400">Focus & Clarity</span>
                      <span className="text-white">{Math.round(focusLevel)}%</span>
                    </div>
                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-emerald-400 shadow-[0_0_15px_rgba(52,211,153,0.5)]"
                        initial={{ width: "100%" }}
                        animate={{ width: `${focusLevel}%` }}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-bold uppercase tracking-widest">
                      <span className="text-red-400">Noise & Distraction</span>
                      <span className="text-white">{Math.round(distractions)}%</span>
                    </div>
                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-red-500 shadow-[0_0_15px_rgba(239,68,68,0.5)]"
                        initial={{ width: "0%" }}
                        animate={{ width: `${distractions}%` }}
                      />
                    </div>
                  </div>

                  <button
                    onClick={triggerMindParalysis}
                    disabled={mindParalysisActive}
                    className={`mt-4 px-8 py-4 rounded-full font-bold uppercase tracking-widest transition-all ${mindParalysisActive
                        ? 'bg-red-500/20 text-red-500 cursor-not-allowed border border-red-500/50'
                        : 'bg-white text-black hover:scale-105 hover:bg-sky-50'
                      }`}
                  >
                    {mindParalysisActive ? 'SIMULATION ACTIVE...' : 'INITIATE PARALYSIS SEQUENCE'}
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Section 3: Rediscovering Humanity (Horizontal Cards) */}
          <section className="space-y-12">
            <div className="text-center space-y-4">
              <Heart className="mx-auto text-violet-400 mb-4" size={32} />
              <h3 className="text-3xl md:text-5xl font-display font-bold text-white">Beyond the Screen</h3>
              <p className="text-slate-400 max-w-xl mx-auto">True wealth is experiential. It creates memories that no drive can store.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 h-[400px]">
              {[
                { id: 'awareness', icon: <Zap />, label: 'Awareness', color: 'from-sky-400 to-blue-600', text: "Observe without judgment." },
                { id: 'connection', icon: <Heart />, label: 'Connection', color: 'from-pink-400 to-rose-600', text: "Deep, authentic bonds." },
                { id: 'nature', icon: <Leaf />, label: 'Nature', color: 'from-emerald-400 to-green-600', text: "Restore mental balance." },
                { id: 'creation', icon: <Brain />, label: 'Creation', color: 'from-violet-400 to-purple-600', text: "Expression over consumption." },
              ].map((card) => (
                <motion.div
                  key={card.id}
                  onMouseEnter={() => setHoveredCard(card.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                  className={`relative rounded-3xl overflow-hidden cursor-pointer transition-all duration-500 ${hoveredCard === card.id ? 'md:col-span-2' : 'col-span-1'} group`}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${card.color} opacity-10 group-hover:opacity-20 transition-opacity`} />
                  <div className="absolute inset-0 backdrop-blur-sm group-hover:backdrop-blur-none transition-all duration-700" />

                  <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                    <div className={`p-4 rounded-2xl bg-white/5 border border-white/10 mb-4 group-hover:scale-110 transition-transform duration-500`}>
                      {React.cloneElement(card.icon as any, { size: 24, className: "text-white" })}
                    </div>
                    <h4 className="text-xl font-bold text-white mb-2">{card.label}</h4>
                    <p className={`text-slate-300 text-sm max-w-[200px] transition-all duration-500 ${hoveredCard === card.id ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                      {card.text}
                    </p>
                  </div>

                  {/* Border Gradient */}
                  <div className="absolute inset-0 border border-white/5 rounded-3xl group-hover:border-white/20 transition-colors" />
                </motion.div>
              ))}
            </div>
          </section>

          <section className="text-center py-20 border-t border-white/5">
            <p className="text-2xl md:text-4xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-slate-200 to-slate-500 italic">
              "Real intelligence is cultivated,<br />not downloaded."
            </p>
          </section>

        </div>
      </div>
    </div>
  );
};

export default FeelAliveView;
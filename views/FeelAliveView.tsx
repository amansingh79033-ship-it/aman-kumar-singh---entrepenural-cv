import React, { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import ThreeBrain from '../components/ThreeBrain';
import { Brain, Heart, Zap, Leaf, AlertTriangle, Sparkles, Wind, Droplets } from 'lucide-react';

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

  const themes: Record<string, { color: string, icon: any, label: string, detail: string, sub: string }> = {
    awareness: {
      color: 'bg-sky-500/20',
      icon: <Zap />,
      label: 'Pure Awareness',
      detail: 'The ability to observe without judgment is the highest form of intelligence.',
      sub: 'Detach from the dopamine loops.'
    },
    connection: {
      color: 'bg-rose-500/20',
      icon: <Heart />,
      label: 'Neural Resonance',
      detail: 'Deep, authentic human connection synchronizes brainwaves in ways no algorithm can replicate.',
      sub: 'Mirror neurons are the basis of empathy.'
    },
    nature: {
      color: 'bg-emerald-500/20',
      icon: <Leaf />,
      label: 'Biological Harmony',
      detail: 'Spending time in nature reduces cortisol and restores the cognitive resources drained by screens.',
      sub: 'The brain evolved for the wild, not the web.'
    },
    creation: {
      color: 'bg-violet-500/20',
      icon: <Sparkles />,
      label: 'Creative Flow',
      detail: 'Expression is the antidote to consumption. Reclaim your agency through the act of making.',
      sub: 'From a passive node to an active source.'
    },
  };

  return (
    <div ref={containerRef} className={`min-h-screen relative overflow-hidden transition-colors duration-1000 ${mindParalysisActive ? 'bg-black' : 'bg-[#050505]'}`}>

      {/* Dynamic Background Theme */}
      <AnimatePresence>
        {hoveredCard && themes[hoveredCard] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`fixed inset-0 z-0 pointer-events-none ${themes[hoveredCard].color} blur-[150px] transition-colors`}
          />
        )}
      </AnimatePresence>

      {/* Global Distortion Overlay */}
      <AnimatePresence>
        {mindParalysisActive && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 pointer-events-none mix-blend-overlay opacity-30 bg-white/5"
            style={{
              backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")',
            }}
          />
        )}
      </AnimatePresence>

      <div className={`relative z-10 transition-all duration-1000 ${mindParalysisActive ? 'scale-95 blur-md brightness-50' : ''}`}>

        {/* Hero Section */}
        <section className="h-screen flex flex-col items-center justify-center px-6 relative">
          <motion.div style={{ opacity: heroOpacity, scale: heroScale }} className="text-center">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-sky-400 font-bold uppercase text-xs tracking-[0.5em] mb-8"
            >
              The Neural Experience
            </motion.div>

            <h1 className="text-[12vw] font-display font-bold text-white leading-none tracking-tighter select-none mb-12">
              <motion.span
                animate={{
                  opacity: [1, 0.8, 1],
                  scale: [1, 1.05, 1],
                  filter: ["blur(0px)", "blur(2px)", "blur(0px)"]
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                ALIVE
              </motion.span>
            </h1>

            <div className="max-w-2xl mx-auto space-y-6">
              <p className="text-slate-500 text-xl md:text-2xl leading-relaxed italic">
                "Intelligence is a <span className="text-white">biological act</span>, not a computational result."
              </p>
              <div className="w-12 h-[1px] bg-sky-400/20 mx-auto" />
              <p className="text-slate-400 text-sm uppercase tracking-widest leading-loose max-w-lg mx-auto">
                We are witnessing the rise of <span className="text-white">Digital Amnesia</span>. By outsourcing our memory, we surrender the foundation of our intuition.
              </p>
            </div>
          </motion.div>

          <motion.div
            animate={{ opacity: [0.2, 0.5, 0.2] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 text-[10px] uppercase font-bold tracking-[0.4em] text-slate-600"
          >
            Descend to Reality
          </motion.div>
        </section>

        <div className="max-w-7xl mx-auto px-6 pb-40 space-y-48">

          {/* Detailed Observations */}
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-12">
              <div className="space-y-4">
                <div className="w-8 h-8 rounded-lg bg-sky-400/10 flex items-center justify-center text-sky-400">
                  <Zap size={20} />
                </div>
                <h2 className="text-5xl font-display font-bold text-white leading-tight">
                  The <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-violet-400">Neuro-Synthetic</span> Divide
                </h2>
              </div>

              <div className="space-y-8 text-slate-400 text-lg border-l border-white/10 pl-10">
                <p>
                  <strong className="text-white block mb-2">Cognitive Offloading</strong>
                  When we use search engines for every minor fact, we bypass the hippocampal encoding process. Information that is never "found" by the mind is never "known" by the self.
                </p>
                <p>
                  <strong className="text-white block mb-2">Predictive Processing</strong>
                  AI models are probability engines. Human intuition is different—it is the result of embodied experience, emotional weight, and biological necessity.
                </p>
                <p>
                  <strong className="text-white block mb-2">The Erosion of Boredom</strong>
                  Creativity requires the "Default Mode Network"—a brain state active only during idle reflection. Constant stimulation kills the spark of original thought.
                </p>
              </div>
            </div>

            <div className="relative aspect-square glass rounded-[4rem] border-white/5 overflow-hidden flex items-center justify-center p-12 group">
              <ThreeBrain className="w-full h-full transform group-hover:scale-110 transition-transform duration-1000" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-12 text-center w-full px-8 pointer-events-none">
                <p className="text-[10px] text-sky-300 font-bold uppercase tracking-widest mb-2">Neural Topology Visualization</p>
                <p className="text-xs text-slate-500 italic">"The map is not the territory. The data is not the mind."</p>
              </div>
            </div>
          </section>

          {/* Simulation Section */}
          <section className="relative">
            <div className="glass rounded-[4rem] p-16 border-white/5 relative overflow-hidden shadow-2xl">
              <div className="absolute top-0 right-0 p-20 opacity-5 pointer-events-none -rotate-12 translate-x-20 -translate-y-20">
                <Brain size={400} />
              </div>

              <div className="max-w-2xl relative z-10">
                <div className="flex items-center gap-4 text-red-500 text-xs font-bold uppercase tracking-[0.3em] mb-6">
                  <AlertTriangle size={16} /> Protocol Alpha: Cognitive Stress Test
                </div>
                <h3 className="text-4xl font-display font-bold text-white mb-8">The Paralysis Trap</h3>
                <p className="text-slate-400 text-lg mb-12 leading-relaxed">
                  Experience the mental fatigue caused by hyper-stimulation. As visual noise increases, the brain's ability to maintain focus and structural integrity collapses into "Mind Paralysis."
                </p>

                <div className="grid grid-cols-1 gap-10 mb-12">
                  <div className="space-y-4">
                    <div className="flex justify-between items-end">
                      <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-widest">Cognitive Clarity</span>
                      <span className="text-2xl font-display font-bold text-white">{Math.round(focusLevel)}%</span>
                    </div>
                    <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-emerald-400"
                        animate={{ width: `${focusLevel}%` }}
                        transition={{ type: "spring", stiffness: 50 }}
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex justify-between items-end">
                      <span className="text-[10px] text-red-500 font-bold uppercase tracking-widest">Dopamine Noise</span>
                      <span className="text-2xl font-display font-bold text-white">{Math.round(distractions)}%</span>
                    </div>
                    <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-red-500 shadow-[0_0_20px_rgba(239,68,68,0.5)]"
                        animate={{ width: `${distractions}%` }}
                        transition={{ type: "spring", stiffness: 50 }}
                      />
                    </div>
                  </div>
                </div>

                <button
                  onClick={triggerMindParalysis}
                  disabled={mindParalysisActive}
                  className={`group px-12 py-6 rounded-full font-bold uppercase tracking-widest text-xs transition-all relative overflow-hidden ${mindParalysisActive ? 'bg-red-500/10 text-red-500' : 'bg-white text-black hover:scale-105 active:scale-95'
                    }`}
                >
                  <span className="relative z-10">{mindParalysisActive ? 'Protocol Active...' : 'Initiate Paralysis Sequence'}</span>
                  {!mindParalysisActive && (
                    <div className="absolute inset-0 bg-sky-400 scale-x-0 group-hover:scale-x-100 transition-transform origin-left opacity-10" />
                  )}
                </button>
              </div>
            </div>
          </section>

          {/* Immersive Vertical Cards with Full Screen Shift */}
          <section className="space-y-16">
            <div className="text-center space-y-6">
              <div className="w-12 h-12 rounded-2xl bg-violet-400/10 flex items-center justify-center text-violet-400 mx-auto">
                <Heart size={24} />
              </div>
              <h3 className="text-5xl font-display font-bold text-white tracking-tight">Beyond the Screen</h3>
              <p className="text-slate-500 text-lg max-w-xl mx-auto italic">"True wealth is not in your wallet, but in the depth of your experiences."</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 h-[500px]">
              {Object.entries(themes).map(([id, theme]) => (
                <motion.div
                  key={id}
                  onMouseEnter={() => setHoveredCard(id)}
                  onMouseLeave={() => setHoveredCard(null)}
                  className={`relative rounded-[3rem] overflow-hidden cursor-pointer transition-all duration-700 ${hoveredCard === id ? 'md:col-span-2' : 'col-span-1'
                    } border border-white/5 group`}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${theme.color} opacity-20 group-hover:opacity-40 transition-opacity`} />
                  <div className="absolute inset-0 backdrop-blur-xl group-hover:backdrop-blur-none transition-all duration-1000" />

                  <div className="absolute inset-0 flex flex-col items-center justify-center p-12 text-center space-y-6">
                    <div className="w-16 h-16 rounded-[2rem] bg-white/5 border border-white/10 flex items-center justify-center text-white mb-4 group-hover:scale-110 group-hover:bg-white/10 transition-all duration-500">
                      {React.cloneElement(theme.icon as any, { size: 32 })}
                    </div>
                    <h4 className="text-2xl font-display font-bold text-white group-hover:tracking-widest transition-all duration-500">{theme.label}</h4>

                    <AnimatePresence>
                      {hoveredCard === id && (
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          className="space-y-4"
                        >
                          <p className="text-slate-200 text-sm leading-relaxed font-medium">{theme.detail}</p>
                          <div className="w-8 h-[1px] bg-white/20 mx-auto" />
                          <p className="text-slate-400 text-[10px] uppercase tracking-widest font-bold">{theme.sub}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Theme-specific visual elements */}
                  {id === 'nature' && <NatureAccents active={hoveredCard === id} />}
                  {id === 'connection' && <ConnectionAccents active={hoveredCard === id} />}
                </motion.div>
              ))}
            </div>
          </section>

          {/* Footer Quote */}
          <section className="text-center pt-20 border-t border-white/5">
            <p className="text-3xl md:text-5xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-slate-200 via-slate-500 to-slate-200 italic opacity-50 hover:opacity-100 transition-opacity duration-1000">
              "Real life happens in the gaps <br className="hidden md:block" /> between the pixels."
            </p>
          </section>

        </div>
      </div>
    </div>
  );
};

const NatureAccents: React.FC<{ active: boolean }> = ({ active }) => (
  <AnimatePresence>
    {active && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 pointer-events-none"
      >
        <div className="absolute top-10 left-10 text-emerald-500/20"><Leaf size={100} /></div>
        <div className="absolute bottom-10 right-10 text-emerald-500/20 rotate-180"><Leaf size={120} /></div>
      </motion.div>
    )}
  </AnimatePresence>
);

const ConnectionAccents: React.FC<{ active: boolean }> = ({ active }) => (
  <AnimatePresence>
    {active && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 pointer-events-none"
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-64 h-64 rounded-full border border-rose-500/50"
          />
        </div>
      </motion.div>
    )}
  </AnimatePresence>
);

export default FeelAliveView;

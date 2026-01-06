import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, ArrowRight, Play } from 'lucide-react';
import Folder from './Folder';
import { useStore } from '../lib/store';

interface HeroProps {
  onExplore: () => void;
  onWatchVision: () => void;
}

const Hero: React.FC<HeroProps> = ({ onExplore, onWatchVision }) => {
  const showcaseItems = useStore(state => state.showcaseItems);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <section className="relative min-h-screen flex flex-col md:flex-row items-center justify-center px-6 pt-32 pb-20 md:py-0 text-center md:text-left overflow-hidden gap-10 md:gap-20">
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-20 max-w-4xl"
      >
        <motion.div variants={item} className="mb-10 inline-flex items-center space-x-4 glass px-6 py-2 rounded-full border-sky-400/10">
          <div className="w-2 h-2 bg-yellow-200 rounded-full animate-pulse shadow-[0_0_10px_#fef08a]" />
          <span className="text-yellow-100 font-display uppercase tracking-[0.5em] text-[8px] font-bold block mb-4">Personal Scribbles</span>
          <span className="text-yellow-100 font-display uppercase tracking-[0.5em] text-[8px] font-bold">
            BUILDING THE FUTURE OF HUMAN INTELLIGENCE
          </span>
        </motion.div>

        <h1 className="relative font-display font-bold leading-[0.85] tracking-tighter mb-12">
          <motion.div
            className="text-[clamp(4rem,10vw,8rem)] text-white overflow-hidden"
            variants={item}
          >
            aman<span className="text-sky-300">kumar</span>
          </motion.div>
          <motion.div
            className="text-[clamp(4rem,12vw,10rem)] text-sky-400 flex items-center justify-start"
            variants={item}
          >
            Singh
            <motion.div
              className="ml-8 text-[10px] font-mono font-normal text-slate-600 border border-white/5 px-4 py-2 rounded-sm hidden xl:block"
              animate={{ rotateX: [0, 10, 0], rotateY: [0, 20, 0] }}
              transition={{ repeat: Infinity, duration: 5 }}
            >
              /EST. 1990s <br /> /BORN IN BIHAR <br /> /SCALED GLOBALLY
            </motion.div>
          </motion.div>
        </h1>

        <motion.p
          variants={item}
          className="text-slate-400 text-lg md:text-2xl max-w-2xl font-light leading-relaxed mb-16"
        >
          A <span className="text-white font-medium">Problem Solver</span> using smart teaching methods and AI tools to unlock the top 1% of human potential.
        </motion.p>

        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
          <button
            onClick={onExplore}
            className="group relative bg-sky-400 text-black px-10 py-4 rounded-full font-bold uppercase tracking-[0.2em] text-[10px] overflow-hidden hover:scale-105 transition-transform"
          >
            <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            <span className="relative z-10 flex items-center gap-2">
              Explore The Archive <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </span>
          </button>

          <button
            onClick={() => {
              const el = document.getElementById('skillset');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="group relative px-8 py-4 rounded-full font-bold uppercase tracking-[0.2em] text-[10px] border border-white/20 hover:border-sky-400/50 hover:bg-sky-400/10 transition-all text-slate-300 hover:text-white"
          >
            skillSET
          </button>

          <button onClick={onWatchVision} className="flex items-center gap-3 text-white group px-4 py-2 opacity-80 hover:opacity-100 transition-opacity">
            <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-white/5 transition-all">
              <Play size={12} fill="white" />
            </div>
            <span className="text-[10px] uppercase font-bold tracking-widest text-slate-500 group-hover:text-white transition-colors">
              Watch The Vision
            </span>
          </button>
        </div>
      </motion.div>

      {/* Dynamic Folder Showcase */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="relative -rotate-6 z-10 md:ml-5"
      >
        <Folder
          color="#38bdf8"
          size={typeof window !== 'undefined' && window.innerWidth < 768 ? 0.9 : 1.5}
          items={showcaseItems.slice(0, 3).map((item, idx) => (
            item.image ? (
              <img key={item.id} src={item.image} className="w-full h-full object-cover rounded-[10px]" alt={item.title} />
            ) : (
              <div key={item.id} className={`w-full h-full ${idx === 0 ? 'bg-slate-800' : idx === 1 ? 'bg-slate-700' : 'bg-slate-600'} flex items-center justify-center text-[8px] text-white uppercase font-bold text-center p-2`}>
                {item.title}
              </div>
            )
          ))}
        />
        <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 text-[8px] font-bold uppercase tracking-widest text-sky-400/50 animate-pulse whitespace-nowrap">
          Interactive Docket // Hover to Decrypt
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.2 }}
        className="absolute bottom-10 left-10 text-[10px] font-bold text-slate-700 uppercase tracking-[0.5em] vertical-rl h-40 border-l border-white/5 pl-4"
      >
        Scroll For Deep Dive
      </motion.div>
    </section>
  );
};

export default Hero;

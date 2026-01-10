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
    <section className="relative min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 pt-24 md:pt-32 pb-16 md:pb-20 text-center overflow-hidden gap-8 sm:gap-10 md:gap-16 w-full">
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-20 max-w-4xl text-center w-full px-4"
      >
        <motion.div variants={item} className="mb-4 sm:mb-6 md:mb-10 inline-flex flex-col items-center space-y-1 sm:space-y-2 md:space-y-4 glass px-3 sm:px-4 md:px-6 py-2 sm:py-3 md:py-2 rounded-full border-sky-400/10">
          <div className="w-2 h-2 bg-yellow-200 rounded-full animate-pulse shadow-[0_0_10px_#fef08a]" />
          <span className="text-yellow-100 font-display uppercase tracking-[0.25em] sm:tracking-[0.3em] md:tracking-[0.5em] text-[5px] sm:text-[6px] md:text-[8px] font-bold text-center">Personal Scribbles</span>
          <span className="text-yellow-100 font-display uppercase tracking-[0.15em] sm:tracking-[0.2em] md:tracking-[0.5em] text-[4px] sm:text-[5px] md:text-[8px] font-bold text-center">
            BUILDING THE FUTURE OF HUMAN INTELLIGENCE
          </span>
        </motion.div>

        <h1 className="relative font-display font-bold leading-[0.95] sm:leading-[0.9] md:leading-[0.85] tracking-tighter mb-4 sm:mb-6 md:mb-12 text-center">
          <motion.div
            className="text-[clamp(2rem,8vw,6rem)] sm:text-[clamp(2.5rem,8vw,6rem)] md:text-[clamp(4rem,10vw,8rem)] text-white overflow-hidden"
            variants={item}
          >
            aman<span className="text-sky-300">kumar</span>
          </motion.div>
          <motion.div
            className="text-[clamp(2rem,10vw,8rem)] sm:text-[clamp(2.5rem,10vw,8rem)] md:text-[clamp(4rem,12vw,10rem)] text-sky-400 flex flex-col items-center justify-center mt-2"
            variants={item}
          >
            Singh
            <motion.div
              className="mt-2 text-[6px] sm:text-[8px] md:text-[10px] font-mono font-normal text-slate-600 border border-white/5 px-2 sm:px-3 md:px-4 py-1 sm:py-1.5 md:py-2 rounded-sm hidden xl:block"
              animate={{ rotateX: [0, 10, 0], rotateY: [0, 20, 0] }}
              transition={{ repeat: Infinity, duration: 5 }}
            >
              /EST. 1990s <br /> /BORN IN BIHAR <br /> /SCALED GLOBALLY
            </motion.div>
          </motion.div>
        </h1>

        <motion.p
          variants={item}
          className="text-slate-400 text-sm sm:text-base md:text-xl lg:text-2xl max-w-2xl lg:max-w-3xl font-light leading-relaxed mb-4 sm:mb-6 md:mb-12 px-2 sm:px-4 text-center"
        >
          A <span className="text-white font-medium">Problem Solver</span> using smart teaching methods and AI tools to unlock the top 1% of human potential.
        </motion.p>

        <div className="flex flex-col md:flex-row items-center justify-center gap-3 sm:gap-4 md:gap-6 w-full max-w-2xl lg:max-w-3xl">
          <button
            onClick={onExplore}
            className="group relative bg-sky-400 text-black px-6 sm:px-8 py-2.5 sm:py-3 md:px-10 md:py-4 rounded-full font-bold uppercase tracking-[0.1em] sm:tracking-[0.15em] md:tracking-[0.2em] text-[8px] sm:text-[9px] md:text-[10px] overflow-hidden hover:scale-105 transition-transform w-full"
          >
            <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            <span className="relative z-10 flex items-center justify-center gap-1 sm:gap-2">
              Explore The Archive <ArrowRight size={10} sm:size={12} md:size={14} className="group-hover:translate-x-1 transition-transform" />
            </span>
          </button>

          <button
            onClick={() => {
              const el = document.getElementById('skillset');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="group relative px-4 sm:px-6 py-2.5 sm:py-3 md:px-8 md:py-4 rounded-full font-bold uppercase tracking-[0.1em] sm:tracking-[0.15em] md:tracking-[0.2em] text-[8px] sm:text-[9px] md:text-[10px] border border-white/20 hover:border-sky-400/50 hover:bg-sky-400/10 transition-all text-slate-300 hover:text-white w-full"
          >
            skillSET
          </button>

          <button onClick={onWatchVision} className="flex items-center justify-center gap-2 sm:gap-3 text-white group px-3 sm:px-4 py-1.5 sm:py-2 opacity-80 hover:opacity-100 transition-opacity mt-3 sm:mt-4 md:mt-0">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-white/5 transition-all">
              <Play size={10} sm:size={12} fill="white" />
            </div>
            <span className="text-[7px] sm:text-[9px] md:text-[10px] uppercase font-bold tracking-widest text-slate-500 group-hover:text-white transition-colors">
              Watch The Vision
            </span>
          </button>
        </div>
      </motion.div>

      {/* Dynamic Folder Showcase */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="relative -rotate-6 z-10 mt-6 sm:mt-8 md:mt-12 self-center"
      >
        <Folder
          color="#38bdf8"
          size={typeof window !== 'undefined' && window.innerWidth < 768 ? 0.8 : 1.0}
          items={showcaseItems.slice(0, 3).map((item, idx) => (
            item.image ? (
              <img key={item.id} src={item.image} className="w-full h-full object-cover rounded-[8px] sm:rounded-[10px]" alt={item.title} />
            ) : (
              <div key={item.id} className={`w-full h-full ${idx === 0 ? 'bg-slate-800' : idx === 1 ? 'bg-slate-700' : 'bg-slate-600'} flex items-center justify-center text-[7px] sm:text-[8px] text-white uppercase font-bold text-center p-1.5 sm:p-2`}>
                {item.title}
              </div>
            )
          ))}
        />
        <div className="absolute -bottom-6 sm:-bottom-8 md:-bottom-10 left-1/2 -translate-x-1/2 text-[6px] sm:text-[7px] md:text-[8px] font-bold uppercase tracking-widest text-sky-400/50 animate-pulse whitespace-nowrap">
          Interactive Docket // Hover to Decrypt
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.2 }}
        className="hidden lg:block absolute bottom-8 sm:bottom-10 left-1/2 transform -translate-x-1/2 text-[8px] sm:text-[10px] font-bold text-slate-700 uppercase tracking-[0.4em] sm:tracking-[0.5em] h-40 border-b border-white/5 pt-4"
      >
        Scroll For Deep Dive
      </motion.div>
    </section>
  );
};

export default Hero;

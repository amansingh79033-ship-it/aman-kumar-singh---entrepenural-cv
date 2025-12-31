
import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, ArrowRight, Play } from 'lucide-react';

interface HeroProps {
  onExplore: () => void;
}

const Hero: React.FC<HeroProps> = ({ onExplore }) => {
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
    <section className="relative h-screen flex flex-col items-center justify-center px-6 text-center overflow-hidden">
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-20 max-w-7xl"
      >
        <motion.div variants={item} className="mb-10 inline-flex items-center space-x-4 glass px-6 py-2 rounded-full border-sky-400/10">
          <div className="w-2 h-2 bg-yellow-200 rounded-full animate-pulse shadow-[0_0_10px_#fef08a]" />
          <span className="text-yellow-100 font-display uppercase tracking-[0.5em] text-[8px] font-bold">
            ARCHIVING THE SOVEREIGN INTELLECT PHENOMENON
          </span>
        </motion.div>

        <h1 className="relative font-display font-bold leading-[0.85] tracking-tighter mb-12">
          <motion.div
            className="text-[clamp(4rem,12vw,10rem)] text-white overflow-hidden"
            variants={item}
          >
            aman<span className="text-sky-300">kumar</span>
          </motion.div>
          <motion.div
            className="text-[clamp(4rem,15vw,12rem)] text-sky-400 flex items-center justify-center"
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
          className="text-slate-400 text-lg md:text-2xl max-w-3xl mx-auto font-light leading-relaxed mb-16"
        >
          A <span className="text-white font-medium">Problem Solver</span> deploying sovereign pedagogy and AHI protocols to unlock the top 1% of human potential.
        </motion.p>

        <motion.div variants={item} className="flex flex-col md:flex-row items-center justify-center gap-8">
          <button
            onClick={onExplore}
            className="group relative bg-sky-400 text-black px-12 py-5 rounded-full font-bold uppercase tracking-[0.2em] text-[10px] overflow-hidden"
          >
            <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            <span className="relative z-10 flex items-center gap-3">
              Explore The Archive <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </span>
          </button>

          <button className="flex items-center gap-4 text-white group">
            <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-white/5 transition-all">
              <Play size={14} fill="white" />
            </div>
            <span className="text-[10px] uppercase font-bold tracking-widest text-slate-500 group-hover:text-white transition-colors">
              Watch The Vision
            </span>
          </button>
        </motion.div>
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

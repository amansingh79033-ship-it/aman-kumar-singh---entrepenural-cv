
import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Brain, Rocket, Users } from 'lucide-react';

const Mechanics: React.FC = () => {
  const cards = [
    {
      icon: <Zap className="text-sky-400" />,
      title: "Inquisitive Velocity",
      desc: "Measuring the speed and depth at which a student moves from a question to a synthesized concept."
    },
    {
      icon: <Brain className="text-yellow-200" />,
      title: "CuriousONE Program",
      desc: "A 6-week high-intensity cycle blending live mentorship with hands-on, real-world problem solving."
    },
    {
      icon: <Rocket className="text-sky-400" />,
      title: "Unchi hai Building for Talent",
      desc: "Integrating self-development libraries with future skills (AI, Coding, Critical Thinking)."
    },
    {
      icon: <Users className="text-yellow-200" />,
      title: "Community Referral Flywheel",
      desc: "Lean operational model relying on viral growth via user credits rather than heavy ad spend."
    }
  ];

  return (
    <section id="mechanics" className="py-24 px-6 relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-yellow-100 font-display uppercase tracking-widest text-xs font-bold block mb-4"
          >
            Core Mechanics
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-display font-bold text-white mb-6"
          >
            The Pedagogical <span className="text-sky-300">Engine</span>
          </motion.h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            Shifting the educational paradigm from rote memorization to "Curiosity-First" competency.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {cards.map((card, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className="glass p-8 rounded-2xl border-white/5 group hover:border-sky-400/50 transition-all"
            >
              <div className="mb-6 p-4 bg-white/5 w-fit rounded-xl group-hover:scale-110 transition-transform">
                {card.icon}
              </div>
              <h3 className="text-xl font-display font-bold text-white mb-4">{card.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">{card.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Mechanics;

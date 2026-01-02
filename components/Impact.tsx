
import React from 'react';
import { motion } from 'framer-motion';

const Impact: React.FC = () => {
  const stats = [
    { label: "Portfolio Valuation", value: "₹30 Cr+" },
    { label: "Total Investment", value: "< ₹3 L" },
    { label: "Efficiency Ratio", value: "100x" },
    { label: "Unchi hai Building", value: "8+" }
  ];

  return (
    <section id="impact" className="py-24 px-6 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="glass p-12 md:p-24 rounded-[4rem] border-sky-400/10 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-sky-400/5 blur-[120px] rounded-full" />
          
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div>
              <span className="text-sky-400 font-display uppercase tracking-[0.3em] text-[10px] font-bold block mb-4">Financial Engineering</span>
              <h2 className="text-5xl md:text-7xl font-display font-bold text-white mb-8">
                The Efficiency <br /><span className="text-yellow-100">Peak.</span>
              </h2>
              <p className="text-slate-400 text-lg leading-relaxed font-light mb-8">
                Operating in the 'Bharat Valley' means leveraging deep resilience. Aman built a ₹30Cr ecosystem with less than ₹3L investment—a testament to problem-solving over capital-burning.
              </p>
              <div className="flex items-center space-x-6">
                <div className="h-[2px] w-20 bg-sky-400" />
                <span className="text-xs uppercase tracking-[0.2em] text-sky-300 font-bold italic">Global Level Scaling</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-12">
              {stats.map((stat, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <div className="text-4xl md:text-5xl font-display font-bold text-white mb-2">
                    {stat.value}
                  </div>
                  <div className="text-[10px] uppercase tracking-widest text-slate-500 font-bold border-t border-white/5 pt-4">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Impact;

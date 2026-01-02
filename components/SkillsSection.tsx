
import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Cpu, Search, Activity, Terminal, Layers } from 'lucide-react';

const SkillCard = ({ title, icon, skills, color }: any) => (
  <motion.div 
    whileHover={{ y: -5 }}
    className="glass p-8 rounded-[2rem] border-white/5 hover:border-sky-400/30 transition-all group"
  >
    <div className={`mb-6 p-4 rounded-2xl bg-white/5 w-fit ${color} group-hover:scale-110 transition-transform`}>
      {icon}
    </div>
    <h3 className="text-xl font-display font-bold text-white mb-6 uppercase tracking-wider">{title}</h3>
    <div className="flex flex-wrap gap-2">
      {skills.map((s: string) => (
        <span key={s} className="px-3 py-1 bg-white/5 rounded-full text-[10px] text-slate-400 font-bold uppercase tracking-widest border border-white/5 group-hover:border-sky-400/20">
          {s}
        </span>
      ))}
    </div>
  </motion.div>
);

const SkillsSection: React.FC = () => {
  return (
    <section id="systems" className="py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div>
            <span className="text-sky-400 font-display uppercase tracking-[0.4em] text-[10px] font-bold block mb-4">Skill Architecture</span>
            <h2 className="text-5xl md:text-7xl font-display font-bold text-white leading-none">
              The Polymath <br /><span className="text-sky-300">Stack.</span>
            </h2>
          </div>
          <p className="text-slate-500 max-w-sm text-sm leading-relaxed">
            Diverse competencies ranging from high-level theoretical physics to ground-level product forensics.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <SkillCard 
            title="Cognitive Layer" 
            icon={<Brain size={24} />}
            skills={["String Theory", "AHI Protocol", "Neural Syncs", "Mindset Mapping"]}
            color="text-yellow-200"
          />
          <SkillCard 
            title="Unchi hai Building"
            icon={<Layers size={24} />}
            skills={["PropTech", "EdTech", "SaaS Architecture", "Market Forensics"]}
            color="text-sky-300"
          />
          <SkillCard 
            title="Technical Layer" 
            icon={<Terminal size={24} />}
            skills={["Full-Stack", "TensorFlow", "React/Node", "System Sovereignty"]}
            color="text-white"
          />
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;

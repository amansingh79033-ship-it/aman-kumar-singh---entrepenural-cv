
import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Layers, Database, Activity, Zap, Shield, Repeat, Globe } from 'lucide-react';

const UnchiHaiBuildingView: React.FC = () => {
  const projects = [
    { name: "CuriousMinds.online", tagline: "AI-Driven Adaptive Learning Platform. Current Valuation: ₹30Cr.", sector: "AHI / EdTech", status: "Active Scaling", link: "https://curiousminds.online", icon: <Zap /> },
    { name: "Propsynx.xyz", tagline: "One-tap property background verification and deep-dive analysis of the last 100 years.", sector: "PropTech", status: "MVP", icon: <Repeat />, link: "https://propsynx.xyz" },
    { name: "Propertyfie.com", tagline: "Decentralized Asset Management & Liquidity Protocol.", sector: "Real Estate", status: "Beta", icon: <Shield />, link: "https://amansingh79033-ship-it-propy.vercel.app/" },
    { name: "Floww.site", tagline: "Sovereign Workflow Orchestration & Automation Suite.", sector: "SaaS", status: "Internal", icon: <Activity />, link: "https://floww.site" },
    { name: "Metric.wtf", tagline: "Real-time Market Forensics & Behavioral Analytics Lab.", sector: "Data Analytics", status: "Research", icon: <Database /> },
    { name: "Engine Ocean", tagline: "Topic-focused advanced search engine with AI filtering for CuriousMinds Pro users.", sector: "AI / Search", status: "Active", icon: <Layers />, link: "https://copy-of-curiousminds-final-version.vercel.app/" },
    { name: "ShareU", tagline: "Open-Source Infinite-Scale Media Transfer. Optional E2E encryption & size-agnostic propagation.", sector: "AdTech", status: "Profitably Lean", icon: <Globe />, link: "https://ipmetric.xyz" },
    { name: "AGENTref", tagline: "Headless Automation Engine with autonomous Gmail OTP extraction & flow completion.", sector: "Automated Workflows", status: "Early Access", icon: <Zap /> },
  ];

  return (
    <div className="pt-32 pb-20 px-6 min-h-screen max-w-7xl mx-auto">
      <div className="mb-20">
        <h2 className="text-6xl font-display font-bold text-white mb-6">The <span className="text-sky-300">Portfolio</span></h2>
        <p className="text-slate-500 text-lg">8+ Unchi hai Building. 1 Vision. Sovereign Tech Stacks.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {projects.map((p, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="group glass p-10 rounded-[2.5rem] border-white/5 hover:border-sky-400/30 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="text-sky-300 mb-8 p-4 bg-white/5 w-fit rounded-2xl group-hover:bg-sky-400 group-hover:text-black transition-all">
                {p.icon}
              </div>
              {p.link ? (
                <a href={p.link} target="_blank" rel="noopener noreferrer" className="group/link flex items-center gap-2">
                  <h3 className="text-xl font-display font-bold text-white mb-2 group-hover/link:text-sky-300 transition-colors">{p.name}</h3>
                  <ExternalLink className="w-4 h-4 text-slate-500 group-hover/link:text-sky-300 transition-colors opacity-0 group-hover/link:opacity-100 translate-x-[-10px] group-hover/link:translate-x-0 transition-all" />
                </a>
              ) : (
                <h3 className="text-xl font-display font-bold text-white mb-2">{p.name}</h3>
              )}
              <p className="text-slate-500 text-xs font-light leading-relaxed mb-8">{p.tagline}</p>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center text-[8px] font-bold uppercase tracking-widest text-slate-400">
                <span>Sector</span>
                <span className="text-white">{p.sector}</span>
              </div>
              <div className="flex justify-between items-center text-[8px] font-bold uppercase tracking-widest text-slate-400">
                <span>Status</span>
                <span className="text-yellow-100">{p.status}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default UnchiHaiBuildingView;

import React, { useState, useEffect } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Brain, Cuboid, Globe, Zap, ArrowRight, Activity, TrendingUp, Lock, Users } from 'lucide-react';

const ChartLine: React.FC = () => (
    <svg viewBox="0 0 100 40" className="w-full h-auto text-sky-400 overflow-visible">
        <path d="M0 35 C 20 35, 20 10, 40 10 C 60 10, 60 25, 80 25 C 90 25, 90 5, 100 5" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="100" strokeDashoffset="0">
            <animate attributeName="stroke-dashoffset" from="100" to="0" dur="2s" fill="freeze" />
        </path>
        <circle cx="0" cy="35" r="1.5" fill="currentColor" />
        <circle cx="40" cy="10" r="1.5" fill="currentColor" />
        <circle cx="80" cy="25" r="1.5" fill="currentColor" />
        <circle cx="100" cy="5" r="1.5" fill="white" />
        {/* Gradient Fill */}
        <path d="M0 35 C 20 35, 20 10, 40 10 C 60 10, 60 25, 80 25 C 90 25, 90 5, 100 5 V 40 H 0 Z" fill="currentColor" fillOpacity="0.1" stroke="none" />
    </svg>
);

const ChartBar: React.FC = () => (
    <div className="flex items-end justify-between h-32 gap-2">
        {[30, 50, 45, 70, 60, 85, 95].map((h, i) => (
            <motion.div
                key={i}
                initial={{ height: 0 }}
                whileInView={{ height: `${h}%` }}
                transition={{ duration: 0.8, delay: i * 0.1 }}
                className="w-full bg-sky-500/20 rounded-t-sm relative group"
            >
                <div className="absolute inset-x-0 top-0 h-1 bg-sky-400/50" />
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] text-white opacity-0 group-hover:opacity-100 transition-opacity">{h}%</div>
            </motion.div>
        ))}
    </div>
);

const ChartScatter: React.FC = () => (
    <svg viewBox="0 0 100 50" className="w-full h-auto text-sky-400">
        {[...Array(20)].map((_, i) => (
            <motion.circle
                key={i}
                initial={{ opacity: 0, r: 0 }}
                whileInView={{ opacity: 0.6, r: Math.random() * 2 + 1 }}
                cx={Math.random() * 100}
                cy={Math.random() * 50}
                fill="currentColor"
                transition={{ duration: 0.5, delay: i * 0.05 }}
            />
        ))}
        <path d="M0 50 L 100 0" stroke="white" strokeWidth="0.2" strokeDasharray="2 2" opacity="0.5" />
    </svg>
);

const Section: React.FC<{
    id: string;
    title: string;
    subtitle: string;
    icon: React.ReactNode;
    content: React.ReactNode;
    chart: React.ReactNode;
    stats: { label: string; value: string; trend?: string }[];
}> = ({ id, title, subtitle, icon, content, chart, stats }) => (
    <div id={id} className="min-h-screen py-20 border-l border-white/5 pl-8 md:pl-20 relative flex flex-col justify-center">
        <div className="absolute left-[-21px] top-28 w-11 h-11 bg-black border border-white/10 rounded-full flex items-center justify-center text-sky-400 z-10 transition-colors duration-500 hover:bg-sky-500/10">
            {icon}
        </div>

        <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ margin: "-100px" }}
            className="mb-12"
        >
            <span className="text-sky-400 font-display uppercase tracking-widest text-xs font-bold block mb-2">{subtitle}</span>
            <h2 className="text-4xl md:text-6xl font-display font-bold text-white mb-6">{title}</h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div className="space-y-6 text-slate-400 text-lg font-light leading-relaxed">
                {content}
            </div>

            <div className="space-y-8">
                {/* Data Visualization Card */}
                <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-sm shadow-2xl shadow-sky-900/5 group transition-all hover:border-sky-500/20">
                    <div className="flex justify-between items-center mb-8">
                        <h4 className="text-white font-bold uppercase tracking-widest text-xs">Performance Metrics</h4>
                        <Activity size={16} className="text-sky-400" />
                    </div>
                    <div className="mb-8">
                        {chart}
                    </div>
                </div>

                {/* Key Stats Grid */}
                <div className="grid grid-cols-2 gap-4">
                    {stats.map((stat, i) => (
                        <div key={i} className="bg-white/[0.02] border border-white/5 rounded-2xl p-6 hover:bg-white/[0.05] transition-colors">
                            <div className="text-[10px] text-slate-500 uppercase tracking-widest font-bold mb-2">{stat.label}</div>
                            <div className="text-2xl md:text-3xl font-display font-bold text-white flex items-end gap-2">
                                {stat.value}
                                {stat.trend && <span className="text-[10px] text-emerald-400 mb-1.5 font-sans font-normal tracking-normal">{stat.trend}</span>}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </div>
);

const InterestsView: React.FC = () => {
    // We don't need local Lenis implementation as it's handled globally in App.tsx.
    // However, we ensure this component renders a long scrollable document.

    const [activeSection, setActiveSection] = useState('cognitive');

    useEffect(() => {
        const handleScroll = () => {
            // Using a simple proximity check for the sidebar highlight
            const sections = ['cognitive', 'tokenized', 'logistics', 'pedagogy'];

            // Find the section closest to the top of the viewport
            let current = sections[0];
            let minDistance = Infinity;

            for (const section of sections) {
                const el = document.getElementById(section);
                if (el) {
                    const rect = el.getBoundingClientRect();
                    // We check distance to a point roughly 1/3 down the screen
                    const distance = Math.abs(rect.top - window.innerHeight / 3);
                    if (distance < minDistance) {
                        minDistance = distance;
                        current = section;
                    }
                }
            }
            setActiveSection(current);
        };

        window.addEventListener('scroll', handleScroll);
        // Initial check
        handleScroll();

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollTo = (id: string) => {
        const el = document.getElementById(id);
        if (el) {
            // Use native smooth scroll which Lenis will intercept and smooth out
            el.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto relative flex flex-col md:flex-row gap-12">

            {/* Sticky Sidebar Navigation - Enhanced */}
            <div className="md:w-64 flex-shrink-0 hidden md:block">
                <div className="sticky top-40 space-y-10">
                    <div className="mb-12">
                        <h3 className="text-white font-display font-bold text-3xl mb-2 tracking-tight">Systems</h3>
                        <p className="text-slate-500 text-[10px] uppercase tracking-[0.2em] font-bold">Research & Methodology</p>
                    </div>

                    <nav className="space-y-1 relative">
                        {/* Active Indicator Line */}
                        <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-white/10" />

                        {[
                            { id: 'cognitive', label: 'Cognitive Augmentation', icon: Brain },
                            { id: 'tokenized', label: 'Tokenized Sovereignty', icon: Cuboid },
                            { id: 'logistics', label: 'Interstellar Logistics', icon: Globe },
                            { id: 'pedagogy', label: 'Hyper-Pedagogy', icon: Zap },
                        ].map((item) => {
                            const isActive = activeSection === item.id;
                            const Icon = item.icon;
                            return (
                                <button
                                    key={item.id}
                                    onClick={() => scrollTo(item.id)}
                                    className={`group flex items-center gap-3 w-full text-left px-4 py-3 rounded-lg text-sm transition-all duration-300 relative overflow-hidden ${isActive
                                            ? 'text-sky-400 bg-sky-400/[0.08]'
                                            : 'text-slate-500 hover:text-white hover:bg-white/[0.03]'
                                        }`}
                                >
                                    {isActive && (
                                        <motion.div
                                            layoutId="sidebar-active"
                                            className="absolute left-0 top-0 bottom-0 w-[2px] bg-sky-400"
                                        />
                                    )}
                                    <Icon size={14} className={isActive ? 'text-sky-400' : 'text-slate-600 group-hover:text-slate-400'} />
                                    <span className="font-medium tracking-tight">{item.label}</span>
                                </button>
                            );
                        })}
                    </nav>

                    <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 backdrop-blur-sm">
                        <div className="flex items-center justify-between mb-2">
                            <div className="text-[9px] text-slate-500 uppercase tracking-widest font-bold">System Status</div>
                            <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                        </div>
                        <div className="text-xs font-mono text-emerald-400">All Metrics Nominal</div>
                    </div>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 min-w-0">
                <div className="mb-20 pl-8 md:pl-20 border-l border-white/5 border-dashed relative">
                    <div className="absolute -left-[3px] top-0 w-1.5 h-1.5 bg-white/20 rounded-full" />
                    <p className="text-slate-400 text-lg md:text-xl max-w-2xl font-light leading-relaxed">
                        A rigorous architectural breakdown of the four pillars defining the next century of human-machine evolution.
                        Data sourced from internal AHI simulations, public ledger forensics, and orbital pathfinding algorithms.
                    </p>
                </div>

                <div className="relative">
                    {/* Continuous Timeline Line */}
                    <div className="absolute left-[-1px] top-0 bottom-0 w-[2px] bg-gradient-to-b from-sky-500 via-sky-900/20 to-transparent" />

                    <Section
                        id="cognitive"
                        title="Cognitive Augmentation"
                        subtitle="The Synthesized Mind"
                        icon={<Brain size={20} />}
                        content={
                            <>
                                <p>AHI (Assistance to Human Intelligence) posits that the detailed bottleneck of human productivity is no longer information access, but information <strong>synthesis</strong>.</p>
                                <p>Our research indicates that the average knowledge worker spends 40% of their cognitive load on 'context switching' and memory retrieval. By offloading these compute-heavy tasks to a neural exoskeleton, we reclaim purely creative bandwidth.</p>
                                <blockquote className="pl-4 border-l-2 border-sky-400 italic text-white my-6">"It is not about Faster Thought. It is about Deeper Thought."</blockquote>
                                <p>We implement real-time knowledge graphs that map intent to execution, effectively giving a single individual the output capacity of a pre-AI corporation.</p>
                            </>
                        }
                        chart={<ChartLine />}
                        stats={[
                            { label: "Synthesis Velocity", value: "100x", trend: "+12%" },
                            { label: "Context Retention", value: "99.9%" },
                        ]}
                    />

                    <Section
                        id="tokenized"
                        title="Tokenized Sovereignty"
                        subtitle="The New Real Estate"
                        icon={<Cuboid size={20} />}
                        content={
                            <>
                                <p>Deconstructing physical assets into liquid, programmable truth. Real Estate is the world's largest asset class ($300T+), yet it remains illiquid and gatekept.</p>
                                <p><strong>Propsynx</strong> demonstrates that by creating a programmable layer of ownership, property rights can move with the velocity of information, reducing settlement times from 30 days to 30 seconds. This unlocks dead capital and democratizes access to high-yield asset classes.</p>
                                <ul className="list-disc list-inside space-y-2 mt-4 text-slate-500">
                                    <li>Fractional ownership down to the square millimeter.</li>
                                    <li>Instant collateralization for DeFi protocols.</li>
                                    <li>Automated yield distribution via smart contracts.</li>
                                </ul>
                            </>
                        }
                        chart={<ChartBar />}
                        stats={[
                            { label: "Liquidity Multiplier", value: "300%", trend: "Proj." },
                            { label: "Settlement Time", value: "< 1s" },
                        ]}
                    />

                    <Section
                        id="logistics"
                        title="Interstellar Logistics"
                        subtitle="Supply Chains in Zero-G"
                        icon={<Globe size={20} />}
                        content={
                            <>
                                <p>Optimizing the flow of atoms across the vacuum. As we transition to a multi-planetary species, the logic of supply chains must evolve from 2D maps to 3D orbital mechanics.</p>
                                <p><strong>Engine Ocean</strong> simulates demand prediction across light-minutes, ensuring that the bottleneck of space colonization is not biology, but logistics. We utilize porkchop plots to optimize for Delta-V efficiency rather than just time-to-destination.</p>
                            </>
                        }
                        chart={<ChartScatter />}
                        stats={[
                            { label: "Hohmann Efficiency", value: "94%" },
                            { label: "Payload Ratio", value: "1:20" },
                        ]}
                    />

                    <Section
                        id="pedagogy"
                        title="Hyper-Pedagogy"
                        subtitle="The End of Factory Education"
                        icon={<Zap size={20} />}
                        content={
                            <>
                                <p>Education that adapts to the learner's neuro-signature. The factory model treats every mind as identical, resulting in a systemic failure of engagement.</p>
                                <p><strong>CuriousMinds</strong> leverages real-time feedback loops to adjust curriculum difficulty dynamically, maintaining the learner in a permanent 'Flow State'. By monitoring engagement retention, we can predict and prevent curiosity decay before it happens.</p>
                            </>
                        }
                        chart={
                            <div className="h-32 flex items-center justify-center relative">
                                <div className="absolute inset-0 flex items-center justify-center opacity-20">
                                    <div className="w-full h-[1px] bg-white" />
                                    <div className="h-full w-[1px] bg-white absolute" />
                                </div>
                                <div className="relative w-24 h-24 rounded-full border-4 border-sky-900/30 border-t-sky-400 rotate-45 animate-spin"></div>
                                <div className="absolute inset-0 flex items-center justify-center text-white font-bold tracking-widest text-xs uppercase">Flow State</div>
                            </div>
                        }
                        stats={[
                            { label: "Retention Rate", value: "95%", trend: "vs 15%" },
                            { label: "Curiosity Index", value: "9.8/10" },
                        ]}
                    />
                </div>
            </div>
        </div>
    );
};

export default InterestsView;

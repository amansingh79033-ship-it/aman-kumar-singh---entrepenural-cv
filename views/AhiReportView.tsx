
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, BookOpen, Shield, Zap, Target, Cpu, MessageSquare, History, TrendingUp, HelpCircle, Layers, Fingerprint, BrainCircuit } from 'lucide-react';

interface AhiReportViewProps {
    onBack: () => void;
}

const AhiReportView: React.FC<AhiReportViewProps> = ({ onBack }) => {
    const timelineData = [
        { date: 'March 2022', title: 'The Genesis', desc: 'Initial research into cognitive offloading and the limits of purely generative AI. Identified the "Agency Gap" where LLMs replace rather than assist.' },
        { date: 'June 2022', title: 'Context Anchoring', desc: 'Developed the first stable prototypes for user-locked context anchors, allowing AI to maintain long-term personal knowledge graphs.' },
        { date: 'August 2022', title: 'Symbiotic Framework', desc: 'Developing the first prototypes of "Shadow Context" retrieval systems. Formalized the AHI Protocol v0.1.' },
        { date: 'November 2022', title: 'Neural Handshake', desc: 'Testing real-time latency optimization for cognitive assistance. Achieved sub-100ms context retrieval.' },
        { date: 'January 2023', title: 'Vector Integration', desc: 'Transitioning from static memory to dynamic vector-retrieval based assistance. Integrated HNSW indexing for high-speed search.' },
        { date: 'April 2023', title: 'Prompt Resonators', desc: 'Developed automated prompt engineering layers that adapt to user thinking patterns without manual interference.' },
        { date: 'July 2023', title: 'The AHI Manifesto', desc: 'Formalizing the distinction between Assistance and Artificial Intelligence. Published the "Think With Us" whitepaper.' },
        { date: 'October 2023', title: 'Multi-Modal Scaffolding', desc: 'Expanding AHI to visual and spatial reasoning. Integrating image-to-context pipelines.' },
        { date: 'December 2023', title: 'Agentic Workflows', desc: 'Introduction of autonomous verifiers and research synthesis agents. AI now checks its own assumptions against user facts.' },
        { date: 'March 2024', title: 'Privacy Sovereignty', desc: 'Implementation of localized embedding models for zero-leakage research environments.' },
        { date: 'June 2024', title: 'Local Sovereignty', desc: 'Migrating core AHI protocols to private, edge-processed environments. Fully decentralized context storage.' },
        { date: 'September 2024', title: 'Cognitive Compression', desc: 'Developed "Memory Distillation" algorithms to synthesize months of research into active "Shadow Context" nodes.' },
        { date: 'December 2024', title: 'Enterprise Scaffolding', desc: 'BETA testing of Ahi-Connect for high-frequency trading and legal research environments.' },
        { date: 'March 2025', title: 'The Singularity Scaffold', desc: 'Completion of high-fidelity cognitive scaffolding for global deployment. The AHI protocol reaches maturity.' }
    ];

    return (
        <div className="pt-32 pb-20 px-6 min-h-screen max-w-5xl mx-auto selection:bg-sky-500/30">
            {/* Navigation / Back Button */}
            <motion.button
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                onClick={onBack}
                className="flex items-center gap-2 text-sky-400 font-bold uppercase tracking-widest text-xs mb-12 hover:text-sky-300 transition-colors group"
            >
                <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                Back to Intelligence
            </motion.button>

            {/* Header */}
            <header className="mb-20">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-6"
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-yellow-500/10 border border-yellow-500/20 rounded-full text-yellow-400 text-[10px] font-bold uppercase tracking-[0.2em]">
                        <BookOpen size={12} /> Research Report // R-105-EXPANDED-V2
                    </div>
                    <h1 className="text-4xl md:text-7xl font-display font-bold text-white leading-tight">
                        Deep Dive: <br />
                        <span className="text-sky-400 text-glow">The AHI Nexus</span>
                    </h1>
                    <p className="text-slate-400 text-xl font-light italic border-l-2 border-sky-500/50 pl-6 py-2 max-w-2xl">
                        "We need some tech to think with us, not for us!" — Engineering the future of symbiotic intelligence.
                    </p>
                </motion.div>
            </header>

            {/* Visual Section: Scaffolding */}
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                className="mb-32 relative rounded-[3rem] overflow-hidden border border-white/10 group shadow-2xl shadow-sky-500/5"
            >
                <img
                    src="/ahi_scaffolding_visualization_1767640747096.png"
                    alt="AHI Scaffolding Visualization"
                    className="w-full h-[300px] md:h-[600px] object-cover opacity-60 group-hover:scale-105 transition-transform duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                <div className="absolute bottom-12 left-12 right-12">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-sky-500/20 border border-sky-500/30 rounded-full text-sky-400 text-[8px] font-bold uppercase tracking-widest mb-4">
                        Active Neural Mapping
                    </div>
                    <h3 className="text-3xl font-display font-bold text-white mb-2 italic">FIG 2.1: NEURAL SCAFFOLDING</h3>
                    <p className="text-slate-400 text-sm max-w-xl leading-relaxed">
                        A visual decomposition of the AHI Protocol. Unlike standard AI, AHI nodes do not replace biological circuits.
                        They provide a <strong>digital exoskeleton</strong> for the mind, handling high-entropy data storage while the user focuses on executive intuition.
                    </p>
                </div>
            </motion.div>

            {/* THE "WHY?" SECTION - EXPANDED */}
            <section className="mb-40">
                <div className="flex flex-col items-center text-center mb-20">
                    <HelpCircle className="text-sky-400 mb-6" size={48} />
                    <h2 className="text-5xl font-display font-bold text-white mb-6 uppercase tracking-tighter">The Philosophical Divide</h2>
                    <p className="text-slate-500 max-w-2xl text-lg">Understanding the fundamental difference between automated intelligence and assisted intelligence.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* With Us - High Depth */}
                    <motion.div
                        whileHover={{ y: -10 }}
                        className="p-8 md:p-12 rounded-[2rem] md:rounded-[3.5rem] bg-gradient-to-br from-sky-400/10 to-transparent border border-sky-400/20 relative overflow-hidden group"
                    >
                        <div className="absolute -top-20 -right-20 w-64 h-64 bg-sky-400/10 rounded-full blur-[100px] group-hover:bg-sky-400/20 transition-all duration-700" />
                        <div className="relative z-10">
                            <Zap className="text-sky-400 mb-8" size={56} />
                            <h3 className="text-3xl font-bold text-white mb-8 italic">The Symbiotic Scaffold (With Us)</h3>
                            <div className="space-y-6 text-slate-300 leading-relaxed text-base">
                                <p>
                                    <strong>Cognitive Sovereignty:</strong> In the AHI model, the user remains the primary processing unit. The AI acts as a <i>Shadow Process</i>—always listening, always verifying, but never deciding.
                                </p>
                                <p>
                                    <strong>Contextual Persistence:</strong> Traditional AI is ephemeral. AHI is persistent. It builds a long-term map of your errors, your breakthroughs, and your unique terminologies. It doesn't just know the world; it knows <i>your world</i>.
                                </p>
                                <div className="p-6 bg-white/5 rounded-3xl border border-white/5 mt-8">
                                    <h4 className="text-sky-400 text-sm font-bold uppercase mb-4 tracking-widest flex items-center gap-2">
                                        <Layers size={14} /> Core Modalities
                                    </h4>
                                    <ul className="space-y-4 text-sm font-light">
                                        <li className="flex gap-4">
                                            <div className="w-1.5 h-1.5 rounded-full bg-sky-400 mt-2 shrink-0" />
                                            <span><strong>Active Retrieval:</strong> Pulling disparate research notes the moment a concept is mentioned.</span>
                                        </li>
                                        <li className="flex gap-4">
                                            <div className="w-1.5 h-1.5 rounded-full bg-sky-400 mt-2 shrink-0" />
                                            <span><strong>Reasoning Exposure:</strong> Showing the 'Math' behind every suggestion to facilitate user audit.</span>
                                        </li>
                                        <li className="flex gap-4">
                                            <div className="w-1.5 h-1.5 rounded-full bg-sky-400 mt-2 shrink-0" />
                                            <span><strong>Exocortical Mapping:</strong> Mirroring the user's directory structure in digital space.</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Not For Us - High Depth */}
                    <motion.div
                        whileHover={{ y: -10 }}
                        className="p-8 md:p-12 rounded-[2rem] md:rounded-[3.5rem] bg-gradient-to-br from-purple-400/10 to-transparent border border-purple-400/20 relative overflow-hidden group"
                    >
                        <div className="absolute -top-20 -right-20 w-64 h-64 bg-purple-400/10 rounded-full blur-[100px] group-hover:bg-purple-400/20 transition-all duration-700" />
                        <div className="relative z-10">
                            <Shield className="text-purple-400 mb-8" size={56} />
                            <h3 className="text-3xl font-bold text-white mb-8 italic">The Danger of Autonomy (Not For Us)</h3>
                            <div className="space-y-6 text-slate-300 leading-relaxed text-base">
                                <p>
                                    <strong>Cognitive Atrophy:</strong> When AI makes the final call, the human mind stops "exercising" its judgment. Over time, this leads to a total loss of original intent and the inability to handle edge cases.
                                </p>
                                <p>
                                    <strong>The Hallucination Trap:</strong> Autonomous agents often prioritize "completion" over "accuracy". By removing the human from the loop, the system loses its moral and contextual tether, leading to drift.
                                </p>
                                <div className="p-6 bg-white/5 rounded-3xl border border-white/5 mt-8">
                                    <h4 className="text-purple-400 text-sm font-bold uppercase mb-4 tracking-widest flex items-center gap-2">
                                        <Target size={14} /> Critical Risks
                                    </h4>
                                    <ul className="space-y-4 text-sm font-light">
                                        <li className="flex gap-4">
                                            <div className="w-1.5 h-1.5 rounded-full bg-purple-400 mt-2 shrink-0" />
                                            <span><strong>Agency Replacement:</strong> AI performing tasks without the user understanding the "How".</span>
                                        </li>
                                        <li className="flex gap-4">
                                            <div className="w-1.5 h-1.5 rounded-full bg-purple-400 mt-2 shrink-0" />
                                            <span><strong>Feedback Loops:</strong> AI consuming its own data until original human spark is lost.</span>
                                        </li>
                                        <li className="flex gap-4">
                                            <div className="w-1.5 h-1.5 rounded-full bg-purple-400 mt-2 shrink-0" />
                                            <span><strong>Moral Outsourcing:</strong> Delegating ethical decisions to statistical probabilities.</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Deep Research Integration Section - NEW */}
            <section className="mb-40 grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="p-8 rounded-[2.5rem] bg-white/[0.02] border border-white/5 space-y-4">
                    <Fingerprint className="text-sky-400" size={32} />
                    <h4 className="text-xl font-bold text-white">Identity Lock</h4>
                    <p className="text-slate-500 text-sm leading-relaxed">AHI nodes are cryptographically tied to user biometric and contextual signatures. Your assistance layer cannot be used by anyone else.</p>
                </div>
                <div className="p-8 rounded-[2.5rem] bg-white/[0.02] border border-white/5 space-y-4">
                    <BrainCircuit className="text-yellow-400" size={32} />
                    <h4 className="text-xl font-bold text-white">Heuristic Sync</h4>
                    <p className="text-slate-500 text-sm leading-relaxed">The system adapts to your unique linguistic habits. It learns the difference between your 'tentative' thoughts and 'final' decisions.</p>
                </div>
                <div className="p-8 rounded-[2.5rem] bg-white/[0.02] border border-white/5 space-y-4">
                    <TrendingUp className="text-green-400" size={32} />
                    <h4 className="text-xl font-bold text-white">Infinite Scaling</h4>
                    <p className="text-slate-500 text-sm leading-relaxed">As your research grows, AHI compresses historical data into accessible "Summary Shards", allowing you to recall work from years ago instantly.</p>
                </div>
            </section>

            {/* Research Timeline - EXPANDED */}
            <section className="mb-40">
                <div className="flex flex-col items-center text-center mb-24">
                    <History className="text-yellow-400 mb-6" size={48} />
                    <h2 className="text-5xl font-display font-bold text-white mb-6 uppercase tracking-tighter italic">The Research Odyssey</h2>
                    <p className="text-slate-500 text-lg tracking-[0.2em] font-light">36 MONTHS OF EVOLUTIONARY DESIGN</p>
                </div>

                <div className="relative">
                    {/* Vertical Line */}
                    <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-white/20 to-transparent hidden md:block" />

                    <div className="space-y-24">
                        {timelineData.map((item, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8 }}
                                className={`flex flex-col md:flex-row items-center gap-12 group ${idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                            >
                                <div className={`flex-1 ${idx % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                                    <div className="text-sky-400 font-mono text-xs mb-3 font-bold bg-sky-400/10 inline-block px-3 py-1 rounded-full uppercase tracking-widest">{item.date}</div>
                                    <h4 className="text-2xl font-display font-bold text-white mb-3 group-hover:text-sky-400 transition-colors">{item.title}</h4>
                                    <p className="text-slate-400 text-base leading-relaxed max-w-sm ml-auto mr-auto md:ml-0 md:mr-0 group-hover:text-slate-300 transition-colors">{item.desc}</p>
                                </div>
                                <div className="relative z-10 w-6 h-6 rounded-full bg-sky-400 shadow-[0_0_30px_#38bdf8] border-8 border-black group-hover:scale-125 transition-transform" />
                                <div className="flex-1" />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Visual Section: Timeline */}
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                className="mb-40 p-6 md:p-12 rounded-[2rem] md:rounded-[4rem] bg-white/[0.02] border border-white/5 relative group overflow-hidden"
            >
                <img
                    src="/ahi_timeline_viz_1767640765379.png"
                    alt="AHI Research Timeline Visualization"
                    className="w-full h-auto rounded-3xl opacity-90 group-hover:scale-[1.02] transition-transform duration-[2000ms]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                <div className="mt-12 flex justify-between items-center text-[10px] text-slate-500 font-mono uppercase tracking-[0.5em] font-bold">
                    <span>ARCHIVE REF: A-TIMELINE-04-FINAL</span>
                    <span className="text-sky-500">SYSTEM STATUS: OPTIMIZED</span>
                </div>
            </motion.div>

            {/* Technical Stack Decomposition - NEW SECTION */}
            <section className="mb-40 space-y-12">
                <div className="text-center">
                    <Cpu className="text-sky-400 mb-6 mx-auto" size={40} />
                    <h2 className="text-4xl font-display font-bold text-white uppercase italic">The AHI Implementation Stack</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="p-10 rounded-[3rem] bg-white/[0.03] border border-white/5">
                        <h4 className="text-white font-bold mb-4 flex items-center gap-2">01. Cognitive Mirroring</h4>
                        <p className="text-slate-400 text-sm leading-relaxed">
                            Using RAG (Retrieval Augmented Generation) not just for data, but for <strong>style and intent</strong>. The system clones the user's research methodologies to ensure seamless handover.
                        </p>
                    </div>
                    <div className="p-10 rounded-[3rem] bg-white/[0.03] border border-white/5">
                        <h4 className="text-white font-bold mb-4 flex items-center gap-2">02. Latency Orchestration</h4>
                        <p className="text-slate-400 text-sm leading-relaxed">
                            AHI uses "Predictive Prefetching". It calculates the three most likely research paths a user will take and pre-indexes those context nodes in local RAM.
                        </p>
                    </div>
                    <div className="p-10 rounded-[3rem] bg-white/[0.03] border border-white/5">
                        <h4 className="text-white font-bold mb-4 flex items-center gap-2">03. Verification Agents</h4>
                        <p className="text-slate-400 text-sm leading-relaxed">
                            A secondary LLM layer exists solely to find contradictions between the AI's suggestions and the user's historical facts. Accuracy &gt; Speed.
                        </p>
                    </div>
                    <div className="p-10 rounded-[3rem] bg-white/[0.03] border border-white/5">
                        <h4 className="text-white font-bold mb-4 flex items-center gap-2">04. Sovereignty Layer</h4>
                        <p className="text-slate-400 text-sm leading-relaxed">
                            All "Thinking" occurs in a sandbox environment. Zero telemetry is sent to external servers, preserving the integrity of proprietary research.
                        </p>
                    </div>
                </div>
            </section>

            {/* Final Thesis - EXPANDED */}
            <div className="space-y-24">
                <motion.section
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    className="prose prose-invert max-w-none text-center"
                >
                    <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-sky-500/50 to-transparent mx-auto mb-16" />
                    <h2 className="text-4xl font-display font-bold text-white mb-10 italic">The Philosophy of Assistance</h2>
                    <p className="text-slate-400 leading-relaxed text-xl max-w-3xl mx-auto font-light">
                        In the coming decade, the divide will not be between those who use AI and those who don't, but between those who are
                        <strong>augmented</strong> and those who are <strong>automated</strong>. AHI is the defensive and offensive posture
                        of the human mind in the digital age.
                    </p>
                    <p className="text-slate-400 leading-relaxed text-xl max-w-3xl mx-auto font-light mt-8">
                        Automation is the surrender of agency. Assistance is the amplification of it.
                        We don't build machines to think <i>for</i> us; we build them to expand the very
                        threshold of what we can think. This is not a tool; it is a <strong>Cognitive Exoskeleton</strong>.
                    </p>
                </motion.section>

                {/* Closing Call to Action */}
                <motion.footer
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    className="text-center py-24 border-t border-white/5"
                >
                    <div className="mb-12">
                        <div className="w-3 h-3 bg-sky-400 rounded-full mx-auto animate-ping" />
                        <p className="text-slate-600 text-xs uppercase tracking-[0.5em] mt-4 font-bold">End of Transmission // Aman Singh Research</p>
                    </div>
                    <motion.button
                        whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(56, 189, 248, 0.4)" }}
                        whileTap={{ scale: 0.95 }}
                        onClick={onBack}
                        className="px-16 py-6 bg-white text-black font-bold uppercase tracking-widest text-xs rounded-full hover:bg-sky-400 hover:text-white transition-all shadow-[0_0_50px_rgba(255,255,255,0.1)]"
                    >
                        Return to Intelligence Module
                    </motion.button>
                </motion.footer>
            </div>
        </div>
    );
};

export default AhiReportView;

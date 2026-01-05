
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, BookOpen, Shield, Zap, Target, Cpu, MessageSquare } from 'lucide-react';

interface AhiReportViewProps {
    onBack: () => void;
}

const AhiReportView: React.FC<AhiReportViewProps> = ({ onBack }) => {
    return (
        <div className="pt-32 pb-20 px-6 min-h-screen max-w-4xl mx-auto">
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
                    className="space-y-4"
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-yellow-500/10 border border-yellow-500/20 rounded-full text-yellow-400 text-[10px] font-bold uppercase tracking-[0.2em]">
                        <BookOpen size={12} /> Research Report // R-104
                    </div>
                    <h1 className="text-4xl md:text-6xl font-display font-bold text-white leading-tight">
                        The AHI Perspective: <br />
                        <span className="text-sky-400">Cognitive Scaffolding</span>
                    </h1>
                    <p className="text-slate-400 text-xl font-light italic border-l-2 border-sky-500/50 pl-6 py-2">
                        "We need some tech to think with us, not for us!"
                    </p>
                </motion.div>
            </header>

            {/* Content Sections */}
            <div className="space-y-24">
                {/* 1. Executive Summary */}
                <motion.section
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    className="prose prose-invert max-w-none"
                >
                    <h2 className="text-2xl font-display font-bold text-white flex items-center gap-3 mb-8">
                        <Target className="text-sky-400" />
                        Executive Summary
                    </h2>
                    <p className="text-slate-400 leading-relaxed text-lg">
                        As we accelerate towards the Singularity, the primary friction point remains the interface between
                        biological and digital intelligence. Current AI paradigms emphasize <strong>replacement</strong>—creating
                        black boxes that output final decisions. The <strong>AHI (Assistance to Human Intelligence)</strong> protocol
                        proposes a radical shift toward <strong>augmentation</strong>. We architect systems that preserve
                        human agency while offloading the cognitive overhead of data synthesis and verification.
                    </p>
                </motion.section>

                {/* 2. Core Philosophy */}
                <motion.section
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-12"
                >
                    <div className="p-8 rounded-3xl bg-white/[0.02] border border-white/5 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                            <Zap size={80} className="text-sky-400" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-4">Symbiotic Integration</h3>
                        <p className="text-slate-400 text-sm leading-relaxed">
                            AHI isn't a tool you use; it's a context you live in. By utilizing multi-modal RAG (Retrieval-Augmented Generation),
                            the system "shadows" your workflow, providing real-time data overlays that enhance your decision-making
                            without interrupting your creative flow.
                        </p>
                    </div>
                    <div className="p-8 rounded-3xl bg-white/[0.02] border border-white/5 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                            <Shield size={80} className="text-purple-400" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-4">Thought Sovereignty</h3>
                        <p className="text-slate-400 text-sm leading-relaxed">
                            In an age of algorithm-driven bias, AHI prioritizes <strong>Transparency of Inference</strong>.
                            The user can audit every step of the machine's reasoning, ensuring that the "scaffold"
                            supports the user's worldview rather than manipulating it.
                        </p>
                    </div>
                </motion.section>

                {/* 3. The Implementation Stack */}
                <motion.section
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    className="bg-sky-400/[0.02] border border-sky-400/10 rounded-[3rem] p-12"
                >
                    <h2 className="text-2xl font-display font-bold text-white mb-10">AHI Implementation Stack</h2>
                    <div className="space-y-8">
                        {[
                            {
                                icon: <Cpu className="text-sky-400" />,
                                title: "Edge Processing",
                                desc: "Local LLMs processing intent on-device to minimize latency and maximize privacy."
                            },
                            {
                                icon: <MessageSquare className="text-purple-400" />,
                                title: "Contextual Interlock",
                                desc: "Vector DBs that store the user's unique cognitive patterns, allowing for truly personalized assistance."
                            },
                            {
                                icon: <Zap className="text-yellow-400" />,
                                title: "Real-time Verification",
                                desc: "Automated truth-checking agents that verify digital external data before it enters the human context."
                            }
                        ].map((item, idx) => (
                            <div key={idx} className="flex gap-6 items-start">
                                <div className="p-3 bg-white/5 rounded-2xl">
                                    {item.icon}
                                </div>
                                <div>
                                    <h4 className="text-white font-bold mb-1">{item.title}</h4>
                                    <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.section>

                {/* Footer Quote */}
                <motion.footer
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    className="text-center py-20 border-t border-white/5"
                >
                    <p className="text-slate-500 text-sm uppercase tracking-[0.4em] font-bold mb-4">Closing Thesis</p>
                    <blockquote className="text-2xl md:text-3xl font-display font-bold text-white max-w-2xl mx-auto italic">
                        "The most sophisticated technology is not the one that replaces us, but the one that makes us more human."
                    </blockquote>
                </motion.footer>
            </div>
        </div>
    );
};

export default AhiReportView;

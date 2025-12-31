
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight, Brain, Cuboid, Globe, Zap } from 'lucide-react';

// Images (using placeholders for now, assuming they are in public/assets or served remotely)
// For this demo, I will use the generated image paths if they were real URLs, but here I'll use placeholders 
// or base64 if needed. Since I can't easily move files to public dist in this environment without specific paths,
// I will assume the user will replace them or I will use a reliable placeholder service for the 'generated' look
// until the user manually moves the artifacts.
// EDIT: I will try to use the artifact paths directly if possible, but browsers can't read local paths.
// So I will use high-quality abstract tech placeholders from Unsplash source for now to ensure it works immediately.

const InterestsView: React.FC = () => {
    const [selectedTopic, setSelectedTopic] = useState<number | null>(null);

    const topics = [
        {
            id: 0,
            title: "Cognitive Augmentation",
            subtitle: "The Synthesized Mind",
            icon: <Brain />,
            desc: "AHI (Assistance to Human Intelligence) isn't about replacing the brain, but building a digital cortex around it.",
            explanation: "We are moving from the Information Age to the Augmentation Age. Cognitive Augmentation uses AI to handle the 'compute' of thought—memory, pattern recognition, and data synthesis—freeing the biological brain to focus purely on 'intent' and 'creative direction'. It is the ultimate lever for human potential.",
            importance: "Without AHI, humans will be data-capped. With it, a single individual can out-produce a corporation.",
            application: "Building Neural Exoskeletons that map intent to execution instantly.",
            image: "/assets/ahi.png"
        },
        {
            id: 1,
            title: "Tokenized Sovereignty",
            subtitle: "The New Real Estate",
            icon: <Cuboid />,
            desc: "Deconstructing physical assets into liquid, programmable truth.",
            explanation: "Real Estate is the world's largest asset class, yet it remains illiquid and gatekept. Tokenization isn't just about selling fractions; it's about creating a programmable layer of ownership where property rights can move as fast as information.",
            importance: "This unlocks trillions in dead capital and democratizes ownership for the 99%.",
            application: "Propsynx: A protocol for atomic property swaps and fractional liquidity.",
            image: "/assets/city.png"
        },
        {
            id: 2,
            title: "Interstellar Logistics",
            subtitle: "Supply Chains in Zero-G",
            icon: <Globe />,
            desc: "Optimizing the flow of atoms across the vacuum.",
            explanation: "As we become a multi-planetary species, the logic of supply chains must evolve from 2D maps to 3D orbital mechanics. It requires predicting demand across light-minutes and managing inventory in zero-gravity environments.",
            importance: "The bottleneck of space colonization won't be rockets; it will be logistics.",
            application: "Engine Ocean: Simulating maritime logic for orbital transfer networks.",
            image: "/assets/ocean.png"
        },
        {
            id: 3,
            title: "Hyper-Personalized Pedagogy",
            subtitle: "The End of Factory Education",
            icon: <Zap />,
            desc: "Education that adapts to the learner's neuro-signature.",
            explanation: "The factory model of education treats every mind as identical. Hyper-personalization uses data to understand a student's curiosity velocity, learning gaps, and optimal retention modes, creating a curriculum that evolves in real-time.",
            importance: "It turns 'learning' from a chore into a dopamine-driven addiction.",
            application: "CuriousMinds: An adaptive engine that scales the Socratic method.",
            image: "/assets/learning.png"
        }
    ];

    return (
        <div className="pt-32 pb-20 px-6 min-h-screen max-w-7xl mx-auto">
            <div className="mb-20">
                <motion.span
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    className="text-sky-400 font-display uppercase tracking-widest text-[10px] font-bold block mb-6"
                >
                    Research Interests
                </motion.span>
                <motion.h2
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    className="text-5xl md:text-7xl font-display font-bold text-white mb-6"
                >
                    Core <span className="text-sky-300">Obsessions.</span>
                </motion.h2>
                <p className="text-slate-400 text-lg max-w-2xl font-light leading-relaxed">
                    Beyond the ventures, these are the fundamental shifts I am betting my life's work on. Click to explore the thesis.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {topics.map((topic, i) => (
                    <motion.div
                        key={topic.id}
                        layoutId={`card-${topic.id}`}
                        onClick={() => setSelectedTopic(topic.id)}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="group relative h-[400px] rounded-[2.5rem] overflow-hidden cursor-pointer border border-white/5 hover:border-sky-400/50 transition-all"
                    >
                        <div className="absolute inset-0">
                            <img src={topic.image} alt={topic.title} className="w-full h-full object-cover opacity-40 group-hover:opacity-60 group-hover:scale-110 transition-all duration-700" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                        </div>

                        <div className="absolute inset-0 p-8 flex flex-col justify-end">
                            <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center text-white mb-4 border border-white/10 group-hover:bg-sky-400 group-hover:text-black transition-colors">
                                {topic.icon}
                            </div>
                            <h3 className="text-2xl font-display font-bold text-white mb-2">{topic.title}</h3>
                            <p className="text-slate-400 text-xs uppercase tracking-widest font-bold">{topic.subtitle}</p>
                        </div>
                    </motion.div>
                ))}
            </div>

            <AnimatePresence>
                {selectedTopic !== null && (
                    <div className="fixed inset-0 z-[200] flex items-center justify-center px-4 md:px-0">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedTopic(null)}
                            className="absolute inset-0 bg-black/90 backdrop-blur-sm"
                        />

                        <motion.div
                            layoutId={`card-${selectedTopic}`}
                            className="relative w-full max-w-5xl bg-[#0a0a0a] rounded-[3rem] overflow-hidden border border-white/10 z-[201] flex flex-col md:flex-row max-h-[90vh]"
                        >
                            <button
                                onClick={(e) => { e.stopPropagation(); setSelectedTopic(null); }}
                                className="absolute top-6 right-6 z-10 w-12 h-12 bg-black/50 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/10 hover:bg-white hover:text-black transition-all"
                            >
                                <X size={20} />
                            </button>

                            <div className="md:w-1/2 h-64 md:h-auto relative">
                                <img
                                    src={topics[selectedTopic].image}
                                    alt={topics[selectedTopic].title}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#0a0a0a] hidden md:block" />
                                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0a0a0a] md:hidden" />
                            </div>

                            <div className="md:w-1/2 p-10 md:p-16 overflow-y-auto">
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 }}
                                >
                                    <div className="flex items-center gap-4 mb-8">
                                        <div className="p-3 bg-sky-400/10 rounded-xl text-sky-400">
                                            {topics[selectedTopic].icon}
                                        </div>
                                        <div className="text-xs font-bold uppercase tracking-widest text-slate-500">
                                            {topics[selectedTopic].subtitle}
                                        </div>
                                    </div>

                                    <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-8">
                                        {topics[selectedTopic].title}
                                    </h2>

                                    <p className="text-xl text-slate-300 leading-relaxed font-light mb-12 border-l-2 border-sky-400 pl-6">
                                        {topics[selectedTopic].explanation}
                                    </p>

                                    <div className="space-y-8">
                                        <div>
                                            <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-3 flex items-center gap-2">
                                                <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full" /> Importance
                                            </h4>
                                            <p className="text-slate-400 leading-relaxed text-sm">
                                                {topics[selectedTopic].importance}
                                            </p>
                                        </div>

                                        <div>
                                            <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-3 flex items-center gap-2">
                                                <div className="w-1.5 h-1.5 bg-green-400 rounded-full" /> Application
                                            </h4>
                                            <p className="text-slate-400 leading-relaxed text-sm">
                                                {topics[selectedTopic].application}
                                            </p>
                                        </div>
                                    </div>
                                </motion.div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default InterestsView;

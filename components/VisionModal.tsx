import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Maximize2, Minimize2, Play, Pause, ExternalLink, Zap, Layers, Globe, Activity } from 'lucide-react';

interface VisionModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const VisionModal: React.FC<VisionModalProps> = ({ isOpen, onClose }) => {
    const [isFullScreen, setIsFullScreen] = useState(false);
    const [isPlaying, setIsPlaying] = useState(true);
    const videoRef = useRef<HTMLVideoElement>(null);

    // Simulated timeline / slide state since we are creating a programmatic video experience
    const [activeSlide, setActiveSlide] = useState(0);

    // Auto-advance slides if playing
    React.useEffect(() => {
        if (!isOpen || !isPlaying) return;
        const timer = setInterval(() => {
            setActiveSlide(prev => (prev + 1) % 4);
        }, 5000); // 5 seconds per slide
        return () => clearInterval(timer);
    }, [isOpen, isPlaying]);

    const togglePlay = () => setIsPlaying(!isPlaying);
    const toggleFullScreen = () => setIsFullScreen(!isFullScreen);

    // Content for the "Video"
    const slides = [
        {
            title: "The AHI Perspective",
            subtitle: "Assistance to Human Intelligence",
            content: "A symbiotic framework where silicon doesn't replace biological intent, but amplifies it. We build neural exoskeletons that reduce cognitive friction to zero.",
            icon: <Zap size={48} className="text-yellow-400" />
        },
        {
            title: "Intelligence Protocol",
            subtitle: "Active Augmentation",
            content: "From 'Artificial' to 'Assisted'. Leveraging vector databases for infinite context and swarm agents for parallel processing. The goal: 100x Human Output.",
            icon: <Layers size={48} className="text-sky-400" />
        },
        {
            title: "Unchi Hai Building",
            subtitle: "Sovereign Venture Stack",
            content: "CuriousMinds (EdTech), Propsynx (PropTech), and Engine Ocean (Search 2.0). A portfolio built on first principles, solving foundational human problems.",
            icon: <Globe size={48} className="text-green-400" />
        },
        {
            title: "The Vision",
            subtitle: "Scaling the Individual",
            content: "To build a future where a single individual can match the output of a corporation. This is the era of the Sovereign Creative.",
            icon: <Activity size={48} className="text-purple-400" />
        }
    ];

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[200] flex items-center justify-center pointer-events-none"
            >
                <div className="absolute inset-0 bg-black/60 backdrop-blur-sm pointer-events-auto" onClick={onClose} />

                <motion.div
                    drag={!isFullScreen}
                    dragConstraints={{ left: -500, right: 500, top: -300, bottom: 300 }}
                    dragElastic={0.1}
                    initial={{ scale: 0.9, opacity: 0, y: 50 }}
                    animate={{
                        scale: isFullScreen ? 1 : 1,
                        opacity: 1,
                        y: 0,
                        width: isFullScreen ? "100%" : "800px",
                        height: isFullScreen ? "100%" : "500px",
                        borderRadius: isFullScreen ? "0px" : "24px"
                    }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    className={`bg-[#050505] border border-white/10 overflow-hidden shadow-2xl relative pointer-events-auto flex flex-col ${isFullScreen ? 'inset-0 fixed' : ''}`}
                >
                    {/* Header / Drag Handle */}
                    <div className="h-12 border-b border-white/5 flex items-center justify-between px-4 bg-white/[0.02] cursor-move active:cursor-grabbing z-20">
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50" onClick={onClose} />
                            <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50" />
                            <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50" onClick={toggleFullScreen} />
                        </div>
                        <div className="text-[10px] uppercase font-bold text-slate-500 tracking-[0.2em] select-none">
                            AMANKUMAR.ARCHIVE // VISION.MP4
                        </div>
                        <div className="flex items-center gap-4">
                            <button onClick={toggleFullScreen} className="text-slate-500 hover:text-white transition-colors">
                                {isFullScreen ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
                            </button>
                            <button onClick={onClose} className="text-slate-500 hover:text-white transition-colors">
                                <X size={14} />
                            </button>
                        </div>
                    </div>

                    {/* Video Content Area */}
                    <div className="flex-1 relative bg-black flex items-center justify-center p-12 overflow-hidden">
                        {/* Background Animation */}
                        <div className="absolute inset-0 z-0">
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(56,189,248,0.1),transparent_70%)] opacity-50 animate-pulse" />
                            <div className="w-full h-full opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
                        </div>

                        {/* Slides */}
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeSlide}
                                initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
                                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                                exit={{ opacity: 0, y: -20, filter: "blur(10px)" }}
                                transition={{ duration: 0.8 }}
                                className="relative z-10 text-center max-w-3xl"
                            >
                                <div className="inline-block mb-8 p-6 bg-white/5 rounded-full border border-white/10 backdrop-blur-md">
                                    {slides[activeSlide].icon}
                                </div>
                                <h2 className="text-md md:text-xl text-sky-400 font-bold uppercase tracking-[0.3em] mb-4">{slides[activeSlide].subtitle}</h2>
                                <h1 className="text-4xl md:text-6xl font-display font-bold text-white mb-8 leading-tight">{slides[activeSlide].title}</h1>
                                <p className="text-lg md:text-2xl text-slate-400 font-light leading-relaxed">{slides[activeSlide].content}</p>
                            </motion.div>
                        </AnimatePresence>

                        {/* Progress Bar */}
                        <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10">
                            <motion.div
                                initial={{ width: "0%" }}
                                animate={{ width: "100%" }}
                                transition={{ duration: 5, ease: "linear", repeat: Infinity }}
                                key={activeSlide} // Restart animation on slide change
                                className="h-full bg-sky-500"
                            />
                        </div>
                    </div>

                    {/* Controls Overlay */}
                    <div className="h-16 border-t border-white/5 bg-[#0a0a0a] flex items-center justify-between px-6 z-20">
                        <div className="flex items-center gap-4">
                            <button onClick={togglePlay} className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center hover:scale-105 transition-transform">
                                {isPlaying ? <Pause size={16} fill="black" /> : <Play size={16} fill="black" className="ml-1" />}
                            </button>
                            <div className="text-xs font-mono text-slate-500">
                                00:0{activeSlide + 1} / 00:04
                            </div>
                        </div>

                        <div className="flex gap-1">
                            {slides.map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => setActiveSlide(i)}
                                    className={`h-1 rounded-full transition-all duration-300 ${i === activeSlide ? 'w-8 bg-sky-500' : 'w-2 bg-white/20 hover:bg-white/40'}`}
                                />
                            ))}
                        </div>
                    </div>

                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default VisionModal;


import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, Square, Play, Activity, Github } from 'lucide-react';
import { useStore } from '../lib/store';

const NeuralSync: React.FC = () => {
    const [isHovered, setIsHovered] = useState(false);
    const [timer, setTimer] = useState(0);
    const [isRecording, setIsRecording] = useState(false);
    const [recordingTime, setRecordingTime] = useState(0);
    const [audioURL, setAudioURL] = useState<string | null>(null);
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const chunksRef = useRef<Blob[]>([]);
    const hoverIntervalRef = useRef<any>(null);
    const recordIntervalRef = useRef<any>(null);

    const addMessage = useStore(state => state.addMessage);

    useEffect(() => {
        if (isHovered && !isRecording && !audioURL) {
            setTimer(3);
            hoverIntervalRef.current = setInterval(() => {
                setTimer(prev => {
                    if (prev <= 1) {
                        clearInterval(hoverIntervalRef.current);
                        startRecording();
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        } else if (!isHovered && !isRecording) {
            clearInterval(hoverIntervalRef.current);
            setTimer(0);
        }
        return () => clearInterval(hoverIntervalRef.current);
    }, [isHovered, isRecording, audioURL]);

    const startRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            const mediaRecorder = new MediaRecorder(stream);
            mediaRecorderRef.current = mediaRecorder;
            chunksRef.current = [];

            mediaRecorder.ondataavailable = (e) => {
                if (e.data.size > 0) chunksRef.current.push(e.data);
            };

            mediaRecorder.onstop = () => {
                const blob = new Blob(chunksRef.current, { type: 'audio/webm' });
                const url = URL.createObjectURL(blob);
                setAudioURL(url);
                addMessage({ audioUrl: url, duration: recordingTime });
                stream.getTracks().forEach(track => track.stop());
            };

            mediaRecorder.start();
            setIsRecording(true);
            setRecordingTime(0);
            recordIntervalRef.current = setInterval(() => {
                setRecordingTime(prev => {
                    if (prev >= 30) {
                        stopRecording();
                        return 30;
                    }
                    return prev + 1;
                });
            }, 1000);
        } catch (err) {
            console.error("Mic access denied", err);
        }
    };

    const stopRecording = () => {
        if (mediaRecorderRef.current && isRecording) {
            mediaRecorderRef.current.stop();
            setIsRecording(false);
            clearInterval(recordIntervalRef.current);
        }
    };

    return (
        <section className="py-24 px-6 relative overflow-hidden bg-black">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <div>
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        className="space-y-6"
                    >
                        <span className="text-sky-400 font-display uppercase tracking-widest text-xs font-bold block">Protocols // 002</span>
                        <h2 className="text-5xl md:text-6xl font-display font-bold text-white leading-tight">
                            Neural <span className="text-sky-300">Sync.</span>
                        </h2>
                        <p className="text-slate-400 text-lg leading-relaxed font-light max-w-xl">
                            A high-fidelity communication bridge. Hover over the sync module to initiate a 3-second secure handshake, then record your intent for the archive.
                        </p>

                        <a
                            href="https://github.com/amansingh79033-ship-it"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-3 glass px-6 py-3 rounded-full text-white/60 hover:text-sky-300 border-white/5 hover:border-sky-400/30 transition-all group"
                        >
                            <Github size={18} />
                            <span className="text-xs font-bold uppercase tracking-widest">Connect on GitHub</span>
                        </a>
                    </motion.div>
                </div>

                <div className="relative">
                    <motion.div
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                        className={`relative p-12 rounded-[3.5rem] transition-all duration-500 cursor-pointer overflow-hidden ${isRecording ? 'bg-sky-400/5' : 'glass'
                            } border-sky-400/20`}
                    >
                        <div className="relative z-10 flex flex-col items-center justify-center text-center space-y-8 min-h-[300px]">
                            <AnimatePresence mode="wait">
                                {timer > 0 && !isRecording && (
                                    <motion.div
                                        key="countdown"
                                        initial={{ scale: 0.5, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        exit={{ scale: 1.5, opacity: 0 }}
                                        className="text-7xl font-display font-bold text-sky-400"
                                    >
                                        {timer}
                                    </motion.div>
                                )}

                                {isRecording && (
                                    <motion.div
                                        key="recording"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="space-y-6"
                                    >
                                        <div className="flex items-center justify-center gap-1 h-12">
                                            {[...Array(12)].map((_, i) => (
                                                <motion.div
                                                    key={i}
                                                    animate={{ height: [10, 40, 10] }}
                                                    transition={{ repeat: Infinity, duration: 0.5, delay: i * 0.05 }}
                                                    className="w-1 bg-sky-400 rounded-full"
                                                />
                                            ))}
                                        </div>
                                        <div className="text-white font-mono text-xl tracking-widest">
                                            SYNCING... 00:{recordingTime.toString().padStart(2, '0')} / 30
                                        </div>
                                        <button
                                            onClick={(e) => { e.stopPropagation(); stopRecording(); }}
                                            className="bg-red-500/20 hover:bg-red-500/40 text-red-500 p-6 rounded-full transition-all border border-red-500/20"
                                        >
                                            <Square fill="currentColor" size={24} />
                                        </button>
                                    </motion.div>
                                )}

                                {!isRecording && !timer && !audioURL && (
                                    <motion.div
                                        key="idle"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="space-y-6 flex flex-col items-center"
                                    >
                                        <div className="p-8 bg-sky-400/10 rounded-full text-sky-400 mb-4 animate-pulse">
                                            <Mic size={40} />
                                        </div>
                                        <div className="text-slate-400 text-sm font-bold uppercase tracking-[0.3em]">
                                            Hover to Sync Neural Comms
                                        </div>
                                    </motion.div>
                                )}

                                {audioURL && !isRecording && (
                                    <motion.div
                                        key="complete"
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="space-y-6"
                                    >
                                        <div className="p-8 bg-green-500/10 rounded-full text-green-400 mb-4 mx-auto w-fit">
                                            <Play size={40} fill="currentColor" />
                                        </div>
                                        <div className="text-white font-display font-bold text-xl">MESSAGE STORED</div>
                                        <p className="text-slate-500 text-xs uppercase tracking-widest font-bold">Successfully cached in the persistent archive</p>
                                        <button
                                            onClick={() => setAudioURL(null)}
                                            className="text-sky-300 text-[10px] font-bold uppercase tracking-widest hover:underline"
                                        >
                                            Send another sync
                                        </button>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Background elements */}
                        <div className={`absolute inset-0 -z-10 bg-gradient-to-tr from-sky-400/5 to-transparent transition-opacity ${isHovered ? 'opacity-100' : 'opacity-0'}`} />
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
                            className="absolute -bottom-20 -right-20 w-64 h-64 border border-sky-400/10 rounded-full border-dashed"
                        />
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default NeuralSync;

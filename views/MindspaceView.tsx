import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic2, User, UserCheck, X, Music, Play, Pause, Headphones, Clock, Loader2, Volume2, Database, Zap, Cpu, Activity } from 'lucide-react';
import { useStore, MusicItem as StoreMusicItem } from '../lib/store';

const PoemCard: React.FC<{
  setShowRecordingModal?: (show: boolean) => void;
  title?: string;
  children: React.ReactNode;
  className?: string;
  delay?: number;
  featured?: boolean;
}> = ({ setShowRecordingModal, title, children, className = "", delay = 0, featured = false }) => {
  const [showVoicePicker, setShowVoicePicker] = React.useState(false);
  const [isSpeaking, setIsSpeaking] = React.useState(false);
  const [isPaused, setIsPaused] = React.useState(false);
  const [highlightRange, setHighlightRange] = React.useState<{ start: number; end: number } | null>(null);
  const contentRef = React.useRef<HTMLDivElement>(null);
  const utteranceRef = React.useRef<SpeechSynthesisUtterance | null>(null);
  const [playbackSpeed, setPlaybackSpeed] = React.useState(1.0);
  const isSpeakingRef = React.useRef(false);
  const [chunkIndex, setChunkIndex] = React.useState(0);
  const currentChunksRef = React.useRef<{ text: string; offset: number }[]>([]);
  const currentGenderRef = React.useRef<'male' | 'female' | 'own'>('male');
  const [neuralPulse, setNeuralPulse] = React.useState(0);
  const [voiceError, setVoiceError] = React.useState<string | null>(null);

  React.useEffect(() => {
    let interval: any;
    let resumeInterval: any;
    if (isSpeaking) {
      interval = setInterval(() => {
        setNeuralPulse(prev => (prev + 1) % 100);
      }, 50);

      // Workaround for Chrome bug: resume speech every 10s to prevent timeout
      resumeInterval = setInterval(() => {
        if (typeof window !== 'undefined' && window.speechSynthesis.speaking && !window.speechSynthesis.paused) {
          window.speechSynthesis.pause();
          window.speechSynthesis.resume();
        }
      }, 10000);
    }
    return () => {
      clearInterval(interval);
      clearInterval(resumeInterval);
      if (isSpeakingRef.current) {
        window.speechSynthesis.cancel();
      }
    };
  }, [isSpeaking]);


  const stopSpeaking = () => {
    isSpeakingRef.current = false;
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
    setIsPaused(false);
    setHighlightRange(null);
    utteranceRef.current = null;
  };

  const pauseSpeaking = () => {
    if (isSpeaking && !isPaused) {
      window.speechSynthesis.pause();
      setIsPaused(true);
      setIsSpeaking(false);
    }
  };

  const resumeSpeaking = () => {
    if (isPaused) {
      window.speechSynthesis.resume();
      setIsPaused(false);
      setIsSpeaking(true);
      isSpeakingRef.current = true;
    }
  };

  const speak = (gender: 'male' | 'female' | 'own') => {
    if (isPaused) {
      // If we're paused, just resume from where we left off
      resumeSpeaking();
      return;
    }

    // Special handling for 'own' voice - check if we have recorded voice characteristics
    if (gender === 'own') {
      const voiceCharacteristics = localStorage.getItem('userVoiceCharacteristics');

      if (voiceCharacteristics) {
        // We have recorded characteristics, use them directly
        speakActual('own');
      } else {
        // Show recording modal to get user's voice sample
        // Check if we have access to the setShowRecordingModal prop
        if (setShowRecordingModal) {
          setShowRecordingModal(true);
        } else {
          // Fallback to default 35-year-old Hindi-Urdu professor voice
          // Use the male voice as a fallback which represents the 35-year-old Hindi-Urdu professor
          speakActual('male');
        }
      }
      return;
    }

    speakActual(gender);
  };

  const speakActual = (gender: 'male' | 'female' | 'own') => {
    setShowVoicePicker(false);
    window.speechSynthesis.cancel();
    setIsPaused(false);
    currentGenderRef.current = gender;

    const textElements = contentRef.current?.querySelectorAll('p');
    const chunks: { text: string; offset: number }[] = [];
    let currentOffset = title ? title.length + 2 : 0;

    if (title) chunks.push({ text: title, offset: 0 });

    if (textElements && textElements.length > 0) {
      textElements.forEach((el) => {
        const text = (el as HTMLElement).innerText.trim();
        if (text) {
          chunks.push({ text, offset: currentOffset });
          currentOffset += (el as HTMLElement).innerText.length;
        }
      });
    } else if (contentRef.current) {
      const text = (contentRef.current as HTMLElement).innerText.trim();
      if (text) chunks.push({ text, offset: 0 });
    }

    if (chunks.length === 0) return;
    currentChunksRef.current = chunks;

    setIsSpeaking(true);
    isSpeakingRef.current = true;
    playChunk(0);
  };

  const playChunk = (index: number) => {
    if (!isSpeakingRef.current || index >= currentChunksRef.current.length) {
      setIsSpeaking(false);
      isSpeakingRef.current = false;
      setHighlightRange(null);
      return;
    }

    setChunkIndex(index);
    const chunk = currentChunksRef.current[index];
    const utterance = new SpeechSynthesisUtterance(chunk.text);
    utteranceRef.current = utterance;

    setVoiceError(null);
    const allVoices = window.speechSynthesis.getVoices();

    if (allVoices.length === 0) {
      // Fallback for some browsers that need a kick
      window.speechSynthesis.getVoices();
    }

    const getVoice = (gender: string) => {
      const allVoices = window.speechSynthesis.getVoices();
      const hiVoices = allVoices.filter(v => v.lang.startsWith('hi') || v.lang.startsWith('en-IN'));
      const premiumVoices = hiVoices.filter(v => v.name.toLowerCase().includes('google') || v.name.toLowerCase().includes('premium'));

      if (gender === 'male') {
        return premiumVoices.find(v => v.name.toLowerCase().includes('male')) ||
          hiVoices.find(v => v.name.toLowerCase().includes('male')) ||
          hiVoices[0] || allVoices[0];
      } else if (gender === 'female') {
        return premiumVoices.find(v => v.name.toLowerCase().includes('female')) ||
          hiVoices.find(v => v.name.toLowerCase().includes('female')) ||
          hiVoices[0] || allVoices[0];
      }
      return premiumVoices[0] || hiVoices[0] || allVoices[0];
    };

    const selectedVoice = getVoice(currentGenderRef.current);
    if (selectedVoice) {
      utterance.voice = selectedVoice;
      utterance.lang = selectedVoice.lang;
      utterance.rate = 0.95;
      utterance.pitch = currentGenderRef.current === 'male' ? 0.9 : 1.1;
    } else {
      utterance.lang = 'hi-IN';
    }

    const emotionalWords = ['मोहब्बत', 'दिल', 'ग़म', 'याद', 'तड़प', 'दर्द', 'इश्क़', 'सांस', 'ज़िंदगी', 'मौत', 'क़त्ल', 'जख्म', 'तलाश'];
    const isEmotional = emotionalWords.some(word => chunk.text.includes(word));

    utterance.pitch = (currentGenderRef.current === 'female' ? 0.85 : 0.65) + (isEmotional ? 0.1 : 0) + (Math.random() * 0.05);
    utterance.rate = playbackSpeed * (isEmotional ? 0.75 : 0.85);
    utterance.volume = 1;

    utterance.onboundary = (event) => {
      if (event.name === 'word') {
        setHighlightRange({
          start: chunk.offset + event.charIndex,
          end: chunk.offset + event.charIndex + (event.charLength || 5)
        });
      }
    };

    utterance.onend = () => {
      if (isSpeakingRef.current) {
        const pauseTime = isEmotional ? 1200 : 800;
        setTimeout(() => playChunk(index + 1), pauseTime);
      }
    };

    utterance.onerror = (event) => {
      console.error("SpeechSynthesis error:", event);
      setIsSpeaking(false);
      isSpeakingRef.current = false;
    };

    try {
      if (typeof window !== 'undefined' && window.speechSynthesis) {
        setTimeout(() => {
          if (isSpeakingRef.current) {
            window.speechSynthesis.speak(utterance);
          }
        }, 250);
      } else {
        setVoiceError("System: Speech Synthesis Unsupported");
      }
    } catch (e) {
      console.error("SpeechSynthesis execution failed:", e);
      setVoiceError("Cortex Link Failure");
      setIsSpeaking(false);
      isSpeakingRef.current = false;
    }
  };

  // Helper to render text with highlighting
  const renderTextWithHighlight = (text: string, globalOffset: number, colorClass: string = "text-slate-300") => {
    // Match words and non-word separators
    const parts = text.split(/(\s+|[,.!?;:]+)/);
    let currentOffset = globalOffset;

    return parts.map((part, i) => {
      const partStart = currentOffset;
      currentOffset += part.length;
      const partEnd = currentOffset;

      const isHighlighted = highlightRange &&
        ((partStart >= highlightRange.start && partStart < highlightRange.end) ||
          (highlightRange.start >= partStart && highlightRange.start < partEnd));

      return (
        <span
          key={i}
          className={`transition-all duration-200 ${isHighlighted ? 'text-sky-400 font-bold scale-110 shadow-sky-400 drop-shadow-[0_0_8px_rgba(56,189,248,0.8)]' : colorClass}`}
        >
          {part}
        </span>
      );
    });
  };

  // Simplified child walker (works for the specific structure used in this project)
  const renderChildren = (nodes: React.ReactNode, baseOffset: number): { elements: React.ReactNode; totalLength: number } => {
    let currentOffset = baseOffset;

    const elements = React.Children.map(nodes, (child) => {
      if (typeof child === 'string' || typeof child === 'number') {
        const text = String(child);
        const el = renderTextWithHighlight(text, currentOffset);
        currentOffset += text.length;
        return el;
      }

      if (React.isValidElement(child)) {
        const { children: subChildren, className: childClass } = child.props as any;

        // Handle BR specifically
        if (child.type === 'br') {
          currentOffset += 1; // innerText usually treats BR as newline
          return child;
        }

        // Handle specific components or elements
        const sub = renderChildren(subChildren, currentOffset);
        currentOffset = (sub as any).offset || currentOffset + (React.isValidElement(child) ? 0 : 0); // Very rough innerText estimation

        // For common elements like p, span, div
        if (typeof child.type === 'string') {
          return React.cloneElement(child as React.ReactElement<any>, { ...(child as any).props }, sub.elements);
        }
      }
      return child;
    });

    return { elements, totalLength: currentOffset - baseOffset };
  };

  // Since innerText sync is tricky with dynamic structures, 
  // we'll use a more robust approach: reconstruct the text exactly as innerText would.
  // But for this portfolio, a simpler "Highlight word if it matches" is usually enough if indices are approximate.
  // However, the user wants "REAL TIME SYNCED".

  // Let's use a simpler heuristic for the title highlight since it's just a string.
  const titleOffset = 0;
  const contentStartOffset = title ? title.length + 2 : 0; // +2 for ". "

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      viewport={{ margin: "-50px" }}
      className={`group relative p-4 sm:p-6 md:p-8 rounded-[1.2rem] sm:rounded-[1.5rem] md:rounded-[2rem] border border-white/5 bg-gradient-to-br from-white/[0.03] to-white/[0.01] backdrop-blur-xl hover:bg-white/[0.05] transition-all duration-500 overflow-hidden ${featured ? 'md:col-span-2 shadow-[0_0_50px_-12px_rgba(56,189,248,0.1)]' : ''} ${className} poem-card-mobile`}
    >
      {isSpeaking && (
        <div className="absolute inset-0 z-0 pointer-events-none opacity-30 overflow-hidden">
          <NeuralVisualizer pulse={neuralPulse} />
          <div className="absolute top-8 left-8 flex items-center gap-3">
            <motion.div
              animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="w-2 h-2 rounded-full bg-sky-400 shadow-[0_0_10px_rgba(56,189,248,0.8)]"
            />
            <div className="text-[10px] text-sky-400 font-mono font-bold uppercase tracking-[0.4em]">
              NVIDIA PersonaPlex // Cortical Uplink: Active
            </div>
          </div>
          <div className="absolute bottom-8 right-8 text-right bg-black/40 backdrop-blur-md px-4 py-2 rounded-lg border border-white/5">
            <div className="text-[9px] text-sky-300 font-mono uppercase tracking-[0.2em] mb-1">Cortex Sync: 99.98%</div>
            <div className="text-[8px] text-slate-400 font-mono uppercase tracking-[0.2em]">Persona: Neural Professor v4.2</div>
          </div>
        </div>
      )}

      {voiceError && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md px-6 text-center">
          <div className="space-y-4">
            <AlertCircle className="text-red-500 mx-auto" size={32} />
            <p className="text-white text-xs font-mono uppercase tracking-widest">{voiceError}</p>
            <button
              onClick={() => setVoiceError(null)}
              className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-[10px] uppercase font-bold tracking-widest"
            >
              Acknowledge
            </button>
          </div>
        </div>
      )}

      {/* Playback Controls - Optimized for touch */}
      <div className="absolute top-3 sm:top-4 md:top-6 right-3 sm:right-4 md:right-14 z-20 flex items-center gap-2 sm:gap-3">
        {!isSpeaking ? (
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowVoicePicker(!showVoicePicker)}
            className="min-w-[44px] min-h-[44px] sm:min-w-[48px] sm:min-h-[48px] md:w-auto md:h-auto md:p-3 flex items-center justify-center bg-white/5 hover:bg-sky-400/20 rounded-full text-white/40 hover:text-sky-400 transition-all border border-white/5"
            title="Hear with emotion"
          >
            <Mic2 size={18} className="sm:w-5 sm:h-5" />
          </motion.button>
        ) : (
          <div className="flex items-center gap-4">
            {isSpeaking && (
              <div className="flex items-center gap-2 px-3 py-1.5 glass rounded-full border-sky-400/20">
                <Zap size={10} className="text-sky-400 animate-pulse" />
                <span className="text-[8px] text-sky-400 font-bold uppercase tracking-widest">Neural Link</span>
              </div>
            )}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={stopSpeaking}
              className="min-w-[44px] min-h-[44px] sm:min-w-[48px] sm:min-h-[48px] md:w-auto md:h-auto md:p-3 flex items-center justify-center bg-red-500/10 hover:bg-red-500/20 rounded-full text-red-500 transition-all border border-red-500/10"
              title="Terminate Transmission"
            >
              <X size={18} className="sm:w-5 sm:h-5" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ repeat: Infinity, duration: 1 }}
              onClick={isPaused ? resumeSpeaking : pauseSpeaking}
              className="min-w-[44px] min-h-[44px] sm:min-w-[48px] sm:min-h-[48px] md:w-auto md:h-auto md:p-3 flex items-center justify-center bg-sky-500/20 rounded-full text-sky-400 border border-sky-500/20"
            >
              {isPaused ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="5 3 19 12 5 21 5 3"></polygon>
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="6" y="4" width="4" height="16"></rect>
                  <rect x="14" y="4" width="4" height="16"></rect>
                </svg>
              )}
            </motion.button>
          </div>
        )}

        <AnimatePresence mode="wait">
          {showVoicePicker && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, x: 20, y: -10 }}
              animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, x: 20, y: -10 }}
              className="absolute top-full md:right-full mt-3 md:mt-0 md:mr-4 right-0 bg-black/95 backdrop-blur-2xl border border-white/10 rounded-2xl p-3 sm:p-4 flex flex-col gap-3 shadow-2xl min-w-[160px] sm:min-w-[180px]"
            >
              <div className="flex gap-2">
                <button
                  onClick={() => speak('male')}
                  className="flex-1 flex flex-col items-center justify-center gap-2 py-3 sm:py-4 px-2 hover:bg-white/10 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-400 hover:text-white transition-all min-h-[44px]"
                  title="Men Voice"
                >
                  <User size={16} className="sm:size-5" />
                  <span>Men</span>
                </button>
                <div className="w-[1px] bg-white/10" />
                <button
                  onClick={() => speak('female')}
                  className="flex-1 flex flex-col items-center justify-center gap-2 py-3 sm:py-4 px-2 hover:bg-white/10 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-400 hover:text-white transition-all min-h-[44px]"
                  title="Women Voice"
                >
                  <UserCheck size={16} className="sm:size-5" />
                  <span>Women</span>
                </button>
                <div className="w-[1px] bg-white/10" />
                <button
                  onClick={() => {
                    setShowVoicePicker(false);
                    setShowRecordingModal(true);
                  }}
                  className="flex-1 flex flex-col items-center justify-center gap-2 py-3 sm:py-4 px-2 hover:bg-white/10 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-400 hover:text-white transition-all min-h-[44px]"
                  title="My Voice"
                >
                  <User size={16} className="sm:size-5" />
                  <span>My Voice</span>
                </button>
              </div>

              <div className="border-t border-white/5 flex items-center justify-between p-1 xs:p-1.5 sm:p-2 pt-1.5 xs:pt-2 sm:pt-3">
                {[0.8, 1.0, 1.25, 1.5].map((s) => (
                  <button
                    key={s}
                    onClick={() => setPlaybackSpeed(s)}
                    className={`px-1.5 xs:px-2 sm:px-3 py-1 xs:py-1.5 sm:py-2 rounded-sm xs:rounded-md text-[6px] xs:text-[7px] sm:text-[8px] font-bold transition-all ${playbackSpeed === s ? 'bg-sky-400 text-black' : 'text-slate-500 hover:text-white hover:bg-white/5'}`}
                  >
                    {s}x
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {title && (
        <div className="absolute -top-10 -right-10 opacity-[0.04] pointer-events-none select-none transition-transform duration-700 group-hover:scale-110">
          <span className="text-[8rem] md:text-[12rem] font-display font-bold leading-none whitespace-nowrap text-white">
            {title}
          </span>
        </div>
      )}

      {title && (
        <div className="mb-8 relative z-10">
          <h4 className="text-lg xs:text-xl md:text-2xl font-display text-yellow-100/90 tracking-widest uppercase italic border-l-2 border-yellow-500/50 pl-4">
            {renderTextWithHighlight(title, titleOffset, "text-yellow-100/90")}
          </h4>
        </div>
      )}

      <div
        ref={contentRef}
        className={`space-y-2 xs:space-y-3 sm:space-y-4 text-slate-300 font-light leading-relaxed text-xs xs:text-sm sm:text-base md:text-xl relative z-10 ${featured ? 'md:columns-2 gap-6 xs:gap-8 sm:gap-12' : ''}`}
      >
        {isSpeaking ? (
          /* Using recursive walker to inject highlights while preserving structure */
          renderChildren(children, contentStartOffset).elements
        ) : children}
      </div>

      <div className="absolute top-4 sm:top-6 right-4 sm:right-6 w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-white/10 group-hover:bg-sky-400/50 transition-colors duration-500 z-10" />
      <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-white/10 group-hover:bg-sky-400/50 transition-colors duration-500 z-10" />
    </motion.div>
  );

};

// Add this outside MindspaceView to initialize voices
if (typeof window !== 'undefined') {
  window.speechSynthesis.getVoices();
  window.speechSynthesis.onvoiceschanged = () => {
    window.speechSynthesis.getVoices();
  };
}

const MindspaceView: React.FC = () => {
  // State for own voice feature (moved from PoemCard)
  const [showRecordingModal, setShowRecordingModal] = React.useState(false);
  const [recordingError, setRecordingError] = React.useState<string | null>(null);
  const [recordedAudio, setRecordedAudio] = React.useState<Blob | null>(null);
  const [isRecording, setIsRecording] = React.useState(false);

  // Function to initialize recording
  const startRecording = async () => {
    try {
      setIsRecording(true);
      setRecordingError(null);

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);

      const chunks: Blob[] = [];
      mediaRecorder.ondataavailable = (event) => {
        chunks.push(event.data);
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'audio/webm' });
        setRecordedAudio(blob);
        stream.getTracks().forEach(track => track.stop());
        setIsRecording(false);

        // Apply the recorded voice characteristics to speech synthesis
        applyRecordedVoiceToSynthesis(blob);
      };

      mediaRecorder.onerror = (event) => {
        setIsRecording(false);
        setRecordingError('Recording failed. Please check your microphone permissions.');
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();

      // Automatically stop after 5 seconds
      setTimeout(() => {
        if (mediaRecorder.state === 'recording') {
          mediaRecorder.stop();
        }
      }, 5000);
    } catch (err) {
      setIsRecording(false);
      setRecordingError('Microphone access denied. Please allow microphone access to use your own voice.');
      console.error('Recording error:', err);
    }
  };

  // Function to apply recorded voice characteristics to speech synthesis
  const applyRecordedVoiceToSynthesis = async (audioBlob: Blob) => {
    try {
      // In a real implementation, we would analyze the recorded audio
      // to extract voice characteristics (pitch, tone, rhythm, etc.)
      // For now, we'll simulate the process

      // Extract voice characteristics from the audio (simulated)
      // In a real implementation, this would involve:
      // - Audio analysis to determine pitch patterns
      // - Frequency analysis
      // - Rhythm and timing analysis

      // For simulation purposes, we'll just store the audio characteristics
      // In a real scenario, we would extract these from the recorded audio
      localStorage.setItem('userVoiceCharacteristics', JSON.stringify({
        pitchAdjustment: 0.1, // Simulated adjustment based on user's voice
        rateAdjustment: 0.05,
        intonationPattern: 'standard'
      }));
    } catch (err) {
      console.error('Error applying voice characteristics:', err);
      // If analysis fails, we'll still use the recorded audio characteristics
      // or fall back to default
      localStorage.removeItem('userVoiceCharacteristics');
    }
  };

  // Function to handle recording error - shows fallback option
  const handleRecordingError = () => {
    setRecordingError(null);
    // Give user option to use default voice instead
    // We'll just close the modal and proceed with default
    setShowRecordingModal(false);
  };

  // Render the recording modal
  const renderRecordingModal = () => {
    if (!showRecordingModal) return null;

    return (
      <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 xs:p-4">
        <div className="bg-gray-900 border border-white/10 rounded-xl xs:rounded-2xl p-4 xs:p-6 max-w-[95vw] xs:max-w-md w-full">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg xs:text-xl font-bold text-white">Record Your Voice</h3>
            <button
              onClick={() => {
                setShowRecordingModal(false);
                setRecordingError(null);
              }}
              className="text-gray-400 hover:text-white"
            >
              <X size={20} />
            </button>
          </div>

          <div className="mb-6">
            <p className="text-gray-300 text-sm xs:text-base mb-3 xs:mb-4">
              Please read the following sample text to help us match your voice characteristics:
            </p>
            <div className="bg-gray-800/50 p-3 xs:p-4 rounded-md xs:rounded-lg border border-white/5">
              <p className="text-center text-white italic text-sm xs:text-base">"आवाज़ सुनाओ मुझे अपनी, मैं गाऊंगा तुम्हारे अहसास की गाथा।"</p>
            </div>
          </div>

          {recordingError && (
            <div className="mb-4 p-2 xs:p-3 bg-red-900/30 border border-red-500/50 rounded-md xs:rounded-lg text-red-300 text-sm">
              {recordingError}
              <div className="mt-2 xs:mt-3 flex flex-col xs:flex-row gap-2">
                <button
                  onClick={() => {
                    setRecordingError(null);
                    startRecording();
                  }}
                  className="py-2 px-3 bg-red-700 hover:bg-red-600 text-white rounded text-sm"
                >
                  Record Again
                </button>
                <button
                  onClick={() => {
                    setRecordingError(null);
                    setShowRecordingModal(false);
                    // Use default 35-year-old Hindi-Urdu professor voice
                    // This will be handled by the speak function in PoemCard
                  }}
                  className="py-2 px-3 bg-sky-700 hover:bg-sky-600 text-white rounded text-sm"
                >
                  Use Default Voice
                </button>
              </div>
            </div>
          )}

          <div className="flex flex-col gap-3">
            {!isRecording ? (
              <>
                <button
                  onClick={startRecording}
                  className="flex items-center justify-center gap-2 bg-sky-600 hover:bg-sky-500 text-white py-2.5 xs:py-3 px-3 xs:px-4 rounded-md xs:rounded-lg transition-colors"
                >
                  <Mic2 size={16} className="xs:size-[18px]" />
                  Start Recording (5 Sec)
                </button>

                <button
                  onClick={() => {
                    setShowRecordingModal(false);
                    // Use default 35-year-old Hindi-Urdu professor voice
                  }}
                  className="py-2.5 xs:py-3 px-3 xs:px-4 bg-gray-700 hover:bg-gray-600 text-white rounded-md xs:rounded-lg transition-colors"
                >
                  Use Default Voice Instead
                </button>
              </>
            ) : (
              <div className="flex flex-col items-center gap-2 xs:gap-3">
                <div className="flex items-center gap-2 text-red-400">
                  <div className="w-2.5 xs:w-3 h-2.5 xs:h-3 bg-red-500 rounded-full animate-pulse"></div>
                  <span className="text-sm xs:text-base">Recording... Please read the sample text aloud</span>
                </div>
                <p className="text-gray-400 text-xs xs:text-sm">Reading the sample text aloud</p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      {renderRecordingModal()}
      <div className="min-h-screen py-12 xs:py-16 sm:py-32 px-3 xs:px-4 relative max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-20 xs:mb-24 sm:mb-32 relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[12vw] xs:text-[15vw] md:text-[18vw] font-display font-bold text-white/[0.02] select-none pointer-events-none"
          >
            साहिर
          </motion.div>

          <div className="relative z-10 space-y-3 xs:space-y-4">
            <motion.h2
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="text-3xl xs:text-4xl sm:text-6xl md:text-8xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40 italic"
            >
              Sikandar
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-sky-400 font-display uppercase tracking-[0.25em] xs:tracking-[0.3em] sm:tracking-[0.4em] text-[8px] xs:text-[10px] sm:text-xs md:text-sm font-bold"
            >
              The Poetic Resonance of Aman
            </motion.p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-6 sm:gap-8 md:gap-12">
          {/* Intro Verses */}
          <div className="space-y-6 sm:space-y-8 md:space-y-12 flex flex-col justify-center">
            <PoemCard delay={0.1}>
              <p>एक दुनिया था ख़ुद में, और था ये भी की</p>
              <p className="text-sky-200/80">मुट्ठी भर राख के मुक़ाबिल ना था ।।</p>
              <div className="h-4" />
              <p>पूछते हैं उनसे अकेलेपन की इंतहाँ ?</p>
              <p className="text-sky-200/80">वो ख़ुद अपने जनाज़े में शामिल ना था ।</p>
              <div className="h-4" />
              <p>वो टूट के भी मुस्कुरा रहा है अमन से ,</p>
              <p className="text-sky-200/80">कुछ भी था, वो रोने के क़ाबिल ना था।</p>
            </PoemCard>
          </div>

          {/* Featured Long Poem */}
          <PoemCard title="पत्थर के ज़ुबाँ" className="row-span-2" delay={0.4}>
            <p>जौन तुम्हें कुछ बताना चाहता था,<br /><span className="text-sky-200/80">सफ़र को छोड़ के वो घर आना चाहता था ।</span></p>
            <p>झुर्रियों को लपेट के मेरी आँखों पर,<br /><span className="text-sky-200/80">नख़ुदा सैलाब छुपाना चाहता था।</span></p>
            <p>उसने मेरे कंधे पर हाथ रखा ऐसे,<br /><span className="text-sky-200/80">कोई आसमाँ का ठिकाना चाहता था।</span></p>
            <p>लाज़िमी तो नहीं पर बस शब-ए-फ़िराक़ में,<br /><span className="text-sky-200/80">अपनी ग़लतियों के वाजिब, ग़ुरुर एक आशियाना चाहता था ।</span></p>
            <p>उसको सरे-आफ़ताब पर बिठा के अमन से दरिया,<br /><span className="text-sky-200/80">दरिया के किनारे में ठिकाना चाहता था।</span></p>
            <p>नुमाइश की सौख कोई नहीं मुझको ।।<br /><span className="text-sky-200/80">साहिर तो फ़क़त एक ज़माना चाहता था।</span></p>
            <p className="text-sky-200/80">साहिर तो फ़कत एक ज़माना चाहता था।</p>
            <p>उन दुश्मनों को भी याद रखे मुसल्सल ज़माना,</p>
            <p><span className="text-sky-200/80">वैरी फ़रेब के बदले मर जाना चाहता था।</span></p>
            <p>सुनते थका नहीं आरज़ू वो सारे जहाँ की ।।<br /><span className="text-sky-200/80">सारे जहाँ को एक उम्र पहले, वो छोड़ जाना चाहता था।</span></p>
            <p className="text-sky-200/80">सारे जहाँ को एक उम्र पहले, वो छोड़ जाना चाहता था।</p>
            <p>ये उजड़े हुए घरों को देख के ठहर गया वरना,<br /><span className="text-sky-200/80">वो इन हाथों से अपना घर सजाना चाहता था।</span></p>
            <p>हर एक को राह में पत्थर दिख रहा है एक,<br /><span className="text-sky-200/80">बेज़ुबा! इन जाने वालों को मनाना चाहता था।</span></p>
            <p>क़त्ल से पहले का एक ख़त मिला है मुझको.. |2|<br /><span className="text-sky-200/80">ये लटका हुआ हक़ीक़त में, बदल जाना चाहता था ।।</span></p>
            <p className="text-sky-200/80">ये लटका हुआ, हक़ीक़त में, बदल जाना चाहता था ।।</p>
          </PoemCard>
        </div>

        <div className="mt-8 xs:mt-12 sm:mt-20 space-y-8 xs:space-y-12 sm:space-y-20">
          <PoemCard title="हमसफ़र" featured>
            <p>आसमाँ से छिपा के सख़्सियत अपनी ,<br /><span className="text-sky-200/80">सितारों को साहिल हमसफ़र समझते हैं।</span></p>
            <p>मोहब्बत भी फ़क़त फकीरी है,<br /><span className="text-sky-200/80">ये उनके दिल को अपना घर समझते हैं।</span></p>
            <p>कहते हैं मुझको ग़लतियाँ सुधारो "अमन",<br /><span className="text-sky-200/80">अपनी परछाई से हमको जो बेख़बर समझते हैं।</span></p>
            <p>देखते नहीं मुझको लोग अब मुस्कुराते हुए,<br /><span className="text-sky-200/80">ये भीड़ बस उनका हुनर देखते हैं।</span></p>
            <p>मौत जिनको अज़ीज़ है मुद्दतों से जानी,<br /><span className="text-sky-200/80">उनकी आँखों में देखने से डरते हैं।</span></p>
            <p>"उन्हें क्या लेना देना तुम्हारे ज़ख्म की गहराइयों से,<br /><span className="text-sky-200/80">इल्ज़ाम दिल पर लगाते है,जो जिगर देखते हैं।</span></p>
            <p>उनके शहर के लोग कह रहे थे मुझको,<br /><span className="text-sky-200/80">गुज़रने वाले यहाँ एक रोज़, ठहर कर देखते हैं."</span></p>
            <p>और,<br />वहम के मारे हैं ये इश्क़ को क़ातिल बताने वाले ।।<br /><span className="text-sky-200/80">ये चाँद के मुरीद हैं! जो इन्हें जी भर कर देखते हैं।।</span></p>
            <p className="mt-4 text-sky-400 font-bold">- अमन</p>
          </PoemCard>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4 xs:gap-6 sm:gap-8 md:gap-12">
            <PoemCard title="साथ कौन है?">
              <p>वो मेरे सीने में धड़कन अपनी , सहेज कुछ यूँ रहा है<br /><span className="text-sky-200/80">वो इस क़दर जकड़ के भी मुझको, ढूँड़ तो सुकूँ रहा है !</span></p>
              <div className="h-px bg-white/5 w-full my-4" />
              <p>वो जिसे आरज़ू सिर्फ़ मेरी हुआ करती थी जाना<br /><span className="text-sky-200/80">मेरे बाद जो वो ढूँड रहा है, क्यू रहा है !</span></p>
              <p className="text-sky-200/80">मेरे बाद जो वो ढूँड रहा है, क्यू रहा है !</p>
            </PoemCard>

            <PoemCard title="कौन जाने मोहब्बत">
              <p>ये कैसे दिखते हैं ज़िंदा लोग मरे हुए?<br /><span className="text-sky-200/80">हमसे पूछते हो? हम अपनी जाँ के पराए हैं।</span></p>
              <p>ये इतने सारे बिन पगड़ी के लोग? ( पगड़ी - ज़मीर )<br /><span className="text-sky-200/80">ये कौन हैं, ये कहाँ से आए हैं?</span></p>
              <p>मसला सुनो!! जाँ नहीं निकलती तबीब!! (तबीब- डॉक्टर)<br /><span className="text-sky-200/80">ये महफ़िल में मेरी जाँ, मेरी दवा लूटा के आए हैं!</span></p>
              <p>उनके बारे में कहानियों में सुना था,<br /><span className="text-sky-200/80">हवाएँ मदहोश लगे, समझना उसने गीले बाल सुखाए हैं।</span></p>
              <p>और,<br />चाँद की बातें करने वाले उनके अज़ीज़ हुए! ।।<br /><span className="text-sky-200/80">दीद को तरस रहे, जाहिल जो चाँद तोड़ के लाए हैं!</span></p>
            </PoemCard>
          </div>
        </div>

        <div className="mt-8 xs:mt-12 sm:mt-20 space-y-8 xs:space-y-12 sm:space-y-20">
          <PoemCard title="दस्तार" featured>
            <p>उनको छू कर हवा कहती है मुझसे</p>
            <p className="text-sky-200/80">तमाशा देखेंगे, ख़ुद को साहिब-ए-ईसार बताने वाले</p>
            <p>उनकी आँखों में देखने वाले जाँ हिफ़ाज़त रखना</p>
            <p className="text-sky-200/80">खुले-आम घूमते हैं ये तलवार दिखाने वाले</p>
            <p>ये बार-बार ख़्वाबों में उसको ख़्वाब दिखाने वाले</p>
            <p className="text-sky-200/80">एक क़त्ल करके सो रहे हैं ख़ुद को ज़ार दिखाने वाले</p>
            <p>उसकी आँखें नम देख के ये मालूम हुआ मुझको</p>
            <p className="text-sky-200/80">अदा-कार हैं ये फ़रेबी, ख़ुद को अना अफ़गार दिखाने वाले</p>
            <p>मुझको ज़िंदा समझ कर ज़ेहन से उतारा होगा</p>
            <p className="text-sky-200/80">मेरी क़ब्र से लिपटे पड़े हैं, मुझको औज़ार दिखाने वाले</p>
            <p>जो गुलाब दे के गए हैं, काँटे-पसंद लोग मुझको</p>
            <p className="text-sky-200/80">मुस्कुरा रहे हैं, इस्तिबशार सुनाने वाले</p>
            <p>एक क़तरा भर कामयाबी न संभले "अमन" जिनसे</p>
            <p className="text-sky-200/80">शाह आँकते हैं ख़ुद को, मेरे दस्तार बनाने वाले</p>
            <p>नहीं रख़्श-ए-ख़ौफ़ नहीं, एक नाराज़गी भर है</p>
            <p className="text-sky-200/80">तुम्हारा नाम नहीं लेते, आफ़ताब के जानकार कहलाने वाले</p>
            <p>ये क्या तमाशा है मोहब्बत का</p>
            <p className="text-sky-200/80">मेरा आशिक़ बता रहे हैं मुझको हार के घर जाने वाले</p>
            <p>और</p>
            <p>एक क़िस्म के लोग तो होंगे उनसे रब-अता है जिनको</p>
            <p className="text-sky-200/80">और फिर हम जैसे हैं, आफ़ियत-बेज़ार नज़र आने वाले</p>
            <p className="mt-4 text-sky-400 font-bold">— अमन</p>
          </PoemCard>

          {/* New Music Sections */}
          <MusicRoomSection />
          <div className="h-px bg-white/5 w-full my-12" />
          <DeepSequenceArchive />

          <PoemCard title="आइनों के शक़्ल">
            <p>एक तरफ़ देखा तो उसकी आँखें दिख रही थी</p>
            <p className="text-sky-200/80">एक तरफ़ सीने में जैसे खंजर उतर रहा था।</p>
            <p>हमने निकाला दिल अपना हथेली पर रख दिया</p>
            <p className="text-sky-200/80">मेरी ज़ाँ इसी बात पर वो मुझसे झगड़ रहा था।</p>
            <p>वो मेरा नाम लेता है ऐसे |2|</p>
            <p className="text-sky-200/80">कोई क़त्ल करके मुकर रहा था।</p>
            <p className="text-sky-200/80">कोई क़त्ल करके मुकर रहा था।</p>
            <p>फ़क़त एक आदमी था उस आईने के सामने,</p>
            <p className="text-sky-200/80">आईने में जैसे कोई भीड़ उमड़ रहा था ।</p>
            <p>ज़ेहन में सोचा था एक शहर रंग का</p>
            <p className="text-sky-200/80">रंग जो उसकी आँखों से उतर रहा था।</p>
            <p>और</p>
            <p>जिसे ज़ेहन से निकालने की ज़हमत है सारी ।2|</p>
            <p className="text-sky-200/80">वो मेरे सीने में घर कर रहा था ।।</p>
            <p className="text-sky-200/80">वो मेरे सीने में घर कर रहा था ।।</p>
            <p className="mt-4 text-sky-400 font-bold">— अमन</p>
          </PoemCard>

          <PoemCard title="ताका-झाँकी">
            <p>इन्हें समंदर से मिलना है, और किनारे ढूँढते हैं,</p>
            <p className="text-sky-200/80">ये ज़मीन पे रहने वाले हैं, जो सितारे ढूँढते हैं।</p>
            <p>सच पूछो तो अपने गिरेबाँ का पता नहीं इन्हें,</p>
            <p className="text-sky-200/80">ये, ये जो चाँद में भी दरारें ढूँढते हैं।</p>
            <p className="mt-4 text-sky-200/80">&#123; Distracted Self love&#125;</p>
            <p className="mt-4">They long to meet the ocean, those who seek a shore,</p>
            <p className="text-sky-200/80">Yet they are earthbound souls, chasing stars evermore.</p>
            <p>Truth be told, they fail to know the land they tread,</p>
            <p className="text-sky-200/80">For they search for cracks in the moon instead.</p>
            <p className="mt-4 text-sky-400 font-bold">— अमन</p>
          </PoemCard>

          <PoemCard title="नई जगह है">
            <p>नई जगह है,</p>
            <p className="text-sky-200/80">ये शानदार नुमाइश की चीज़ हवेली।</p>
            <p>लिपटने को कुछ,</p>
            <p className="text-sky-200/80">एक कोना मेरे गाँव से बस कम लगता है।</p>
            <p>दिन गुज़रता रहा</p>
            <p className="text-sky-200/80">एक अंजान ख़याल के साथ,</p>
            <p>मेरी हँसी को</p>
            <p className="text-sky-200/80">ये अज़नवी मेरा ज़ख़्म कहता है।</p>
            <p>वो एक ख़याल</p>
            <p className="text-sky-200/80">ऐसे मुकरता है मुझसे,</p>
            <p>वो एक ख़याल</p>
            <p className="text-sky-200/80">ऐसे मुकरता है मुझसे,</p>
            <p>जैसे सड़क से उठाया</p>
            <p className="text-sky-200/80">किसी ग़ैर का हम-ग़म लगता है।</p>
            <p>किसने मोड़ा है</p>
            <p className="text-sky-200/80">सच का स्वाद</p>
            <p>कड़वाहट की ओर,</p>
            <p className="text-sky-200/80">जो खड़ा है मरहम लिए,</p>
            <p>वो भी बेरहम लगता है।</p>
            <p>अजीब सी एक जगह है</p>
            <p className="text-sky-200/80">शहर नाम का उस तरफ़,</p>
            <p>वहाँ ख़ुशियाँ जैसे मरा हुआ</p>
            <p className="text-sky-200/80">कोई वहम लगता है।</p>
            <p>फिर एक रात</p>
            <p className="text-sky-200/80">टहलते हुए</p>
            <p>चाँद को निहारते,</p>
            <p className="text-sky-200/80">ये सवाल पूछा मन ने…,</p>
            <p>अच्छा,</p>
            <p className="text-sky-200/80">एक पत्थर को</p>
            <p>एक मिसाल होने में,</p>
            <p className="text-sky-200/80">आख़िर…?</p>
            <p>कितना ज़नम लगता है?</p>
            <p className="text-sky-200/80">ज़हन के किसी कोने से</p>
            <p>चिल्लाती एक आवाज़ आती है—</p>
            <p className="text-sky-200/80">मरते हैं लोग,</p>
            <p>पत्थर बेज़ान होते हैं।</p>
            <p className="text-sky-200/80">पत्थर ही बताएगा</p>
            <p>मरे रहने में</p>
            <p className="text-sky-200/80">कितना संयम लगता है?</p>
            <p>सवाल फिर ये भी कि</p>
            <p className="text-sky-200/80">अगर मरते हैं लोग</p>
            <p>झूठी क़समों के</p>
            <p className="text-sky-200/80">सिरहाने आकर,</p>
            <p>तो फिर एक जीवन को</p>
            <p className="text-sky-200/80">जीने भर में</p>
            <p>ये इतना इल्म</p>
            <p className="text-sky-200/80">क्यों लगता है?</p>
            <p>और अचानक</p>
            <p className="text-sky-200/80">ज़हन शांत।</p>
            <p>एक कारण,</p>
            <p className="text-sky-200/80">एक जवाब,</p>
            <p>और एक कोना ढूँढते हुए,</p>
            <p className="text-sky-200/80">मानो एक बोझ को</p>
            <p>एक कंधे से</p>
            <p className="text-sky-200/80">दूसरे कंधे पर</p>
            <p className="text-sky-200/80">सरियाते हुए</p>
            <p className="text-sky-200/80">एक आवाज़ गूँजती है —</p>
            <p>"अरे!</p>
            <p className="text-sky-200/80">ना ग़म की गुंजाइश है,</p>
            <p>कहाँ कोई वहम बचता है।</p>
            <p className="text-sky-200/80">ना किसी इल्म की है ज़रूरत—</p>
            <p>सर उठाओ!</p>
            <p className="text-sky-200/80">क्यों शर्म लगता है?</p>
            <p>इस जीवन को काटना है</p>
            <p className="text-sky-200/80">तो सोच के आँगन से</p>
            <p>निकल जाना—बहार।</p>
            <p className="text-sky-200/80">पर गर जीना हो,</p>
            <p>तो सोच से सिमट कर सुनना —</p>
            <p className="text-sky-200/80">एक टुकड़ा काग़ज़ का,</p>
            <p>एक क़लम लगता है।</p>
            <p className="text-sky-200/80">एक सड़क कील का,</p>
            <p>और बस</p>
            <p className="text-sky-200/80">इक क़दम लगता है."</p>
            <p className="mt-4 text-sky-400 font-bold">— अमन</p>
          </PoemCard>

          <PoemCard title="Galatfehmi {गलतफहमी}">
            <p>मोहब्बतन रखा उसके कदमों में ताज शहंशाह,</p>
            <p className="text-sky-200/80">हम बताएं? कैसे हुआ बरबाद शहंशाह? </p>
            <div className="h-4" />
            <p className="text-sky-200/80">baahon me bharkar samandar puchta hai aman se katra</p>
            <p className="text-sky-200/80">Saansein bachi hai ? ya karu tumhe</p>
            <p className="text-sky-200/80">aazad Shah-Anshan !</p>
            <div className="h-4" />
            <p className="text-sky-200/80">&#123; बाहों में भरकर समंदर पूछता है अमन से कतरा ,</p>
            <p className="text-sky-200/80">सांसें बची हैं? या कर दूँ तुम्हें आज़ाद शहंशाह? &#125;</p>
            <p className="mt-4 text-sky-400 font-bold">— अमन</p>
          </PoemCard>
        </div>
      </div>
    </>
  );
};


// Global Audio Controller for optimized playback
let globalAudio: HTMLAudioElement | null = null;

const MusicRoomSection: React.FC = () => {
  const music = useStore((state) => state.music);
  const [playingId, setPlayingId] = React.useState<string | null>(null);
  const [isLoading, setIsLoading] = React.useState<string | null>(null);
  const audioRef = React.useRef<HTMLAudioElement | null>(null);

  const togglePlay = async (track: StoreMusicItem) => {
    if (playingId === track.id) {
      audioRef.current?.pause();
      setPlayingId(null);
      return;
    }

    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = "";
    }

    setIsLoading(track.id);
    const audio = new Audio(track.url);
    audioRef.current = audio;
    audio.preload = "auto";

    audio.oncanplaythrough = () => {
      if (audioRef.current === audio) {
        setIsLoading(null);
        setPlayingId(track.id);
        audio.play().catch(console.error);
      }
    };

    audio.onwaiting = () => setIsLoading(track.id);
    audio.onplaying = () => {
      setIsLoading(null);
      setPlayingId(track.id);
    };

    audio.onerror = () => {
      setIsLoading(null);
      setPlayingId(null);
      alert("Error loading transmission chunk.");
    };

    audio.onended = () => setPlayingId(null);
  };

  if (music.length === 0) return null;

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="flex flex-col items-center mb-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="p-4 bg-sky-400/10 rounded-2xl text-sky-400 mb-6"
        >
          <Headphones size={32} />
        </motion.div>
        <h3 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">Neural Soundscapes</h3>
        <p className="text-slate-500 uppercase tracking-widest text-xs font-bold">Optimized for high-fidelity playback // One-click sequence sync</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {music.slice(0, 6).map((track, index) => (
          <motion.div
            key={track.id}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className="glass p-8 rounded-[2.5rem] border-white/5 group hover:border-sky-400/30 transition-all relative overflow-hidden"
          >
            {playingId === track.id && (
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ duration: track.duration, ease: 'linear' }}
                className="absolute bottom-0 left-0 h-1 bg-sky-400/30"
              />
            )}

            <div className="flex items-center gap-6 mb-8">
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-all ${playingId === track.id ? 'bg-sky-400 text-black shadow-[0_0_20px_rgba(56,189,248,0.4)]' : 'bg-white/5 text-slate-400 group-hover:text-sky-400'}`}>
                {isLoading === track.id ? (
                  <Loader2 className="animate-spin" size={28} />
                ) : (
                  <Music size={28} className={playingId === track.id ? 'animate-pulse' : ''} />
                )}
              </div>
              <div className="flex-1">
                <h4 className="text-xl font-display font-bold text-white mb-1 group-hover:text-sky-300 transition-colors uppercase tracking-tight">{track.title}</h4>
                <div className="flex items-center gap-3 text-slate-500 text-[10px] font-bold uppercase tracking-widest">
                  <Clock size={12} />
                  <span>{Math.floor(track.duration / 60)}:{(track.duration % 60).toFixed(0).padStart(2, '0')}</span>
                  <span className="w-1 h-1 rounded-full bg-slate-800" />
                  <Volume2 size={12} className={playingId === track.id ? 'text-sky-400' : ''} />
                </div>
              </div>
            </div>

            <button
              onClick={() => togglePlay(track)}
              disabled={isLoading !== null && isLoading !== track.id}
              className={`w-full py-5 rounded-2xl font-bold uppercase tracking-widest text-[10px] transition-all flex items-center justify-center gap-3 active:scale-[0.98] ${playingId === track.id ? 'bg-white text-black' : 'bg-sky-400/10 text-sky-400 hover:bg-sky-400 hover:text-black'}`}
            >
              {isLoading === track.id ? (
                <><Loader2 className="animate-spin" size={16} /> Syncing Data...</>
              ) : playingId === track.id ? (
                <><Pause size={18} fill="currentColor" /> Break Connection</>
              ) : (
                <><Play size={18} fill="currentColor" /> Initiate Stream</>
              )}
            </button>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

const DeepSequenceArchive: React.FC = () => {
  const music = useStore((state) => state.music);
  const [playingId, setPlayingId] = React.useState<string | null>(null);
  const [isLoading, setIsLoading] = React.useState<string | null>(null);
  const audioRef = React.useRef<HTMLAudioElement | null>(null);

  // Only show tracks marked for archive or just the latter half of the library
  const archiveData = music.slice(6);
  if (archiveData.length === 0) return null;

  const togglePlay = (track: StoreMusicItem) => {
    if (playingId === track.id) {
      audioRef.current?.pause();
      setPlayingId(null);
      return;
    }

    if (audioRef.current) audioRef.current.pause();

    setIsLoading(track.id);
    const audio = new Audio(track.url);
    audioRef.current = audio;

    audio.onplaying = () => {
      setIsLoading(null);
      setPlayingId(track.id);
    };
    audio.onended = () => setPlayingId(null);
    audio.play().catch(() => {
      setIsLoading(null);
      setPlayingId(null);
    });
  };

  return (
    <section className="py-24 border-t border-white/5">
      <div className="flex items-center gap-6 mb-16">
        <div className="w-16 h-16 glass rounded-2xl flex items-center justify-center text-sky-400 shadow-[0_0_30px_rgba(56,189,248,0.1)]">
          <Database size={28} />
        </div>
        <div>
          <h3 className="text-3xl font-display font-bold text-white">The 50GB Archive</h3>
          <p className="text-slate-500 uppercase tracking-widest text-[10px] font-bold">High-capacity storage vault // Deep neural sequences</p>
        </div>
      </div>

      <div className="space-y-4">
        {archiveData.map((track) => (
          <div
            key={track.id}
            className="glass p-6 rounded-2xl border-white/5 flex items-center justify-between hover:bg-white/[0.02] transition-colors group cursor-pointer"
            onClick={() => togglePlay(track)}
          >
            <div className="flex items-center gap-6">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${playingId === track.id ? 'bg-sky-400 text-black' : 'bg-white/5 text-slate-500'}`}>
                {isLoading === track.id ? <Loader2 className="animate-spin" size={20} /> : playingId === track.id ? <Pause size={20} /> : <Play size={20} />}
              </div>
              <div>
                <h4 className="text-sm font-bold text-white group-hover:text-sky-300 transition-colors uppercase tracking-widest">{track.title}</h4>
                <p className="text-[9px] text-slate-500 font-bold uppercase tracking-[0.2em] mt-1">Archive Chunk // {Math.floor(track.duration / 60)}:{(track.duration % 60).toFixed(0).padStart(2, '0')}</p>
              </div>
            </div>
            <div className="flex items-center gap-4 text-sky-400 opacity-0 group-hover:opacity-100 transition-opacity">
              <Volume2 size={16} className={playingId === track.id ? 'animate-pulse' : ''} />
              <span className="text-[9px] font-bold uppercase tracking-[0.3em]">Online</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

const NeuralVisualizer: React.FC<{ pulse?: number }> = ({ pulse = 0 }) => {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: any[] = [];
    let nebulaTime = 0;

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    window.addEventListener('resize', resize);
    resize();

    // Init particles with more "neural" feel
    for (let i = 0; i < 60; i++) {
      particles.push({
        x: Math.random() * canvas.offsetWidth,
        y: Math.random() * canvas.offsetHeight,
        size: Math.random() * 1.5 + 0.5,
        speedX: (Math.random() - 0.5) * 1,
        speedY: (Math.random() - 0.5) * 1,
        color: `rgba(56, 189, 248, ${Math.random() * 0.3})`,
        life: Math.random(),
      });
    }

    const draw = (time: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      nebulaTime += 0.01;

      // Pulse background glow
      const pulseOpacity = (Math.sin(nebulaTime * 2) + 1) * 0.05;
      ctx.fillStyle = `rgba(14, 165, 233, ${pulseOpacity})`;
      ctx.fillRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);

      // Neural Waves
      for (let i = 0; i < 3; i++) {
        ctx.beginPath();
        ctx.strokeStyle = `rgba(56, 189, 248, ${0.1 / (i + 1)})`;
        ctx.lineWidth = 1;
        const offset = i * 20;
        ctx.moveTo(0, canvas.offsetHeight / 2 + offset);

        for (let x = 0; x < canvas.offsetWidth; x += 3) {
          const y = (canvas.offsetHeight / 2) + offset +
            Math.sin(x * 0.02 + nebulaTime + i) * (20 + (pulse / 2));
          ctx.lineTo(x, y);
        }
        ctx.stroke();
      }

      // Particles showing synaptic connections
      particles.forEach((p, idx) => {
        p.x += p.speedX;
        p.y += p.speedY;
        if (p.x < 0 || p.x > canvas.offsetWidth) p.speedX *= -1;
        if (p.y < 0 || p.y > canvas.offsetHeight) p.speedY *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();

        // Connect nearby particles lightly
        particles.slice(idx + 1, idx + 5).forEach(p2 => {
          const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
          if (dist < 80) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(56, 189, 248, ${0.05 * (1 - dist / 80)})`;
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        });
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    animationFrameId = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resize);
    };
  }, [pulse]);

  return <canvas ref={canvasRef} className="w-full h-full" />;
};

export default MindspaceView;

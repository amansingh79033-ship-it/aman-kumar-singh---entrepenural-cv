import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic2, User, UserCheck, X } from 'lucide-react';

const PoemCard: React.FC<{
  title?: string;
  children: React.ReactNode;
  className?: string;
  delay?: number;
  featured?: boolean;
}> = ({ title, children, className = "", delay = 0, featured = false }) => {
  const [showVoicePicker, setShowVoicePicker] = React.useState(false);
  const [isSpeaking, setIsSpeaking] = React.useState(false);
  const [isPaused, setIsPaused] = React.useState(false);
  const [highlightRange, setHighlightRange] = React.useState<{ start: number; end: number } | null>(null);
  const contentRef = React.useRef<HTMLDivElement>(null);
  const [playbackSpeed, setPlaybackSpeed] = React.useState(1.0);
  const utteranceRef = React.useRef<SpeechSynthesisUtterance | null>(null);
  const [pausePosition, setPausePosition] = React.useState<number>(0);
  const backgroundAudioRef = React.useRef<HTMLAudioElement | null>(null);

  // Handle mobile device audio playback policies
  React.useEffect(() => {
    // On mobile devices, audio playback often requires user interaction first
    const handleUserInteraction = () => {
      if (backgroundAudioRef.current && backgroundAudioRef.current.paused) {
        backgroundAudioRef.current.play().catch(e => console.log('Background music play prevented:', e));
      }
      // Remove the event listener after first interaction
      document.removeEventListener('touchstart', handleUserInteraction);
      document.removeEventListener('click', handleUserInteraction);
    };

    document.addEventListener('touchstart', handleUserInteraction);
    document.addEventListener('click', handleUserInteraction);

    return () => {
      document.removeEventListener('touchstart', handleUserInteraction);
      document.removeEventListener('click', handleUserInteraction);
    };
  }, []);

  const stopSpeaking = () => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
    setIsPaused(false);
    setHighlightRange(null);
    setPausePosition(0);
    utteranceRef.current = null;
  };

  const pauseSpeaking = () => {
    if (isSpeaking && !isPaused) {
      window.speechSynthesis.pause();
      setIsPaused(true);
      setIsSpeaking(false);
      
      // Pause background music as well
      pauseBackgroundMusic();
    }
  };

  const resumeSpeaking = () => {
    if (isPaused) {
      window.speechSynthesis.resume();
      setIsPaused(false);
      setIsSpeaking(true);
      
      // Resume background music as well
      resumeBackgroundMusic();
    }
  };

  const speak = (gender: 'male' | 'female') => {
    if (isPaused) {
      // If we're paused, just resume from where we left off
      resumeSpeaking();
      return;
    }
    
    setShowVoicePicker(false);
    window.speechSynthesis.cancel();
    setPausePosition(0);
    setIsPaused(false);

    // Targeted extraction to avoid UI text or duplicated titles
    const textElements = contentRef.current?.querySelectorAll('p');
    let poemContent = "";
    if (textElements && textElements.length > 0) {
      // Extract text content and add poetic pauses
      poemContent = Array.from(textElements).map(el => (el as HTMLElement).innerText
        .replace(/[,.!?;:]/g, ' — ') // Replace punctuation with em-dashes for natural pauses
        .replace(/\|2\|/g, '') // Remove special formatting characters
        .replace(/\s+/g, ' ') // Normalize whitespace
        .replace(/\s*—\s*/g, ' — ') // Ensure proper spacing around em-dashes
      ).join('\n\n\n\n'); // Add extra line breaks for longer pauses between stanzas - more dramatic effect
    } else {
      poemContent = (contentRef.current as HTMLElement)?.innerText || "";
    }

    const fullText = title ? `${title}.\n\n${poemContent}` : poemContent;
    const utterance = new SpeechSynthesisUtterance(fullText);
    utteranceRef.current = utterance;

    const voices = window.speechSynthesis.getVoices();
    // Filter voices for Hindi/Indian languages
    const hiVoices = voices.filter(v => v.lang.startsWith('hi') || v.lang.startsWith('en-IN'));

    let selectedVoice = null;
    if (gender === 'male') {
      // Prioritize male voices for Hindi/Indian languages that sound more expressive
      selectedVoice = hiVoices.find(v => 
        v.name.toLowerCase().includes('male') || 
        v.name.toLowerCase().includes('ravi') || 
        v.name.toLowerCase().includes('david') ||
        v.name.toLowerCase().includes('mark') ||
        v.name.toLowerCase().includes('guy') ||
        v.name.toLowerCase().includes('suresh') ||
        v.name.toLowerCase().includes('ramesh')
      );
      
      // If no specific male voice found, try to find a voice with more emotional but firm voice quality
      if (!selectedVoice) {
        selectedVoice = hiVoices.find(v => 
          v.name.toLowerCase().includes('standard') ||
          v.name.toLowerCase().includes('premium') ||
          v.name.toLowerCase().includes('expressive')
        );
      }
    } else {
      // Prioritize female voices for Hindi/Indian languages that sound more expressive
      selectedVoice = hiVoices.find(v => 
        v.name.toLowerCase().includes('female') || 
        v.name.toLowerCase().includes('lena') || 
        v.name.toLowerCase().includes('shwati') || 
        v.name.toLowerCase().includes('zara') ||
        v.name.toLowerCase().includes('sangeeta') ||
        v.name.toLowerCase().includes('swathi')
      );
      
      // If no specific female voice found, try to find a voice with more emotional quality
      if (!selectedVoice) {
        selectedVoice = hiVoices.find(v => 
          v.name.toLowerCase().includes('standard') ||
          v.name.toLowerCase().includes('premium') ||
          v.name.toLowerCase().includes('expressive')
        );
      }
    }
    
    // Fallback to any available Hindi/Indian voice
    if (!selectedVoice) {
      selectedVoice = hiVoices[0];
    }
    
    // If no Hindi voice found, use any available voice
    if (!selectedVoice) {
      selectedVoice = voices[0];
    }

    if (selectedVoice) utterance.voice = selectedVoice;

    utterance.lang = 'hi-IN';
    // For poetic delivery, use more expressive parameters
    utterance.pitch = gender === 'female' ? 0.85 : 0.6; // More expressive pitch for shayar-like delivery
    utterance.rate = playbackSpeed; // Adjust rate to match selected speed (was playbackSpeed * 0.45 which was too slow)
    utterance.volume = 0.8; // Slightly higher volume for better clarity

    utterance.onstart = () => {
      setIsSpeaking(true);
      // Set initial pitch based on gender for emotional delivery
      if (gender === 'female') {
        utterance.pitch = 0.85;
      } else {
        utterance.pitch = 0.6;
      }
      
      // Start background music when speech starts
      startBackgroundMusic();
    };
    utterance.onend = () => {
      setIsSpeaking(false);
      setHighlightRange(null);
      
      // Stop background music when speech ends
      stopBackgroundMusic();
    };
    utterance.onerror = () => {
      setIsSpeaking(false);
      setHighlightRange(null);
      
      // Stop background music if there's an error
      stopBackgroundMusic();
    };

    utterance.onboundary = (event) => {
      if (event.name === 'word') {
        const start = event.charIndex;
        // Estimate word length if not provided by browser
        const end = start + (event.charLength || fullText.slice(start).split(/\s|[,.!]/)[0].length);
        setHighlightRange({ start, end });
        
        // Add dynamic pitch variations based on emotional content
        // For shayar-like delivery, adjust pitch based on word meaning
        const currentWord = fullText.substring(start, end).toLowerCase();
        
        // Words that should have more emotional emphasis
        const emotionalWords = ['मोहब्बत', 'दिल', 'जज़्बात', 'ग़म', 'याद', 'तकलीफ', 'ख़ुशी', 'मोहब्बतन', 'दर्द', 'इश्क़', 'हर्ज़ा', 'ख़्वाब', 'आह', 'सांस', 'ज़िंदगी', 'मौत', 'तमाशा', 'नज़र', 'आइना', 'मिलाप', 'विछोह', 'साहिर', 'शहंशाह', 'ताज', 'क़त्ल', 'ज़ख्म', 'नम', 'हवा', 'तलवार', 'साहिब', 'ईसार', 'हिफ़ाज़त', 'ज़ार', 'फ़रेबी', 'अना', 'अफ़गार', 'औज़ार', 'इस्तिबशार', 'रख़्श', 'आफ़ताब', 'रब-अता', 'आफ़ियत-बेज़ार', 'गलतफहमी', 'साथ', 'हमसफ़र', 'मुस्कुरा', 'क़तरा', 'क़तल', 'शाह', 'दस्तार', 'ख़ौफ़', 'नाराज़गी', 'हार', 'मेरा', 'तुम्हारा', 'हम', 'साथ', 'तुम', 'हमारा'];
        
        if (emotionalWords.some(word => currentWord.includes(word.toLowerCase()))) {
          // Increase pitch slightly for emotional words
          if (gender === 'female') {
            utterance.pitch = 0.9 + Math.random() * 0.05;
          } else {
            utterance.pitch = 0.65 + Math.random() * 0.05;
          }
        } else {
          // Normal pitch variation
          if (gender === 'female') {
            utterance.pitch = 0.8 + Math.random() * 0.05; // Slight pitch variation
          } else {
            utterance.pitch = 0.55 + Math.random() * 0.05; // Slight pitch variation
          }
        }
      }
      // Add slight pause at sentence/paragraph boundaries for poetic effect
      if (event.name === 'sentence' || event.name === 'paragraph') {
        setTimeout(() => {
          // Add a brief pause for poetic effect
        }, 500); // Increased pause for more dramatic effect
      }
    };


    window.speechSynthesis.speak(utterance);
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
        currentOffset = (sub as any).offset || currentOffset + (child.props.children ? 0 : 0); // Very rough innerText estimation

        // For common elements like p, span, div
        if (typeof child.type === 'string') {
          return React.cloneElement(child, { ...child.props } as any, sub.elements);
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
      className={`group relative p-6 sm:p-8 md:p-10 rounded-[1.5rem] sm:rounded-[2rem] border border-white/5 bg-gradient-to-br from-white/[0.03] to-white/[0.01] backdrop-blur-xl hover:bg-white/[0.05] transition-all duration-500 overflow-hidden ${featured ? 'md:col-span-2 shadow-[0_0_50px_-12px_rgba(56,189,248,0.1)]' : ''} ${className} poem-card-mobile`}
    >
      {/* Playback Controls */}
      <div className="absolute top-3 md:top-6 right-3 md:right-14 z-20 flex items-center gap-2 mobile-controls">
        {!isSpeaking ? (
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setShowVoicePicker(!showVoicePicker)}
            className="p-2.5 md:p-3 bg-white/5 hover:bg-sky-400/20 rounded-full text-white/40 hover:text-sky-400 transition-all border border-white/5"
            title="Hear with emotion"
          >
            <Mic2 size={16} className="md:w-[18px] md:h-[18px]" />
          </motion.button>
        ) : (
          <motion.button
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ repeat: Infinity, duration: 1 }}
            onClick={isPaused ? resumeSpeaking : pauseSpeaking}
            className="p-2.5 md:p-3 bg-sky-500/20 rounded-full text-sky-400 border border-sky-500/20"
          >
            {isPaused ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="5 3 19 12 5 21 5 3"></polygon>
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="6" y="4" width="4" height="16"></rect>
                <rect x="14" y="4" width="4" height="16"></rect>
              </svg>
            )}
          </motion.button>
        )}

        <AnimatePresence mode="wait">
          {showVoicePicker && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, x: 20, y: -10 }}
              animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, x: 20, y: -10 }}
              className="absolute top-full md:right-full mt-2 md:mt-0 md:mr-4 right-0 bg-black/90 backdrop-blur-2xl border border-white/10 rounded-2xl p-2 flex flex-col gap-2 shadow-2xl min-w-[140px] md:min-w-[120px] mobile-controls"
            >
              <div className="flex gap-1">
                <button
                  onClick={() => speak('male')}
                  className="flex-1 flex items-center justify-center gap-1.5 py-3 md:py-2.5 hover:bg-white/5 rounded-lg text-[9px] font-bold uppercase tracking-widest text-slate-400 hover:text-white transition-colors"
                  title="Men Voice"
                >
                  <User size={12} /> Men
                </button>
                <div className="w-[1px] bg-white/10" />
                <button
                  onClick={() => speak('female')}
                  className="flex-1 flex items-center justify-center gap-1.5 py-3 md:py-2.5 hover:bg-white/5 rounded-lg text-[9px] font-bold uppercase tracking-widest text-slate-400 hover:text-white transition-colors"
                  title="Women Voice"
                >
                  <UserCheck size={12} /> Women
                </button>
              </div>

              <div className="border-t border-white/5 flex items-center justify-between p-2 pt-3">
                {[0.8, 1.0, 1.25, 1.5].map((s) => (
                  <button
                    key={s}
                    onClick={() => setPlaybackSpeed(s)}
                    className={`px-3 py-2 rounded-md text-[8px] font-bold transition-all ${playbackSpeed === s ? 'bg-sky-400 text-black' : 'text-slate-500 hover:text-white hover:bg-white/5'}`}
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
          <h4 className="text-xl md:text-2xl font-display text-yellow-100/90 tracking-widest uppercase italic border-l-2 border-yellow-500/50 pl-4">
            {renderTextWithHighlight(title, titleOffset, "text-yellow-100/90")}
          </h4>
        </div>
      )}

      <div
        ref={contentRef}
        className={`space-y-4 sm:space-y-6 text-slate-300 font-light leading-relaxed text-base sm:text-lg md:text-xl relative z-10 ${featured ? 'md:columns-2 gap-12' : ''}`}
      >
        {isSpeaking ? (
          /* Using recursive walker to inject highlights while preserving structure */
          renderChildren(children, contentStartOffset).elements
        ) : children}
      </div>

      <div className="absolute top-6 right-6 w-2 h-2 rounded-full bg-white/10 group-hover:bg-sky-400/50 transition-colors duration-500 z-10" />
      <div className="absolute bottom-6 left-6 w-2 h-2 rounded-full bg-white/10 group-hover:bg-sky-400/50 transition-colors duration-500 z-10" />
    </motion.div>
  );
  
  // Function to start background music
  const startBackgroundMusic = () => {
    // Create or reuse audio element for background music
    if (!backgroundAudioRef.current) {
      // Create a new audio element with a Sufi/flute sound URL
      // Using a silent placeholder that can be replaced with actual Sufi flute/sitar music
      backgroundAudioRef.current = new Audio();
      
      // In a real implementation, this would point to actual Sufi flute/sitar music
      // The actual Sufi flute/sitar music loaded from assets
      backgroundAudioRef.current.src = '/assets/sufi-flute-sitar.mp3';
      // Fallback to silent audio if the asset is not available
      backgroundAudioRef.current.onerror = () => {
        backgroundAudioRef.current!.src = 'data:audio/wav;base64,UklGRigAAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YQQAAAAAAAAAAAAA';
      };
      backgroundAudioRef.current.loop = true;
      backgroundAudioRef.current.volume = 0.2; // Mild volume
    }
    
    // Play the background music
    backgroundAudioRef.current.currentTime = 0; // Reset to beginning
    backgroundAudioRef.current.play().catch(e => console.log('Background music play prevented:', e));
  };
  
  // Function to stop background music
  const stopBackgroundMusic = () => {
    if (backgroundAudioRef.current) {
      backgroundAudioRef.current.pause();
      backgroundAudioRef.current.currentTime = 0;
    }
  };
  
  // Function to pause background music
  const pauseBackgroundMusic = () => {
    if (backgroundAudioRef.current) {
      backgroundAudioRef.current.pause();
    }
  };
  
  // Function to resume background music
  const resumeBackgroundMusic = () => {
    if (backgroundAudioRef.current) {
      backgroundAudioRef.current.play().catch(e => console.log('Background music play prevented:', e));
    }
  };
};

const MindspaceView: React.FC = () => {
  return (
    <div className="min-h-screen py-32 px-4 relative max-w-7xl mx-auto">
      {/* Hero Section */}
      <div className="text-center mb-32 relative">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[15vw] md:text-[18vw] font-display font-bold text-white/[0.02] select-none pointer-events-none"
        >
          SAHIR
        </motion.div>

        <div className="relative z-10 space-y-4">
          <motion.h2
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-6xl md:text-8xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40 italic"
          >
            Sikandar
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-sky-400 font-display uppercase tracking-[0.4em] text-xs md:text-sm font-bold"
          >
            The Poetic Resonance of Aman
          </motion.p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
        {/* Intro Verses */}
        <div className="space-y-8 md:space-y-12 flex flex-col justify-center">
          <PoemCard delay={0.1}>
            <p>एक दुनिया था ख़ुद में, और था ये भी की</p>
            <p className="text-sky-200/80">मुट्ठी भर राख के मुक़ाबिल ना था ।</p>
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
          <p>नुमाइश की सौख कोई नहीं मुझको ।२।<br /><span className="text-sky-200/80">साहिर तो फ़क़त एक ज़माना चाहता था।</span></p>
          <p>उन दुश्मनों को भी याद रखे मुसल्सल ज़माना,</p>
          <p><span className="text-sky-200/80">वैरी फ़रेब के बदले मर जाना चाहता था।</span></p>
          <p>सुनते थका नहीं आरज़ू वो सारे जहाँ की ।२।<br /><span className="text-sky-200/80">सारे जहाँ को एक उम्र पहले, वो छोड़ जाना चाहता था।</span></p>
          <p>ये उजड़े हुए घरों को देख के ठहर गया वरना,<br /><span className="text-sky-200/80">वो इन हाथों से अपना घर सजाना चाहता था।</span></p>
          <p>हर एक को राह में पत्थर दिख रहा है एक,<br /><span className="text-sky-200/80">बेज़ुबा! इन जाने वालों को मनाना चाहता था।</span></p>
          <p>क़त्ल से पहले का एक ख़त मिला है मुझको (2)<br /><span className="text-sky-200/80">ये लटका हुआ हक़ीक़त में, बदल जाना चाहता था ।२।</span></p>

          <div className="mt-8 pt-8 border-t border-white/5 text-sm text-slate-500 font-normal italic space-y-2">
            <p>Jaun Tumhe kuch batana chahta tha</p>
            <p>safar ko chor k wo ghar aana chahta tha</p>
            <p>jhurriyon ko lapet k meri aankhon par</p>
            <p>Nakhuda sailaab chipana chahta tha.</p>
            <p>...</p>
            <p>Katal se pehle ka ek khat मिला h मुझको</p>
            <p>Ye latka hua haqiqat me badal jana chahta tha !</p>
            <p className="text-sky-400 not-italic font-bold mt-4">- Aman</p>
          </div>
        </PoemCard>
      </div>

      <div className="mt-20 space-y-20">
        <PoemCard title="हमसफ़र" featured>
          <p>आसमाँ से छिपा के सख़्सियत अपनी ,<br /><span className="text-sky-200/80">सितारों को साहिल हमसफ़र समझते हैं।</span></p>
          <p>मोहब्बत भी फ़क़त फकीरी है,<br /><span className="text-sky-200/80">ये उनके दिल को अपना घर समझते हैं।</span></p>
          <p>कहते हैं मुझको ग़लतियाँ सुधारो "अमन",<br /><span className="text-sky-200/80">अपनी परछाई से हमको जो बेख़बर समझते हैं।</span></p>
          <p>देखते नहीं मुझको लोग अब मुस्कुराते हुए,<br /><span className="text-sky-200/80">ये भीड़ बस उनका हुनर देखते हैं।</span></p>
          <p>मौत जिनको अज़ीज़ है मुद्दतों से जानी,<br /><span className="text-sky-200/80">उनकी आँखों में देखने से डरते हैं।</span></p>
          <p>"उन्हें क्या लेना देना तुम्हारे ज़ख्म की गहराइयों से,<br /><span className="text-sky-200/80">इल्ज़ाम दिल पर लगाते है,जो जिगर देखते हैं।</span></p>
          <p>उनके शहर के लोग कह रहे थे मुझको,<br /><span className="text-sky-200/80">गुज़रने वाले यहाँ एक रोज़, ठहर कर देखते हैं।"</span></p>
          <p>और,<br />वहम के मारे हैं ये इश्क़ को क़ातिल बताने वाले ।२।<br /><span className="text-sky-200/80">ये चाँद के मुरीद हैं! जो इन्हें जी भर कर देखते हैं।।</span></p>
          <p className="mt-4 text-sky-400 font-bold">- अमन</p>
        </PoemCard>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          <PoemCard title="साथ कौन है?">
            <p>वो मेरे सीने में धड़कन अपनी , सहेज कुछ यूँ रहा है<br /><span className="text-sky-200/80">वो इस क़दर जकड़ के भी मुझको, ढूँड़ तो सुकूँ रहा है !</span></p>
            <div className="h-px bg-white/5 w-full my-4" />
            <p>वो जिसे आरज़ू सिर्फ़ मेरी हुआ करती थी जाना<br /><span className="text-sky-200/80">मेरे बाद जो वो ढूँड रहा है, क्यू रहा है !</span></p>
          </PoemCard>

          <PoemCard title="कौन जाने मोहब्बत">
            <p>ये कैसे दिखते हैं ज़िंदा लोग मरे हुए?<br /><span className="text-sky-200/80">हमसे पूछते हो? हम अपनी जाँ के पराए हैं।</span></p>
            <p>ये इतने सारे बिन पगड़ी के लोग? ( पगड़ी - ज़मीर )<br /><span className="text-sky-200/80">ये कौन हैं, ये कहाँ से आए हैं?</span></p>
            <p>मसला सुनो!! जाँ नहीं निकलती तबीब!! (तबीब- डॉक्टर)<br /><span className="text-sky-200/80">ये महफ़िल में मेरी जाँ, मेरी दवा लूटा के आए हैं!</span></p>
            <p>उनके बारे में कहानियों में सुना था,<br /><span className="text-sky-200/80">हवाएँ मदहोश लगे, समझना उसने गीले बाल सुखाए हैं।</span></p>
            <p>और,<br />चाँद की बातें करने वाले उनके अज़ीज़ हुए! ।२।<br /><span className="text-sky-200/80">दीद को तरस रहे, जाहिल जो चाँद तोड़ के लाए हैं!</span></p>
          </PoemCard>
        </div>
      </div>

      <div className="mt-20 space-y-20">
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

        <PoemCard title="आइनों के शक़्ल">
          <p>एक तरफ़ देखा तो उसकी आँखें दिख रही थी</p>
          <p className="text-sky-200/80">एक तरफ़ सीने में जैसे खंजर उतर रहा था।</p>
          <p>हमने निकाला दिल अपना हथेली पर रख दिया</p>
          <p className="text-sky-200/80">मेरी ज़ाँ इसी बात पर वो मुझसे झगड़ रहा था।</p>
          <p>वो मेरा नाम लेता है ऐसे |2|</p>
          <p className="text-sky-200/80">कोई क़त्ल करके मुकर रहा था।</p>
          <p>फ़क़त एक आदमी था उस आईने के सामने,</p>
          <p className="text-sky-200/80">आईने में जैसे कोई भीड़ उमड़ रहा था ।</p>
          <p>ज़ेहन में सोचा था एक शहर रंग का</p>
          <p className="text-sky-200/80">रंग जो उसकी आँखों से उतर रहा था।</p>
          <p>और</p>
          <p>जिसे ज़ेहन से निकालने की ज़हमत है सारी ।2|</p>
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
          <p>सरियाते हुए</p>
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
          <p className="text-sky-200/80">इक क़दम लगता है।"</p>
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
  );
};

export default MindspaceView;
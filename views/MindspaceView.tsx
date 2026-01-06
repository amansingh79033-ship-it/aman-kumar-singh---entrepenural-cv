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
  const [highlightRange, setHighlightRange] = React.useState<{ start: number; end: number } | null>(null);
  const contentRef = React.useRef<HTMLDivElement>(null);
  const [playbackSpeed, setPlaybackSpeed] = React.useState(0.85);

  const stopSpeaking = () => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
    setHighlightRange(null);
  };

  const speak = (gender: 'male' | 'female') => {
    setShowVoicePicker(false);
    window.speechSynthesis.cancel();

    // Targeted extraction to avoid UI text or duplicated titles
    const textElements = contentRef.current?.querySelectorAll('p');
    let poemContent = "";
    if (textElements && textElements.length > 0) {
      poemContent = Array.from(textElements).map(el => el.innerText).join('\n');
    } else {
      poemContent = contentRef.current?.innerText || "";
    }

    const fullText = title ? `${title}. ${poemContent}` : poemContent;
    const utterance = new SpeechSynthesisUtterance(fullText);

    const voices = window.speechSynthesis.getVoices();
    const hiVoices = voices.filter(v => v.lang.startsWith('hi') || (v.lang.startsWith('en-IN') && gender === 'male'));

    let selectedVoice = hiVoices.find(v => {
      const name = v.name.toLowerCase();
      if (gender === 'male') {
        return name.includes('male') || name.includes('david') || name.includes('ravi') || name.includes('mark') || name.includes('guy');
      } else {
        return name.includes('female') || name.includes('google') || name.includes('heera') || name.includes('zira');
      }
    }) || hiVoices[0];

    if (selectedVoice) utterance.voice = selectedVoice;

    utterance.lang = 'hi-IN';
    // For a 40-year-old matured man, we use a slightly lower pitch and steady rate
    utterance.pitch = gender === 'female' ? 1.0 : 0.85;
    utterance.rate = playbackSpeed;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => {
      setIsSpeaking(false);
      setHighlightRange(null);
    };
    utterance.onerror = () => {
      setIsSpeaking(false);
      setHighlightRange(null);
    };

    utterance.onboundary = (event) => {
      if (event.name === 'word') {
        const start = event.charIndex;
        // Estimate word length if not provided by browser
        const end = start + (event.charLength || fullText.slice(start).split(/\s|[,.!]/)[0].length);
        setHighlightRange({ start, end });
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
        currentOffset = sub.offset || currentOffset + (child.props.children ? 0 : 0); // Very rough innerText estimation

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
      className={`group relative p-8 md:p-10 rounded-[2rem] border border-white/5 bg-gradient-to-br from-white/[0.03] to-white/[0.01] backdrop-blur-xl hover:bg-white/[0.05] transition-all duration-500 overflow-hidden ${featured ? 'md:col-span-2 shadow-[0_0_50px_-12px_rgba(56,189,248,0.1)]' : ''} ${className}`}
    >
      {/* Playback Controls */}
      <div className="absolute top-4 md:top-6 right-4 md:right-14 z-20 flex items-center gap-2">
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
            onClick={stopSpeaking}
            className="p-2.5 md:p-3 bg-red-500/20 rounded-full text-red-400 border border-red-500/20"
          >
            <X size={16} className="md:w-[18px] md:h-[18px]" />
          </motion.button>
        )}

        <AnimatePresence mode="wait">
          {showVoicePicker && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, x: 20, y: -10 }}
              animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, x: 20, y: -10 }}
              className="absolute top-full md:right-full mt-2 md:mt-0 md:mr-4 right-0 bg-black/90 backdrop-blur-2xl border border-white/10 rounded-2xl p-2 flex flex-col gap-2 shadow-2xl min-w-[140px] md:min-w-[120px]"
            >
              <div className="flex gap-1">
                <button
                  onClick={() => speak('male')}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2.5 md:py-2 hover:bg-white/5 rounded-lg text-[9px] font-bold uppercase tracking-widest text-slate-400 hover:text-white transition-colors"
                  title="Men Voice"
                >
                  <User size={12} /> Men
                </button>
                <div className="w-[1px] bg-white/10" />
                <button
                  onClick={() => speak('female')}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2.5 md:py-2 hover:bg-white/5 rounded-lg text-[9px] font-bold uppercase tracking-widest text-slate-400 hover:text-white transition-colors"
                  title="Women Voice"
                >
                  <UserCheck size={12} /> Women
                </button>
              </div>

              <div className="border-t border-white/5 flex items-center justify-between p-1 pt-2">
                {[0.7, 0.85, 1.0, 1.2].map((s) => (
                  <button
                    key={s}
                    onClick={() => setPlaybackSpeed(s)}
                    className={`px-2 py-1 rounded-md text-[8px] font-bold transition-all ${playbackSpeed === s ? 'bg-sky-400 text-black' : 'text-slate-500 hover:text-white hover:bg-white/5'}`}
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
        className={`space-y-6 text-slate-300 font-light leading-relaxed text-lg md:text-xl relative z-10 ${featured ? 'md:columns-2 gap-12' : ''}`}
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
    </div>
  );
};

export default MindspaceView;
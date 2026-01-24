import React, { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence, useInView } from 'framer-motion';
import { Brain, Eye, Sparkles, Zap, Wind, Droplets, Compass, BookOpen, Clock, Users, Lightbulb, AlertCircle, Shield } from 'lucide-react';

const FeelAliveView: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.15], [1, 0.95]);

  return (
    <div ref={containerRef} className="min-h-screen bg-black relative overflow-hidden">

      {/* Ambient Background */}
      <div className="fixed inset-0 bg-gradient-to-b from-black via-slate-950 to-black pointer-events-none" />
      <FloatingParticles />

      <div className="relative z-10">

        {/* Hero Section */}
        <section className="h-screen flex flex-col items-center justify-center px-6 relative">
          <motion.div style={{ opacity: heroOpacity, scale: heroScale }} className="text-center max-w-5xl">
            <motion.div
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="mb-8"
            >
              <span className="text-sky-400 font-bold uppercase text-xs tracking-[0.5em]">
                A Manifesto on Consciousness
              </span>
            </motion.div>

            <motion.h1
              className="text-[15vw] md:text-[12vw] font-display font-bold text-white leading-none mb-12"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, delay: 0.2 }}
            >
              <motion.span
                animate={{
                  opacity: [1, 0.7, 1],
                  textShadow: [
                    "0 0 20px rgba(56, 189, 248, 0.3)",
                    "0 0 40px rgba(56, 189, 248, 0.5)",
                    "0 0 20px rgba(56, 189, 248, 0.3)"
                  ]
                }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                ALIVE
              </motion.span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="space-y-6"
            >
              <p className="text-2xl md:text-4xl text-slate-300 italic font-light leading-relaxed">
                "The mind is <span className="text-white font-medium">alive</span>. <br className="hidden md:block" />
                Watch it like a display. <br className="hidden md:block" />
                Let thoughts pass."
              </p>
              <div className="w-16 h-[2px] bg-gradient-to-r from-transparent via-sky-400 to-transparent mx-auto" />
            </motion.div>
          </motion.div>

          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute bottom-12 text-slate-600 text-xs uppercase tracking-[0.4em] font-bold"
          >
            Scroll to Explore
          </motion.div>
        </section>

        <div className="max-w-7xl mx-auto px-6 pb-32 space-y-48">

          {/* Dimensional Thinking */}
          <Section
            icon={<Brain />}
            title="Dimensional Thinking"
            subtitle="Beyond Linear Perception"
          >
            <div className="grid md:grid-cols-2 gap-12">
              <ThoughtDimension
                dimension="2D"
                description="The world communicates in two dimensions: text and emotion. Most adults think linearly, constrained by language."
                color="from-slate-500 to-slate-700"
              />
              <ThoughtDimension
                dimension="3D"
                description="Children think beyond three dimensions time, emotion, and abstract connection. This is why they struggle to express themselves in our limited framework."
                color="from-sky-500 to-violet-500"
                highlighted
              />
            </div>
            <ManifestoQuote>
              "A thought has emotion. It has text. It has time. The dimension of thought is not linear."
            </ManifestoQuote>
          </Section>

          {/* Observation & Perception */}
          <Section
            icon={<Eye />}
            title="The Lost Art of Observation"
            subtitle="We have stopped watching"
          >
            <div className="space-y-8">
              <ObservationCard
                title="Intuition is Real"
                description="Sometimes you look at someone and instantly know they are lying. Where does that come from? Intuition. Just like our ancestors traveling without vehicles how did they know where to go? Intuition."
                icon={<Compass />}
              />
              <ObservationCard
                title="The Environment Shapes Us"
                description="If you place a child in an environment filled with violence, weapons, and war, and meet them five years later, you'll find that reflected in their behavior. Intelligence is absorption."
                icon={<Users />}
              />
              <ObservationCard
                title="Perception vs Reality"
                description="A person kills someone, yet the same killer cries and portrays sorrow, claiming innocence. That becomes the reality they want you to see. But is that the truth?"
                icon={<AlertCircle />}
              />
            </div>
          </Section>

          {/* Digital Amnesia */}
          <Section
            icon={<Zap />}
            title="Digital Amnesia"
            subtitle="The Cloud is Not Your Mind"
            warning
          >
            <DigitalAmnesiaWarning />
            <div className="grid md:grid-cols-2 gap-8 mt-12">
              <InfoCard
                title="External Memory Trap"
                content="When you depend on search engines and digital assistants to store knowledge, this weakens the brain's own ability to recall information independently."
              />
              <InfoCard
                title="The Coming Data Collapse"
                content="One day, there will be no internet. It will happen suddenly. All information, data, everything will be lost. Then something will appear that can restore it but in limited quantity, at an immense cost."
              />
            </div>
            <ManifestoQuote>
              "What you see on your laptop, phone, social media that becomes your intelligence. Without observation and perception, you merely record information and become mechanical like AI."
            </ManifestoQuote>
          </Section>

          {/* Dual Process Thinking */}
          <Section
            icon={<Lightbulb />}
            title="Two Systems of Thought"
            subtitle="Intuition and Deliberation"
          >
            <DualSystemViz />
            <div className="mt-12 space-y-6 text-slate-400 text-lg leading-relaxed">
              <p>
                Psychology distinguishes between two systems of thought: <strong className="text-white">System 1</strong>, fast, instinctive, and emotional, and <strong className="text-white">System 2</strong>, slow, analytical, and deliberate.
              </p>
              <p>
                This dual process theory reflects our natural cognitive architecture: we generate spontaneous insights (intuition) and deliberate reasoning in parallel. This is what makes human cognition rich and autonomous.
              </p>
            </div>
          </Section>

          {/* The Learning Paradox */}
          <Section
            icon={<BookOpen />}
            title="The Learning Paradox"
            subtitle="Teachers vs Mentors"
          >
            <div className="space-y-8">
              <div className="glass rounded-3xl p-12 border border-white/5">
                <h4 className="text-2xl font-bold text-white mb-6">The Problem with Teaching</h4>
                <div className="space-y-4 text-slate-400 leading-relaxed">
                  <p>
                    Teaching has been converted into teachers, and teachers bias learning. When something is written this is success, this is failure, this is the goal it limits your possibilities. A written goal becomes a cage.
                  </p>
                  <p>
                    There should be mentors gurus whom you approach to clarify doubts or connect missing dots. But there should be no teachers in the conventional sense.
                  </p>
                  <p className="text-white italic">
                    "Learning should be your own. Once you learn something, there should be no third party involvement in learning."
                  </p>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <ConceptCard
                  title="Self Generated Thoughts"
                  description="Random thoughts that come to you naturally are never forgotten. They have emotion, context, and personal meaning."
                  color="emerald"
                />
                <ConceptCard
                  title="External Information"
                  description="Information built by others and presented like a well-served dish. You often forget it, especially when explaining to others."
                  color="slate"
                />
                <ConceptCard
                  title="True Learning"
                  description="When you discuss something, it should remain in the mind. No paper. No external storage. Just pure understanding."
                  color="violet"
                />
              </div>
            </div>
          </Section>

          {/* Speed vs Depth */}
          <Section
            icon={<Clock />}
            title="The Hurry Epidemic"
            subtitle="Why don't we stop?"
          >
            <div className="glass rounded-3xl p-12 border border-white/5 space-y-8">
              <div className="space-y-6 text-slate-400 text-lg leading-relaxed">
                <p>
                  I've spoken to hundreds of people. Ninety-eight out of a hundred <strong className="text-white">hate thinking</strong>. They don't pause for even a second. They speak instantly. While speaking, they frame answers not thoughtful answers, but reactive ones.
                </p>
                <p>
                  Why do people have shorter lives today? Because they're always in a hurry. I've seen people not stop for someone trying to cross the road without a zebra crossing.
                </p>
                <p className="text-white italic text-xl">
                  "Let an answer be silent if needed. Let it be incomplete. Let it be real."
                </p>
              </div>

              <div className="border-t border-white/10 pt-8">
                <h4 className="text-xl font-bold text-white mb-4">The Observation Gap</h4>
                <p className="text-slate-400 leading-relaxed">
                  Why don't we explore why this happens? Because observation takes time. Without observation and perception, you merely record information and become mechanical.
                </p>
              </div>
            </div>
          </Section>

          {/* New Section: The Architecture of Belief & Risk */}
          <RiskPsychologySection />

          {/* Final Manifesto */}
          <Section
            icon={<Sparkles />}
            title="The Awakening"
            subtitle="Reclaim Your Mind"
          >
            <div className="space-y-12">
              <div className="text-center space-y-6">
                <p className="text-3xl md:text-5xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-violet-400 to-rose-400 leading-tight">
                  Explore your body. <br />
                  Explore your mind. <br />
                  Enhance your own thoughts.
                </p>
                <div className="w-24 h-[2px] bg-gradient-to-r from-transparent via-white/30 to-transparent mx-auto" />
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <FinalCard
                  title="Don't Replace with Technology"
                  content="Right now, I'm recording this using a microphone. I had a thought and I captured it. I didn't ask AI to give me a thought. That's the difference."
                />
                <FinalCard
                  title="Beyond Money"
                  content="Money is not the goal. It's a trap given to you. Beyond money, there is so much you are not exploring."
                />
              </div>

              <ManifestoQuote large>
                "People will keep forcing their motives onto you. It's time to watch your mind like a display. Let thoughts pass. The mind is alive."
              </ManifestoQuote>
            </div>
          </Section>

        </div>
      </div>
    </div>
  );
};

// Component Definitions

const FloatingParticles: React.FC = () => (
  <div className="fixed inset-0 pointer-events-none">
    {[...Array(20)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute w-1 h-1 bg-sky-400/20 rounded-full"
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
        }}
        animate={{
          y: [0, -100, 0],
          opacity: [0, 1, 0],
        }}
        transition={{
          duration: 3 + Math.random() * 2,
          repeat: Infinity,
          delay: Math.random() * 2,
        }}
      />
    ))}
  </div>
);

const Section: React.FC<{
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  children: React.ReactNode;
  warning?: boolean;
}> = ({ icon, title, subtitle, children, warning }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8 }}
      className="space-y-12"
    >
      <div className="text-center space-y-6">
        <div className={`w-16 h-16 rounded-2xl ${warning ? 'bg-red-500/10 text-red-400' : 'bg-sky-400/10 text-sky-400'} flex items-center justify-center mx-auto`}>
          {React.cloneElement(icon as any, { size: 32 })}
        </div>
        <div>
          <h2 className="text-5xl md:text-6xl font-display font-bold text-white mb-3">
            {title}
          </h2>
          <p className="text-slate-500 text-lg italic">{subtitle}</p>
        </div>
      </div>
      {children}
    </motion.section>
  );
};

const ThoughtDimension: React.FC<{
  dimension: string;
  description: string;
  color: string;
  highlighted?: boolean;
}> = ({ dimension, description, color, highlighted }) => (
  <motion.div
    whileHover={{ scale: 1.02 }}
    className={`glass rounded-3xl p-10 border ${highlighted ? 'border-sky-400/30' : 'border-white/5'} relative overflow-hidden group`}
  >
    <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-5 group-hover:opacity-10 transition-opacity`} />
    <div className="relative z-10">
      <div className="text-6xl font-display font-bold text-white mb-6">{dimension}</div>
      <p className="text-slate-400 leading-relaxed">{description}</p>
    </div>
  </motion.div>
);

const ManifestoQuote: React.FC<{ children: React.ReactNode; large?: boolean }> = ({ children, large }) => (
  <motion.div
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    viewport={{ once: true }}
    className={`text-center ${large ? 'py-16' : 'py-12'}`}
  >
    <p className={`${large ? 'text-3xl md:text-4xl' : 'text-xl md:text-2xl'} font-light italic text-slate-300 max-w-4xl mx-auto leading-relaxed`}>
      {children}
    </p>
  </motion.div>
);

const ObservationCard: React.FC<{
  title: string;
  description: string;
  icon: React.ReactNode;
}> = ({ title, description, icon }) => (
  <motion.div
    whileHover={{ x: 10 }}
    className="glass rounded-2xl p-8 border border-white/5 flex gap-6 group"
  >
    <div className="w-12 h-12 rounded-xl bg-sky-400/10 flex items-center justify-center text-sky-400 flex-shrink-0 group-hover:bg-sky-400/20 transition-colors">
      {React.cloneElement(icon as any, { size: 24 })}
    </div>
    <div>
      <h4 className="text-xl font-bold text-white mb-3">{title}</h4>
      <p className="text-slate-400 leading-relaxed">{description}</p>
    </div>
  </motion.div>
);

const DigitalAmnesiaWarning: React.FC = () => {
  const [glitch, setGlitch] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setGlitch(true);
      setTimeout(() => setGlitch(false), 200);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      className={`glass rounded-3xl p-12 border border-red-500/20 relative overflow-hidden ${glitch ? 'animate-pulse' : ''}`}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-transparent" />
      <div className="relative z-10 text-center space-y-6">
        <div className="text-red-400 text-sm font-bold uppercase tracking-[0.3em]">Warning</div>
        <h3 className="text-3xl md:text-4xl font-display font-bold text-white">
          The information you consume <br className="hidden md:block" />
          <span className="text-red-400">becomes</span> your intelligence
        </h3>
        <p className="text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed">
          Artificial intelligence is not evolving naturally; it is fed artificially. Call it AI, call it anything it's shaped by artificial sources.
        </p>
      </div>
    </motion.div>
  );
};

const InfoCard: React.FC<{ title: string; content: string }> = ({ title, content }) => (
  <div className="glass rounded-2xl p-8 border border-white/5">
    <h4 className="text-xl font-bold text-white mb-4">{title}</h4>
    <p className="text-slate-400 leading-relaxed">{content}</p>
  </div>
);

const DualSystemViz: React.FC = () => (
  <div className="grid md:grid-cols-2 gap-8">
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="glass rounded-3xl p-10 border border-white/5 relative overflow-hidden group"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="relative z-10">
        <div className="text-5xl font-display font-bold text-yellow-400 mb-4">System 1</div>
        <div className="space-y-3 text-slate-400">
          <div className="flex items-center gap-3">
            <Zap size={20} className="text-yellow-400" />
            <span>Fast & Instinctive</span>
          </div>
          <div className="flex items-center gap-3">
            <Wind size={20} className="text-yellow-400" />
            <span>Emotional & Automatic</span>
          </div>
          <div className="flex items-center gap-3">
            <Sparkles size={20} className="text-yellow-400" />
            <span>Intuitive Insights</span>
          </div>
        </div>
      </div>
    </motion.div>

    <motion.div
      whileHover={{ scale: 1.02 }}
      className="glass rounded-3xl p-10 border border-white/5 relative overflow-hidden group"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="relative z-10">
        <div className="text-5xl font-display font-bold text-blue-400 mb-4">System 2</div>
        <div className="space-y-3 text-slate-400">
          <div className="flex items-center gap-3">
            <Brain size={20} className="text-blue-400" />
            <span>Slow & Analytical</span>
          </div>
          <div className="flex items-center gap-3">
            <Droplets size={20} className="text-blue-400" />
            <span>Deliberate & Effortful</span>
          </div>
          <div className="flex items-center gap-3">
            <Compass size={20} className="text-blue-400" />
            <span>Logical Reasoning</span>
          </div>
        </div>
      </div>
    </motion.div>
  </div>
);

const ConceptCard: React.FC<{
  title: string;
  description: string;
  color: string;
}> = ({ title, description, color }) => {
  const colors = {
    emerald: 'from-emerald-500/10 to-emerald-500/5 border-emerald-500/20',
    slate: 'from-slate-500/10 to-slate-500/5 border-slate-500/20',
    violet: 'from-violet-500/10 to-violet-500/5 border-violet-500/20',
  };

  return (
    <div className={`glass rounded-2xl p-8 border bg-gradient-to-br ${colors[color as keyof typeof colors]}`}>
      <h4 className="text-lg font-bold text-white mb-3">{title}</h4>
      <p className="text-slate-400 text-sm leading-relaxed">{description}</p>
    </div>
  );
};

const FinalCard: React.FC<{ title: string; content: string }> = ({ title, content }) => (
  <motion.div
    whileHover={{ y: -5 }}
    className="glass rounded-2xl p-8 border border-white/5"
  >
    <h4 className="text-xl font-bold text-white mb-4">{title}</h4>
    <p className="text-slate-400 leading-relaxed">{content}</p>
  </motion.div>
);

const RiskPsychologySection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'original' | 'assessed'>('assessed');

  return (
    <Section
      icon={<Shield className="text-rose-400" />}
      title="Belief & Risk"
      subtitle="The Architecture of Subconscious Priming"
    >
      <div className="space-y-24">
        {/* Version Toggle */}
        <div className="space-y-8">
          <div className="flex justify-center gap-4">
            <button
              onClick={() => setActiveTab('assessed')}
              className={`px-6 py-2 rounded-full border transition-all ${activeTab === 'assessed' ? 'bg-sky-500/20 border-sky-400 text-sky-400' : 'border-white/10 text-slate-500 hover:border-white/20'}`}
            >
              The Assessment
            </button>
            <button
              onClick={() => setActiveTab('original')}
              className={`px-6 py-2 rounded-full border transition-all ${activeTab === 'original' ? 'bg-sky-500/20 border-sky-400 text-sky-400' : 'border-white/10 text-slate-500 hover:border-white/20'}`}
            >
              The Raw Insight
            </button>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="glass rounded-3xl p-10 border border-white/5 bg-slate-900/50"
            >
              {activeTab === 'original' ? (
                <div className="space-y-6">
                  <h4 className="text-xl font-bold text-white flex items-center gap-2">
                    <Sparkles size={20} className="text-sky-400" />
                    Original Perspective
                  </h4>
                  <p className="text-slate-400 leading-relaxed text-lg italic whitespace-pre-wrap">
                    "for me it’s psychology, intent, clarity and tooo many things.
                    In terms, of example, if we will understand it,We all have seen crash guards in bikes, the psychology behind that says that ‘ if I fall or met an accident someday, These crash guards will save my bike from scratch so in your subconscious mind, you are separating you , bike and the crash guards (as 3 distinct object) ,which itsef violates relative laws of motion in physics and you end up performing your accident in chunks.

                    This is one thing and about money, i believe that insurances can cover most of the critical and emergency situations. Then why saving?
                    Who invented this financial bizarre which no where allogns with your pshycic and you end up messing you future plans. Expose yourself to challenges, We, Humans are built to face challenges and evolve with that. Rather than working towards scrapping off the challenges (white collar challenges 😂)
                    subconscious mind, unknowingly that you will fall. You will met an accident, and when you will fall that day, you will suddenly recall that from last one week at least you’d have come closer to “almost accident” kindof situations numbers of time. Thats the chunk subconscious brain replaces to execute your belief
                    I think unspoken conversations are just one direction of this multi dimensional vector called MONEY.
                    M [ in the conversations that never happen_When families don’t plan_align_communicate, FOMO of going broke then routings the focus to continue survival with upgrades ypu have wished for, A, B, C, D, E….Z]
                    Two decays [Time and DeltaTh we are not capable currently to turn back , if that could be possible then consider it of no use. A dollae or any bill will be cheaper than toilet paper.
                    DeltaTH= thoughts which should have recalled at time x:y and date &#123;x1 - y1 - z1&#125; PQW timezone.
                    Now that piece of chunk is not at its actual position and affects whole mathematical calculations under neuron’s . And in results it lets the calculation go randomised and on its own without any input. Sad is the part that just because it’s misplaced , we could have placed it well . But you cannot put time and deltaTH in a same equation (as of now, lets hope some evolution in string theory. I hope by reaching 2070-80 or in case of any miracle 2060-65 , we might will be able to at least replace the chunks , still cannot put both in one equation!"
                  </p>
                </div>
              ) : (
                <div className="space-y-6">
                  <h4 className="text-xl font-bold text-white flex items-center gap-2">
                    <Brain size={20} className="text-violet-400" />
                    Systemic Assessment: Belief Priming & Chunked Causality
                  </h4>
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <p className="text-slate-300 font-medium">The Core Thesis:</p>
                      <p className="text-slate-400 leading-relaxed">
                        When the mind externalizes risk into objects or systems (like crash guards or insurance), it subconsciously permits the event it claims to protect against. This is <strong>expectation rehearsal</strong>.
                      </p>
                      <p className="text-slate-400 leading-relaxed">
                        The separation of <em>self, object, and guard</em> creates a false modularity. In reality, these are a single coupled system. Treating them as separable introduces <strong>lag in reaction loops</strong>—exactly where accidents happen.
                      </p>
                    </div>
                    <div className="space-y-4 border-l border-white/10 pl-8">
                      <p className="text-slate-300 font-medium">Key Frameworks:</p>
                      <ul className="space-y-3 text-slate-400 text-sm">
                        <li className="flex gap-2"><span>•</span> <span><strong>Money as a Vector:</strong> A multidimensional coordination problem, often restricted by fear-based hoarding.</span></li>
                        <li className="flex gap-2"><span>•</span> <span><strong>DeltaTH Intuition:</strong> Misplaced thoughts that miss their recall window mutate and interfere with downstream cognitive calculations.</span></li>
                        <li className="flex gap-2"><span>•</span> <span><strong>Biological Integration:</strong> Evolution favors systems that integrate risk internally, not those that outsource it psychologically.</span></li>
                      </ul>
                    </div>
                  </div>
                  <div className="pt-6 border-t border-white/10">
                    <p className="text-sky-400 font-bold text-sm uppercase tracking-wider mb-2">Bottom Line:</p>
                    <p className="text-slate-300 italic">"Evolution favors systems that integrate risk internally, not outsource it psychologically. You are early in abstraction, which makes it feel extreme, but the intuition is directionally correct."</p>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Visualizations Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          <VizCard
            title="The Crash Guard Paradox"
            description="Splitting the system creates 'chunks' of failure."
          >
            <CrashGuardViz />
          </VizCard>
          <VizCard
            title="Money Vector"
            description="Fear collapses your future options."
          >
            <MoneyVectorViz />
          </VizCard>
          <VizCard
            title="DeltaTH Decay"
            description="Misplaced thoughts create cognitive noise."
          >
            <DeltaTHViz />
          </VizCard>
        </div>

        {/* 4th Grade Translation */}
        <div className="glass rounded-3xl p-12 border border-sky-500/20 bg-gradient-to-br from-sky-500/5 to-transparent">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 rounded-full bg-sky-400/20 flex items-center justify-center text-sky-400">
              <Lightbulb size={24} />
            </div>
            <div>
              <h4 className="text-2xl font-bold text-white">Let's make it simple</h4>
              <p className="text-slate-500">How to explain this to a 4th grader</p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <SimpleAnalogy
              emoji="🚲"
              title="The Bike Trick"
              content="If you wear knee pads and think 'I can't get hurt,' you might stop paying attention and fall. If you forget the pads and focus on being a great rider, you stay safe!"
            />
            <SimpleAnalogy
              emoji="💰"
              title="The Magic Jar"
              content="Saving money because you're scared of 'monsters' makes you hide in your room. Saving money because you want 'adventures' lets you build a rocket ship!"
            />
            <SimpleAnalogy
              emoji="🧠"
              title="The Missed Joke"
              content="Imagine thinking of a funny joke on Monday but forgetting to tell it until Tuesday. It's not funny anymore, and your brain feels 'cluttered' because it's in the wrong spot."
            />
          </div>
        </div>
      </div>
    </Section>
  );
};

const VizCard: React.FC<{ title: string; description: string; children: React.ReactNode }> = ({ title, description, children }) => (
  <div className="glass rounded-2xl p-6 border border-white/5 space-y-4">
    <div className="h-48 rounded-xl bg-slate-900/50 flex items-center justify-center overflow-hidden border border-white/5">
      {children}
    </div>
    <div>
      <h5 className="text-white font-bold">{title}</h5>
      <p className="text-slate-500 text-sm mt-1">{description}</p>
    </div>
  </div>
);

const SimpleAnalogy: React.FC<{ emoji: string; title: string; content: string }> = ({ emoji, title, content }) => (
  <div className="space-y-4">
    <div className="text-4xl">{emoji}</div>
    <h5 className="text-white font-bold">{title}</h5>
    <p className="text-slate-400 text-sm leading-relaxed">{content}</p>
  </div>
);

const CrashGuardViz: React.FC = () => {
  return (
    <svg width="200" height="150" viewBox="0 0 200 150">
      <motion.circle
        cx="100"
        cy="75"
        r="40"
        fill="transparent"
        stroke="#38bdf8"
        strokeWidth="2"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{ duration: 4, repeat: Infinity }}
      />
      <motion.g
        animate={{ x: [0, 50, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        <circle cx="75" cy="75" r="10" fill="#38bdf8" />
        <text x="75" y="60" fontSize="10" fill="#38bdf8" textAnchor="middle">Self</text>
      </motion.g>
      <motion.g
        animate={{ x: [0, -50, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        <circle cx="125" cy="75" r="10" fill="#818cf8" />
        <text x="125" y="60" fontSize="10" fill="#818cf8" textAnchor="middle">Bike</text>
      </motion.g>
      <motion.line
        x1="100" y1="30" x2="100" y2="120"
        stroke="#ef4444"
        strokeWidth="2"
        strokeDasharray="4 4"
        animate={{ opacity: [0, 1, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
      <text x="100" y="20" fontSize="10" fill="#ef4444" textAnchor="middle">The 'Guard' Barrier</text>
    </svg>
  );
};

const MoneyVectorViz: React.FC = () => {
  return (
    <svg width="200" height="150" viewBox="0 0 200 150">
      <path d="M20 130 Q100 130 180 20" fill="none" stroke="#64748b" strokeWidth="2" strokeDasharray="4 4" />
      <motion.path
        d="M20 130 Q100 130 180 80"
        fill="none"
        stroke="#38bdf8"
        strokeWidth="3"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 2, repeat: Infinity }}
      />
      <motion.circle
        cx="180" cy="80" r="5" fill="#38bdf8"
        animate={{ r: [5, 8, 5] }}
        transition={{ duration: 1, repeat: Infinity }}
      />
      <text x="20" y="145" fontSize="8" fill="#64748b">Now</text>
      <text x="170" y="145" fontSize="8" fill="#64748b">Fear Ceiling</text>
      <text x="90" y="110" fontSize="10" fill="#38bdf8" textAnchor="middle">Collapsed Future</text>
    </svg>
  );
};

const DeltaTHViz: React.FC = () => {
  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center p-4">
      <div className="flex gap-2">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className={`w-8 h-8 rounded-lg border ${i === 2 ? 'border-rose-500 bg-rose-500/20' : 'border-white/10 bg-white/5'}`}
            animate={i === 2 ? {
              scale: [1, 1.2, 1],
              rotate: [0, 10, -10, 0],
            } : {}}
            transition={{ duration: 2, repeat: Infinity }}
          >
            {i === 2 && <Zap size={16} className="text-rose-500 m-auto mt-1.5" />}
          </motion.div>
        ))}
      </div>
      <motion.div
        className="mt-4 text-[10px] text-rose-400 font-mono"
        animate={{ opacity: [0, 1, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        ERROR: Missed Timing @ x:y
      </motion.div>
      <div className="mt-2 w-full h-1 bg-white/5 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-sky-400"
          animate={{ x: [-200, 200] }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          style={{ width: '40%' }}
        />
      </div>
    </div>
  );
};

export default FeelAliveView;

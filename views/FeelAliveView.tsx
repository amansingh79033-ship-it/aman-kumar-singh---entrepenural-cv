import React, { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence, useInView } from 'framer-motion';
import { Brain, Eye, Sparkles, Zap, Wind, Droplets, Compass, BookOpen, Clock, Users, Lightbulb, AlertCircle } from 'lucide-react';

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
                description="Children think beyond three dimensions—time, emotion, and abstract connection. This is why they struggle to express themselves in our limited framework."
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
                description="Sometimes you look at someone and instantly know they are lying. Where does that come from? Intuition. Just like our ancestors traveling without vehicles—how did they know where to go? Intuition."
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
                content="One day, there will be no internet. It will happen suddenly. All information, data, everything will be lost. Then something will appear that can restore it—but in limited quantity, at an immense cost."
              />
            </div>
            <ManifestoQuote>
              "What you see on your laptop, phone, social media—that becomes your intelligence. Without observation and perception, you merely record information and become mechanical—like AI."
            </ManifestoQuote>
          </Section>

          {/* Dual-Process Thinking */}
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
                This dual-process theory reflects our natural cognitive architecture: we generate spontaneous insights (intuition) and deliberate reasoning in parallel. This is what makes human cognition rich and autonomous.
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
                    Teaching has been converted into teachers, and teachers bias learning. When something is written—this is success, this is failure, this is the goal—it limits your possibilities. A written goal becomes a cage.
                  </p>
                  <p>
                    There should be mentors—gurus—whom you approach to clarify doubts or connect missing dots. But there should be no teachers in the conventional sense.
                  </p>
                  <p className="text-white italic">
                    "Learning should be your own. Once you learn something, there should be no third-party involvement in learning."
                  </p>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <ConceptCard
                  title="Self-Generated Thoughts"
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
                  I've spoken to hundreds of people. Ninety-eight out of a hundred <strong className="text-white">hate thinking</strong>. They don't pause for even a second. They speak instantly. While speaking, they frame answers—not thoughtful answers, but reactive ones.
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
          Artificial intelligence is not evolving naturally; it is fed artificially. Call it AI, call it anything—it's shaped by artificial sources.
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

export default FeelAliveView;

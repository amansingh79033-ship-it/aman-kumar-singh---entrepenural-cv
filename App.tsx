import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Lenis from 'lenis';
import Navigation from './components/Navigation.tsx';
import ThreeBackground from './components/ThreeBackground.tsx';
import Hero from './components/Hero.tsx';
import NeuralSync from './components/NeuralSync.tsx';
import SkillMatrix from './components/SkillMatrix.tsx';
import InterestsView from './views/InterestsView.tsx';
import IntelligenceView from './views/IntelligenceView.tsx';
import UnchiHaiBuildingView from './views/VenturesView.tsx';
import AnalysisView from './views/AnalysisView.tsx';
import MindspaceView from './views/MindspaceView.tsx';
import AdminDashboard from './views/AdminDashboard.tsx';
import Footer from './components/Footer.tsx';
import VisionModal from './components/VisionModal.tsx';
import { useAnalytics } from './hooks/useAnalytics';
import { useStore } from './lib/store';
import { ShieldAlert } from 'lucide-react';

export type ViewState = 'home' | 'systems' | 'intelligence' | 'ventures' | 'analysis' | 'mindspace' | 'admin';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>('home');
  const [isVisionOpen, setIsVisionOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const isIpFrozen = useStore(state => state.isIpFrozen);
  const [myIp, setMyIp] = useState('');

  // Real-time Analytics
  useAnalytics(currentView);

  useEffect(() => {
    fetch('https://api.ipify.org?format=json')
      .then(res => res.json())
      .then(data => setMyIp(data.ip))
      .catch(() => setMyIp('127.0.0.1'));

    const lenis = new Lenis({
      duration: 1.2,
      smoothWheel: true,
      wheelMultiplier: 1,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    const timer = setTimeout(() => setIsLoaded(true), 1000);

    return () => {
      clearTimeout(timer);
      lenis.destroy();
    };
  }, []);

  if (myIp && isIpFrozen(myIp)) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center p-6 text-center">
        <div className="p-8 bg-red-500/10 rounded-full text-red-500 mb-8 border border-red-500/20">
          <ShieldAlert size={64} />
        </div>
        <h1 className="text-4xl font-display font-bold text-white mb-4">Access Revoked</h1>
        <p className="text-slate-500 max-w-md uppercase tracking-widest text-xs font-bold leading-relaxed">
          Your node index ({myIp}) has been flagged and frozen by the archive administration.
          Persistent access is suspended until further audit.
        </p>
      </div>
    );
  }

  const renderView = () => {
    switch (currentView) {
      case 'home': return (
        <>
          <Hero onExplore={() => setCurrentView('systems')} onWatchVision={() => setIsVisionOpen(true)} />
          <SkillMatrix />
          <NeuralSync />
        </>
      );
      case 'systems': return <InterestsView />;
      case 'intelligence': return <IntelligenceView />;
      case 'ventures': return <UnchiHaiBuildingView />;
      case 'analysis': return <AnalysisView />;
      case 'mindspace': return <MindspaceView />;
      case 'admin': return <AdminDashboard onClose={() => setCurrentView('home')} />;
      default: return <Hero onExplore={() => setCurrentView('systems')} onWatchVision={() => setIsVisionOpen(true)} />;
    }
  };

  return (
    <div className={`relative min-h-screen bg-black selection:bg-sky-400/30 overflow-x-hidden text-white ${currentView === 'admin' ? 'overflow-y-auto' : ''}`}>
      {/* Vision Modal Global Overlay */}
      <VisionModal isOpen={isVisionOpen} onClose={() => setIsVisionOpen(false)} />

      <AnimatePresence>
        {!isLoaded && (
          <motion.div
            key="loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center bg-black"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ repeat: Infinity, duration: 0.8, repeatType: 'reverse' }}
              className="text-sky-300 font-display text-xl font-bold tracking-[0.6em] uppercase"
            >
              Loading Archive
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {currentView !== 'admin' && <ThreeBackground currentView={currentView} />}

      {currentView !== 'admin' && <Navigation currentView={currentView} setView={setCurrentView} />}

      <main className="relative z-10 w-full min-h-screen">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentView}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            {renderView()}
          </motion.div>
        </AnimatePresence>
      </main>

      {currentView !== 'admin' && <Footer setView={setCurrentView} />}

      {currentView !== 'admin' && (
        <div className="fixed inset-0 pointer-events-none z-[1]">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(56,189,248,0.02),transparent_80%)]" />
        </div>
      )}
    </div>
  );
};

export default App;
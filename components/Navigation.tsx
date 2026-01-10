
import React from 'react';
import { motion } from 'framer-motion';
import { ViewState } from '../App';

interface NavigationProps {
  currentView: ViewState;
  setView: (view: ViewState) => void;
}

const Navigation: React.FC<NavigationProps> = ({ currentView, setView }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const navItems: { id: ViewState; name: string; desc: string }[] = [
    { id: 'systems', name: 'Systems', desc: 'The Method' },
    { id: 'intelligence', name: 'Intelligence', desc: 'AHI Protocol' },
    { id: 'ventures', name: 'Unchi hai Building', desc: '30Cr Portfolio' },
    { id: 'analysis', name: 'Analysis', desc: 'Forensics' },
    { id: 'mindspace', name: 'Mindspace', desc: 'Poetry' }
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 left-0 right-0 z-[100] px-6 md:px-8 py-4 md:py-6 flex justify-between items-center bg-black/40 backdrop-blur-xl border-b border-white/5"
      >
        <div
          className="flex items-center gap-4 cursor-pointer group"
          onClick={() => setView('home')}
        >
          {/* Logo Mark */}
          <div className="relative w-10 h-10 md:w-12 md:h-12 flex items-center justify-center">
            <div className="absolute inset-0 bg-sky-500/10 rounded-xl rotate-0 group-hover:rotate-45 transition-transform duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]" />
            <div className="absolute inset-0 border border-sky-500/20 rounded-xl backdrop-blur-md group-hover:border-sky-400/50 transition-colors duration-500" />

            {/* Custom Icon-Letter Fusion */}
            <svg className="relative w-5 h-5 md:w-6 md:h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              {/* Abstract 'A' formed by circuit paths */}
              <path d="M12 3V5" strokeLinecap="round" className="text-sky-400" />
              <path d="M12 3L4.5 20H8.5L12 12" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M12 3L19.5 20H15.5L12 12" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="12" cy="12" r="2" className="fill-sky-400 stroke-none animate-pulse" />
              <path d="M12 8L12 12" strokeLinecap="round" />
            </svg>
          </div>

          {/* Text Branding */}
          <div className="flex flex-col justify-center">
            <span className="text-white font-display font-medium text-lg leading-none tracking-tight group-hover:text-sky-300 transition-colors">
              aman<span className="font-bold text-sky-400">.</span>kumar
            </span>
            <div className="flex items-center gap-2 mt-1">
              <span className="h-[1px] w-4 bg-sky-500/50 group-hover:w-8 transition-all duration-500" />
              <span className="text-[9px] text-slate-400 uppercase tracking-[0.2em] font-bold group-hover:text-sky-200 transition-colors">
                Singh
              </span>
            </div>
          </div>
        </div>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center space-x-12">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setView(item.id)}
              className="group relative flex flex-col items-center"
            >
              <span className={`text-[8px] uppercase tracking-[0.4em] transition-colors ${currentView === item.id ? 'text-sky-300' : 'text-slate-500 group-hover:text-sky-200'
                }`}>
                {item.desc}
              </span>
              <span className={`text-[10px] font-bold uppercase tracking-widest mt-1 transition-all ${currentView === item.id ? 'text-white scale-110' : 'text-slate-400'
                }`}>
                {item.name}
              </span>
              {currentView === item.id && (
                <motion.div
                  layoutId="nav-pill"
                  className="absolute -bottom-2 w-full h-[1px] bg-sky-400 shadow-[0_0_10px_#38bdf8]"
                />
              )}
            </button>
          ))}
        </div>

        <button
          onClick={() => {
            if (currentView !== 'home') {
              setView('home');
              // Small delay to ensure the component is rendered before scrolling
              setTimeout(() => {
                document.getElementById('neuralsync')?.scrollIntoView({ behavior: 'smooth' });
              }, 100);
            } else {
              document.getElementById('neuralsync')?.scrollIntoView({ behavior: 'smooth' });
            }
          }}
          className="hidden md:block border border-sky-400/20 hover:border-sky-400/80 hover:bg-sky-400/5 transition-all text-sky-300 px-6 py-2 rounded-full text-[9px] font-bold uppercase tracking-[0.3em]"
        >
          Collaborate
        </button>

        {/* Mobile Hamburger */}
        <button
          className="lg:hidden text-white p-2 z-50"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle mobile menu"
        >
          <div className="space-y-1.5">
            <motion.span animate={{ rotate: isMobileMenuOpen ? 45 : 0, y: isMobileMenuOpen ? 6 : 0 }} className="block w-6 h-0.5 bg-white" />
            <motion.span animate={{ opacity: isMobileMenuOpen ? 0 : 1 }} className="block w-6 h-0.5 bg-white" />
            <motion.span animate={{ rotate: isMobileMenuOpen ? -45 : 0, y: isMobileMenuOpen ? -6 : 0 }} className="block w-6 h-0.5 bg-white" />
          </div>
        </button>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[90] bg-black/95 backdrop-blur-3xl pt-24 px-6 lg:hidden overflow-y-auto"
          onClick={(e) => {
            // Close menu when clicking on the overlay background
            if (e.target === e.currentTarget) {
              setIsMobileMenuOpen(false);
            }
          }}
        >
          <div className="flex flex-col space-y-8 pb-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setView(item.id);
                  setIsMobileMenuOpen(false);
                }}
                className="text-left group py-2"
              >
                <span className="block text-[10px] uppercase tracking-[0.4em] text-slate-500 mb-1">{item.desc}</span>
                <span className={`text-2xl sm:text-3xl font-display font-bold ${currentView === item.id ? 'text-sky-400' : 'text-white'}`}>
                  {item.name}
                </span>
              </button>
            ))}
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                if (currentView !== 'home') {
                  setView('home');
                  setTimeout(() => {
                    document.getElementById('neuralsync')?.scrollIntoView({ behavior: 'smooth' });
                  }, 100);
                } else {
                  document.getElementById('neuralsync')?.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="mt-8 border border-sky-400/20 text-sky-300 px-8 py-4 rounded-full text-xs font-bold uppercase tracking-[0.3em] w-full"
            >
              Collaborate
            </button>
          </div>
        </motion.div>
      )}
    </>
  );
};

export default Navigation;


import React from 'react';
import { motion } from 'framer-motion';
import { Phone, Linkedin, ExternalLink } from 'lucide-react';
import { ViewState } from '../App';

interface FooterProps {
  setView?: (view: ViewState) => void;
}

const Footer: React.FC<FooterProps> = ({ setView }) => {
  return (
    <footer className="py-20 px-6 border-t border-white/5 bg-black/80 backdrop-blur-md relative z-10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10">
        <div className="text-center md:text-left">
          <div className="text-white font-display font-bold uppercase tracking-[0.3em] mb-2">amankumarSingh</div>
          <p className="text-slate-500 text-[10px] uppercase tracking-widest font-bold">
            Patna // Mumbai // London // <span
              onClick={() => setView?.('admin')}
              className="hover:text-sky-300 cursor-pointer transition-colors"
            >Global</span>
          </p>
        </div>

        <div className="flex items-center space-x-12">
          {[
            { icon: <Phone size={18} />, label: 'Call', href: 'tel:+917970750727' },
            { icon: <Linkedin size={18} />, label: 'LinkedIn', href: 'https://www.linkedin.com/in/aman-kumar-singh-5688b41b3/' },
            { icon: <ExternalLink size={18} />, label: 'CuriousMinds', href: 'https://curiousminds.online' }
          ].map((s, i) => (
            <a
              key={i}
              href={s.href}
              target={s.label === 'Call' ? '_self' : '_blank'}
              rel="noopener noreferrer"
              className="text-slate-500 hover:text-sky-300 transition-colors flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest"
            >
              {s.icon} {s.label}
            </a>
          ))}
        </div>

        <div className="text-[9px] text-slate-700 uppercase tracking-[0.4em]">
          © 2025 ALL SOVEREIGN RIGHTS RESERVED
        </div>
      </div>
    </footer>
  );
};

export default Footer;

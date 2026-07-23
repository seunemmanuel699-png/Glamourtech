
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Logo } from './Logo';
import { NotificationCenter } from './NotificationSystem';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/', tooltip: 'Enterprise overview & AI ROI framework' },
    { name: 'Work Showcase', path: '/work', tooltip: 'Case studies & video portfolio' },
    { name: 'Solutions', path: '/solutions', tooltip: 'Autonomous agents & CRM orchestration' },
    { name: 'Industries', path: '/industries', tooltip: 'Vertical-specific implementation logic' },
    { name: 'Training', path: '/training', tooltip: 'Governance, advisory & team upskilling' },
    { name: 'Contact', path: '/contact', tooltip: 'Direct scheduling & enterprise support' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-brand-black/80 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Brand Logo & Name */}
        <Link to="/" className="flex items-center gap-3 group py-2">
          <Logo size={44} glow={true} />
          <div className="flex flex-col justify-center">
            <div className="font-heading font-black tracking-[0.15em] text-lg text-white leading-none">
              GLAMOUR<span className="text-[#00D2FF]">TECH</span>
            </div>
            <div className="text-[8px] font-black tracking-[0.42em] text-gray-400 uppercase mt-1 leading-none">
              SOLUTION
            </div>
          </div>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <div key={link.path} className="relative group flex items-center">
              <Link
                to={link.path}
                className={`text-sm font-medium transition-colors hover:text-[#00D2FF] py-2 ${
                  isActive(link.path) ? 'text-[#00D2FF] font-bold' : 'text-gray-400'
                }`}
              >
                {link.name}
              </Link>
              
              {/* Tooltip */}
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-3 py-1.5 bg-brand-black border border-white/10 rounded-sm text-[10px] text-gray-300 font-bold uppercase tracking-wider whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-2xl z-[60]">
                {link.tooltip}
                <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-brand-black border-t border-l border-white/10 rotate-45"></div>
              </div>
            </div>
          ))}
          
          {/* Notification Center */}
          <NotificationCenter />

          <div className="relative group flex items-center">
            <Link
              to="/contact"
              className="bg-[#0066FF] text-white px-6 py-2.5 rounded-sm font-bold text-sm hover:bg-[#0052D4] transition-all uppercase tracking-wider shadow-lg shadow-[#0066FF]/20"
            >
              Book Strategy Call
            </Link>
            {/* Tooltip for CTA */}
            <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-3 py-1.5 bg-brand-black border border-white/10 rounded-sm text-[10px] text-[#00D2FF] font-bold uppercase tracking-wider whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-2xl z-[60]">
              Schedule Systems Audit
              <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-brand-black border-t border-l border-white/10 rotate-45"></div>
            </div>
          </div>
        </div>

        {/* Mobile Toggle and Mobile Notification Center */}
        <div className="flex md:hidden items-center gap-4">
          <NotificationCenter />
          <button
            className="text-white p-2"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-brand-black border-b border-white/10 px-6 py-8 flex flex-col space-y-6 animate-in slide-in-from-top duration-300">
          {navLinks.map((link) => (
            <div key={link.path}>
              <Link
                to={link.path}
                className={`text-lg font-medium ${isActive(link.path) ? 'text-[#00D2FF]' : 'text-white'}`}
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
              <p className="text-[10px] text-gray-500 uppercase font-bold tracking-widest mt-1">
                {link.tooltip}
              </p>
            </div>
          ))}
          <Link
            to="/contact"
            className="bg-[#0066FF] text-white px-6 py-3 rounded-sm font-bold text-center uppercase tracking-widest"
            onClick={() => setIsOpen(false)}
          >
            Book Strategy Call
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

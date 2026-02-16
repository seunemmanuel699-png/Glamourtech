
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/', tooltip: 'Enterprise overview & AI ROI framework' },
    { name: 'Work Showcase', path: '/work', tooltip: 'Case studies & video portfolio' },
    { name: 'Solutions', path: '/solutions', tooltip: 'Autonomous agents & CRM orchestration' },
    { name: 'Industries', path: '/industries', tooltip: 'Vertical-specific implementation logic' },
    { name: 'Training', path: '/training', tooltip: 'Governance, advisory & team upskilling' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-brand-black/80 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Animated Logo Container */}
        <Link to="/" className="flex items-center h-full py-4 group">
          <div className="h-full aspect-[4/1] bg-black overflow-hidden rounded-sm border border-white/5 group-hover:border-brand-red/50 transition-all duration-300 relative">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover bg-black"
              style={{ mixBlendMode: 'screen' }}
              aria-label="Glamourtech Animated Logo"
            >
              <source 
                src="https://hvtxvvalhjxjzixoiaun.supabase.co/storage/v1/object/public/Glamour%20tech/glamourtech%20animated%20logo.mp4" 
                type="video/mp4" 
              />
            </video>
            {/* Fallback black layer to prevent white flash */}
            <div className="absolute inset-0 bg-black -z-10"></div>
          </div>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <div key={link.path} className="relative group flex items-center">
              <Link
                to={link.path}
                className={`text-sm font-medium transition-colors hover:text-brand-red py-2 ${
                  isActive(link.path) ? 'text-brand-red' : 'text-gray-400'
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
          <div className="relative group flex items-center">
            <Link
              to="/contact"
              className="bg-brand-red text-white px-6 py-2.5 rounded-sm font-bold text-sm hover:bg-red-700 transition-all uppercase tracking-wider shadow-lg shadow-brand-red/10"
            >
              Book Strategy Call
            </Link>
            {/* Tooltip for CTA */}
            <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-3 py-1.5 bg-brand-black border border-white/10 rounded-sm text-[10px] text-brand-red font-bold uppercase tracking-wider whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-2xl z-[60]">
              Schedule Systems Audit
              <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-brand-black border-t border-l border-white/10 rotate-45"></div>
            </div>
          </div>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-white p-2"
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

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-brand-black border-b border-white/10 px-6 py-8 flex flex-col space-y-6 animate-in slide-in-from-top duration-300">
          {navLinks.map((link) => (
            <div key={link.path}>
              <Link
                to={link.path}
                className={`text-lg font-medium ${isActive(link.path) ? 'text-brand-red' : 'text-white'}`}
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
            className="bg-brand-red text-white px-6 py-3 rounded-sm font-bold text-center uppercase tracking-widest"
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

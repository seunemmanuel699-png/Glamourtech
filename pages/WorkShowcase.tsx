
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const aiAgentImages = [
  "https://hvtxvvalhjxjzixoiaun.supabase.co/storage/v1/object/public/workshowcase%20store/imgi_77_hq720.jpg",
  "https://hvtxvvalhjxjzixoiaun.supabase.co/storage/v1/object/public/workshowcase%20store/imgi_41_default.jpg",
  "https://hvtxvvalhjxjzixoiaun.supabase.co/storage/v1/object/public/workshowcase%20store/imgi_27_default.jpg",
  "https://hvtxvvalhjxjzixoiaun.supabase.co/storage/v1/object/public/workshowcase%20store/imgi_224_2024.04.30-ai-01.png",
  "https://hvtxvvalhjxjzixoiaun.supabase.co/storage/v1/object/public/workshowcase%20store/imgi_220_d3d1449f12510e3e.png",
  "https://hvtxvvalhjxjzixoiaun.supabase.co/storage/v1/object/public/workshowcase%20store/imgi_208_2025.11.30-aitools-11.png",
  "https://hvtxvvalhjxjzixoiaun.supabase.co/storage/v1/object/public/workshowcase%20store/imgi_206_Google_Antigravity_agent_side_panel.png",
  "https://hvtxvvalhjxjzixoiaun.supabase.co/storage/v1/object/public/workshowcase%20store/imgi_194_632169a236bc62cc.png",
  "https://hvtxvvalhjxjzixoiaun.supabase.co/storage/v1/object/public/workshowcase%20store/imgi_18_default.jpg",
  "https://hvtxvvalhjxjzixoiaun.supabase.co/storage/v1/object/public/workshowcase%20store/imgi_180_2025.11.30-aitools-15.png",
  "https://hvtxvvalhjxjzixoiaun.supabase.co/storage/v1/object/public/workshowcase%20store/imgi_172_google-antigravity-screenshots-on-an-orange-background.jpg",
  "https://hvtxvvalhjxjzixoiaun.supabase.co/storage/v1/object/public/workshowcase%20store/imgi_13_default.jpg",
  "https://hvtxvvalhjxjzixoiaun.supabase.co/storage/v1/object/public/workshowcase%20store/imgi_122_mIqH9QR42eeKoO7mYdYqy4UO3TU.png",
  "https://hvtxvvalhjxjzixoiaun.supabase.co/storage/v1/object/public/workshowcase%20store/imgi_11_default.png",
  "https://hvtxvvalhjxjzixoiaun.supabase.co/storage/v1/object/public/workshowcase%20store/imgi_110_maxresdefault.jpg"
];

const WorkShowcase: React.FC = () => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  // Handle escape key to close lightbox
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedIndex(null);
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  // Lock scroll when lightbox is open
  useEffect(() => {
    if (selectedIndex !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [selectedIndex]);

  const goToNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedIndex === null) return;
    setSelectedIndex((selectedIndex + 1) % aiAgentImages.length);
  };

  const goToPrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedIndex === null) return;
    setSelectedIndex((selectedIndex - 1 + aiAgentImages.length) % aiAgentImages.length);
  };

  return (
    <div className="bg-brand-black text-brand-white min-h-screen">
      {/* Page Header */}
      <section className="pt-32 pb-12 px-6 relative overflow-hidden border-b border-white/5">
        <div className="max-w-7xl mx-auto relative z-10">
          <span className="text-brand-red font-black tracking-[0.6em] uppercase text-xs mb-6 block">Production Portfolio</span>
          <h1 className="text-5xl md:text-7xl font-black heading-font uppercase tracking-tighter leading-none">
            Work <br /><span className="text-brand-red">Showcase</span>
          </h1>
        </div>
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-brand-red/5 rounded-full blur-[120px] pointer-events-none"></div>
      </section>

      {/* AI AGENT SECTION */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-16">
          <div className="space-y-2">
            <h2 className="text-4xl md:text-6xl font-black heading-font uppercase tracking-tighter">
              AI <span className="text-brand-red">Agent</span>
            </h2>
            <div className="h-1 w-24 bg-brand-red"></div>
          </div>
          <div className="hidden md:block text-right">
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-500 block">System Deployments</span>
            <span className="text-white font-bold text-xs uppercase tracking-widest">Index 01 — {aiAgentImages.length}</span>
          </div>
        </div>

        {/* High Density Thumbnail Image Grid */}
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 gap-2 md:gap-3">
          {aiAgentImages.map((src, idx) => (
            <div 
              key={idx} 
              onClick={() => setSelectedIndex(idx)}
              className="group relative overflow-hidden bg-white/5 border border-white/10 rounded-sm aspect-square cursor-pointer hover:border-brand-red/50 transition-all duration-300 shadow-xl"
            >
              <div className="absolute inset-0 z-10 bg-brand-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="bg-brand-red text-white p-1.5 rounded-full scale-75 group-hover:scale-100 transition-transform duration-300">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                </div>
              </div>
              
              <img 
                src={src} 
                alt={`AI Deployment ${idx + 1}`} 
                className="w-full h-full object-cover grayscale-[0.6] group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700 ease-out"
                loading="lazy"
              />

              {/* Status Overlay */}
              <div className="absolute bottom-1 left-1 z-20 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-white font-black text-[5px] uppercase tracking-widest bg-brand-black/80 px-1 py-0.5 border border-white/5 backdrop-blur-sm">
                  NODE-{idx + 1}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Lightbox / Expanded Modal */}
      {selectedIndex !== null && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center bg-brand-black/98 backdrop-blur-3xl p-4 md:p-12 animate-in fade-in duration-300"
          onClick={() => setSelectedIndex(null)}
        >
          {/* Controls */}
          <button 
            onClick={(e) => { e.stopPropagation(); setSelectedIndex(null); }}
            className="absolute top-6 right-6 text-white/40 hover:text-brand-red transition-all z-[110] bg-white/5 p-2 rounded-full border border-white/10"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>

          <button 
            onClick={goToPrev}
            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 p-6 text-white/20 hover:text-brand-red hover:bg-white/5 transition-all z-[110] rounded-full group bg-black/40 backdrop-blur-md"
          >
            <svg className="w-10 h-10 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
          </button>

          <button 
            onClick={goToNext}
            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 p-6 text-white/20 hover:text-brand-red hover:bg-white/5 transition-all z-[110] rounded-full group bg-black/40 backdrop-blur-md"
          >
            <svg className="w-10 h-10 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          </button>

          {/* Main Image View */}
          <div 
            className="relative max-w-7xl w-full h-full flex flex-col items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative group/img overflow-hidden border border-white/10 shadow-2xl bg-brand-black flex items-center justify-center">
               <img 
                src={aiAgentImages[selectedIndex]} 
                className="max-h-[75vh] w-auto object-contain animate-in zoom-in-95 duration-500"
                alt="Expanded Portfolio View"
              />
            </div>
            
            <div className="mt-8 flex flex-col items-center text-center space-y-3 max-w-2xl">
              <div className="flex items-center space-x-4">
                <span className="text-brand-red font-black text-[8px] uppercase tracking-[0.5em]">Systems Audit v2.5</span>
                <div className="h-px w-16 bg-white/10"></div>
                <span className="text-white font-black text-2xl md:text-3xl uppercase tracking-tighter">Architecture Nexus Node-{selectedIndex + 1}</span>
              </div>
              <p className="text-gray-500 font-bold uppercase tracking-[0.3em] text-[7px] md:text-[9px]">
                Active Component {selectedIndex + 1} of {aiAgentImages.length} | Distributed AI Cluster Output
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Technical Footer CTA */}
      <section className="py-32 bg-brand-red relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="grid grid-cols-12 gap-1 h-full w-full">
            {Array.from({length: 48}).map((_, i) => (
              <div key={i} className="border border-white/20 h-full"></div>
            ))}
          </div>
        </div>
        <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
          <h2 className="text-4xl md:text-7xl font-black heading-font mb-10 uppercase tracking-tighter text-white leading-none">
            Scale Your <br />Operations
          </h2>
          <Link 
            to="/contact" 
            className="inline-block bg-brand-black text-white px-16 py-6 font-black uppercase tracking-[0.4em] hover:bg-white hover:text-brand-black transition-all shadow-2xl active:scale-95"
          >
            Connect Now
          </Link>
        </div>
      </section>
    </div>
  );
};

export default WorkShowcase;

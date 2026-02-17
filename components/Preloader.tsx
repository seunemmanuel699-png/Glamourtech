
import React, { useEffect, useState } from 'react';

const Preloader: React.FC<{ isReady: boolean }> = ({ isReady }) => {
  const [shouldRender, setShouldRender] = useState(true);

  useEffect(() => {
    if (isReady) {
      const timer = setTimeout(() => setShouldRender(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [isReady]);

  if (!shouldRender) return null;

  return (
    <div className={`fixed inset-0 z-[9999] bg-brand-black flex flex-col items-center justify-center transition-opacity duration-1000 ${isReady ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
      <div className="relative w-64 h-24 overflow-hidden mb-8 border border-white/5">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
          style={{ mixBlendMode: 'screen' }}
        >
          <source 
            src="https://hvtxvvalhjxjzixoiaun.supabase.co/storage/v1/object/public/Glamour%20tech/glamourtech%20animated%20logo.mp4" 
            type="video/mp4" 
          />
        </video>
      </div>
      
      <div className="w-48 h-1 bg-white/10 relative overflow-hidden">
        <div className={`absolute inset-y-0 left-0 bg-brand-red transition-all duration-[3000ms] ease-out ${isReady ? 'w-full' : 'w-1/3 animate-pulse'}`}></div>
      </div>
      
      <div className="mt-6 flex flex-col items-center space-y-2">
        <span className="text-brand-red font-black text-[10px] uppercase tracking-[0.5em] animate-pulse">Initializing Systems</span>
        <span className="text-gray-500 font-bold text-[8px] uppercase tracking-[0.3em]">Glamourtech Operations Hub v3.1</span>
      </div>

      {/* Technical Grid Background for Loader */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="w-full h-full" style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
      </div>
    </div>
  );
};

export default Preloader;

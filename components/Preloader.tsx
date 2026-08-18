import React, { useEffect, useState } from "react";
import { Logo } from "./Logo";

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
    <div
      className={`fixed inset-0 z-[9999] bg-brand-black flex flex-col items-center justify-center transition-opacity duration-1000 ${isReady ? "opacity-0 pointer-events-none" : "opacity-100"}`}
    >
      <div className="flex flex-col items-center mb-8 relative">
        {/* Large Brand Logo */}
        <Logo size={96} glow={true} className="mb-6 animate-pulse" />

        {/* Brand Name Text */}
        <div className="text-center">
          <div className="font-heading font-black tracking-[0.2em] text-2xl text-white leading-none">
            GLAMOUR<span className="text-[#00D2FF]">TECH</span>
          </div>
          <div className="text-[10px] font-black tracking-[0.55em] text-gray-400 uppercase mt-2 leading-none">
            SOLUTION
          </div>
        </div>
      </div>

      {/* High-tech Loading Progress Bar */}
      <div className="w-48 h-[2px] bg-white/10 relative overflow-hidden rounded-full">
        <div
          className={`absolute inset-y-0 left-0 bg-gradient-to-r from-[#0066FF] to-[#00D2FF] transition-all duration-[3000ms] ease-out ${isReady ? "w-full" : "w-1/3 animate-pulse"}`}
        ></div>
      </div>

      <div className="mt-6 flex flex-col items-center space-y-2">
        <span className="text-[#00D2FF] font-black text-[9px] uppercase tracking-[0.5em] animate-pulse">
          Initializing Core Systems
        </span>
        <span className="text-gray-500 font-bold text-[8px] uppercase tracking-[0.3em]">
          Glamourtech Operations Hub v3.1
        </span>
      </div>

      {/* Technical Grid Background for Loader */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div
          className="w-full h-full"
          style={{
            backgroundImage:
              "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        ></div>
      </div>
    </div>
  );
};

export default Preloader;

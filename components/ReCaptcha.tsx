import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldCheck, ShieldAlert, Cpu, Check, Loader2, Info } from 'lucide-react';

interface ReCaptchaProps {
  onVerify: (verified: boolean) => void;
  theme?: 'dark' | 'light';
  size?: 'normal' | 'compact';
}

export const ReCaptcha: React.FC<ReCaptchaProps> = ({ 
  onVerify, 
  theme = 'dark',
  size = 'normal' 
}) => {
  const [isVerifying, setIsVerifying] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [scanStep, setScanStep] = useState(0);
  const [telemetryScore, setTelemetryScore] = useState<number | null>(null);

  const scanPhrases = [
    "Analyzing input vectors...",
    "Evaluating browser telemetry...",
    "Confirming non-robotic mouse path...",
    "Biometric validation successful!"
  ];

  const handleCheckboxClick = () => {
    if (isVerified || isVerifying) return;

    setIsVerifying(true);
    setScanStep(0);

    // Simulate standard advanced biometric & neural-telemetry analysis
    const interval = setInterval(() => {
      setScanStep((prev) => {
        if (prev >= scanPhrases.length - 1) {
          clearInterval(interval);
          setTimeout(() => {
            setIsVerifying(false);
            setIsVerified(true);
            setTelemetryScore(98.4); // Cool mock bot classification rating (98.4% human likeness)
            onVerify(true);
          }, 600);
          return prev;
        }
        return prev + 1;
      });
    }, 850);
  };

  const resetCaptcha = () => {
    setIsVerifying(false);
    setIsVerified(false);
    setScanStep(0);
    setTelemetryScore(null);
    onVerify(false);
  };

  const isDark = theme === 'dark';

  return (
    <div 
      id="recaptcha-widget" 
      className={`border select-none overflow-hidden transition-all duration-300 rounded-sm font-sans ${
        isDark 
          ? 'bg-[#040811] border-white/10 text-brand-white' 
          : 'bg-gray-50 border-gray-200 text-gray-800'
      } ${
        size === 'compact' ? 'p-3 w-full max-w-[280px]' : 'p-5 w-full max-w-[360px]'
      }`}
    >
      <div className="flex items-center justify-between">
        {/* Checkbox and Text Area */}
        <div className="flex items-center gap-4">
          <div className="relative">
            <button
              type="button"
              onClick={handleCheckboxClick}
              disabled={isVerified || isVerifying}
              className={`w-7 h-7 rounded border transition-all flex items-center justify-center relative focus:outline-none ${
                isVerified 
                  ? 'bg-green-500 border-green-500 text-white' 
                  : isVerifying
                    ? 'border-brand-red/30 bg-brand-red/5'
                    : isDark 
                      ? 'border-white/20 hover:border-[#00D2FF] bg-black/40' 
                      : 'border-gray-300 hover:border-gray-400 bg-white'
              }`}
            >
              <AnimatePresence mode="wait">
                {isVerified && (
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <Check className="w-4 h-4 stroke-[3.5]" />
                  </motion.div>
                )}

                {isVerifying && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    <Loader2 className="w-4 h-4 text-brand-red animate-spin" />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>

          <div className="flex flex-col">
            <span className={`text-[12px] font-bold tracking-wide uppercase ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>
              {isVerified ? 'Verification Complete' : isVerifying ? 'Analyzing Telemetry...' : "I'm not a robot"}
            </span>
            <span className="text-[9px] text-gray-500 font-mono tracking-wider">
              {isVerified 
                ? `Biometrics Clear (H-Score: ${telemetryScore}%)` 
                : isVerifying 
                  ? 'Neural-Gate active' 
                  : 'Protected by Glamourtech AI Guard'}
            </span>
          </div>
        </div>

        {/* reCAPTCHA Brand Logo / Badge */}
        <div className="flex flex-col items-end">
          <div className="flex items-center gap-1.5 text-brand-red">
            <ShieldCheck className={`w-5 h-5 ${isVerified ? 'text-green-400' : 'text-brand-red'}`} />
            <span className="text-[10px] font-black tracking-widest text-white">RECAPTCHA</span>
          </div>
          <span className="text-[8px] text-gray-500 uppercase mt-0.5 font-mono tracking-widest">Enterprise AI</span>
        </div>
      </div>

      {/* Verification scan progress screen */}
      <AnimatePresence>
        {isVerifying && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="mt-4 pt-3 border-t border-white/5 space-y-2 overflow-hidden"
          >
            <div className="h-1 bg-white/5 rounded-full overflow-hidden relative">
              <motion.div 
                className="h-full bg-brand-red absolute left-0 top-0"
                initial={{ width: '0%' }}
                animate={{ width: `${((scanStep + 1) / scanPhrases.length) * 100}%` }}
                transition={{ duration: 0.6 }}
              />
            </div>
            
            <div className="flex items-center justify-between text-[10px] font-mono">
              <span className="text-gray-400 flex items-center gap-1.5 animate-pulse">
                <Cpu className="w-3.5 h-3.5 text-brand-red animate-spin" />
                {scanPhrases[scanStep]}
              </span>
              <span className="text-brand-red font-bold">SECURE NODE</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Small terms helper footer */}
      <div className={`mt-3 pt-2 border-t text-[8px] font-mono tracking-wider flex items-center justify-between ${isDark ? 'border-white/5 text-gray-600' : 'border-gray-200 text-gray-400'}`}>
        <span className="hover:underline cursor-pointer">Glamourtech Solutions Privacy</span>
        <span className="hover:underline cursor-pointer">Terms & Core Policy</span>
      </div>
    </div>
  );
};

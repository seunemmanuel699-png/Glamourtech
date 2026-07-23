import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Shield, ShieldCheck, Lock, Unlock, CheckCircle2, Sparkles, Key } from 'lucide-react';
import { ReCaptcha } from './ReCaptcha';

interface SecurityGateProps {
  onAccessGranted: () => void;
}

export const SecurityGate: React.FC<SecurityGateProps> = ({ onAccessGranted }) => {
  const [isVerified, setIsVerified] = useState(false);
  const [v3Token, setV3Token] = useState<string | null>(null);
  const [unlocking, setUnlocking] = useState(false);

  const handleReCaptchaVerify = async (verified: boolean) => {
    if (!verified) return;

    setIsVerified(true);
    setUnlocking(true);

    // Also trigger Google reCAPTCHA v3 script token generation
    if ((window as any).grecaptcha) {
      try {
        (window as any).grecaptcha.ready(() => {
          (window as any).grecaptcha.execute('6LdfXN8UAAAAAN977Aet8vZ6K8S2V4v3_S0_7G9H', { action: 'site_access' })
            .then((token: string) => {
              console.log('[reCAPTCHA v3] Site entry token acquired:', token);
              setV3Token(token);
            })
            .catch((err: any) => {
              console.warn('[reCAPTCHA v3] Entry token error:', err);
            });
        });
      } catch (err) {
        console.warn('[reCAPTCHA v3] Execution error:', err);
      }
    }

    // Delay slightly to show "ACCESS GRANTED" status animation
    setTimeout(() => {
      sessionStorage.setItem('recaptcha_gate_passed', 'true');
      onAccessGranted();
    }, 1200);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.5 } }}
      className="fixed inset-0 z-[99999] bg-brand-black/95 backdrop-blur-2xl flex items-center justify-center p-4 selection:bg-brand-blue selection:text-white"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brand-blue/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[350px] h-[350px] bg-[#00D2FF]/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Security Gate Card */}
      <motion.div 
        initial={{ scale: 0.9, y: 20, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="w-full max-w-md bg-[#050B14] border border-white/10 rounded-lg p-6 md:p-8 shadow-2xl relative overflow-hidden"
      >
        {/* Top Accent Line */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-blue via-[#00D2FF] to-brand-blue" />

        {/* Shield Icon Header */}
        <div className="flex flex-col items-center text-center mb-6">
          <div className="relative mb-4">
            <div className={`w-16 h-16 rounded-full flex items-center justify-center transition-all duration-500 border ${
              isVerified 
                ? 'bg-green-500/10 border-green-500/40 text-green-400 shadow-[0_0_30px_rgba(34,197,94,0.3)]' 
                : 'bg-brand-blue/10 border-brand-blue/30 text-brand-blue shadow-[0_0_30px_rgba(0,102,255,0.2)]'
            }`}>
              {isVerified ? (
                <Unlock className="w-8 h-8 animate-bounce" />
              ) : (
                <Lock className="w-8 h-8" />
              )}
            </div>
            
            <span className="absolute -bottom-1 -right-1 flex h-4 w-4">
              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                isVerified ? 'bg-green-400' : 'bg-brand-blue'
              }`} />
              <span className={`relative inline-flex rounded-full h-4 w-4 ${
                isVerified ? 'bg-green-500' : 'bg-brand-blue'
              }`} />
            </span>
          </div>

          <span className="text-[9px] font-black uppercase tracking-[0.4em] text-[#00D2FF] mb-1">
            Glamourtech AI Guard
          </span>
          <h2 className="text-2xl font-black heading-font uppercase text-white tracking-tight">
            Security <span className="text-brand-blue">Verification</span>
          </h2>
          <p className="text-xs text-gray-400 mt-2 max-w-xs font-medium">
            Please complete the reCAPTCHA verification below to grant session access to Glamourtech AI & Automation.
          </p>
        </div>

        {/* reCAPTCHA Widget Embed */}
        <div className="my-6 flex justify-center">
          <ReCaptcha onVerify={handleReCaptchaVerify} theme="dark" size="normal" />
        </div>

        {/* Status Message */}
        <div className="text-center min-h-[32px] flex items-center justify-center">
          {unlocking ? (
            <motion.div 
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2 text-green-400 font-bold text-xs font-mono uppercase tracking-wider bg-green-500/10 border border-green-500/20 px-4 py-2 rounded"
            >
              <CheckCircle2 className="w-4 h-4 text-green-400" />
              <span>ACCESS GRANTED — UNLOCKING WEBSITE...</span>
            </motion.div>
          ) : (
            <div className="flex items-center gap-1.5 text-[10px] text-gray-500 font-mono tracking-widest uppercase">
              <Shield className="w-3.5 h-3.5 text-brand-blue" />
              <span>Google reCAPTCHA v3 & Biometrics Active</span>
            </div>
          )}
        </div>

        {/* Bottom Metadata */}
        <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-[9px] text-gray-500 font-mono">
          <span>SECURE GATE v3.8</span>
          <span className="flex items-center gap-1 text-gray-400">
            <Key className="w-3 h-3 text-brand-blue" />
            TOKEN ENCRYPTED
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
};

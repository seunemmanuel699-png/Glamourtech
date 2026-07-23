import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'motion/react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Solutions from './pages/Solutions';
import Industries from './pages/Industries';
import Training from './pages/Training';
import Contact from './pages/Contact';
import WorkShowcase from './pages/WorkShowcase';
import Legal from './pages/Legal';
import Preloader from './components/Preloader';
import { SecurityGate } from './components/SecurityGate';

const App: React.FC = () => {
  const [isReady, setIsReady] = useState(false);
  const [isSecurityPassed, setIsSecurityPassed] = useState(false);

  useEffect(() => {
    // Show the site load completion state quickly
    const timer = setTimeout(() => {
      setIsReady(true);
    }, 800);

    const handleLoad = () => {
      setIsReady(true);
    };

    if (document.readyState === 'complete') {
      setIsReady(true);
    } else {
      window.addEventListener('load', handleLoad);
      return () => {
        window.removeEventListener('load', handleLoad);
        clearTimeout(timer);
      };
    }
  }, []);

  // Prevent background scrolling while reCAPTCHA gate is active
  useEffect(() => {
    if (isReady && !isSecurityPassed) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isReady, isSecurityPassed]);

  return (
    <HashRouter>
      <Preloader isReady={isReady} />

      {/* Security Gate Modal Overlay - Appears after load finish before accessing anything */}
      <AnimatePresence>
        {isReady && !isSecurityPassed && (
          <SecurityGate onAccessGranted={() => setIsSecurityPassed(true)} />
        )}
      </AnimatePresence>
      
      <div className={`min-h-screen flex flex-col bg-brand-black text-brand-white selection:bg-brand-blue selection:text-white relative transition-all duration-500 ${isReady ? 'opacity-100' : 'opacity-0'} ${!isSecurityPassed ? 'pointer-events-none select-none blur-md filter h-screen overflow-hidden' : ''}`}>
        <Navbar />
        
        <main className="flex-grow pt-20">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/work" element={<WorkShowcase />} />
            <Route path="/solutions" element={<Solutions />} />
            <Route path="/industries" element={<Industries />} />
            <Route path="/training" element={<Training />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/privacy" element={<Legal />} />
            <Route path="/terms" element={<Legal />} />
            <Route path="/security" element={<Legal />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </HashRouter>
  );
};

export default App;
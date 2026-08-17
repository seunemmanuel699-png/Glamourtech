import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
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

import About from './pages/About';
import Reviews from './pages/Reviews';

const App: React.FC = () => {
  const [isReady, setIsReady] = useState(false);

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

  return (
    <HashRouter>
      <Preloader isReady={isReady} />

      {/* Global Background Video */}
      <div className="fixed inset-0 z-[-1] pointer-events-none w-full h-full bg-brand-black">
        <video 
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover opacity-30"
        >
          <source src="https://res.cloudinary.com/fxudag9y/video/upload/v1785804148/backgrounmovie_bi80gz.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-brand-black/60 to-brand-black/90 mix-blend-multiply"></div>
      </div>

      <div className={`min-h-screen flex flex-col bg-transparent text-brand-white selection:bg-brand-blue selection:text-white relative transition-all duration-500 ${isReady ? 'opacity-100' : 'opacity-0'}`}>
        <Navbar />
        
        <main className="flex-grow pt-20">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/work" element={<WorkShowcase />} />
            <Route path="/solutions" element={<Solutions />} />
            <Route path="/industries" element={<Industries />} />
            <Route path="/training" element={<Training />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<About />} />
            <Route path="/reviews" element={<Reviews />} />
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
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

const App: React.FC = () => {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Show the site quickly even if videos are still buffering in the background
    // This prevents the 'blank screen' issue
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
      
      <div className={`min-h-screen flex flex-col bg-brand-black text-brand-white selection:bg-brand-red selection:text-white relative transition-opacity duration-500 ${isReady ? 'opacity-100' : 'opacity-0'}`}>
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
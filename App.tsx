
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
    // Wait for window load event (all images, styles, and initial media requests)
    const handleLoad = () => {
      // Small artificial delay to ensure smooth transition
      setTimeout(() => setIsReady(true), 1500);
    };

    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
      return () => window.removeEventListener('load', handleLoad);
    }
  }, []);

  return (
    <HashRouter>
      <Preloader isReady={isReady} />
      
      <div className={`min-h-screen flex flex-col bg-brand-black text-brand-white selection:bg-brand-red selection:text-white relative transition-opacity duration-1000 ${isReady ? 'opacity-100' : 'opacity-0'}`}>
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

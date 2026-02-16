
import React from 'react';
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

const App: React.FC = () => {
  return (
    <HashRouter>
      <div className="min-h-screen flex flex-col bg-brand-black text-brand-white selection:bg-brand-red selection:text-white relative">
        {/* Navbar at the top */}
        <Navbar />
        
        {/* Main content area */}
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

        {/* Footer at the very bottom */}
        <Footer />
      </div>
    </HashRouter>
  );
};

export default App;

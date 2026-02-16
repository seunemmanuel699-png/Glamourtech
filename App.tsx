
import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Chatbot from './components/Chatbot';
import Home from './pages/Home';
import Solutions from './pages/Solutions';
import Industries from './pages/Industries';
import Training from './pages/Training';
import Contact from './pages/Contact';
import WorkShowcase from './pages/WorkShowcase';

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
          </Routes>
        </main>

        {/* Floating Chatbot overlaying the bottom right */}
        <Chatbot />
        
        {/* Footer at the very bottom */}
        <Footer />
      </div>
    </HashRouter>
  );
};

export default App;

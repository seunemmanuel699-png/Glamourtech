
import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-brand-black border-t border-white/10 py-16 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="col-span-1 md:col-span-2">
          {/* Animated Logo for Footer */}
          <Link to="/" className="block h-12 w-48 mb-6 bg-black overflow-hidden rounded-sm border border-white/5 hover:border-brand-red/50 transition-all duration-300 relative">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover bg-black"
              style={{ mixBlendMode: 'screen' }}
            >
              <source 
                src="https://hvtxvvalhjxjzixoiaun.supabase.co/storage/v1/object/public/Glamour%20tech/glamourtech%20animated%20logo.mp4" 
                type="video/mp4" 
              />
            </video>
            {/* Fallback black layer */}
            <div className="absolute inset-0 bg-black -z-10"></div>
          </Link>
          <p className="text-gray-400 max-w-sm mb-8">
            Deploying enterprise-grade AI systems that automate revenue and decision-making for serious businesses.
          </p>
          <div className="flex space-x-4">
            <a href="#" className="text-gray-400 hover:text-white transition-colors font-bold uppercase text-[10px] tracking-widest">LinkedIn</a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors font-bold uppercase text-[10px] tracking-widest">Twitter</a>
          </div>
        </div>

        <div>
          <h4 className="font-bold mb-6 uppercase text-sm tracking-widest text-brand-red">Company</h4>
          <ul className="space-y-4 text-gray-400">
            <li><Link to="/work" className="hover:text-white transition-colors">Work Showcase</Link></li>
            <li><Link to="/solutions" className="hover:text-white transition-colors">Solutions</Link></li>
            <li><Link to="/industries" className="hover:text-white transition-colors">Industries</Link></li>
            <li><Link to="/training" className="hover:text-white transition-colors">Training</Link></li>
            <li><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold mb-6 uppercase text-sm tracking-widest text-brand-red">Legal</h4>
          <ul className="space-y-4 text-gray-400">
            <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Security Governance</a></li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-white/5 text-gray-500 text-xs flex flex-col md:flex-row justify-between items-center">
        <p>&copy; {new Date().getFullYear()} Glamourtech. All rights reserved.</p>
        <p className="mt-4 md:mt-0 italic">Precise. Authoritative. Technical.</p>
      </div>
    </footer>
  );
};

export default Footer;

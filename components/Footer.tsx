
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
          <p className="text-gray-400 max-w-sm mb-8 font-medium">
            Deploying enterprise-grade AI systems that automate revenue and decision-making for serious businesses.
          </p>
          
          {/* Social & Contact Section */}
          <div className="flex flex-col items-start space-y-8">
            {/* Upwork Profile */}
            <a 
              href="https://www.upwork.com/freelancers/~0161750daa781bfcb5?mp_source=share" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="group flex flex-col items-center transition-all text-center"
            >
              <div className="w-12 h-12 mb-2 p-1 bg-white rounded-full group-hover:scale-110 transition-transform duration-300 flex items-center justify-center overflow-hidden shadow-lg shadow-white/5">
                <img 
                  src="https://hvtxvvalhjxjzixoiaun.supabase.co/storage/v1/object/public/my%20logos/upwork%20logo.png" 
                  alt="Upwork Logo" 
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="text-gray-400 group-hover:text-white transition-colors font-black uppercase text-[10px] tracking-[0.4em]">Upwork Profile</span>
            </a>

            {/* Direct Contact Info */}
            <div className="space-y-6">
              <div className="flex flex-col">
                <span className="text-brand-red font-black text-[9px] uppercase tracking-[0.4em] mb-1">WhatsApp / Direct</span>
                <a 
                  href="https://wa.me/2348145157702" 
                  className="text-white hover:text-brand-red transition-colors font-bold text-lg tracking-tight"
                >
                  +234 8145157702
                </a>
              </div>
              
              <div className="flex flex-col">
                <span className="text-brand-red font-black text-[9px] uppercase tracking-[0.4em] mb-1">Official Transmission</span>
                <a 
                  href="mailto:seunemmanuel699@gmail.com" 
                  className="text-white hover:text-brand-red transition-colors font-bold text-lg tracking-tight"
                >
                  seunemmanuel699@gmail.com
                </a>
              </div>
            </div>
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
            <li><Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
            <li><Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
            <li><Link to="/security" className="hover:text-white transition-colors">Security Governance</Link></li>
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

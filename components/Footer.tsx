
import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Lock, Award, FileCheck, CheckCircle2 } from 'lucide-react';
import { Logo } from './Logo';

const Footer: React.FC = () => {
  return (
    <footer className="bg-brand-black border-t border-white/10 py-16 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="col-span-1 md:col-span-2">
          {/* Brand Logo & Name */}
          <Link to="/" className="inline-flex items-center gap-3 mb-6 group">
            <Logo size={38} glow={true} />
            <div className="flex flex-col justify-center">
              <div className="font-heading font-black tracking-[0.15em] text-md text-white leading-none">
                GLAMOUR<span className="text-[#00D2FF]">TECH</span>
              </div>
              <div className="text-[8px] font-black tracking-[0.42em] text-gray-400 uppercase mt-1 leading-none">
                SOLUTION
              </div>
            </div>
          </Link>
          <p className="text-gray-400 max-w-sm mb-8 font-medium">
            Deploying enterprise-grade AI systems that automate revenue and decision-making for serious businesses.
          </p>
          
          {/* Social & Contact Section */}
          <div className="flex flex-col items-start space-y-8">
            <div className="flex items-center space-x-6 flex-wrap gap-y-4">
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
                <span className="text-gray-400 group-hover:text-white transition-colors font-black uppercase text-[10px] tracking-[0.4em]">Upwork</span>
              </a>

              {/* YouTube Channel */}
              <a 
                href="https://youtube.com/@glamourtechsolution-n4z?si=HrrmbMYujDsbNmy7" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="group flex flex-col items-center transition-all text-center"
              >
                <div className="w-12 h-12 mb-2 bg-white/5 rounded-full group-hover:scale-110 transition-transform duration-300 flex items-center justify-center overflow-hidden shadow-lg shadow-white/5 border border-white/10 group-hover:border-red-600/50">
                  <svg 
                    className="w-6 h-6 text-red-600"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                </div>
                <span className="text-gray-400 group-hover:text-white transition-colors font-black uppercase text-[10px] tracking-[0.4em]">YouTube</span>
              </a>

              {/* ORCID iD Badge */}
              <a 
                id="cy-effective-orcid-url"
                href="https://orcid.org/0009-0003-0287-3454" 
                target="orcid.widget" 
                rel="me noopener noreferrer" 
                className="group flex flex-col items-center transition-all text-center"
                style={{ verticalAlign: 'top' }}
              >
                <div className="w-12 h-12 mb-2 p-2 bg-white/5 rounded-full group-hover:scale-110 transition-transform duration-300 flex items-center justify-center overflow-hidden shadow-lg shadow-white/5 border border-white/10 group-hover:border-[#A6CE39]">
                  <img 
                    src="https://orcid.org/sites/default/files/images/orcid_16x16.png" 
                    alt="ORCID iD icon" 
                    className="w-6 h-6 object-contain"
                  />
                </div>
                <span className="text-gray-400 group-hover:text-white transition-colors font-black uppercase text-[10px] tracking-[0.4em]">ORCID</span>
              </a>
            </div>

            {/* Direct Contact Info & ORCID Widget */}
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
                  href="mailto:glamourtechsolution@gmail.com" 
                  className="text-white hover:text-brand-red transition-colors font-bold text-lg tracking-tight"
                >
                  glamourtechsolution@gmail.com
                </a>
              </div>

              <div className="flex flex-col">
                <span className="text-brand-red font-black text-[9px] uppercase tracking-[0.4em] mb-1">ORCID Researcher Record</span>
                <a
                  id="cy-effective-orcid-url"
                  className="underline text-gray-300 hover:text-[#A6CE39] transition-colors text-sm font-mono flex items-center gap-1.5"
                  href="https://orcid.org/0009-0003-0287-3454"
                  target="orcid.widget"
                  rel="me noopener noreferrer"
                  style={{ verticalAlign: 'top' }}
                >
                  <img
                    src="https://orcid.org/sites/default/files/images/orcid_16x16.png"
                    style={{ width: '1em', marginInlineStart: '0.5em' }}
                    alt="ORCID iD icon"
                  />
                  https://orcid.org/0009-0003-0287-3454
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

      {/* Security & Compliance Section */}
      <div className="max-w-7xl mx-auto mt-16 pt-10 border-t border-white/10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
          <div>
            <span className="text-brand-red font-black text-[9px] uppercase tracking-[0.4em] block mb-1">
              Enterprise Governance
            </span>
            <h5 className="text-white font-black uppercase tracking-tight text-lg">
              Security & Compliance Standards
            </h5>
          </div>
          <span className="text-xs text-gray-400 max-w-md text-left md:text-right font-medium">
            Adhering to strict international data privacy, encryption standards, and peer-reviewed AI safety frameworks.
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {/* SOC 2 Type II Badge */}
          <div className="p-4 bg-white/[0.02] border border-white/10 rounded flex items-center gap-3 hover:border-brand-red/40 transition-colors group">
            <div className="p-2 bg-brand-red/10 text-brand-red rounded group-hover:scale-110 transition-transform">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-black text-white uppercase tracking-wider">SOC 2 Type II</div>
              <div className="text-[9px] text-gray-500 font-mono">Audited Controls</div>
            </div>
          </div>

          {/* GDPR Compliant Badge */}
          <div className="p-4 bg-white/[0.02] border border-white/10 rounded flex items-center gap-3 hover:border-[#00D2FF]/40 transition-colors group">
            <div className="p-2 bg-[#00D2FF]/10 text-[#00D2FF] rounded group-hover:scale-110 transition-transform">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-black text-white uppercase tracking-wider">GDPR Compliant</div>
              <div className="text-[9px] text-gray-500 font-mono">Data Sovereignty</div>
            </div>
          </div>

          {/* ISO 27001 Badge */}
          <div className="p-4 bg-white/[0.02] border border-white/10 rounded flex items-center gap-3 hover:border-green-500/40 transition-colors group">
            <div className="p-2 bg-green-500/10 text-green-400 rounded group-hover:scale-110 transition-transform">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-black text-white uppercase tracking-wider">ISO 27001</div>
              <div className="text-[9px] text-gray-500 font-mono">InfoSec Standard</div>
            </div>
          </div>

          {/* ORCID Academic Record Badge */}
          <a 
            id="cy-effective-orcid-url"
            href="https://orcid.org/0009-0003-0287-3454"
            target="orcid.widget"
            rel="me noopener noreferrer"
            className="p-4 bg-white/[0.02] border border-white/10 rounded flex items-center gap-3 hover:border-[#A6CE39]/40 transition-colors group"
          >
            <div className="p-2 bg-[#A6CE39]/10 text-[#A6CE39] rounded group-hover:scale-110 transition-transform">
              <img 
                src="https://orcid.org/sites/default/files/images/orcid_16x16.png" 
                alt="ORCID iD icon" 
                className="w-5 h-5 object-contain" 
              />
            </div>
            <div>
              <div className="text-xs font-black text-white uppercase tracking-wider">ORCID Verified</div>
              <div className="text-[9px] text-gray-500 font-mono">Academic Record</div>
            </div>
          </a>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-white/5 text-gray-500 text-xs flex flex-col md:flex-row justify-between items-center">
        <p>&copy; {new Date().getFullYear()} Glamourtech. All rights reserved.</p>
        <p className="mt-4 md:mt-0 italic">Precise. Authoritative. Technical.</p>
      </div>
    </footer>
  );
};

export default Footer;

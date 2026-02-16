
import React from 'react';
import { Link } from 'react-router-dom';

const Training: React.FC = () => {
  return (
    <div className="py-20 px-6 max-w-7xl mx-auto">
      <div className="mb-24 flex flex-col md:flex-row gap-12 items-end">
        <div className="flex-grow">
          <span className="text-brand-red font-bold tracking-[0.3em] uppercase text-sm mb-4 block">PREMIUM PROGRAMS</span>
          <h1 className="text-5xl md:text-7xl font-bold heading-font">Governance & <br />Training</h1>
        </div>
        <div className="max-w-md">
          <p className="text-gray-400 text-lg leading-relaxed">
            Transitioning your enterprise to AI requires more than code. It requires culture, policy, and skilled leadership.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="bg-white/5 border border-white/10 p-12 rounded-sm flex flex-col">
          <h2 className="text-3xl font-bold heading-font mb-6">Corporate AI Training</h2>
          <p className="text-gray-400 mb-10 flex-grow">
            Intensive programs for technical and non-technical staff to integrate AI agents into daily workflows securely.
          </p>
          <ul className="space-y-4 mb-10 text-gray-300">
            <li>• Workflow Redesign Workshops</li>
            <li>• Security & Prompt Engineering</li>
            <li>• Risk Mitigation Protocols</li>
          </ul>
          <Link to="/contact" className="w-full bg-brand-red text-white py-4 font-bold text-center uppercase tracking-widest">Inquire for Teams</Link>
        </div>

        <div className="bg-white/5 border border-white/10 p-12 rounded-sm flex flex-col">
          <h2 className="text-3xl font-bold heading-font mb-6">Executive Advisory</h2>
          <p className="text-gray-400 mb-10 flex-grow">
            One-on-one consulting for CEOs and CTOs to architect long-term AI roadmaps and IP strategies.
          </p>
          <ul className="space-y-4 mb-10 text-gray-300">
            <li>• Strategic IP Development</li>
            <li>• Vendor Stack Selection</li>
            <li>• Institutional Implementation</li>
          </ul>
          <Link to="/contact" className="w-full bg-white text-brand-black py-4 font-bold text-center uppercase tracking-widest">Book Strategy Session</Link>
        </div>
      </div>

      <div className="mt-32 border-t border-white/10 pt-20">
        <h2 className="text-4xl font-bold heading-font mb-12 text-center italic">"This is not YouTube education. This is enterprise logic."</h2>
        <div className="max-w-4xl mx-auto bg-brand-red/5 border border-brand-red/20 p-12 text-center">
           <p className="text-xl font-medium text-gray-300 leading-relaxed">
             Our training programs are designed for organizations that understand AI is a fundamental shift in business operations, not just another software tool. We focus on security, policy, and high-performance outcomes.
           </p>
        </div>
      </div>
    </div>
  );
};

export default Training;


import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const Legal: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const getContent = () => {
    switch (pathname) {
      case '/privacy':
        return {
          title: "Privacy Policy",
          subtitle: "Data Protection & Governance",
          content: (
            <div className="space-y-8">
              <section>
                <h3 className="text-xl font-bold text-brand-red mb-4 uppercase tracking-wider">1. Information Collection</h3>
                <p className="text-gray-400 leading-relaxed">Glamourtech collects minimal professional data required to perform systems audits and AI deployments. This includes name, work email, and company details provided via our strategy request forms.</p>
              </section>
              <section>
                <h3 className="text-xl font-bold text-brand-red mb-4 uppercase tracking-wider">2. Data Security</h3>
                <p className="text-gray-400 leading-relaxed">We utilize enterprise-grade encryption for all data transmissions. Your architectural insights and business data are protected behind multi-layer security protocols consistent with SOC2 standards.</p>
              </section>
              <section>
                <h3 className="text-xl font-bold text-brand-red mb-4 uppercase tracking-wider">3. Third-Party Logic</h3>
                <p className="text-gray-400 leading-relaxed">Data may be processed via our automation partners (Make.com, Calendly) solely for the purpose of service delivery. We never sell or trade institutional data to third-party advertisers.</p>
              </section>
            </div>
          )
        };
      case '/terms':
        return {
          title: "Terms of Service",
          subtitle: "Engagement Protocols",
          content: (
            <div className="space-y-8">
              <section>
                <h3 className="text-xl font-bold text-brand-red mb-4 uppercase tracking-wider">1. Advisory Scope</h3>
                <p className="text-gray-400 leading-relaxed">Glamourtech provides technical advisory and AI system deployment. All implementation is subject to a formal Statement of Work (SOW) which outlines specific deliverables and performance metrics.</p>
              </section>
              <section>
                <h3 className="text-xl font-bold text-brand-red mb-4 uppercase tracking-wider">2. Intellectual Property</h3>
                <p className="text-gray-400 leading-relaxed">Unless otherwise specified in a signed agreement, custom AI agents and proprietary automation logic developed during an engagement remain the property of the client upon full payment.</p>
              </section>
              <section>
                <h3 className="text-xl font-bold text-brand-red mb-4 uppercase tracking-wider">3. Professional Conduct</h3>
                <p className="text-gray-400 leading-relaxed">Our strategy sessions and audits are reserved for decision-makers. We reserve the right to decline service to organizations that do not meet our minimum infrastructure requirements.</p>
              </section>
            </div>
          )
        };
      case '/security':
        return {
          title: "Security Governance",
          subtitle: "Institutional Safeguards",
          content: (
            <div className="space-y-8">
              <section>
                <h3 className="text-xl font-bold text-brand-red mb-4 uppercase tracking-wider">1. Model Safety</h3>
                <p className="text-gray-400 leading-relaxed">Our AI deployments include strict red-teaming and prompt-injection safeguards. We ensure that your autonomous agents operate within defined ethical and operational boundaries.</p>
              </section>
              <section>
                <h3 className="text-xl font-bold text-brand-red mb-4 uppercase tracking-wider">2. Private Cloud Deployments</h3>
                <p className="text-gray-400 leading-relaxed">For enterprise clients requiring maximum isolation, we architect solutions that run on private VPCs, ensuring no data leakage into public LLM training sets.</p>
              </section>
              <section>
                <h3 className="text-xl font-bold text-brand-red mb-4 uppercase tracking-wider">3. Continuous Monitoring</h3>
                <p className="text-gray-400 leading-relaxed">Our systems utilize real-time logging and anomaly detection to identify and mitigate potential security threats before they impact your core operations.</p>
              </section>
            </div>
          )
        };
      default:
        return { title: "Legal", subtitle: "Glamourtech Governance", content: <p>Select a policy from the footer.</p> };
    }
  };

  const { title, subtitle, content } = getContent();

  return (
    <div className="min-h-screen bg-brand-black text-brand-white pt-32 pb-24 px-6">
      <div className="max-w-4xl mx-auto">
        <span className="text-brand-red font-black tracking-[0.6em] uppercase text-xs mb-6 block">{subtitle}</span>
        <h1 className="text-5xl md:text-7xl font-black heading-font uppercase tracking-tighter mb-16">{title}</h1>
        
        <div className="bg-white/5 border border-white/10 p-12 rounded-sm prose prose-invert max-w-none shadow-2xl">
          {content}
        </div>

        <div className="mt-20 pt-12 border-t border-white/10 text-center">
          <p className="text-gray-500 italic text-sm mb-8">Questions regarding our governance can be directed to legal@glamourtech.ai</p>
          <button 
            onClick={() => window.history.back()}
            className="text-brand-red font-bold uppercase tracking-widest text-xs hover:underline"
          >
            &larr; Return to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default Legal;


import React from 'react';

const industries = [
  {
    name: "Healthcare",
    description: "AI-driven patient triage, automated scheduling, and HIPAA-compliant data routing systems for hospitals and clinics.",
    icon: "🏥"
  },
  {
    name: "Finance",
    description: "Fraud detection, automated compliance reporting, and algorithmic risk assessment for modern financial institutions.",
    icon: "💰"
  },
  {
    name: "Education",
    description: "Scaleable tutoring systems and automated institutional administrative workflows for universities and LMS providers.",
    icon: "🎓"
  },
  {
    name: "Real Estate",
    description: "Automated lead follow-up, property matching agents, and document processing systems for high-volume brokerages.",
    icon: "🏢"
  },
  {
    name: "Professional Services",
    description: "Automating billable hours tracking, document drafting, and client onboarding for law firms and consultancies.",
    icon: "⚖️"
  }
];

const Industries: React.FC = () => {
  return (
    <div className="py-20 px-6 max-w-7xl mx-auto">
      <div className="text-center mb-24">
        <h1 className="text-5xl md:text-6xl font-bold heading-font mb-8">Tailored for Your <span className="text-brand-red">Vertical</span></h1>
        <p className="text-gray-400 max-w-2xl mx-auto text-xl font-medium">
          Context awareness is the difference between a prototype and a production-grade system.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {industries.map((ind, idx) => (
          <div key={idx} className="p-12 border border-white/10 bg-white/5 hover:bg-white/10 transition-all rounded-sm group">
            <div className="text-4xl mb-8 group-hover:scale-110 transition-transform inline-block">{ind.icon}</div>
            <h3 className="text-2xl font-bold heading-font mb-6">{ind.name}</h3>
            <p className="text-gray-400 leading-relaxed text-lg mb-8">{ind.description}</p>
            <div className="pt-6 border-t border-white/10">
              <span className="text-brand-red font-bold text-sm tracking-widest uppercase cursor-pointer hover:underline">View Case Study &rarr;</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Industries;

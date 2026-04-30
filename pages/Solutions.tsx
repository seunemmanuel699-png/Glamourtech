
import React from 'react';
import { Link } from 'react-router-dom';

const solutions = [
  {
    title: "AI Revenue Agents",
    problem: "Sales teams are overwhelmed by low-quality leads and slow follow-ups.",
    implementation: "Autonomous voice & text agents that qualify, schedule, and route leads 24/7.",
    outcome: "400% increase in lead response speed; 30% higher conversion rate.",
    idealClient: "Real Estate, Solar, High-ticket Consulting.",
  },
  {
    title: "CRM Orchestration & Logic",
    problem: "Data silos and manual entry slowing down internal operations.",
    implementation: "Deep integration with Salesforce, HubSpot, and Zoho to automate complex lifecycle tasks.",
    outcome: "Elimination of manual data entry; 100% data accuracy across systems.",
    idealClient: "SaaS, Enterprise Sales Teams, Logistics.",
  },
  {
    title: "Support Logic Automation",
    problem: "Internal support costs scaling linearly with customer growth.",
    implementation: "Custom-trained LLM agents with access to internal knowledge bases & APIs.",
    outcome: "90% resolution rate for tier-1 tickets without human intervention.",
    idealClient: "Finance, Healthcare Institutions, Consumer SaaS.",
  },
  {
    title: "Financial Risk & Reconciliation",
    problem: "Manual reconciliation and risk analysis causing delays and errors.",
    implementation: "Predictive analytics models that monitor transactions and detect fraud in real-time.",
    outcome: "Instant fraud detection and error-free financial reporting.",
    idealClient: "Banks, FinTechs, Insurance Providers.",
  },
  {
    title: "Security & AI Governance",
    problem: "Unregulated AI usage creating liability and data security risks.",
    implementation: "Enterprise-grade risk analytics, red teaming, and private cloud deployment frameworks.",
    outcome: "Full SOC2-ready compliance and reduced operational liability.",
    idealClient: "Legal Firms, Government Contractors, Healthcare.",
  }
];

const Solutions: React.FC = () => {
  return (
    <div className="py-20 px-6 max-w-7xl mx-auto">
      <div className="mb-20">
        <h1 className="text-5xl font-bold heading-font mb-6">Built for Enterprise Outcomes</h1>
        <p className="text-gray-400 max-w-2xl text-xl">
          We deliver high-performance logic that drives measurable revenue growth. Explore our core systems architecture.
        </p>
      </div>

      <div className="space-y-12">
        {solutions.map((s, idx) => (
          <div key={idx} className="grid grid-cols-1 lg:grid-cols-3 gap-12 p-12 bg-white/5 border border-white/10 rounded-sm hover:border-brand-red/30 transition-all">
            <div className="lg:col-span-1">
              <h2 className="text-3xl font-bold heading-font mb-4 text-brand-red">{s.title}</h2>
              <p className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-2">Ideal Client</p>
              <p className="text-white font-medium">{s.idealClient}</p>
            </div>
            <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-bold text-sm uppercase tracking-widest text-brand-red mb-3">The Problem</h4>
                <p className="text-gray-300 mb-6 leading-relaxed">{s.problem}</p>
              </div>
              <div>
                <h4 className="font-bold text-sm uppercase tracking-widest text-brand-red mb-3">Implementation</h4>
                <p className="text-gray-300 mb-6 leading-relaxed">{s.implementation}</p>
              </div>
              <div className="md:col-span-2 bg-brand-red/10 p-6 border-l-4 border-brand-red">
                <h4 className="font-bold text-sm uppercase tracking-widest text-brand-red mb-3">Expected Outcome</h4>
                <p className="text-white font-bold text-lg">{s.outcome}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-32 text-center bg-brand-red p-20">
        <h2 className="text-3xl font-bold heading-font mb-8 uppercase tracking-tighter">Need a Custom Architecture?</h2>
        <Link to="/contact" className="bg-brand-black text-white px-10 py-5 font-bold uppercase tracking-widest hover:bg-white hover:text-brand-black transition-all">
          Book a Strategy Call
        </Link>
      </div>
    </div>
  );
};

export default Solutions;

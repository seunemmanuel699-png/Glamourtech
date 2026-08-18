import React, { useState } from "react";
import { Link } from "react-router-dom";
import { RoiCalculator } from "../components/RoiCalculator";

const faqs = [
  {
    question: "How do you ensure data security and compliance?",
    answer:
      "Our systems are built with enterprise-grade security protocols. We deploy on private cloud instances, ensure SOC2 readiness, and use encrypted data pipelines. We never use your proprietary data to train public models.",
  },
  {
    question: "Can your AI solutions integrate with our existing legacy systems?",
    answer:
      "Yes. Our architecture is designed for seamless integration. We build custom API layers and middleware to connect with legacy CRMs, ERPs, and internal databases without disrupting your current workflows.",
  },
  {
    question: "What is the typical deployment timeline for an enterprise AI agent?",
    answer:
      "Deployment timelines vary based on complexity, but a standard enterprise integration typically ranges from 4 to 8 weeks. This includes initial auditing, custom model training, security testing, and final deployment.",
  },
  {
    question: "How do you handle AI hallucinations and accuracy?",
    answer:
      "We implement strict semantic guardrails, RAG (Retrieval-Augmented Generation) architectures grounded purely in your company data, and human-in-the-loop fallback mechanisms to ensure operational accuracy and mitigate risks.",
  },
];

const FaqAccordion: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-4">
      {faqs.map((faq, index) => (
        <div
          key={index}
          className="border border-white/10 bg-white/5 rounded-sm overflow-hidden"
        >
          <button
            onClick={() => toggle(index)}
            className="w-full px-6 py-4 flex items-center justify-between text-left focus:outline-none hover:bg-white/[0.02] transition-colors"
          >
            <span className="font-bold text-white text-lg pr-4">{faq.question}</span>
            <span className="text-[#00D2FF] text-3xl font-light leading-none">
              {openIndex === index ? "−" : "+"}
            </span>
          </button>
          <div
            className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${
              openIndex === index ? "max-h-64 pb-6 opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <p className="text-gray-400 leading-relaxed">{faq.answer}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

const solutions = [
  {
    title: "AI Revenue Agents",
    problem:
      "Sales teams are overwhelmed by low-quality leads and slow follow-ups.",
    implementation:
      "Autonomous voice & text agents that qualify, schedule, and route leads 24/7.",
    outcome:
      "400% increase in lead response speed; 30% higher conversion rate.",
    idealClient: "Real Estate, Solar, High-ticket Consulting.",
  },
  {
    title: "CRM Orchestration & Logic",
    problem: "Data silos and manual entry slowing down internal operations.",
    implementation:
      "Deep integration with Salesforce, HubSpot, and Zoho to automate complex lifecycle tasks.",
    outcome:
      "Elimination of manual data entry; 100% data accuracy across systems.",
    idealClient: "SaaS, Enterprise Sales Teams, Logistics.",
  },
  {
    title: "Support Logic Automation",
    problem: "Internal support costs scaling linearly with customer growth.",
    implementation:
      "Custom-trained LLM agents with access to internal knowledge bases & APIs.",
    outcome:
      "90% resolution rate for tier-1 tickets without human intervention.",
    idealClient: "Finance, Healthcare Institutions, Consumer SaaS.",
  },
  {
    title: "Financial Risk & Reconciliation",
    problem:
      "Manual reconciliation and risk analysis causing delays and errors.",
    implementation:
      "Predictive analytics models that monitor transactions and detect fraud in real-time.",
    outcome: "Instant fraud detection and error-free financial reporting.",
    idealClient: "Banks, FinTechs, Insurance Providers.",
  },
  {
    title: "Security & AI Governance",
    problem: "Unregulated AI usage creating liability and data security risks.",
    implementation:
      "Enterprise-grade risk analytics, red teaming, and private cloud deployment frameworks.",
    outcome: "Full SOC2-ready compliance and reduced operational liability.",
    idealClient: "Legal Firms, Government Contractors, Healthcare.",
  },
];

const Solutions: React.FC = () => {
  return (
    <div className="py-12 md:py-20 px-6 max-w-7xl mx-auto">
      <div className="mb-20">
        <h1 className="text-5xl font-bold heading-font mb-6">
          Built for Enterprise Outcomes
        </h1>
        <p className="text-gray-400 max-w-2xl text-xl">
          We deliver high-performance logic that drives measurable revenue
          growth. Explore our core systems architecture.
        </p>
      </div>

      <div className="space-y-12">
        {solutions.map((s, idx) => (
          <div
            key={idx}
            className="grid grid-cols-1 lg:grid-cols-3 gap-12 p-12 bg-white/5 border border-white/10 rounded-sm hover:border-brand-red/30 transition-all"
          >
            <div className="lg:col-span-1">
              <h2 className="text-3xl font-bold heading-font mb-4 text-brand-red">
                {s.title}
              </h2>
              <p className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-2">
                Ideal Client
              </p>
              <p className="text-white font-medium">{s.idealClient}</p>
            </div>
            <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-bold text-sm uppercase tracking-widest text-brand-red mb-3">
                  The Problem
                </h4>
                <p className="text-gray-300 mb-6 leading-relaxed">
                  {s.problem}
                </p>
              </div>
              <div>
                <h4 className="font-bold text-sm uppercase tracking-widest text-brand-red mb-3">
                  Implementation
                </h4>
                <p className="text-gray-300 mb-6 leading-relaxed">
                  {s.implementation}
                </p>
              </div>
              <div className="md:col-span-2 bg-brand-red/10 p-6 border-l-4 border-brand-red">
                <h4 className="font-bold text-sm uppercase tracking-widest text-brand-red mb-3">
                  Expected Outcome
                </h4>
                <p className="text-white font-bold text-lg">{s.outcome}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Enterprise ROI Calculator Section */}
      <div className="mt-32 border-t border-white/5 pt-24">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00D2FF]/10 border border-[#00D2FF]/20 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00D2FF]"></span>
            <span className="text-[10px] font-black tracking-widest text-[#00D2FF] uppercase">
              Interactive B2B Simulation
            </span>
          </div>
          <h2 className="text-4xl font-black heading-font text-white uppercase tracking-tight mb-4">
            Quantify Your{" "}
            <span className="text-[#00D2FF]">Efficiency Gains</span>
          </h2>
          <p className="text-gray-400 text-lg leading-relaxed">
            See exactly how automating workflows and operations translates to
            direct hours reallocated, overhead eliminated, and revenue unlocked.
          </p>
        </div>

        <RoiCalculator />
      </div>

      {/* Enterprise Security & Integration FAQ */}
      <div className="mt-32 border-t border-white/5 pt-24">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-4xl font-black heading-font text-white uppercase tracking-tight mb-4">
            Security & Integration <span className="text-[#00D2FF]">FAQ</span>
          </h2>
          <p className="text-gray-400 text-lg leading-relaxed">
            Addressing common concerns regarding enterprise compliance, legacy system deployment, and data security.
          </p>
        </div>
        <FaqAccordion />
      </div>

      <div className="mt-32 text-center bg-gradient-to-r from-[#070D19] to-[#0A162B] border border-white/10 p-12 md:p-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[#00D2FF]/5 pointer-events-none"></div>
        <h2 className="text-3xl font-bold heading-font mb-8 uppercase tracking-tight text-white">
          Need a Custom Architecture?
        </h2>
        <p className="text-gray-400 max-w-xl mx-auto mb-10 text-sm">
          Every enterprise has unique operational pipelines. Let's design a
          customized autonomous agent system built specifically for your
          business operations and compliance requirements.
        </p>
        <Link
          to="/contact"
          className="inline-block bg-gradient-to-r from-[#0066FF] to-[#00D2FF] hover:from-[#00D2FF] hover:to-[#0066FF] text-[#070D19] px-10 py-5 font-black uppercase tracking-widest transition-all duration-300 rounded-sm shadow-lg shadow-[#00D2FF]/15 active:scale-95"
        >
          Book a Strategy Call
        </Link>
      </div>
    </div>
  );
};

export default Solutions;

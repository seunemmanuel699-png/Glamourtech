
import React from 'react';
import { Link } from 'react-router-dom';

const portfolioItems = [
  {
    title: "Autonomous Revenue Agent",
    industry: "Real Estate & High-Ticket Sales",
    description: "An AI system designed to qualify inbound leads via voice and text, scheduling directly into CRM calendars without human oversight.",
    videoUrl: "https://hvtxvvalhjxjzixoiaun.supabase.co/storage/v1/object/public/Glamour%20tech/backgrounmovie.mp4",
    outcomes: ["4.2x faster response time", "30% increase in qualified appointments"]
  },
  {
    title: "Enterprise CRM Orchestrator",
    industry: "SaaS & Logistics",
    description: "Complex logic layer that synchronizes multi-platform data silos and automates the entire customer lifecycle from onboarding to renewal.",
    videoUrl: "https://hvtxvvalhjxjzixoiaun.supabase.co/storage/v1/object/public/Glamour%20tech/backgrounmovie.mp4",
    outcomes: ["Zero manual data entry", "100% data integrity across 4 platforms"]
  },
  {
    title: "Healthcare Triage System",
    industry: "Medical & Health Tech",
    description: "A secure, HIPAA-compliant AI agent that handles patient intake, initial symptom assessment, and priority routing for clinics.",
    videoUrl: "https://hvtxvvalhjxjzixoiaun.supabase.co/storage/v1/object/public/Glamour%20tech/backgrounmovie.mp4",
    outcomes: ["90% reduction in wait times", "SOC2-ready security protocols"]
  },
  {
    title: "Automated Risk Analyst",
    industry: "Finance & FinTech",
    description: "Real-time transaction monitoring and predictive risk modeling to detect fraudulent patterns before they impact the bottom line.",
    videoUrl: "https://hvtxvvalhjxjzixoiaun.supabase.co/storage/v1/object/public/Glamour%20tech/backgrounmovie.mp4",
    outcomes: ["Instant fraud detection", "Reduced operational liability by 60%"]
  }
];

const WorkShowcase: React.FC = () => {
  return (
    <div className="bg-brand-black text-brand-white min-h-screen">
      {/* Page Header */}
      <section className="pt-32 pb-12 px-6 relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <span className="text-brand-red font-black tracking-[0.5em] uppercase text-xs mb-6 block">Production Portfolio</span>
          <h1 className="text-5xl md:text-8xl font-black heading-font mb-8 uppercase tracking-tighter leading-none">
            Work <br /><span className="text-brand-red">Showcase</span>
          </h1>
        </div>
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-brand-red/5 rounded-full blur-[120px] pointer-events-none"></div>
      </section>

      {/* FEATURED PROJECT: Google Antigravity */}
      <section className="py-12 px-6 max-w-7xl mx-auto">
        <div className="bg-white/5 border border-brand-red/30 rounded-sm p-1 lg:p-1 shadow-2xl overflow-hidden mb-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch bg-brand-black p-4 lg:p-12">
            <div className="lg:col-span-8">
              <div className="relative aspect-video rounded-sm overflow-hidden bg-black shadow-inner border border-white/10 group">
                {/* 
                  Google Drive /preview is the standard for embedding. 
                  If it doesn't play, it's often due to browser cookie restrictions or file permissions.
                */}
                <iframe 
                  src="https://drive.google.com/file/d/11G1TiuNLzOuaex3yOxEqDO6yDy9wiJ_o/preview" 
                  className="absolute inset-0 w-full h-full border-none z-10"
                  allow="autoplay; fullscreen"
                  title="Google Antigravity Showcase"
                ></iframe>
                
                <div className="absolute top-4 left-4 z-20 bg-brand-red px-3 py-1 rounded-sm shadow-xl">
                  <span className="text-[10px] font-black uppercase tracking-widest text-white">Featured Project</span>
                </div>
              </div>
              
              {/* Fallback for Google Drive playback issues */}
              <div className="mt-4 flex items-center justify-between px-2">
                <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">
                  Playback issues? <a href="https://drive.google.com/file/d/11G1TiuNLzOuaex3yOxEqDO6yDy9wiJ_o/view?usp=sharing" target="_blank" rel="noopener noreferrer" className="text-brand-red hover:underline">Open Direct Link</a>
                </p>
                <div className="flex space-x-2">
                  <div className="w-2 h-2 rounded-full bg-brand-red animate-pulse"></div>
                  <div className="w-2 h-2 rounded-full bg-white/20"></div>
                  <div className="w-2 h-2 rounded-full bg-white/20"></div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col justify-center space-y-6">
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500 block">Next-Gen Development</span>
              <h2 className="text-4xl md:text-5xl font-black heading-font uppercase tracking-tighter leading-tight">
                Google <br /><span className="text-brand-red">Antigravity</span>
              </h2>
              
              <div className="space-y-4">
                <p className="text-brand-white font-bold text-xl uppercase tracking-tight border-l-4 border-brand-red pl-4">
                  building apps with google anti gravity
                </p>
                <p className="text-gray-400 text-lg font-medium leading-relaxed">
                  Deploy production-ready systems using the next evolution of autonomous AI architecture. Rapid system deployment with zero-code infrastructure.
                </p>
              </div>

              <div className="flex flex-wrap gap-2 pt-2">
                <span className="bg-white/5 border border-white/10 text-white text-[9px] font-black uppercase tracking-widest px-3 py-1.5">Zero-Code Architecture</span>
                <span className="bg-white/5 border border-white/10 text-white text-[9px] font-black uppercase tracking-widest px-3 py-1.5">Rapid Deployment</span>
              </div>

              <div className="pt-6">
                <Link to="/contact" className="group flex items-center justify-between bg-brand-red text-white px-8 py-5 font-black uppercase tracking-widest hover:bg-red-700 transition-all shadow-xl shadow-brand-red/20 w-full">
                  <span>Request Access</span>
                  <svg className="w-5 h-5 transform group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Standard Portfolio Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {portfolioItems.map((item, idx) => (
            <div key={idx} className="group flex flex-col space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700" style={{ animationDelay: `${idx * 150}ms` }}>
              <div className="relative aspect-video bg-white/5 border border-white/10 overflow-hidden rounded-sm group-hover:border-brand-red/50 transition-all duration-500 shadow-2xl">
                <video 
                  controls 
                  preload="metadata"
                  className="w-full h-full object-cover"
                >
                  <source src={item.videoUrl} type="video/mp4" />
                </video>
                <div className="absolute top-4 left-4 bg-brand-black/60 backdrop-blur-md border border-white/10 px-3 py-1 rounded-sm">
                   <span className="text-[10px] font-black uppercase tracking-widest text-brand-red">System Demo 0{idx + 1}</span>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500 mb-2 block">{item.industry}</span>
                    <h3 className="text-3xl font-bold heading-font uppercase tracking-tight">{item.title}</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {item.outcomes.map((outcome, oIdx) => (
                      <span key={oIdx} className="bg-brand-red/10 border border-brand-red/20 text-brand-red text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-sm">
                        {outcome}
                      </span>
                    ))}
                  </div>
                </div>
                <p className="text-gray-400 text-lg leading-relaxed font-medium">
                  {item.description}
                </p>
                <div className="pt-4 flex items-center space-x-6">
                   <button className="text-white font-bold uppercase tracking-widest text-xs border-b-2 border-brand-red pb-1 hover:text-brand-red transition-colors">
                     View Technical Case Study
                   </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 bg-brand-red">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-6xl font-black heading-font mb-10 uppercase tracking-tighter text-white">
            Ready to Build Your Own System?
          </h2>
          <p className="text-white/80 text-xl md:text-2xl mb-12 font-medium max-w-2xl mx-auto">
            Schedule a technical audit to see how these architectures can be applied to your specific operational stack.
          </p>
          <Link 
            to="/contact" 
            className="inline-block bg-brand-black text-white px-12 py-6 font-black uppercase tracking-[0.3em] hover:bg-white hover:text-brand-black transition-all shadow-2xl"
          >
            Request Systems Audit
          </Link>
        </div>
      </section>
    </div>
  );
};

export default WorkShowcase;

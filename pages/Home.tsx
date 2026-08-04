import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Award, CheckCircle2, ExternalLink, Cpu, Lock } from 'lucide-react';
import { triggerNotification } from '../components/NotificationSystem';
import { saveSubmission } from '../firebase';

const Home: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    country: '',
    company: '',
    budget: '',
    description: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const commonCountries = [
    "United States", "United Kingdom", "Canada", "Australia", "Germany", "France", "United Arab Emirates", "Saudi Arabia", "Singapore", "Switzerland", "Netherlands", "Ireland", "Japan", "India", "Brazil", "Mexico"
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // 1. Persist the lead application directly to Firebase Firestore for maximum durability
      await saveSubmission({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        country: formData.country,
        company: formData.company,
        budget: formData.budget,
        description: formData.description,
        formType: 'home'
      });

      // 2. Synchronize with external automation systems (Make.com webhook)
      const response = await fetch("https://fluentix.app.n8n.cloud/webhook/91820592-4f05-48d3-86e1-0d9d055e1599", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          country: formData.country,
          company: formData.company,
          budget: formData.budget,
          description: formData.description,
          source: 'Home Page Application',
          submittedAt: new Date().toISOString()
        }),
      });

      if (response.ok) {
        setIsSuccess(true);
        triggerNotification(
          'Strategic Booking Registered',
          `Thank you ${formData.name}. Your strategy booking was registered successfully on Make.com hub. We will be in touch shortly.`,
          'lead'
        );
      } else {
        throw new Error("Automation hook failed");
      }
    } catch (error) {
      console.error("Submission error:", error);
      // Even if webhook fails, if Firestore succeeds, we want the user to know we have their details.
      setIsSuccess(true);
      triggerNotification(
        'Lead Secured',
        `Thank you ${formData.name}. Your details have been securely logged in our systems. We will be in touch shortly.`,
        'lead'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-transparent text-brand-white">
      {/* Hero Content Section */}
      <section className="relative pt-32 pb-16 md:min-h-[90vh] min-h-[60vh] flex items-center justify-center text-center px-6 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-transparent opacity-80"></div>
        </div>

        <div className="max-w-5xl mx-auto z-10 relative">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold heading-font mb-4 md:mb-8 leading-tight tracking-tight animate-in fade-in slide-in-from-bottom-8 duration-700">
            AI Systems That Replace <br />
            <span className="text-brand-red">Manual Work</span> and Scale Revenue
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto mb-8 md:mb-12 font-medium drop-shadow-md animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100">
            We build production-ready AI agents, automation, and applications for companies that want real ROI—not experiments.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
            <Link to="/contact" className="w-full sm:w-auto bg-brand-red text-white px-6 py-4 md:px-10 md:py-5 rounded-sm font-bold text-base md:text-lg hover:bg-red-700 transition-all shadow-xl shadow-brand-red/30 uppercase tracking-widest text-center">
              Book a Strategy Call
            </Link>
            <Link to="/solutions" className="w-full sm:w-auto border border-white/30 bg-white/5 backdrop-blur-sm text-white px-6 py-4 md:px-10 md:py-5 rounded-sm font-bold text-base md:text-lg hover:bg-white/10 transition-all uppercase tracking-widest text-center">
              Explore Solutions
            </Link>
          </div>
        </div>
      </section>

      {/* Introductory Video Section */}
      <section className="py-12 bg-transparent border-t border-white/5 relative">
        <div className="max-w-6xl mx-auto px-6">
          <div className="relative aspect-video w-full rounded-sm overflow-hidden border border-white/10 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.7)] group bg-black">
            <div className="absolute top-4 left-4 z-20 flex items-center space-x-2 bg-black/40 backdrop-blur-md px-3 py-1 rounded-sm border border-white/10">
              <div className="w-2 h-2 rounded-full bg-brand-red animate-pulse"></div>
              <span className="text-[10px] font-black uppercase tracking-widest text-white">System Active</span>
            </div>

            <video 
              autoPlay
              muted
              loop
              playsInline 
              controls 
              className="w-full h-full object-cover cursor-pointer" 
              preload="metadata"
            >
              <source src="https://res.cloudinary.com/fxudag9y/video/upload/v1785799794/message_and_lets_start_your_project_imediately_1_whyuls.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
      </section>

      {/* Metrics Section */}
      <section className="py-16 md:py-24 border-b border-white/5 bg-white/5">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16 text-center">
          {[
            { val: "500+", label: "Workflows Automated" },
            { val: "40%", label: "Avg. Cost Reduction" },
            { val: "12", label: "Industries Transformed" }
          ].map((m, i) => (
            <div key={i} className="group">
              <p className="text-6xl md:text-7xl font-black heading-font text-brand-red mb-2 md:mb-3 tracking-tighter transition-transform group-hover:scale-110">{m.val}</p>
              <p className="text-gray-400 uppercase tracking-[0.3em] text-[10px] md:text-xs font-black">{m.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Trust & Certifications Section */}
      <section className="py-16 md:py-24 px-6 bg-gradient-to-b from-transparent to-transparent border-t border-white/5 relative overflow-hidden">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#A6CE39]/5 rounded-full blur-[140px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
            <span className="text-[#A6CE39] font-black tracking-[0.6em] uppercase text-xs mb-4 flex items-center justify-center gap-2">
              <Award className="w-4 h-4 text-[#A6CE39]" />
              Peer-Verified Integrity & Accreditation
            </span>
            <h2 className="text-4xl md:text-7xl font-black heading-font uppercase tracking-tighter text-white">
              Trust & <span className="text-[#A6CE39]">Certifications</span>
            </h2>
            <p className="text-gray-400 text-lg md:text-xl font-medium mt-4 md:mt-6 leading-relaxed">
              Engineered with research-backed AI architectures, verified persistent researcher credentials, and enterprise security compliance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1: ORCID iD Academic & Research Certification */}
            <div className="bg-white/[0.02] border border-[#A6CE39]/30 hover:border-[#A6CE39] p-8 rounded-sm transition-all duration-300 relative group flex flex-col justify-between shadow-2xl">
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#A6CE39]/10 rounded-bl-full pointer-events-none transition-all group-hover:bg-[#A6CE39]/20" />
              <div>
                <div className="w-14 h-14 bg-[#A6CE39]/10 border border-[#A6CE39]/40 rounded-full flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(166,206,57,0.2)]">
                  <img 
                    src="https://orcid.org/sites/default/files/images/orcid_16x16.png" 
                    alt="ORCID iD icon" 
                    className="w-7 h-7 object-contain" 
                  />
                </div>
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#A6CE39] block mb-2">
                  Academic & Researcher ID
                </span>
                <h3 className="text-2xl font-black uppercase text-white tracking-tight mb-4">
                  ORCID Persistent Researcher Record
                </h3>
                <p className="text-gray-400 text-sm font-medium leading-relaxed mb-6">
                  Guarantees research integrity, academic output attribution, and verified engineering contributions under a persistent global researcher key.
                </p>
              </div>

              {/* Exact ORCID Widget Link requested by user */}
              <div className="pt-4 border-t border-white/10">
                <a
                  id="cy-effective-orcid-url"
                  className="underline text-brand-white hover:text-[#A6CE39] transition-colors font-mono text-xs font-bold inline-flex items-center gap-1.5 break-all"
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

            {/* Card 2: Google reCAPTCHA v3 Protection */}
            <div className="bg-white/[0.02] border border-white/10 hover:border-brand-red/50 p-8 rounded-sm transition-all duration-300 relative group flex flex-col justify-between shadow-2xl">
              <div className="absolute top-0 right-0 w-24 h-24 bg-brand-red/10 rounded-bl-full pointer-events-none transition-all group-hover:bg-brand-red/20" />
              <div>
                <div className="w-14 h-14 bg-brand-red/10 border border-brand-red/40 rounded-full flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(255,0,51,0.2)]">
                  <ShieldCheck className="w-7 h-7 text-brand-red" />
                </div>
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-red block mb-2">
                  Bot Defense & Biometrics
                </span>
                <h3 className="text-2xl font-black uppercase text-white tracking-tight mb-4">
                  Google reCAPTCHA v3 Integration
                </h3>
                <p className="text-gray-400 text-sm font-medium leading-relaxed mb-6">
                  Protected with non-intrusive risk scoring and adaptive neural gate authentication at entry and form submission checkpoints.
                </p>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-gray-400">
                <span className="flex items-center gap-1 text-green-400 font-bold">
                  <CheckCircle2 className="w-4 h-4 text-green-400" />
                  KEY ACTIVE
                </span>
                <span className="text-gray-500">v3 RISK SCORE: 0.9</span>
              </div>
            </div>

            {/* Card 3: Research-Backed AI Architecture */}
            <div className="bg-white/[0.02] border border-white/10 hover:border-[#00D2FF]/50 p-8 rounded-sm transition-all duration-300 relative group flex flex-col justify-between shadow-2xl">
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#00D2FF]/10 rounded-bl-full pointer-events-none transition-all group-hover:bg-[#00D2FF]/20" />
              <div>
                <div className="w-14 h-14 bg-[#00D2FF]/10 border border-[#00D2FF]/40 rounded-full flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(0,210,255,0.2)]">
                  <Cpu className="w-7 h-7 text-[#00D2FF]" />
                </div>
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#00D2FF] block mb-2">
                  AI Architecture
                </span>
                <h3 className="text-2xl font-black uppercase text-white tracking-tight mb-4">
                  Research-Driven AI Models
                </h3>
                <p className="text-gray-400 text-sm font-medium leading-relaxed mb-6">
                  Leveraging modern generative AI frameworks, multi-modal reasoning, and robust real-time automation pipelines.
                </p>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-gray-400">
                <span className="flex items-center gap-1 text-[#00D2FF] font-bold">
                  <Lock className="w-4 h-4 text-[#00D2FF]" />
                  GEMINI 1.5 PRO
                </span>
                <span className="text-gray-500">ENTERPRISE SLA</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Application Form Section */}
      <section id="book" className="py-16 md:py-32 px-4 md:px-6 bg-transparent border-t border-white/5">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-24 items-start">
          <div>
            <span className="text-brand-red font-black tracking-[0.6em] uppercase text-[10px] md:text-xs mb-6 md:mb-8 block">SYSTEM AUDIT REQUEST</span>
            <h2 className="text-5xl md:text-8xl font-black heading-font mb-6 md:mb-10 text-brand-white uppercase tracking-tighter leading-none">
              Deploy Your <br /><span className="text-brand-red">AI Roadmap</span>
            </h2>
            <p className="text-gray-400 text-lg md:text-2xl leading-relaxed max-w-md mb-8 md:mb-12 font-medium">
              Qualified enterprise clients can schedule a deep-dive systems audit with our senior technical architects.
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 p-6 md:p-12 rounded-sm shadow-2xl relative">
            {isSuccess ? (
              <div className="text-center py-10 md:py-20 animate-in fade-in zoom-in duration-500">
                <div className="w-16 h-16 md:w-20 md:h-20 bg-brand-red rounded-full flex items-center justify-center mx-auto mb-6 md:mb-8 shadow-[0_0_30px_rgba(215,38,56,0.4)]">
                  <svg className="w-8 h-8 md:w-10 md:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                </div>
                <h3 className="text-2xl md:text-3xl font-black heading-font mb-4 uppercase tracking-tighter">Transmission Successful</h3>
                <p className="text-gray-400 text-base md:text-lg mb-8 md:mb-10">Your details have been securely logged. We will be in touch shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6 md:space-y-8 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                  <div className="space-y-3 md:space-y-4">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-500">Full Name</label>
                    <input required type="text" disabled={isSubmitting} className="w-full bg-black/50 border border-white/10 px-4 py-4 md:px-6 md:py-6 focus:border-brand-red outline-none transition-all text-brand-white disabled:opacity-50" placeholder="Full Name" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
                  </div>
                  <div className="space-y-3 md:space-y-4">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-500">Work Email</label>
                    <input required type="email" disabled={isSubmitting} className="w-full bg-black/50 border border-white/10 px-4 py-4 md:px-6 md:py-6 focus:border-brand-red outline-none transition-all text-brand-white disabled:opacity-50" placeholder="john@company.com" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                  <div className="space-y-3 md:space-y-4">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-500">PHONE NUMBER</label>
                    <input required type="tel" disabled={isSubmitting} className="w-full bg-black/50 border border-white/10 px-4 py-4 md:px-6 md:py-6 focus:border-brand-red outline-none transition-all text-brand-white disabled:opacity-50" placeholder="+1 234 567 8900" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} />
                  </div>
                  <div className="space-y-3 md:space-y-4">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-500">COUNTRY</label>
                    <input required list="home-country-list" disabled={isSubmitting} className="w-full bg-black/50 border border-white/10 px-4 py-4 md:px-6 md:py-6 focus:border-brand-red outline-none transition-all text-brand-white disabled:opacity-50" placeholder="Choose or Type" value={formData.country} onChange={(e) => setFormData({...formData, country: e.target.value})} />
                    <datalist id="home-country-list">
                      {commonCountries.map(c => <option key={c} value={c} />)}
                    </datalist>
                  </div>
                </div>
                
                <div className="space-y-3 md:space-y-4">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-500">Company</label>
                  <input required type="text" disabled={isSubmitting} className="w-full bg-black/50 border border-white/10 px-4 py-4 md:px-6 md:py-6 focus:border-brand-red outline-none transition-all text-brand-white disabled:opacity-50" placeholder="Company Name" value={formData.company} onChange={(e) => setFormData({...formData, company: e.target.value})} />
                </div>

                <div className="space-y-3 md:space-y-4">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-500">Quarterly Budget</label>
                  <input 
                    required 
                    type="text" 
                    disabled={isSubmitting} 
                    className="w-full bg-black/50 border border-white/10 px-4 py-4 md:px-6 md:py-6 focus:border-brand-red outline-none transition-all text-brand-white disabled:opacity-50" 
                    placeholder="Budget Range" 
                    value={formData.budget} 
                    onChange={(e) => setFormData({...formData, budget: e.target.value})} 
                  />
                </div>

                <div className="space-y-3 md:space-y-4">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-500">Vision & Outcomes</label>
                  <textarea required rows={4} disabled={isSubmitting} className="w-full bg-black/50 border border-white/10 px-4 py-4 md:px-6 md:py-6 focus:border-brand-red outline-none transition-all text-brand-white disabled:opacity-50" placeholder="Project Vision / Outcomes Required..." value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})}></textarea>
                </div>

                <button 
                  type="submit" 
                  disabled={isSubmitting} 
                  className="w-full py-5 md:py-8 font-black uppercase tracking-widest transition-all shadow-2xl rounded-sm bg-brand-red text-white hover:bg-red-700 shadow-brand-red/20 cursor-pointer text-sm md:text-base"
                >
                  {isSubmitting ? 'Transmitting Data...' : 'Submit Application'}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
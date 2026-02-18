import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

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

  const welcomeVideoRef = useRef<HTMLVideoElement>(null);

  const founderImages = [
    "https://hvtxvvalhjxjzixoiaun.supabase.co/storage/v1/object/public/my%20pictures/Whisk_aznmddo5etymrdmm1cnlfwotqmyzqtl3ktoz0sz.png",
    "https://hvtxvvalhjxjzixoiaun.supabase.co/storage/v1/object/public/my%20pictures/Whisk_gty5immijtyjhdzw0so0ktytqjzzqtlxktzk1so.png",
    "https://hvtxvvalhjxjzixoiaun.supabase.co/storage/v1/object/public/my%20pictures/Whisk_mdm1mtzmdtmmbtmy0co0ktytignlrtlxm2m20co.png",
    "https://hvtxvvalhjxjzixoiaun.supabase.co/storage/v1/object/public/my%20pictures/Whisk_mmmlrmmmnwz1ktn00yn0ytotitm2qtlzimn50iz.png",
    "https://hvtxvvalhjxjzixoiaun.supabase.co/storage/v1/object/public/my%20pictures/Whisk_q2yhrmz1egzyqznm1iyizmytqtn1qtl2kdn20sm.png",
    "https://hvtxvvalhjxjzixoiaun.supabase.co/storage/v1/object/public/my%20pictures/Whisk_qgojv2mygtnkftom1cz3igotktnwqtlwqwy20ym.png",
    "https://hvtxvvalhjxjzixoiaun.supabase.co/storage/v1/object/public/my%20pictures/Whisk_uzm4qznyumy3u2m10izhvdotudzkrtl5ktzz0in.png",
    "https://hvtxvvalhjxjzixoiaun.supabase.co/storage/v1/object/public/my%20pictures/Whisk_ywomvtmlvdm2qjz20im3mwytuzy2qtl4cdn30yn.png"
  ];

  const commonCountries = [
    "United States", "United Kingdom", "Canada", "Australia", "Germany", "France", "United Arab Emirates", "Saudi Arabia", "Singapore", "Switzerland", "Netherlands", "Ireland", "Japan", "India", "Brazil", "Mexico"
  ];

  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    // Attempt to unmute when user interacts with the page (required by browsers)
    const handleInteraction = () => {
      if (welcomeVideoRef.current) {
        welcomeVideoRef.current.muted = false;
        welcomeVideoRef.current.play().catch(() => {});
      }
    };

    window.addEventListener('click', handleInteraction, { once: true });
    window.addEventListener('scroll', handleInteraction, { once: true });

    if (welcomeVideoRef.current) {
      // Start muted to ensure it plays immediately without being blocked
      welcomeVideoRef.current.muted = true;
      welcomeVideoRef.current.play().catch(() => {
        console.log("Autoplay prevented, waiting for interaction.");
      });
    }

    return () => {
      window.removeEventListener('click', handleInteraction);
      window.removeEventListener('scroll', handleInteraction);
    };
  }, []);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const timer = setInterval(() => {
      setCurrentPhotoIndex((prev) => (prev + 1) % founderImages.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [founderImages.length, isAutoPlaying]);

  const nextPhoto = () => {
    setIsAutoPlaying(false);
    setCurrentPhotoIndex((prev) => (prev + 1) % founderImages.length);
  };

  const prevPhoto = () => {
    setIsAutoPlaying(false);
    setCurrentPhotoIndex((prev) => (prev === 0 ? founderImages.length - 1 : prev - 1));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("https://hook.us2.make.com/isg8hz89dc1yp9fkyxad68gy2g85yl4u", {
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
        window.location.href = "https://calendly.com/glamourtech/new-meeting";
      } else {
        throw new Error("Submission failed");
      }
    } catch (error) {
      console.error("Submission error:", error);
      alert("There was an error submitting your application. Please try again or contact support@glamourtech.ai");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-brand-black text-brand-white">
      {/* Hero Content Section */}
      <section className="relative pt-24 pb-16 flex flex-col items-center text-center px-6 overflow-hidden min-h-[90vh] flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <video 
            autoPlay 
            loop 
            muted 
            playsInline 
            className="w-full h-full object-cover opacity-40"
          >
            <source src="https://hvtxvvalhjxjzixoiaun.supabase.co/storage/v1/object/public/Glamour%20tech/backgrounmovie.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-brand-black via-transparent to-brand-black opacity-80"></div>
        </div>

        <div className="max-w-5xl mx-auto z-10 relative">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold heading-font mb-8 leading-tight tracking-tight animate-in fade-in slide-in-from-bottom-8 duration-700">
            AI Systems That Replace <br />
            <span className="text-brand-red">Manual Work</span> and Scale Revenue
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto mb-12 font-medium drop-shadow-md animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100">
            We build production-ready AI agents, automation, and applications for companies that want real ROI—not experiments.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
            <Link to="/contact" className="w-full sm:w-auto bg-brand-red text-white px-10 py-5 rounded-sm font-bold text-lg hover:bg-red-700 transition-all shadow-xl shadow-brand-red/30 uppercase tracking-widest text-center">
              Book a Strategy Call
            </Link>
            <Link to="/solutions" className="w-full sm:w-auto border border-white/30 bg-white/5 backdrop-blur-sm text-white px-10 py-5 rounded-sm font-bold text-lg hover:bg-white/10 transition-all uppercase tracking-widest text-center">
              Explore Solutions
            </Link>
          </div>
        </div>
      </section>

      {/* Welcome Video Section */}
      <section className="py-12 bg-brand-black border-t border-white/5 relative">
        <div className="max-w-6xl mx-auto px-6">
          <div className="relative aspect-video w-full rounded-sm overflow-hidden border border-white/10 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.7)] group bg-black">
            <div className="absolute top-4 left-4 z-20 flex items-center space-x-2 bg-brand-black/40 backdrop-blur-md px-3 py-1 rounded-sm border border-white/10">
              <div className="w-2 h-2 rounded-full bg-brand-red animate-pulse"></div>
              <span className="text-[10px] font-black uppercase tracking-widest text-white">System Active</span>
            </div>

            <video 
              ref={welcomeVideoRef} 
              autoPlay
              playsInline 
              controls 
              className="w-full h-full object-cover cursor-pointer" 
              preload="metadata"
            >
              <source src="https://hvtxvvalhjxjzixoiaun.supabase.co/storage/v1/object/public/introductory%20video%20and%20work%20showcase/welcome%20video.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
      </section>

      {/* Photo Story Section */}
      <section className="relative w-full z-20 bg-brand-black border-t border-white/5">
        <div className="relative w-full h-screen overflow-hidden group">
          {founderImages.map((src, index) => (
            <div key={index} className={`absolute inset-0 transition-opacity duration-1000 ease-in-out flex items-center justify-center ${index === currentPhotoIndex ? 'opacity-100 z-20' : 'opacity-0 z-10'}`}>
              <div className="absolute inset-0 z-0">
                <img src={src} alt="" className="w-full h-full object-cover blur-3xl opacity-20 scale-110" loading="lazy" />
              </div>
              <img src={src} alt={`Glamour Showcase ${index + 1}`} className="relative z-10 w-full h-full object-contain" />
            </div>
          ))}

          <button onClick={prevPhoto} className="absolute left-10 top-1/2 -translate-y-1/2 z-40 p-6 bg-black/40 backdrop-blur-2xl border border-white/10 rounded-full text-white opacity-0 group-hover:opacity-100 hover:bg-brand-red transition-all transform hover:scale-110 active:scale-95">
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
          </button>
          
          <button onClick={nextPhoto} className="absolute right-10 top-1/2 -translate-y-1/2 z-40 p-6 bg-black/40 backdrop-blur-2xl border border-white/10 rounded-full text-white opacity-0 group-hover:opacity-100 hover:bg-brand-red transition-all transform hover:scale-110 active:scale-95">
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          </button>

          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-40 flex space-x-3 bg-black/60 backdrop-blur-3xl px-6 py-4 rounded-full border border-white/10">
            {founderImages.map((_, idx) => (
              <button key={idx} onClick={() => { setIsAutoPlaying(false); setCurrentPhotoIndex(idx); }} className={`h-2 transition-all duration-500 rounded-full ${idx === currentPhotoIndex ? 'w-16 bg-brand-red' : 'w-4 bg-white/20 hover:bg-white/40'}`}></button>
            ))}
          </div>
        </div>
      </section>

      {/* Metrics Section */}
      <section className="py-24 border-b border-white/5 bg-white/5">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-16 text-center">
          {[
            { val: "500+", label: "Workflows Automated" },
            { val: "40%", label: "Avg. Cost Reduction" },
            { val: "12", label: "Industries Transformed" }
          ].map((m, i) => (
            <div key={i} className="group">
              <p className="text-7xl font-black heading-font text-brand-red mb-3 tracking-tighter transition-transform group-hover:scale-110">{m.val}</p>
              <p className="text-gray-400 uppercase tracking-[0.3em] text-xs font-black">{m.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Application Form Section */}
      <section id="book" className="py-32 px-6 bg-brand-black border-t border-white/5">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
          <div>
            <span className="text-brand-red font-black tracking-[0.6em] uppercase text-xs mb-8 block">SYSTEM AUDIT REQUEST</span>
            <h2 className="text-6xl md:text-8xl font-black heading-font mb-10 text-brand-white uppercase tracking-tighter leading-none">
              Deploy Your <br /><span className="text-brand-red">AI Roadmap</span>
            </h2>
            <p className="text-gray-400 text-2xl leading-relaxed max-w-md mb-12 font-medium">
              Qualified enterprise clients can schedule a deep-dive systems audit with our senior technical architects.
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 p-12 rounded-sm shadow-2xl relative">
            {isSuccess ? (
              <div className="text-center py-20 animate-in fade-in zoom-in duration-500">
                <div className="w-20 h-20 bg-brand-red rounded-full flex items-center justify-center mx-auto mb-8 shadow-[0_0_30px_rgba(215,38,56,0.4)]">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                </div>
                <h3 className="text-3xl font-black heading-font mb-4 uppercase tracking-tighter">Transmission Successful</h3>
                <p className="text-gray-400 text-lg mb-10">Redirecting to schedule your meeting...</p>
                <a href="https://calendly.com/glamourtech/new-meeting" className="text-brand-red font-bold uppercase tracking-widest text-sm hover:underline">Click here if not redirected automatically</a>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-500">Full Name</label>
                    <input required type="text" disabled={isSubmitting} className="w-full bg-brand-black border border-white/10 px-6 py-6 focus:border-brand-red outline-none transition-all text-brand-white disabled:opacity-50" placeholder="Full Name" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
                  </div>
                  <div className="space-y-4">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-500">Work Email</label>
                    <input required type="email" disabled={isSubmitting} className="w-full bg-brand-black border border-white/10 px-6 py-6 focus:border-brand-red outline-none transition-all text-brand-white disabled:opacity-50" placeholder="john@company.com" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-500">PHONE NUMBER (WhatsApp Recommend)</label>
                    <input required type="tel" disabled={isSubmitting} className="w-full bg-brand-black border border-white/10 px-6 py-6 focus:border-brand-red outline-none transition-all text-brand-white disabled:opacity-50" placeholder="+1 234 567 8900" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} />
                  </div>
                  <div className="space-y-4">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-500">COUNTRY</label>
                    <input required list="home-country-list" disabled={isSubmitting} className="w-full bg-brand-black border border-white/10 px-6 py-6 focus:border-brand-red outline-none transition-all text-brand-white disabled:opacity-50" placeholder="Choose or Type" value={formData.country} onChange={(e) => setFormData({...formData, country: e.target.value})} />
                    <datalist id="home-country-list">
                      {commonCountries.map(c => <option key={c} value={c} />)}
                    </datalist>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-500">Company</label>
                  <input required type="text" disabled={isSubmitting} className="w-full bg-brand-black border border-white/10 px-6 py-6 focus:border-brand-red outline-none transition-all text-brand-white disabled:opacity-50" placeholder="Company Name" value={formData.company} onChange={(e) => setFormData({...formData, company: e.target.value})} />
                </div>

                <div className="space-y-4">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-500">Quarterly Budget</label>
                  <select required disabled={isSubmitting} className="w-full bg-brand-black border border-white/10 px-6 py-6 focus:border-brand-red outline-none transition-all text-brand-white disabled:opacity-50" value={formData.budget} onChange={(e) => setFormData({...formData, budget: e.target.value})}>
                    <option value="">Select Range</option>
                    <option value="10k-50k">$10k - $50k</option>
                    <option value="50k-200k">$50k - $200k</option>
                    <option value="200k+">$200k+</option>
                  </select>
                </div>

                <div className="space-y-4">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-500">Vision & Outcomes</label>
                  <textarea required rows={4} disabled={isSubmitting} className="w-full bg-brand-black border border-white/10 px-6 py-6 focus:border-brand-red outline-none transition-all text-brand-white disabled:opacity-50" placeholder="Project Vision / Outcomes Required..." value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})}></textarea>
                </div>

                <button type="submit" disabled={isSubmitting} className="w-full bg-brand-red text-white py-8 font-black uppercase tracking-widest hover:bg-red-700 transition-all shadow-2xl shadow-brand-red/20 disabled:bg-red-900 disabled:cursor-not-allowed">
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
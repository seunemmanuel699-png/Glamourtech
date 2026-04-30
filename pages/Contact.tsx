
import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, MessageSquare, Users2, Clock, Shield, CheckCircle2, ExternalLink } from 'lucide-react';

const Contact: React.FC = () => {
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
          source: 'Contact Page Strategy Request',
          submittedAt: new Date().toISOString()
        }),
      });

      if (response.ok) {
        setIsSuccess(true);
        // Successful submission now stay on page to show the embedded scheduler
      } else {
        throw new Error("Submission failed");
      }
    } catch (error) {
      console.error("Submission error:", error);
      alert("There was an error submitting your request. Please try again or reach out to glamourtechsolution@gmail.com");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pt-8 pb-12 px-6 max-w-7xl mx-auto">
      {/* Page Header */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-6"
      >
        <span className="text-brand-red font-black tracking-[0.6em] uppercase text-[9px] mb-2 block">COMMUNICATIONS NODE</span>
        <h1 className="text-3xl md:text-5xl font-black heading-font mb-2 uppercase tracking-tighter leading-none">
          Operational <br /><span className="text-brand-red">Access</span>
        </h1>
        <p className="text-gray-400 text-sm leading-relaxed max-w-md mx-auto font-medium">
          Strategic gateway for enterprise AI deployment and autonomous systems architecture.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Side: Contact Methods & Info */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="lg:col-span-5 space-y-6"
        >
          <div>
            <h3 className="text-brand-white font-black uppercase tracking-[0.4em] text-[10px] mb-4 text-gray-500 flex items-center gap-4">
              <span className="w-8 h-[1px] bg-white/10"></span> SECURE CHANNELS
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* WhatsApp Card */}
              <div className="p-5 border border-white/5 bg-white/[0.02] hover:bg-white/5 transition-all group rounded-sm">
                <MessageSquare className="w-5 h-5 text-green-500 mb-3 group-hover:scale-110 transition-transform" />
                <h4 className="font-black text-brand-white uppercase tracking-widest text-[8px] mb-1 text-gray-500">Fast Response</h4>
                <a href="https://wa.me/2348145157702" target="_blank" rel="noopener noreferrer" className="text-brand-white font-bold hover:text-green-500 transition-colors block text-xs truncate">WhatsApp Hub</a>
              </div>

              {/* Email Card */}
              <div className="p-5 border border-white/5 bg-white/[0.02] hover:bg-white/5 transition-all group rounded-sm">
                <Mail className="w-5 h-5 text-brand-red mb-3 group-hover:scale-110 transition-transform" />
                <h4 className="font-black text-brand-white uppercase tracking-widest text-[8px] mb-1 text-gray-500">Direct Comms</h4>
                <a href="mailto:glamourtechsolution@gmail.com" className="text-brand-white font-bold hover:text-brand-red transition-colors block text-xs truncate">Email Gateway</a>
              </div>

              {/* LinkedIn Card */}
              <div className="p-5 border border-white/5 bg-white/[0.02] hover:bg-white/5 transition-all group rounded-sm">
                <Users2 className="w-5 h-5 text-blue-500 mb-3 group-hover:scale-110 transition-transform" />
                <h4 className="font-black text-brand-white uppercase tracking-widest text-[8px] mb-1 text-gray-500">Network</h4>
                <p className="text-brand-white font-bold text-xs">LinkedIn Feed</p>
              </div>

              {/* Upwork Card */}
              <div className="p-5 border border-white/5 bg-white/[0.02] hover:bg-white/5 transition-all group rounded-sm">
                <ExternalLink className="w-5 h-5 text-brand-red mb-3 group-hover:scale-110 transition-transform" />
                <h4 className="font-black text-brand-white uppercase tracking-widest text-[8px] mb-1 text-gray-500">Marketplace</h4>
                <a href="https://www.upwork.com/freelancers/~0161750daa781bfcb5?mp_source=share" target="_blank" rel="noopener noreferrer" className="text-brand-white font-bold hover:text-brand-red transition-colors block text-xs truncate">Upwork Profile</a>
              </div>

              {/* YouTube Card */}
              <div className="p-5 border border-white/5 bg-white/[0.02] hover:bg-white/5 transition-all group rounded-sm sm:col-span-2">
                <div className="flex items-center gap-4">
                  <svg 
                    className="w-5 h-5 text-red-600 group-hover:scale-110 transition-transform flex-shrink-0" 
                    fill="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                  <div>
                    <h4 className="font-black text-brand-white uppercase tracking-widest text-[8px] mb-1 text-gray-500">Technical Content</h4>
                    <a href="https://youtube.com/@glamourtechsolution-n4z?si=HrrmbMYujDsbNmy7" target="_blank" rel="noopener noreferrer" className="text-brand-white font-bold hover:text-red-600 transition-colors block text-xs">YouTube Video Series</a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex gap-6 items-start p-6 bg-brand-red/10 border-l-2 border-brand-red">
              <Shield className="w-5 h-5 text-brand-red flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-black text-brand-white uppercase tracking-widest text-[9px] mb-1 leading-none">Security Protocol</h4>
                <p className="text-gray-400 text-[11px] leading-relaxed">Direct encryption active. Intellectual property protection is mandatory for all requests.</p>
              </div>
            </div>
            <div className="flex gap-6 items-start p-6 bg-white/[0.02] border-l-2 border-white/20">
              <CheckCircle2 className="w-5 h-5 text-white/40 flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-black text-brand-white uppercase tracking-widest text-[9px] mb-1 leading-none">Client Vetting</h4>
                <p className="text-gray-400 text-[11px] leading-relaxed">Exclusive partnership with enterprises ready for high-impact AI automation deployments.</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Side: Form */}
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="lg:col-span-7"
        >
          <div className="bg-brand-black border border-white/10 p-8 md:p-10 rounded-sm shadow-2xl relative">
            <h3 className="text-xl font-black heading-font mb-6 uppercase tracking-tight flex items-center gap-4">
              <span className="text-brand-red">Request</span> Strategic Audit
              <span className="flex-grow h-[1px] bg-white/10"></span>
            </h3>

            {isSuccess ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
              >
                <div className="w-16 h-16 bg-brand-red rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-brand-red/20">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                </div>
                <h3 className="text-2xl font-black heading-font mb-4 uppercase tracking-tighter">Transmission Successful</h3>
                <p className="text-gray-400 text-sm mb-8">Data received. Proceed to scheduling or standby for contact.</p>
                <button 
                  onClick={() => {
                    const element = document.getElementById('booking-section');
                    element?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="bg-white/5 border border-white/10 px-8 py-4 text-brand-white font-black uppercase tracking-[.4em] text-[9px] hover:bg-brand-red hover:border-brand-red transition-all"
                >
                  Go to Calendar Gateway ↓
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label className="block text-[8px] font-black uppercase tracking-[0.4em] text-gray-500">Deployment Officer</label>
                    <input required type="text" disabled={isSubmitting} className="w-full bg-white/[0.03] border border-white/10 px-4 py-3 focus:border-brand-red outline-none transition-all text-brand-white font-medium text-sm disabled:opacity-50" placeholder="Full Name" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-[8px] font-black uppercase tracking-[0.4em] text-gray-500">Corporate Email</label>
                    <input required type="email" disabled={isSubmitting} className="w-full bg-white/[0.03] border border-white/10 px-4 py-3 focus:border-brand-red outline-none transition-all text-brand-white font-medium text-sm disabled:opacity-50" placeholder="john@company.com" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label className="block text-[8px] font-black uppercase tracking-[0.4em] text-gray-500">Direct Link (WA/Phone)</label>
                    <input required type="tel" disabled={isSubmitting} className="w-full bg-white/[0.03] border border-white/10 px-4 py-3 focus:border-brand-red outline-none transition-all text-brand-white font-medium text-sm disabled:opacity-50" placeholder="+1 (555) 000-0000" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-[8px] font-black uppercase tracking-[0.4em] text-gray-500">Operating Region</label>
                    <input required list="contact-country-list" disabled={isSubmitting} className="w-full bg-white/[0.03] border border-white/10 px-4 py-3 focus:border-brand-red outline-none transition-all text-brand-white font-medium text-sm disabled:opacity-50" placeholder="Country" value={formData.country} onChange={(e) => setFormData({...formData, country: e.target.value})} />
                    <datalist id="contact-country-list">
                      {commonCountries.map(c => <option key={c} value={c} />)}
                    </datalist>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-[8px] font-black uppercase tracking-[0.4em] text-gray-500">Organization Name</label>
                  <input required type="text" disabled={isSubmitting} className="w-full bg-white/[0.03] border border-white/10 px-4 py-3 focus:border-brand-red outline-none transition-all text-brand-white font-medium text-sm disabled:opacity-50" placeholder="Enterprise / Agency / Startup" value={formData.company} onChange={(e) => setFormData({...formData, company: e.target.value})} />
                </div>

                <div className="space-y-2">
                  <label className="block text-[8px] font-black uppercase tracking-[0.4em] text-gray-500">Budget Classification</label>
                  <select required disabled={isSubmitting} className="w-full bg-white/[0.03] border border-white/10 px-4 py-3 focus:border-brand-red outline-none transition-all text-brand-white font-medium text-sm disabled:opacity-50 appearance-none" value={formData.budget} onChange={(e) => setFormData({...formData, budget: e.target.value})}>
                    <option value="" className="bg-brand-black">Select Tier</option>
                    <option value="10k-50k" className="bg-brand-black">$10k - $50k</option>
                    <option value="50k-200k" className="bg-brand-black">$50k - $200k</option>
                    <option value="200k+" className="bg-brand-black">$200k+</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="block text-[8px] font-black uppercase tracking-[0.4em] text-gray-500">Bottleneck Description</label>
                  <textarea required rows={2} disabled={isSubmitting} className="w-full bg-white/[0.03] border border-white/10 px-4 py-3 focus:border-brand-red outline-none transition-all text-brand-white font-medium text-sm disabled:opacity-50 resize-none" placeholder="Describe manual processes required for automation..." value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})}></textarea>
                </div>

                <button type="submit" disabled={isSubmitting} className="w-full bg-brand-red text-white py-5 font-black uppercase tracking-[0.4em] text-[10px] hover:bg-white hover:text-brand-red transition-all shadow-xl shadow-brand-red/10 active:scale-[0.99] disabled:opacity-50 rounded-sm">
                  {isSubmitting ? 'Transmitting Module...' : 'Initialize Strategy Audit'}
                </button>
              </form>
            )}
          </div>
        </motion.div>
      </div>

      {/* Booking Section */}
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        id="booking-section" 
        className="mt-20 pt-20 border-t border-white/5"
      >
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-12">
          <span className="text-brand-red font-black tracking-[0.6em] uppercase text-[9px] mb-4">Direct Scheduling Protocol</span>
          <h2 className="text-4xl md:text-5xl font-black heading-font uppercase tracking-tighter mb-6">
            The <span className="text-brand-red">Nexus</span> Connection
          </h2>
          <p className="text-gray-400 text-lg leading-relaxed font-medium">
            Bypass standard channels. Access the scheduling gateway directly to secure a high-priority architecture session.
          </p>
        </div>

        <div className="bg-white/[0.02] border border-white/5 p-4 md:p-8 rounded-sm relative group">
          <div className="absolute inset-0 bg-brand-red/5 opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
          
          <div className="relative z-10 bg-white rounded-md overflow-hidden shadow-[0_0_100px_rgba(255,255,255,0.05)]">
            <iframe 
              src="https://calendar.google.com/calendar/appointments/schedules/AcZssZ2VUvoqGroT60iwpY4MrjYbW7xljJACSvgMykbgBw90nBgSg8dDC80J1V-mOG-T-_II-46-OGMI?gv=true" 
              style={{ border: 0 }} 
              width="100%" 
              height="600" 
              frameBorder="0"
              title="Glamourtech Scheduling Gateway"
            ></iframe>
          </div>

          <div className="mt-16 flex flex-wrap justify-center gap-10 text-[9px] font-black uppercase tracking-[0.4em] text-gray-500">
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-brand-red animate-pulse"></span> SYSTEM ONLINE
            </div>
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-white/20"></span> TLS 1.3 ACTIVE
            </div>
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-white/20"></span> GLOBAL TIME SYNC
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Contact;

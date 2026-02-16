
import React, { useState } from 'react';

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
        // Immediately redirect to Calendly after successful webhook submission
        window.location.href = "https://calendly.com/glamourtech/new-meeting";
      } else {
        throw new Error("Submission failed");
      }
    } catch (error) {
      console.error("Submission error:", error);
      alert("There was an error submitting your request. Please try again or reach out to support@glamourtech.ai");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="py-24 px-6 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20">
      <div className="animate-in fade-in slide-in-from-left duration-700">
        <span className="text-brand-red font-black tracking-[0.6em] uppercase text-xs mb-8 block">SYSTEM AUDIT REQUEST</span>
        <h1 className="text-5xl md:text-7xl font-black heading-font mb-10 uppercase tracking-tighter leading-none">
          Let's Talk <br /><span className="text-brand-red">Architecture</span>
        </h1>
        <p className="text-gray-400 text-2xl leading-relaxed mb-16 font-medium max-w-md">
          Schedule a strategy call to audit your manual processes and design your autonomous AI roadmap.
        </p>

        <div className="space-y-12">
          <div className="flex gap-6 items-start p-8 bg-white/5 border-l-4 border-brand-red">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-brand-red flex items-center justify-center font-bold text-xs">!</div>
            <div>
              <h4 className="font-black text-brand-white uppercase tracking-widest text-sm mb-2">Expectation Setting</h4>
              <p className="text-gray-400 text-lg">Calls are strictly for decision-makers and founders. Please allow 24 hours for internal review.</p>
            </div>
          </div>
          <div className="flex gap-6 items-start p-8 border border-white/5 bg-black/40">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center font-bold text-xs">🔒</div>
            <div>
              <h4 className="font-black text-brand-white uppercase tracking-widest text-sm mb-2">Security Note</h4>
              <p className="text-gray-400 text-lg">All submissions are protected by enterprise-grade encryption and treated with strict confidentiality.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-brand-black border border-white/10 p-12 rounded-sm shadow-2xl relative animate-in fade-in slide-in-from-right duration-700">
        {isSuccess ? (
          <div className="text-center py-24 animate-in fade-in zoom-in duration-500">
            <div className="w-20 h-20 bg-brand-red rounded-full flex items-center justify-center mx-auto mb-8">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
            </div>
            <h3 className="text-3xl font-black heading-font mb-4 uppercase tracking-tighter">Request Received</h3>
            <p className="text-gray-400 text-lg mb-10">Redirecting to schedule your architecture audit...</p>
            <a href="https://calendly.com/glamourtech/new-meeting" className="text-brand-red font-bold uppercase tracking-widest text-sm hover:underline">Click here if not redirected automatically</a>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <label className="block text-[10px] font-black uppercase tracking-[0.4em] text-gray-500 mb-4">Full Name</label>
                <input required type="text" disabled={isSubmitting} className="w-full bg-white/5 border border-white/10 px-6 py-6 focus:border-brand-red outline-none transition-all text-brand-white font-medium text-lg disabled:opacity-50" placeholder="Full Name" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
              </div>
              <div>
                <label className="block text-[10px] font-black uppercase tracking-[0.4em] text-gray-500 mb-4">Work Email</label>
                <input required type="email" disabled={isSubmitting} className="w-full bg-white/5 border border-white/10 px-6 py-6 focus:border-brand-red outline-none transition-all text-brand-white font-medium text-lg disabled:opacity-50" placeholder="john@company.com" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <label className="block text-[10px] font-black uppercase tracking-[0.4em] text-gray-500 mb-4">PHONE NUMBER (WhatsApp Recommend)</label>
                <input required type="tel" disabled={isSubmitting} className="w-full bg-white/5 border border-white/10 px-6 py-6 focus:border-brand-red outline-none transition-all text-brand-white font-medium text-lg disabled:opacity-50" placeholder="+1 (555) 000-0000" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} />
              </div>
              <div>
                <label className="block text-[10px] font-black uppercase tracking-[0.4em] text-gray-500 mb-4">COUNTRY</label>
                <input required list="contact-country-list" disabled={isSubmitting} className="w-full bg-white/5 border border-white/10 px-6 py-6 focus:border-brand-red outline-none transition-all text-brand-white font-medium text-lg disabled:opacity-50" placeholder="Select or Type" value={formData.country} onChange={(e) => setFormData({...formData, country: e.target.value})} />
                <datalist id="contact-country-list">
                  {commonCountries.map(c => <option key={c} value={c} />)}
                </datalist>
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-black uppercase tracking-[0.4em] text-gray-500 mb-4">Company / Organization</label>
              <input required type="text" disabled={isSubmitting} className="w-full bg-white/5 border border-white/10 px-6 py-6 focus:border-brand-red outline-none transition-all text-brand-white font-medium text-lg disabled:opacity-50" placeholder="Enterprise Inc." value={formData.company} onChange={(e) => setFormData({...formData, company: e.target.value})} />
            </div>

            <div>
              <label className="block text-[10px] font-black uppercase tracking-[0.4em] text-gray-500 mb-4">Estimated Quarterly Project Budget</label>
              <select required disabled={isSubmitting} className="w-full bg-white/5 border border-white/10 px-6 py-6 focus:border-brand-red outline-none transition-all text-brand-white font-medium text-lg disabled:opacity-50" value={formData.budget} onChange={(e) => setFormData({...formData, budget: e.target.value})}>
                <option value="">Select Range</option>
                <option value="10k-50k">$10k - $50k</option>
                <option value="50k-200k">$50k - $200k</option>
                <option value="200k+">$200k+</option>
              </select>
            </div>

            <div>
              <label className="block text-[10px] font-black uppercase tracking-[0.4em] text-gray-500 mb-4">Project Vision / Outcomes Required</label>
              <textarea required rows={4} disabled={isSubmitting} className="w-full bg-white/5 border border-white/10 px-6 py-6 focus:border-brand-red outline-none transition-all text-brand-white font-medium text-lg disabled:opacity-50" placeholder="Describe the bottlenecks you want to automate..." value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})}></textarea>
            </div>

            <button type="submit" disabled={isSubmitting} className="w-full bg-brand-red text-white py-8 font-black uppercase tracking-[0.4em] text-lg hover:bg-red-700 transition-all shadow-2xl shadow-brand-red/30 active:scale-[0.98] disabled:bg-red-900 disabled:cursor-not-allowed">
              {isSubmitting ? 'Transmitting Architecture Plan...' : 'Submit Application'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Contact;

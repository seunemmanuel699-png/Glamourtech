import React from "react";
import { motion } from "motion/react";
import { Quote, Star } from "lucide-react";
import { Link } from "react-router-dom";

const testimonials = [
  {
    name: "Sarah Jenkins",
    title: "COO",
    company: "FinTech Solutions",
    quote:
      "Glamourtech transformed our customer onboarding process. Their AI agents reduced our response time by 80% while maintaining a personal touch and enterprise security.",
    rating: 5,
  },
  {
    name: "Marcus Thorne",
    title: "CTO",
    company: "Global Logistics",
    quote:
      "The automation systems deployed by Glamourtech are world-class. Scalability is no longer a concern for our backend infrastructure, allowing us to focus on growth.",
    rating: 5,
  },
  {
    name: "Elena Rodriguez",
    title: "Head of Innovation",
    company: "HealthCorp",
    quote:
      "Security was our top priority. Glamourtech's private LLM deployments provided the enterprise-grade protection we needed for sensitive patient data processing.",
    rating: 5,
  },
  {
    name: "David Chen",
    title: "Director of Operations",
    company: "Apex Real Estate",
    quote:
      "The custom AI Voice agent books appointments for our agents 24/7. It has completely eliminated our lead leakage problem and integrated flawlessly with our CRM.",
    rating: 5,
  },
  {
    name: "Michael Sterling",
    title: "Founder",
    company: "Sterling E-Commerce",
    quote:
      "Automating our inventory and customer support pipelines with Glamourtech saved us over 40 hours a week. Their team understands actual business needs, not just code.",
    rating: 5,
  },
  {
    name: "Amanda Vance",
    title: "VP of Engineering",
    company: "NexGen SaaS",
    quote:
      "Their technical architecture is pristine. From the initial audit to the final deployment, the Glamourtech team demonstrated deep expertise in enterprise AI integrations.",
    rating: 5,
  },
];

const Reviews: React.FC = () => {
  return (
    <div className="bg-transparent text-brand-white min-h-screen">
      {/* Page Header */}
      <section className="pt-32 pb-16 px-6 relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <span className="text-[#00D2FF] font-black tracking-[0.6em] uppercase text-xs mb-4 block">
            Client Validation
          </span>
          <h1 className="text-5xl md:text-7xl font-black heading-font uppercase tracking-tighter leading-none mb-6">
            Client <span className="text-[#0066FF]">Reviews</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-3xl mx-auto leading-relaxed font-medium">
            Hear from industry leaders and enterprise clients who have scaled
            their operations using our autonomous AI systems and workflow
            automation architectures.
          </p>
        </div>
        <div className="absolute -top-20 -left-20 w-96 h-96 bg-[#00D2FF]/10 rounded-full blur-[120px] pointer-events-none"></div>
      </section>

      {/* REVIEWS GRID */}
      <section className="py-16 px-6 max-w-7xl mx-auto border-t border-white/5">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((t, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-white/5 border border-white/10 p-8 rounded-sm relative group hover:border-[#00D2FF]/30 transition-all duration-500 ease-out flex flex-col h-full"
            >
              <Quote className="absolute top-6 right-6 w-8 h-8 text-[#0066FF]/20 group-hover:text-[#0066FF]/40 transition-colors" />

              <div className="flex items-center gap-1 mb-6">
                {[...Array(t.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 text-[#00D2FF] fill-[#00D2FF]"
                  />
                ))}
              </div>

              <div className="flex-grow mb-8">
                <p className="text-gray-300 text-sm leading-relaxed italic relative z-10">
                  "{t.quote}"
                </p>
              </div>

              <div className="flex items-center space-x-4 border-t border-white/5 pt-6 mt-auto">
                <div className="w-12 h-12 bg-[#0066FF]/20 rounded-full flex items-center justify-center border border-[#0066FF]/30 group-hover:scale-110 transition-transform duration-500">
                  <span className="text-[#00D2FF] font-black text-sm">
                    {t.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </span>
                </div>
                <div>
                  <h4 className="text-white font-bold text-sm leading-tight">
                    {t.name}
                  </h4>
                  <p className="text-gray-500 text-[10px] uppercase font-black tracking-widest leading-tight mt-1">
                    {t.title} <span className="text-[#00D2FF]/60 mx-1">|</span>{" "}
                    {t.company}
                  </p>
                </div>
              </div>

              {/* Decorative highlights */}
              <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white/10 group-hover:border-[#00D2FF]/50 transition-colors"></div>
              <div className="absolute bottom-0 right-0 w-8 h-8 border-r border-b border-transparent group-hover:border-[#0066FF]/30 transition-all duration-700"></div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 bg-brand-black border-t border-white/5 text-center relative overflow-hidden">
        <div className="max-w-4xl mx-auto relative z-10">
          <h2 className="text-3xl md:text-5xl font-black heading-font uppercase tracking-tighter mb-8 text-white">
            Join Our <span className="text-[#00D2FF]">Success Stories</span>
          </h2>
          <Link
            to="/contact"
            className="inline-block bg-[#0066FF] text-white px-10 py-5 font-black uppercase tracking-[0.2em] hover:bg-white hover:text-brand-black transition-all shadow-lg active:scale-95 text-sm"
          >
            Start Your Transformation
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Reviews;

import React from "react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { Target, Zap, Shield, Users } from "lucide-react";

const About: React.FC = () => {
  return (
    <div className="bg-transparent text-brand-white min-h-screen">
      {/* Page Header */}
      <section className="pt-32 pb-16 px-6 relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <span className="text-[#00D2FF] font-black tracking-[0.6em] uppercase text-xs mb-4 block">
            Our Identity
          </span>
          <h1 className="text-5xl md:text-7xl font-black heading-font uppercase tracking-tighter leading-none mb-6">
            About <span className="text-[#0066FF]">Glamourtech</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-3xl mx-auto leading-relaxed font-medium">
            We build the intelligent systems that answer, qualify, and follow up
            while your team does the work only humans can do. Glamourtech is an
            enterprise AI systems and automation firm focused on measurable
            business ROI.
          </p>
        </div>
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#0066FF]/10 rounded-full blur-[120px] pointer-events-none"></div>
      </section>

      {/* Founder Profile */}
      <section className="py-20 px-6 max-w-7xl mx-auto border-t border-white/5">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="w-full md:w-1/3 flex justify-center">
            <div className="w-48 h-48 md:w-64 md:h-64 rounded-sm border-2 border-[#00D2FF]/30 p-2 relative group">
              <div className="w-full h-full bg-white/5 flex items-center justify-center overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-500">
                <img src="https://res.cloudinary.com/fxudag9y/image/upload/v1786973035/ChatGPT_Image_Jul_23_2026_02_23_20_PM_bfhioa.png" alt="Emmanuel Seun" className="w-full h-full object-cover object-top" />
              </div>
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-[#00D2FF]/10 blur-2xl"></div>
            </div>
          </div>
          <div className="w-full md:w-2/3">
            <span className="text-[#00D2FF] font-black tracking-[0.4em] uppercase text-[10px] mb-2 block">
              Founder & CEO
            </span>
            <h2 className="text-3xl md:text-5xl font-black heading-font uppercase tracking-tighter text-white mb-6">
              About <span className="text-[#0066FF]">Emmanuel Seun</span>
            </h2>
            <div className="space-y-4 text-gray-400 text-lg leading-relaxed">
              <p>
                I’m Emmanuel Seun, founder of GlamourTech. I help US businesses automate with AI, generate leads, and build fully automated web & mobile apps.
              </p>
              <p>
                Based in Akure, Nigeria. Serving clients in the United States.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 px-6 max-w-7xl mx-auto border-t border-white/5">
        <div className="mb-16 text-center">
          <span className="text-gray-500 font-black tracking-[0.4em] uppercase text-[10px] mb-2 block">
            Foundational Principles
          </span>
          <h2 className="text-3xl md:text-5xl font-black heading-font uppercase tracking-tighter text-white">
            Our Core <span className="text-[#00D2FF]">Mandates</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              icon: <Target className="w-8 h-8 text-[#00D2FF]" />,
              title: "Precision Engineering",
              desc: "Custom applications built around how your business actually runs, not generic templates.",
            },
            {
              icon: <Zap className="w-8 h-8 text-[#0066FF]" />,
              title: "Workflow Automation",
              desc: "Repetitive admin work handled autonomously, giving your team hours back weekly.",
            },
            {
              icon: <Users className="w-8 h-8 text-[#A6CE39]" />,
              title: "AI Voice & Chat Agents",
              desc: "Intelligent systems that qualify callers, answer questions, and book appointments 24/7.",
            },
            {
              icon: <Shield className="w-8 h-8 text-green-400" />,
              title: "Enterprise Security",
              desc: "Adherence to SOC2 and GDPR compliance with robust, institutional-grade data privacy.",
            },
          ].map((value, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white/5 border border-white/10 p-8 rounded-sm hover:border-[#00D2FF]/30 transition-all duration-300 group"
            >
              <div className="w-16 h-16 bg-brand-black border border-white/10 rounded-sm flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                {value.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-3 uppercase tracking-wider">
                {value.title}
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                {value.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 bg-white/[0.02] border-t border-white/5 text-center relative overflow-hidden">
        <div className="max-w-4xl mx-auto relative z-10">
          <h2 className="text-3xl md:text-5xl font-black heading-font uppercase tracking-tighter mb-8 text-white">
            Ready to scale your{" "}
            <span className="text-[#00D2FF]">operations?</span>
          </h2>
          <p className="text-gray-400 mb-10 max-w-2xl mx-auto text-lg">
            Connect with us to explore how we can architect intelligent
            automation for your specific workflow requirements.
          </p>
          <Link
            to="/contact"
            className="inline-block bg-[#0066FF] text-white px-10 py-5 font-black uppercase tracking-[0.2em] hover:bg-white hover:text-brand-black transition-all shadow-lg active:scale-95 text-sm"
          >
            Schedule a Strategy Call
          </Link>
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[#0066FF]/5 rounded-full blur-[100px] pointer-events-none"></div>
      </section>
    </div>
  );
};

export default About;

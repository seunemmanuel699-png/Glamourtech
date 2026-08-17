import React from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { Quote } from "lucide-react";

const projectCategories = [
  {
    name: "Web & Mobile Applications",
    subcategories: [
      { name: "Enterprise Platforms", projects: [] },
      {
        name: "Consumer Apps",
        projects: [
          {
            title: "Komodor Coworking Space App",
            description:
              "A coworking-space mobile app built for Android, showcasing a clean, user-friendly interface designed to help members manage their workspace experience end-to-end. Built as part of a client project, demonstrating practical Android UI development.",
            videoUrl:
              "https://res.cloudinary.com/fxudag9y/video/upload/v1786058844/cleaned_1_j3dzim.mp4",
            tags: ["Android", "Kotlin", "UI/UX", "Booking", "Community"],
          },
        ],
      },
      { name: "E-Commerce", projects: [] },
    ],
  },
  {
    name: "AI Agents & Automation",
    subcategories: [
      { name: "Intelligent Chatbots", projects: [] },
      { name: "Workflow Automation", projects: [] },
      { name: "Data Analytics", projects: [] },
    ],
  },
];

const testimonials = [
  {
    name: "Sarah Jenkins",
    title: "COO",
    company: "FinTech Solutions",
    quote:
      "Glamourtech transformed our customer onboarding process. Their AI agents reduced our response time by 80% while maintaining a personal touch and enterprise security.",
  },
  {
    name: "Marcus Thorne",
    title: "CTO",
    company: "Global Logistics",
    quote:
      "The automation systems deployed by Glamourtech are world-class. Scalability is no longer a concern for our backend infrastructure, allowing us to focus on growth.",
  },
  {
    name: "Elena Rodriguez",
    title: "Head of Innovation",
    company: "HealthCorp",
    quote:
      "Security was our top priority. Glamourtech's private LLM deployments provided the enterprise-grade protection we needed for sensitive patient data processing.",
  },
];

const WorkShowcase: React.FC = () => {
  return (
    <div className="bg-transparent text-brand-white min-h-screen">
      {/* Page Header - No bottom padding to eliminate space */}
      <section className="pt-32 pb-0 px-6 relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <span className="text-brand-red font-black tracking-[0.6em] uppercase text-xs mb-2 block">
            Production Portfolio
          </span>
          <h1 className="text-5xl md:text-7xl font-black heading-font uppercase tracking-tighter leading-none mb-0">
            Work <br />
            <span className="text-brand-red">Showcase</span>
          </h1>
        </div>
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-brand-red/5 rounded-full blur-[120px] pointer-events-none"></div>
      </section>

      {/* PORTFOLIO GRID SECTION - No top padding to eliminate space */}
      <section className="pb-16 pt-0 px-6 max-w-7xl mx-auto">
        <div className="mb-12 flex flex-col sm:flex-row items-start sm:items-center justify-between border-t border-white/5 pt-6 mt-4 gap-4">
          <div className="text-left">
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-500 block">
              System Deployments
            </span>
            <span className="text-white font-bold text-xs uppercase tracking-widest">
              Built by Emmanuel Seun
            </span>
          </div>
          <div className="text-left md:text-right">
             <span className="text-brand-red font-black text-[10px] uppercase tracking-widest">Client results from Emmanuel Seun at GlamourTech</span>
          </div>
          <div className="h-px flex-grow mx-8 bg-white/10 hidden lg:block"></div>
        </div>

        {/* Categories & Subcategories */}
        <div className="space-y-24">
          {projectCategories.map((category, idx) => (
            <div key={idx} className="space-y-12">
              <div className="border-l-4 border-brand-red pl-6">
                <h3 className="text-3xl md:text-4xl font-black heading-font uppercase tracking-tighter text-white">
                  {category.name}
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {category.subcategories.map((sub, sIdx) => (
                  <div
                    key={sIdx}
                    className="bg-white/5 border border-white/10 p-6 md:p-8 rounded-sm relative group hover:border-brand-red/30 transition-all duration-300"
                  >
                    <h4 className="text-xl font-bold text-white mb-2">
                      {sub.name}
                    </h4>
                    <p className="text-gray-500 text-xs font-mono uppercase tracking-widest mb-6 block">
                      {sub.projects.length} Deployments Active
                    </p>

                    {sub.projects.length > 0 ? (
                      <div className="space-y-6">
                        {sub.projects.map((project: any, pIdx: number) => (
                          <div
                            key={pIdx}
                            className="bg-black/60 rounded border border-white/5 overflow-hidden group-hover:border-white/20 transition-colors"
                          >
                            {project.videoUrl && (
                              <div className="aspect-[9/16] bg-black relative max-h-[400px] overflow-hidden flex items-center justify-center">
                                <video
                                  src={project.videoUrl}
                                  autoPlay
                                  muted
                                  loop
                                  playsInline
                                  className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                                />
                              </div>
                            )}
                            <div className="p-4">
                              <h5 className="text-white font-bold text-sm mb-2">
                                {project.title}
                              </h5>
                              <p className="text-gray-400 text-xs mb-4 leading-relaxed">
                                {project.description}
                              </p>
                              <div className="flex flex-wrap gap-2">
                                {project.tags.map(
                                  (tag: string, tIdx: number) => (
                                    <span
                                      key={tIdx}
                                      className="text-[9px] font-mono uppercase tracking-widest bg-brand-red/10 text-brand-red px-2 py-1 rounded border border-brand-red/20"
                                    >
                                      {tag}
                                    </span>
                                  ),
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="bg-black/40 rounded border border-white/5 h-40 flex items-center justify-center text-center p-4 group-hover:border-white/10 transition-colors">
                        <div>
                          <div className="w-8 h-8 rounded-full bg-brand-red/20 mx-auto mb-3 flex items-center justify-center">
                            <span className="w-2 h-2 rounded-full bg-brand-red animate-pulse"></span>
                          </div>
                          <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
                            Secure Systems Synchronizing...
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS SECTION */}
      <section className="py-16 md:py-24 px-6 bg-white/[0.02] border-y border-white/5 relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="mb-12 md:mb-16">
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-brand-red font-black tracking-[0.6em] uppercase text-[10px] mb-2 block"
            >
              Client Validation
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-black heading-font uppercase tracking-tighter leading-none"
            >
              Enterprise <span className="text-brand-red">Impact</span>
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                className="bg-white/5 border border-white/10 p-6 md:p-8 rounded-sm relative group hover:border-brand-red/30 transition-all duration-500 ease-out"
              >
                <Quote className="absolute top-4 right-4 md:top-6 md:right-6 w-6 h-6 md:w-8 md:h-8 text-brand-red/20 group-hover:text-brand-red/40 transition-colors" />

                <div className="mb-6 md:mb-8">
                  <p className="text-gray-400 text-xs md:text-sm leading-relaxed italic relative z-10">
                    "{t.quote}"
                  </p>
                </div>

                <div className="flex items-center space-x-3 border-t border-white/5 pt-4 md:pt-6">
                  <div className="w-10 h-10 bg-brand-red/20 rounded-full flex items-center justify-center border border-brand-red/30 group-hover:scale-110 transition-transform duration-500">
                    <span className="text-brand-red font-black text-xs">
                      {t.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </span>
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-xs md:text-sm leading-tight">
                      {t.name}
                    </h4>
                    <p className="text-gray-500 text-[10px] uppercase font-black tracking-widest leading-tight mt-1">
                      {t.title}{" "}
                      <span className="text-brand-red/60 mx-1">|</span>{" "}
                      {t.company}
                    </p>
                  </div>
                </div>

                {/* Decorative highlights */}
                <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white/10 group-hover:border-brand-red/50 transition-colors"></div>
                <div className="absolute bottom-0 right-0 w-8 h-8 border-r border-b border-transparent group-hover:border-brand-red/30 transition-all duration-700"></div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Background Accents */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-red/5 rounded-full blur-[100px] pointer-events-none -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-red/5 rounded-full blur-[80px] pointer-events-none translate-y-1/2 -translate-x-1/2"></div>
      </section>

      {/* Technical Footer CTA */}
      <section className="py-20 md:py-32 bg-brand-red relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="grid grid-cols-12 gap-1 h-full w-full">
            {Array.from({ length: 48 }).map((_, i) => (
              <div key={i} className="border border-white/20 h-full"></div>
            ))}
          </div>
        </div>
        <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
          <h2 className="text-4xl md:text-7xl font-black heading-font mb-6 md:mb-10 uppercase tracking-tighter text-white leading-none">
            Scale Your <br />
            Operations
          </h2>
          <Link
            to="/contact"
            className="inline-block bg-brand-black text-white px-8 py-5 md:px-16 md:py-6 font-black uppercase tracking-[0.2em] md:tracking-[0.4em] hover:bg-white hover:text-brand-black transition-all shadow-2xl active:scale-95 text-xs md:text-sm"
          >
            Book a Strategy Call
          </Link>
        </div>
      </section>
    </div>
  );
};

export default WorkShowcase;

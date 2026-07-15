"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Icon from "@/components/Icon";
import Showcase from "@/components/Showcase";

export default function Home() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", description: "" });
  const [submitStatus, setSubmitStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      window.history.pushState(null, "", window.location.pathname);
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitStatus("loading");
    try {
      const response = await fetch("https://x8ki-letl-twmt.n7.xano.io/api:7-0SUSqX/save_contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          description: formData.description,
        }),
      });

      if (response.ok) {
        setSubmitStatus("success");
        setFormData({ name: "", email: "", description: "" });
      } else {
        setSubmitStatus("error");
      }
    } catch (error) {
      console.error("Error submitting contact form:", error);
      setSubmitStatus("error");
    }
  };

  const sectionVariants = {
    hidden: { opacity: 0, y: 80, filter: "blur(24px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 1.4, ease: [0.16, 1, 0.3, 1] as const }
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 font-sans text-zinc-900 selection:bg-brand-100 selection:text-brand-900 overflow-x-hidden relative flex flex-col justify-between">
      <style dangerouslySetInnerHTML={{
        __html: `
        html {
          scroll-behavior: smooth;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none !important;
        }
        .scrollbar-hide {
          -ms-overflow-style: none !important;
          scrollbar-width: none !important;
        }
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 25s linear infinite;
        }
      `}} />

      <header className="fixed top-4 left-0 right-0 z-50 px-4">
        <nav className="mx-auto max-w-7xl h-16 flex items-center justify-between px-6 rounded-full bg-white/70 backdrop-blur-md border border-zinc-200/50">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-0.5 cursor-pointer"
          >
            <Image
              src="/logo.png"
              alt="Builders Hub Logo"
              width={56}
              height={56}
              className="h-14 w-auto object-contain"
              priority
            />
            <span className="font-extrabold text-base tracking-tight text-zinc-950 -ml-2.5">
              Builders Hub
            </span>
          </a>

          <div className="hidden lg:flex items-center gap-6">
            <a
              href="#about"
              onClick={(e) => handleScroll(e, "about")}
              className="text-sm font-medium text-zinc-600 hover:text-brand-navy-hover transition-colors"
            >
              About Us
            </a>
            <a
              href="#showcase"
              onClick={(e) => handleScroll(e, "showcase")}
              className="text-sm font-medium text-zinc-600 hover:text-brand-navy-hover transition-colors"
            >
              Product Showcase
            </a>
            <a
              href="#brands"
              onClick={(e) => handleScroll(e, "brands")}
              className="text-sm font-medium text-zinc-600 hover:text-brand-navy-hover transition-colors"
            >
              Brands
            </a>
            <a
              href="#timeline"
              onClick={(e) => handleScroll(e, "timeline")}
              className="text-sm font-medium text-zinc-600 hover:text-brand-navy-hover transition-colors"
            >
              Timeline
            </a>
            <a
              href="#pricing"
              onClick={(e) => handleScroll(e, "pricing")}
              className="text-sm font-medium text-zinc-600 hover:text-brand-navy-hover transition-colors"
            >
              Pricing
            </a>
            <a
              href="#contact"
              onClick={(e) => handleScroll(e, "contact")}
              className="text-sm font-medium text-zinc-600 hover:text-brand-navy-hover transition-colors"
            >
              Contact
            </a>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:inline-flex">
              <a
                href="https://cal.com/builders-hub/introduction"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-brand-navy hover:bg-brand-navy-hover text-white text-xs font-semibold tracking-wide transition-all group"
              >
                Schedule a Call
                <Icon
                  name="arrow_outward"
                  className="text-sm transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  weight={600}
                />
              </a>
            </div>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="flex lg:hidden items-center justify-center p-2 rounded-full border border-zinc-200 bg-white text-zinc-950 cursor-pointer focus:outline-none"
            >
              <Icon name={isMobileMenuOpen ? "close" : "menu"} className="text-xl" />
            </button>
          </div>
        </nav>

        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              className="fixed top-24 left-4 right-4 z-40 bg-white rounded-3xl border border-zinc-200/80 p-6 flex flex-col gap-4 shadow-lg lg:hidden"
            >
              <div className="flex flex-col gap-4">
                {[
                  { label: "About Us", target: "about" },
                  { label: "Product Showcase", target: "showcase" },
                  { label: "Brands", target: "brands" },
                  { label: "Timeline", target: "timeline" },
                  { label: "Pricing", target: "pricing" },
                  { label: "Contact", target: "contact" }
                ].map((item, idx) => (
                  <a
                    key={idx}
                    href={`#${item.target}`}
                    onClick={(e) => {
                      setIsMobileMenuOpen(false);
                      handleScroll(e, item.target);
                    }}
                    className="text-base font-semibold text-zinc-600 hover:text-brand-navy transition-colors cursor-pointer py-1"
                  >
                    {item.label}
                  </a>
                ))}
              </div>

              {/* Mobile CTA */}
              <div className="border-t border-zinc-100 pt-4">
                <a
                  href="https://cal.com/builders-hub/introduction"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="inline-flex w-full items-center justify-center gap-1.5 px-5 py-3 rounded-full bg-brand-navy text-white text-sm font-semibold tracking-wide cursor-pointer"
                >
                  Schedule a Call
                  <Icon name="arrow_outward" className="text-sm" weight={600} />
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Main Hero Container */}
      <main className="flex-1 flex flex-col justify-center max-w-7xl w-full mx-auto px-6 pt-32 pb-16 z-10">

        {/* Upper Hero Content (Typography & Primary CTA) */}
        <div className="flex-1 flex flex-col justify-center items-start text-left mt-8 md:mt-16">
          <motion.div
            initial={{ opacity: 0, y: 60, filter: "blur(20px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] as const }}
            className="flex flex-col items-start gap-8"
          >
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-zinc-950 leading-[1.08] max-w-4xl">
              We Engineer{" "}
              <span className="relative inline-block px-3 py-1 bg-brand-100 text-brand-900 rounded-2xl select-none">
                Systems
              </span>
              <span className="block mt-2">
                We Craft <span className="text-brand-900">Art</span>.
              </span>
            </h1>

            {/* Premium Capsule Button (Try Aura / smalltribe style) */}
            <div className="flex items-center gap-2">
              <a
                href="https://cal.com/builders-hub/introduction"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-6 py-3.5 rounded-full bg-brand-navy hover:bg-brand-navy-hover text-white text-sm font-semibold tracking-wide transition-all shadow-sm"
              >
                Schedule a Call
              </a>
              <a
                href="https://cal.com/builders-hub/introduction"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full bg-brand-navy hover:bg-brand-navy-hover text-white flex items-center justify-center transition-all group"
              >
                <Icon
                  name="arrow_outward"
                  className="text-lg transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  weight={600}
                />
              </a>
            </div>
          </motion.div>
        </div>

        {/* Lower Hero Content (Metadata / Brief Description at bottom) */}
        <div className="border-t border-zinc-200/60 pt-8 mt-16 grid grid-cols-1 md:grid-cols-12 gap-6 items-end">
          <div className="md:col-span-4 flex items-center text-zinc-400 text-xs font-mono uppercase tracking-wider">
            <span>Software Development Agency</span>
          </div>

          <div className="md:col-span-8 md:text-right">
            <p className="text-zinc-500 text-sm md:text-base leading-relaxed max-w-lg md:ml-auto">
              Builders Hub is a premium software development agency. We design and engineer high-performance web and mobile applications, bespoke websites, scalable backend architectures, and advanced AI automations to solve your most complex technical challenges.
            </p>
          </div>
        </div>
      </main>

      {/* Services Section underneath the Hero */}
      <motion.section
        id="services"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={sectionVariants}
        className="relative bg-white py-24 border-t border-zinc-200/60 z-10 w-full"
      >
        {/* Header Block (Aligned with standard layout max-width) */}
        <div className="max-w-7xl mx-auto w-full px-6 flex flex-col gap-12">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div className="max-w-md">
              <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-zinc-950 leading-tight">
                Quality Services <br />
                <span className="text-zinc-400">You Can Get</span>
              </h2>
            </div>
            <div className="max-w-xs md:text-right">
              <p className="text-zinc-500 text-sm leading-relaxed">
                We provide a wide range of software services. Covering all of your digital and operational needs.
              </p>
            </div>
          </div>
        </div>

        <div className="w-full mt-12 flex overflow-x-auto gap-6 pb-6 pt-4 scrollbar-hide px-6 md:px-20">
          {[
            {
              label: "Websites & Web Apps",
              desc: "Custom frontend architectures built with React, Next.js, and Tailwind CSS. Responsive, blazing fast, and optimized for conversion.",
              icon: "web",
              svg: (
                <svg className="w-24 h-24 text-brand-900/10" viewBox="0 0 100 100" fill="none">
                  <rect x="10" y="20" width="80" height="60" rx="8" stroke="currentColor" strokeWidth="2" />
                  <line x1="10" y1="35" x2="90" y2="35" stroke="currentColor" strokeWidth="2" />
                  <circle cx="20" cy="27.5" r="2.5" fill="currentColor" />
                  <circle cx="28" cy="27.5" r="2.5" fill="currentColor" />
                  <circle cx="36" cy="27.5" r="2.5" fill="currentColor" />
                </svg>
              )
            },
            {
              label: "Mobile Applications",
              desc: "High-performance React Native applications built to deliver smooth, fluid native mobile experiences on both iOS and Android.",
              icon: "phone_iphone",
              svg: (
                <svg className="w-24 h-24 text-brand-900/10" viewBox="0 0 100 100" fill="none">
                  <rect x="30" y="15" width="40" height="70" rx="8" stroke="currentColor" strokeWidth="2" />
                  <circle cx="50" cy="77" r="3" fill="currentColor" />
                  <line x1="45" y1="22" x2="55" y2="22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              )
            },
            {
              label: "Backend Systems",
              desc: "Scalable server engines, secure database designs, APIs, and cloud infrastructure engineered to support heavy operational workloads.",
              icon: "dns",
              svg: (
                <svg className="w-24 h-24 text-brand-900/10" viewBox="0 0 100 100" fill="none">
                  <rect x="15" y="15" width="70" height="20" rx="4" stroke="currentColor" strokeWidth="2" />
                  <rect x="15" y="40" width="70" height="20" rx="4" stroke="currentColor" strokeWidth="2" />
                  <rect x="15" y="65" width="70" height="20" rx="4" stroke="currentColor" strokeWidth="2" />
                  <circle cx="25" cy="25" r="2" fill="currentColor" />
                  <circle cx="25" cy="50" r="2" fill="currentColor" />
                  <circle cx="25" cy="75" r="2" fill="currentColor" />
                </svg>
              )
            },
            {
              label: "AI & Automations",
              desc: "Custom automated workflows, workflow integrations, LLM configurations, and scanner pipelines designed to maximize business efficiency.",
              icon: "settings_suggest",
              svg: (
                <svg className="w-24 h-24 text-brand-900/10" viewBox="0 0 100 100" fill="none">
                  <rect x="10" y="42" width="16" height="16" rx="4" stroke="currentColor" strokeWidth="2" />
                  <circle cx="50" cy="50" r="10" stroke="currentColor" strokeWidth="2" />
                  <rect x="74" y="42" width="16" height="16" rx="4" stroke="currentColor" strokeWidth="2" />
                  <path d="M26 50 H40" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  <path d="M60 50 H74" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  <path d="M50 20 V40" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  <circle cx="50" cy="15" r="5" stroke="currentColor" strokeWidth="2" />
                </svg>
              )
            },
            {
              label: "UI/UX Design",
              desc: "Interactive wireframes, detailed high-fidelity screen designs, and custom design systems crafted down to the pixel for ultimate user engagement.",
              icon: "palette",
              svg: (
                <svg className="w-24 h-24 text-brand-900/10" viewBox="0 0 100 100" fill="none">
                  <rect x="20" y="20" width="50" height="50" rx="4" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" />
                  <rect x="16" y="16" width="8" height="8" fill="currentColor" />
                  <rect x="66" y="16" width="8" height="8" fill="currentColor" />
                  <rect x="16" y="66" width="8" height="8" fill="currentColor" />
                  <rect x="66" y="66" width="8" height="8" fill="currentColor" />
                  <path d="M55 55 L75 65 L67 69 L78 80 L72 84 L61 73 L57 81 Z" fill="currentColor" />
                </svg>
              )
            },
            {
              label: "Product & Graphics",
              desc: "Sleek branding assets, presentation decks, marketing layouts, and high-fidelity graphic concepts engineered to elevate your brand presence.",
              icon: "brush",
              svg: (
                <svg className="w-24 h-24 text-brand-900/10" viewBox="0 0 100 100" fill="none">
                  <circle cx="40" cy="50" r="20" stroke="currentColor" strokeWidth="2" />
                  <circle cx="60" cy="50" r="20" stroke="currentColor" strokeWidth="2" />
                  <path d="M50 30 L53 45 L68 48 L53 51 L50 66 L47 51 L32 48 L47 45 Z" fill="currentColor" />
                </svg>
              )
            }
          ].map((service, index) => (
            <div
              key={index}
              className="min-w-[280px] md:min-w-[320px] flex-1 bg-zinc-50 rounded-3xl border border-zinc-200/80 p-8 flex flex-col justify-between gap-8 group cursor-pointer hover:border-brand-navy/30 transition-colors duration-300"
            >
              <div className="flex flex-col gap-6">
                {/* Top Label Pill */}
                <div className="self-start px-4 py-2 rounded-full bg-white border border-zinc-200 text-xs font-semibold text-zinc-800 tracking-wide">
                  {service.label}
                </div>

                {/* Service Graphic Illustration */}
                <div className="py-6 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                  {service.svg}
                </div>
              </div>

              <div className="flex flex-col gap-4">
                {/* Description Paragraph */}
                <p className="text-zinc-500 text-xs md:text-sm leading-relaxed">
                  {service.desc}
                </p>

                {/* Circular Arrow Button (No shadows, borders only) */}
                <div className="self-end w-10 h-10 rounded-full border border-zinc-200 bg-white flex items-center justify-center text-zinc-600 group-hover:bg-brand-navy group-hover:text-white group-hover:border-brand-navy transition-all duration-300">
                  <Icon name="arrow_outward" className="text-sm" weight={600} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.section>

      {/* About Us Section */}
      <motion.section
        id="about"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={sectionVariants}
        className="relative bg-zinc-50 py-24 border-t border-zinc-200/60 z-10 w-full"
      >
        <div className="max-w-7xl mx-auto w-full px-6 flex flex-col gap-16">

          {/* Halved Image & Adjacent Content Block */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
            {/* Left Column: Black & White Abstract Image */}
            <div className="md:col-span-6 relative aspect-square rounded-3xl overflow-hidden border border-zinc-200/60 bg-black">
              <Image
                src="/abstract.png"
                alt="Builders Hub abstract design graphic"
                fill
                className="object-cover"
                priority
              />
            </div>

            {/* Right Column: Key Details & Values Description */}
            <div className="md:col-span-6 flex flex-col gap-6 justify-center">
              <span className="text-xs font-bold tracking-widest text-zinc-400 uppercase">
                About Us
              </span>
              <h3 className="text-2xl md:text-3xl font-extrabold tracking-tight text-zinc-950 leading-tight">
                Crafting digital systems with the precision of physical structures.
              </h3>
              <p className="text-zinc-500 text-sm md:text-base leading-relaxed">
                Builders Hub was founded on the belief that software agencies should be more than just code factories. We are problem solvers, designers, and artisans. When we partner with a brand, we sit on your side of the table, feel your operational bottlenecks, and design systems specifically built to fix them.
              </p>
            </div>
          </div>

          {/* Line Divider */}
          <div className="border-t border-zinc-200/60 w-full" />

        </div>
      </motion.section>

      {/* Product Showcase Section */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={sectionVariants}
      >
        <Showcase />
      </motion.div>

      {/* Brands / Testimonials Section */}
      <motion.section
        id="brands"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={sectionVariants}
        className="relative bg-zinc-100 py-24 border-t border-zinc-200/60 z-10 w-full"
      >
        <div className="max-w-7xl mx-auto w-full px-6 flex flex-col gap-12">
          <div className="flex flex-col items-center text-center gap-4">
            <span className="text-xs font-bold tracking-widest text-zinc-400 uppercase">
              Client Stories
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-zinc-950">
              Trusted by Ambitious Brands
            </h2>
            <p className="text-zinc-500 text-sm md:text-base max-w-lg leading-relaxed">
              What our clients say about partnering with Builders Hub to design systems and solve operational challenges.
            </p>
          </div>
        </div>

        {/* Testimonial Cards Row (Horizontal Scroll, Scrollbar Hidden) */}
        <div className="w-full mt-12 flex overflow-x-auto gap-6 pb-6 pt-4 scrollbar-hide px-6 md:px-20">
          {[
            {
              title: '"Fast and Efficient"',
              quote: "They understood our operational headaches immediately. The container scanning pipeline and custom logistics app they built saved us hours of manual logging every day.",
              name: "Remi Bardoux",
              role: "Product Manager @ Freenow",
              initials: "RB",
              color: "bg-indigo-100 text-indigo-800",
              company: "FREENOW"
            },
            {
              title: '"Wow effect"',
              quote: "We worked with them to build our next-generation web application. What stood out was their speed, attention to detail, and the beautiful, fluid design system.",
              name: "Miguel Labranche",
              role: "Product Manager @ Orange",
              initials: "ML",
              color: "bg-orange-100 text-orange-800",
              company: "ORANGE"
            },
            {
              title: '"Creative"',
              quote: "They designed a completely custom backend infrastructure and web app for our AI workflows. Very pleasant to collaborate with, honest about prices, and deliver premium art.",
              name: "Jennifer Han",
              role: "CMO @ Ausha",
              initials: "JH",
              color: "bg-pink-100 text-pink-800",
              company: "AUSHA"
            }
          ].map((item, idx) => (
            <div
              key={idx}
              className="min-w-[280px] md:min-w-[340px] flex-1 bg-white rounded-3xl border border-zinc-200/80 p-8 flex flex-col justify-between gap-8 group hover:border-brand-navy/30 transition-all duration-300"
            >
              <div className="flex flex-col gap-4">
                <h3 className="text-lg font-extrabold text-zinc-950">
                  {item.title}
                </h3>
                <p className="text-zinc-500 text-sm leading-relaxed">
                  {item.quote}
                </p>
              </div>

              <div className="flex items-center justify-between pt-6 border-t border-zinc-100">
                <div className="flex items-center gap-3">
                  {/* Initials Avatar (No images, using initials as requested) */}
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs ${item.color}`}>
                    {item.initials}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-zinc-950">{item.name}</span>
                    <span className="text-[10px] text-zinc-400 mt-0.5">{item.role}</span>
                  </div>
                </div>

                {/* Muted Company Tag */}
                <span className="text-[10px] font-mono font-bold tracking-wider text-zinc-300 group-hover:text-brand-navy/40 transition-colors">
                  {item.company}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Infinite Auto-Scrolling Brands Marquee */}
        <div className="w-full overflow-hidden py-10 border-t border-b border-zinc-200/50 mt-12 bg-white relative">
          {/* Fade gradients at screen edges for premium feel */}
          <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

          <div className="flex w-max animate-marquee gap-16 items-center">
            {/* First Set */}
            {["FREENOW", "ORANGE", "AUSHA", "STRIPE", "VERCEL", "FIGMA", "GITHUB", "NEXT.JS"].map((brand, i) => (
              <span key={i} className="text-xl font-mono font-extrabold tracking-widest text-zinc-300 uppercase select-none hover:text-zinc-600 transition-colors">
                {brand}
              </span>
            ))}
            {/* Duplicated Set for Infinite Loop */}
            {["FREENOW", "ORANGE", "AUSHA", "STRIPE", "VERCEL", "FIGMA", "GITHUB", "NEXT.JS"].map((brand, i) => (
              <span key={`dup-${i}`} className="text-xl font-mono font-extrabold tracking-widest text-zinc-300 uppercase select-none hover:text-zinc-600 transition-colors">
                {brand}
              </span>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Timeline Section */}
      <motion.section
        id="timeline"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={sectionVariants}
        className="relative bg-zinc-50 py-24 border-t border-zinc-200/60 z-10 w-full"
      >
        <div className="max-w-none w-full px-6 md:px-16 flex flex-col gap-12">

          {/* Section Card (white block matching screenshot) */}
          <div className="bg-white rounded-3xl border border-zinc-200/60 p-8 md:p-12 flex flex-col gap-12 overflow-x-auto scrollbar-hide">

            {/* Header Title */}
            <div className="flex flex-col gap-2">
              <h2 className="text-3xl font-extrabold tracking-tight text-zinc-950">
                Timeline
              </h2>
            </div>

            {/* Gantt Calendar Table */}
            <div className="min-w-[800px] w-full flex flex-col">

              {/* Phases Header (6 Phases) */}
              <div className="grid grid-cols-12 border-b border-zinc-100 pb-3 text-center">
                <div className="col-span-2 text-xs font-bold text-zinc-800">Phase-1</div>
                <div className="col-span-2 text-xs font-bold text-zinc-800">Phase-2</div>
                <div className="col-span-2 text-xs font-bold text-zinc-800">Phase-3</div>
                <div className="col-span-2 text-xs font-bold text-zinc-800">Phase-4</div>
                <div className="col-span-2 text-xs font-bold text-zinc-800">Phase-5</div>
                <div className="col-span-2 text-xs font-bold text-zinc-800">Phase-6</div>
              </div>

              {/* Days Sub-header (12 columns) */}
              <div className="grid grid-cols-12 py-3 text-center border-b border-zinc-100 text-[10px] font-bold text-zinc-400">
                <div>Mon</div>
                <div>Tue</div>
                <div>Wed</div>
                <div>Thu</div>
                <div>Fri</div>
                <div>Sat</div>
                <div>Mon</div>
                <div>Tue</div>
                <div>Wed</div>
                <div>Thu</div>
                <div>Fri</div>
                <div>Sat</div>
              </div>

              {/* Grid Content Area for Bars */}
              <div className="grid grid-cols-12 py-8 gap-y-4 relative">

                {/* Vertical Column dividers (subtle background grid lines) */}
                <div className="absolute inset-0 grid grid-cols-12 pointer-events-none">
                  {Array.from({ length: 12 }).map((_, i) => (
                    <div key={i} className="border-r border-zinc-100/60 h-full last:border-r-0" />
                  ))}
                </div>

                {/* Stage 1: Understanding */}
                <div className="col-start-1 col-span-3 sm:col-span-2 z-10">
                  <div className="bg-brand-900 text-white rounded-full py-3 px-4 flex items-center justify-between shadow-sm">
                    <div className="flex items-center gap-2">
                      <Icon name="search" className="text-sm text-brand-200" />
                      <span className="text-xs font-bold tracking-wide">Understanding</span>
                    </div>
                    <div className="w-2.5 h-2.5 rounded-full bg-white" />
                  </div>
                </div>

                {/* Stage 2: Strategy */}
                <div className="col-start-2 col-span-3 z-10 mt-2">
                  <div className="bg-emerald-500 text-white rounded-full py-3 px-4 flex items-center justify-between shadow-sm">
                    <div className="flex items-center gap-2">
                      <Icon name="insights" className="text-sm text-emerald-100" />
                      <span className="text-xs font-bold tracking-wide">Strategy</span>
                    </div>
                    <div className="w-2.5 h-2.5 rounded-full bg-white" />
                  </div>
                </div>

                {/* Stage 3: UI/UX */}
                <div className="col-start-4 col-span-3 z-10 mt-2">
                  <div className="bg-orange-400 text-white rounded-full py-3 px-4 flex items-center justify-between shadow-sm">
                    <div className="flex items-center gap-2">
                      <Icon name="draw" className="text-sm text-orange-100" />
                      <span className="text-xs font-bold tracking-wide">UI/UX</span>
                    </div>
                    <div className="w-2.5 h-2.5 rounded-full bg-white" />
                  </div>
                </div>

                {/* Stage 4: Development */}
                <div className="col-start-6 col-span-5 z-10 mt-2">
                  <div className="bg-indigo-600 text-white rounded-full py-3 px-4 flex items-center justify-between shadow-sm">
                    <div className="flex items-center gap-2">
                      <Icon name="code" className="text-sm text-indigo-200" />
                      <span className="text-xs font-bold tracking-wide">Development</span>
                    </div>
                    <div className="w-2.5 h-2.5 rounded-full bg-white" />
                  </div>
                </div>

                {/* Stage 5: Testing */}
                <div className="col-start-10 col-span-2 z-10 mt-2">
                  <div className="bg-pink-500 text-white rounded-full py-3 px-4 flex items-center justify-between shadow-sm">
                    <div className="flex items-center gap-2">
                      <Icon name="flaky" className="text-sm text-pink-100" />
                      <span className="text-xs font-bold tracking-wide">Testing</span>
                    </div>
                    <div className="w-2.5 h-2.5 rounded-full bg-white" />
                  </div>
                </div>

                {/* Stage 6: Deployment */}
                <div className="col-start-11 col-span-2 z-10 mt-2">
                  <div className="bg-teal-500 text-white rounded-full py-3 px-4 flex items-center justify-between shadow-sm">
                    <div className="flex items-center gap-2">
                      <Icon name="rocket_launch" className="text-sm text-teal-100" />
                      <span className="text-xs font-bold tracking-wide">Deployment</span>
                    </div>
                    <div className="w-2.5 h-2.5 rounded-full bg-white" />
                  </div>
                </div>

              </div>

            </div>

          </div>

        </div>
      </motion.section>

      {/* Why Choose Us Section */}
      <motion.section
        id="why-choose-us"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={sectionVariants}
        className="relative bg-zinc-50 py-24 border-t border-zinc-200/60 z-10 w-full"
      >
        <div className="max-w-7xl mx-auto w-full px-6 flex flex-col gap-12">

          {/* Header Title & Intro Row */}
          <div className="flex flex-col gap-2 max-w-xl border-b border-zinc-200/60 pb-8">
            <span className="text-xs font-bold tracking-widest text-zinc-400 uppercase">
              Expertise
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-zinc-950">
              Why choose us?
            </h2>
            <p className="text-zinc-500 text-sm md:text-base leading-relaxed mt-2">
              Our commitment to premium digital craftsmanship goes beyond just writing code. Discover the unique benefits that set us apart and guarantee success.
            </p>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
            {[
              {
                icon: "code",
                title: "Handcrafted Code",
                desc: "Every line of code is written in house by seasoned developers. We never outsource project delivery to third-party factories.",
                highlight: true
              },
              {
                icon: "group",
                title: "Direct Partnership",
                desc: "Work directly with lead designers and systems engineers. No project managers, middle layers, or communication gaps.",
                highlight: false
              },
              {
                icon: "palette",
                title: "Pixel-Perfect Art",
                desc: "Premium customized interfaces styled from scratch. We build detailed design libraries and layouts crafted down to the pixel.",
                highlight: false
              },
              {
                icon: "hub",
                title: "Node Automations",
                desc: "Automated business logic networks designed to optimize operations, integrate database states, and scale efficiency.",
                highlight: false
              }
            ].map((card, idx) => (
              <div
                key={idx}
                className={`rounded-3xl border p-8 flex flex-col gap-6 group transition-all duration-300 ${card.highlight ? 'bg-blue-50/60 border-blue-200/50 hover:border-blue-300' : 'bg-white border-zinc-200/85 hover:border-brand-navy/20'}`}
              >
                {/* Icon Wrapper */}
                <div className="w-12 h-12 rounded-full bg-zinc-900 flex items-center justify-center text-white">
                  <Icon name={card.icon} className="text-xl" />
                </div>

                {/* Info */}
                <div className="flex flex-col gap-3">
                  <h3 className="text-lg font-extrabold text-zinc-950">
                    {card.title}
                  </h3>
                  <p className="text-zinc-500 text-xs leading-relaxed">
                    {card.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </motion.section>

      {/* Pricing / Consultation Call Section */}
      <motion.section
        id="pricing"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={sectionVariants}
        className="relative bg-white py-24 border-t border-zinc-200/60 z-10 w-full"
      >
        <div className="max-w-7xl mx-auto w-full px-6 flex flex-col gap-12">

          {/* Header Title Block */}
          <div className="flex flex-col items-center text-center gap-4">
            <span className="text-xs font-bold tracking-widest text-zinc-400 uppercase">
              Pricing
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-zinc-950">
              Simple &amp; Transparent Pricing
            </h2>
            <p className="text-zinc-500 text-sm md:text-base max-w-lg leading-relaxed">
              We engineer tailored solutions rather than copy-pasting code templates. That means we have no generic flat rates. Talk with us to get a custom roadmap and proposal.
            </p>
          </div>

          {/* Single Focused Consultation Pricing Card */}
          <div className="max-w-xl mx-auto w-full mt-6 bg-zinc-50 rounded-3xl border border-zinc-200/80 p-8 md:p-12 flex flex-col gap-8 justify-between hover:border-brand-navy/30 transition-all duration-300">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <span className="text-xs font-bold tracking-widest text-zinc-400 uppercase">
                  Discovery &amp; Strategy Session
                </span>
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl font-extrabold tracking-tight text-zinc-950">
                    $0 / ₦0
                  </span>
                  <span className="text-xs font-medium text-zinc-400">
                    / forever
                  </span>
                </div>
                <span className="text-xs font-bold text-emerald-600 mt-1">
                  100% Free consultation call
                </span>
              </div>

              <p className="text-zinc-500 text-sm leading-relaxed border-t border-zinc-200/40 pt-6">
                Some software agencies charge hefty upfront assessment fees just to talk about your requirements. We do not. Let&apos;s map out your systems, examine bottlenecks, and draft a plan at no cost.
              </p>

              {/* Consultation Features List */}
              <div className="flex flex-col gap-3.5 border-t border-zinc-200/40 pt-6">
                {[
                  "30-minute direct session with senior engineers",
                  "Comprehensive review of operational bottlenecks",
                  "Initial technical stack & framework evaluation",
                  "Detailed blueprint document outlining potential steps",
                  "No sales pitches or obligation to move forward"
                ].map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <Icon name="check_circle" className="text-emerald-500 text-base" />
                    <span className="text-xs font-bold text-zinc-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA Button */}
            <div className="pt-6 border-t border-zinc-200/40">
              <a
                href="https://cal.com/builders-hub/introduction"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center gap-2 px-6 py-4 rounded-full bg-brand-navy hover:bg-brand-navy-hover text-white text-sm font-semibold tracking-wide cursor-pointer transition-all group"
              >
                Schedule a Call
                <Icon
                  name="arrow_outward"
                  className="text-base transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  weight={600}
                />
              </a>
            </div>
          </div>

        </div>
      </motion.section>

      {/* Contact Section */}
      <motion.section
        id="contact"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={sectionVariants}
        className="relative bg-zinc-50 py-24 border-t border-zinc-200/60 z-10 w-full"
      >
        <div className="max-w-7xl mx-auto w-full px-6 flex flex-col gap-12">

          {/* Header Title Block */}
          <div className="flex flex-col gap-2 max-w-xl">
            <span className="text-xs font-bold tracking-widest text-zinc-400 uppercase">
              Get In Touch
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-zinc-950">
              Got ideas? Let&apos;s team up.
            </h2>
            <p className="text-zinc-500 text-sm md:text-base leading-relaxed mt-2">
              Tell us more about yourself and what you have in mind. We will get back to you within 24 hours.
            </p>
          </div>

          {/* Form Content Split Layout (No shadows, borders only) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mt-6 items-start">

            {/* Left Column: Direct Info */}
            <div className="lg:col-span-4 flex flex-col gap-8">
              <div className="flex flex-col gap-2">
                <span className="text-xs font-bold text-zinc-400 uppercase tracking-widest">
                  Chat to us
                </span>
                <p className="text-sm text-zinc-500">
                  Our friendly team is here to help and answer any questions.
                </p>
                <a
                  href="mailto:hello@buildershub.co"
                  className="text-sm font-bold text-brand-navy hover:text-brand-navy-hover transition-colors cursor-pointer mt-1"
                >
                  hello@buildershub.co
                </a>
              </div>
            </div>

            {/* Right Column: Contact Form */}
            <div className="lg:col-span-8 bg-white border border-zinc-200/80 rounded-3xl p-8 md:p-10">
              <form onSubmit={handleFormSubmit} className="flex flex-col gap-6">

                {/* Name Field */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="name" className="text-xs font-bold text-zinc-700">
                    Your name
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter your name"
                    className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 text-sm text-zinc-950 focus:outline-none focus:border-brand-navy transition-colors"
                  />
                </div>

                {/* Email Field */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="email" className="text-xs font-bold text-zinc-700">
                    Email address
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="you@company.com"
                    className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 text-sm text-zinc-950 focus:outline-none focus:border-brand-navy transition-colors"
                  />
                </div>

                {/* Message Field */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="message" className="text-xs font-bold text-zinc-700">
                    Tell us about the project
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={4}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Describe your goals, timeline, and scope..."
                    className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 text-sm text-zinc-950 focus:outline-none focus:border-brand-navy transition-colors resize-none"
                  />
                </div>

                {/* Submit button */}
                <div className="pt-2 flex flex-col gap-3">
                  <button
                    type="submit"
                    disabled={submitStatus === "loading"}
                    className="inline-flex w-full sm:w-auto items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-brand-navy hover:bg-brand-navy-hover text-white text-xs font-bold tracking-wide cursor-pointer transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {submitStatus === "loading" ? "Sending..." : "Send Message"}
                  </button>

                  {submitStatus === "success" && (
                    <p className="text-xs font-bold text-emerald-600 mt-1">
                      Your request was submitted successfully! We will get in touch shortly.
                    </p>
                  )}
                  {submitStatus === "error" && (
                    <p className="text-xs font-bold text-rose-600 mt-1">
                      Something went wrong. Please try again or email hello@buildershub.co directly.
                    </p>
                  )}
                </div>

              </form>
            </div>

          </div>

        </div>
      </motion.section>

      {/* Closing Statement / Brand Accent Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={sectionVariants}
        className="relative bg-zinc-50 py-32 border-t border-zinc-200/60 w-full overflow-hidden text-center flex flex-col items-center justify-center"
      >
        <div className="max-w-4xl mx-auto px-6 flex flex-col gap-6 items-center">
          <h2 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tighter text-zinc-950 uppercase leading-[1.15] flex flex-col gap-2 select-none">
            <span className="flex items-center justify-center gap-4 flex-wrap">
              Built
              <span className="inline-flex text-xs font-mono font-bold tracking-widest bg-emerald-100 text-emerald-800 px-4 py-2 rounded-full uppercase">
                By Artists
              </span>
              For The
            </span>
            <span className="flex items-center justify-center gap-4 flex-wrap">
              <span className="inline-flex text-xs font-mono font-bold tracking-widest bg-indigo-100 text-indigo-800 px-4 py-2 rounded-full uppercase">
                Critical
              </span>
              Ambitious
            </span>
            <span className="flex items-center justify-center gap-4 flex-wrap">
              &amp; The Outliers
              <span className="inline-flex w-16 h-8 bg-zinc-900 rounded-full" />
            </span>
          </h2>
        </div>
      </motion.section>

      {/* Footer Section */}
      <footer className="w-full bg-zinc-950 text-white rounded-t-[3rem] px-6 py-16 md:py-24 z-10 relative overflow-hidden">
        {/* Glow decoration (no shadows, flat elements) */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-px bg-gradient-to-r from-transparent via-zinc-700 to-transparent" />

        <div className="max-w-7xl mx-auto flex flex-col gap-16">

          {/* Logo & Headline */}
          <div className="flex flex-col items-center text-center gap-4">
            <span className="font-extrabold text-2xl tracking-tight text-white uppercase select-none">
              Builders Hub
            </span>
            <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest">
              Software Development Agency
            </span>
          </div>

          {/* Footer Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pt-8 border-t border-zinc-900">

            {/* Column 1: Contact Details */}
            <div className="flex flex-col gap-4">
              <h4 className="text-xs font-bold tracking-widest text-zinc-500 uppercase">
                Contact
              </h4>
              <div className="flex flex-col gap-2.5">
                <a
                  href="mailto:hello@buildershub.co"
                  className="text-sm font-medium text-zinc-400 hover:text-white transition-colors cursor-pointer"
                >
                  hello@buildershub.co
                </a>
                <span className="text-sm text-zinc-400">
                  Lagos, Nigeria
                </span>
              </div>
            </div>

            {/* Column 2: Quick Links */}
            <div className="flex flex-col gap-4">
              <h4 className="text-xs font-bold tracking-widest text-zinc-500 uppercase">
                Navigation
              </h4>
              <div className="flex flex-col gap-2.5">
                {["About", "Showcase", "Brands", "Timeline", "Pricing", "Contact"].map((link, idx) => (
                  <a
                    key={idx}
                    href={`#${link.toLowerCase().replace(" ", "")}`}
                    onClick={(e) => handleScroll(e, link.toLowerCase().replace(" ", ""))}
                    className="text-sm font-medium text-zinc-400 hover:text-white transition-colors cursor-pointer"
                  >
                    {link}
                  </a>
                ))}
              </div>
            </div>

            {/* Column 3: Services */}
            <div className="flex flex-col gap-4">
              <h4 className="text-xs font-bold tracking-widest text-zinc-500 uppercase">
                Services
              </h4>
              <div className="flex flex-col gap-2.5 text-sm text-zinc-400 font-medium">
                <span>Websites &amp; Web Apps</span>
                <span>Mobile Applications</span>
                <span>Backend Systems</span>
                <span>AI &amp; Automations</span>
                <span>UI/UX Design</span>
                <span>Product &amp; Graphics</span>
              </div>
            </div>

            {/* Column 4: Socials */}
            <div className="flex flex-col gap-4">
              <h4 className="text-xs font-bold tracking-widest text-zinc-500 uppercase">
                Socials
              </h4>
              <div className="flex flex-col gap-2.5">
                {[
                  { name: "LinkedIn", url: "https://linkedin.com" },
                  { name: "X / Twitter", url: "https://x.com" },
                  { name: "GitHub", url: "https://github.com" },
                  { name: "Instagram", url: "https://instagram.com" }
                ].map((social, idx) => (
                  <a
                    key={idx}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-sm font-medium text-zinc-400 hover:text-white transition-colors cursor-pointer group"
                  >
                    {social.name}
                    <Icon
                      name="arrow_outward"
                      className="text-xs transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      weight={600}
                    />
                  </a>
                ))}
              </div>
            </div>

          </div>

          {/* Bottom Copyright Row */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-12 border-t border-zinc-900 text-xs text-zinc-500">
            <span>
              &copy; {new Date().getFullYear()} Builders Hub. All rights reserved.
            </span>
            <div className="flex items-center gap-6">
              <a href="#" className="hover:text-white transition-colors cursor-pointer">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-white transition-colors cursor-pointer">
                Terms of Service
              </a>
            </div>
          </div>

        </div>
      </footer>
    </div>
  );
}

"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import Icon from "@/components/Icon";
import Showcase from "@/components/Showcase";
import { projects } from "../lib/projects";

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
      <main className="relative flex-1 flex items-center max-w-7xl w-full mx-auto px-6 pt-36 pb-20 z-10">

        <div className="flex flex-col items-start max-w-3xl w-full">

          {/* Copy column */}
          <motion.div
            initial={{ opacity: 0, y: 60, filter: "blur(20px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] as const }}
            className="flex flex-col items-start gap-8"
          >
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-zinc-950 leading-[1.08]">
              We Build Better Digital Products.
            </h1>

            <p className="text-zinc-500 text-base md:text-lg leading-relaxed max-w-2xl">
              We design and build high-performance web and mobile applications, bespoke platforms, and AI automations that move your business forward.
            </p>

            {/* Premium Capsule Button (Try Aura / smalltribe style) */}
            <div className="flex items-center gap-3">
              <a
                href="https://cal.com/builders-hub/introduction"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-6 py-3.5 rounded-full bg-brand-navy hover:bg-brand-navy-hover text-white text-sm font-semibold tracking-wide transition-all shadow-sm hover:shadow-lg hover:shadow-brand-900/10 hover:-translate-y-0.5"
              >
                Schedule a Call
              </a>
              <a
                href="https://cal.com/builders-hub/introduction"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full bg-brand-navy hover:bg-brand-navy-hover text-white flex items-center justify-center transition-all hover:shadow-lg hover:shadow-brand-900/10 hover:-translate-y-0.5 group"
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
                Built Around Your Business. <br />
                <span className="text-zinc-400">one team.</span>
              </h2>
            </div>
            <div className="max-w-xs md:text-right">
              <p className="text-zinc-500 text-sm leading-relaxed">
                Your business isn't like everyone else's. Your digital experience shouldn't be either.
              </p>
            </div>
          </div>
        </div>

        <div className="w-full mt-12 flex overflow-x-auto gap-6 pb-6 pt-4 scrollbar-hide px-6 md:px-20">
          {(() => {
            const accentStyles: Record<
              string,
              { pill: string; svgHover: string; border: string; ring: string }
            > = {
              indigo: { pill: "bg-indigo-50 text-indigo-700", svgHover: "group-hover:text-indigo-900/15", border: "hover:border-indigo-300/70", ring: "group-hover:bg-indigo-600 group-hover:text-white group-hover:border-indigo-600" },
              emerald: { pill: "bg-emerald-50 text-emerald-700", svgHover: "group-hover:text-emerald-900/15", border: "hover:border-emerald-300/70", ring: "group-hover:bg-emerald-600 group-hover:text-white group-hover:border-emerald-600" },
              orange: { pill: "bg-orange-50 text-orange-700", svgHover: "group-hover:text-orange-900/15", border: "hover:border-orange-300/70", ring: "group-hover:bg-orange-500 group-hover:text-white group-hover:border-orange-500" },
              pink: { pill: "bg-pink-50 text-pink-700", svgHover: "group-hover:text-pink-900/15", border: "hover:border-pink-300/70", ring: "group-hover:bg-pink-600 group-hover:text-white group-hover:border-pink-600" },
              teal: { pill: "bg-teal-50 text-teal-700", svgHover: "group-hover:text-teal-900/15", border: "hover:border-teal-300/70", ring: "group-hover:bg-teal-600 group-hover:text-white group-hover:border-teal-600" },
              rose: { pill: "bg-rose-50 text-rose-700", svgHover: "group-hover:text-rose-900/15", border: "hover:border-rose-300/70", ring: "group-hover:bg-rose-600 group-hover:text-white group-hover:border-rose-600" },
            };
            return [
            {
              label: "Websites & Web Apps",
              slug: "websites",
              accent: "indigo",
              desc: "We design and develop fast, responsive websites and web applications tailored to your business, from corporate websites and landing pages to interactive platforms and custom web products.",
              icon: "web",
              svg: (
                <svg className="w-24 h-24" viewBox="0 0 100 100" fill="none">
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
              slug: "mobile",
              accent: "emerald",
              desc: "We build intuitive mobile applications that give your customers a seamless way to interact with your products, services, and digital experiences across iOS and Android.",
              icon: "phone_iphone",
              svg: (
                <svg className="w-24 h-24" viewBox="0 0 100 100" fill="none">
                  <rect x="30" y="15" width="40" height="70" rx="8" stroke="currentColor" strokeWidth="2" />
                  <circle cx="50" cy="77" r="3" fill="currentColor" />
                  <line x1="45" y1="22" x2="55" y2="22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              )
            },
            {
              label: "Backend Systems",
              slug: "backend",
              accent: "orange",
              desc: "We build secure APIs, databases, server-side systems, and cloud infrastructure that keep your digital products reliable, connected, and ready to scale.",
              icon: "dns",
              svg: (
                <svg className="w-24 h-24" viewBox="0 0 100 100" fill="none">
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
              slug: "automation",
              accent: "pink",
              desc: "We use AI, automation, and integrations to streamline workflows, reduce manual processes, and help businesses work more efficiently.",
              icon: "settings_suggest",
              svg: (
                <svg className="w-24 h-24" viewBox="0 0 100 100" fill="none">
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
              slug: "design",
              accent: "teal",
              desc: "We turn ideas and business requirements into clear, intuitive interfaces — from early wireframes and user flows to polished high-fidelity designs and complete design systems.",
              icon: "palette",
              svg: (
                <svg className="w-24 h-24" viewBox="0 0 100 100" fill="none">
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
              slug: "graphics",
              accent: "rose",
              desc: "We create the visual assets your business needs to communicate consistently across digital products, marketing, presentations, and other brand touchpoints.",
              icon: "brush",
              svg: (
                <svg className="w-24 h-24" viewBox="0 0 100 100" fill="none">
                  <circle cx="40" cy="50" r="20" stroke="currentColor" strokeWidth="2" />
                  <circle cx="60" cy="50" r="20" stroke="currentColor" strokeWidth="2" />
                  <path d="M50 30 L53 45 L68 48 L53 51 L50 66 L47 51 L32 48 L47 45 Z" fill="currentColor" />
                </svg>
              )
            }
            ].map((service) => {
              const accent = accentStyles[service.accent];
              const count = projects.filter((p) => p.service === service.slug).length;
              return (
                <Link
                  key={service.slug}
                  href={`/work?service=${service.slug}`}
                  className={`min-w-[280px] md:min-w-[320px] flex-1 bg-zinc-50 rounded-3xl border border-zinc-200/80 p-8 flex flex-col justify-between gap-8 group cursor-pointer transition-colors duration-300 ${accent.border}`}
                >
                  <div className="flex flex-col gap-6">
                    {/* Top Label Pill, tinted per service */}
                    <div className={`self-start px-4 py-2 rounded-full text-xs font-semibold tracking-wide ${accent.pill}`}>
                      {service.label}
                    </div>

                    {/* Service Graphic Illustration, tinted with the service's accent */}
                    <div className={`py-6 flex items-center justify-center text-zinc-900/[0.06] transition-colors duration-300 group-hover:scale-105 ${accent.svgHover}`}>
                      {service.svg}
                    </div>
                  </div>

                  <div className="flex flex-col gap-4">
                    {/* Description Paragraph */}
                    <p className="text-zinc-500 text-xs md:text-sm leading-relaxed">
                      {service.desc}
                    </p>

                    <div className="flex items-center justify-between pt-1">
                      <span className="text-[11px] font-bold text-zinc-400">
                        {count > 0 ? `${count} project${count > 1 ? "s" : ""} shipped` : "See related work"}
                      </span>
                      {/* Circular Arrow Button, filling with the service accent on hover */}
                      <div className={`w-10 h-10 rounded-full border border-zinc-200 bg-white flex items-center justify-center text-zinc-600 transition-all duration-300 ${accent.ring}`}>
                        <Icon name="arrow_outward" className="text-sm" weight={600} />
                      </div>
                    </div>
                  </div>
                </Link>
              );
            });
          })()}
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
            {/* Left Column: Layered image treatment — a structural frame behind the abstract shot */}
            <div className="md:col-span-6 relative aspect-square">
              <div className="absolute -bottom-4 -right-4 w-full h-full rounded-3xl border border-zinc-200/80 bg-white hidden md:block" />
              <div className="relative w-full h-full rounded-3xl overflow-hidden border border-zinc-200/60 bg-black">
                <Image
                  src="/abstract.png"
                  alt="Builders Hub abstract design graphic"
                  fill
                  className="object-cover"
                  priority
                />
                {/* <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between rounded-2xl bg-white/90 backdrop-blur-sm px-4 py-3">
                  <span className="text-[11px] font-bold text-zinc-800">Founded to sit on the client&apos;s side of the table</span>
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shrink-0" />
                </div> */}
              </div>
            </div>

            {/* Right Column: Key Details & Values Description */}
            <div className="md:col-span-6 flex flex-col gap-6 justify-center">
              <span className="text-xs font-bold tracking-widest text-zinc-400 uppercase">
                About Us
              </span>
              <h3 className="text-2xl md:text-3xl font-extrabold tracking-tight text-zinc-950 leading-tight">
                We Don't Just Build Websites. We Build Digital Foundations.
              </h3>
              <p className="text-zinc-500 text-sm md:text-base leading-relaxed">
                  Builders Hub is a web design and development agency helping businesses across Nigeria build a stronger presence online.

                  We combine strategy, UI/UX design, development, and business thinking to create digital experiences that don't just look good, they have a purpose.

                  Because a website should do more than exist.

                  It should help your business move forward.              
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
              Built for Businesses. Proven by People.
            </h2>
            <p className="text-zinc-500 text-sm md:text-base max-w-lg leading-relaxed">
              Every project starts with a business problem. These are the stories of what happened when we built around it.
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
                <svg className="w-8 h-8 text-zinc-200 group-hover:text-brand-100 transition-colors duration-300" viewBox="0 0 32 24" fill="currentColor">
                  <path d="M0 24V14.4C0 9.87 1.28 6.187 3.84 3.36 6.4 1.12 9.653 0 13.6 0v5.76c-2.027 0-3.68.64-4.96 1.92-1.173 1.173-1.867 2.667-2.08 4.48H12v11.84H0Zm17.6 0V14.4c0-4.53 1.28-8.213 3.84-11.04C24 1.12 27.253 0 31.2 0v5.76c-2.027 0-3.68.64-4.96 1.92-1.173 1.173-1.867 2.667-2.08 4.48H29.6v11.84H17.6Z" />
                </svg>
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

          <div className="flex w-max animate-marquee gap-12 items-center">
            {/* First Set */}
            {["FREENOW", "ORANGE", "AUSHA", "STRIPE", "VERCEL", "FIGMA", "GITHUB", "NEXT.JS"].map((brand, i) => (
              <span key={i} className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-zinc-200/70 select-none">
                <span className="w-6 h-6 rounded-full bg-zinc-900 text-white text-[10px] font-extrabold flex items-center justify-center shrink-0">
                  {brand.charAt(0)}
                </span>
                <span className="text-sm font-mono font-extrabold tracking-widest text-zinc-400 uppercase">
                  {brand}
                </span>
              </span>
            ))}
            {/* Duplicated Set for Infinite Loop */}
            {["FREENOW", "ORANGE", "AUSHA", "STRIPE", "VERCEL", "FIGMA", "GITHUB", "NEXT.JS"].map((brand, i) => (
              <span key={`dup-${i}`} className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-zinc-200/70 select-none">
                <span className="w-6 h-6 rounded-full bg-zinc-900 text-white text-[10px] font-extrabold flex items-center justify-center shrink-0">
                  {brand.charAt(0)}
                </span>
                <span className="text-sm font-mono font-extrabold tracking-widest text-zinc-400 uppercase">
                  {brand}
                </span>
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

                {/* Connecting track running through every stage, reinforcing this is one continuous flow */}
                <div className="absolute left-4 right-4 top-1/2 -translate-y-1/2 h-px bg-zinc-100 pointer-events-none" />
                <div className="absolute left-4 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-brand-900 pointer-events-none" />
                <div className="absolute right-4 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full border-2 border-zinc-200 bg-white pointer-events-none" />

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
        className="relative bg-white py-28 z-10 w-full overflow-hidden"
      >
        <div className="max-w-7xl mx-auto w-full px-6 flex flex-col items-center">

          {/* Header Title & Intro */}
          <div className="flex flex-col items-center text-center max-w-2xl mx-auto mb-16 px-4">
            <span className="text-xs font-semibold tracking-widest text-zinc-400 uppercase mb-3">
              Expertise
            </span>
            <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl text-zinc-950 font-normal tracking-tight leading-tight mb-4">
              Why choose us?
            </h2>
            <p className="text-zinc-500 text-base md:text-lg leading-relaxed max-w-lg">
              Because your website shouldn't be built in isolation from your business.
            </p>
          </div>

          {/* Minimalist Colored Craft Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-6xl mx-auto pt-4 pb-8">
            
            {/* Card 1: Vermilion Orange */}
            <div className="bg-[#F04623] rounded-[2rem] p-8 min-h-[460px] flex flex-col justify-between lg:-rotate-3 lg:hover:rotate-0 transition-transform duration-300 ease-out cursor-pointer hover:-translate-y-3">
              <div className="w-full flex justify-center pt-2">
                <svg className="w-full h-36" viewBox="0 0 240 140" fill="none">
                  {Array.from({ length: 42 }).map((_, i) => {
                    const x = 12 + i * 5.2;
                    const progress = i / 41;
                    const y1 = 12;
                    const y2 = 30 + progress * 95;
                    return (
                      <line
                        key={i}
                        x1={x}
                        y1={y1}
                        x2={x}
                        y2={y2}
                        stroke="#FFFFFF"
                        strokeWidth="1.5"
                        strokeOpacity={0.85}
                      />
                    );
                  })}
                </svg>
              </div>
              <div className="flex flex-col gap-3">
                <h3 className="font-serif text-2xl sm:text-[1.65rem] font-normal leading-tight text-white">
                  We Start With the Business
                </h3>
                <p className="text-white/85 text-sm leading-relaxed">
                  We look beyond pages and features to understand what the website actually needs to accomplish.
                </p>
              </div>
            </div>

            {/* Card 2: Warm Sand / Cream */}
            <div className="bg-[#EFE8DD] rounded-[2rem] p-8 min-h-[460px] flex flex-col justify-between lg:-rotate-1 lg:hover:rotate-0 transition-transform duration-300 ease-out cursor-pointer hover:-translate-y-3">
              <div className="w-full flex justify-center pt-2">
                <svg className="w-full h-36" viewBox="0 0 240 140" fill="none">
                  {Array.from({ length: 14 }).map((_, col) =>
                    Array.from({ length: 8 }).map((_, row) => {
                      const opacities = [0.15, 0.25, 0.45, 0.6, 0.75, 0.35, 0.5, 0.2];
                      const opacity = opacities[(col * 3 + row * 5) % opacities.length];
                      return (
                        <rect
                          key={`${col}-${row}`}
                          x={14 + col * 15}
                          y={12 + row * 15}
                          width="11"
                          height="11"
                          rx="1"
                          fill="#524C44"
                          fillOpacity={opacity}
                        />
                      );
                    })
                  )}
                </svg>
              </div>
              <div className="flex flex-col gap-3">
                <h3 className="font-serif text-2xl sm:text-[1.65rem] font-normal leading-tight text-zinc-950">
                  We Design for Action
                </h3>
                <p className="text-zinc-700 text-sm leading-relaxed">
                  Every important page should lead visitors somewhere. Call, WhatsApp, book, order, enquire, apply, or buy.
                </p>
              </div>
            </div>

            {/* Card 3: Electric Blue */}
            <div className="bg-[#0084FF] rounded-[2rem] p-8 min-h-[460px] flex flex-col justify-between lg:rotate-1 lg:hover:rotate-0 transition-transform duration-300 ease-out cursor-pointer hover:-translate-y-3">
              <div className="w-full flex justify-center pt-2">
                <svg className="w-full h-36" viewBox="0 0 240 140" fill="none">
                  {Array.from({ length: 22 }).map((_, i) => {
                    const y = 14 + i * 5.2;
                    const amp = Math.sin((i / 21) * Math.PI) * 9;
                    return (
                      <path
                        key={i}
                        d={`M 14 ${y} Q 70 ${y - amp} 120 ${y} T 226 ${y}`}
                        stroke="#FFFFFF"
                        strokeWidth="1.2"
                        strokeOpacity={0.75}
                      />
                    );
                  })}
                </svg>
              </div>
              <div className="flex flex-col gap-3">
                <h3 className="font-serif text-2xl sm:text-[1.65rem] font-normal leading-tight text-white">
                  Strategy Meets Design
                </h3>
                <p className="text-white/85 text-sm leading-relaxed">
                  We bring business thinking, UI/UX, and development together instead of treating them as separate pieces.
                </p>
              </div>
            </div>

            {/* Card 4: Vivid Spring Green */}
            <div className="bg-[#00DF73] rounded-[2rem] p-8 min-h-[460px] flex flex-col justify-between lg:rotate-3 lg:hover:rotate-0 transition-transform duration-300 ease-out cursor-pointer hover:-translate-y-3">
              <div className="w-full flex justify-center pt-2">
                <svg className="w-full h-36" viewBox="0 0 240 140" fill="none">
                  {Array.from({ length: 30 }).map((_, col) =>
                    Array.from({ length: 7 }).map((_, row) => {
                      const isVisible = (col + row * 3) % 4 !== 0;
                      return isVisible ? (
                        <rect
                          key={`${col}-${row}`}
                          x={16 + col * 7}
                          y={14 + row * 16}
                          width="4"
                          height="12"
                          rx="1"
                          fill="#0A381E"
                          fillOpacity={0.8}
                        />
                      ) : null;
                    })
                  )}
                </svg>
              </div>
              <div className="flex flex-col gap-3">
                <h3 className="font-serif text-2xl sm:text-[1.65rem] font-normal leading-tight text-zinc-950">
                  Built Around Your Customers
                </h3>
                <p className="text-zinc-900/80 text-sm leading-relaxed">
                  Different businesses have different customers, journeys, and expectations. We design accordingly.
                </p>
              </div>
            </div>

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
              We engineer tailored solutions rather than copy-pasting code templates. Every business is different, so we don't believe in forcing every project into the same box. Talk with us to get a custom roadmap and proposal.
            </p>
          </div>

          {/* Pricing Card + What-Happens-Next Rail */}
          <div className="max-w-4xl mx-auto w-full mt-6 grid grid-cols-1 md:grid-cols-12 gap-6">
            {/* Consultation Pricing Card */}
            <div className="md:col-span-7 bg-zinc-50 rounded-3xl border border-zinc-200/80 p-8 md:p-10 flex flex-col gap-8 justify-between hover:border-brand-navy/30 transition-all duration-300">
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
                  Don't know which one you need? Tell us what you're trying to achieve. We'll recommend the right approach.
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

            {/* What happens after the call */}
            <div className="md:col-span-5 bg-brand-navy rounded-3xl p-8 md:p-10 flex flex-col gap-8 justify-center">
              <span className="text-xs font-bold tracking-widest text-brand-100/70 uppercase">
                After the call
              </span>
              <div className="flex flex-col gap-6">
                {[
                  { step: "1", title: "Proposal", desc: "Scope, timeline, and price, tailored to what we heard." },
                  { step: "2", title: "Deposit & onboarding", desc: "We collect brand assets and access, then get to work." },
                  { step: "3", title: "Build & launch", desc: "Design, development, QA, then your system goes live." },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-4">
                    <span className="w-7 h-7 rounded-full border border-white/20 text-white text-[11px] font-bold flex items-center justify-center shrink-0">
                      {item.step}
                    </span>
                    <div className="flex flex-col gap-0.5">
                      <span className="text-sm font-bold text-white">{item.title}</span>
                      <span className="text-xs text-brand-100/70 leading-relaxed">{item.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
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
              Have a Business to Build? Let's Talk.
            </h2>
            <p className="text-zinc-500 text-sm md:text-base leading-relaxed mt-2">
              Whether you're starting from scratch, redesigning an existing website, or looking to solve a bigger digital problem, tell us what you're working on.
            </p>
          </div>

          {/* Form Content Split Layout (No shadows, borders only) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mt-6 items-start">

            {/* Left Column: Direct Info */}
            <div className="lg:col-span-4 flex flex-col gap-8">
              <div className="flex flex-col gap-4">
                <div className="w-11 h-11 rounded-full bg-brand-navy flex items-center justify-center text-white">
                  <Icon name="mail" className="text-lg" />
                </div>
                <span className="text-xs font-bold text-zinc-400 uppercase tracking-widest">
                  Chat to us
                </span>
                <p className="text-sm text-zinc-500">
                  Our team reads every message personally and answers within 24 hours.
                </p>
                <a
                  href="mailto:hello@buildershub.co"
                  className="text-sm font-bold text-brand-navy hover:text-brand-navy-hover transition-colors cursor-pointer -mt-1"
                >
                  hello@buildershub.co
                </a>
              </div>

              <div className="flex flex-col gap-3 pt-6 border-t border-zinc-200/60">
                <div className="flex items-center gap-3 text-sm text-zinc-600">
                  <Icon name="location_on" className="text-base text-zinc-400" />
                  Lagos, Nigeria. Working with clients worldwide
                </div>
                <div className="flex items-center gap-3 text-sm text-zinc-600">
                  <Icon name="schedule" className="text-base text-zinc-400" />
                  Replies within 24 hours
                </div>
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
        {/* Ambient backdrop: soft radial glow + fine dot grid, echoing the "systems + art" duality */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.35]"
          style={{ backgroundImage: "radial-gradient(circle, #d4d4d8 1px, transparent 1px)", backgroundSize: "28px 28px" }}
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-brand-100/40 blur-3xl pointer-events-none" />

        <div className="relative max-w-4xl mx-auto px-6 flex flex-col gap-6 items-center">
          <h2 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tighter text-zinc-950 uppercase leading-[1.15] flex flex-col gap-2 select-none">
            <span className="flex items-center justify-center gap-4 flex-wrap">
               Your
              <span className="inline-flex text-xs font-mono font-bold tracking-widest bg-emerald-100 text-emerald-800 px-4 py-2 rounded-full uppercase">
              Business
              </span>
              Has Already Been Built.
            </span>
            <span className="flex items-center justify-center gap-4 flex-wrap">
              Now Let's
              <span className="inline-flex text-xs font-mono font-bold tracking-widest bg-indigo-100 text-indigo-800 px-4 py-2 rounded-full uppercase">
                Build
              </span>
              Its Digital Presence
            </span>
            <span className="flex items-center justify-center gap-4 flex-wrap">
              
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
                {[
                  { label: "Websites & Web Apps", slug: "websites" },
                  { label: "Mobile Applications", slug: "mobile" },
                  { label: "Backend Systems", slug: "backend" },
                  { label: "AI & Automations", slug: "automation" },
                  { label: "UI/UX Design", slug: "design" },
                  { label: "Product & Graphics", slug: "graphics" },
                ].map((service) => (
                  <Link
                    key={service.slug}
                    href={`/work?service=${service.slug}`}
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    {service.label}
                  </Link>
                ))}
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
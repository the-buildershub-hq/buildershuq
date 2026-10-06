"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import Icon from "@/components/Icon";
import Showcase from "@/components/Showcase";
function ActionCursor({
  name,
  pointerColor = "#18181b",
  tagBg = "bg-zinc-900",
  animate,
  transition,
}: {
  name: string;
  pointerColor?: string;
  tagBg?: string;
  animate: { x: number[]; y: number[] };
  transition: any;
}) {
  return (
    <motion.div
      animate={animate}
      transition={transition}
      className="absolute pointer-events-none select-none z-20 flex items-start"
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-4 h-4 shrink-0"
      >
        <path
          d="M1 1L6 14L8.5 8.5L14 6L1 1Z"
          fill={pointerColor}
        />
      </svg>
      <span
        className={`-ml-1 mt-2.5 px-1.5 py-0.5 rounded text-[10px] font-semibold text-white tracking-tight leading-none ${tagBg}`}
      >
        {name}
      </span>
    </motion.div>
  );
}

export default function Home() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", description: "" });
  const [submitStatus, setSubmitStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [selectedServices, setSelectedServices] = useState<string[]>(["Websites"]);

  const toggleService = (service: string) => {
    setSelectedServices((prev) =>
      prev.includes(service)
        ? prev.length > 1
          ? prev.filter((s) => s !== service)
          : prev
        : [...prev, service]
    );
  };

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
      const fullDescription =
        selectedServices.length > 0
          ? `Selected services: ${selectedServices.join(", ")}\n\n${formData.description}`
          : formData.description;

      const response = await fetch("https://x8ki-letl-twmt.n7.xano.io/api:7-0SUSqX/save_contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          description: fullDescription,
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

      <header className="fixed top-4 left-0 right-0 z-50 px-4 flex justify-center">
        <nav className="mx-auto max-w-5xl w-full h-14 flex items-center justify-between px-5 rounded-full bg-white/85 backdrop-blur-md">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="flex items-center gap-1.5 cursor-pointer"
          >
            <Image
              src="/logo.png"
              alt="Builders Hub Logo"
              width={32}
              height={32}
              className="h-8 w-auto object-contain"
              priority
            />
            <span className="font-extrabold text-sm tracking-tight text-zinc-950">
              Builders Hub
            </span>
          </a>

          <div className="hidden lg:flex items-center gap-6">
            <a
              href="#about"
              onClick={(e) => handleScroll(e, "about")}
              className="text-xs font-semibold text-zinc-600 hover:text-zinc-950 transition-colors"
            >
              About Us
            </a>
            <a
              href="#services"
              onClick={(e) => handleScroll(e, "services")}
              className="text-xs font-semibold text-zinc-600 hover:text-zinc-950 transition-colors"
            >
              Services
            </a>
            <a
              href="#showcase"
              onClick={(e) => handleScroll(e, "showcase")}
              className="text-xs font-semibold text-zinc-600 hover:text-zinc-950 transition-colors"
            >
              Showcase
            </a>
            <a
              href="#reviews"
              onClick={(e) => handleScroll(e, "reviews")}
              className="text-xs font-semibold text-zinc-600 hover:text-zinc-950 transition-colors"
            >
              Reviews
            </a>
            <a
              href="#timeline"
              onClick={(e) => handleScroll(e, "timeline")}
              className="text-xs font-semibold text-zinc-600 hover:text-zinc-950 transition-colors"
            >
              Timeline
            </a>
            <a
              href="#pricing"
              onClick={(e) => handleScroll(e, "pricing")}
              className="text-xs font-semibold text-zinc-600 hover:text-zinc-950 transition-colors"
            >
              Pricing
            </a>
          </div>

          <div className="flex items-center gap-2">
            <a
              href="https://cal.com/builders-hub/introduction"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-zinc-950 hover:bg-zinc-800 text-white text-xs font-semibold tracking-wide transition-colors"
            >
              Schedule a Call
              <Icon name="arrow_outward" className="text-xs" weight={600} />
            </a>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="flex lg:hidden items-center justify-center p-2 rounded-full bg-zinc-100 text-zinc-950 cursor-pointer focus:outline-none"
            >
              <Icon name={isMobileMenuOpen ? "close" : "menu"} className="text-lg" />
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
              className="fixed top-20 left-4 right-4 z-40 bg-white rounded-3xl p-6 flex flex-col gap-4 lg:hidden text-zinc-950"
            >
              <div className="flex flex-col gap-4">
                {[
                  { label: "About Us", target: "about" },
                  { label: "Services", target: "services" },
                  { label: "Showcase", target: "showcase" },
                  { label: "Reviews", target: "reviews" },
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
                    className="text-base font-semibold text-zinc-800 hover:text-zinc-950 transition-colors"
                  >
                    {item.label}
                  </a>
                ))}
              </div>
              <div className="pt-2">
                <a
                  href="https://cal.com/builders-hub/introduction"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="inline-flex w-full items-center justify-center gap-1.5 px-5 py-3 rounded-full bg-zinc-950 text-white text-sm font-semibold tracking-wide cursor-pointer"
                >
                  Schedule a Call
                  <Icon name="arrow_outward" className="text-sm" weight={600} />
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Main Hero Container: Centered Layout with Floating Scattered Elements */}
      <main className="relative flex-1 flex flex-col items-center justify-center min-h-[85vh] max-w-7xl w-full mx-auto px-6 pt-36 pb-36 sm:pb-48 z-10 overflow-hidden">

        {/* Floating Visual Constellation (Inspired by iPartyLabs, Take a screenshot, and Nothing Playground) */}
        <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">

          {/* Card 1: Top Left Photo Tile */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1, y: [0, -6, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.1 }}
            className="hidden md:block absolute top-12 left-6 lg:left-16 -rotate-6 w-40 h-28 lg:w-48 lg:h-32 rounded-2xl overflow-hidden bg-zinc-100"
          >
            <Image
              src="/pricing-consultation.jpg"
              alt=""
              fill
              className="object-cover grayscale contrast-125"
            />
          </motion.div>

          {/* Card 2: Top Right Warm Sand Tile */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1, y: [0, 8, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
            className="hidden md:flex absolute top-14 right-6 lg:right-20 rotate-6 w-36 h-44 lg:w-40 lg:h-48 rounded-2xl bg-[#EFE8DD] p-4 flex-col justify-between"
          >
            <div className="w-full flex justify-center opacity-60">
              <svg className="w-full h-16" viewBox="0 0 100 60" fill="#524C44">
                <rect x="10" y="8" width="10" height="10" rx="2" fillOpacity="0.4" />
                <rect x="26" y="8" width="10" height="10" rx="2" fillOpacity="0.7" />
                <rect x="42" y="8" width="10" height="10" rx="2" fillOpacity="0.3" />
                <rect x="58" y="8" width="10" height="10" rx="2" fillOpacity="0.8" />
                <rect x="74" y="8" width="10" height="10" rx="2" fillOpacity="0.5" />
                <rect x="10" y="24" width="10" height="10" rx="2" fillOpacity="0.7" />
                <rect x="26" y="24" width="10" height="10" rx="2" fillOpacity="0.3" />
                <rect x="42" y="24" width="10" height="10" rx="2" fillOpacity="0.9" />
                <rect x="58" y="24" width="10" height="10" rx="2" fillOpacity="0.4" />
                <rect x="74" y="24" width="10" height="10" rx="2" fillOpacity="0.6" />
              </svg>
            </div>
            <span className="font-serif text-sm text-zinc-950 font-normal">Customer Portal</span>
          </motion.div>

          {/* Card 3: Middle Left Electric Blue Tile */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1, y: [0, -8, 0] }}
            transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            className="hidden lg:flex absolute top-1/2 -translate-y-1/2 left-4 rotate-3 w-40 h-28 rounded-2xl bg-[#0084FF] p-4 text-white flex-col justify-between"
          >
            <div className="w-full opacity-80">
              <svg className="w-full h-12" viewBox="0 0 100 40" fill="none" stroke="#ffffff" strokeWidth="2">
                <path d="M 10 12 Q 50 4 90 12" />
                <path d="M 10 24 Q 50 16 90 24" />
              </svg>
            </div>
            <span className="font-serif text-sm font-normal">Mobile App</span>
          </motion.div>

          {/* Card 4: Middle Right Vermilion Tile */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1, y: [0, 7, 0] }}
            transition={{ duration: 7.5, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
            className="hidden lg:flex absolute top-1/2 -translate-y-1/2 right-4 -rotate-6 w-40 h-28 rounded-2xl bg-[#F04623] p-4 text-white flex-col justify-between"
          >
            <div className="w-full opacity-85">
              <svg className="w-full h-12" viewBox="0 0 100 40" fill="none" stroke="#ffffff" strokeWidth="2">
                <line x1="15" y1="6" x2="15" y2="28" />
                <line x1="30" y1="6" x2="30" y2="34" />
                <line x1="45" y1="6" x2="45" y2="22" />
                <line x1="60" y1="6" x2="60" y2="36" />
                <line x1="75" y1="6" x2="75" y2="26" />
              </svg>
            </div>
            <span className="font-serif text-sm font-normal">Online Store</span>
          </motion.div>

          {/* Card 5: Bottom Left Dark Interface Tile */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1, y: [0, 6, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
            className="hidden md:flex absolute bottom-8 left-8 lg:left-24 -rotate-3 w-40 h-28 lg:w-44 lg:h-32 rounded-2xl bg-zinc-900 p-4 text-white flex-col justify-between"
          >
            <div className="flex flex-col gap-1.5 opacity-60">
              <div className="w-16 h-2 rounded bg-zinc-700" />
              <div className="w-24 h-2 rounded bg-zinc-800" />
            </div>
            <span className="font-serif text-sm font-normal">Fast Checkout</span>
          </motion.div>

          {/* Card 6: Bottom Right Vivid Mint Tile */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1, y: [0, -7, 0] }}
            transition={{ duration: 6.8, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
            className="hidden md:flex absolute bottom-10 right-8 lg:right-24 rotate-6 w-40 h-28 lg:w-44 lg:h-32 rounded-2xl bg-[#00DF73] p-4 text-zinc-950 flex-col justify-between"
          >
            <div className="flex gap-1.5 opacity-70">
              <div className="w-2 h-8 rounded bg-zinc-950" />
              <div className="w-2 h-6 rounded bg-zinc-950" />
              <div className="w-2 h-10 rounded bg-zinc-950" />
              <div className="w-2 h-5 rounded bg-zinc-950" />
            </div>
            <span className="font-serif text-sm font-normal">Simple Tools</span>
          </motion.div>

        </div>

        {/* Central Hero Copy and Actions */}
        <motion.div
          initial={{ opacity: 0, y: 30, filter: "blur(12px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] as const }}
          className="relative z-20 max-w-3xl mx-auto flex flex-col items-center text-center gap-6"
        >
          <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl font-normal tracking-tight text-zinc-950 leading-[1.12]">
            We build websites and apps that help your business grow
          </h1>

          <p className="text-zinc-600 text-base sm:text-lg leading-relaxed max-w-xl">
            You focus on running your business while we handle the technology. We create clean websites, mobile apps, and tools that make life easier for you and your customers.
          </p>

          <div className="flex items-center gap-4 pt-2">
            <a
              href="https://cal.com/builders-hub/introduction"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-3.5 rounded-full bg-zinc-950 hover:bg-zinc-800 text-white text-sm font-semibold tracking-wide transition-colors"
            >
              Schedule a Call
            </a>
            <Link
              href="/work"
              className="inline-flex items-center justify-center px-8 py-3.5 rounded-full bg-zinc-200/70 hover:bg-zinc-200 text-zinc-900 text-sm font-semibold tracking-wide transition-colors"
            >
              See Our Work
            </Link>
          </div>
        </motion.div>

      </main>

      {/* About Us Section (Centered architectural composition inspired by reference screenshot) */}
      <motion.section
        id="about"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={sectionVariants}
        className="relative bg-black text-white pt-36 sm:pt-48 pb-32 sm:pb-44 z-10 w-full overflow-hidden"
      >
        {/* Ambient radial glow backdrop behind the cube and center */}
        <div className="absolute left-1/2 top-2/3 -translate-x-1/2 -translate-y-1/2 w-[700px] sm:w-[900px] h-[500px] rounded-full bg-zinc-900/60 blur-3xl pointer-events-none" />

        {/* Sweeping architectural dome and orbital arc lines from screenshot */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
          <svg
            viewBox="0 0 1400 700"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full max-w-7xl h-auto opacity-35"
          >
            <path
              d="M 50 640 C 350 80, 1050 80, 1350 640"
              stroke="rgba(255, 255, 255, 0.22)"
              strokeWidth="1.5"
            />
            <path
              d="M 120 660 C 400 160, 1000 160, 1280 660"
              stroke="rgba(255, 255, 255, 0.1)"
              strokeWidth="1"
              strokeDasharray="8 8"
            />
          </svg>
        </div>

        <div className="relative max-w-5xl mx-auto w-full px-6 flex flex-col items-center text-center z-10">
          
          {/* Header & Typography */}
          <span className="text-xs font-mono font-bold tracking-widest text-zinc-400 uppercase">
            About Us
          </span>

          <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-normal tracking-tight text-white leading-[1.14] max-w-3xl mt-4">
            We do not just build websites. We build digital foundations.
          </h2>

          <div className="flex flex-col gap-4 text-zinc-400 text-sm sm:text-base md:text-lg max-w-2xl leading-relaxed mt-6">
            <p>
              Builders Hub is a web design and development agency helping businesses across Nigeria build a stronger presence online.
            </p>
            <p>
              We combine strategy, UI/UX design, development, and business thinking to create digital experiences that do not just look good, they have a purpose.
            </p>
            <p className="text-white font-medium text-base sm:text-lg">
              Because a website should do more than exist. It should help your business move forward.
            </p>
          </div>

          {/* Immersive Animated 3D Cube */}
          <div className="relative w-full max-w-[480px] sm:max-w-[580px] md:max-w-[680px] aspect-square flex items-center justify-center mt-12 sm:mt-16">
            {/* Soft floor light pool */}
            <div className="absolute inset-x-8 bottom-8 h-32 rounded-full bg-zinc-800/40 blur-2xl pointer-events-none" />

            <motion.div
              animate={{
                y: [0, -16, 0],
                rotate: [0, 1, 0],
              }}
              transition={{
                duration: 7,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              whileHover={{ scale: 1.03 }}
              className="relative w-full h-full select-none cursor-default"
            >
              <Image
                src="/abstract.png"
                alt="Builders Hub digital foundation cube"
                fill
                className="object-contain"
                priority
              />
            </motion.div>
          </div>

        </div>
      </motion.section>

      {/* Services Section Moved After About Us */}
      <motion.section
        id="services"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={sectionVariants}
        className="relative bg-zinc-50 py-24 sm:py-32 z-10 w-full"
      >
        <div className="max-w-7xl mx-auto w-full px-6 flex flex-col gap-12">

          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div className="max-w-md">
              <span className="text-xs font-mono font-bold tracking-widest text-zinc-400 uppercase">
                Services
              </span>
              <h2 className="font-serif text-4xl md:text-5xl font-normal tracking-tight text-zinc-950 leading-tight mt-2">
                Built Around Your Business. <br />
                <span className="text-zinc-400">one team.</span>
              </h2>
            </div>
            <div className="max-w-xs md:text-right">
              <p className="text-zinc-500 text-sm leading-relaxed">
                Your business is not like everyone else. Your digital experience should not be either.
              </p>
            </div>
          </div>

          {/* Homogeneous Editorial Slabs with Collaborative Animated Action Canvases */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
            
            {/* 01 Websites and Web Apps */}
            <Link
              href="/work?service=websites"
              className="bg-white rounded-3xl p-7 sm:p-8 flex flex-col justify-between gap-6 group cursor-pointer transition-transform duration-300 hover:-translate-y-1"
            >
              <div className="flex flex-col gap-3">
                <span className="text-xs font-mono font-bold tracking-wider text-zinc-400 uppercase">
                  01
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-normal text-zinc-950 leading-snug">
                  Websites and Web Apps
                </h3>
                <p className="text-zinc-600 text-sm leading-relaxed mt-1">
                  We design and develop fast, responsive websites and web applications tailored to your business, from corporate websites and landing pages to interactive platforms and custom web products.
                </p>
              </div>

              {/* Action Canvas: Web Browser Layout with Click Simulation */}
              <div className="w-full h-44 rounded-2xl bg-zinc-100/70 p-4 relative overflow-hidden flex flex-col justify-between select-none">
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-zinc-300" />
                  <div className="w-2 h-2 rounded-full bg-zinc-300" />
                  <div className="w-2 h-2 rounded-full bg-zinc-300" />
                </div>
                <div className="flex flex-col gap-2 my-auto">
                  <div className="h-3 w-28 bg-zinc-300 rounded" />
                  <div className="h-2 w-44 bg-zinc-200 rounded mt-0.5" />
                  <motion.div
                    animate={{ scale: [1, 0.94, 1] }}
                    transition={{ duration: 4.5, repeat: Infinity, times: [0, 0.5, 1], ease: "easeInOut" }}
                    className="mt-1 h-6 px-3 bg-zinc-950 text-white text-[9px] font-medium rounded flex items-center justify-center w-fit"
                  >
                    Explore Platform
                  </motion.div>
                </div>
                <ActionCursor
                  name="necati"
                  pointerColor="#f97316"
                  tagBg="bg-orange-500"
                  animate={{
                    x: [20, 140, 80, 20],
                    y: [15, 68, 32, 15],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              </div>
            </Link>

            {/* 02 Mobile Applications */}
            <Link
              href="/work?service=mobile"
              className="bg-zinc-100 rounded-3xl p-7 sm:p-8 flex flex-col justify-between gap-6 group cursor-pointer transition-transform duration-300 hover:-translate-y-1"
            >
              <div className="flex flex-col gap-3">
                <span className="text-xs font-mono font-bold tracking-wider text-zinc-400 uppercase">
                  02
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-normal text-zinc-950 leading-snug">
                  Mobile Applications
                </h3>
                <p className="text-zinc-600 text-sm leading-relaxed mt-1">
                  We build intuitive mobile applications that give your customers a seamless way to interact with your products, services, and digital experiences across iOS and Android.
                </p>
              </div>

              {/* Action Canvas: Mobile Device Screen with Tab Navigation */}
              <div className="w-full h-44 rounded-2xl bg-white p-4 relative overflow-hidden flex items-center justify-center select-none">
                <div className="w-48 h-36 bg-zinc-50 rounded-xl p-3 flex flex-col justify-between relative">
                  <div className="flex items-center justify-between">
                    <div className="h-2 w-12 bg-zinc-300 rounded" />
                    <span className="text-[9px] font-mono text-zinc-400">09:41</span>
                  </div>
                  <div className="bg-white rounded-lg p-2 flex items-center gap-2.5">
                    <div className="w-6 h-6 rounded-md bg-zinc-200" />
                    <div className="flex flex-col gap-1 flex-1">
                      <div className="h-2 w-16 bg-zinc-300 rounded" />
                      <div className="h-1.5 w-10 bg-zinc-200 rounded" />
                    </div>
                  </div>
                  <div className="flex items-center justify-around pt-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-zinc-950" />
                    <div className="w-1.5 h-1.5 rounded-full bg-zinc-300" />
                    <div className="w-1.5 h-1.5 rounded-full bg-zinc-300" />
                  </div>
                </div>
                <ActionCursor
                  name="tiago"
                  pointerColor="#3b82f6"
                  tagBg="bg-blue-500"
                  animate={{
                    x: [35, 125, 70, 35],
                    y: [20, 75, 38, 20],
                  }}
                  transition={{
                    duration: 5.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              </div>
            </Link>

            {/* 03 Backend Systems */}
            <Link
              href="/work?service=backend"
              className="bg-[#f5f1e8] rounded-3xl p-7 sm:p-8 flex flex-col justify-between gap-6 group cursor-pointer transition-transform duration-300 hover:-translate-y-1"
            >
              <div className="flex flex-col gap-3">
                <span className="text-xs font-mono font-bold tracking-wider text-zinc-400 uppercase">
                  03
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-normal text-zinc-950 leading-snug">
                  Backend Systems
                </h3>
                <p className="text-zinc-600 text-sm leading-relaxed mt-1">
                  We build secure APIs, databases, server-side systems, and cloud infrastructure that keep your digital products reliable, connected, and ready to scale.
                </p>
              </div>

              {/* Action Canvas: API Routes and Database Throughput */}
              <div className="w-full h-44 rounded-2xl bg-white/80 p-4 relative overflow-hidden flex flex-col justify-between select-none font-mono">
                <div className="flex flex-col gap-2">
                  <div className="bg-zinc-100 rounded-lg p-2 flex items-center justify-between text-[10px]">
                    <span className="text-zinc-600">POST /api/v1/auth</span>
                    <span className="text-zinc-950 font-bold">200 OK</span>
                  </div>
                  <div className="bg-zinc-100 rounded-lg p-2 flex items-center justify-between text-[10px]">
                    <span className="text-zinc-600">GET /db/clusters</span>
                    <span className="text-zinc-950 font-bold">12ms</span>
                  </div>
                </div>
                <div className="flex items-end gap-1.5 h-8 pt-2">
                  {[40, 65, 80, 50, 95, 70, 85, 60].map((h, i) => (
                    <div
                      key={i}
                      style={{ height: `${h}%` }}
                      className="flex-1 bg-zinc-300 rounded-t"
                    />
                  ))}
                </div>
                <ActionCursor
                  name="dami"
                  pointerColor="#1e293b"
                  tagBg="bg-slate-800"
                  animate={{
                    x: [25, 140, 60, 25],
                    y: [15, 45, 85, 15],
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              </div>
            </Link>

            {/* 04 AI and Automations */}
            <Link
              href="/work?service=automation"
              className="bg-[#f5f1e8] rounded-3xl p-7 sm:p-8 flex flex-col justify-between gap-6 group cursor-pointer transition-transform duration-300 hover:-translate-y-1"
            >
              <div className="flex flex-col gap-3">
                <span className="text-xs font-mono font-bold tracking-wider text-zinc-400 uppercase">
                  04
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-normal text-zinc-950 leading-snug">
                  AI and Automations
                </h3>
                <p className="text-zinc-600 text-sm leading-relaxed mt-1">
                  We use AI, automation, and integrations to streamline workflows, reduce manual processes, and help businesses work more efficiently.
                </p>
              </div>

              {/* Action Canvas: Pipeline Workflow Nodes */}
              <div className="w-full h-44 rounded-2xl bg-white/80 p-4 relative overflow-hidden flex flex-col justify-between select-none">
                <div className="flex items-center justify-between gap-2 mt-2">
                  <div className="bg-zinc-100 px-2 py-1.5 rounded-lg text-[9px] font-semibold text-zinc-800">
                    Webhook
                  </div>
                  <div className="h-0.5 flex-1 bg-zinc-200" />
                  <div className="bg-zinc-950 px-2 py-1.5 rounded-lg text-[9px] font-semibold text-white">
                    AI Agent
                  </div>
                  <div className="h-0.5 flex-1 bg-zinc-200" />
                  <div className="bg-zinc-100 px-2 py-1.5 rounded-lg text-[9px] font-semibold text-zinc-800">
                    Sync
                  </div>
                </div>
                <div className="flex items-center justify-between text-[10px] text-zinc-500 font-mono pt-2">
                  <span>Auto Workflow</span>
                  <span className="text-zinc-950 font-medium">99.8% accuracy</span>
                </div>
                <ActionCursor
                  name="artur"
                  pointerColor="#ef4444"
                  tagBg="bg-red-500"
                  animate={{
                    x: [20, 105, 160, 20],
                    y: [20, 25, 55, 20],
                  }}
                  transition={{
                    duration: 5.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              </div>
            </Link>

            {/* 05 UI and UX Design (Directly inspired by screenshot) */}
            <Link
              href="/work?service=design"
              className="bg-white rounded-3xl p-7 sm:p-8 flex flex-col justify-between gap-6 group cursor-pointer transition-transform duration-300 hover:-translate-y-1"
            >
              <div className="flex flex-col gap-3">
                <span className="text-xs font-mono font-bold tracking-wider text-zinc-400 uppercase">
                  05
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-normal text-zinc-950 leading-snug">
                  UI and UX Design
                </h3>
                <p className="text-zinc-600 text-sm leading-relaxed mt-1">
                  We turn ideas and business requirements into clear, intuitive interfaces, from early wireframes and user flows to polished high-fidelity designs and complete design systems.
                </p>
              </div>

              {/* Action Canvas: Collaborative Artboard with Bounding Box & Dual Cursors */}
              <div className="w-full h-44 rounded-2xl bg-zinc-100/70 p-4 relative overflow-hidden flex items-center justify-center select-none">
                <div className="w-48 h-32 bg-white rounded-xl p-3 relative flex items-center justify-between gap-3">
                  <div className="w-16 h-14 bg-zinc-100 rounded-lg relative flex flex-col justify-center items-center p-1.5">
                    <div className="w-1.5 h-1.5 bg-rose-500 rounded-xs absolute -top-0.5 -left-0.5" />
                    <div className="w-1.5 h-1.5 bg-rose-500 rounded-xs absolute -top-0.5 -right-0.5" />
                    <div className="w-1.5 h-1.5 bg-rose-500 rounded-xs absolute -bottom-0.5 -left-0.5" />
                    <div className="w-1.5 h-1.5 bg-rose-500 rounded-xs absolute -bottom-0.5 -right-0.5" />
                    <div className="w-6 h-4 bg-zinc-200 rounded" />
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <span className="text-xs font-bold text-zinc-800 tracking-tight leading-none">Content</span>
                    <span className="text-[10px] text-zinc-400 leading-none">Welcome</span>
                  </div>
                </div>
                <ActionCursor
                  name="tiago"
                  pointerColor="#3b82f6"
                  tagBg="bg-blue-500"
                  animate={{
                    x: [110, 135, 100, 110],
                    y: [20, 45, 15, 20],
                  }}
                  transition={{
                    duration: 4.8,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
                <ActionCursor
                  name="kev"
                  pointerColor="#f43f5e"
                  tagBg="bg-rose-500"
                  animate={{
                    x: [40, 75, 45, 40],
                    y: [70, 95, 65, 70],
                  }}
                  transition={{
                    duration: 5.2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              </div>
            </Link>

            {/* 06 Product and Graphics */}
            <Link
              href="/work?service=graphics"
              className="bg-zinc-100 rounded-3xl p-7 sm:p-8 flex flex-col justify-between gap-6 group cursor-pointer transition-transform duration-300 hover:-translate-y-1"
            >
              <div className="flex flex-col gap-3">
                <span className="text-xs font-mono font-bold tracking-wider text-zinc-400 uppercase">
                  06
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-normal text-zinc-950 leading-snug">
                  Product and Graphics
                </h3>
                <p className="text-zinc-600 text-sm leading-relaxed mt-1">
                  We create the visual assets your business needs to communicate consistently across digital products, marketing, presentations, and other brand touchpoints.
                </p>
              </div>

              {/* Action Canvas: Brand Tokens & Swatches */}
              <div className="w-full h-44 rounded-2xl bg-white p-4 relative overflow-hidden flex flex-col justify-between select-none">
                <div className="flex items-center justify-between">
                  <div className="w-7 h-7 rounded-lg bg-zinc-950 text-white flex items-center justify-center font-bold text-xs">
                    B
                  </div>
                  <span className="text-[10px] font-mono text-zinc-400">Design System</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-zinc-950" />
                  <div className="w-5 h-5 rounded-full bg-zinc-600" />
                  <div className="w-5 h-5 rounded-full bg-zinc-300" />
                  <div className="w-5 h-5 rounded-full bg-[#e8e2d5]" />
                </div>
                <div className="flex items-baseline justify-between pt-1">
                  <span className="font-serif text-lg font-bold text-zinc-900 leading-none">Aa</span>
                  <span className="text-[10px] text-zinc-500 font-mono">Outfit Display</span>
                </div>
                <ActionCursor
                  name="zainab"
                  pointerColor="#8b5cf6"
                  tagBg="bg-violet-600"
                  animate={{
                    x: [20, 130, 65, 20],
                    y: [20, 65, 85, 20],
                  }}
                  transition={{
                    duration: 5.8,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              </div>
            </Link>

          </div>

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

      {/* Reviews Section */}
      <motion.section
        id="reviews"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={sectionVariants}
        className="relative bg-[#163829] py-24 z-10 w-full"
      >
        <div className="max-w-7xl mx-auto w-full px-6 flex flex-col gap-16">

          {/* Header in Serif */}
          <div className="flex flex-col items-center text-center gap-3">
            <span className="text-xs font-bold tracking-widest text-emerald-300 uppercase">
              Reviews
            </span>
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-white">
              What people say about us
            </h2>
            <p className="text-emerald-100/70 text-sm md:text-base max-w-lg leading-relaxed mt-1">
              Real feedback from founders and teams who built their software with us.
            </p>
          </div>

          {/* Reviews Grid Inspired by Pinned Notes */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch pt-4">
            {[
              {
                quote: "They understood our operational headaches right away. The tracking software they built saved our team hours of manual work every single day.",
                name: "Remi Bardoux",
                role: "Product Lead at Freenow",
                initials: "RB",
                tilt: "-rotate-1 hover:rotate-0"
              },
              {
                quote: "We worked with them to build our web application from the ground up. What stood out was their speed, attention to detail, and how straightforward they made the process.",
                name: "Miguel Labranche",
                role: "Product Lead at Orange",
                initials: "ML",
                tilt: "rotate-0 hover:rotate-1"
              },
              {
                quote: "They built our internal workflow tools and automation. Very easy to collaborate with, transparent about pricing, and genuinely invested in helping us launch.",
                name: "Jennifer Han",
                role: "Marketing Director at Ausha",
                initials: "JH",
                tilt: "rotate-1 hover:rotate-0"
              }
            ].map((review, idx) => (
              <div
                key={idx}
                className={`relative flex flex-col transition-transform duration-300 ${review.tilt}`}
              >
                {/* Layered Under-sheet for Paper Depth */}
                <div className="absolute inset-0 bg-[#ebe3d3] rounded-3xl -rotate-1 pointer-events-none" />

                {/* White Pushpin */}
                <div className="w-7 h-7 rounded-full bg-white flex items-center justify-center shrink-0 self-center -mb-3.5 z-20 select-none">
                  <div className="w-2 h-2 rounded-full bg-zinc-300" />
                </div>

                {/* Main Paper Note Card */}
                <div className="relative z-10 bg-[#f7f2e7] rounded-3xl p-8 sm:p-10 flex flex-col justify-between gap-6 flex-1 text-zinc-950">

                  <div className="flex flex-col gap-4">
                    {/* 5 Stars Rating */}
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className="w-4 h-4 text-amber-500 fill-amber-500"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>

                    {/* Quotation text */}
                    <p className="text-zinc-800 text-sm sm:text-base leading-relaxed">
                      &ldquo;{review.quote}&rdquo;
                    </p>
                  </div>

                  {/* Reviewer Bio */}
                  <div className="flex items-center gap-3 pt-4">
                    <div className="w-10 h-10 rounded-full bg-[#163829] text-white flex items-center justify-center font-bold text-xs shrink-0 select-none">
                      {review.initials}
                    </div>
                    <div className="flex flex-col">
                      <span className="font-extrabold text-sm text-zinc-950">
                        {review.name}
                      </span>
                      <span className="text-xs text-zinc-600">
                        {review.role}
                      </span>
                    </div>
                  </div>

                </div>
              </div>
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
              <h2 className="font-serif text-3xl sm:text-4xl font-normal tracking-tight text-zinc-950">
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

          {/* Header Title Block matching screenshot: Left Title, Right "Full transparency" */}
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 pb-2 border-b border-zinc-100">
            <div>
              <h2 className="font-serif text-5xl md:text-6xl text-zinc-950 font-normal tracking-tight">
                Pricing
              </h2>
            </div>
            <span className="text-sm font-medium text-zinc-400">
              Full transparency
            </span>
          </div>

          {/* 3-Card Grid matching screenshot */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">

            {/* Card 1: Team Photo + Black Call Box */}
            <div className="rounded-[2rem] overflow-hidden bg-black flex flex-col justify-between border border-zinc-200/60 min-h-[580px]">
              <div className="relative w-full aspect-[4/3] bg-zinc-900 overflow-hidden">
                <Image
                  src="/pricing-consultation.jpg"
                  alt="Book a consultation call"
                  fill
                  className="object-cover object-center grayscale contrast-125"
                  priority
                />
              </div>
              <div className="p-7 sm:p-8 flex flex-col justify-between gap-6 flex-1 bg-black">
                <p className="text-white text-xl sm:text-2xl font-semibold leading-snug tracking-tight">
                  Book a free 20-minute call to talk through your project
                </p>
                <a
                  href="https://cal.com/builders-hub/introduction"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center py-4 px-6 rounded-full bg-white hover:bg-zinc-100 text-zinc-950 text-sm font-semibold tracking-wide transition-all shadow-sm hover:shadow-md"
                >
                  Let&apos;s Talk!
                </a>
              </div>
            </div>

            {/* Card 2: Single Project / Discovery & Strategy Session */}
            <div className="bg-white rounded-[2rem] border border-zinc-200/80 p-8 flex flex-col justify-between min-h-[580px]">
              <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-2">
                  <h3 className="text-2xl font-bold text-zinc-950 tracking-tight">
                    Discovery &amp; Strategy
                  </h3>
                  <p className="text-zinc-500 text-sm leading-relaxed">
                    Don&apos;t know which one you need? Tell us what you&apos;re trying to achieve and we&apos;ll recommend the right approach.
                  </p>
                </div>

                <div className="flex flex-col gap-3.5 pt-2">
                  {[
                    "30-minute direct session with senior engineers",
                    "Comprehensive review of operational bottlenecks",
                    "Initial technical stack & framework evaluation",
                    "Detailed blueprint document outlining potential steps",
                    "No sales pitches or obligation to move forward",
                  ].map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#F04623] shrink-0 mt-2" />
                      <span className="text-xs sm:text-sm text-zinc-700 leading-relaxed font-medium">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t border-zinc-100 pt-6 mt-8 flex items-end justify-between">
                <div className="flex flex-col gap-0.5">
                  <span className="text-xs text-zinc-400 font-medium">Starting for</span>
                  <div className="text-3xl font-extrabold text-zinc-950 tracking-tight flex items-baseline gap-1">
                    $0
                    <span className="text-xs font-normal text-zinc-400">/ forever</span>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-0.5">
                  <span className="text-xs text-zinc-400 font-medium">Delivery time</span>
                  <span className="text-sm font-bold text-zinc-950">20-30 mins</span>
                </div>
              </div>
            </div>

            {/* Card 3: After the Call / Custom Engineering */}
            <div className="bg-zinc-100/70 rounded-[2rem] border border-zinc-200/60 p-8 flex flex-col justify-between min-h-[580px]">
              <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-2">
                  <h3 className="text-2xl font-bold text-zinc-950 tracking-tight">
                    Custom Project
                  </h3>
                  <p className="text-zinc-500 text-sm leading-relaxed">
                    Tailored engineering and bespoke execution rather than copy-pasting code templates.
                  </p>
                </div>

                <div className="flex flex-col gap-3.5 pt-2">
                  {[
                    "1. Proposal: Scope, timeline, and price tailored to what we heard",
                    "2. Deposit & onboarding: Brand assets, access, and kickoff",
                    "3. Build & launch: Design, development, QA, and production go-live",
                    "Dedicated in-house team with zero middle layers",
                    "Milestone sprints with continuous live preview demos",
                  ].map((step, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#F04623] shrink-0 mt-2" />
                      <span className="text-xs sm:text-sm text-zinc-700 leading-relaxed font-medium">
                        {step}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t border-zinc-200/60 pt-6 mt-8 flex items-end justify-between">
                <div className="flex flex-col gap-0.5">
                  <span className="text-xs text-zinc-400 font-medium">Delivery model</span>
                  <span className="text-3xl font-extrabold text-zinc-950 tracking-tight">
                    Bespoke
                  </span>
                </div>
                <div className="flex flex-col items-end gap-0.5">
                  <span className="text-xs text-zinc-400 font-medium">Delivery time</span>
                  <span className="text-sm font-bold text-zinc-950">2-4 weeks</span>
                </div>
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
        className="relative bg-zinc-50 py-24 z-10 w-full"
      >
        <div className="max-w-7xl mx-auto w-full px-6 flex flex-col gap-10">

          <div className="flex flex-col gap-2 max-w-xl">
            <span className="text-xs font-bold tracking-widest text-zinc-400 uppercase">
              Get In Touch
            </span>
            <h2 className="font-serif text-4xl md:text-5xl font-normal tracking-tight text-zinc-950">
              Have a project in mind? Let's talk.
            </h2>
            <p className="text-zinc-500 text-sm md:text-base leading-relaxed">
              Tell us what you are working on. We will review your goals and get back to you with clear next steps.
            </p>
          </div>

          {/* Split Contact Presentation */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">

            {/* Left Card: Team Lead and Anchor Statement */}
            <div className="lg:col-span-5 bg-zinc-100 rounded-3xl p-8 sm:p-10 flex flex-col justify-between">

              {/* Top Bar: Lead Avatar and Quick Contact */}
              <div className="flex flex-col gap-6">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-zinc-950 text-white flex items-center justify-center font-bold text-base shrink-0 select-none">
                    FO
                  </div>
                  <div className="flex flex-col">
                    <span className="font-extrabold text-base text-zinc-950 tracking-tight leading-tight">
                      Fafure Olakunle
                    </span>
                    <span className="text-xs text-zinc-600 leading-snug mt-0.5">
                      Team Lead.
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <a
                    href="mailto:hello@buildershub.tech"
                    className="px-4 py-2.5 rounded-xl bg-white text-zinc-900 text-xs font-semibold hover:bg-zinc-200 transition-colors"
                  >
                    hello@buildershub.tech
                  </a>
                  <a
                    href="https://cal.com/builders-hub/introduction"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2.5 rounded-xl bg-zinc-950 text-white text-xs font-semibold hover:bg-zinc-800 transition-colors"
                  >
                    Book Call
                  </a>
                </div>
              </div>

              {/* Center Typography */}
              <div className="my-auto py-10 lg:py-16">
                <h3 className="font-serif text-4xl sm:text-5xl font-normal text-zinc-950 leading-[1.08] tracking-tight">
                  Every project starts with a plan.
                </h3>
                <p className="mt-4 text-sm text-zinc-600 leading-relaxed max-w-sm">
                  We look at what you want to achieve, remove the guesswork, and build the right system for your business.
                </p>
              </div>

            </div>

            {/* Right Card: Services Selection and Form */}
            <div className="lg:col-span-7 bg-white text-zinc-950 rounded-3xl p-8 sm:p-10 flex flex-col justify-between gap-8">

              <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-1.5">
                  <h3 className="font-serif text-3xl sm:text-4xl font-normal text-zinc-950 tracking-tight">
                    What can we help you build?
                  </h3>
                  <p className="text-zinc-500 text-xs sm:text-sm">
                    Select what you need or write your thoughts below.
                  </p>
                </div>

                {/* Service Selection Chips */}
                <div className="flex flex-col gap-2.5">
                  <span className="text-xs font-semibold text-zinc-500">
                    I am interested in
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {["Websites", "Web Apps", "Mobile Apps", "Automation", "Product Design", "Other"].map((service) => {
                      const isSelected = selectedServices.includes(service);
                      return (
                        <button
                          key={service}
                          type="button"
                          onClick={() => toggleService(service)}
                          className={`px-3.5 py-2 rounded-xl text-xs font-semibold cursor-pointer transition-colors ${isSelected
                              ? "bg-zinc-950 text-white"
                              : "bg-zinc-100 text-zinc-600 hover:text-zinc-950 hover:bg-zinc-200"
                            }`}
                        >
                          {service}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Contact Form */}
                <form onSubmit={handleFormSubmit} className="flex flex-col gap-4">

                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="name" className="text-xs font-semibold text-zinc-700">
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="What should we call you?"
                      className="w-full bg-zinc-50 rounded-xl px-4 py-3.5 text-sm text-zinc-950 placeholder:text-zinc-400 focus:outline-none focus:ring-1 focus:ring-zinc-950 transition-all"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="email" className="text-xs font-semibold text-zinc-700">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="Where can we write back to you?"
                      className="w-full bg-zinc-50 rounded-xl px-4 py-3.5 text-sm text-zinc-950 placeholder:text-zinc-400 focus:outline-none focus:ring-1 focus:ring-zinc-950 transition-all"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="message" className="text-xs font-semibold text-zinc-700">
                      Tell us about your project
                    </label>
                    <textarea
                      id="message"
                      required
                      rows={3}
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      placeholder="Share your goals, timeline, or any questions..."
                      className="w-full bg-zinc-50 rounded-xl px-4 py-3.5 text-sm text-zinc-950 placeholder:text-zinc-400 focus:outline-none focus:ring-1 focus:ring-zinc-950 transition-all resize-none"
                    />
                  </div>

                  <div className="pt-2 flex flex-col gap-3">
                    <button
                      type="submit"
                      disabled={submitStatus === "loading"}
                      className="w-full py-4 rounded-xl bg-zinc-950 hover:bg-zinc-800 text-white text-sm font-bold tracking-wide cursor-pointer transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {submitStatus === "loading" ? "Sending your message..." : "Submit"}
                    </button>

                    {submitStatus === "success" && (
                      <p className="text-xs font-bold text-emerald-600">
                        Your message has been sent. We will get back to you shortly.
                      </p>
                    )}
                    {submitStatus === "error" && (
                      <p className="text-xs font-bold text-rose-600">
                        Something went wrong. Please write directly to hello@buildershub.tech.
                      </p>
                    )}
                  </div>

                </form>
              </div>

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
                {["About", "Showcase", "Reviews", "Timeline", "Pricing", "Contact"].map((link, idx) => (
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
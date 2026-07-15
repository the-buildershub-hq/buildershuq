"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Icon from "@/components/Icon";

interface Project {
  id: number;
  title: string;
  category: string;
  story: string;
  link: string;
  screenshots: string[];
  video?: string;
}

const mockProjects: Project[] = [
  {
    id: 1,
    title: "Apex Logistics Dashboard",
    category: "Logistics & Fleet Systems",
    story: "A comprehensive operational dashboard engineered for real-time fleet coordination and warehouse workflows. The system integrates automated OCR scanner APIs to read container labels, schedules optimal routes dynamically, and handles high-throughput inventory events. Built using Next.js and Go to ensure sub-second rendering and reliable background processing under heavy peak workloads.",
    link: "https://apexlogistics.example.com",
    screenshots: ["/abstract.png", "/workspace.png", "/abstract.png"],
    video: "https://assets.mixkit.co/videos/preview/mixkit-software-developer-working-on-his-computer-34282-large.mp4"
  },
  {
    id: 2,
    title: "Nova Commerce Engine",
    category: "High-Scale E-Commerce",
    story: "A modular, lightning-fast e-commerce infrastructure supporting over 100,000 daily checkouts. The platform resolves stock sync issues across distributed nodes, designs responsive checkout funnels, and integrates package tracking automations. We designed this down to the pixel to ensure conversion rates scale with traffic.",
    link: "https://novacommerce.example.com",
    screenshots: ["/workspace.png", "/abstract.png", "/workspace.png"],
  },
  {
    id: 3,
    title: "ScanFlow System",
    category: "Hardware Integration & OCR",
    story: "A high-performance scanning pipeline engineered specifically for physical warehouses. Integrates package label audits via camera feeds and OCR, syncing data instantly to backend databases. Implements strict data validation to prevent packet drops and double entries.",
    link: "https://scanflow.example.com",
    screenshots: ["/abstract.png", "/workspace.png", "/abstract.png"],
  },
  {
    id: 4,
    title: "Velo Automation Engine",
    category: "AI & Workflow Automation",
    story: "An advanced node-based workflow system connecting customer operations, triggering background automations, and executing data synchronization cycles. Features detailed micro-interactions and clean dashboard views to make system management intuitive and elegant.",
    link: "https://velo.example.com",
    screenshots: ["/workspace.png", "/abstract.png", "/workspace.png"],
    video: "https://assets.mixkit.co/videos/preview/mixkit-typing-on-a-computer-keyboard-close-up-44671-large.mp4"
  },
  {
    id: 5,
    title: "Aura Ledger Dashboard",
    category: "Financial Operations Suite",
    story: "A premium financial management tool that calculates liquidity metrics, generates compliance reports, and automates ledger adjustments. Implements detailed tables, custom layout grids, and interactive graphics for an elite user experience.",
    link: "https://aura.example.com",
    screenshots: ["/abstract.png", "/workspace.png", "/abstract.png"],
  }
];

export default function Showcase() {
  const [activeIndex, setActiveIndex] = useState(2);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeMediaIndex, setActiveMediaIndex] = useState(0);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % mockProjects.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + mockProjects.length) % mockProjects.length);
  };

  return (
    <section id="showcase" className="relative bg-white py-24 border-t border-zinc-200/60 w-full overflow-hidden">
      <div className="max-w-7xl mx-auto w-full px-6 flex flex-col gap-16">

        {/* Title Block */}
        <div className="flex flex-col items-center text-center gap-4">
          <span className="text-xs font-bold tracking-widest text-zinc-400 uppercase">
            Product Showcase
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-zinc-950">
            Curious What We Have Created?
          </h2>
          <p className="text-zinc-500 text-sm md:text-base max-w-lg leading-relaxed">
            Explore a selection of premium websites, mobile applications, and backend systems built with absolute attention to detail.
          </p>
        </div>

        {/* Curved / 3D Coverflow Showcase Carousel Wrapper */}
        <div className="relative w-full flex flex-col items-center justify-center py-12">

          {/* Coverflow Container */}
          <div className="relative w-full max-w-5xl h-[480px] flex items-center justify-center perspective-[1200px] overflow-visible">
            {mockProjects.map((project, idx) => {
              // Calculate relative offset from active card
              const offset = idx - activeIndex;
              const absOffset = Math.abs(offset);

              // Handle looping offsets correctly
              let loopOffset = offset;
              if (offset < -2) loopOffset += mockProjects.length;
              if (offset > 2) loopOffset -= mockProjects.length;
              const absLoopOffset = Math.abs(loopOffset);

              const isActive = idx === activeIndex;

              // Define 3D rotation, translation and scaling
              const rotateY = loopOffset * 22; // Curved angle
              const translateZ = isActive ? 100 : -120; // Active card pops forward
              const translateX = loopOffset * 220; // Lateral spread spacing
              const scale = isActive ? 1.05 : 0.78;
              const opacity = absLoopOffset > 2 ? 0 : isActive ? 1 : 0.65;
              const zIndex = 10 - absLoopOffset;

              return (
                <motion.div
                  key={project.id}
                  style={{
                    transformStyle: "preserve-3d",
                    zIndex,
                  }}
                  animate={{
                    x: translateX,
                    scale,
                    opacity,
                    rotateY,
                    z: translateZ,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 85,
                    damping: 18
                  }}
                  onClick={() => {
                    if (isActive) {
                      setSelectedProject(project);
                      setActiveMediaIndex(0);
                    } else {
                      setActiveIndex(idx);
                    }
                  }}
                  className={`absolute w-[320px] sm:w-[400px] h-[420px] rounded-3xl bg-zinc-50 border border-zinc-200/80 p-6 flex flex-col justify-between cursor-pointer select-none`}
                >
                  <div className="flex flex-col gap-4 h-full justify-between">
                    <div className="flex flex-col gap-4">
                      {/* Image Preview */}
                      <div className="w-full h-56 relative rounded-2xl overflow-hidden border border-zinc-200/50 bg-black">
                        <Image
                          src={project.screenshots[0]}
                          alt={project.title}
                          fill
                          className="object-cover"
                          draggable={false}
                        />
                      </div>

                      {/* Text info */}
                      <div className="flex flex-col gap-1">
                        <span className="text-[10px] font-mono text-zinc-400 font-bold uppercase tracking-widest">
                          {project.category}
                        </span>
                        <h3 className="text-base font-bold text-zinc-950 truncate">
                          {project.title}
                        </h3>
                      </div>
                    </div>

                    {/* Bottom CTA to view details */}
                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-zinc-200/30">
                      <span className="text-[11px] font-bold text-zinc-500">
                        {isActive ? "Click to open details" : "Select project"}
                      </span>
                      <div className="w-8 h-8 rounded-full border border-zinc-200 flex items-center justify-center text-zinc-500 group-hover:bg-brand-navy group-hover:text-white transition-all duration-300">
                        <Icon name="arrow_outward" className="text-xs" weight={600} />
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center gap-4 mt-8 z-20">
            <button
              onClick={handlePrev}
              className="w-12 h-12 rounded-full border border-zinc-200 bg-white flex items-center justify-center text-zinc-600 hover:bg-zinc-50 cursor-pointer transition-colors"
            >
              <Icon name="arrow_back" className="text-base" />
            </button>
            <button
              onClick={handleNext}
              className="w-12 h-12 rounded-full border border-zinc-200 bg-white flex items-center justify-center text-zinc-600 hover:bg-zinc-50 cursor-pointer transition-colors"
            >
              <Icon name="arrow_forward" className="text-base" />
            </button>
          </div>

        </div>

      </div>

      {/* Custom Modal for Project Details */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 w-screen h-screen z-[9999] flex items-center justify-center bg-black/95 backdrop-blur-lg p-4 sm:p-8"
          >
            <motion.div
              initial={{ scale: 0.95, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 30 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="bg-white max-w-4xl w-full max-h-[90vh] overflow-y-auto rounded-3xl border border-zinc-200/80 flex flex-col scrollbar-hide"
            >
              {/* Modal Header */}
              <div className="sticky top-0 bg-white/95 backdrop-blur-sm z-30 px-6 py-5 border-b border-zinc-100 flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-[10px] font-mono text-zinc-400 font-bold uppercase tracking-widest">
                    {selectedProject.category}
                  </span>
                  <h3 className="text-lg sm:text-xl font-extrabold text-zinc-950">
                    {selectedProject.title}
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="w-10 h-10 rounded-full border border-zinc-200 flex items-center justify-center text-zinc-600 hover:bg-zinc-50 cursor-pointer transition-colors"
                >
                  <Icon name="close" className="text-base" />
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-6 sm:p-8 flex flex-col gap-8">

                {/* Media Section: Slide/Tabs of Images + Videos */}
                <div className="flex flex-col gap-4">

                  {/* Active Media Container */}
                  <div className="w-full aspect-video relative rounded-2xl overflow-hidden border border-zinc-200 bg-zinc-950 flex items-center justify-center">
                    {selectedProject.video && activeMediaIndex === selectedProject.screenshots.length ? (
                      <video
                        src={selectedProject.video}
                        controls
                        className="w-full h-full object-cover"
                        autoPlay
                      />
                    ) : (
                      <Image
                        src={selectedProject.screenshots[activeMediaIndex]}
                        alt="Project screenshot"
                        fill
                        className="object-cover"
                      />
                    )}
                  </div>

                  {/* Thumbnail / Tabs Selectors */}
                  <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-hide">
                    {selectedProject.screenshots.map((screen, sIdx) => (
                      <button
                        key={sIdx}
                        onClick={() => setActiveMediaIndex(sIdx)}
                        className={`relative w-20 aspect-video rounded-lg overflow-hidden border-2 transition-all flex-shrink-0 cursor-pointer ${activeMediaIndex === sIdx ? 'border-brand-navy scale-95' : 'border-zinc-200 opacity-60 hover:opacity-100'}`}
                      >
                        <Image
                          src={screen}
                          alt="Thumbnail"
                          fill
                          className="object-cover"
                        />
                      </button>
                    ))}

                    {/* Video Tab if exists */}
                    {selectedProject.video && (
                      <button
                        onClick={() => setActiveMediaIndex(selectedProject.screenshots.length)}
                        className={`relative w-20 aspect-video rounded-lg overflow-hidden border-2 transition-all flex-shrink-0 bg-zinc-900 flex items-center justify-center text-white cursor-pointer ${activeMediaIndex === selectedProject.screenshots.length ? 'border-brand-navy scale-95' : 'border-zinc-200 opacity-60 hover:opacity-100'}`}
                      >
                        <Icon name="play_circle" className="text-xl" />
                      </button>
                    )}
                  </div>

                </div>

                {/* Narrative Details Block */}
                <div className="flex flex-col gap-4">
                  <h4 className="text-xs font-bold tracking-widest text-zinc-400 uppercase">
                    Project Story &amp; Details
                  </h4>
                  <p className="text-zinc-600 text-sm sm:text-base leading-relaxed">
                    {selectedProject.story}
                  </p>
                </div>

                {/* External Action Button */}
                <div className="pt-4 border-t border-zinc-100 flex items-center justify-end">
                  <a
                    href={selectedProject.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-brand-navy hover:bg-brand-navy-hover text-white text-sm font-semibold tracking-wide cursor-pointer transition-all group"
                  >
                    Visit Live Project Website
                    <Icon
                      name="arrow_outward"
                      className="text-base transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      weight={600}
                    />
                  </a>
                </div>

              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

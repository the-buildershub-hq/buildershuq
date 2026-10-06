"use client";

import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import Icon from "@/components/Icon";
import { projects as mockProjects, type Project } from "../lib/projects";

export default function Showcase() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeMediaIndex, setActiveMediaIndex] = useState(0);
  const [mounted, setMounted] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Scale on scroll animation hook
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Scale wall as user scrolls through it
  const wallScale = useTransform(scrollYProgress, [0, 0.4, 0.7, 1], [0.93, 1, 1, 0.95]);
  const wallOpacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0.8, 1, 1, 0.85]);

  // Parallax offsets per column
  const colY1 = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const colY2 = useTransform(scrollYProgress, [0, 1], [-30, 30]);
  const colY3 = useTransform(scrollYProgress, [0, 1], [45, -45]);
  const colY4 = useTransform(scrollYProgress, [0, 1], [-25, 25]);
  const colY5 = useTransform(scrollYProgress, [0, 1], [35, -35]);

  const columnOffsets = [colY1, colY2, colY3, colY4, colY5];

  // Gallery wall with varied heights across 5 full-bleed columns
  const columns = [
    // Column 1
    [
      {
        project: mockProjects[0],
        aspect: "h-[440px] sm:h-[480px]",
        tag: "Logistics",
        shot: 0,
      },
      {
        project: mockProjects[4],
        aspect: "h-[300px] sm:h-[320px]",
        tag: "Fintech",
        shot: 1,
      },
      {
        project: mockProjects[2],
        aspect: "h-[420px] sm:h-[450px]",
        tag: "Automations",
        shot: 0,
      },
    ],
    // Column 2
    [
      {
        project: mockProjects[1],
        aspect: "h-[300px] sm:h-[320px]",
        tag: "Commerce",
        shot: 0,
      },
      {
        project: mockProjects[5],
        aspect: "h-[480px] sm:h-[520px]",
        tag: "Mobile",
        shot: 1,
      },
      {
        project: mockProjects[7],
        aspect: "h-[310px] sm:h-[330px]",
        tag: "Branding",
        shot: 0,
      },
    ],
    // Column 3
    [
      {
        project: mockProjects[2],
        aspect: "h-[460px] sm:h-[500px]",
        tag: "Hardware",
        shot: 1,
      },
      {
        project: mockProjects[6],
        aspect: "h-[310px] sm:h-[330px]",
        tag: "Healthcare",
        shot: 0,
      },
      {
        project: mockProjects[0],
        aspect: "h-[440px] sm:h-[470px]",
        tag: "Fleet Systems",
        shot: 1,
      },
    ],
    // Column 4
    [
      {
        project: mockProjects[7],
        aspect: "h-[290px] sm:h-[310px]",
        tag: "Brand Kit",
        shot: 1,
      },
      {
        project: mockProjects[3],
        aspect: "h-[470px] sm:h-[510px]",
        tag: "Workflow",
        shot: 0,
      },
      {
        project: mockProjects[5],
        aspect: "h-[320px] sm:h-[340px]",
        tag: "Field Service",
        shot: 0,
      },
    ],
    // Column 5
    [
      {
        project: mockProjects[4],
        aspect: "h-[460px] sm:h-[490px]",
        tag: "Operations",
        shot: 0,
      },
      {
        project: mockProjects[1],
        aspect: "h-[310px] sm:h-[330px]",
        tag: "Storefront",
        shot: 1,
      },
      {
        project: mockProjects[6],
        aspect: "h-[430px] sm:h-[460px]",
        tag: "Interface",
        shot: 1,
      },
    ],
  ];

  return (
    <section
      id="showcase"
      ref={containerRef}
      className="relative bg-zinc-50 py-24 sm:py-32 w-full overflow-hidden"
    >
      <div className="w-full flex flex-col gap-14 sm:gap-16">

        {/* Section Header (Centered with clean padding) */}
        <div className="max-w-3xl mx-auto px-6 text-center flex flex-col items-center gap-3">
          <span className="text-xs font-bold tracking-widest text-zinc-400 uppercase">
            Showcase
          </span>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-normal tracking-tight text-zinc-950">
            Selected Works on Display
          </h2>
          <p className="text-zinc-500 text-sm md:text-base leading-relaxed mt-1">
            Like artworks on a museum wall, each system we build has its own character, size, and focus. Click any piece to see its details.
          </p>
        </div>

        {/* Full-Bleed Edge-to-Edge Museum Wall with scale on scroll */}
        <motion.div
          style={{
            scale: wallScale,
            opacity: wallOpacity,
          }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 lg:gap-5 w-full px-2 sm:px-4 items-start"
        >
          {columns.map((column, colIdx) => (
            <motion.div
              key={colIdx}
              style={{
                y: columnOffsets[colIdx],
              }}
              className="flex flex-col gap-3 sm:gap-4 lg:gap-5 w-full"
            >
              {column.map((item, itemIdx) => (
                <motion.div
                  key={`${colIdx}-${itemIdx}`}
                  whileHover={{ scale: 1.02, y: -4 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  onClick={() => {
                    setSelectedProject(item.project);
                    setActiveMediaIndex(0);
                  }}
                  className={`relative w-full ${item.aspect} rounded-2xl sm:rounded-3xl overflow-hidden cursor-pointer select-none group bg-zinc-950`}
                >
                  {/* Artwork Image */}
                  <Image
                    src={item.project.screenshots[item.shot] || item.project.screenshots[0]}
                    alt={item.project.title}
                    fill
                    className="object-cover opacity-80 group-hover:opacity-95 group-hover:scale-105 transition-all duration-700"
                    draggable={false}
                  />

                  {/* Gradient overlay for high-contrast legible typography */}
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent pointer-events-none" />

                  {/* Card Content Overlay */}
                  <div className="absolute inset-0 p-5 sm:p-6 flex flex-col justify-between z-10">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-mono font-bold text-zinc-300 uppercase tracking-widest">
                        {item.tag}
                      </span>
                      <div className="w-8 h-8 rounded-full bg-white/10 group-hover:bg-white text-white group-hover:text-zinc-950 flex items-center justify-center transition-colors">
                        <Icon name="arrow_outward" className="text-xs" weight={600} />
                      </div>
                    </div>

                    <div className="flex flex-col gap-1">
                      <span className="text-[10px] font-mono font-medium text-zinc-400">
                        {item.project.serviceLabel}
                      </span>
                      <h3 className="font-serif text-lg sm:text-xl font-normal text-white tracking-tight leading-tight group-hover:text-zinc-200 transition-colors">
                        {item.project.title}
                      </h3>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ))}
        </motion.div>

      </div>

      {/* Portalled Project Details Modal (Zero borders, zero shadows) */}
      {mounted && createPortal(
        <AnimatePresence>
          {selectedProject && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 w-screen h-screen z-[99999] flex items-center justify-center bg-black/90 backdrop-blur-md p-4 sm:p-8"
            >
              <motion.div
                initial={{ scale: 0.95, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.95, y: 20 }}
                transition={{ type: "spring", damping: 25, stiffness: 220 }}
                className="bg-white max-w-4xl w-full max-h-[90vh] overflow-y-auto rounded-3xl flex flex-col scrollbar-hide text-zinc-950"
              >
                {/* Modal Header */}
                <div className="sticky top-0 bg-white/95 backdrop-blur-sm z-30 px-6 py-5 flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-xs font-mono text-zinc-400 font-bold uppercase tracking-widest">
                      {selectedProject.category}
                    </span>
                    <h3 className="font-serif text-2xl font-normal text-zinc-950 mt-1">
                      {selectedProject.title}
                    </h3>
                  </div>
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="w-10 h-10 rounded-full bg-zinc-100 hover:bg-zinc-200 flex items-center justify-center text-zinc-700 cursor-pointer transition-colors"
                  >
                    <Icon name="close" className="text-lg" />
                  </button>
                </div>

                {/* Media Container */}
                <div className="bg-zinc-100 p-6 flex flex-col gap-4">
                  <div className="relative aspect-video rounded-2xl overflow-hidden bg-black flex items-center justify-center">
                    {activeMediaIndex === selectedProject.screenshots.length && selectedProject.video ? (
                      <video
                        src={selectedProject.video}
                        controls
                        autoPlay
                        loop
                        muted
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <Image
                        src={selectedProject.screenshots[activeMediaIndex] || "/abstract.png"}
                        alt={`${selectedProject.title} screenshot`}
                        fill
                        className="object-cover"
                      />
                    )}
                  </div>

                  {/* Thumbnail Row */}
                  <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                    {selectedProject.screenshots.map((shot, sIdx) => (
                      <button
                        key={sIdx}
                        onClick={() => setActiveMediaIndex(sIdx)}
                        className={`relative w-24 aspect-video rounded-xl overflow-hidden cursor-pointer shrink-0 transition-all ${
                          activeMediaIndex === sIdx ? "ring-2 ring-zinc-950" : "opacity-60 hover:opacity-100"
                        }`}
                      >
                        <Image
                          src={shot}
                          alt="thumbnail link"
                          fill
                          className="object-cover"
                        />
                      </button>
                    ))}

                    {selectedProject.video && (
                      <button
                        onClick={() => setActiveMediaIndex(selectedProject.screenshots.length)}
                        className={`relative w-24 aspect-video rounded-xl overflow-hidden bg-zinc-900 flex items-center justify-center text-white cursor-pointer shrink-0 transition-all ${
                          activeMediaIndex === selectedProject.screenshots.length ? "ring-2 ring-zinc-950" : "opacity-60 hover:opacity-100"
                        }`}
                      >
                        <Icon name="play_circle" className="text-3xl text-white" />
                      </button>
                    )}
                  </div>
                </div>

                {/* Story Description */}
                <div className="px-6 py-8 flex flex-col gap-6">
                  <div className="flex flex-col gap-2">
                    <span className="text-xs font-bold tracking-widest text-zinc-400 uppercase">
                      Project Background
                    </span>
                    <p className="text-zinc-700 text-sm sm:text-base leading-relaxed">
                      {selectedProject.story}
                    </p>
                  </div>

                  <div className="pt-4 flex items-center justify-end">
                    <a
                      href={selectedProject.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-zinc-950 hover:bg-zinc-800 text-white text-sm font-semibold tracking-wide cursor-pointer transition-colors group"
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
        </AnimatePresence>,
        document.body
      )}
    </section>
  );
}
"use client";

import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
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

  // Scroll animation
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const wallScale = useTransform(
    scrollYProgress,
    [0, 0.4, 0.7, 1],
    [0.93, 1, 1, 0.95]
  );

  const wallOpacity = useTransform(
    scrollYProgress,
    [0, 0.15, 0.85, 1],
    [0.8, 1, 1, 0.85]
  );

  // Parallax offsets
  const colY1 = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const colY2 = useTransform(scrollYProgress, [0, 1], [-30, 30]);
  const colY3 = useTransform(scrollYProgress, [0, 1], [45, -45]);
  const colY4 = useTransform(scrollYProgress, [0, 1], [-25, 25]);
  const colY5 = useTransform(scrollYProgress, [0, 1], [35, -35]);

  const columnOffsets = [colY1, colY2, colY3, colY4, colY5];

  // Safely retrieve projects.
  // Reuses available projects when an index exceeds the array length.
  const projectAt = (index: number): Project | undefined => {
    if (mockProjects.length === 0) return undefined;

    return mockProjects[index % mockProjects.length];
  };

  // Safely retrieve a project's screenshot.
  const getScreenshot = (
    project: Project,
    index: number = 0
  ): string => {
    return (
      project.screenshots?.[index] ??
      project.screenshots?.[0] ??
      "/abstract.png"
    );
  };

  // Gallery wall
  const columns = [
    // Column 1
    [
      {
        project: projectAt(0),
        aspect: "h-[440px] sm:h-[480px]",
        tag: "Logistics",
        shot: 0,
      },
      {
        project: projectAt(4),
        aspect: "h-[300px] sm:h-[320px]",
        tag: "Fintech",
        shot: 1,
      },
      {
        project: projectAt(2),
        aspect: "h-[420px] sm:h-[450px]",
        tag: "Automations",
        shot: 0,
      },
    ],

    // Column 2
    [
      {
        project: projectAt(1),
        aspect: "h-[300px] sm:h-[320px]",
        tag: "Commerce",
        shot: 0,
      },
      {
        project: projectAt(5),
        aspect: "h-[480px] sm:h-[520px]",
        tag: "Mobile",
        shot: 1,
      },
      {
        project: projectAt(7),
        aspect: "h-[310px] sm:h-[330px]",
        tag: "Branding",
        shot: 0,
      },
    ],

    // Column 3
    [
      {
        project: projectAt(2),
        aspect: "h-[460px] sm:h-[500px]",
        tag: "Hardware",
        shot: 1,
      },
      {
        project: projectAt(6),
        aspect: "h-[310px] sm:h-[330px]",
        tag: "Healthcare",
        shot: 0,
      },
      {
        project: projectAt(0),
        aspect: "h-[440px] sm:h-[470px]",
        tag: "Fleet Systems",
        shot: 1,
      },
    ],

    // Column 4
    [
      {
        project: projectAt(7),
        aspect: "h-[290px] sm:h-[310px]",
        tag: "Brand Kit",
        shot: 1,
      },
      {
        project: projectAt(3),
        aspect: "h-[470px] sm:h-[510px]",
        tag: "Workflow",
        shot: 0,
      },
      {
        project: projectAt(5),
        aspect: "h-[320px] sm:h-[340px]",
        tag: "Field Service",
        shot: 0,
      },
    ],

    // Column 5
    [
      {
        project: projectAt(4),
        aspect: "h-[460px] sm:h-[490px]",
        tag: "Operations",
        shot: 0,
      },
      {
        project: projectAt(1),
        aspect: "h-[310px] sm:h-[330px]",
        tag: "Storefront",
        shot: 1,
      },
      {
        project: projectAt(6),
        aspect: "h-[430px] sm:h-[460px]",
        tag: "Interface",
        shot: 1,
      },
    ],
  ];

  // Protect the modal from invalid media indexes.
  const selectedScreenshots = selectedProject?.screenshots ?? [];

  const hasSelectedVideo = Boolean(selectedProject?.video);

  const activeMediaIsVideo =
    Boolean(selectedProject) &&
    hasSelectedVideo &&
    activeMediaIndex === selectedScreenshots.length;

  return (
    <section
      id="showcase"
      ref={containerRef}
      className="relative bg-zinc-50 py-24 sm:py-32 w-full overflow-hidden"
    >
      <div className="w-full flex flex-col gap-14 sm:gap-16">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto px-6 text-center flex flex-col items-center gap-3">
          <span className="text-xs font-bold tracking-widest text-zinc-400 uppercase">
            Showcase
          </span>

          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-normal tracking-tight text-zinc-950">
            Selected Works on Display
          </h2>

          <p className="text-zinc-500 text-sm md:text-base leading-relaxed mt-1">
            Like artworks on a museum wall, each system we build has its own
            character, size, and focus. Click any piece to see its details.
          </p>
        </div>

        {/* Gallery Wall */}
        {mockProjects.length > 0 ? (
          <motion.div
            style={{
              scale: wallScale,
              opacity: wallOpacity,
            }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 lg:gap-5 w-full px-2 sm:px-4 items-start"
          >
            {columns.map((column, colIdx) => {
              const visibilityClass =
                colIdx === 2
                  ? "hidden md:flex"
                  : colIdx >= 3
                    ? "hidden lg:flex"
                    : "flex";

              return (
                <motion.div
                  key={colIdx}
                  style={{
                    y: columnOffsets[colIdx],
                  }}
                  className={`${visibilityClass} flex-col gap-3 sm:gap-4 lg:gap-5 w-full`}
                >
                  {column.map((item, itemIdx) => {
                    const project = item.project;

                    // Prevent errors when a project is unavailable.
                    if (!project) return null;

                    const imageSrc = getScreenshot(
                      project,
                      item.shot
                    );

                    return (
                      <motion.div
                        key={`${colIdx}-${itemIdx}`}
                        whileHover={{ scale: 1.02, y: -4 }}
                        transition={{
                          duration: 0.3,
                          ease: [0.16, 1, 0.3, 1],
                        }}
                        onClick={() => {
                          setSelectedProject(project);
                          setActiveMediaIndex(0);
                        }}
                        className={`relative w-full ${item.aspect} rounded-2xl sm:rounded-3xl overflow-hidden cursor-pointer select-none group bg-zinc-950`}
                      >
                        {/* Artwork Image */}
                        <Image
                          src={imageSrc}
                          alt={project.title}
                          fill
                          sizes="(max-width: 767px) 50vw, (max-width: 1023px) 33vw, 20vw"
                          className="object-cover opacity-80 group-hover:opacity-95 group-hover:scale-105 transition-all duration-700"
                          draggable={false}
                        />

                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent pointer-events-none" />

                        {/* Card Content */}
                        <div className="absolute inset-0 p-5 sm:p-6 flex flex-col justify-between z-10">
                          <div className="flex items-center justify-between">
                            <span className="text-[11px] font-mono font-bold text-zinc-300 uppercase tracking-widest">
                              {project.category || item.tag}
                            </span>

                            <div className="w-8 h-8 rounded-full bg-white/10 group-hover:bg-white text-white group-hover:text-zinc-950 flex items-center justify-center transition-colors">
                              <Icon
                                name="arrow_outward"
                                className="text-xs"
                                weight={600}
                              />
                            </div>
                          </div>

                          <div className="flex flex-col gap-1">
                            <span className="text-[10px] font-mono font-medium text-zinc-400">
                              {project.serviceLabel}
                            </span>

                            <h3 className="font-serif text-lg sm:text-xl font-normal text-white tracking-tight leading-tight group-hover:text-zinc-200 transition-colors">
                              {project.title}
                            </h3>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </motion.div>
              );
            })}
          </motion.div>
        ) : (
          <div className="px-6 text-center text-zinc-500">
            Projects will be displayed here soon.
          </div>
        )}
      </div>

      {/* Project Details Modal */}
      {mounted &&
        createPortal(
          <AnimatePresence>
            {selectedProject && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedProject(null)}
                className="fixed inset-0 w-screen h-screen z-[99999] flex items-center justify-center bg-black/90 backdrop-blur-md p-3 sm:p-6 md:p-8"
              >
                <motion.div
                  initial={{ scale: 0.95, y: 20 }}
                  animate={{ scale: 1, y: 0 }}
                  exit={{ scale: 0.95, y: 20 }}
                  transition={{
                    type: "spring",
                    damping: 25,
                    stiffness: 220,
                  }}
                  onClick={(event) => event.stopPropagation()}
                  className="bg-white max-w-4xl w-full max-h-[92vh] overflow-y-auto rounded-2xl sm:rounded-3xl flex flex-col scrollbar-hide text-zinc-950"
                >
                  {/* Modal Header */}
                  <div className="sticky top-0 bg-white/95 backdrop-blur-sm z-30 px-4 sm:px-6 py-4 sm:py-5 flex items-center justify-between">
                    <div className="flex flex-col">
                      <span className="text-xs font-mono text-zinc-400 font-bold uppercase tracking-widest">
                        {selectedProject.category}
                      </span>

                      <h3 className="font-serif text-xl sm:text-2xl font-normal text-zinc-950 mt-0.5 sm:mt-1">
                        {selectedProject.title}
                      </h3>
                    </div>

                    <button
                      onClick={() => setSelectedProject(null)}
                      aria-label="Close project details"
                      className="w-10 h-10 rounded-full bg-zinc-100 hover:bg-zinc-200 flex items-center justify-center text-zinc-700 cursor-pointer transition-colors"
                    >
                      <Icon name="close" className="text-lg" />
                    </button>
                  </div>

                  {/* Media Container */}
                  <div className="bg-zinc-100 p-4 sm:p-6 flex flex-col gap-4">
                    <div className="relative aspect-video rounded-xl sm:rounded-2xl overflow-hidden bg-black flex items-center justify-center">
                      {activeMediaIsVideo && selectedProject.video ? (
                        <video
                          src={selectedProject.video}
                          controls
                          autoPlay
                          loop
                          muted
                          playsInline
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <Image
                          src={getScreenshot(
                            selectedProject,
                            activeMediaIndex
                          )}
                          alt={`${selectedProject.title} screenshot`}
                          fill
                          sizes="(max-width: 768px) 100vw, 768px"
                          className="object-cover"
                        />
                      )}
                    </div>

                    {/* Thumbnail Row */}
                    <div className="flex gap-2.5 sm:gap-3 overflow-x-auto pb-2 scrollbar-hide">
                      {selectedScreenshots.map((shot, sIdx) => (
                        <button
                          key={`${selectedProject.slug}-${sIdx}`}
                          onClick={() => setActiveMediaIndex(sIdx)}
                          aria-label={`View screenshot ${sIdx + 1}`}
                          className={`relative w-20 sm:w-24 aspect-video rounded-lg sm:rounded-xl overflow-hidden cursor-pointer shrink-0 transition-all ${
                            activeMediaIndex === sIdx
                              ? "ring-2 ring-zinc-950"
                              : "opacity-60 hover:opacity-100"
                          }`}
                        >
                          <Image
                            src={shot || "/abstract.png"}
                            alt={`${selectedProject.title} thumbnail ${sIdx + 1}`}
                            fill
                            sizes="96px"
                            className="object-cover"
                          />
                        </button>
                      ))}

                      {selectedProject.video && (
                        <button
                          onClick={() =>
                            setActiveMediaIndex(selectedScreenshots.length)
                          }
                          aria-label="Play project video"
                          className={`relative w-20 sm:w-24 aspect-video rounded-lg sm:rounded-xl overflow-hidden bg-zinc-900 flex items-center justify-center text-white cursor-pointer shrink-0 transition-all ${
                            activeMediaIsVideo
                              ? "ring-2 ring-zinc-950"
                              : "opacity-60 hover:opacity-100"
                          }`}
                        >
                          <Icon
                            name="play_circle"
                            className="text-2xl sm:text-3xl text-white"
                          />
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Project Story */}
                  <div className="px-4 sm:px-6 py-6 sm:py-8 flex flex-col gap-6">
                    <div className="flex flex-col gap-2">
                      <span className="text-xs font-bold tracking-widest text-zinc-400 uppercase">
                        Project Background
                      </span>

                      <p className="text-zinc-700 text-sm sm:text-base leading-relaxed">
                        {selectedProject.story}
                      </p>
                    </div>

                    <div className="pt-2 sm:pt-4 flex items-center justify-end">
                      <a
                        href={selectedProject.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full sm:w-auto justify-center inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-zinc-950 hover:bg-zinc-800 text-white text-sm font-semibold tracking-wide cursor-pointer transition-colors group"
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
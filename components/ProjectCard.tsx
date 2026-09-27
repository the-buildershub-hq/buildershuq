"use client";

import { useState } from "react";
import Image from "next/image";
import Icon from "@/components/Icon";
import type { Project } from "../lib/projects";

export default function ProjectCard({ project }: { project: Project }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-white rounded-3xl border border-zinc-200/80 overflow-hidden flex flex-col hover:border-brand-navy/30 transition-colors duration-300">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="text-left cursor-pointer"
      >
        <div className="relative w-full aspect-video bg-black">
          <Image
            src={project.screenshots[0]}
            alt={project.title}
            fill
            className="object-cover"
          />
        </div>
        <div className="p-6 flex flex-col gap-2">
          <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-zinc-400">
            {project.category}
          </span>
          <h3 className="text-lg font-extrabold text-zinc-950">
            {project.title}
          </h3>
          <p
            className={`text-zinc-500 text-sm leading-relaxed ${
              open ? "" : "line-clamp-2"
            }`}
          >
            {project.story}
          </p>
          <span className="text-[11px] font-bold text-zinc-400 mt-1">
            {open ? "Show less" : "Click to open details"}
          </span>
        </div>
      </button>

      <div className="px-6 pb-6 pt-2 border-t border-zinc-100 flex items-center justify-between">
        <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-zinc-300">
          {project.serviceLabel}
        </span>
        <a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          title={`Visit ${project.title}`}
          className="w-9 h-9 rounded-full border border-zinc-200 flex items-center justify-center text-zinc-500 hover:bg-brand-navy hover:text-white hover:border-brand-navy transition-all duration-300"
        >
          <Icon name="arrow_outward" className="text-sm" weight={600} />
        </a>
      </div>
    </div>
  );
}
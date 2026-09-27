import Link from "next/link";
import Icon from "@/components/Icon";
import { projects, services } from "../../lib/projects";
import ProjectCard from "../../components/ProjectCard";

export const metadata = {
  title: "Our Work — Builders Hub",
  description:
    "Case studies from Builders Hub: websites, mobile apps, backend systems, automations, and design work shipped for real clients.",
};

export default async function WorkPage({
  searchParams,
}: {
  searchParams: Promise<{ service?: string }>;
}) {
  const { service } = await searchParams;
  const activeService = services.find((s) => s.slug === service);
  const filtered = activeService
    ? projects.filter((p) => p.service === activeService.slug)
    : projects;

  return (
    <div className="min-h-screen bg-zinc-50 font-sans text-zinc-900">
      <header className="fixed top-4 left-0 right-0 z-50 px-4">
        <nav className="mx-auto max-w-7xl h-16 flex items-center justify-between px-6 rounded-full bg-white/70 backdrop-blur-md border border-zinc-200/50">
          <Link href="/" className="flex items-center gap-0.5">
            <span className="font-extrabold text-base tracking-tight text-zinc-950">
              Builders Hub
            </span>
          </Link>
          <Link
            href="/#contact"
            className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-brand-navy hover:bg-brand-navy-hover text-white text-xs font-semibold tracking-wide transition-all group"
          >
            Start a project
            <Icon
              name="arrow_outward"
              className="text-sm transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              weight={600}
            />
          </Link>
        </nav>
      </header>

      <main className="max-w-7xl mx-auto w-full px-6 pt-40 pb-24 flex flex-col gap-14">
        <div className="flex flex-col gap-4 max-w-2xl">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-zinc-400 hover:text-brand-navy transition-colors w-fit"
          >
            <Icon name="arrow_back" className="text-sm" weight={600} />
            Back home
          </Link>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-zinc-950 leading-tight">
            Work we&apos;ve shipped. <br />
            We Build. We Solve. We Show the Work.
          </h1>
          <p className="text-zinc-500 text-sm md:text-base leading-relaxed">
            Every project here is live, in the hands of real users. 
            Explore the websites and digital experiences we've designed and developed for businesses looking to improve how they show up, connect, and grow online.
          </p>
        </div>

        {/* Filter chips */}
        <div className="flex flex-wrap gap-2.5">
          <Link
            href="/work"
            className={`px-4 py-2 rounded-full text-xs font-bold tracking-wide transition-colors ${
              !activeService
                ? "bg-brand-navy text-white"
                : "bg-white border border-zinc-200 text-zinc-600 hover:border-brand-navy/40"
            }`}
          >
            All work
          </Link>
          {services.map((s) => (
            <Link
              key={s.slug}
              href={`/work?service=${s.slug}`}
              className={`px-4 py-2 rounded-full text-xs font-bold tracking-wide transition-colors ${
                activeService?.slug === s.slug
                  ? "bg-brand-navy text-white"
                  : "bg-white border border-zinc-200 text-zinc-600 hover:border-brand-navy/40"
              }`}
            >
              {s.label}
            </Link>
          ))}
        </div>

        {/* Project grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filtered.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
          {filtered.length === 0 && (
            <p className="text-sm text-zinc-500">
              Nothing filed under this service yet — check back soon.
            </p>
          )}
        </div>
      </main>
    </div>
  );
}
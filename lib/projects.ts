export interface Project {
  id: number;
  slug: string;
  title: string;
  category: string;
  service: string;
  serviceLabel: string;
  story: string;
  link: string;
  screenshots: string[];
  video?: string;
}

// serviceLabel must match the labels used in the Services section on the
// homepage so cards there can deep-link straight into the matching work here.
export const services = [
  { slug: "websites", label: "Websites & Web Apps" },
  { slug: "mobile", label: "Mobile Applications" },
  { slug: "backend", label: "Backend Systems" },
  { slug: "automation", label: "AI & Automations" },
  { slug: "design", label: "UI/UX Design" },
  { slug: "graphics", label: "Product & Graphics" },
];

export const projects: Project[] = [
  {
    id: 1,
    slug: "apex-logistics-dashboard",
    title: "Apex Logistics Dashboard",
    category: "Logistics & Fleet Systems",
    service: "backend",
    serviceLabel: "Backend Systems",
    story:
      "A comprehensive operational dashboard engineered for real-time fleet coordination and warehouse workflows. The system integrates automated OCR scanner APIs to read container labels, schedules optimal routes dynamically, and handles high-throughput inventory events. Built using Next.js and Go to ensure sub-second rendering and reliable background processing under heavy peak workloads.",
    link: "https://apexlogistics.example.com",
    screenshots: ["/abstract.png", "/hero-bg.png"],
    video: "https://assets.mixkit.co/videos/preview/mixkit-software-developer-working-on-his-computer-34282-large.mp4",
  },
  {
    id: 2,
    slug: "nova-commerce-engine",
    title: "Nova Commerce Engine",
    category: "High-Scale E-Commerce",
    service: "websites",
    serviceLabel: "Websites & Web Apps",
    story:
      "A modular, lightning-fast e-commerce storefront supporting over 100,000 daily checkouts. The build resolves stock-sync issues across distributed nodes, ships responsive checkout funnels, and wires in package-tracking automations. We designed this down to the pixel to make sure conversion holds up as traffic scales.",
    link: "https://novacommerce.example.com",
    screenshots: ["/hero-bg.png", "/abstract.png"],
  },
  {
    id: 3,
    slug: "scanflow-system",
    title: "ScanFlow System",
    category: "Hardware Integration & OCR",
    service: "automation",
    serviceLabel: "AI & Automations",
    story:
      "A high-performance scanning pipeline engineered specifically for physical warehouses. It reads package labels straight off camera feeds via OCR and syncs the data instantly to backend databases, with strict validation in place to prevent dropped packets and duplicate entries.",
    link: "https://scanflow.example.com",
    screenshots: ["/abstract.png", "/hero-bg.png"],
  },
  {
    id: 4,
    slug: "velo-automation-engine",
    title: "Velo Automation Engine",
    category: "AI & Workflow Automation",
    service: "automation",
    serviceLabel: "AI & Automations",
    story:
      "A node-based workflow system connecting customer operations, triggering background jobs, and running data-sync cycles end to end. It layers in detailed micro-interactions and clean dashboard views so the people running it can actually see what the system is doing.",
    link: "https://velo.example.com",
    screenshots: ["/hero-bg.png", "/abstract.png"],
    video: "https://assets.mixkit.co/videos/preview/mixkit-typing-on-a-computer-keyboard-close-up-44671-large.mp4",
  },
  {
    id: 5,
    slug: "aura-ledger-dashboard",
    title: "Aura Ledger Dashboard",
    category: "Financial Operations Suite",
    service: "websites",
    serviceLabel: "Websites & Web Apps",
    story:
      "A premium financial management tool that calculates liquidity metrics, generates compliance reports, and automates ledger adjustments. Built with detailed tables, custom layout grids, and interactive charts for a team that lives in this dashboard every day.",
    link: "https://aura.example.com",
    screenshots: ["/abstract.png", "/hero-bg.png"],
  },
  {
    id: 6,
    slug: "orbit-field-app",
    title: "Orbit Field App",
    category: "Field Service Mobile App",
    service: "mobile",
    serviceLabel: "Mobile Applications",
    story:
      "A React Native app built for field technicians juggling job sheets, parts inventory, and customer sign-off in places with patchy signal. Offline-first sync, camera-based proof-of-work capture, and route planning keep crews moving without waiting on a server.",
    link: "https://orbitfield.example.com",
    screenshots: ["/hero-bg.png", "/abstract.png"],
  },
  {
    id: 7,
    slug: "marbella-clinic-brand",
    title: "Marbella Clinic Identity",
    category: "Healthcare Branding & UI Kit",
    service: "design",
    serviceLabel: "UI/UX Design",
    story:
      "A full identity and interface system for a private clinic group: wireframes through to a high-fidelity design library covering booking flows, patient portals, and print collateral, all built to feel calm and trustworthy rather than clinical.",
    link: "https://marbellaclinic.example.com",
    screenshots: ["/abstract.png", "/hero-bg.png"],
  },
  {
    id: 8,
    slug: "harvest-brand-suite",
    title: "Harvest Market Brand Suite",
    category: "Brand & Marketing Collateral",
    service: "graphics",
    serviceLabel: "Product & Graphics",
    story:
      "A ground-up brand refresh for a regional grocery chain: logo system, packaging templates, a pitch deck for investors, and seasonal campaign layouts, all built to hold together across print and digital touchpoints.",
    link: "https://harvestmarket.example.com",
    screenshots: ["/hero-bg.png", "/abstract.png"],
  },
];
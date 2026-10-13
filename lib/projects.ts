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
    slug: "dheir-international",
    title: "D_HEIR International",
    category: "Procurement & Logistics",
    service: "websites",
    serviceLabel: "Websites & Web Apps",
    story:
      "A professional digital experience built for D_HEIR International, bringing its procurement, sourcing, and logistics services into one clear and accessible platform. The website was designed to communicate the company's services, simplify the customer journey, and make it easier for individuals and businesses to understand how D_HEIR can support their importation and logistics needs.",
    link: "https://www.dheirinternational.com/",
    screenshots: [
      "/projects/dheir_1.png",
      "/projects/dheir_2.png",
      "/projects/dheir_3.png",
      "/projects/dheir_4.png",
      "/projects/dheir_5.png"

    ],
    video: "",
  },
  {
    id: 2,
    slug: "beeseek",
    title: "BeeSeek",
    category: "Service Marketplace",
    service: "websites",
    serviceLabel: "Websites & Web Apps",
    story:
      "A digital platform built for BeeSeek, a service marketplace connecting customers with skilled professionals across multiple service categories. The website presents BeeSeek's ecosystem, highlights its agent onboarding process, and communicates key features such as nearby job discovery, in-app communication, and escrow-protected payments. Designed to build trust and simplify the user journey, the platform helps service providers showcase their offerings, manage bookings, and grow their professional reputation while supporting BeeSeek's mission to make service delivery more reliable and accessible across Africa.",
    link: "https://www.beeseek.site/",
    screenshots: [
      "/projects/beeseek_1.png",
      "/projects/beeseek_2.png",
      "/projects/beeseek_3.png",
      "/projects/beeseek_4.png",
    ],
    video: "",
  },
  {
    id: 3,
    slug: "lightstore",
    title: "LightStore",
    category: "SaaS & Developer Infrastructure",
    service: "websites",
    serviceLabel: "Websites & Web Apps",
    story:
      "A modern web platform built for LightStore, a headless form infrastructure solution designed to simplify form submissions, spam protection, and data routing for developers and businesses. The platform provides a streamlined experience for integrating forms into websites and applications without the need for complex backend setup. With features such as automated email notifications, Google Sheets synchronization, webhook integrations, and multi-tenant client management, LightStore helps developers and digital agencies manage form submissions efficiently while providing a reliable and scalable foundation for their projects.",
    link: "https://lightstore-app.web.app/",
    screenshots: [
      "/projects/lightstore_1.png",
      "/projects/lightstore_2.png",
      "/projects/lightstore_3.png",
      "/projects/lightstore_4.png",
    ],
    video: "",
  },
  {
    id: 4,
    slug: "btech-and-co",
    title: "BTech & Co",
    category: "Digital Growth & Marketing",
    service: "websites",
    serviceLabel: "Websites & Web Apps",
    story:
      "BuildersHub designed and developed a professional digital presence for BTech & Co, addressing the challenge of communicating digital services in a way that clearly demonstrates their value to growing businesses. We built a structured, conversion-focused website that brings the company's services, packages, and approach to digital growth into one accessible platform. By clarifying its offerings, highlighting the business problems it solves, and creating clear pathways to enquiries, free digital audits, and consultations, we helped BTech & Co present its expertise more effectively and make it easier for potential clients to understand its services and take the next step.",
    link: "https://www.btechco.co.uk/",
    screenshots: [
      "/projects/btechco_1.png",
      "/projects/btechco_2.png",
      "/projects/btechco_3.png",
      "/projects/btechco_4.png",
      "/projects/btechco_5.png"
    ],
    video: "",
  },
];
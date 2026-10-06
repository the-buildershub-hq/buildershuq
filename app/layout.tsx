import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://buildershub.tech"),
  title: "Builders Hub: Software Development Agency",
  description:
    "Builders Hub is a software development agency engineering high performance web and mobile applications, bespoke digital systems, and AI automations.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Builders Hub: Software Development Agency",
    description:
      "Engineering high performance web and mobile applications, bespoke digital systems, and AI automations.",
    url: "https://buildershub.tech",
    siteName: "Builders Hub",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Builders Hub: Software Development Agency",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Builders Hub: Software Development Agency",
    description:
      "Engineering high performance web and mobile applications, bespoke digital systems, and AI automations.",
    images: ["/og.png"],
  },
};

const sitelinksJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": "https://buildershub.tech/#website",
      url: "https://buildershub.tech",
      name: "Builders Hub",
      description:
        "Software development agency engineering high performance web and mobile applications, bespoke digital systems, and AI automations.",
      publisher: {
        "@id": "https://buildershub.tech/#organization",
      },
    },
    {
      "@type": "Organization",
      "@id": "https://buildershub.tech/#organization",
      name: "Builders Hub",
      url: "https://buildershub.tech",
      logo: "https://buildershub.tech/logo.png",
    },
    {
      "@type": "ItemList",
      itemListElement: [
        {
          "@type": "SiteNavigationElement",
          position: 1,
          name: "Work",
          description: "Shipped client projects, case studies, and digital products",
          url: "https://buildershub.tech/work",
        },
        {
          "@type": "SiteNavigationElement",
          position: 2,
          name: "Services",
          description: "Web development, mobile applications, backend systems, and AI automations",
          url: "https://buildershub.tech/#services",
        },
        {
          "@type": "SiteNavigationElement",
          position: 3,
          name: "About Us",
          description: "Digital foundations built directly around your business",
          url: "https://buildershub.tech/#about",
        },
        {
          "@type": "SiteNavigationElement",
          position: 4,
          name: "Pricing",
          description: "Transparent discovery sessions and tailored development roadmaps",
          url: "https://buildershub.tech/#pricing",
        },
        {
          "@type": "SiteNavigationElement",
          position: 5,
          name: "Contact",
          description: "Schedule a strategy consultation or start a project",
          url: "https://buildershub.tech/#contact",
        },
      ],
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,500;0,6..72,600;1,6..72,400&display=swap"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(sitelinksJsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}

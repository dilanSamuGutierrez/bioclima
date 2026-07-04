import type { Metadata } from "next";
import "./globals.css";
import { site, services, cities } from "@/lib/site";
import SmoothScroll from "@/components/providers/SmoothScroll";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ScrollProgress from "@/components/ui/ScrollProgress";
import WhatsAppButton from "@/components/ui/WhatsAppButton";
import BackToTop from "@/components/ui/BackToTop";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | ${site.seoTitle}`,
    template: `%s | ${site.name}`,
  },
  description: site.description,

  icons: {
    icon: "/Icono.png",
    shortcut: "/Icono.png",
    apple: "/Icono.png",
  },

  keywords: [
    "climatización de espacios",
    "climatización comercial Colombia",
    "climatización industrial",
    "aire acondicionado para empresas",
    "aire acondicionado oficinas",
    "instalación de aire acondicionado Bogotá",
    "ventilación mecánica",
    "sistemas VRF",
    "instalación VRF",
    "chiller agua helada",
    "mini split empresas",
    "mantenimiento de aire acondicionado",
    "mantenimiento HVAC preventivo",
    "ingeniería HVAC Colombia",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "es_CO",
    url: site.url,
    siteName: site.name,
    title: `${site.name} | ${site.seoTitle}`,
    description: site.description,
    images: [
      {
        url: "/Icono.png",
        width: 1200,
        height: 630,
        alt: `${site.name} — Climatización y HVAC`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} | ${site.seoTitle}`,
    description: site.description,
  },
  robots: { index: true, follow: true },
};
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "HVACBusiness",
  name: site.name,
  description: site.description,
  url: site.url,
  telephone: site.phone,
  email: site.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: "Cra. 15 #93-60, Of. 502",
    addressLocality: "Bogotá",
    addressCountry: "CO",
  },
  areaServed: [
    { "@type": "Country", name: "Colombia" },
    ...cities.map((c) => ({ "@type": "City" as const, name: c.name })),
  ],
  knowsAbout: [
    "Climatización de espacios comerciales e industriales",
    "Aire acondicionado para empresas",
    "Ventilación mecánica",
    "Sistemas VRF",
    "Chillers",
    "Mantenimiento HVAC",
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Servicios de climatización y HVAC",
    itemListElement: services.map((s) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: s.title,
        description: s.desc,
        areaServed: { "@type": "Country", name: "Colombia" },
        provider: { "@type": "Organization", name: site.name },
      },
    })),
  },
  priceRange: "$$$",
  sameAs: [],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <SmoothScroll>
          <ScrollProgress />
          <Navbar />
          <main>{children}</main>
          <Footer />
          <WhatsAppButton />
          <BackToTop />
        </SmoothScroll>
      </body>
    </html>
  );
}

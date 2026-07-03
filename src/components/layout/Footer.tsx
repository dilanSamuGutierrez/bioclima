import Image from "next/image";
import { site, cities, whatsappUrl } from "@/lib/site";

const serviceLinks = [
  "Ingeniería y Diseño HVAC",
  "Sistemas VRF",
  "Chillers",
  "Ventilación Mecánica",
  "Mantenimiento Preventivo",
  "Mantenimiento Correctivo",
];

export default function Footer() {
  return (
    <footer className="relative border-t border-mist/60 bg-snow">
      <div className="absolute inset-x-0 top-0 h-px glow-line opacity-40" />
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            {/* LOGO — mismo archivo /public/logo.svg del navbar */}
            <div className="relative h-10 w-44">
              <Image src="/logo.svg" alt={site.name} fill className="object-contain object-left" />
            </div>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-steel">
              {site.tagline}. Proyectos comerciales, corporativos e industriales con
              cobertura en toda Colombia.
            </p>
            <p className="mt-4 text-xs font-medium uppercase tracking-[0.25em] text-blue/70">
              {site.subtagline}
            </p>
          </div>

          <div className="lg:col-span-3">
            <h4 className="mb-5 text-xs font-semibold uppercase tracking-[0.3em] text-blue">
              Servicios
            </h4>
            <ul className="space-y-3 text-sm text-steel">
              {serviceLinks.map((s) => (
                <li key={s}>
                  <a href="#servicios" className="transition-colors hover:text-navy">
                    {s}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h4 className="mb-5 text-xs font-semibold uppercase tracking-[0.3em] text-blue">
              Cobertura
            </h4>
            <ul className="space-y-3 text-sm text-steel">
              {cities.map((c) => (
                <li key={c.name}>{c.name}</li>
              ))}
              <li className="text-steel/60">+ todo el país</li>
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h4 className="mb-5 text-xs font-semibold uppercase tracking-[0.3em] text-blue">
              Contacto
            </h4>
            <ul className="space-y-3 text-sm text-steel">
              <li>
                <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-navy">
                  WhatsApp: +{site.whatsapp}
                </a>
              </li>
              <li>
                <a href={site.phoneHref} className="transition-colors hover:text-navy">
                  {site.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${site.email}`} className="transition-colors hover:text-navy">
                  {site.email}
                </a>
              </li>
              <li>{site.address}</li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-mist/60 pt-8 text-xs text-steel/70 md:flex-row">
          <p>
            © {new Date().getFullYear()} {site.name}. Todos los derechos reservados.
          </p>
          <p>
            Ingeniería HVAC · Climatización · Ventilación Mecánica — Colombia
          </p>
        </div>
      </div>
    </footer>
  );
}

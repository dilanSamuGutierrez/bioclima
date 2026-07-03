"use client";

import Image from "next/image";
import { services, whatsappUrl } from "@/lib/site";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import TiltCard from "@/components/ui/TiltCard";

export default function Servicios() {
  return (
    <section id="servicios" className="relative bg-cloud/50 py-28 md:py-40">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal className="mb-16 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.35em] text-blue">
              Servicios
            </p>
            <h2 className="font-display text-3xl font-bold leading-tight tracking-tight text-ink md:text-5xl">
              Soluciones HVAC de <span className="text-gradient">principio a fin</span>
            </h2>
          </div>
          <a
            href={whatsappUrl("Hola Bioclima, quiero una asesoría sobre sus servicios HVAC.")}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 text-sm font-semibold text-blue transition-colors hover:text-electric"
          >
            Hablar con un ingeniero
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </a>
        </Reveal>

        <Stagger className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4" stagger={0.08}>
          {services.map((s) => (
            <StaggerItem key={s.title} className="h-full">
              <TiltCard className="h-full">
                <article className="group relative flex h-full min-h-[380px] flex-col justify-end overflow-hidden rounded-3xl bg-white shadow-[0_8px_30px_rgba(10,46,110,0.08)] transition-shadow duration-500 hover:shadow-[0_20px_50px_rgba(10,46,110,0.16)]">
                  {/* Imagen con zoom en hover */}
                  <div className="absolute inset-0 overflow-hidden">
                    <Image
                      src={s.img}
                      alt={s.title}
                      fill
                      sizes="(min-width:1024px) 25vw, (min-width:640px) 50vw, 100vw"
                      className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-110"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/30 to-transparent transition-opacity duration-500" />
                  <div className="relative p-6">
                    <h3 className="font-display text-lg font-bold leading-snug tracking-tight text-white">
                      {s.title}
                    </h3>
                    <p className="mt-2 max-h-0 overflow-hidden text-sm leading-relaxed text-white/85 opacity-0 transition-all duration-500 group-hover:max-h-32 group-hover:opacity-100">
                      {s.desc}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-cyan opacity-0 transition-all delay-100 duration-500 group-hover:opacity-100">
                      Cotizar <span>→</span>
                    </span>
                  </div>
                  <div className="absolute inset-0 rounded-3xl ring-0 ring-electric/0 transition-all duration-500 group-hover:ring-1 group-hover:ring-electric/40" />
                </article>
              </TiltCard>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

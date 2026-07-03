"use client";

import Image from "next/image";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import Counter from "@/components/ui/Counter";

const cases = [
  {
    sector: "Retail · Bogotá",
    title: "Centro comercial de gran formato",
    result: 32,
    suffix: "%",
    metric: "menos consumo energético tras rediseño con chillers de alta eficiencia y automatización.",
    img: "https://images.unsplash.com/photo-1519567241046-7f570eee3ce6?q=80&w=1800&auto=format&fit=crop",
  },
  {
    sector: "Salud · Medellín",
    title: "Clínica de alta complejidad",
    result: 100,
    suffix: "%",
    metric: "de cumplimiento en presiones y renovaciones de aire en áreas críticas, con confiabilidad 24/7.",
    img: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?q=80&w=1800&auto=format&fit=crop",
  },
  {
    sector: "Tecnología · Barranquilla",
    title: "Data center de misión crítica",
    result: 0,
    suffix: "",
    metric: "paradas no programadas desde la entrega: climatización de precisión con redundancia N+1.",
    img: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1800&auto=format&fit=crop",
  },
] as const;

export default function Casos() {
  return (
    <section id="casos" className="relative bg-white py-28 md:py-40">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal className="mb-16 max-w-3xl">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.35em] text-blue">
            Casos de éxito
          </p>
          <h2 className="font-display text-3xl font-bold leading-tight tracking-tight text-ink md:text-5xl">
            Resultados medibles en proyectos{" "}
            <span className="text-gradient">reales</span>
          </h2>
        </Reveal>

        <Stagger className="grid gap-6 lg:grid-cols-3" stagger={0.12}>
          {cases.map((c) => (
            <StaggerItem key={c.title} className="h-full">
              <article className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-mist/70 bg-white shadow-[0_8px_30px_rgba(10,46,110,0.06)] transition-shadow duration-500 hover:shadow-[0_20px_50px_rgba(10,46,110,0.14)]">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={c.img}
                    alt={c.title}
                    fill
                    sizes="(min-width:1024px) 33vw, 100vw"
                    className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/40 via-transparent to-transparent" />
                  <span className="glass-dark absolute left-5 top-5 rounded-full px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-white">
                    {c.sector}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-7">
                  <h3 className="font-display text-xl font-bold tracking-tight text-ink">{c.title}</h3>
                  <div className="mt-5 flex items-start gap-4">
                    <Counter
                      value={c.result}
                      suffix={c.suffix}
                      className="font-display text-5xl font-bold text-gradient"
                    />
                    <p className="pt-1 text-sm leading-relaxed text-steel">{c.metric}</p>
                  </div>
                </div>
                <div className="h-1 w-0 bg-gradient-to-r from-cyan to-electric transition-all duration-700 group-hover:w-full" />
              </article>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

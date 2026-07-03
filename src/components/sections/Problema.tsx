"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { Reveal } from "@/components/ui/Reveal";

const problems = [
  {
    n: "01",
    title: "Costos energéticos fuera de control",
    desc: "Un sistema mal dimensionado puede representar hasta el 40% de la factura eléctrica de un edificio. Cada mes que pasa, el sobrecosto se acumula.",
    img: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?q=80&w=2200&auto=format&fit=crop",
    alt: "Sala de control con indicadores de consumo energético",
  },
  {
    n: "02",
    title: "Equipos obsoletos que fallan sin aviso",
    desc: "La tecnología HVAC de hace una década consume más, falla más y pone en riesgo la continuidad de la operación en los momentos más críticos.",
    img: "https://images.unsplash.com/photo-1565043666747-69f6646db940?q=80&w=2200&auto=format&fit=crop",
    alt: "Planta industrial con equipos antiguos",
  },
  {
    n: "03",
    title: "Aire de baja calidad, personas menos productivas",
    desc: "CO₂ elevado, humedad descontrolada y mala renovación de aire deterioran la salud, la concentración y el rendimiento de los equipos de trabajo.",
    img: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?q=80&w=2200&auto=format&fit=crop",
    alt: "Oficina corporativa moderna",
  },
] as const;

function ProblemRow({
  p,
  index,
}: {
  p: (typeof problems)[number];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 90%", "end 40%"],
  });
  const clip = useTransform(
    scrollYProgress,
    [0, 0.6],
    ["inset(12% 12% 12% 12% round 24px)", "inset(0% 0% 0% 0% round 24px)"]
  );
  const imgScale = useTransform(scrollYProgress, [0, 1], [1.2, 1]);
  const even = index % 2 === 0;

  return (
    <div
      ref={ref}
      className={`grid items-center gap-10 lg:grid-cols-2 lg:gap-16 ${
        even ? "" : "lg:[&>*:first-child]:order-2"
      }`}
    >
      <motion.div style={{ clipPath: clip }} className="relative aspect-[4/3] overflow-hidden">
        <motion.div style={{ scale: imgScale }} className="absolute inset-0">
          <Image src={p.img} alt={p.alt} fill sizes="(min-width:1024px) 50vw, 100vw" className="object-cover" />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-navy/60 via-transparent to-transparent" />
        <span className="font-display absolute bottom-5 left-6 text-6xl font-bold text-white/25">
          {p.n}
        </span>
      </motion.div>

      <Reveal delay={0.15}>
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-cyan">
          Riesgo {p.n}
        </p>
        <h3 className="font-display text-2xl font-bold leading-snug tracking-tight text-white md:text-4xl">
          {p.title}
        </h3>
        <p className="mt-5 max-w-lg leading-relaxed text-white/70">{p.desc}</p>
      </Reveal>
    </div>
  );
}

export default function Problema() {
  return (
    <section id="problema" className="animated-gradient-blue relative overflow-hidden py-28 md:py-40">
      <div className="absolute inset-0 opacity-60 [background:radial-gradient(60%_50%_at_50%_0%,rgba(56,182,255,0.18),transparent)]" />
      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal className="mx-auto mb-24 max-w-3xl text-center">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.35em] text-cyan">
            El costo invisible
          </p>
          <h2 className="font-display text-3xl font-bold leading-tight tracking-tight text-white md:text-5xl">
            Una climatización deficiente le está costando a tu empresa{" "}
            <span className="text-gradient-light">más de lo que crees</span>
          </h2>
        </Reveal>

        <div className="space-y-28 md:space-y-36">
          {problems.map((p, i) => (
            <ProblemRow key={p.n} p={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

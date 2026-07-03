"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";

const consequences = [
  { stat: "+35%", label: "de sobreconsumo energético en sistemas sin mantenimiento" },
  { stat: "×3", label: "más fallas en equipos que superan su vida útil de diseño" },
  { stat: "-20%", label: "de productividad en espacios con mala calidad del aire" },
  { stat: "48h+", label: "de parada operativa promedio ante una falla mayor sin plan correctivo" },
] as const;

export default function Consecuencias() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);
  const imgScale = useTransform(scrollYProgress, [0, 1], [1.15, 1.25]);

  return (
    <section ref={ref} className="relative overflow-hidden py-32 md:py-44">
      {/* Fotografía con parallax + velo azul profundo */}
      <motion.div style={{ y: imgY, scale: imgScale }} className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1565043666747-69f6646db940?q=80&w=2600&auto=format&fit=crop"
          alt="Planta industrial en riesgo operativo"
          fill
          sizes="100vw"
          className="object-cover"
        />
      </motion.div>
      <div className="absolute inset-0 bg-navy/85" />
      <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-white opacity-10" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal className="mx-auto mb-20 max-w-3xl text-center">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.35em] text-amber-300">
            El costo de no actuar
          </p>
          <h2 className="font-display text-3xl font-bold leading-tight tracking-tight text-white md:text-5xl">
            Posponer la decisión también es una decisión —{" "}
            <span className="bg-gradient-to-r from-amber-300 to-cyan bg-clip-text text-transparent">
              y es la más costosa
            </span>
          </h2>
        </Reveal>

        <Stagger className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4" stagger={0.1}>
          {consequences.map((c) => (
            <StaggerItem key={c.stat}>
              <div className="glass-dark h-full rounded-2xl p-7 transition-all duration-500 hover:-translate-y-1.5 hover:border-cyan/40">
                <span className="font-display block text-4xl font-bold text-white md:text-5xl">
                  {c.stat}
                </span>
                <p className="mt-4 text-sm leading-relaxed text-white/75">{c.label}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal delay={0.3} className="mt-16 text-center">
          <p className="mx-auto max-w-xl text-lg text-white/85">
            Cada uno de estos escenarios es prevenible con ingeniería.{" "}
            <a href="#contacto" className="font-semibold text-cyan underline-offset-4 transition-colors hover:text-white hover:underline">
              Actúa antes de que la falla decida por ti →
            </a>
          </p>
        </Reveal>
      </div>
    </section>
  );
}

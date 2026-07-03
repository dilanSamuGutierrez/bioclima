"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";

const steps = [
  {
    n: "01",
    title: "Ingeniería",
    desc: "Levantamiento técnico, cálculo de cargas térmicas y análisis de eficiencia energética del proyecto.",
    icon: (
      <path d="M9.5 2h5M12 2v4m-7 16h14M7 22V13a5 5 0 0 1 10 0v9M4 9l3 3m13-3-3 3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    ),
  },
  {
    n: "02",
    title: "Diseño",
    desc: "Planos, selección de equipos y modelado de la solución óptima: VRF, Chiller, expansión directa o ventilación.",
    icon: (
      <path d="M3 21v-4L16.5 3.5a2.1 2.1 0 0 1 3 3L6 20l-3 1ZM14 6l3 3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    ),
  },
  {
    n: "03",
    title: "Instalación",
    desc: "Ejecución certificada con supervisión de ingeniería, cronograma real y protocolos de seguridad industrial.",
    icon: (
      <path d="M14.7 6.3a4.5 4.5 0 0 0-6 6L3 18l3 3 5.7-5.7a4.5 4.5 0 0 0 6-6L14 13l-3-3 3.7-3.7Z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    ),
  },
  {
    n: "04",
    title: "Automatización",
    desc: "Control inteligente por zonas, monitoreo remoto y optimización continua del consumo energético.",
    icon: (
      <path d="M12 3v3m0 12v3M3 12h3m12 0h3M6.3 6.3l2.1 2.1m7.2 7.2 2.1 2.1m0-11.4-2.1 2.1M8.4 15.6l-2.1 2.1M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    ),
  },
  {
    n: "05",
    title: "Mantenimiento",
    desc: "Planes preventivos y correctivos a nivel nacional que protegen la inversión durante todo su ciclo de vida.",
    icon: (
      <path d="M12 22a10 10 0 1 1 10-10M12 6v6l4 2m6-2-2 3-3-2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    ),
  },
] as const;

export default function Solucion() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 70%", "end 80%"],
  });
  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section ref={ref} id="solucion" className="relative overflow-hidden bg-white py-28 md:py-40">
      <div className="absolute inset-0 opacity-70 [background:radial-gradient(55%_40%_at_80%_0%,rgba(56,182,255,0.08),transparent)]" />
      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal className="mb-20 max-w-3xl">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.35em] text-blue">
            Nuestro método
          </p>
          <h2 className="font-display text-3xl font-bold leading-tight tracking-tight text-ink md:text-5xl">
            Un proceso de ingeniería que{" "}
            <span className="text-gradient">elimina la improvisación</span>
          </h2>
          <p className="mt-6 max-w-2xl leading-relaxed text-steel">
            Cada proyecto pasa por cinco fases controladas. El resultado: sistemas que
            rinden como fueron diseñados, consumen menos y duran más.
          </p>
        </Reveal>

        <div className="relative">
          {/* Línea vertical que se dibuja con el scroll */}
          <svg
            aria-hidden
            className="absolute left-[27px] top-0 hidden h-full w-1 md:block"
            viewBox="0 0 2 100"
            preserveAspectRatio="none"
          >
            <line x1="1" y1="0" x2="1" y2="100" stroke="rgba(13,28,48,0.08)" strokeWidth="2" />
            <motion.line
              x1="1" y1="0" x2="1" y2="100"
              stroke="url(#lineGrad)"
              strokeWidth="2"
              style={{ pathLength }}
            />
            <defs>
              <linearGradient id="lineGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#38B6FF" />
                <stop offset="100%" stopColor="#0A58D0" />
              </linearGradient>
            </defs>
          </svg>

          <Stagger className="space-y-8 md:space-y-12" stagger={0.15}>
            {steps.map((s) => (
              <StaggerItem key={s.n}>
                <div className="group flex gap-6 md:gap-10">
                  <div className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-mist bg-white text-blue shadow-[0_4px_20px_rgba(10,46,110,0.08)] transition-all duration-500 group-hover:border-electric/50 group-hover:text-electric group-hover:shadow-[0_8px_30px_rgba(18,115,248,0.2)]">
                    <svg width="24" height="24" viewBox="0 0 24 24">{s.icon}</svg>
                  </div>
                  <div className="flex-1 rounded-2xl border border-mist/70 bg-snow p-6 transition-all duration-500 group-hover:-translate-y-1 group-hover:border-electric/30 group-hover:bg-cloud/60 group-hover:shadow-[0_16px_40px_rgba(10,46,110,0.1)] md:p-8">
                    <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                      <span className="font-display text-sm font-bold text-electric">{s.n}</span>
                      <h3 className="font-display text-xl font-bold tracking-tight text-ink md:text-2xl">
                        {s.title}
                      </h3>
                    </div>
                    <p className="mt-3 max-w-2xl leading-relaxed text-steel">{s.desc}</p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </div>
    </section>
  );
}

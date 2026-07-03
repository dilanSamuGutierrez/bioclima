"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { whatsappUrl, marqueeItems } from "@/lib/site";
import { WordsReveal } from "@/components/ui/Reveal";
import MagneticButton from "@/components/ui/MagneticButton";
import Marquee from "@/components/ui/Marquee";

const HERO_IMG =
  "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2800&auto=format&fit=crop";

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const scale = useTransform(scrollYProgress, [0, 1], [1.06, 1.22]);
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "14%"]);
  // Parallax sutil: el contenido (y los CTA) permanecen visibles
  // mientras el Hero está en pantalla; solo se desvanecen al final.
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);
  const opacity = useTransform(scrollYProgress, [0.55, 0.95], [1, 0]);

  return (
    <section
      ref={ref}
      id="inicio"
      className="relative flex min-h-[100svh] flex-col overflow-hidden bg-snow"
      // El Hero nunca queda bajo el navbar: consume su altura real
      style={{ paddingTop: "var(--nav-h, 88px)" }}
    >
      {/* Fotografía protagonista con zoom cinematográfico */}
      <motion.div style={{ scale, y: bgY }} className="absolute inset-0">
        <Image
          src={HERO_IMG}
          alt="Climatización de espacios corporativos — oficina moderna con aire acondicionado de precisión"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </motion.div>
      {/* Velo luminoso: legibilidad sin oscurecer */}
      <div className="absolute inset-0 bg-gradient-to-r from-white via-white/88 to-white/25 md:to-white/10" />
      <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-white/40" />
      {/* Luz ambiental azul sutil */}
      <div className="animate-float absolute hidden md:block -left-40 top-1/3 h-[28rem] w-[28rem] rounded-full bg-electric/10 blur-[130px]" />
      <div className="animate-float absolute hidden md:block right-0 top-16 h-72 w-72 rounded-full bg-cyan/15 blur-[110px] [animation-delay:2.5s]" />

      {/* Contenido */}
      <motion.div
        style={{ y: contentY, opacity }}
        className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center px-6 py-16 lg:px-10"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-6 flex items-center gap-3"
        >
          <span className="h-px w-12 bg-blue" />
          <span className="text-xs font-semibold uppercase tracking-[0.35em] text-blue">
            Bioclima SAS
          </span>
        </motion.div>

        {/* H1 = búsqueda real en Google */}
        <h1 className="font-display max-w-4xl text-[clamp(2.4rem,6vw,4.8rem)] font-bold leading-[1.12] tracking-tight text-ink">
          <WordsReveal text="Climatización y aire acondicionado" delay={0.3} className="text-gradient" />
          <WordsReveal text="para empresas en Colombia" delay={1.05} />
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.9, delay: 1.8 }}
          className="mt-7 max-w-2xl text-lg leading-relaxed text-steel md:text-xl"
        >
          Diseñamos, instalamos y mantenemos sistemas VRF, Chiller, Mini Split y
          ventilación mecánica para oficinas, comercio, salud e industria en todo
          el país.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2 }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <MagneticButton>
            <a
              href={whatsappUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-blue px-8 py-4 text-sm font-semibold text-white shadow-[0_10px_35px_rgba(10,88,208,0.35)] transition-all duration-500 hover:bg-electric hover:shadow-[0_14px_45px_rgba(18,115,248,0.45)]"
            >
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              Agenda tu visita técnica gratis
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="transition-transform duration-300 group-hover:translate-x-1">
                <path d="M5 12h14m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </MagneticButton>
          <MagneticButton>
            <a
              href="#proyectos"
              className="glass inline-flex items-center gap-2 rounded-full px-8 py-4 text-sm font-semibold text-navy transition-all duration-300 hover:border-electric/40 hover:text-electric"
            >
              Ver proyectos
            </a>
          </MagneticButton>
        </motion.div>

        {/* Indicadores de confianza */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2.4 }}
          className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm text-steel"
        >
          {["+15 años de experiencia", "Cobertura nacional", "Proyectos de alta complejidad"].map(
            (t) => (
              <span key={t} className="flex items-center gap-2.5">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" className="text-blue">
                  <path d="M20 6 9 17l-5-5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {t}
              </span>
            )
          )}
        </motion.div>
      </motion.div>

      {/* Marquee inferior sobre franja clara */}
      <div className="relative z-10 border-t border-mist/60 bg-white/70 backdrop-blur-sm">
        <Marquee items={marqueeItems} />
      </div>
    </section>
  );
}

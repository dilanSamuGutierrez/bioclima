"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";

// ---- Red circular de cobertura (hub Bogotá + nodos) ----
const HUB = { name: "Bogotá", x: 250, y: 250 };
const NODES = [
  { name: "Medellín", x: 130, y: 200 },
  { name: "Cali", x: 135, y: 350 },
  { name: "Barranquilla", x: 275, y: 60 },
  { name: "Cartagena", x: 185, y: 85 },
  { name: "Bucaramanga", x: 365, y: 155 },
  { name: "Villavicencio", x: 350, y: 330 },
] as const;

// Conexiones entre nodos (índices de NODES)
const NODE_LINKS: [number, number][] = [
  [2, 3], // Barranquilla — Cartagena
  [3, 0], // Cartagena — Medellín
  [0, 1], // Medellín — Cali
  [4, 2], // Bucaramanga — Barranquilla
];

const curve = (a: { x: number; y: number }, b: { x: number; y: number }) => {
  const mx = (a.x + b.x) / 2;
  const my = (a.y + b.y) / 2;
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const len = Math.hypot(dx, dy) || 1;
  const off = Math.min(20, len * 0.15);
  return `M ${a.x} ${a.y} Q ${mx - (dy / len) * off} ${my + (dx / len) * off} ${b.x} ${b.y}`;
};

// Partículas deterministas (solo desktop)
const PARTICLES = Array.from({ length: 18 }, (_, i) => {
  const r = (n: number) => {
    const v = Math.sin(i * 127.1 + n * 311.7) * 43758.5453;
    return v - Math.floor(v);
  };
  return {
    x: 5 + r(1) * 90,
    y: 5 + r(2) * 90,
    size: 1.5 + r(3) * 3,
    dur: 7 + r(4) * 8,
    delay: r(5) * 6,
    opacity: 0.25 + r(6) * 0.5,
  };
});

const coverageStats = [
  { value: "32", label: "ciudades atendidas" },
  { value: "7", label: "centros de operación" },
  { value: "24/7", label: "soporte nacional" },
];

export default function Cobertura() {
  const ref = useRef<HTMLElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const inView = useInView(mapRef, { once: true, margin: "-15% 0px" });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const mapY = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <section
      ref={ref}
      id="cobertura"
      className="relative overflow-hidden bg-navy py-24 md:py-36"
    >
      {/* Luces de fondo — solo desktop (rendimiento móvil) */}
      <div aria-hidden className="hidden md:block">
        <div className="animate-mesh absolute -left-32 top-0 h-[34rem] w-[34rem] rounded-full bg-electric/25 blur-[140px]" />
        <div className="animate-mesh absolute -right-24 top-1/4 h-[28rem] w-[28rem] rounded-full bg-cyan/20 blur-[130px] [animation-delay:5s]" />
        <div className="animate-mesh absolute bottom-0 left-1/3 h-[24rem] w-[24rem] rounded-full bg-blue/30 blur-[120px] [animation-delay:10s]" />
      </div>
      {/* Versión ligera del fondo para móvil */}
      <div aria-hidden className="absolute inset-0 md:hidden [background:radial-gradient(80%_60%_at_50%_35%,rgba(18,115,248,0.22),transparent)]" />
      <div aria-hidden className="absolute inset-0 [background:radial-gradient(70%_50%_at_50%_45%,transparent_30%,rgba(6,24,58,0.85)_100%)]" />

      {/* Partículas — solo desktop */}
      <div aria-hidden className="absolute inset-0 hidden md:block">
        {PARTICLES.map((p, i) => (
          <motion.span
            key={i}
            className="absolute rounded-full bg-cyan"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: p.size,
              height: p.size,
              opacity: p.opacity,
              boxShadow: "0 0 8px rgba(56,182,255,0.9)",
            }}
            animate={{ y: [0, -20, 0], opacity: [p.opacity, p.opacity * 0.3, p.opacity] }}
            transition={{ duration: p.dur, delay: p.delay, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal className="mx-auto mb-12 max-w-3xl text-center md:mb-14">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.35em] text-cyan">
            Cobertura nacional
          </p>
          <h2 className="font-display text-3xl font-bold leading-tight tracking-tight text-white md:text-5xl">
            Una red de ingeniería conectada con{" "}
            <span className="text-gradient-light">toda Colombia</span>
          </h2>
          <p className="mx-auto mt-6 max-w-xl leading-relaxed text-white/70">
            Proyectos y mantenimiento multi-sede en todo el territorio, coordinados
            desde Bogotá con centros de operación en las principales ciudades.
          </p>
        </Reveal>

        <div className="relative grid items-center gap-10 lg:grid-cols-[1fr_auto_1fr]">
          {/* Estadísticas */}
          <div className="order-2 flex flex-row flex-wrap justify-center gap-4 lg:order-1 lg:flex-col lg:items-end">
            {coverageStats.map((s, i) => (
              <Reveal key={s.label} delay={0.15 + i * 0.12} blur={false}>
                <div className="glass-dark rounded-2xl px-6 py-4 text-center lg:text-right">
                  <span className="font-display block text-3xl font-bold text-white">{s.value}</span>
                  <span className="text-xs uppercase tracking-[0.2em] text-cyan">{s.label}</span>
                </div>
              </Reveal>
            ))}
          </div>

          {/* ---- Radar circular de cobertura ---- */}
          <motion.div
            ref={mapRef}
            style={{ y: mapY }}
            className="order-1 mx-auto w-full max-w-[22rem] md:max-w-md lg:order-2 lg:w-[30rem] lg:max-w-none"
          >
            <div className="relative">
              <div className="absolute inset-[-10%] hidden rounded-full bg-electric/15 blur-[90px] md:block" />
              <svg
                viewBox="0 0 500 500"
                className="relative w-full md:drop-shadow-[0_0_40px_rgba(18,115,248,0.3)]"
                role="img"
                aria-label="Red de cobertura nacional de Bioclima: Bogotá, Medellín, Cali, Barranquilla, Cartagena, Bucaramanga y Villavicencio"
              >
                <defs>
                  <linearGradient id="ringStroke" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#38B6FF" />
                    <stop offset="100%" stopColor="#1273F8" />
                  </linearGradient>
                  <linearGradient id="sweepGrad" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="rgba(56,182,255,0.5)" />
                    <stop offset="100%" stopColor="rgba(56,182,255,0)" />
                  </linearGradient>
                  <radialGradient id="hubGlow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="rgba(18,115,248,0.4)" />
                    <stop offset="100%" stopColor="rgba(18,115,248,0)" />
                  </radialGradient>
                  <filter id="nodeGlow" x="-200%" y="-200%" width="500%" height="500%">
                    <feGaussianBlur stdDeviation="3" result="b" />
                    <feMerge>
                      <feMergeNode in="b" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                {/* Fondo del radar */}
                <circle cx="250" cy="250" r="230" fill="url(#hubGlow)" opacity="0.35" />

                {/* Anillos concéntricos que se dibujan */}
                {[70, 140, 210].map((r, i) => (
                  <motion.circle
                    key={r}
                    cx="250"
                    cy="250"
                    r={r}
                    fill="none"
                    stroke="rgba(56,182,255,0.22)"
                    strokeWidth="1"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={inView ? { pathLength: 1, opacity: 1 } : {}}
                    transition={{ duration: 1.4, delay: 0.2 + i * 0.25, ease: "easeInOut" }}
                  />
                ))}
                {/* Anillo exterior punteado girando lento */}
                <motion.circle
                  cx="250" cy="250" r="230"
                  fill="none"
                  stroke="url(#ringStroke)"
                  strokeWidth="1.6"
                  strokeDasharray="3 10"
                  strokeLinecap="round"
                  initial={{ opacity: 0 }}
                  animate={inView ? { opacity: 0.9 } : {}}
                  transition={{ duration: 1, delay: 0.9 }}
                  style={{ transformOrigin: "250px 250px" }}
                >
                  <animateTransform attributeName="transform" type="rotate" from="0 250 250" to="360 250 250" dur="60s" repeatCount="indefinite" />
                </motion.circle>

                {/* Barrido tipo radar — solo desktop */}
                <g className="hidden md:inline" opacity="0.35">
                  <path d="M 250 250 L 250 22 A 228 228 0 0 1 364 52 Z" fill="url(#sweepGrad)">
                    <animateTransform attributeName="transform" type="rotate" from="0 250 250" to="360 250 250" dur="12s" repeatCount="indefinite" />
                  </path>
                </g>

                {/* Conexiones hub → ciudades */}
                {NODES.map((n, i) => {
                  const d = curve(HUB, n);
                  return (
                    <g key={n.name}>
                      <motion.path
                        d={d}
                        fill="none"
                        stroke="rgba(56,182,255,0.45)"
                        strokeWidth="1.3"
                        strokeDasharray="5 6"
                        className="animate-dash"
                        initial={{ opacity: 0 }}
                        animate={inView ? { opacity: 1 } : {}}
                        transition={{ duration: 0.7, delay: 1.1 + i * 0.12 }}
                      />
                      {/* Pulso viajando — solo desktop */}
                      <circle r="2.6" fill="#ffffff" filter="url(#nodeGlow)" className="hidden md:inline" opacity={inView ? 1 : 0}>
                        <animateMotion dur={`${3 + (i % 3)}s`} begin={`${1.4 + i * 0.5}s`} repeatCount="indefinite" path={d} />
                      </circle>
                    </g>
                  );
                })}

                {/* Conexiones entre ciudades */}
                {NODE_LINKS.map(([a, b], i) => (
                  <motion.path
                    key={i}
                    d={curve(NODES[a], NODES[b])}
                    fill="none"
                    stroke="rgba(56,182,255,0.25)"
                    strokeWidth="1"
                    strokeDasharray="4 7"
                    className="animate-dash"
                    initial={{ opacity: 0 }}
                    animate={inView ? { opacity: 1 } : {}}
                    transition={{ duration: 0.7, delay: 1.6 + i * 0.12 }}
                  />
                ))}

                {/* Hub central: Bogotá */}
                <motion.g
                  initial={{ opacity: 0, scale: 0 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.6, delay: 0.8, type: "spring" }}
                  style={{ transformOrigin: "250px 250px" }}
                >
                  <circle cx="250" cy="250" r="26" fill="rgba(56,182,255,0.14)">
                    <animate attributeName="r" values="20;34;20" dur="3s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.5;0.12;0.5" dur="3s" repeatCount="indefinite" />
                  </circle>
                  <circle cx="250" cy="250" r="8" fill="#ffffff" filter="url(#nodeGlow)" />
                  <circle cx="250" cy="250" r="4" fill="#1273F8" />
                  <text x="250" y="292" textAnchor="middle" fill="#ffffff" fontSize="16" fontWeight="700" style={{ fontFamily: "var(--font-body)" }}>
                    {HUB.name}
                  </text>
                  <text x="250" y="310" textAnchor="middle" fill="rgba(56,182,255,0.9)" fontSize="10.5" fontWeight="600" letterSpacing="2" style={{ fontFamily: "var(--font-body)" }}>
                    CENTRO DE OPERACIONES
                  </text>
                </motion.g>

                {/* Nodos de ciudad */}
                {NODES.map((n, i) => {
                  const left = n.x < 250;
                  return (
                    <motion.g
                      key={n.name}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={inView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ duration: 0.5, delay: 1.2 + i * 0.13, type: "spring" }}
                      style={{ transformOrigin: `${n.x}px ${n.y}px` }}
                    >
                      <circle cx={n.x} cy={n.y} r="12" fill="rgba(56,182,255,0.16)">
                        <animate attributeName="r" values="8;17;8" dur="2.6s" repeatCount="indefinite" begin={`${i * 0.35}s`} />
                        <animate attributeName="opacity" values="0.5;0.12;0.5" dur="2.6s" repeatCount="indefinite" begin={`${i * 0.35}s`} />
                      </circle>
                      <circle cx={n.x} cy={n.y} r="4.5" fill="#ffffff" filter="url(#nodeGlow)" />
                      <circle cx={n.x} cy={n.y} r="2.2" fill="#38B6FF" />
                      <text
                        x={left ? n.x - 12 : n.x + 12}
                        y={n.y + 5}
                        textAnchor={left ? "end" : "start"}
                        fill="rgba(255,255,255,0.95)"
                        fontSize="15"
                        fontWeight="600"
                        style={{ fontFamily: "var(--font-body)" }}
                      >
                        {n.name}
                      </text>
                    </motion.g>
                  );
                })}
              </svg>
            </div>
          </motion.div>

          {/* Beneficios */}
          <div className="order-3 flex flex-col items-center gap-4 lg:items-start">
            {[
              "Equipos técnicos que se desplazan a cualquier ciudad",
              "Cronogramas y reportes centralizados por sede",
              "Tiempos de respuesta garantizados por contrato",
            ].map((t, i) => (
              <Reveal key={t} delay={0.2 + i * 0.12} blur={false}>
                <div className="glass-dark flex max-w-xs items-start gap-3 rounded-2xl px-5 py-4">
                  <span className="relative mt-1 flex h-2 w-2 shrink-0">
                    <span className="animate-ping-soft absolute inline-flex h-full w-full rounded-full bg-cyan" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan" />
                  </span>
                  <p className="text-sm leading-relaxed text-white/85">{t}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { cities } from "@/lib/site";
import { Reveal } from "@/components/ui/Reveal";

// Silueta estilizada de Colombia (trazo propio)
const COLOMBIA_PATH =
  "M232 8 Q214 20 196 38 Q182 40 172 44 Q156 56 146 72 Q128 92 112 120 Q104 144 108 170 Q106 200 112 230 Q114 262 122 290 Q126 316 135 335 Q136 346 140 352 Q162 362 185 370 Q196 396 205 420 Q220 458 238 492 Q248 462 252 430 Q262 406 270 380 Q296 356 320 330 Q336 302 348 270 Q354 248 356 225 Q344 202 330 180 Q316 164 300 150 Q292 134 285 120 Q272 108 262 96 Q266 72 268 52 Q250 28 232 8 Z";

// Red de conexiones entre ciudades (índices de `cities`)
const LINKS: [number, number][] = [
  [3, 4], // Barranquilla — Cartagena
  [4, 1], // Cartagena — Medellín
  [1, 0], // Medellín — Bogotá
  [1, 2], // Medellín — Cali
  [0, 2], // Bogotá — Cali
  [0, 5], // Bogotá — Bucaramanga
  [5, 3], // Bucaramanga — Barranquilla
  [0, 6], // Bogotá — Villavicencio
];

// Curva suave entre dos ciudades (control point desplazado)
const curve = (a: { x: number; y: number }, b: { x: number; y: number }) => {
  const mx = (a.x + b.x) / 2;
  const my = (a.y + b.y) / 2;
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const len = Math.hypot(dx, dy) || 1;
  // desplaza el punto de control perpendicular a la línea
  const off = Math.min(22, len * 0.18);
  return `M ${a.x} ${a.y} Q ${mx - (dy / len) * off} ${my + (dx / len) * off} ${b.x} ${b.y}`;
};

// Partículas deterministas (mismo resultado en servidor y cliente)
const PARTICLES = Array.from({ length: 34 }, (_, i) => {
  const r = (n: number) => {
    const v = Math.sin(i * 127.1 + n * 311.7) * 43758.5453;
    return v - Math.floor(v);
  };
  return {
    x: 4 + r(1) * 92,
    y: 4 + r(2) * 92,
    size: 1.5 + r(3) * 3,
    dur: 6 + r(4) * 9,
    delay: r(5) * 6,
    opacity: 0.25 + r(6) * 0.55,
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
  // Capas con profundidad: el mapa y el fondo se mueven a ritmos distintos
  const mapY = useTransform(scrollYProgress, [0, 1], [70, -70]);
  const meshY = useTransform(scrollYProgress, [0, 1], [-40, 40]);

  const bogota = cities[0];

  return (
    <section
      ref={ref}
      id="cobertura"
      className="relative overflow-hidden bg-navy py-28 md:py-36"
    >
      {/* ---- Gradient mesh en movimiento lento ---- */}
      <motion.div style={{ y: meshY }} aria-hidden className="absolute inset-0">
        <div className="animate-mesh absolute -left-32 top-0 h-[36rem] w-[36rem] rounded-full bg-electric/25 blur-[140px]" />
        <div className="animate-mesh absolute -right-24 top-1/4 h-[30rem] w-[30rem] rounded-full bg-cyan/20 blur-[130px] [animation-delay:5s]" />
        <div className="animate-mesh absolute bottom-0 left-1/3 h-[26rem] w-[26rem] rounded-full bg-blue/30 blur-[120px] [animation-delay:10s]" />
        <div className="absolute inset-0 [background:radial-gradient(70%_50%_at_50%_45%,transparent_30%,rgba(6,24,58,0.85)_100%)]" />
      </motion.div>

      {/* ---- Partículas flotantes ---- */}
      <div aria-hidden className="absolute inset-0">
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
            animate={{ y: [0, -22, 0], opacity: [p.opacity, p.opacity * 0.3, p.opacity] }}
            transition={{ duration: p.dur, delay: p.delay, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal className="mx-auto mb-14 max-w-3xl text-center">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.35em] text-cyan">
            Cobertura nacional
          </p>
          <h2 className="font-display text-3xl font-bold leading-tight tracking-tight text-white md:text-5xl">
            Una red de ingeniería conectada con{" "}
            <span className="text-gradient-light">toda Colombia</span>
          </h2>
          <p className="mx-auto mt-6 max-w-xl leading-relaxed text-white/70">
            Proyectos y mantenimiento multi-sede en todo el territorio, coordinados
            desde nuestros centros de operación.
          </p>
        </Reveal>

        <div className="relative grid items-center gap-10 lg:grid-cols-[1fr_auto_1fr]">
          {/* Chips de estadística — izquierda */}
          <div className="order-2 flex flex-row justify-center gap-4 lg:order-1 lg:flex-col lg:items-end">
            {coverageStats.map((s, i) => (
              <Reveal key={s.label} delay={0.2 + i * 0.15}>
                <div className="glass-dark rounded-2xl px-6 py-4 text-center lg:text-right">
                  <span className="font-display block text-3xl font-bold text-white">{s.value}</span>
                  <span className="text-xs uppercase tracking-[0.2em] text-cyan">{s.label}</span>
                </div>
              </Reveal>
            ))}
          </div>

          {/* ---- Mapa protagonista ---- */}
          <motion.div
            ref={mapRef}
            style={{ y: mapY }}
            className="order-1 mx-auto w-full max-w-lg lg:order-2 lg:w-[30rem]"
          >
            <div className="relative">
              {/* Halo de profundidad */}
              <div className="absolute inset-[-15%] rounded-full bg-electric/15 blur-[90px]" />
              <svg
                viewBox="0 0 400 500"
                className="relative w-full drop-shadow-[0_0_45px_rgba(18,115,248,0.35)]"
                role="img"
                aria-label="Mapa de cobertura nacional de Bioclima en Colombia"
              >
                <defs>
                  <linearGradient id="mapStroke" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#38B6FF" />
                    <stop offset="100%" stopColor="#1273F8" />
                  </linearGradient>
                  <radialGradient id="mapFill" cx="45%" cy="40%" r="75%">
                    <stop offset="0%" stopColor="rgba(18,115,248,0.35)" />
                    <stop offset="55%" stopColor="rgba(10,88,208,0.18)" />
                    <stop offset="100%" stopColor="rgba(10,46,110,0.05)" />
                  </radialGradient>
                  <pattern id="dots" width="12" height="12" patternUnits="userSpaceOnUse">
                    <circle cx="2" cy="2" r="1" fill="rgba(56,182,255,0.35)" />
                  </pattern>
                  <clipPath id="colombiaClip">
                    <path d={COLOMBIA_PATH} />
                  </clipPath>
                  <filter id="cityGlow" x="-200%" y="-200%" width="500%" height="500%">
                    <feGaussianBlur stdDeviation="3" result="b" />
                    <feMerge>
                      <feMergeNode in="b" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                {/* Relleno: gradiente + matriz de puntos */}
                <motion.g
                  initial={{ opacity: 0 }}
                  animate={inView ? { opacity: 1 } : {}}
                  transition={{ duration: 1.6, delay: 0.8 }}
                >
                  <path d={COLOMBIA_PATH} fill="url(#mapFill)" />
                  <rect width="400" height="500" fill="url(#dots)" clipPath="url(#colombiaClip)" />
                </motion.g>

                {/* Contorno con glow que se dibuja */}
                <motion.path
                  d={COLOMBIA_PATH}
                  fill="none"
                  stroke="url(#mapStroke)"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={inView ? { pathLength: 1 } : {}}
                  transition={{ duration: 2.4, ease: "easeInOut" }}
                  style={{ filter: "drop-shadow(0 0 10px rgba(56,182,255,0.6))" }}
                />
                {/* Segundo trazo recorriendo el contorno en bucle */}
                <path
                  d={COLOMBIA_PATH}
                  fill="none"
                  stroke="rgba(255,255,255,0.55)"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeDasharray="30 400"
                  className="animate-dash"
                />

                {/* Red de conexiones luminosas */}
                {LINKS.map(([a, b], i) => {
                  const d = curve(cities[a], cities[b]);
                  return (
                    <g key={i}>
                      <motion.path
                        d={d}
                        fill="none"
                        stroke="rgba(56,182,255,0.4)"
                        strokeWidth="1.2"
                        strokeDasharray="5 6"
                        className="animate-dash"
                        initial={{ opacity: 0 }}
                        animate={inView ? { opacity: 1 } : {}}
                        transition={{ duration: 0.8, delay: 1.8 + i * 0.12 }}
                      />
                      {/* Pulso de luz viajando por la línea */}
                      <circle r="2.6" fill="#ffffff" filter="url(#cityGlow)" opacity={inView ? 1 : 0}>
                        <animateMotion
                          dur={`${3.2 + (i % 4) * 0.9}s`}
                          begin={`${1.8 + i * 0.4}s`}
                          repeatCount="indefinite"
                          path={d}
                        />
                      </circle>
                    </g>
                  );
                })}

                {/* Nodos de ciudad */}
                {cities.map((c, i) => (
                  <motion.g
                    key={c.name}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.5, delay: 1.5 + i * 0.14, type: "spring" }}
                    style={{ transformOrigin: `${c.x}px ${c.y}px` }}
                  >
                    <circle cx={c.x} cy={c.y} r="11" fill="rgba(56,182,255,0.18)">
                      <animate attributeName="r" values="7;16;7" dur="2.6s" repeatCount="indefinite" begin={`${i * 0.35}s`} />
                      <animate attributeName="opacity" values="0.5;0.1;0.5" dur="2.6s" repeatCount="indefinite" begin={`${i * 0.35}s`} />
                    </circle>
                    <circle cx={c.x} cy={c.y} r="4.2" fill="#ffffff" filter="url(#cityGlow)" />
                    <circle cx={c.x} cy={c.y} r="2.2" fill="#38B6FF" />
                    <text
                      x={c.x + 13}
                      y={c.y + 4}
                      fill="rgba(255,255,255,0.92)"
                      fontSize="13.5"
                      fontWeight="600"
                      style={{ fontFamily: "var(--font-body)", textShadow: "0 1px 8px rgba(6,24,58,0.9)" }}
                    >
                      {c.name}
                    </text>
                  </motion.g>
                ))}
              </svg>
            </div>
          </motion.div>

          {/* Texto de apoyo — derecha */}
          <div className="order-3 flex flex-col items-center gap-4 lg:items-start">
            {[
              "Equipos técnicos que se desplazan a cualquier ciudad",
              "Cronogramas y reportes centralizados por sede",
              "Tiempos de respuesta garantizados por contrato",
            ].map((t, i) => (
              <Reveal key={t} delay={0.3 + i * 0.15}>
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

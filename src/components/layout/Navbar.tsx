"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { whatsappUrl } from "@/lib/site";
import MagneticButton from "@/components/ui/MagneticButton";

const links = [
  { label: "Servicios", href: "#servicios" },
  { label: "Proyectos", href: "#proyectos" },
  { label: "Cobertura", href: "#cobertura" },
  { label: "Casos", href: "#casos" },
  { label: "FAQ", href: "#faq" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Publica la altura real del navbar como --nav-h (el Hero y el
  // scroll-padding-top de los anclajes la consumen dinámicamente).
  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;
    const setVar = () =>
      document.documentElement.style.setProperty("--nav-h", `${el.offsetHeight}px`);
    setVar();
    const ro = new ResizeObserver(setVar);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <motion.header
      ref={headerRef}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed inset-x-0 top-0 z-[60] transition-all duration-500 ${
        scrolled
          ? "glass py-3 shadow-[0_8px_30px_rgba(10,46,110,0.08)]"
          : "bg-white/60 py-5 backdrop-blur-md"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 lg:px-10">
        {/* ============================================
            LOGO — reemplaza el archivo /public/logo.svg
            (o cambia src por /logo.png con el logo real)
            ============================================ */}
        <a href="#inicio" aria-label="Bioclima SAS — inicio" className="relative block h-15 w-80">
          <Image
            src="/Logo.png"
            alt="Bioclima SAS"
            fill
            priority
            className="object-contain object-left"
          />
        </a>

        <nav className="hidden items-center gap-8 lg:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="group relative text-sm font-medium text-ink/70 transition-colors duration-300 hover:text-navy"
            >
              {l.label}
              <span className="absolute -bottom-1.5 left-0 h-0.5 w-0 bg-electric transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
          <MagneticButton strength={0.25}>
            <a
              href={whatsappUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-blue px-6 py-2.5 text-sm font-semibold text-white shadow-[0_4px_20px_rgba(10,88,208,0.35)] transition-all duration-300 hover:bg-electric hover:shadow-[0_6px_30px_rgba(18,115,248,0.45)]"
            >
              Visita técnica gratis
            </a>
          </MagneticButton>
        </nav>

        {/* Menú móvil */}
        <button
          onClick={() => setOpen(!open)}
          aria-label="Abrir menú"
          aria-expanded={open}
          className="glass flex h-11 w-11 items-center justify-center rounded-full lg:hidden"
        >
          <div className="space-y-1.5">
            <motion.span animate={{ rotate: open ? 45 : 0, y: open ? 4 : 0 }} className="block h-0.5 w-5 bg-ink" />
            <motion.span animate={{ rotate: open ? -45 : 0, y: open ? -4 : 0 }} className="block h-0.5 w-5 bg-ink" />
          </div>
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="glass mx-4 mt-3 overflow-hidden rounded-2xl lg:hidden"
          >
            <div className="flex flex-col p-6">
              {links.map((l, i) => (
                <motion.a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                  className="border-b border-ink/5 py-4 text-lg font-medium text-ink last:border-0"
                >
                  {l.label}
                </motion.a>
              ))}
              <a
                href={whatsappUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 rounded-full bg-blue py-3.5 text-center text-sm font-semibold text-white"
              >
                Visita técnica gratis
              </a>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

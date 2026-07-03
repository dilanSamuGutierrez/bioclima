"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { site, whatsappUrl } from "@/lib/site";
import { Reveal } from "@/components/ui/Reveal";
import MagneticButton from "@/components/ui/MagneticButton";

const projectTypes = [
  "Oficinas / Corporativo",
  "Centro comercial / Retail",
  "Hospital / Clínica",
  "Hotel",
  "Industria / Bodega",
  "Data Center / Laboratorio",
  "Otro",
];

export default function CTAFinal() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end end"],
  });
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.2, 1]);

  const [form, setForm] = useState({
    nombre: "",
    empresa: "",
    email: "",
    telefono: "",
    tipo: projectTypes[0],
    mensaje: "",
  });

  const handle =
    (k: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
      setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = [
      `Hola ${site.shortName}, quiero agendar una visita técnica.`,
      `• Nombre: ${form.nombre}`,
      `• Empresa: ${form.empresa}`,
      `• Correo: ${form.email}`,
      `• Teléfono: ${form.telefono}`,
      `• Tipo de proyecto: ${form.tipo}`,
      form.mensaje ? `• Detalles: ${form.mensaje}` : "",
    ]
      .filter(Boolean)
      .join("\n");
    window.open(whatsappUrl(msg), "_blank");
  };

  return (
    <section ref={ref} id="contacto" className="animated-gradient-blue relative overflow-hidden py-28 md:py-40">
      {/* Fotografía sutil bajo el azul corporativo */}
      <motion.div style={{ scale: bgScale }} className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2600&auto=format&fit=crop"
          alt="Edificio corporativo moderno"
          fill
          sizes="100vw"
          className="object-cover opacity-15"
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-b from-navy/60 via-transparent to-navy/70" />
      <div className="animate-float absolute left-1/4 top-10 h-72 w-72 rounded-full bg-cyan/20 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal className="mx-auto mb-16 max-w-3xl text-center">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.35em] text-cyan">
            Empecemos
          </p>
          <h2 className="font-display text-4xl font-bold leading-tight tracking-tight text-white md:text-6xl">
            Tu proyecto merece <span className="text-gradient-light">ingeniería real</span>
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-white/80">
            {site.cta}
          </p>
        </Reveal>

        <div className="grid gap-8 lg:grid-cols-5">
          {/* Formulario premium */}
          <Reveal className="lg:col-span-3">
            <form onSubmit={submit} className="glass-dark rounded-3xl p-7 md:p-10">
              <div className="grid gap-5 sm:grid-cols-2">
                <input required placeholder="Nombre completo *" value={form.nombre} onChange={handle("nombre")} className="field" />
                <input required placeholder="Empresa *" value={form.empresa} onChange={handle("empresa")} className="field" />
                <input required type="email" placeholder="Correo corporativo *" value={form.email} onChange={handle("email")} className="field" />
                <input required type="tel" placeholder="Teléfono *" value={form.telefono} onChange={handle("telefono")} className="field" />
                <select value={form.tipo} onChange={handle("tipo")} className="field sm:col-span-2 [&>option]:bg-navy">
                  {projectTypes.map((t) => (
                    <option key={t}>{t}</option>
                  ))}
                </select>
                <textarea
                  rows={4}
                  placeholder="Cuéntanos sobre tu proyecto (área, sedes, sistema actual...)"
                  value={form.mensaje}
                  onChange={handle("mensaje")}
                  className="field resize-none sm:col-span-2"
                />
              </div>
              <MagneticButton className="mt-7 w-full">
                <button
                  type="submit"
                  className="group relative w-full overflow-hidden rounded-full bg-white px-8 py-4.5 text-sm font-bold text-navy shadow-[0_10px_40px_rgba(255,255,255,0.25)] transition-all duration-500 hover:shadow-[0_14px_55px_rgba(255,255,255,0.4)]"
                >
                  <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-cyan/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                  Solicitar visita técnica sin costo
                </button>
              </MagneticButton>
              <p className="mt-4 text-center text-xs text-white/60">
                Respuesta en menos de 24 horas hábiles. Sin compromiso.
              </p>
            </form>
          </Reveal>

          {/* Datos de contacto + QR */}
          <Reveal delay={0.15} className="lg:col-span-2">
            <div className="glass-dark flex h-full flex-col justify-between rounded-3xl p-7 md:p-10">
              <div className="space-y-6">
                {[
                  { label: "WhatsApp", value: `+${site.whatsapp.slice(0, 2)} ${site.whatsapp.slice(2, 5)} ${site.whatsapp.slice(5, 8)} ${site.whatsapp.slice(8)}`, href: whatsappUrl() },
                  { label: "Teléfono", value: site.phone, href: site.phoneHref },
                  { label: "Correo", value: site.email, href: `mailto:${site.email}` },
                  { label: "Sitio web", value: site.url.replace("https://", ""), href: site.url },
                  { label: "Dirección", value: site.address },
                ].map((c) => (
                  <div key={c.label}>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-cyan">
                      {c.label}
                    </p>
                    {c.href ? (
                      <a
                        href={c.href}
                        target={c.href.startsWith("http") ? "_blank" : undefined}
                        rel="noopener noreferrer"
                        className="mt-1 block font-medium text-white transition-colors hover:text-cyan"
                      >
                        {c.value}
                      </a>
                    ) : (
                      <p className="mt-1 font-medium text-white">{c.value}</p>
                    )}
                  </div>
                ))}
              </div>

              <div className="mt-10 flex items-center gap-5 rounded-2xl bg-white/10 p-5">
                <div className="shrink-0 rounded-xl bg-white p-2.5">
                  {/* QR generado hacia WhatsApp — regenerar con scripts/generate-qr.mjs */}
                  <Image src="/qr-contacto.svg" alt="Código QR de contacto WhatsApp" width={96} height={96} />
                </div>
                <p className="text-sm leading-relaxed text-white/75">
                  Escanea el código y habla directamente con un{" "}
                  <span className="font-semibold text-white">ingeniero de proyectos</span>.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

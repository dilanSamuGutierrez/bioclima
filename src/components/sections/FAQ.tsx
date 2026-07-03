"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { faqs } from "@/lib/site";
import { Reveal } from "@/components/ui/Reveal";

function FaqItem({
  q,
  a,
  open,
  onToggle,
}: {
  q: string;
  a: string;
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <div className={`overflow-hidden rounded-2xl border bg-white shadow-[0_4px_20px_rgba(10,46,110,0.05)] transition-all duration-300 ${open ? "border-electric/40 shadow-[0_12px_35px_rgba(10,46,110,0.1)]" : "border-mist/70"}`}>
      <button
        onClick={onToggle}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-6 px-6 py-5 text-left md:px-8 md:py-6"
      >
        <span className="font-display text-base font-semibold tracking-tight text-ink md:text-lg">
          {q}
        </span>
        <motion.span
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.3 }}
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border text-lg transition-colors duration-300 ${
            open ? "border-electric bg-electric text-white" : "border-mist text-blue"
          }`}
        >
          +
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="px-6 pb-6 leading-relaxed text-steel md:px-8 md:pb-7">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQ() {
  const [open, setOpen] = useState<number>(0);

  return (
    <section id="faq" className="relative bg-snow py-28 md:py-36">
      <div className="mx-auto max-w-4xl px-6 lg:px-10">
        <Reveal className="mb-14 text-center">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.35em] text-blue">
            Preguntas frecuentes
          </p>
          <h2 className="font-display text-3xl font-bold tracking-tight text-ink md:text-5xl">
            Lo que las empresas nos <span className="text-gradient">preguntan</span>
          </h2>
        </Reveal>

        <div className="space-y-4">
          {faqs.map((f, i) => (
            <Reveal key={f.q} delay={i * 0.06} y={24}>
              <FaqItem
                q={f.q}
                a={f.a}
                open={open === i}
                onToggle={() => setOpen(open === i ? -1 : i)}
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

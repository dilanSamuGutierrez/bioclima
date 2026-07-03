"use client";

import { stats } from "@/lib/site";
import Counter from "@/components/ui/Counter";
import { Stagger, StaggerItem, Reveal } from "@/components/ui/Reveal";

export default function Stats() {
  return (
    <section className="relative bg-white py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal className="mb-16 max-w-3xl">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.35em] text-blue">
            Resultados que respaldan
          </p>
          <h2 className="font-display text-3xl font-bold leading-tight tracking-tight text-ink md:text-5xl">
            La ingeniería HVAC en la que confían las empresas de{" "}
            <span className="text-gradient">todo el país</span>
          </h2>
        </Reveal>

        <Stagger className="grid grid-cols-2 gap-x-8 gap-y-14 lg:grid-cols-4">
          {stats.map((s) => (
            <StaggerItem key={s.label}>
              <div className="border-l-2 border-electric/30 pl-6">
                <Counter
                  value={s.value}
                  suffix={s.suffix}
                  className="font-display block text-5xl font-bold tracking-tight text-navy md:text-6xl"
                />
                <p className="mt-3 text-sm leading-snug text-steel">{s.label}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

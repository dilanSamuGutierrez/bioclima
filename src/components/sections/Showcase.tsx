"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projects } from "@/lib/site";

gsap.registerPlugin(ScrollTrigger);

export default function Showcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const ctx = gsap.context(() => {
      const getDistance = () => track.scrollWidth - window.innerWidth;

      // Sticky section + horizontal scroll
      const tween = gsap.to(track, {
        x: () => -getDistance(),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${getDistance()}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      });

      // Parallax interno de cada imagen
      gsap.utils.toArray<HTMLElement>(".showcase-img").forEach((img) => {
        gsap.fromTo(
          img,
          { xPercent: -8 },
          {
            xPercent: 8,
            ease: "none",
            scrollTrigger: {
              trigger: img.parentElement,
              containerAnimation: tween,
              start: "left right",
              end: "right left",
              scrub: true,
            },
          }
        );
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="proyectos" className="relative overflow-hidden bg-snow">
      <div className="flex h-[100svh] flex-col justify-center">
        <div className="mx-auto w-full max-w-7xl px-6 pb-8 lg:px-10">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.35em] text-blue">
            Proyectos
          </p>
          <h2 className="font-display text-3xl font-bold tracking-tight text-ink md:text-5xl">
            Donde opera nuestra <span className="text-gradient">ingeniería</span>
          </h2>
        </div>

        <div ref={trackRef} className="flex w-max items-stretch gap-6 pl-6 pr-[12vw] lg:pl-10">
          {projects.map((p, i) => (
            <article
              key={p.title}
              className="group relative h-[58svh] w-[82vw] shrink-0 overflow-hidden rounded-3xl md:w-[46vw] lg:w-[38vw]"
            >
              <div className="showcase-img absolute inset-[-10%]">
                <Image
                  src={p.img}
                  alt={p.title}
                  fill
                  sizes="(min-width:1024px) 42vw, 85vw"
                  className="object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-105"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-navy/85 via-navy/15 to-transparent" />
              <span className="font-display absolute right-6 top-5 text-7xl font-bold text-white/15">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="absolute inset-x-0 bottom-0 p-7 md:p-9">
                <span className="glass-dark mb-4 inline-block rounded-full px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.25em] text-cyan">
                  {p.tag}
                </span>
                <h3 className="font-display text-2xl font-bold tracking-tight text-white md:text-3xl">
                  {p.title}
                </h3>
                <p className="mt-2 max-w-md text-sm leading-relaxed text-white/85 opacity-0 transition-all duration-500 group-hover:opacity-100">
                  {p.desc}
                </p>
              </div>
            </article>
          ))}
        </div>

        <div className="mx-auto mt-8 w-full max-w-7xl px-6 lg:px-10">
          <p className="text-xs uppercase tracking-[0.3em] text-steel">
            Desliza — el proyecto continúa →
          </p>
        </div>
      </div>
    </section>
  );
}

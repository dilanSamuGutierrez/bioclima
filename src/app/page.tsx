import Hero from "@/components/sections/Hero";
import Stats from "@/components/sections/Stats";
import Problema from "@/components/sections/Problema";
import Solucion from "@/components/sections/Solucion";
import Showcase from "@/components/sections/Showcase";
import Servicios from "@/components/sections/Servicios";
import Cobertura from "@/components/sections/Cobertura";
import Casos from "@/components/sections/Casos";
import Consecuencias from "@/components/sections/Consecuencias";
import FAQ from "@/components/sections/FAQ";
import CTAFinal from "@/components/sections/CTAFinal";

export default function Home() {
  return (
    <>
      <Hero />
      <Stats />
      <Problema />
      <Solucion />
      <Showcase />
      <Servicios />
      <Cobertura />
      <Casos />
      <Consecuencias />
      <FAQ />
      <CTAFinal />
    </>
  );
}

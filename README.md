# Bioclima SAS — Sitio Web Premium HVAC

Landing premium construida con **Next.js 16 + TypeScript + Tailwind CSS 4 + Framer Motion + GSAP (ScrollTrigger) + Lenis**.

## Comandos

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # build de producción
```

## Personalización rápida

| Qué | Dónde |
|---|---|
| **Logo** | Reemplazar `public/logo.svg` (usado en navbar y footer). Si es PNG, cambiar `src` en `src/components/layout/Navbar.tsx` y `Footer.tsx` |
| **WhatsApp, teléfono, correo, dirección, dominio** | `src/lib/site.ts` (todo centralizado) |
| **Código QR** | Actualizar número en `scripts/generate-qr.mjs` y correr `node scripts/generate-qr.mjs` |
| **Estadísticas, servicios, proyectos, FAQ, ciudades** | `src/lib/site.ts` |
| **Imágenes** | URLs de Unsplash en `src/lib/site.ts` y en cada sección — reemplazar por fotografía real del cliente cuando exista |
| **Colores de marca** | Variables en `src/app/globals.css` (`@theme`) |

## Estructura

- `src/app/` — layout (SEO, Schema.org HVACBusiness, Open Graph, sitemap, robots), página principal
- `src/components/sections/` — Hero, Stats, Problema, Solución, Showcase (scroll horizontal), Servicios, Cobertura (mapa Colombia), Casos, Consecuencias, FAQ, CTA final
- `src/components/ui/` — MagneticButton, TiltCard 3D, Counter animado, Marquee, Reveal (fade/blur/stagger), ScrollProgress, WhatsApp flotante, BackToTop
- `src/components/providers/SmoothScroll.tsx` — Lenis + GSAP ScrollTrigger

## SEO incluido

Metadata completa, Open Graph, Twitter Card, JSON-LD `HVACBusiness`, sitemap.xml, robots.txt, canonical, imágenes AVIF/WebP con lazy loading nativo de `next/image`.

// ============================================================
// CONFIGURACIÓN CENTRAL — Bioclima SAS
// Reemplaza aquí los datos de contacto reales del cliente.
// ============================================================

export const site = {
  name: "Bioclima SAS",
  shortName: "Bioclima",
  tagline: "Especialistas en Ingeniería HVAC, Climatización y Ventilación Mecánica",
  subtagline: "Diseño, instalación y mantenimiento con cobertura nacional",
  seoTitle:
    "Climatización y Aire Acondicionado para Empresas en Colombia",
  description:
    "Climatizamos tus espacios: aire acondicionado, ventilación mecánica y sistemas VRF, Chiller y Mini Split para oficinas, centros comerciales, hospitales e industria. Diseño, instalación y mantenimiento HVAC con cobertura en toda Colombia.",
  url: "https://www.bioclima.com.co", // ← dominio real
  // ---- CONTACTO (placeholders — reemplazar) ----
  whatsapp: "573001234567", // sin "+", formato internacional
  phone: "+57 (601) 745 8890",
  phoneHref: "tel:+576017458890",
  email: "comercial@bioclima.com.co",
  address: "Cra. 15 #93-60, Of. 502, Bogotá D.C., Colombia",
  cta: "Agenda una visita técnica sin costo y recibe asesoría especializada para tu proyecto.",
} as const;

export const whatsappUrl = (msg?: string) =>
  `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(
    msg ??
      "Hola Bioclima, quiero agendar una visita técnica sin costo para mi proyecto HVAC."
  )}`;

export const stats = [
  { value: 15, suffix: "+", label: "Años de experiencia" },
  { value: 480, suffix: "+", label: "Proyectos ejecutados" },
  { value: 200, suffix: "+", label: "Empresas atendidas" },
  { value: 32, suffix: "", label: "Ciudades con cobertura" },
] as const;

export const cities = [
  { name: "Bogotá", x: 205, y: 258 },
  { name: "Medellín", x: 152, y: 214 },
  { name: "Cali", x: 138, y: 300 },
  { name: "Barranquilla", x: 178, y: 52 },
  { name: "Cartagena", x: 152, y: 74 },
  { name: "Bucaramanga", x: 222, y: 172 },
  { name: "Villavicencio", x: 232, y: 282 },
] as const;

export const services = [
  {
    title: "Ingeniería y Diseño HVAC",
    desc: "Cálculo de cargas térmicas, modelado y planos técnicos que garantizan eficiencia desde el primer trazo.",
    img: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=1600&auto=format&fit=crop",
  },
  {
    title: "Sistemas VRF",
    desc: "Climatización de flujo variable para edificios corporativos: control por zonas y máxima eficiencia energética.",
    img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1600&auto=format&fit=crop",
  },
  {
    title: "Chillers",
    desc: "Plantas de agua helada para hospitales, industria y grandes superficies. Ingeniería de alta complejidad.",
    img: "https://images.unsplash.com/photo-1565043666747-69f6646db940?q=80&w=1600&auto=format&fit=crop",
  },
  {
    title: "Ventilación Mecánica",
    desc: "Renovación de aire, extracción y presurización que protegen la salud y la operación de su edificio.",
    img: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?q=80&w=1600&auto=format&fit=crop",
  },
  {
    title: "Mini Split y Expansión Directa",
    desc: "Soluciones precisas para oficinas, comercios y áreas técnicas, con instalación certificada.",
    img: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1600&auto=format&fit=crop",
  },
  {
    title: "Instalación Profesional",
    desc: "Ejecución de obra con supervisión de ingeniería, cronogramas reales y protocolos de seguridad.",
    img: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=1600&auto=format&fit=crop",
  },
  {
    title: "Mantenimiento Preventivo",
    desc: "Planes programados que extienden la vida útil de sus equipos y reducen el consumo energético.",
    img: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=1600&auto=format&fit=crop",
  },
  {
    title: "Mantenimiento Correctivo",
    desc: "Respuesta técnica ágil en todo el país para minimizar paradas y proteger su operación.",
    img: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1600&auto=format&fit=crop",
  },
] as const;

export const projects = [
  {
    tag: "Retail",
    title: "Centros Comerciales",
    desc: "Confort estable para miles de visitantes con sistemas centralizados de alto rendimiento.",
    img: "https://images.unsplash.com/photo-1519567241046-7f570eee3ce6?q=80&w=2400&auto=format&fit=crop",
  },
  {
    tag: "Salud",
    title: "Hospitales y Clínicas",
    desc: "Calidad de aire crítica, presiones controladas y confiabilidad absoluta 24/7.",
    img: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?q=80&w=2400&auto=format&fit=crop",
  },
  {
    tag: "Tecnología",
    title: "Data Centers",
    desc: "Climatización de precisión y redundancia para infraestructura de misión crítica.",
    img: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=2400&auto=format&fit=crop",
  },
  {
    tag: "Corporativo",
    title: "Edificios de Oficinas",
    desc: "Sistemas VRF inteligentes que elevan la productividad y reducen la factura energética.",
    img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2400&auto=format&fit=crop",
  },
  {
    tag: "Industria",
    title: "Plantas Industriales",
    desc: "Ventilación y control térmico para procesos exigentes y ambientes seguros.",
    img: "https://images.unsplash.com/photo-1565043666747-69f6646db940?q=80&w=2400&auto=format&fit=crop",
  },
  {
    tag: "Hotelería",
    title: "Hoteles",
    desc: "Confort silencioso y eficiente que se traduce en mejores experiencias y reseñas.",
    img: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2400&auto=format&fit=crop",
  },
] as const;

export const faqs = [
  {
    q: "¿En qué ciudades de Colombia tienen cobertura?",
    a: "Atendemos proyectos en todo el territorio nacional, con presencia recurrente en Bogotá, Medellín, Cali, Barranquilla, Cartagena, Bucaramanga y Villavicencio. Nuestro equipo técnico se desplaza a cualquier ciudad del país.",
  },
  {
    q: "¿Qué tipo de proyectos desarrollan?",
    a: "Nos especializamos en proyectos comerciales, corporativos e industriales: centros comerciales, hospitales, oficinas, hoteles, aeropuertos, laboratorios, data centers y plantas industriales. Trabajamos sistemas VRF, Chiller, Mini Split, expansión directa y ventilación mecánica.",
  },
  {
    q: "¿La visita técnica tiene algún costo?",
    a: "No. La visita técnica inicial y el diagnóstico son sin costo. Un ingeniero evalúa su proyecto, levanta la información necesaria y le entregamos una propuesta técnica y económica clara.",
  },
  {
    q: "¿Cuánto puede reducirse el consumo energético con un sistema bien diseñado?",
    a: "Depende del estado actual de la instalación, pero un rediseño con equipos de alta eficiencia y automatización suele reducir el consumo de climatización entre un 25% y un 40%, con retornos de inversión típicos de 2 a 4 años.",
  },
  {
    q: "¿Ofrecen contratos de mantenimiento para varias sedes?",
    a: "Sí. Diseñamos planes de mantenimiento preventivo y correctivo a nivel nacional, con cronogramas por sede, reportes técnicos centralizados y tiempos de respuesta garantizados.",
  },
  {
    q: "¿Trabajan con marcas específicas de equipos?",
    a: "Somos independientes de marca: seleccionamos la tecnología que mejor se ajusta a cada proyecto (Daikin, Carrier, LG, Trane, York, Mitsubishi Electric, entre otras), priorizando eficiencia, respaldo local y ciclo de vida.",
  },
] as const;

export const marqueeItems = [
  "Centros Comerciales",
  "Hospitales",
  "Data Centers",
  "Edificios Corporativos",
  "Hoteles",
  "Aeropuertos",
  "Laboratorios",
  "Plantas Industriales",
  "Bodegas",
  "Oficinas",
] as const;

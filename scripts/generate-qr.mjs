// Genera public/qr-contacto.svg apuntando al WhatsApp configurado.
// Uso: node scripts/generate-qr.mjs
import QRCode from "qrcode";
import { writeFileSync } from "node:fs";

const WHATSAPP = "573001234567"; // ← mantener sincronizado con src/lib/site.ts
const url = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(
  "Hola Bioclima, quiero agendar una visita técnica sin costo."
)}`;

const svg = await QRCode.toString(url, {
  type: "svg",
  margin: 1,
  color: { dark: "#081226", light: "#FFFFFF" },
});

writeFileSync(new URL("../public/qr-contacto.svg", import.meta.url), svg);
console.log("QR generado → public/qr-contacto.svg");

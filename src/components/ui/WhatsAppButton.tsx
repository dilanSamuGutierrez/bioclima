"use client";

import { motion } from "framer-motion";
import { whatsappUrl } from "@/lib/site";

export default function WhatsAppButton() {
  return (
    <motion.a
      href={whatsappUrl()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escríbenos por WhatsApp"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 2.5, type: "spring", stiffness: 200, damping: 16 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.94 }}
      className="fixed bottom-6 right-6 z-[65] flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] shadow-[0_8px_30px_rgba(37,211,102,0.45)]"
    >
      <span className="animate-ping-soft absolute inset-0 rounded-full bg-[#25D366]" />
      <svg width="28" height="28" viewBox="0 0 24 24" fill="white" className="relative">
        <path d="M12.04 2a9.9 9.9 0 0 0-8.42 15.18L2.05 22l4.94-1.55A9.94 9.94 0 1 0 12.04 2Zm0 18.1a8.14 8.14 0 0 1-4.15-1.14l-.3-.18-3.08.97.99-3-.2-.31a8.16 8.16 0 1 1 6.74 3.66Zm4.47-6.1c-.24-.12-1.45-.72-1.67-.8-.23-.08-.39-.12-.56.12-.16.25-.64.8-.78.97-.15.16-.29.18-.53.06a6.67 6.67 0 0 1-3.34-2.92c-.25-.43.25-.4.72-1.34.08-.16.04-.3-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.4-.42-.56-.42h-.48c-.16 0-.43.06-.66.3-.22.25-.86.85-.86 2.07 0 1.22.89 2.4 1.01 2.56.12.16 1.75 2.67 4.23 3.74.6.26 1.06.41 1.42.53.6.19 1.14.16 1.57.1.48-.07 1.45-.6 1.65-1.17.2-.57.2-1.05.15-1.16-.06-.1-.22-.16-.47-.28Z" />
      </svg>
    </motion.a>
  );
}

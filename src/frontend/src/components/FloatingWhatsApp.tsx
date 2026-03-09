import { motion } from "motion/react";
import { SiWhatsapp } from "react-icons/si";

export function FloatingWhatsApp() {
  return (
    <motion.a
      href="https://wa.me/916001175465"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center"
      style={{
        background: "oklch(0.55 0.22 145)",
        boxShadow:
          "0 0 20px oklch(0.75 0.2 145 / 0.5), 0 0 40px oklch(0.75 0.2 145 / 0.25)",
      }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 2, type: "spring", stiffness: 200 }}
      whileHover={{
        scale: 1.1,
        boxShadow:
          "0 0 30px oklch(0.75 0.2 145 / 0.7), 0 0 60px oklch(0.75 0.2 145 / 0.35)",
      }}
      whileTap={{ scale: 0.95 }}
      data-ocid="whatsapp.button"
    >
      <SiWhatsapp size={26} color="white" />

      {/* Pulse ring */}
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          border: "2px solid oklch(0.75 0.2 145 / 0.6)",
        }}
        animate={{
          scale: [1, 1.5, 1.5],
          opacity: [0.8, 0, 0],
        }}
        transition={{
          duration: 2,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeOut",
        }}
      />
    </motion.a>
  );
}

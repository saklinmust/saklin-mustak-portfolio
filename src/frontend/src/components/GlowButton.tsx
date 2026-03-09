import { motion } from "motion/react";
import type { ReactNode } from "react";

interface GlowButtonProps {
  children: ReactNode;
  variant?: "primary" | "secondary" | "whatsapp" | "outline";
  onClick?: () => void;
  href?: string;
  className?: string;
  "data-ocid"?: string;
}

export function GlowButton({
  children,
  variant = "primary",
  onClick,
  href,
  className = "",
  "data-ocid": dataOcid,
}: GlowButtonProps) {
  const styles = {
    primary: {
      base: "border border-[oklch(0.75_0.2_200/0.6)] text-[oklch(0.75_0.2_200)]",
      bg: "oklch(0.12 0.015 260 / 0.7)",
      glow: "0 0 20px oklch(0.75 0.2 200 / 0.4), 0 0 40px oklch(0.75 0.2 200 / 0.2)",
      hoverGlow:
        "0 0 30px oklch(0.75 0.2 200 / 0.7), 0 0 60px oklch(0.75 0.2 200 / 0.3), inset 0 0 20px oklch(0.75 0.2 200 / 0.1)",
    },
    secondary: {
      base: "border border-[oklch(0.65_0.22_290/0.6)] text-[oklch(0.65_0.22_290)]",
      bg: "oklch(0.12 0.015 260 / 0.7)",
      glow: "0 0 20px oklch(0.65 0.22 290 / 0.4), 0 0 40px oklch(0.65 0.22 290 / 0.2)",
      hoverGlow:
        "0 0 30px oklch(0.65 0.22 290 / 0.7), 0 0 60px oklch(0.65 0.22 290 / 0.3), inset 0 0 20px oklch(0.65 0.22 290 / 0.1)",
    },
    whatsapp: {
      base: "border border-[oklch(0.75_0.2_145/0.6)] text-[oklch(0.75_0.2_145)]",
      bg: "oklch(0.12 0.015 260 / 0.7)",
      glow: "0 0 20px oklch(0.75 0.2 145 / 0.4), 0 0 40px oklch(0.75 0.2 145 / 0.2)",
      hoverGlow:
        "0 0 30px oklch(0.75 0.2 145 / 0.7), 0 0 60px oklch(0.75 0.2 145 / 0.3), inset 0 0 20px oklch(0.75 0.2 145 / 0.1)",
    },
    outline: {
      base: "border border-[oklch(0.25_0.04_260/0.8)] text-[oklch(0.75_0.2_200)]",
      bg: "transparent",
      glow: "none",
      hoverGlow: "0 0 15px oklch(0.75 0.2 200 / 0.3)",
    },
  };

  const s = styles[variant];

  const inner = (
    <motion.button
      className={`relative overflow-hidden px-6 py-3 rounded-lg font-semibold text-sm tracking-wider uppercase backdrop-blur-sm transition-colors duration-200 ${s.base} ${className}`}
      style={{
        background: s.bg,
        boxShadow: s.glow,
      }}
      whileHover={{
        scale: 1.05,
        boxShadow: s.hoverGlow,
      }}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      data-ocid={dataOcid}
    >
      <span className="relative z-10 flex items-center gap-2">{children}</span>
      <motion.div
        className="absolute inset-0 opacity-0"
        whileHover={{ opacity: 1 }}
        style={{
          background:
            "linear-gradient(135deg, transparent 0%, oklch(1 0 0 / 0.03) 50%, transparent 100%)",
        }}
      />
    </motion.button>
  );

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer">
        {inner}
      </a>
    );
  }

  return inner;
}

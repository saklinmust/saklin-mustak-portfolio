import { motion } from "motion/react";
import { useEffect, useState } from "react";

interface LoadingScreenProps {
  onComplete: () => void;
}

export function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 400);
          return 100;
        }
        return prev + Math.random() * 8 + 3;
      });
    }, 80);
    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
      style={{ background: "oklch(0.05 0.01 260)" }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
    >
      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "linear-gradient(oklch(0.75 0.2 200 / 0.3) 1px, transparent 1px), linear-gradient(90deg, oklch(0.75 0.2 200 / 0.3) 1px, transparent 1px)",
          backgroundSize: "50px 50px",
        }}
      />

      {/* Logo */}
      <motion.div
        className="relative mb-12"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 200 }}
      >
        <div
          className="w-24 h-24 rounded-2xl flex items-center justify-center relative"
          style={{
            background: "oklch(0.12 0.015 260)",
            border: "1px solid oklch(0.75 0.2 200 / 0.5)",
            boxShadow:
              "0 0 40px oklch(0.75 0.2 200 / 0.4), 0 0 80px oklch(0.75 0.2 200 / 0.2), inset 0 0 20px oklch(0.75 0.2 200 / 0.1)",
          }}
        >
          <motion.span
            className="font-mono font-bold text-3xl"
            style={{
              color: "oklch(0.75 0.2 200)",
              textShadow:
                "0 0 20px oklch(0.75 0.2 200), 0 0 40px oklch(0.75 0.2 200 / 0.5)",
            }}
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          >
            SM
          </motion.span>
        </div>

        {/* Rotating ring */}
        <motion.div
          className="absolute -inset-3 rounded-2xl"
          style={{
            border: "1px solid oklch(0.75 0.2 200 / 0.3)",
            borderTop: "2px solid oklch(0.75 0.2 200)",
          }}
          animate={{ rotate: 360 }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />
      </motion.div>

      {/* Name */}
      <motion.p
        className="text-sm font-mono tracking-[0.3em] uppercase mb-2"
        style={{ color: "oklch(0.55 0.04 260)" }}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        SAKLIN MUSTAK
      </motion.p>

      <motion.p
        className="text-xs font-mono tracking-[0.2em] mb-10"
        style={{ color: "oklch(0.75 0.2 200 / 0.7)" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        PORTFOLIO
      </motion.p>

      {/* Progress bar */}
      <motion.div
        className="w-64 relative"
        initial={{ opacity: 0, scaleX: 0 }}
        animate={{ opacity: 1, scaleX: 1 }}
        transition={{ delay: 0.2 }}
      >
        <div
          className="h-px w-full mb-2"
          style={{ background: "oklch(0.25 0.04 260)" }}
        />
        <div
          className="absolute top-0 left-0 h-px transition-all duration-100"
          style={{
            width: `${Math.min(progress, 100)}%`,
            background: "oklch(0.75 0.2 200)",
            boxShadow:
              "0 0 10px oklch(0.75 0.2 200), 0 0 20px oklch(0.75 0.2 200 / 0.5)",
          }}
        />
        <p
          className="text-right text-xs font-mono"
          style={{ color: "oklch(0.55 0.04 260)" }}
        >
          {Math.min(Math.round(progress), 100)}%
        </p>
      </motion.div>
    </motion.div>
  );
}

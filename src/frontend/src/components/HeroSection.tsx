import { Canvas } from "@react-three/fiber";
import { ChevronDown, MessageCircle } from "lucide-react";
import { motion } from "motion/react";
import { Suspense, useEffect, useRef, useState } from "react";
import { FloatingShapes } from "./FloatingShapes";
import { GlowButton } from "./GlowButton";
import { ParticleField } from "./ParticleField";

const typingTexts = [
  "Computer Science Student",
  "Web Developer",
  "Creative Coder",
];

export function HeroSection() {
  const [typedText, setTypedText] = useState("");
  const [textIndex, setTextIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const heroRef = useRef<HTMLElement>(null);

  // Typing animation
  useEffect(() => {
    const current = typingTexts[textIndex];
    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          if (typedText.length < current.length) {
            setTypedText(current.slice(0, typedText.length + 1));
          } else {
            setTimeout(() => setIsDeleting(true), 1500);
          }
        } else {
          if (typedText.length > 0) {
            setTypedText(typedText.slice(0, -1));
          } else {
            setIsDeleting(false);
            setTextIndex((prev) => (prev + 1) % typingTexts.length);
          }
        }
      },
      isDeleting ? 50 : 80,
    );
    return () => clearTimeout(timeout);
  }, [typedText, textIndex, isDeleting]);

  // Mouse parallax
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef.current) return;
      const rect = heroRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.width / 2) / rect.width;
      const y = (e.clientY - rect.height / 2) / rect.height;
      setMousePos({ x, y });
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const scrollToProjects = () => {
    document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Three.js canvas background */}
      <div className="absolute inset-0 z-0">
        <Canvas
          camera={{ position: [0, 0, 8], fov: 60 }}
          style={{ background: "oklch(0.05 0.01 260)" }}
        >
          <Suspense fallback={null}>
            <ParticleField
              mouseX={mousePos.x}
              mouseY={mousePos.y}
              count={150}
            />
            <FloatingShapes />
          </Suspense>
        </Canvas>
      </div>

      {/* Dark overlay gradient */}
      <div
        className="absolute inset-0 z-[1]"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 20%, oklch(0.05 0.01 260 / 0.6) 70%)",
        }}
      />

      {/* Hero content */}
      <motion.div
        className="relative z-10 text-center px-4 max-w-4xl mx-auto"
        animate={{
          x: mousePos.x * -15,
          y: mousePos.y * -10,
        }}
        transition={{ type: "spring", stiffness: 50, damping: 30 }}
      >
        {/* Greeting */}
        <motion.p
          className="font-mono text-sm tracking-[0.4em] uppercase mb-4"
          style={{ color: "oklch(0.75 0.2 200)" }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          ✦ Hello World 👋 ✦
        </motion.p>

        {/* Main heading */}
        <motion.h1
          className="text-4xl sm:text-5xl md:text-7xl font-bold mb-6 leading-tight"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <span style={{ color: "oklch(0.95 0.02 260)" }}>Hi, I&apos;m </span>
          <span
            style={{
              background:
                "linear-gradient(135deg, oklch(0.75 0.2 200), oklch(0.8 0.18 160))",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Saklin
          </span>
          <span style={{ color: "oklch(0.95 0.02 260)" }}> </span>
          <span
            style={{
              background:
                "linear-gradient(135deg, oklch(0.65 0.22 290), oklch(0.75 0.2 320))",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Mustak
          </span>
        </motion.h1>

        {/* Typing text */}
        <motion.div
          className="text-xl sm:text-2xl md:text-3xl mb-4 h-10 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          <span style={{ color: "oklch(0.65 0.06 260)" }}>{typedText}</span>
          <span
            className="cursor-blink ml-0.5 font-thin"
            style={{ color: "oklch(0.75 0.2 200)" }}
          >
            |
          </span>
        </motion.div>

        {/* Subtext */}
        <motion.p
          className="text-sm sm:text-base max-w-xl mx-auto mb-10 leading-relaxed"
          style={{ color: "oklch(0.55 0.05 260)" }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.85 }}
        >
          I design clean, responsive websites with smooth animations that help
          businesses stand out online.
        </motion.p>

        {/* Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 items-center justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
        >
          <GlowButton
            variant="primary"
            onClick={scrollToProjects}
            data-ocid="hero.primary_button"
          >
            View Projects
          </GlowButton>
          <GlowButton
            variant="whatsapp"
            href="https://wa.me/916001175465"
            data-ocid="hero.secondary_button"
          >
            <MessageCircle size={16} />
            Contact on WhatsApp
          </GlowButton>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3 }}
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            style={{ color: "oklch(0.75 0.2 200 / 0.6)" }}
          >
            <ChevronDown size={24} />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}

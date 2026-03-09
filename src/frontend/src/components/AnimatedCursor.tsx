import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

export function AnimatedCursor() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const dotRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.matchMedia("(pointer: coarse)").matches);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile) return;

    const handleMouseMove = (e: MouseEvent) => {
      dotRef.current = { x: e.clientX, y: e.clientY };
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive =
        target.closest("button") ||
        target.closest("a") ||
        target.closest("[data-cursor-hover]");
      setIsHovering(!!isInteractive);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseover", handleMouseOver);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [isMobile]);

  if (isMobile) return null;

  return (
    <>
      {/* Outer ring with lag */}
      <motion.div
        className="fixed pointer-events-none z-[9999]"
        animate={{
          x: mousePos.x - 20,
          y: mousePos.y - 20,
          scale: isHovering ? 1.5 : 1,
        }}
        transition={{ type: "spring", stiffness: 100, damping: 20, mass: 0.5 }}
        style={{
          width: 40,
          height: 40,
          borderRadius: "50%",
          border: "1px solid oklch(0.75 0.2 200 / 0.6)",
          boxShadow: "0 0 10px oklch(0.75 0.2 200 / 0.3)",
        }}
      />
      {/* Center dot */}
      <motion.div
        className="fixed pointer-events-none z-[9999]"
        animate={{
          x: mousePos.x - 4,
          y: mousePos.y - 4,
        }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        style={{
          width: 8,
          height: 8,
          borderRadius: "50%",
          background: "oklch(0.75 0.2 200)",
          boxShadow:
            "0 0 10px oklch(0.75 0.2 200 / 0.8), 0 0 20px oklch(0.75 0.2 200 / 0.4)",
        }}
      />
    </>
  );
}

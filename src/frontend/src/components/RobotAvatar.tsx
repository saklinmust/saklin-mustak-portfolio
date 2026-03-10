import { AnimatePresence, motion, useScroll, useSpring } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";

const GREETING_MSG = "Hi! Welcome to my portfolio.";

const OCCASIONAL_MSGS = [
  "Need a website? Click me.",
  "Check my projects below.",
  "You're looking at some great work!",
  "Let's build something amazing.",
];

export function RobotAvatar() {
  const [bubble, setBubble] = useState<string | null>(null);
  const [isWaving, setIsWaving] = useState(false);
  const [tiltDeg, setTiltDeg] = useState(0);
  const avatarRef = useRef<HTMLDivElement>(null);
  const bubbleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const occasionalTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const scrollThrottleRef = useRef(false);
  const lastScrollY = useRef(0);
  const greetingShownRef = useRef(false);
  const msgIndexRef = useRef(0);
  const { scrollY } = useScroll();

  const showBubble = useCallback((msg: string, duration = 4000) => {
    setBubble(msg);
    if (bubbleTimerRef.current) clearTimeout(bubbleTimerRef.current);
    bubbleTimerRef.current = setTimeout(() => setBubble(null), duration);
  }, []);

  // Greeting on load
  useEffect(() => {
    if (greetingShownRef.current) return;
    greetingShownRef.current = true;
    const t = setTimeout(() => {
      showBubble(GREETING_MSG, 5500);
    }, 800);
    return () => clearTimeout(t);
  }, [showBubble]);

  // Occasional messages after greeting disappears
  useEffect(() => {
    const startDelay = 800 + 5500 + 1000; // greeting delay + duration + gap
    const scheduleNext = () => {
      const delay = 7000 + Math.random() * 3000;
      occasionalTimerRef.current = setTimeout(() => {
        const msg =
          OCCASIONAL_MSGS[msgIndexRef.current % OCCASIONAL_MSGS.length];
        msgIndexRef.current++;
        showBubble(msg, 4500);
        scheduleNext();
      }, delay);
    };
    const initialTimer = setTimeout(scheduleNext, startDelay);
    return () => {
      clearTimeout(initialTimer);
      if (occasionalTimerRef.current) clearTimeout(occasionalTimerRef.current);
    };
  }, [showBubble]);

  // Scroll wave reaction
  useEffect(() => {
    const unsubscribe = scrollY.on("change", (latest) => {
      if (scrollThrottleRef.current) return;
      const diff = Math.abs(latest - lastScrollY.current);
      if (diff > 250) {
        lastScrollY.current = latest;
        scrollThrottleRef.current = true;
        setIsWaving(true);
        const msg =
          OCCASIONAL_MSGS[msgIndexRef.current % OCCASIONAL_MSGS.length];
        msgIndexRef.current++;
        showBubble(msg, 3500);
        setTimeout(() => {
          setIsWaving(false);
          scrollThrottleRef.current = false;
        }, 2500);
      }
    });
    return unsubscribe;
  }, [scrollY, showBubble]);

  // Cursor proximity tilt
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const el = avatarRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 250) {
        const t = (1 - dist / 250) * Math.sign(dx) * 8;
        setTiltDeg(t);
      } else {
        setTiltDeg(0);
      }
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const springTilt = useSpring(tiltDeg, { stiffness: 120, damping: 18 });

  const handleClick = () => {
    window.open("https://wa.me/916001175465", "_blank", "noopener,noreferrer");
  };

  return (
    <motion.div
      ref={avatarRef}
      className="fixed bottom-6 right-4 z-50 select-none cursor-pointer"
      style={{
        width: "clamp(120px, 18vw, 160px)",
        height: "clamp(160px, 24vw, 210px)",
      }}
      onClick={handleClick}
      whileHover={{ scale: 1.06 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      title="Chat on WhatsApp"
      data-ocid="avatar.button"
    >
      {/* Speech bubble */}
      <AnimatePresence>
        {bubble && (
          <motion.div
            key={bubble}
            initial={{ opacity: 0, scale: 0.75, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.75, y: 8 }}
            transition={{ type: "spring", stiffness: 340, damping: 24 }}
            style={{
              position: "absolute",
              bottom: "calc(100% + 10px)",
              right: 0,
              minWidth: 160,
              maxWidth: 240,
              background: "oklch(0.13 0.05 270 / 0.95)",
              border: "1px solid oklch(0.6 0.25 260 / 0.45)",
              borderRadius: "16px 16px 4px 16px",
              padding: "10px 14px",
              backdropFilter: "blur(14px)",
              boxShadow:
                "0 0 18px oklch(0.65 0.3 220 / 0.35), 0 0 40px oklch(0.6 0.28 260 / 0.2), 0 4px 24px rgba(0,0,0,0.5)",
              color: "oklch(0.94 0.05 220)",
              fontSize: "0.8rem",
              fontWeight: 600,
              lineHeight: 1.45,
              pointerEvents: "none",
              whiteSpace: "normal",
            }}
          >
            {bubble}
            {/* Tail */}
            <div
              style={{
                position: "absolute",
                bottom: -7,
                right: 14,
                width: 0,
                height: 0,
                borderLeft: "7px solid transparent",
                borderRight: "0px solid transparent",
                borderTop: "7px solid oklch(0.6 0.25 260 / 0.45)",
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Glow orb underneath */}
      <motion.div
        animate={{ scale: [1, 1.18, 1], opacity: [0.4, 0.65, 0.4] }}
        transition={{
          duration: 3.4,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
        style={{
          position: "absolute",
          bottom: -4,
          left: "50%",
          transform: "translateX(-50%)",
          width: "80%",
          height: 14,
          borderRadius: "50%",
          background:
            "radial-gradient(ellipse, oklch(0.7 0.3 200 / 0.55), transparent 70%)",
          filter: "blur(5px)",
          pointerEvents: "none",
        }}
      />

      {/* Robot image with float + tilt + wave */}
      <motion.div
        animate={{
          y: isWaving ? [0, -8, 0] : [0, -12, 0],
        }}
        transition={{
          y: {
            duration: 3.4,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          },
        }}
        style={{
          width: "100%",
          height: "100%",
          rotateZ: springTilt,
        }}
      >
        <motion.img
          src="/assets/generated/ai-robot-avatar-transparent.dim_300x400.png"
          alt="AI Robot Assistant — Click to chat on WhatsApp"
          animate={{
            rotate: isWaving ? [0, -15, 10, -10, 5, 0] : 0,
          }}
          transition={{
            rotate: isWaving
              ? { duration: 1.2, ease: "easeInOut" }
              : { duration: 0.4 },
          }}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
            filter:
              "drop-shadow(0 0 14px oklch(0.7 0.3 200 / 0.7)) drop-shadow(0 0 30px oklch(0.65 0.28 260 / 0.4))",
            userSelect: "none",
            pointerEvents: "none",
          }}
          draggable={false}
        />
      </motion.div>
    </motion.div>
  );
}

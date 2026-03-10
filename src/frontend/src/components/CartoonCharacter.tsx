import {
  AnimatePresence,
  motion,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";

const SPEECH_BUBBLES = [
  "Welcome to my portfolio! 🚀",
  "Check out my projects! 👀",
  "Let's build something cool! 🛠️",
  "I ❤️ coding!",
  "Powered by curiosity! ⚡",
  "Web dev is my superpower! 🦸",
  "Scroll down for more! ⬇️",
  "Nice to meet you! 😄",
  "C++ or JavaScript? Why not both! 🤓",
  "The future is being coded right now! 💻",
  "Hi! Need a website? 🌐",
  "Let's connect on WhatsApp! 💬",
];

const IDLE_MESSAGES = [
  "Need anything? I'm here! 🤖",
  "Hey, still there? 👀",
  "Ask me anything! 💬",
  "Explore my projects! 🚀",
];

type Pose = "idle" | "wave" | "dance" | "cheer" | "think" | "point";

const POSE_EMOJIS: Record<Pose, string> = {
  idle: "",
  wave: "👋",
  dance: "🕺",
  cheer: "🙌",
  think: "🤔",
  point: "👆",
};

const SCROLL_POSES: Pose[] = ["wave", "cheer", "dance", "point", "think"];

interface CartoonCharacterProps {
  socialHovered?: boolean;
}

function useMousePositionX() {
  const mouseX = useMotionValue(
    typeof window !== "undefined" ? window.innerWidth / 2 : 0,
  );

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      mouseX.set(e.clientX);
    };
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, [mouseX]);

  return mouseX;
}

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth < 640 : false,
  );
  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth < 640);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);
  return isMobile;
}

export function CartoonCharacter({
  socialHovered = false,
}: CartoonCharacterProps) {
  const [pose, setPose] = useState<Pose>("idle");
  const [bubble, setBubble] = useState<string | null>(null);
  const [bubbleIndex, setBubbleIndex] = useState(0);
  const [poseIndex, setPoseIndex] = useState(0);
  const [socialReact, setSocialReact] = useState(false);
  const [isIdle, setIsIdle] = useState(false);
  const [isExcited, setIsExcited] = useState(false);
  const lastScrollY = useRef(0);
  const bubbleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const poseTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const autoBubbleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const scrollThrottleRef = useRef(false);
  const idleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastMousePos = useRef({ x: 0, y: 0 });
  const lastMouseTime = useRef(Date.now());
  const idleMsgIndex = useRef(0);
  const autoBubbleMsgIndex = useRef(2); // start from index 2 to vary from welcome msg
  const { scrollY } = useScroll();
  const isMobile = useIsMobile();

  const avatarW = isMobile ? 110 : 150;
  const avatarH = isMobile ? 145 : 200;

  const mouseX = useMousePositionX();

  const springConfig = { stiffness: 80, damping: 20 };
  const smoothMouseX = useSpring(mouseX, springConfig);

  const bodyRotateY = useTransform(smoothMouseX, (x) => {
    const center = typeof window !== "undefined" ? window.innerWidth / 2 : 0;
    const relX = (x - center) / center;
    return relX * 3;
  });
  const smoothBodyRotateY = useSpring(bodyRotateY, {
    stiffness: 40,
    damping: 15,
  });

  const showBubble = useCallback((msg: string, duration = 2800) => {
    setBubble(msg);
    if (bubbleTimerRef.current) clearTimeout(bubbleTimerRef.current);
    bubbleTimerRef.current = setTimeout(() => setBubble(null), duration);
  }, []);

  const showPose = useCallback((p: Pose, duration = 2800) => {
    setPose(p);
    if (poseTimerRef.current) clearTimeout(poseTimerRef.current);
    poseTimerRef.current = setTimeout(() => setPose("idle"), duration);
  }, []);

  // Auto speech bubble timer: fires every 6-8 seconds randomly
  useEffect(() => {
    const scheduleNext = () => {
      const delay = 6000 + Math.random() * 2000; // 6-8 seconds
      autoBubbleTimerRef.current = setTimeout(() => {
        const idx = autoBubbleMsgIndex.current % SPEECH_BUBBLES.length;
        showBubble(SPEECH_BUBBLES[idx], 3200);
        autoBubbleMsgIndex.current++;
        scheduleNext();
      }, delay);
    };
    scheduleNext();
    return () => {
      if (autoBubbleTimerRef.current) clearTimeout(autoBubbleTimerRef.current);
    };
  }, [showBubble]);

  // Idle detection
  useEffect(() => {
    const resetIdle = (e?: MouseEvent) => {
      setIsIdle(false);
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);

      if (e) {
        const now = Date.now();
        const dt = now - lastMouseTime.current;
        const dx = e.clientX - lastMousePos.current.x;
        const dy = e.clientY - lastMousePos.current.y;
        const speed = (Math.sqrt(dx * dx + dy * dy) / Math.max(dt, 1)) * 1000;
        if (speed > 600 && !isExcited) {
          setIsExcited(true);
          setTimeout(() => setIsExcited(false), 1200);
        }
        lastMousePos.current = { x: e.clientX, y: e.clientY };
        lastMouseTime.current = now;
      }

      idleTimerRef.current = setTimeout(() => {
        setIsIdle(true);
      }, 4000);
    };

    resetIdle();
    window.addEventListener("mousemove", resetIdle);
    window.addEventListener("scroll", () => resetIdle());
    return () => {
      window.removeEventListener("mousemove", resetIdle);
      window.removeEventListener("scroll", () => resetIdle());
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    };
  }, [isExcited]);

  useEffect(() => {
    if (isIdle) {
      setBubble("🤔 ...");
      const t = setTimeout(() => {
        const msg = IDLE_MESSAGES[idleMsgIndex.current % IDLE_MESSAGES.length];
        idleMsgIndex.current++;
        setBubble(msg);
        setPose("think");
        if (bubbleTimerRef.current) clearTimeout(bubbleTimerRef.current);
        bubbleTimerRef.current = setTimeout(() => {
          setBubble(null);
          setPose("idle");
        }, 3500);
      }, 1000);
      return () => clearTimeout(t);
    }
  }, [isIdle]);

  useEffect(() => {
    if (isExcited) {
      setPose("cheer");
      showBubble("Whoa, you're fast! ⚡", 1200);
    }
  }, [isExcited, showBubble]);

  useEffect(() => {
    const t = setTimeout(() => {
      showPose("wave", 3200);
      showBubble("Hi there! 👋", 3200);
    }, 1400);
    return () => clearTimeout(t);
  }, [showPose, showBubble]);

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (scrollThrottleRef.current) return;
    const diff = Math.abs(latest - lastScrollY.current);
    if (diff > 300) {
      lastScrollY.current = latest;
      scrollThrottleRef.current = true;

      const nextPose = SCROLL_POSES[poseIndex % SCROLL_POSES.length];
      const nextMsg = SPEECH_BUBBLES[bubbleIndex % SPEECH_BUBBLES.length];

      showPose(nextPose, 2800);
      showBubble(nextMsg, 2800);

      setPoseIndex((p) => p + 1);
      setBubbleIndex((b) => b + 1);

      setTimeout(() => {
        scrollThrottleRef.current = false;
      }, 2500);
    }
  });

  useEffect(() => {
    if (socialHovered) {
      setSocialReact(true);
      showPose("wave", 2400);
      showBubble("Connect with me! 🤝", 2400);
      setTimeout(() => setSocialReact(false), 2400);
    }
  }, [socialHovered, showPose, showBubble]);

  const handleClick = () => {
    window.open("https://wa.me/916001175465", "_blank", "noopener,noreferrer");
  };

  const bodyRotate = socialReact
    ? [0, -8, 8, -5, 0]
    : pose === "dance"
      ? [0, -12, 12, -12, 12, -6, 0]
      : pose === "cheer"
        ? [0, -5, 5, -5, 0]
        : pose === "think"
          ? [0, -10, -10, -10, 0]
          : [0, 0.8, 0, -0.8, 0];

  const bodyScale =
    pose === "cheer"
      ? [1, 1.08, 0.95, 1.05, 1]
      : pose === "dance"
        ? [1, 1.04, 0.98, 1.04, 0.98, 1]
        : [1, 1.015, 1, 1.015, 1];

  return (
    <motion.div
      className="fixed bottom-6 right-4 z-50 select-none"
      style={{
        width: avatarW,
        height: avatarH,
        rotateY: smoothBodyRotateY,
        perspective: 600,
        cursor: "pointer",
      }}
      onClick={handleClick}
      whileHover={{ scale: 1.05 }}
      title="Chat on WhatsApp"
      data-ocid="avatar.button"
    >
      <AnimatePresence>
        {bubble && (
          <motion.div
            key={bubble}
            initial={{ opacity: 0, scale: 0.7, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.7, y: 10 }}
            transition={{ type: "spring", stiffness: 320, damping: 22 }}
            className="absolute"
            style={{
              bottom: "calc(100% + 8px)",
              right: 0,
              minWidth: 155,
              maxWidth: 230,
              background:
                "linear-gradient(135deg, oklch(0.14 0.04 270 / 0.95), oklch(0.16 0.06 300 / 0.95))",
              border: "1px solid oklch(0.6 0.25 260 / 0.5)",
              borderRadius: "16px 16px 4px 16px",
              padding: "10px 14px",
              backdropFilter: "blur(12px)",
              boxShadow:
                "0 0 20px oklch(0.6 0.25 260 / 0.3), 0 4px 20px rgba(0,0,0,0.4)",
              color: "oklch(0.92 0.04 260)",
              fontSize: "0.78rem",
              fontWeight: 600,
              lineHeight: 1.4,
              whiteSpace: "nowrap",
              pointerEvents: "none",
            }}
          >
            {bubble}
            <div
              style={{
                position: "absolute",
                bottom: -8,
                right: 18,
                width: 0,
                height: 0,
                borderLeft: "8px solid transparent",
                borderRight: "0px solid transparent",
                borderTop: "8px solid oklch(0.6 0.25 260 / 0.5)",
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        animate={{
          y: [0, -10, 0],
          rotate: bodyRotate,
        }}
        transition={{
          y: {
            duration: 3.2,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          },
          rotate:
            pose === "dance" || pose === "cheer" || socialReact
              ? { duration: pose === "dance" ? 0.6 : 0.45, repeat: 2 }
              : pose === "think"
                ? { duration: 0.4, repeat: 0 }
                : {
                    duration: 6,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  },
        }}
        style={{ position: "relative", width: avatarW, height: avatarH - 20 }}
      >
        {/* Neon glow aura beneath avatar */}
        <motion.div
          animate={{ scale: [1, 1.12, 1], opacity: [0.35, 0.6, 0.35] }}
          transition={{
            duration: 3.2,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
          style={{
            position: "absolute",
            bottom: -6,
            left: "50%",
            transform: "translateX(-50%)",
            width: 90,
            height: 16,
            borderRadius: "50%",
            background:
              "radial-gradient(ellipse, oklch(0.65 0.28 270 / 0.55), transparent 70%)",
            filter: "blur(4px)",
            pointerEvents: "none",
          }}
        />

        <AnimatePresence>
          {pose !== "idle" && POSE_EMOJIS[pose] && (
            <motion.div
              key={pose}
              initial={{ opacity: 0, scale: 0.5, y: 4 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.5, y: 4 }}
              style={{
                position: "absolute",
                top: pose === "point" ? "8%" : "16%",
                right: -16,
                zIndex: 2,
                fontSize: pose === "cheer" ? "1.4rem" : "1.6rem",
                transformOrigin: "bottom center",
              }}
            >
              <motion.span
                animate={
                  pose === "wave"
                    ? { rotate: [0, 30, -15, 30, -10, 20, 0] }
                    : pose === "dance"
                      ? {
                          rotate: [0, 20, -20, 20, -20, 0],
                          y: [0, -4, 4, -4, 0],
                        }
                      : pose === "cheer"
                        ? { y: [0, -6, 0, -6, 0], scale: [1, 1.2, 1, 1.2, 1] }
                        : pose === "think"
                          ? { rotate: [0, 10, 10, 10, 0] }
                          : pose === "point"
                            ? { y: [0, -3, 0, -3, 0] }
                            : {}
                }
                transition={{ duration: 1.4, repeat: 1, ease: "easeInOut" }}
                style={{ display: "inline-block" }}
              >
                {POSE_EMOJIS[pose]}
              </motion.span>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.img
          src="/assets/generated/avatar-user-cropped.dim_400x450.png"
          alt="Saklin - Click to chat on WhatsApp"
          animate={{ scale: bodyScale }}
          transition={{
            scale:
              pose === "cheer" || pose === "dance"
                ? { duration: 0.45, repeat: 2 }
                : {
                    duration: 4,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  },
          }}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
            objectPosition: "center bottom",
            filter:
              "drop-shadow(0 0 12px oklch(0.65 0.28 270 / 0.6)) drop-shadow(0 0 24px oklch(0.6 0.3 300 / 0.35))",
            userSelect: "none",
            pointerEvents: "none",
          }}
          draggable={false}
        />
      </motion.div>
    </motion.div>
  );
}

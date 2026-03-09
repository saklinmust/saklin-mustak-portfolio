import { motion } from "motion/react";
import { SiGithub, SiInstagram, SiWhatsapp } from "react-icons/si";
import { ScrollReveal } from "./ScrollReveal";
import { TiltCard } from "./TiltCard";

const socials = [
  {
    id: 1,
    name: "Instagram",
    handle: "@saklinmustak",
    Icon: SiInstagram,
    href: "https://instagram.com",
    color: "oklch(0.72 0.22 340)",
    gradient:
      "linear-gradient(135deg, oklch(0.72 0.22 340), oklch(0.72 0.22 40))",
    desc: "Creative moments",
  },
  {
    id: 2,
    name: "GitHub",
    handle: "@saklinmustak",
    Icon: SiGithub,
    href: "https://github.com",
    color: "oklch(0.75 0.2 200)",
    gradient:
      "linear-gradient(135deg, oklch(0.55 0.05 260), oklch(0.75 0.05 260))",
    desc: "Open source projects",
  },
  {
    id: 3,
    name: "WhatsApp",
    handle: "Chat with me",
    Icon: SiWhatsapp,
    href: "https://wa.me/916001175465",
    color: "oklch(0.75 0.2 145)",
    gradient:
      "linear-gradient(135deg, oklch(0.55 0.2 145), oklch(0.75 0.2 145))",
    desc: "Direct message",
  },
];

export function SocialSection() {
  return (
    <section id="social" className="section-padding relative">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 40% 50% at 30% 50%, oklch(0.72 0.22 340 / 0.04), transparent)",
        }}
      />

      <div className="max-w-4xl mx-auto relative">
        {/* Heading */}
        <ScrollReveal className="text-center mb-16">
          <p
            className="font-mono text-xs tracking-[0.4em] uppercase mb-4"
            style={{ color: "oklch(0.72 0.22 340)" }}
          >
            FIND ME ON
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            <span style={{ color: "oklch(0.9 0.02 260)" }}>Connect </span>
            <span
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.72 0.22 340), oklch(0.65 0.22 290))",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              With Me
            </span>
          </h2>
          <div
            className="mx-auto w-20 h-px"
            style={{
              background:
                "linear-gradient(90deg, transparent, oklch(0.72 0.22 340), transparent)",
            }}
          />
        </ScrollReveal>

        {/* Instagram-style grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {socials.map((social, i) => (
            <ScrollReveal key={social.id} delay={i * 0.1}>
              <TiltCard>
                <motion.a
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass rounded-2xl p-6 flex flex-col items-center text-center group block"
                  style={{
                    border: `1px solid ${social.color}20`,
                    textDecoration: "none",
                  }}
                  whileHover={{
                    borderColor: `${social.color}60`,
                    boxShadow: `0 0 40px ${social.color}20, 0 0 80px ${social.color}08`,
                  }}
                  data-ocid={`social.item.${social.id}`}
                >
                  {/* Icon container */}
                  <motion.div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4"
                    style={{
                      background: `${social.color}12`,
                      border: `1px solid ${social.color}30`,
                    }}
                    whileHover={{
                      background: `${social.color}22`,
                      boxShadow: `0 0 25px ${social.color}40`,
                      scale: 1.1,
                    }}
                  >
                    <social.Icon size={28} style={{ color: social.color }} />
                  </motion.div>

                  <p
                    className="font-bold text-base mb-1"
                    style={{ color: "oklch(0.9 0.02 260)" }}
                  >
                    {social.name}
                  </p>
                  <p
                    className="text-xs font-mono mb-2"
                    style={{ color: social.color }}
                  >
                    {social.handle}
                  </p>
                  <p
                    className="text-xs"
                    style={{ color: "oklch(0.55 0.04 260)" }}
                  >
                    {social.desc}
                  </p>

                  {/* Animated bottom border */}
                  <motion.div
                    className="mt-5 h-px w-0 group-hover:w-full transition-all duration-500 rounded-full"
                    style={{
                      background: social.gradient,
                    }}
                  />
                </motion.a>
              </TiltCard>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

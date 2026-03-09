import { motion } from "motion/react";
import { ScrollReveal } from "./ScrollReveal";
import { TiltCard } from "./TiltCard";

const skills = [
  {
    name: "HTML5",
    icon: "⟨/⟩",
    color: "oklch(0.72 0.22 40)",
    desc: "Markup",
    mono: true,
  },
  {
    name: "CSS3",
    icon: "✦",
    color: "oklch(0.65 0.22 260)",
    desc: "Styling",
    mono: false,
  },
  {
    name: "JavaScript",
    icon: "JS",
    color: "oklch(0.85 0.2 90)",
    desc: "Scripting",
    mono: true,
  },
  {
    name: "C Language",
    icon: "C",
    color: "oklch(0.75 0.2 200)",
    desc: "Systems",
    mono: true,
  },
  {
    name: "C++",
    icon: "C++",
    color: "oklch(0.65 0.22 290)",
    desc: "Advanced",
    mono: true,
  },
  {
    name: "Web Dev",
    icon: "◈",
    color: "oklch(0.8 0.18 160)",
    desc: "Full Stack",
    mono: false,
  },
];

export function SkillsSection() {
  return (
    <section id="skills" className="section-padding relative">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 50% 60% at 50% 50%, oklch(0.75 0.2 200 / 0.03), transparent)",
        }}
      />

      <div className="max-w-6xl mx-auto relative">
        {/* Heading */}
        <ScrollReveal className="text-center mb-16">
          <p
            className="font-mono text-xs tracking-[0.4em] uppercase mb-4"
            style={{ color: "oklch(0.8 0.18 160)" }}
          >
            MY TOOLKIT
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            <span style={{ color: "oklch(0.9 0.02 260)" }}>Tech </span>
            <span
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.8 0.18 160), oklch(0.75 0.2 200))",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Stack
            </span>
          </h2>
          <div
            className="mx-auto w-20 h-px"
            style={{
              background:
                "linear-gradient(90deg, transparent, oklch(0.8 0.18 160), transparent)",
            }}
          />
        </ScrollReveal>

        {/* Skills grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-5 max-w-3xl mx-auto">
          {skills.map((skill, i) => (
            <ScrollReveal key={skill.name} delay={i * 0.08}>
              <TiltCard>
                <motion.div
                  className="glass rounded-2xl p-6 text-center group cursor-default"
                  style={{
                    border: `1px solid ${skill.color}20`,
                    minHeight: 140,
                  }}
                  whileHover={{
                    borderColor: `${skill.color}50`,
                    boxShadow: `0 0 30px ${skill.color}20, 0 0 60px ${skill.color}08`,
                  }}
                  data-ocid={`skills.item.${i + 1}`}
                >
                  {/* Icon */}
                  <motion.div
                    className="w-14 h-14 rounded-2xl mx-auto mb-4 flex items-center justify-center"
                    style={{
                      background: `${skill.color}12`,
                      border: `1px solid ${skill.color}30`,
                    }}
                    whileHover={{
                      background: `${skill.color}20`,
                      boxShadow: `0 0 20px ${skill.color}30`,
                      scale: 1.05,
                    }}
                  >
                    <span
                      className={`text-xl font-bold ${skill.mono ? "font-mono" : ""}`}
                      style={{
                        color: skill.color,
                        textShadow: `0 0 12px ${skill.color}80`,
                      }}
                    >
                      {skill.icon}
                    </span>
                  </motion.div>

                  {/* Name */}
                  <p
                    className="font-semibold text-sm mb-1"
                    style={{ color: "oklch(0.88 0.02 260)" }}
                  >
                    {skill.name}
                  </p>
                  <p
                    className="text-xs font-mono"
                    style={{ color: skill.color }}
                  >
                    {skill.desc}
                  </p>

                  {/* Glow line */}
                  <motion.div
                    className="h-px mt-4 rounded-full mx-auto w-0 group-hover:w-full transition-all duration-500"
                    style={{
                      background: `linear-gradient(90deg, transparent, ${skill.color}, transparent)`,
                    }}
                  />
                </motion.div>
              </TiltCard>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

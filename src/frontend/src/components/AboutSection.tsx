import { Code2, Sparkles, User } from "lucide-react";
import { motion, useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { ScrollReveal } from "./ScrollReveal";
import { TiltCard } from "./TiltCard";

const skills = [
  { name: "C Programming", level: 80 },
  { name: "C++", level: 75 },
  { name: "HTML", level: 95 },
  { name: "CSS", level: 90 },
  { name: "JavaScript", level: 85 },
  { name: "Web Development", level: 88 },
];

function SkillBar({ name, level }: { name: string; level: number }) {
  const [progress, setProgress] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });

  useEffect(() => {
    if (inView) {
      const timeout = setTimeout(() => setProgress(level), 100);
      return () => clearTimeout(timeout);
    }
  }, [inView, level]);

  return (
    <div ref={ref} className="mb-4">
      <div className="flex justify-between mb-1.5">
        <span
          className="text-sm font-medium"
          style={{ color: "oklch(0.82 0.03 260)" }}
        >
          {name}
        </span>
        <span
          className="text-xs font-mono"
          style={{ color: "oklch(0.75 0.2 200)" }}
        >
          {progress}%
        </span>
      </div>
      <div
        className="h-1.5 rounded-full overflow-hidden"
        style={{ background: "oklch(0.18 0.02 260)" }}
      >
        <motion.div
          className="h-full rounded-full"
          style={{
            background:
              "linear-gradient(90deg, oklch(0.75 0.2 200), oklch(0.65 0.22 290))",
            boxShadow: "0 0 8px oklch(0.75 0.2 200 / 0.6)",
          }}
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{
            duration: 1.2,
            ease: [0.25, 0.46, 0.45, 0.94],
            delay: 0.2,
          }}
        />
      </div>
    </div>
  );
}

export function AboutSection() {
  return (
    <section id="about" className="section-padding relative">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 20% 50%, oklch(0.65 0.22 290 / 0.04), transparent)",
        }}
      />

      <div className="max-w-6xl mx-auto relative">
        <ScrollReveal className="text-center mb-16">
          <p
            className="font-mono text-xs tracking-[0.4em] uppercase mb-4"
            style={{ color: "oklch(0.75 0.2 200)" }}
          >
            WHO I AM
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            <span style={{ color: "oklch(0.9 0.02 260)" }}>About </span>
            <span className="gradient-text">Me</span>
          </h2>
          <div
            className="mx-auto w-20 h-px"
            style={{
              background:
                "linear-gradient(90deg, transparent, oklch(0.75 0.2 200), transparent)",
            }}
          />
        </ScrollReveal>

        <div className="grid md:grid-cols-2 gap-8">
          <ScrollReveal direction="left" delay={0.1}>
            <TiltCard className="h-full">
              <div
                className="glass rounded-2xl p-8 h-full"
                style={{ boxShadow: "0 0 30px oklch(0.75 0.2 200 / 0.05)" }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{
                      background: "oklch(0.75 0.2 200 / 0.1)",
                      border: "1px solid oklch(0.75 0.2 200 / 0.3)",
                    }}
                  >
                    <User size={18} style={{ color: "oklch(0.75 0.2 200)" }} />
                  </div>
                  <h3
                    className="font-semibold text-lg"
                    style={{ color: "oklch(0.9 0.02 260)" }}
                  >
                    About Me
                  </h3>
                </div>

                <p
                  className="text-base leading-relaxed mb-6"
                  style={{ color: "oklch(0.65 0.04 260)" }}
                >
                  I am Saklin Mustak, a Computer Science student passionate
                  about programming and creating modern websites and digital
                  experiences. I love building things that live on the internet
                  and crafting interfaces that delight users.
                </p>

                <div className="grid grid-cols-2 gap-4">
                  {[
                    {
                      icon: Code2,
                      label: "Clean Code",
                      desc: "Best practices",
                    },
                    {
                      icon: Sparkles,
                      label: "Creative",
                      desc: "Unique designs",
                    },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="rounded-xl p-4"
                      style={{
                        background: "oklch(0.15 0.02 260 / 0.7)",
                        border: "1px solid oklch(0.25 0.04 260 / 0.5)",
                      }}
                    >
                      <item.icon
                        size={20}
                        className="mb-2"
                        style={{ color: "oklch(0.8 0.18 160)" }}
                      />
                      <p
                        className="text-sm font-semibold"
                        style={{ color: "oklch(0.85 0.02 260)" }}
                      >
                        {item.label}
                      </p>
                      <p
                        className="text-xs"
                        style={{ color: "oklch(0.55 0.03 260)" }}
                      >
                        {item.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </TiltCard>
          </ScrollReveal>

          <ScrollReveal direction="right" delay={0.2}>
            <TiltCard className="h-full">
              <div
                className="glass rounded-2xl p-8 h-full"
                style={{ boxShadow: "0 0 30px oklch(0.65 0.22 290 / 0.05)" }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{
                      background: "oklch(0.65 0.22 290 / 0.1)",
                      border: "1px solid oklch(0.65 0.22 290 / 0.3)",
                    }}
                  >
                    <Code2
                      size={18}
                      style={{ color: "oklch(0.65 0.22 290)" }}
                    />
                  </div>
                  <h3
                    className="font-semibold text-lg"
                    style={{ color: "oklch(0.9 0.02 260)" }}
                  >
                    My Skills
                  </h3>
                </div>

                {skills.map((skill, i) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.08 }}
                    viewport={{ once: true }}
                  >
                    <SkillBar name={skill.name} level={skill.level} />
                  </motion.div>
                ))}
              </div>
            </TiltCard>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

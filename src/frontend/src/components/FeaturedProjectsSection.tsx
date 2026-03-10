import { ExternalLink } from "lucide-react";
import { GlowButton } from "./GlowButton";
import { ScrollReveal } from "./ScrollReveal";
import { TiltCard } from "./TiltCard";

const projects = [
  {
    title: "Portfolio Website",
    desc: "A modern personal portfolio with smooth animations and interactive 3D elements.",
    img: "/assets/generated/project-portfolio.dim_800x500.jpg",
    accentColor: "oklch(0.75 0.2 200)",
    glowColor: "oklch(0.75 0.2 200 / 0.35)",
    borderColor: "oklch(0.75 0.2 200 / 0.4)",
  },
  {
    title: "Business Website",
    desc: "A professional website for a small company with stunning visual presence.",
    img: "/assets/generated/project-business.dim_800x500.jpg",
    accentColor: "oklch(0.65 0.22 290)",
    glowColor: "oklch(0.65 0.22 290 / 0.35)",
    borderColor: "oklch(0.65 0.22 290 / 0.4)",
  },
  {
    title: "Landing Page",
    desc: "A high-converting landing page for products built to drive results.",
    img: "/assets/generated/project-landing.dim_800x500.jpg",
    accentColor: "oklch(0.8 0.18 160)",
    glowColor: "oklch(0.8 0.18 160 / 0.35)",
    borderColor: "oklch(0.8 0.18 160 / 0.4)",
  },
];

const ocids = [
  { card: "featured.card.1", btn: "featured.view_button.1" },
  { card: "featured.card.2", btn: "featured.view_button.2" },
  { card: "featured.card.3", btn: "featured.view_button.3" },
];

export function FeaturedProjectsSection() {
  return (
    <section
      id="featured-projects"
      className="relative py-24 px-4 overflow-hidden"
    >
      {/* Background ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% 50%, oklch(0.12 0.03 260 / 0.5) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-6xl mx-auto relative">
        {/* Section heading */}
        <ScrollReveal direction="up" delay={0}>
          <div className="text-center mb-16">
            <p
              className="font-mono text-xs tracking-[0.4em] uppercase mb-3"
              style={{ color: "oklch(0.75 0.2 200)" }}
            >
              ✦ My Work ✦
            </p>
            <h2
              className="text-3xl sm:text-4xl md:text-5xl font-bold"
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.75 0.2 200), oklch(0.65 0.22 290), oklch(0.8 0.18 160))",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Featured Projects
            </h2>
            <p
              className="mt-4 text-sm sm:text-base max-w-lg mx-auto"
              style={{ color: "oklch(0.5 0.04 260)" }}
            >
              A selection of real-world websites I&apos;ve designed and built.
            </p>
          </div>
        </ScrollReveal>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {projects.map((project, i) => (
            <ScrollReveal key={project.title} direction="up" delay={i * 0.15}>
              <TiltCard data-ocid={ocids[i].card} className="h-full">
                <div
                  className="glass h-full rounded-2xl overflow-hidden flex flex-col group"
                  style={{
                    border: `1px solid ${project.borderColor}`,
                    transition: "box-shadow 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLDivElement).style.boxShadow =
                      `0 0 30px ${project.glowColor}, 0 0 60px ${project.glowColor}`;
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLDivElement).style.boxShadow =
                      "none";
                  }}
                >
                  {/* Project image */}
                  <div className="relative overflow-hidden">
                    <img
                      src={project.img}
                      alt={project.title}
                      className="w-full aspect-video object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    {/* Image overlay shimmer */}
                    <div
                      className="absolute inset-0"
                      style={{
                        background:
                          "linear-gradient(180deg, transparent 60%, oklch(0.08 0.01 260 / 0.8) 100%)",
                      }}
                    />
                  </div>

                  {/* Card content */}
                  <div className="flex flex-col flex-1 p-6">
                    <h3
                      className="text-lg font-bold mb-2"
                      style={{ color: project.accentColor }}
                    >
                      {project.title}
                    </h3>
                    <p
                      className="text-sm leading-relaxed flex-1 mb-6"
                      style={{ color: "oklch(0.55 0.04 260)" }}
                    >
                      {project.desc}
                    </p>
                    <GlowButton
                      variant="outline"
                      href="https://wa.me/916001175465"
                      data-ocid={ocids[i].btn}
                      className="w-full justify-center"
                    >
                      <ExternalLink size={14} />
                      View Project
                    </GlowButton>
                  </div>
                </div>
              </TiltCard>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

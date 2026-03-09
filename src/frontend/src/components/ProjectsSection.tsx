import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  ArrowRight,
  FileVideo,
  Globe,
  Smartphone,
  User2,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import type React from "react";
import { useState } from "react";
import { ScrollReveal } from "./ScrollReveal";
import { TiltCard } from "./TiltCard";

interface Project {
  id: number;
  icon: React.ComponentType<{
    size?: number;
    className?: string;
    color?: string;
  }>;
  name: string;
  shortDesc: string;
  fullDesc: string;
  tags: string[];
  color: string;
}

const projects: Project[] = [
  {
    id: 1,
    icon: Globe,
    name: "CSE Student Hub Website",
    shortDesc:
      "A comprehensive hub for CSE students with resources, notes, and tools.",
    fullDesc:
      "A comprehensive online hub designed specifically for Computer Science and Engineering students. Features include curated resources, lecture notes, programming tools, and a community section. Built with modern web technologies to provide a seamless learning experience.",
    tags: ["HTML", "CSS", "JavaScript"],
    color: "oklch(0.75 0.2 200)",
  },
  {
    id: 2,
    icon: FileVideo,
    name: "PDF to Video Converter Tool",
    shortDesc:
      "Convert PDF documents into engaging video presentations automatically.",
    fullDesc:
      "An innovative tool that automatically transforms static PDF documents into dynamic, engaging video presentations. Supports custom transitions, voice-over integration, and multiple export formats. Perfect for educators and content creators who want to bring their documents to life.",
    tags: ["Python", "Web Dev", "API"],
    color: "oklch(0.65 0.22 290)",
  },
  {
    id: 3,
    icon: Smartphone,
    name: "Mobile Shop Website",
    shortDesc: "A modern e-commerce website for a mobile phone retail store.",
    fullDesc:
      "A fully-featured e-commerce platform for a mobile phone retail business. Includes product catalog, search and filtering, shopping cart, and a clean checkout flow. Designed with a mobile-first approach and optimized for performance across all devices.",
    tags: ["HTML", "CSS", "JavaScript"],
    color: "oklch(0.8 0.18 160)",
  },
  {
    id: 4,
    icon: User2,
    name: "Personal Portfolio Website",
    shortDesc:
      "A futuristic personal portfolio showcasing skills and projects.",
    fullDesc:
      "A cutting-edge personal portfolio website featuring 3D animations, glassmorphism UI elements, and immersive scroll-based animations. Built to showcase creative work and technical skills with a distinctive futuristic aesthetic that stands out from conventional portfolios.",
    tags: ["React", "Three.js", "Motion"],
    color: "oklch(0.75 0.22 340)",
  },
];

export function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section id="projects" className="section-padding relative">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 50% 60% at 80% 50%, oklch(0.75 0.2 200 / 0.04), transparent)",
        }}
      />

      <div className="max-w-6xl mx-auto relative">
        {/* Heading */}
        <ScrollReveal className="text-center mb-16">
          <p
            className="font-mono text-xs tracking-[0.4em] uppercase mb-4"
            style={{ color: "oklch(0.65 0.22 290)" }}
          >
            WHAT I BUILT
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            <span style={{ color: "oklch(0.9 0.02 260)" }}>My </span>
            <span
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.65 0.22 290), oklch(0.75 0.22 340))",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Projects
            </span>
          </h2>
          <div
            className="mx-auto w-20 h-px"
            style={{
              background:
                "linear-gradient(90deg, transparent, oklch(0.65 0.22 290), transparent)",
            }}
          />
        </ScrollReveal>

        {/* Projects grid */}
        <div className="grid sm:grid-cols-2 gap-6">
          {projects.map((project, i) => (
            <ScrollReveal key={project.id} delay={i * 0.1}>
              <TiltCard>
                <motion.div
                  className="glass rounded-2xl p-6 h-full cursor-pointer group"
                  style={{
                    border: `1px solid ${project.color}20`,
                  }}
                  whileHover={{
                    borderColor: `${project.color}50`,
                    boxShadow: `0 0 30px ${project.color}15`,
                  }}
                  onClick={() => setSelectedProject(project)}
                  data-ocid={`projects.card.${project.id}`}
                >
                  {/* Icon */}
                  <div className="flex items-start justify-between mb-4">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center"
                      style={{
                        background: `${project.color}15`,
                        border: `1px solid ${project.color}30`,
                      }}
                    >
                      <project.icon
                        size={22}
                        className="shrink-0"
                        color={project.color}
                      />
                    </div>
                    <motion.div
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                      style={{ color: project.color }}
                    >
                      <ArrowRight size={18} />
                    </motion.div>
                  </div>

                  {/* Content */}
                  <h3
                    className="text-lg font-bold mb-2"
                    style={{ color: "oklch(0.9 0.02 260)" }}
                  >
                    {project.name}
                  </h3>
                  <p
                    className="text-sm leading-relaxed mb-4"
                    style={{ color: "oklch(0.6 0.04 260)" }}
                  >
                    {project.shortDesc}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs font-mono px-2 py-0.5 rounded-md"
                        style={{
                          background: `${project.color}10`,
                          color: project.color,
                          border: `1px solid ${project.color}25`,
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* View details button */}
                  <button
                    type="button"
                    className="text-xs font-semibold tracking-wide uppercase flex items-center gap-1.5 group/btn"
                    style={{ color: project.color }}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedProject(project);
                    }}
                    data-ocid={`projects.open_modal_button.${project.id}`}
                  >
                    View Details
                    <motion.span className="group-hover/btn:translate-x-1 transition-transform">
                      →
                    </motion.span>
                  </button>
                </motion.div>
              </TiltCard>
            </ScrollReveal>
          ))}
        </div>
      </div>

      {/* Project Modal */}
      <Dialog
        open={!!selectedProject}
        onOpenChange={() => setSelectedProject(null)}
      >
        <AnimatePresence>
          {selectedProject && (
            <DialogContent
              className="max-w-lg border-0 p-0 overflow-hidden"
              style={{
                background: "oklch(0.1 0.015 260)",
                border: `1px solid ${selectedProject.color}30`,
                boxShadow: `0 0 60px ${selectedProject.color}20, 0 25px 50px oklch(0 0 0 / 0.5)`,
              }}
              data-ocid="projects.dialog"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.25 }}
                className="p-8"
              >
                {/* Icon */}
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6"
                  style={{
                    background: `${selectedProject.color}15`,
                    border: `1px solid ${selectedProject.color}40`,
                    boxShadow: `0 0 20px ${selectedProject.color}20`,
                  }}
                >
                  <selectedProject.icon
                    size={26}
                    color={selectedProject.color}
                  />
                </div>

                <DialogHeader>
                  <DialogTitle
                    className="text-xl font-bold mb-1"
                    style={{ color: "oklch(0.92 0.02 260)" }}
                  >
                    {selectedProject.name}
                  </DialogTitle>
                  <DialogDescription
                    className="text-sm leading-relaxed"
                    style={{ color: "oklch(0.62 0.04 260)" }}
                  >
                    {selectedProject.fullDesc}
                  </DialogDescription>
                </DialogHeader>

                <div className="flex flex-wrap gap-2 mt-6">
                  {selectedProject.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs font-mono px-3 py-1 rounded-full"
                      style={{
                        background: `${selectedProject.color}15`,
                        color: selectedProject.color,
                        border: `1px solid ${selectedProject.color}30`,
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <button
                  type="button"
                  className="absolute top-4 right-4 p-2 rounded-lg transition-colors"
                  style={{
                    color: "oklch(0.55 0.04 260)",
                    background: "oklch(0.15 0.02 260 / 0.5)",
                  }}
                  onClick={() => setSelectedProject(null)}
                  data-ocid="projects.close_button"
                >
                  <X size={16} />
                </button>
              </motion.div>
            </DialogContent>
          )}
        </AnimatePresence>
      </Dialog>
    </section>
  );
}

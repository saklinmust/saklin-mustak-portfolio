import { MessageCircle } from "lucide-react";
import { GlowButton } from "./GlowButton";
import { ScrollReveal } from "./ScrollReveal";

export function CTASection() {
  return (
    <section className="relative py-28 px-4 overflow-hidden">
      {/* Radial neon glow background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% 50%, oklch(0.15 0.04 200 / 0.4) 0%, oklch(0.1 0.02 290 / 0.3) 40%, transparent 70%)",
        }}
      />
      {/* Top divider */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, oklch(0.75 0.2 200 / 0.4), oklch(0.65 0.22 290 / 0.4), transparent)",
        }}
      />
      {/* Bottom divider */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, oklch(0.75 0.2 200 / 0.4), oklch(0.65 0.22 290 / 0.4), transparent)",
        }}
      />

      <div className="max-w-3xl mx-auto text-center relative">
        <ScrollReveal direction="up" delay={0}>
          <p
            className="font-mono text-xs tracking-[0.4em] uppercase mb-4"
            style={{ color: "oklch(0.75 0.2 200)" }}
          >
            ✦ Let's Work Together ✦
          </p>
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-bold mb-5 leading-tight"
            style={{ color: "oklch(0.9 0.02 260)" }}
          >
            Need a{" "}
            <span
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.75 0.2 200), oklch(0.65 0.22 290))",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              modern website
            </span>{" "}
            like this?
          </h2>
          <p
            className="text-base sm:text-lg mb-10 max-w-md mx-auto leading-relaxed"
            style={{ color: "oklch(0.55 0.05 260)" }}
          >
            I can design fast, responsive and visually impressive websites.
          </p>
          <GlowButton
            variant="whatsapp"
            href="https://wa.me/916001175465"
            data-ocid="cta.primary_button"
            className="text-base px-10 py-4"
          >
            <MessageCircle size={20} />
            Contact Me on WhatsApp
          </GlowButton>
        </ScrollReveal>
      </div>
    </section>
  );
}

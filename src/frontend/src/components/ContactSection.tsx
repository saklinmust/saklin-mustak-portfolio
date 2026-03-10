import { Mail } from "lucide-react";
import { motion } from "motion/react";
import { SiInstagram, SiWhatsapp } from "react-icons/si";
import { ScrollReveal } from "./ScrollReveal";

const contacts = [
  {
    id: 1,
    Icon: SiWhatsapp,
    label: "WhatsApp",
    href: "https://wa.me/916001175465",
    color: "oklch(0.75 0.2 145)",
    isReactIcon: true,
  },
  {
    id: 2,
    Icon: SiInstagram,
    label: "Instagram",
    href: "https://www.instagram.com/saklin_459",
    color: "oklch(0.72 0.22 340)",
    isReactIcon: true,
  },
  {
    id: 3,
    Icon: Mail,
    label: "Email",
    href: "mailto:saklinm631@gmail.com",
    color: "oklch(0.75 0.2 200)",
    isReactIcon: false,
  },
];

export function ContactSection() {
  return (
    <section id="contact" className="section-padding relative">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 50% 60% at 50% 50%, oklch(0.75 0.2 200 / 0.04), transparent)",
        }}
      />

      <div className="max-w-3xl mx-auto text-center relative">
        {/* Heading */}
        <ScrollReveal className="mb-16">
          <p
            className="font-mono text-xs tracking-[0.4em] uppercase mb-4"
            style={{ color: "oklch(0.75 0.2 200)" }}
          >
            REACH OUT
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            <span style={{ color: "oklch(0.9 0.02 260)" }}>Get In </span>
            <span className="gradient-text">Touch</span>
          </h2>
          <div
            className="mx-auto w-20 h-px mb-6"
            style={{
              background:
                "linear-gradient(90deg, transparent, oklch(0.75 0.2 200), transparent)",
            }}
          />
          <p className="text-base" style={{ color: "oklch(0.6 0.04 260)" }}>
            Have a project in mind or just want to say hi?
            <br className="hidden sm:block" /> I'd love to hear from you.
          </p>
        </ScrollReveal>

        {/* Contact icons */}
        <div className="flex items-center justify-center gap-6 sm:gap-10">
          {contacts.map((contact, i) => (
            <ScrollReveal key={contact.id} delay={i * 0.1} direction="none">
              <motion.a
                href={contact.href}
                target={
                  contact.href.startsWith("mailto:") ? undefined : "_blank"
                }
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-3 group"
                style={{ textDecoration: "none" }}
                data-ocid={`contact.button.${contact.id}`}
              >
                <motion.div
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center relative"
                  style={{
                    background: `${contact.color}12`,
                    border: `1px solid ${contact.color}30`,
                  }}
                  whileHover={{
                    background: `${contact.color}22`,
                    boxShadow: `0 0 30px ${contact.color}40, 0 0 60px ${contact.color}20`,
                    scale: 1.1,
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <contact.Icon
                    size={24}
                    style={{ color: contact.color }}
                    className="sm:text-[28px]"
                  />

                  {/* Pulse ring */}
                  <motion.div
                    className="absolute inset-0 rounded-full"
                    style={{
                      border: `1px solid ${contact.color}40`,
                    }}
                    animate={{
                      scale: [1, 1.3, 1],
                      opacity: [0.5, 0, 0.5],
                    }}
                    transition={{
                      duration: 2.5,
                      repeat: Number.POSITIVE_INFINITY,
                      delay: i * 0.4,
                    }}
                  />
                </motion.div>

                <span
                  className="text-xs font-mono tracking-wider"
                  style={{ color: contact.color }}
                >
                  {contact.label}
                </span>
              </motion.a>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

import { MessageCircle } from "lucide-react";
import { GlowButton } from "./GlowButton";
import { ScrollReveal } from "./ScrollReveal";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const navLinks = [
    { label: "Home", href: "#hero", ocid: "footer.home_link" },
    { label: "Projects", href: "#projects", ocid: "footer.projects_link" },
    { label: "Contact", href: "#contact", ocid: "footer.contact_link" },
  ];

  const scrollTo = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="relative py-16 px-4">
      {/* Top neon divider */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, oklch(0.75 0.2 200 / 0.6), oklch(0.65 0.22 290 / 0.6), transparent)",
        }}
      />

      <ScrollReveal direction="none">
        <div className="max-w-4xl mx-auto">
          {/* Main footer content */}
          <div className="flex flex-col items-center gap-6 mb-10">
            {/* Name */}
            <div>
              <div
                className="font-bold text-2xl sm:text-3xl text-center"
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.75 0.2 200), oklch(0.65 0.22 290), oklch(0.8 0.18 160))",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Saklin Mustak
              </div>
              <p
                className="text-center text-sm mt-1 tracking-wider"
                style={{ color: "oklch(0.5 0.05 260)" }}
              >
                Web Designer &amp; Developer
              </p>
            </div>

            {/* Quick nav links */}
            <nav className="flex items-center gap-6">
              {navLinks.map((link) => (
                <button
                  type="button"
                  key={link.href}
                  data-ocid={link.ocid}
                  onClick={() => scrollTo(link.href)}
                  className="text-sm transition-all duration-200 hover:scale-105"
                  style={{ color: "oklch(0.5 0.05 260)" }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.color =
                      "oklch(0.75 0.2 200)";
                    (e.currentTarget as HTMLButtonElement).style.textShadow =
                      "0 0 10px oklch(0.75 0.2 200 / 0.5)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.color =
                      "oklch(0.5 0.05 260)";
                    (e.currentTarget as HTMLButtonElement).style.textShadow =
                      "none";
                  }}
                >
                  {link.label}
                </button>
              ))}
            </nav>

            {/* WhatsApp button */}
            <GlowButton
              variant="whatsapp"
              href="https://wa.me/916001175465"
              data-ocid="footer.whatsapp_button"
            >
              <MessageCircle size={16} />
              WhatsApp
            </GlowButton>
          </div>

          {/* Divider */}
          <div
            className="h-px mb-8"
            style={{
              background:
                "linear-gradient(90deg, transparent, oklch(0.2 0.03 260 / 0.8), transparent)",
            }}
          />

          {/* Copyright */}
          <div className="text-center">
            <p className="text-sm" style={{ color: "oklch(0.45 0.04 260)" }}>
              &copy; {currentYear} Saklin Mustak
            </p>
          </div>
        </div>
      </ScrollReveal>
    </footer>
  );
}

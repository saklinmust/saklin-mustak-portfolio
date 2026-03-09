import { ScrollReveal } from "./ScrollReveal";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative py-12 px-4">
      {/* Top divider */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, oklch(0.25 0.04 260), transparent)",
        }}
      />

      <ScrollReveal direction="none">
        <div className="max-w-4xl mx-auto text-center">
          {/* Logo */}
          <div
            className="inline-block font-mono font-bold text-2xl mb-4"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.75 0.2 200), oklch(0.65 0.22 290))",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            SM
          </div>

          <p className="text-sm mb-1" style={{ color: "oklch(0.5 0.04 260)" }}>
            © {currentYear} Saklin Mustak
          </p>
          <p className="text-sm mb-4" style={{ color: "oklch(0.45 0.04 260)" }}>
            Designed with passion.
          </p>

          {/* Caffeine attribution */}
          <p className="text-xs" style={{ color: "oklch(0.38 0.03 260)" }}>
            Built with love using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(
                typeof window !== "undefined" ? window.location.hostname : "",
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-current"
              style={{ color: "oklch(0.55 0.1 200)" }}
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </ScrollReveal>
    </footer>
  );
}

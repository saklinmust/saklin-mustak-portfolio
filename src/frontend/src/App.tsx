import { AnimatePresence } from "motion/react";
import { useState } from "react";
import { AboutSection } from "./components/AboutSection";
import { AnimatedCursor } from "./components/AnimatedCursor";
import { ContactSection } from "./components/ContactSection";
import { FloatingWhatsApp } from "./components/FloatingWhatsApp";
import { Footer } from "./components/Footer";
import { HeroSection } from "./components/HeroSection";
import { LoadingScreen } from "./components/LoadingScreen";
import { Navbar } from "./components/Navbar";
import { ProjectsSection } from "./components/ProjectsSection";
import { SkillsSection } from "./components/SkillsSection";
import { SocialSection } from "./components/SocialSection";

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div
      className="relative min-h-screen"
      style={{ background: "oklch(0.08 0.01 260)" }}
    >
      <AnimatedCursor />
      <AnimatePresence mode="wait">
        {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>

      {!isLoading && (
        <>
          <Navbar />
          <main>
            <HeroSection />
            <AboutSection />
            <ProjectsSection />
            <SkillsSection />
            <SocialSection />
            <ContactSection />
          </main>
          <Footer />
          <FloatingWhatsApp />
        </>
      )}
    </div>
  );
}

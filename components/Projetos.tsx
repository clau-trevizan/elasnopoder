"use client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProjetosHeroSection from "@/components/projetos/ProjetosHeroSection";
import TimelineSection from "@/components/projetos/TimelineSection";
import NossosProjetosSection from "@/components/projetos/NossosProjetosSection";

const Projetos = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-20">
        <ProjetosHeroSection />
        <TimelineSection />
        <NossosProjetosSection />
      </main>
      <Footer />
    </div>
  );
};

export default Projetos;

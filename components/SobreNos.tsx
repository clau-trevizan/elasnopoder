"use client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SobreHeroSection from "@/components/sobre/SobreHeroSection";
import ConhecaSection from "@/components/sobre/ConhecaSection";
import MissaoSection from "@/components/sobre/MissaoSection";
import BotaoSection from "@/components/sobre/BotaoSection";
import DiretoriaSection from "@/components/sobre/DiretoriaSection";
import LiderancasSection from "@/components/sobre/LiderancasSection";
import ConselheirasSection from "@/components/sobre/ConselheirasSection";

const SobreNos = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-20">
        <SobreHeroSection />
        <ConhecaSection />
        <MissaoSection />
        <BotaoSection />
        <DiretoriaSection />
        <LiderancasSection />
        <ConselheirasSection />
      </main>
      <Footer />
    </div>
  );
};

export default SobreNos;

"use client";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import TransformSection from "@/components/TransformSection";
import ImpactSection from "@/components/ImpactSection";
import CardsSection from "@/components/CardsSection";
import SponsorsSection from "@/components/SponsorsSection";
import PartnersSection from "@/components/PartnersSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-20">
        <Hero />
        <TransformSection />
        <ImpactSection />
        <CardsSection />
        <SponsorsSection />
        <PartnersSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;

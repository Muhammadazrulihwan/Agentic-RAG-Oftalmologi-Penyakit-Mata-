import Header from "@/components/Header";
import Hero from "@/components/Hero";
import PartnerStrip from "@/components/PartnerStrip";
import ProblemSection from "@/components/ProblemSection";
import ArchitectureSection from "@/components/ArchitectureSection";
import PerformanceSection from "@/components/PerformanceSection";
import EthicsSection from "@/components/EthicsSection";
import FaqSection from "@/components/FaqSection";
import CtaBanner from "@/components/CtaBanner";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      {/* Aura Ambient Glow Elements */}
      <div className="aura-orb-1 top-0 left-1/2 -translate-x-1/2 -z-10" />
      <div className="aura-orb-2 top-[35%] -left-32 -z-10" />
      <div className="aura-orb-1 top-[70%] -right-28 -z-10" />

      <Header />
      <Hero />
      <PartnerStrip />
      <ProblemSection />
      <ArchitectureSection />
      <PerformanceSection />
      <EthicsSection />
      <FaqSection />
      <CtaBanner />
      <Footer />
    </>
  );
}

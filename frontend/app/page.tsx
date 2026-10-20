import Hero from "@/components/hero/Hero";
import ServicesSection from "@/components/services/ServicesSection";
import SatisfactionBanner from "@/components/banner/SatisfactionBanner";
import TestimonialsSection from "@/components/testimonials/TestimonialsSection";
import HowItWorksSection from "@/components/how-it-works/HowItWorksSection";
import GetStartedSection from "@/components/get-started/GetStartedSection";

export default function Home() {
  return (
    <>
      <Hero />
      <ServicesSection />
      <SatisfactionBanner />
      <TestimonialsSection />
      <HowItWorksSection />
      <GetStartedSection />
    </>
  );
}

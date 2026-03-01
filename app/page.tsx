import { Hero } from "@/components/sections/Hero";
import { SocialProofBar } from "@/components/sections/SocialProofBar";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { AboutTeaser } from "@/components/sections/AboutTeaser";
import { ResultsGallery } from "@/components/sections/ResultsGallery";
import { Testimonials } from "@/components/sections/Testimonials";
import { FAQAccordion } from "@/components/sections/FAQAccordion";
import { CTASection } from "@/components/sections/CTASection";

export default function HomePage() {
  return (
    <>
      <Hero />
      <SocialProofBar />
      <ServicesGrid />
      <AboutTeaser />
      <ResultsGallery />
      <Testimonials />
      <FAQAccordion limit={2} />
      <CTASection />
    </>
  );
}

import { TestimonialsSliderSection } from "./_components/testimonials-slider-section";
import { FaqSection } from "./_components/faq-section";
import { FinalCtaSection } from "../_components/final-cta-section";

export default function FaqPage() {
  return (
    <div className="flex flex-col w-full min-h-screen bg-[#FAFAF9]">
      <TestimonialsSliderSection />
      <FaqSection />
      <FinalCtaSection />
    </div>
  );
}

import { SolutionsSection } from "./_components/solutions-section";
import { FeaturesGridSection } from "./_components/features-grid-section";
import { FinalCtaSection } from "../_components/final-cta-section";

export default function SolutionsPage() {
  return (
    <div className="flex flex-col w-full min-h-screen bg-[#FAFAF9]">
      <SolutionsSection />
      <FeaturesGridSection />
      <FinalCtaSection />
    </div>
  );
}

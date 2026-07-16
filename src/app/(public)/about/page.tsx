import { AboutSection } from "./_components/about-section";
import { FourPillarsSection } from "./_components/four-pillars-section";
import { WorkflowSection } from "./_components/workflow-section";
import { FinalCtaSection } from "../_components/final-cta-section";

export default function AboutPage() {
  return (
    <div className="flex flex-col w-full min-h-screen bg-[#FAFAF9]">
      <AboutSection />
      <FourPillarsSection />
      <WorkflowSection />
      <FinalCtaSection />
    </div>
  );
}

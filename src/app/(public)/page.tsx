import { HeroSection } from "./_components/hero-section";
import { TrustedBySection } from "./_components/trusted-by-section";
import { DashboardsPreviewSection } from "./_components/dashboards-preview-section";
import { HomeWorkflowSection } from "./_components/home-workflow-section";
import { HomeInstructorsSection } from "./_components/home-instructors-section";
import { FinalCtaSection } from "./_components/final-cta-section";

export default function PublicLandingPage() {
  return (
    <div className="flex flex-col w-full min-h-screen bg-[#FAFAF9]">
      <HeroSection />
      <TrustedBySection />
      <DashboardsPreviewSection />
      <HomeWorkflowSection />
      <HomeInstructorsSection />
      <FinalCtaSection />
    </div>
  );
}

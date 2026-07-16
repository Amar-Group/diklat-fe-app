import { ProgramCatalogSection } from "./_components/program-catalog-section";
import { FinalCtaSection } from "../_components/final-cta-section";

export default function ProgramsPage() {
  return (
    <div className="flex flex-col w-full min-h-screen bg-[#FAFAF9]">
      <ProgramCatalogSection />
      <FinalCtaSection />
    </div>
  );
}

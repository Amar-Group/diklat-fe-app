import { CurriculumSection } from "./_components/curriculum-section";
import { TrustedBySection, MitraData } from "../_components/trusted-by-section";
import { FinalCtaSection } from "../_components/final-cta-section";

export const metadata = {
  title: "Kurikulum | PT Harapan Amar Jaya",
  description: "Kurikulum Pelatihan PT Harapan Amar Jaya yang berbasis kompetensi (SKKNI & Standar Industri).",
};

interface CurriculumPageProps {
  mitraList?: MitraData[];
}

export default function CurriculumPage({ mitraList }: CurriculumPageProps = {}) {
  return (
    <div className="flex flex-col w-full min-h-screen bg-[#FAFAF9]">
      <CurriculumSection />
      <TrustedBySection mitraList={mitraList} />
      <FinalCtaSection />
    </div>
  );
}

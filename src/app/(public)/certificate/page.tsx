import { CertificatePreviewSection } from "./_components/certificate-preview-section";
import { FinalCtaSection } from "../_components/final-cta-section";

export default function CertificatePage() {
  return (
    <div className="flex flex-col w-full min-h-screen bg-[#FAFAF9]">
      <CertificatePreviewSection />
      <FinalCtaSection />
    </div>
  );
}

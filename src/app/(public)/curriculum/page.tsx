import { BookOpen } from "lucide-react";

export const metadata = {
  title: "Kurikulum | PT Harapan Amar Jaya",
  description: "Kurikulum Pelatihan PT Harapan Amar Jaya yang berbasis kompetensi.",
};

export default function CurriculumPage() {
  return (
    <div className="pt-32 pb-24 bg-[#FAFAF9] min-h-[70vh]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-slate-200 text-center">
          <div className="inline-flex items-center justify-center h-20 w-20 rounded-2xl bg-indigo-50 text-indigo-600 mb-8">
            <BookOpen className="h-10 w-10" />
          </div>
          
          <h1 className="font-display font-bold text-3xl md:text-5xl text-[#1E1B4B] mb-6">
            Kurikulum
          </h1>
          
          <div className="h-1 w-20 bg-[#F97316] mx-auto rounded-full mb-8"></div>
          
          <p className="text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto">
            Kurikulum kami secara khusus <strong className="text-slate-800">disesuaikan dengan jenis Pendidikan dan pelatihan yang berbasis kompetensi</strong> untuk memastikan setiap program memberikan keterampilan yang relevan dan dapat langsung diaplikasikan di dunia kerja.
          </p>
        </div>
      </div>
    </div>
  );
}

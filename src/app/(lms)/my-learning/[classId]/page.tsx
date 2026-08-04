"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { BookOpen, PlayCircle, FileText, CheckCircle, ChevronLeft, Lock, ArrowRight, Sparkles } from "lucide-react";
import { useClassSyllabus } from "@/features/class/hooks/use-class";

export default function SyllabusPage() {
  const { classId } = useParams();
  const { data: syllabus, isLoading } = useClassSyllabus(Number(classId));

  if (isLoading || !syllabus) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="h-8 w-48 bg-slate-200 rounded-md"></div>
        <div className="h-64 bg-slate-200 rounded-3xl"></div>
        <div className="space-y-4">
          <div className="h-24 bg-slate-200 rounded-2xl"></div>
          <div className="h-24 bg-slate-200 rounded-2xl"></div>
        </div>
      </div>
    );
  }

  const currentClass = syllabus.class;
  const courseModules = syllabus.modules || [];
  
  // Calculate Progress
  let totalItems = 0;
  let completedItems = 0;
  
  courseModules.forEach((mod: any) => {
    totalItems += (mod.materials?.length || 0);
    completedItems += (mod.materials?.filter((m: any) => m.is_completed)?.length || 0);
  });
  
  const progressPercent = totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0;

  return (
    <div className="space-y-10">
      {/* Back Navigation */}
      <Link href="/my-learning" className="inline-flex items-center text-sm font-semibold text-slate-500 hover:text-[#F97316] transition-colors group">
        <ChevronLeft className="size-4 mr-1 group-hover:-translate-x-1 transition-transform" /> 
        Kembali ke Kelasku
      </Link>

      {/* Hero Section */}
      <div className="bg-gradient-to-br from-[#1E1B4B] via-blue-900 to-[#1E1B4B] rounded-3xl p-8 md:p-12 border border-[#1E1B4B]/20 shadow-xl shadow-[#1E1B4B]/10 relative overflow-hidden">
        {/* Abstract Background Shapes */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
        <div className="absolute bottom-0 left-10 w-64 h-64 bg-[#F97316]/10 rounded-full blur-3xl -mb-20"></div>
        
        <div className="relative z-10 flex flex-col md:flex-row gap-10 items-start md:items-center">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-5">
              <span className="px-3 py-1.5 bg-[#F97316]/20 border border-[#F97316]/30 text-[#F97316] text-xs font-bold uppercase tracking-wider rounded-full flex items-center gap-1.5">
                <Sparkles className="size-3" /> Batch {currentClass?.batch_name}
              </span>
            </div>
            <h1 className="text-3xl md:text-5xl font-display font-black text-white tracking-tight leading-[1.1] mb-4">
              {currentClass?.course_title || "Pelatihan Diklat Terintegrasi"}
            </h1>
            <p className="text-blue-100/90 text-lg max-w-2xl leading-relaxed mb-8">
              Pelajari materi secara terstruktur dari awal hingga akhir. Anda perlu menyelesaikan semua kuis dan mengisi evaluasi untuk mendapatkan sertifikat kelulusan.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-[#F97316] hover:bg-[#EA580C] text-white font-bold py-3.5 px-8 rounded-xl shadow-lg shadow-[#F97316]/30 transition-all hover:-translate-y-1 flex items-center justify-center gap-2">
                Lanjutkan Belajar <ArrowRight className="size-4" />
              </button>
              <div className="flex flex-row gap-2">
                <Link href={`/my-learning/${classId}/sessions`} className="bg-white/10 hover:bg-white/20 text-white border border-white/20 font-semibold py-3.5 px-6 rounded-xl transition-all flex items-center justify-center flex-1 sm:flex-none">
                  Jadwal & Absensi
                </Link>
                <Link href={`/my-learning/${classId}/evaluation`} className="bg-white/10 hover:bg-white/20 text-white border border-white/20 font-semibold py-3.5 px-6 rounded-xl transition-all flex items-center justify-center flex-1 sm:flex-none">
                  Evaluasi Kelas
                </Link>
              </div>
            </div>
          </div>

          <div className="w-full md:w-[320px] shrink-0 bg-white/10 backdrop-blur-md p-8 rounded-3xl border border-white/20 text-center flex flex-col items-center">
            <div className="relative size-32 mb-4">
              <svg className="size-full transform -rotate-90" viewBox="0 0 36 36">
                <path
                  className="stroke-white/20"
                  strokeWidth="3"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="stroke-[#F97316] drop-shadow-md transition-all duration-1000 ease-out"
                  strokeWidth="3"
                  strokeDasharray={`${progressPercent}, 100`}
                  strokeLinecap="round"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center flex-col">
                <span className="text-3xl font-display font-black text-white">{progressPercent}%</span>
              </div>
            </div>
            <p className="text-blue-100 font-medium mb-5">Progres Pembelajaran</p>
            
            {progressPercent === 100 ? (
              <Link href={`/my-learning/${classId}/certificate`} className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-green-500/30">
                <CheckCircle className="size-4" /> Unduh Sertifikat
              </Link>
            ) : (
              <button className="w-full bg-white/5 text-white/50 border border-white/10 font-medium py-3 px-6 rounded-xl cursor-not-allowed flex items-center justify-center gap-2">
                <Lock className="size-4" /> Sertifikat Terkunci
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Syllabus Content */}
      <div className="pt-4">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-2.5 bg-blue-50 text-[#1E1B4B] rounded-xl border border-blue-100">
            <BookOpen className="size-5" />
          </div>
          <h2 className="text-2xl font-display font-bold text-[#1E1B4B]">
            Silabus Pembelajaran
          </h2>
        </div>
        
        <div className="space-y-6">
          {courseModules.map((mod: any, idx: number) => {
            const modMaterials = mod.materials || [];
            const modQuizzes = mod.quizzes || [];

            return (
              <div key={mod.id} className="bg-white border border-slate-200 rounded-3xl overflow-hidden transition-all hover:border-[#1E1B4B]/20 hover:shadow-lg shadow-sm group">
                {/* Module Header */}
                <div className="p-6 md:p-8 border-b border-slate-100 flex flex-col md:flex-row md:items-center gap-6 relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-[#1E1B4B] to-[#F97316]"></div>
                  
                  <div className="size-14 shrink-0 rounded-2xl bg-blue-50 border border-blue-100 text-[#1E1B4B] flex items-center justify-center font-display font-black text-2xl shadow-inner">
                    {idx + 1}
                  </div>
                  
                  <div>
                    <h3 className="font-display font-bold text-xl text-[#1E1B4B] mb-1 group-hover:text-[#F97316] transition-colors">{mod.title}</h3>
                    <p className="text-slate-500 leading-relaxed max-w-3xl">{mod.description || "Materi, presentasi, dan evaluasi modul."}</p>
                  </div>
                </div>

                {/* Module Items */}
                <div className="bg-slate-50/50">
                  {modMaterials.length === 0 && modQuizzes.length === 0 ? (
                    <div className="p-8 text-center text-slate-400 italic font-medium">Belum ada materi untuk modul ini.</div>
                  ) : (
                    <div className="divide-y divide-slate-100">
                      {/* Materials */}
                      {modMaterials.map((m: any, mIdx: number) => (
                        <div key={m.id} className="p-5 md:px-8 flex items-center gap-4 hover:bg-white transition-colors">
                          <div className={`p-2 rounded-full ${m.is_completed ? 'bg-green-100 text-green-600' : 'bg-orange-50 text-[#F97316]'}`}>
                            {m.is_completed ? <CheckCircle className="size-5" /> : <PlayCircle className="size-5" />}
                          </div>
                          
                          <div className="flex-1 min-w-0">
                            <h4 className={`font-semibold text-base truncate ${m.is_completed ? 'text-slate-600' : 'text-[#1E1B4B]'}`}>
                              {mIdx + 1}. {m.title}
                            </h4>
                            <div className="flex items-center gap-2 mt-1 text-xs font-medium text-slate-500">
                              <span className="uppercase tracking-wider">{m.material_type}</span>
                              <span>•</span>
                              <span>{m.duration_minutes || 0} menit</span>
                            </div>
                          </div>
                          
                          <Link href={`/my-learning/${classId}/materials/${m.id}`} className="shrink-0 px-4 py-2 bg-white border border-slate-200 hover:border-[#1E1B4B] hover:text-[#1E1B4B] text-slate-600 rounded-lg text-sm font-semibold transition-all shadow-sm">
                            {m.is_completed ? 'Tinjau Ulang' : 'Mulai Belajar'}
                          </Link>
                        </div>
                      ))}

                      {/* Quizzes */}
                      {modQuizzes.map((q: any, qIdx: number) => (
                        <div key={q.id} className="p-5 md:px-8 flex items-center gap-4 hover:bg-white transition-colors bg-blue-50/30">
                          <div className={`p-2 rounded-full ${q.is_completed ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-[#1E1B4B]'}`}>
                            {q.is_completed ? <CheckCircle className="size-5" /> : <FileText className="size-5" />}
                          </div>
                          
                          <div className="flex-1 min-w-0">
                            <h4 className={`font-semibold text-base truncate ${q.is_completed ? 'text-slate-600' : 'text-[#1E1B4B]'}`}>
                              Kuis: {q.title}
                            </h4>
                            <div className="flex items-center gap-2 mt-1 text-xs font-medium text-slate-500">
                              <span>Passing Grade: <span className="font-bold text-[#F97316]">{q.passing_score || 0}</span></span>
                            </div>
                          </div>
                          
                          <Link href={`/my-learning/${classId}/quizzes/${q.id}`} className="shrink-0 px-4 py-2 bg-[#1E1B4B] hover:bg-blue-900 text-white rounded-lg text-sm font-semibold transition-all shadow-md shadow-[#1E1B4B]/20">
                            {q.is_completed ? 'Lihat Hasil' : 'Kerjakan Kuis'}
                          </Link>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
          })}

          {courseModules.length === 0 && (
            <div className="p-16 text-center bg-white border-2 border-dashed border-slate-200 rounded-3xl">
              <BookOpen className="size-16 text-slate-300 mx-auto mb-4" />
              <h3 className="text-xl font-display font-bold text-[#1E1B4B]">Silabus Sedang Disusun</h3>
              <p className="text-slate-500 mt-2 max-w-md mx-auto">Materi untuk kelas ini sedang dipersiapkan oleh Instruktur. Silakan periksa kembali nanti.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

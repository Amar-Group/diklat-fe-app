"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { BookOpen, PlayCircle, FileText, CheckCircle, ChevronLeft, Lock } from "lucide-react";
import { useClassSyllabus } from "@/features/class/hooks/use-class";

export default function SyllabusPage() {
  const { classId } = useParams();
  const { data: syllabus, isLoading } = useClassSyllabus(Number(classId));

  if (isLoading || !syllabus) {
    return <div className="p-10 text-center animate-pulse text-slate-500 font-medium">Memuat Silabus...</div>;
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
    <div className="space-y-6">
      <Link href="/my-learning" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors">
        <ChevronLeft className="size-4 mr-1" /> Kembali ke Dasbor
      </Link>

      <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -mr-20 -mt-20"></div>
        <div className="relative z-10 flex flex-col md:flex-row gap-8 items-start md:items-center">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider rounded-full">
                Batch {currentClass?.batch_name}
              </span>
              <span className="text-sm font-medium text-slate-500">
                {progressPercent}% Selesai
              </span>
            </div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight leading-tight mb-2">
              {currentClass?.course_title || "Pelatihan Diklat Terintegrasi"}
            </h1>
            <p className="text-slate-600 max-w-2xl leading-relaxed">
              Pelajari materi secara terstruktur dari awal hingga akhir. Anda perlu menyelesaikan kuis dan mengisi evaluasi untuk mendapatkan sertifikat kelulusan.
            </p>
          </div>
          <div className="w-full md:w-auto flex flex-col gap-3">
             <button className="bg-primary hover:bg-primary/90 text-white font-bold py-3 px-8 rounded-xl shadow-lg shadow-primary/30 transition-all hover:-translate-y-0.5">
               Lanjutkan Belajar
             </button>
             <button className={`font-semibold py-3 px-8 rounded-xl transition-all ${progressPercent === 100 ? "bg-green-100 hover:bg-green-200 text-green-700" : "bg-slate-100 hover:bg-slate-200 text-slate-700 cursor-not-allowed"}`} disabled={progressPercent < 100}>
               <Lock className={`size-4 inline mr-2 ${progressPercent === 100 ? "hidden" : ""}`} /> 
               {progressPercent === 100 ? "Unduh Sertifikat" : "Sertifikat Terkunci"}
             </button>
          </div>
        </div>
        <div className="relative z-10 mt-6 h-2 w-full bg-slate-100 rounded-full overflow-hidden">
          <div className="h-full bg-primary transition-all duration-1000" style={{ width: `${progressPercent}%` }}></div>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
          <BookOpen className="size-5 text-primary" /> Materi Kelas
        </h2>
        
        <div className="space-y-4">
          {courseModules.map((mod: any, idx: number) => {
            const modMaterials = mod.materials || [];
            const modQuizzes = mod.quizzes || [];

            return (
              <div key={mod.id} className="bg-white border border-slate-200 rounded-2xl overflow-hidden transition-all hover:border-primary/30 shadow-sm">
                <div className="p-6 bg-slate-50/50 border-b border-slate-100">
                  <div className="flex items-center gap-4">
                    <div className="size-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold">
                      {idx + 1}
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-slate-900">{mod.title}</h3>
                      <p className="text-sm text-slate-500 line-clamp-1">{mod.description || "Daftar materi dan kuis untuk modul ini."}</p>
                    </div>
                  </div>
                </div>
                
                <div className="divide-y divide-slate-100">
                  {modMaterials.length > 0 ? (
                    modMaterials.map((mat: any) => (
                      <Link 
                        key={mat.id} 
                        href={`/my-learning/${classId}/materials/${mat.id}`}
                        className="flex items-center justify-between p-4 pl-16 hover:bg-slate-50 transition-colors group"
                      >
                        <div className="flex items-center gap-3">
                          {mat.type === 'video' ? (
                            <PlayCircle className="size-5 text-slate-400 group-hover:text-primary transition-colors" />
                          ) : (
                            <FileText className="size-5 text-slate-400 group-hover:text-primary transition-colors" />
                          )}
                          <span className={`font-medium transition-colors ${mat.is_completed ? 'text-slate-500 line-through' : 'text-slate-700 group-hover:text-primary'}`}>{mat.title}</span>
                        </div>
                        {mat.is_completed ? (
                          <CheckCircle className="size-5 text-green-500" />
                        ) : (
                          <CheckCircle className="size-5 text-slate-200" />
                        )}
                      </Link>
                    ))
                  ) : (
                    <div className="p-4 pl-16 text-sm text-slate-400 italic">Belum ada materi untuk modul ini</div>
                  )}

                  {modQuizzes.map((quiz: any) => (
                    <Link 
                      key={quiz.id} 
                      href={`/my-learning/${classId}/quizzes/${quiz.id}`}
                      className="flex items-center justify-between p-4 pl-16 hover:bg-orange-50 transition-colors group bg-orange-50/30"
                    >
                      <div className="flex items-center gap-3">
                        <CheckCircle className="size-5 text-orange-400 group-hover:text-orange-500 transition-colors" />
                        <span className="font-medium text-slate-800 group-hover:text-orange-600 transition-colors">Kuis: {quiz.title}</span>
                      </div>
                      <span className="text-xs font-semibold text-orange-600 bg-orange-100 px-2 py-1 rounded-md border border-orange-200">
                        Min. Nilai {quiz.passing_grade}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}

          {courseModules.length === 0 && (
             <div className="py-20 text-center bg-white border border-dashed border-slate-300 rounded-2xl">
               <BookOpen className="size-12 text-slate-300 mx-auto mb-4" />
               <h3 className="text-lg font-bold text-slate-700">Silabus Kosong</h3>
               <p className="text-slate-500 mt-1">Belum ada modul yang ditambahkan ke kelas ini.</p>
             </div>
          )}
        </div>
      </div>
    </div>
  );
}

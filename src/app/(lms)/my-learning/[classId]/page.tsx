"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { BookOpen, PlayCircle, FileText, CheckCircle, ChevronLeft, Lock } from "lucide-react";
import { useMyLearning } from "@/features/class/hooks/use-class";
import { useModules } from "@/features/module/hooks/use-module";
import { useMaterials } from "@/features/material/hooks/use-material";
import { useQuizs } from "@/features/quiz/hooks/use-quiz";

export default function SyllabusPage() {
  const { classId } = useParams();
  const { data: classes = [] } = useMyLearning();
  const { data: allModules = [] } = useModules();
  const { data: allMaterials = [] } = useMaterials();
  const { data: allQuizzes = [] } = useQuizs();

  const currentClass = classes.find((c: any) => c.id === Number(classId));
  
  // Actually modules should belong to course, but here we just mock the tree for UI
  const courseModules = allModules.filter((m: any) => true).slice(0, 3); // mock

  if (!currentClass) {
    return <div className="p-10 text-center animate-pulse">Memuat Silabus...</div>;
  }

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
                Batch {currentClass.batch_name}
              </span>
              <span className="text-sm font-medium text-slate-500">
                0% Selesai
              </span>
            </div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight leading-tight mb-2">
              {currentClass.course_title || "Pelatihan Diklat Terintegrasi"}
            </h1>
            <p className="text-slate-600 max-w-2xl leading-relaxed">
              Pelajari materi secara terstruktur dari awal hingga akhir. Anda perlu menyelesaikan kuis dan mengisi evaluasi untuk mendapatkan sertifikat kelulusan.
            </p>
          </div>
          <div className="w-full md:w-auto flex flex-col gap-3">
             <button className="bg-primary hover:bg-primary/90 text-white font-bold py-3 px-8 rounded-xl shadow-lg shadow-primary/30 transition-all hover:-translate-y-0.5">
               Mulai Belajar
             </button>
             <button className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold py-3 px-8 rounded-xl transition-all" disabled>
               <Lock className="size-4 inline mr-2" /> Unduh Sertifikat
             </button>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
          <BookOpen className="size-5 text-primary" /> Materi Kelas
        </h2>
        
        <div className="space-y-4">
          {courseModules.map((mod: any, idx: number) => {
            const modMaterials = allMaterials.filter((mat: any) => mat.module_id === mod.id);
            const modQuizzes = allQuizzes.filter((q: any) => q.module_id === mod.id);

            return (
              <div key={mod.id} className="bg-white border border-slate-200 rounded-2xl overflow-hidden transition-all hover:border-primary/30">
                <div className="p-6 bg-slate-50/50 border-b border-slate-100">
                  <div className="flex items-center gap-4">
                    <div className="size-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold">
                      {idx + 1}
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-slate-900">{mod.title}</h3>
                      <p className="text-sm text-slate-500 line-clamp-1">{mod.description || "Deskripsi modul pembelajaran."}</p>
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
                          {mat.material_type === 'video' ? (
                            <PlayCircle className="size-5 text-slate-400 group-hover:text-primary transition-colors" />
                          ) : (
                            <FileText className="size-5 text-slate-400 group-hover:text-primary transition-colors" />
                          )}
                          <span className="font-medium text-slate-700 group-hover:text-primary transition-colors">{mat.title}</span>
                        </div>
                        <CheckCircle className="size-5 text-slate-200" />
                      </Link>
                    ))
                  ) : (
                    <div className="p-4 pl-16 text-sm text-slate-400 italic">Belum ada materi</div>
                  )}

                  {modQuizzes.map((quiz: any) => (
                    <Link 
                      key={quiz.id} 
                      href={`/my-learning/${classId}/quizzes/${quiz.id}`}
                      className="flex items-center justify-between p-4 pl-16 hover:bg-slate-50 transition-colors group bg-orange-50/30"
                    >
                      <div className="flex items-center gap-3">
                        <CheckCircle className="size-5 text-orange-400 group-hover:text-orange-500 transition-colors" />
                        <span className="font-medium text-slate-800 group-hover:text-orange-600 transition-colors">Kuis: {quiz.title}</span>
                      </div>
                      <span className="text-xs font-semibold text-orange-600 bg-orange-100 px-2 py-1 rounded-md">
                        Min. {quiz.passing_grade}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

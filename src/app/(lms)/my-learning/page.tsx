"use client";

import Link from "next/link";
import { PlayCircle, CheckCircle2, Clock, Sparkles } from "lucide-react";
import { useMyLearning } from "@/features/class/hooks/use-class";

export default function MyLearningDashboard() {
  const { data: classes = [], isLoading } = useMyLearning();

  return (
    <div className="space-y-10">
      <div className="bg-gradient-to-r from-[#1E1B4B] to-blue-900 rounded-3xl p-8 md:p-12 text-white relative overflow-hidden shadow-xl shadow-[#1E1B4B]/10">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mr-20 -mt-20"></div>
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="max-w-2xl">
            <h1 className="text-3xl md:text-4xl font-display font-bold tracking-tight mb-3">
              Selamat datang kembali!
            </h1>
            <p className="text-blue-100 text-lg leading-relaxed">
              Lanjutkan proses belajarmu dari kelas yang sudah diikuti. Setiap modul yang diselesaikan akan membawamu lebih dekat menuju sertifikasi.
            </p>
          </div>
          <div className="hidden md:flex bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20 items-center gap-4">
            <div className="size-12 rounded-full bg-[#F97316]/20 flex items-center justify-center">
              <Sparkles className="size-6 text-[#F97316]" />
            </div>
            <div>
              <p className="text-sm text-blue-200">Kelas Aktif</p>
              <p className="text-2xl font-bold font-display">{classes.length}</p>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-display font-bold text-[#1E1B4B]">Modul Pembelajaran Anda</h2>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-[380px] bg-slate-200 animate-pulse rounded-3xl"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {classes.map((cls: any) => (
              <Link key={cls.id} href={`/my-learning/${cls.id}`} className="group block h-full">
                <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden hover:shadow-2xl hover:shadow-[#F97316]/10 transition-all duration-300 hover:-translate-y-2 h-full flex flex-col">
                  <div className="aspect-[4/3] bg-slate-100 relative overflow-hidden shrink-0">
                    <img 
                      src={cls.course?.cover_image_url || "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=800&auto=format&fit=crop"} 
                      alt={cls.batch_name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1E1B4B]/80 via-black/20 to-transparent flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="bg-white p-4 rounded-full text-[#F97316] shadow-lg shadow-black/20 transform scale-75 group-hover:scale-100 transition-transform duration-300">
                        <PlayCircle className="size-8" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-bold px-3 py-1.5 bg-orange-50 text-[#F97316] rounded-full uppercase tracking-wider border border-orange-100">
                        Batch {cls.batch_name}
                      </span>
                      <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-md flex items-center gap-1.5">
                        <Clock className="size-3.5 text-slate-400" /> Sedang Berjalan
                      </span>
                    </div>
                    
                    <h3 className="font-display font-bold text-xl text-[#1E1B4B] mb-3 line-clamp-2 leading-snug group-hover:text-[#F97316] transition-colors">
                      {cls.course_title || "Pelatihan Diklat Terintegrasi"}
                    </h3>
                    
                    <div className="mt-auto pt-6">
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-slate-500 font-medium">Progres Belajar</span>
                        <span className="font-bold text-[#1E1B4B]">{cls.progress_percent || 0}%</span>
                      </div>
                      <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden border border-slate-200/50">
                        <div className="h-full bg-gradient-to-r from-[#F97316] to-[#fb923c] rounded-full transition-all duration-1000 ease-out relative" style={{ width: `${cls.progress_percent || 0}%` }}>
                          <div className="absolute inset-0 bg-white/20 w-full h-full animate-[shimmer_2s_infinite]"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}

            {classes.length === 0 && (
              <div className="col-span-full py-24 text-center bg-white border border-dashed border-slate-300 rounded-3xl">
                <div className="size-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 className="size-10 text-slate-300" />
                </div>
                <h3 className="text-xl font-display font-bold text-[#1E1B4B] mb-2">Belum ada kelas aktif</h3>
                <p className="text-slate-500 max-w-md mx-auto leading-relaxed">Anda belum terdaftar di kelas apapun saat ini. Silakan hubungi tim HRD atau Administrator Anda untuk informasi pendaftaran.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

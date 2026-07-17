"use client";

import Link from "next/link";
import { PlayCircle, CheckCircle2, Clock } from "lucide-react";
import { useMyLearning } from "@/features/class/hooks/use-class";

export default function MyLearningDashboard() {
  const { data: classes = [], isLoading } = useMyLearning();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Kelasku</h1>
        <p className="text-muted-foreground mt-2">Lanjutkan proses belajarmu dari kelas yang sudah diikuti.</p>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-64 bg-slate-200 animate-pulse rounded-2xl"></div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {classes.map((cls: any) => (
            <Link key={cls.id} href={`/my-learning/${cls.id}`} className="group block">
              <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <div className="aspect-video bg-slate-100 relative overflow-hidden">
                  <img 
                    src={cls.course?.cover_image_url || "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=800&auto=format&fit=crop"} 
                    alt={cls.batch_name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="bg-white/90 p-3 rounded-full text-primary backdrop-blur-sm shadow-sm">
                      <PlayCircle className="size-6" />
                    </div>
                  </div>
                </div>
                
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs font-semibold px-2.5 py-1 bg-primary/10 text-primary rounded-full uppercase tracking-wider">
                      Batch {cls.batch_name}
                    </span>
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <Clock className="size-3" /> Aktif
                    </span>
                  </div>
                  
                  <h3 className="font-bold text-lg text-slate-900 mb-2 line-clamp-2 leading-snug group-hover:text-primary transition-colors">
                    {cls.course_title || "Pelatihan Diklat Terintegrasi"}
                  </h3>
                  
                  <div className="mt-6 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground font-medium">Progres Belajar</span>
                      <span className="font-bold text-slate-700">0%</span>
                    </div>
                    <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-primary w-0 rounded-full transition-all duration-1000 ease-out"></div>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}

          {classes.length === 0 && (
            <div className="col-span-full py-20 text-center bg-white border border-dashed border-slate-300 rounded-2xl">
              <CheckCircle2 className="size-12 text-slate-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-slate-700">Belum ada kelas aktif</h3>
              <p className="text-slate-500 mt-1 max-w-md mx-auto">Anda belum terdaftar di kelas apapun. Silakan hubungi HRD atau Admin untuk didaftarkan.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

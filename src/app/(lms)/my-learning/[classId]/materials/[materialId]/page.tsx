"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { ChevronLeft, ChevronRight, CheckCircle2, PlayCircle, FileText, Menu } from "lucide-react";
import { useMaterials } from "@/features/material/hooks/use-material";
import { useModules } from "@/features/module/hooks/use-module";
import { useState } from "react";

export default function MaterialViewerPage() {
  const { classId, materialId } = useParams();
  const { data: materials = [] } = useMaterials();
  const { data: modules = [] } = useModules();
  
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const currentMaterial = materials.find((m: any) => m.id === Number(materialId));
  const currentModule = modules.find((m: any) => m.id === currentMaterial?.module_id);

  if (!currentMaterial) return <div className="p-10 text-center animate-pulse">Memuat Materi...</div>;

  return (
    <div className="-mx-4 sm:-mx-6 lg:-mx-8 -my-8 min-h-[calc(100vh-60px)] flex bg-white">
      {/* Sidebar Navigation */}
      <div className={`${sidebarOpen ? "w-80 border-r border-slate-200" : "w-0 overflow-hidden"} shrink-0 transition-all duration-300 bg-slate-50/50 hidden md:flex flex-col`}>
        <div className="p-4 border-b border-slate-200 bg-white">
          <Link href={`/my-learning/${classId}`} className="inline-flex items-center text-sm text-slate-500 hover:text-slate-900 transition-colors font-medium">
            <ChevronLeft className="size-4 mr-1" /> Kembali ke Silabus
          </Link>
          <h2 className="font-bold text-slate-900 mt-4 leading-snug">Pelatihan Diklat Terintegrasi</h2>
          <div className="mt-3 flex items-center gap-2">
            <div className="h-1.5 flex-1 bg-slate-200 rounded-full overflow-hidden">
              <div className="h-full bg-primary w-1/4 rounded-full"></div>
            </div>
            <span className="text-xs font-bold text-slate-500">25%</span>
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto">
          {modules.slice(0,2).map((mod: any, idx: number) => (
            <div key={mod.id} className="border-b border-slate-100 last:border-0">
              <div className="px-4 py-3 bg-slate-100/50 text-xs font-bold text-slate-500 uppercase tracking-wider">
                Modul {idx + 1}: {mod.title}
              </div>
              <div>
                {materials.filter((m:any) => m.module_id === mod.id).map((mat: any) => {
                  const isActive = mat.id === Number(materialId);
                  return (
                    <Link 
                      key={mat.id}
                      href={`/my-learning/${classId}/materials/${mat.id}`}
                      className={`flex items-start gap-3 p-3 transition-colors ${isActive ? "bg-primary/5 border-l-2 border-primary" : "hover:bg-white border-l-2 border-transparent"}`}
                    >
                      {mat.material_type === 'video' ? (
                        <PlayCircle className={`size-4 shrink-0 mt-0.5 ${isActive ? "text-primary" : "text-slate-400"}`} />
                      ) : (
                        <FileText className={`size-4 shrink-0 mt-0.5 ${isActive ? "text-primary" : "text-slate-400"}`} />
                      )}
                      <span className={`text-sm font-medium leading-snug ${isActive ? "text-primary" : "text-slate-700"}`}>
                        {mat.title}
                      </span>
                    </Link>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col bg-white">
        <div className="h-14 border-b border-slate-200 flex items-center justify-between px-4 sticky top-0 bg-white z-10">
          <div className="flex items-center gap-3">
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 -ml-2 text-slate-500 hover:text-slate-900 rounded-md hover:bg-slate-100 md:block hidden">
              <Menu className="size-5" />
            </button>
            <h1 className="font-bold text-slate-800 line-clamp-1">{currentMaterial.title}</h1>
          </div>
          <button className="flex items-center gap-2 bg-primary text-white px-4 py-1.5 rounded-lg text-sm font-semibold hover:bg-primary/90 transition-colors shadow-sm">
            Tandai Selesai <CheckCircle2 className="size-4" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 md:p-8 lg:p-12">
          <div className="max-w-4xl mx-auto w-full">
            {currentMaterial.material_type === 'video' ? (
              <div className="aspect-video bg-black rounded-2xl overflow-hidden shadow-xl mb-8 border border-slate-200">
                {/* Mock Video Player */}
                <div className="w-full h-full flex flex-col items-center justify-center text-white/50 relative group">
                  <PlayCircle className="size-20 mb-4 group-hover:scale-110 transition-transform duration-300 group-hover:text-white" />
                  <p className="font-medium text-lg">Mulai Putar Video</p>
                  <p className="text-sm mt-2 font-mono bg-black/40 px-3 py-1 rounded-md">{currentMaterial.file_url}</p>
                </div>
              </div>
            ) : (
              <div className="bg-slate-50 rounded-2xl border border-slate-200 p-12 text-center shadow-inner mb-8">
                <FileText className="size-16 text-slate-300 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-slate-700 mb-2">Materi Dokumen / Teks</h3>
                <p className="text-slate-500">Materi ini dapat diunduh atau dibaca langsung melalui platform.</p>
                <button className="mt-6 bg-white border border-slate-300 text-slate-700 font-semibold px-6 py-2.5 rounded-lg hover:bg-slate-50 shadow-sm transition-all">
                  Buka Dokumen
                </button>
              </div>
            )}

            <div className="prose prose-slate max-w-none prose-headings:font-bold prose-a:text-primary">
              <h2 className="text-2xl mb-4">{currentMaterial.title}</h2>
              <p className="text-lg text-slate-600 leading-relaxed">
                {currentMaterial.content || "Ini adalah deskripsi atau konten lengkap dari materi pembelajaran. Anda dapat memasukkan markdown atau teks panjang di sini untuk dibaca oleh peserta."}
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-200 p-4 bg-white flex justify-between items-center shrink-0">
          <button className="flex items-center gap-2 text-slate-600 hover:text-slate-900 font-medium px-4 py-2 hover:bg-slate-100 rounded-lg transition-colors">
            <ChevronLeft className="size-4" /> Sebelumnya
          </button>
          <button className="flex items-center gap-2 bg-slate-900 text-white font-medium px-6 py-2 rounded-lg hover:bg-slate-800 transition-colors shadow-sm">
            Materi Berikutnya <ChevronRight className="size-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

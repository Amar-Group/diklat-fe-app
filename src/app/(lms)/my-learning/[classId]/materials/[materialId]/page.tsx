"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { ChevronLeft, CheckCircle2, PlayCircle, FileText, Menu, Download } from "lucide-react";
import { useClassSyllabus } from "@/features/class/hooks/use-class";
import { useMarkMaterialCompleted } from "@/features/material/hooks/use-material";
import { useState } from "react";

export default function MaterialViewerPage() {
  const { classId, materialId } = useParams();
  const router = useRouter();
  const { data: syllabus, isLoading } = useClassSyllabus(Number(classId));
  const { mutate: markCompleted, isPending } = useMarkMaterialCompleted();
  
  const [sidebarOpen, setSidebarOpen] = useState(true);

  if (isLoading || !syllabus) return (
    <div className="-mx-4 sm:-mx-6 lg:-mx-8 -my-8 min-h-[calc(100vh-60px)] flex bg-white animate-pulse">
      <div className="w-80 border-r border-slate-200 shrink-0 hidden md:flex flex-col bg-slate-50/50"></div>
      <div className="flex-1 bg-slate-50 flex items-center justify-center">
        <span className="text-slate-400 font-medium">Memuat Materi...</span>
      </div>
    </div>
  );

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

  // Find current material
  let currentMaterial: any = null;
  let currentModule: any = null;
  
  for (const mod of courseModules) {
    const mat = mod.materials?.find((m: any) => m.id === Number(materialId));
    if (mat) {
      currentMaterial = mat;
      currentModule = mod;
      break;
    }
  }

  if (!currentMaterial) return (
    <div className="-mx-4 sm:-mx-6 lg:-mx-8 -my-8 min-h-[calc(100vh-60px)] flex bg-white items-center justify-center">
      <div className="text-center text-red-500 font-medium bg-red-50 p-6 rounded-2xl">Materi tidak ditemukan</div>
    </div>
  );

  const handleMarkCompleted = () => {
    markCompleted(Number(materialId), {
      onSuccess: () => {
        router.refresh();
      }
    });
  };

  // Helper to get YouTube Embed URL
  const getYouTubeEmbedUrl = (url: string) => {
    if (!url) return "";
    let videoId = "";
    if (url.includes("youtu.be/")) {
      videoId = url.split("youtu.be/")[1]?.split("?")[0];
    } else if (url.includes("watch?v=")) {
      videoId = url.split("watch?v=")[1]?.split("&")[0];
    } else if (url.includes("youtube.com/embed/")) {
      return url;
    }
    return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
  };

  return (
    <div className="-mx-4 sm:-mx-6 lg:-mx-8 -my-8 min-h-[calc(100vh-60px)] flex bg-white">
      {/* Sidebar Navigation */}
      <div className={`${sidebarOpen ? "w-80 border-r border-slate-200" : "w-0 overflow-hidden"} shrink-0 transition-all duration-300 bg-[#F8F9FD] hidden md:flex flex-col`}>
        <div className="p-5 border-b border-slate-200 bg-white shadow-sm z-10 relative">
          <Link href={`/my-learning/${classId}`} className="inline-flex items-center text-sm font-semibold text-slate-500 hover:text-[#F97316] transition-colors mb-4 group">
            <ChevronLeft className="size-4 mr-1 group-hover:-translate-x-1 transition-transform" /> Kembali ke Silabus
          </Link>
          <h2 className="font-display font-bold text-[#1E1B4B] leading-snug line-clamp-2">{currentClass?.course_title || "Pelatihan"}</h2>
          <div className="mt-4 flex items-center gap-3">
            <div className="h-2 flex-1 bg-slate-200 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-[#F97316] to-orange-400 rounded-full transition-all duration-1000" style={{ width: `${progressPercent}%` }}></div>
            </div>
            <span className="text-xs font-bold text-[#1E1B4B]">{progressPercent}%</span>
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto pb-6">
          {courseModules.map((mod: any, idx: number) => (
            <div key={mod.id} className="border-b border-slate-200/60 last:border-0">
              <div className="px-5 py-3.5 bg-slate-100/50 text-[11px] font-bold text-slate-500 uppercase tracking-wider sticky top-0 z-10 backdrop-blur-sm">
                Modul {idx + 1}: {mod.title}
              </div>
              <div className="py-2">
                {mod.materials?.map((mat: any) => {
                  const isActive = mat.id === Number(materialId);
                  return (
                    <Link 
                      key={mat.id}
                      href={`/my-learning/${classId}/materials/${mat.id}`}
                      className={`flex items-start gap-3 p-3 mx-3 rounded-xl transition-colors ${isActive ? "bg-[#1E1B4B] text-white shadow-md shadow-[#1E1B4B]/10" : "hover:bg-white text-slate-600"}`}
                    >
                      {mat.type === 'video' ? (
                        <PlayCircle className={`size-4 shrink-0 mt-0.5 ${isActive ? "text-[#F97316]" : "text-slate-400"}`} />
                      ) : (
                        <FileText className={`size-4 shrink-0 mt-0.5 ${isActive ? "text-[#F97316]" : "text-slate-400"}`} />
                      )}
                      <span className={`text-sm font-medium leading-snug flex-1 ${mat.is_completed && !isActive ? "text-slate-400 line-through" : ""}`}>
                        {mat.title}
                      </span>
                      {mat.is_completed && <CheckCircle2 className={`size-4 shrink-0 mt-0.5 ${isActive ? "text-green-400" : "text-green-500"}`} />}
                    </Link>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col bg-[#F8F9FD] min-w-0">
        <div className="h-16 border-b border-slate-200 flex items-center justify-between px-6 sticky top-0 bg-white z-20 shadow-sm">
          <div className="flex items-center gap-4">
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 -ml-2 text-slate-500 hover:text-[#1E1B4B] rounded-md hover:bg-slate-100 md:block hidden transition-colors">
              <Menu className="size-5" />
            </button>
            <div>
               <div className="text-[11px] font-bold text-[#F97316] uppercase tracking-wider mb-0.5">{currentModule?.title}</div>
               <h1 className="font-display font-bold text-[#1E1B4B] line-clamp-1 text-base md:text-lg">{currentMaterial.title}</h1>
            </div>
          </div>
          <button 
            onClick={handleMarkCompleted}
            disabled={currentMaterial.is_completed || isPending}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all shadow-sm ${currentMaterial.is_completed ? "bg-green-100 text-green-700 cursor-default" : "bg-[#F97316] text-white hover:bg-[#EA580C] hover:shadow-lg hover:-translate-y-0.5"}`}
          >
            {currentMaterial.is_completed ? "Selesai" : "Tandai Selesai"} 
            <CheckCircle2 className="size-4" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 md:p-8 lg:p-12">
          <div className="max-w-4xl mx-auto w-full">
            {currentMaterial.type === 'video' ? (
              <div className="aspect-video bg-[#1E1B4B] rounded-3xl overflow-hidden shadow-xl mb-8 border border-slate-200 relative group">
                {currentMaterial.file_url?.includes("youtube.com") || currentMaterial.file_url?.includes("youtu.be") ? (
                  <iframe 
                    className="w-full h-full"
                    src={getYouTubeEmbedUrl(currentMaterial.file_url)}
                    title={currentMaterial.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                ) : (
                  <video 
                    src={currentMaterial.file_url} 
                    controls 
                    controlsList="nodownload"
                    className="w-full h-full object-contain"
                    poster="/placeholder-video.jpg"
                  >
                    <source src={currentMaterial.file_url} type="video/mp4" />
                    Browser Anda tidak mendukung tag video.
                  </video>
                )}
              </div>
            ) : (
              <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center shadow-lg shadow-slate-200/50 mb-8 flex flex-col items-center justify-center min-h-[400px]">
                <div className="size-24 bg-orange-50 rounded-full flex items-center justify-center mb-6 border border-orange-100">
                   <FileText className="size-12 text-[#F97316]" />
                </div>
                <h3 className="text-2xl font-display font-bold text-[#1E1B4B] mb-3">{currentMaterial.title}</h3>
                <p className="text-slate-500 mb-8 max-w-md">Dokumen pembelajaran ini dapat diunduh untuk dibaca secara luring.</p>
                <a href={currentMaterial.file_url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 bg-[#1E1B4B] text-white px-8 py-3.5 rounded-xl font-bold hover:bg-blue-900 transition-all shadow-lg shadow-[#1E1B4B]/20 hover:-translate-y-1">
                  <Download className="size-5" /> Unduh Dokumen
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, MapPin, Award, ArrowRight, BookOpen, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import { ProgramDetailModal, ProgramDetailData } from "@/components/shared/program-detail-modal";
import { API_BASE_URL, APP_TOKEN } from "@/services/api/config";

// ─── API types ────────────────────────────────────────────────────────────────

interface CourseModule {
  id: number;
  title: string;
  order_sequence: number;
}

interface CourseFromApi {
  id: number;
  title: string;
  description: string | null;
  competencies: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  modules: CourseModule[];
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

/**
 * Convert API course data to ProgramDetailData shape used by modal.
 */
function courseToDetailData(course: CourseFromApi): ProgramDetailData {
  // Parse competencies string (numbered list) into objectives[]
  const objectives: string[] = course.competencies
    ? course.competencies
        .split("\n")
        .map((line) => line.replace(/^\d+\.\s*/, "").trim())
        .filter(Boolean)
    : ["Meningkatkan kompetensi peserta sesuai bidang diklat."];

  // Curriculum from modules
  const curriculum: string[] = course.modules.length > 0
    ? course.modules.map((m) => m.title)
    : ["Kurikulum belum tersedia."];

  // Default image — fallback for programs without a dedicated image
  const defaultImages = [
    "/assets/images/program/Solusi-PNS.webp",
    "/assets/images/program/Solusi.webp",
  ];
  const image = defaultImages[(course.id - 1) % defaultImages.length] ?? defaultImages[0];

  return {
    id: String(course.id),
    title: course.title,
    category: "Program Pelatihan",
    duration: "3 Hari (24 Jam Pelajaran)",
    method: "Tatap Muka / Hybrid / In-House",
    certification: "BNSP / Sertifikat Digital",
    price: "Rp 5.500.000 / orang",
    image,
    overview: course.description ?? "Informasi deskripsi program sedang disiapkan.",
    objectives,
    curriculum,
    scheduleNote: "Pelaksanaan disesuaikan dengan permintaan/kebutuhan instansi.",
    organizer: "PT Harapan Amar Jaya",
  };
}

// ─── Component ────────────────────────────────────────────────────────────────

export function ProgramCatalogSection() {
  const router = useRouter();
  const [programs, setPrograms] = useState<ProgramDetailData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedProgram, setSelectedProgram] = useState<ProgramDetailData | null>(null);

  useEffect(() => {
    const fetchCatalog = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const res = await fetch(`${API_BASE_URL}/api/public/catalog`, {
          headers: {
            "X-App-Token": APP_TOKEN,
          },
          cache: "no-store",
        });
        if (!res.ok) throw new Error("Gagal mengambil data katalog program.");
        const json = await res.json();
        const data: CourseFromApi[] = json.data ?? [];
        setPrograms(data.map(courseToDetailData));
      } catch (err: any) {
        setError(err.message || "Terjadi kesalahan saat memuat data.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCatalog();
  }, []);

  const handleRegister = () => {
    router.push("/admin");
  };

  return (
    <section id="programs" className="py-24 bg-[#FAFAF9] relative overflow-hidden">
      {/* Background Abstract Glow Accents */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#1E1B4B]/5 rounded-full blur-3xl pointer-events-none -z-0" />
      <div className="absolute top-1/3 -left-20 w-[400px] h-[400px] bg-[#F97316]/5 rounded-full blur-3xl pointer-events-none -z-0" />

      {/* Container for 40:60 Header */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 max-w-7xl">
        
        {/* Header: 1 Row 2 Columns (40:60 Ratio) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Text (40% -> lg:col-span-5) */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 flex flex-col justify-center"
          >
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-100 text-[#F97316] font-semibold text-xs mb-3 w-fit">
              <BookOpen className="w-3.5 h-3.5" /> Program Unggulan Diklat
            </span>

            <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-[#1E1B4B] mb-5 leading-tight">
              Katalog Program Pelatihan
            </h2>

            <p className="text-slate-600 text-base sm:text-lg mb-8 leading-relaxed">
              Beragam pilihan program diklat berkualitas yang disusun berdasarkan standar kompetensi kerja nasional (SKKNI) dan regulasi pemerintah untuk penguatan SDM instansi dan korporasi.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <Button 
                onClick={handleRegister}
                className="bg-[#F97316] hover:bg-[#EA580C] text-white px-6 py-3 h-auto rounded-xl font-semibold shadow-md shadow-orange-500/20 flex items-center gap-2 group transition-all"
              >
                Daftar Pelatihan Sekarang 
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </motion.div>

          {/* Right Column: Illustration Image (60% -> lg:col-span-7) */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-7 flex justify-center items-center w-full"
          >
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="relative w-full aspect-[16/10] max-h-[460px] rounded-2xl overflow-hidden"
            >
              <Image
                src="/assets/images/program/list-program.webp"
                alt="Katalog Program Pelatihan"
                fill
                className="object-contain"
                priority
                sizes="(max-width: 1024px) 100vw, 60vw"
              />
            </motion.div>
          </motion.div>

        </div>
      </div>

      {/* Abstract SVG Wave/Pattern Divider */}
      <div className="w-full relative my-10 sm:my-14 overflow-hidden pointer-events-none">
        <svg 
          viewBox="0 0 1200 80" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg" 
          className="w-full h-10 sm:h-14 lg:h-16 opacity-90"
          preserveAspectRatio="none"
        >
          <path 
            d="M0,0 C300,60 600,10 900,50 C1050,70 1150,20 1200,30 L1200,80 L0,80 Z" 
            fill="url(#catalog-header-abstract-gradient)"
          />
          <path 
            d="M0,20 C400,80 700,30 1000,70 C1100,80 1170,40 1200,50" 
            stroke="url(#catalog-header-stroke-gradient)"
            strokeWidth="2.5"
            strokeDasharray="6 6"
          />
          <defs>
            <linearGradient id="catalog-header-abstract-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#1E1B4B" stopOpacity="0.05" />
              <stop offset="50%" stopColor="#F97316" stopOpacity="0.1" />
              <stop offset="100%" stopColor="#1E1B4B" stopOpacity="0.04" />
            </linearGradient>
            <linearGradient id="catalog-header-stroke-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#1E1B4B" stopOpacity="0.25" />
              <stop offset="50%" stopColor="#F97316" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#1E1B4B" stopOpacity="0.15" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Container for Program Cards */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 max-w-7xl">
        
        {/* Loading Skeleton */}
        {isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {[1, 2].map((i) => (
              <div key={i} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm animate-pulse">
                <div className="h-56 bg-slate-200" />
                <div className="p-6 space-y-3">
                  <div className="h-5 bg-slate-200 rounded w-3/4" />
                  <div className="h-4 bg-slate-100 rounded w-full" />
                  <div className="h-4 bg-slate-100 rounded w-5/6" />
                  <div className="h-10 bg-slate-100 rounded mt-4" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Error State */}
        {!isLoading && error && (
          <div className="flex flex-col items-center justify-center py-16 gap-4 text-center">
            <div className="w-14 h-14 rounded-full bg-red-50 flex items-center justify-center">
              <AlertCircle className="w-7 h-7 text-red-400" />
            </div>
            <p className="text-slate-600 text-sm">{error}</p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => window.location.reload()}
            >
              Coba Lagi
            </Button>
          </div>
        )}

        {/* Empty State */}
        {!isLoading && !error && programs.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 gap-3 text-center">
            <div className="w-14 h-14 rounded-full bg-slate-100 flex items-center justify-center">
              <BookOpen className="w-7 h-7 text-slate-400" />
            </div>
            <p className="text-slate-500 text-sm">Belum ada program yang dipublikasikan saat ini.</p>
          </div>
        )}

        {/* Grid Programs */}
        {!isLoading && !error && programs.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {programs.map((program, idx) => (
              <motion.div 
                key={program.id} 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col group"
              >
                {/* Card Image */}
                <div className="h-56 w-full relative overflow-hidden bg-slate-900">
                  <Image
                    src={program.image}
                    alt={program.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500 opacity-85"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/20 to-transparent" />
                  <Badge className="absolute top-4 left-4 bg-white/95 text-slate-800 hover:bg-white border-0 shadow-md font-semibold">
                    {program.category}
                  </Badge>
                  <span className="absolute bottom-3 right-4 bg-[#F97316] text-white px-3 py-1 rounded-lg text-xs font-bold shadow">
                    {program.price}
                  </span>
                </div>
                
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-display font-bold text-xl text-[#1E1B4B] mb-3 leading-snug group-hover:text-[#F97316] transition-colors">
                      {program.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 mb-6 line-clamp-3 leading-relaxed">
                      {program.overview}
                    </p>
                  </div>
                  
                  <div className="space-y-2.5 mb-6 pt-4 border-t border-slate-100">
                    <div className="flex items-center gap-3 text-xs sm:text-sm text-slate-600">
                      <Clock className="h-4 w-4 text-[#F97316] shrink-0" />
                      <span><strong>Durasi:</strong> {program.duration}</span>
                    </div>
                    <div className="flex items-center gap-3 text-xs sm:text-sm text-slate-600">
                      <MapPin className="h-4 w-4 text-[#F97316] shrink-0" />
                      <span><strong>Metode:</strong> {program.method}</span>
                    </div>
                    <div className="flex items-center gap-3 text-xs sm:text-sm text-slate-600">
                      <Award className="h-4 w-4 text-[#F97316] shrink-0" />
                      <span><strong>Sertifikat:</strong> {program.certification}</span>
                    </div>
                    {/* Kurikulum count badge */}
                    {program.curriculum.length > 0 && program.curriculum[0] !== "Kurikulum belum tersedia." && (
                      <div className="flex items-center gap-3 text-xs sm:text-sm text-slate-600">
                        <BookOpen className="h-4 w-4 text-[#F97316] shrink-0" />
                        <span><strong>Kurikulum:</strong> {program.curriculum.length} bab materi</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-3 pt-2">
                    <Button 
                      variant="outline" 
                      onClick={() => setSelectedProgram(program)}
                      className="flex-1 border-slate-300 text-slate-700 hover:bg-slate-50 font-semibold"
                    >
                      Detail
                    </Button>
                    <Button 
                      onClick={handleRegister}
                      className="flex-1 bg-[#F97316] hover:bg-[#EA580C] text-white font-semibold shadow-md shadow-orange-500/20"
                    >
                      Daftar
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Program Detail Modal */}
      <ProgramDetailModal
        program={selectedProgram}
        open={selectedProgram !== null}
        onClose={() => setSelectedProgram(null)}
      />

      {/* Abstract SVG Bottom Curve */}
      <div className="w-full overflow-hidden leading-none pointer-events-none mt-16 -mb-24">
        <svg
          className="relative block w-full h-12 sm:h-16 lg:h-20 text-[#1E1B4B] fill-current"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M0,0 C150,90 350,-40 500,60 C650,160 900,10 1200,40 L1200,120 L0,120 Z"
            fill="url(#bottom-abstract-gradient)"
          ></path>
          <defs>
            <linearGradient id="bottom-abstract-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#1E1B4B" />
              <stop offset="50%" stopColor="#2E2A72" />
              <stop offset="100%" stopColor="#1E1B4B" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </section>
  );
}

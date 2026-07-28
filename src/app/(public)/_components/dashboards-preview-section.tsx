"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { CheckCircle2, LayoutDashboard, UserCheck, Presentation, ArrowRight, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface PreviewPlatform {
  id: string;
  label: string;
  badge: string;
  icon: React.ElementType;
  title: string;
  description: string;
  image: string;
  features: string[];
  checkColor: string;
  buttonText: string;
  previewUrl: string;
}

const PLATFORM_PREVIEWS: PreviewPlatform[] = [
  {
    id: "hrd",
    label: "Dashboard HRD",
    badge: "Corporate HRD Portal",
    icon: LayoutDashboard,
    title: "Corporate HRD Portal",
    description: "Pusat kendali untuk memonitor seluruh aktivitas pelatihan karyawan secara komprehensif.",
    image: "/assets/images/home/dashboard-preview/HRD.webp",
    features: [
      "Import peserta massal via Excel & integrasi HRIS",
      "Monitoring kehadiran & nilai pelatihan secara realtime",
      "Analytics dashboard komprehensif & grafik performa",
      "Unduh laporan resmi & sertifikat (PDF/Excel)",
    ],
    checkColor: "text-[#F97316]",
    buttonText: "Preview Platform HRD",
    previewUrl: "/admin",
  },
  {
    id: "peserta",
    label: "LMS Peserta",
    badge: "LMS Peserta Interaktif",
    icon: UserCheck,
    title: "LMS Peserta Interaktif",
    description: "Pengalaman belajar mandiri yang terstruktur dengan tracking progress otomatis.",
    image: "/assets/images/home/dashboard-preview/LMS.webp",
    features: [
      "Video pembelajaran anti-skip & modul interaktif",
      "Tracking progress belajar real-time",
      "Kuis, tugas, & evaluasi otomatis",
      "Akses & klaim sertifikat digital resmi",
    ],
    checkColor: "text-emerald-400",
    buttonText: "Preview LMS Peserta",
    previewUrl: "/admin",
  },
  {
    id: "instruktur",
    label: "Portal Instruktur",
    badge: "Portal Instruktur",
    icon: Presentation,
    title: "Portal Instruktur",
    description: "Fasilitasi pengelolaan kelas dan peserta untuk para pengajar profesional.",
    image: "/assets/images/home/dashboard-preview/Instruktur.webp",
    features: [
      "Manajemen jadwal mengajar & materi pelatihan",
      "Data & logistik kehadiran peserta",
      "Generate QR Code absensi otomatis",
      "Upload materi & penilaian hasil ujian",
    ],
    checkColor: "text-blue-400",
    buttonText: "Preview Portal Instruktur",
    previewUrl: "/admin",
  },
];

export function DashboardsPreviewSection() {
  const [activeTab, setActiveTab] = useState<string>("hrd");
  const [isPaused, setIsPaused] = useState<boolean>(false);

  // Automatic Tab Rotator (cycles every 6 seconds unless user pauses/hovers)
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setActiveTab((prev) => {
        const currentIndex = PLATFORM_PREVIEWS.findIndex((p) => p.id === prev);
        const nextIndex = (currentIndex + 1) % PLATFORM_PREVIEWS.length;
        return PLATFORM_PREVIEWS[nextIndex].id;
      });
    }, 6000);

    return () => clearInterval(timer);
  }, [isPaused]);

  const activePlatform = PLATFORM_PREVIEWS.find((p) => p.id === activeTab) || PLATFORM_PREVIEWS[0];

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-[#0F172A] relative overflow-hidden">
      {/* Abstract Top Curved Divider Matching TrustedBySection (White) */}
      <div className="absolute top-0 left-0 right-0 w-full overflow-hidden leading-none pointer-events-none z-10">
        <svg 
          viewBox="0 0 1200 120" 
          preserveAspectRatio="none" 
          className="relative block w-full h-6 sm:h-10 lg:h-14 text-white fill-current"
        >
          <path d="M0,0 Q600,100 1200,0 L1200,0 L0,0 Z"></path>
        </svg>
      </div>

      {/* Background Gradients */}
      <div className="absolute top-0 right-0 w-[500px] sm:w-[800px] h-[500px] sm:h-[800px] bg-[#1E1B4B] rounded-full blur-[120px] opacity-50 -translate-y-1/2 translate-x-1/3 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] sm:w-[600px] h-[400px] sm:h-[600px] bg-[#F97316]/20 rounded-full blur-[100px] opacity-30 translate-y-1/2 -translate-x-1/4 pointer-events-none" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div 
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          className="w-full"
        >
          {/* Header & Tabs Navigation Row (65:35 ratio) */}
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start justify-between mb-10 sm:mb-14">
            
            {/* Left Header Section (65%) */}
            <div className="w-full lg:w-[65%] text-left">
              <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-white mb-4 tracking-tight leading-[1.15]">
                Satu Platform, Multi-Akses
              </h2>
              <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl">
                "Platform ini menghadirkan sistem manajemen pengguna terintegrasi yang memberikan akses eksklusif sesuai dengan wewenang dan tanggung jawab masing-masing entitas. Dengan tampilan antarmuka yang dinamis dan relevan, setiap individu dapat menyelesaikan tugas dengan lebih cepat, meningkatkan efisiensi operasional, dan mengoptimalkan produktivitas kerja secara keseluruhan."
              </p>
            </div>

            {/* Right Tabs Navigation (35%) - Stacked Buttons with Auto-Rotate Progress Bar */}
            <div className="w-full lg:w-[35%] flex flex-col gap-3">
              {PLATFORM_PREVIEWS.map((item) => {
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      setActiveTab(item.id);
                      setIsPaused(true);
                    }}
                    className={`group relative w-full text-left p-4 rounded-2xl border transition-all duration-300 cursor-pointer overflow-hidden select-none ${
                      isActive
                        ? "bg-[#1E1B4B] border-[#F97316] shadow-xl shadow-orange-500/10"
                        : "bg-slate-800/50 border-slate-700/60 hover:bg-slate-800/80 hover:border-slate-600"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3.5">
                        <div
                          className={`p-2.5 rounded-xl transition-colors duration-300 shrink-0 ${
                            isActive
                              ? "bg-[#F97316] text-white"
                              : "bg-slate-800 text-slate-400 group-hover:text-white"
                          }`}
                        >
                          <item.icon className="w-5 h-5" />
                        </div>
                        <div>
                          <div
                            className={`text-base font-bold transition-colors ${
                              isActive ? "text-white" : "text-slate-300 group-hover:text-white"
                            }`}
                          >
                            {item.label}
                          </div>
                          <div
                            className={`text-xs transition-colors ${
                              isActive ? "text-orange-200" : "text-slate-400"
                            }`}
                          >
                            {item.badge}
                          </div>
                        </div>
                      </div>

                      <ChevronRight
                        className={`w-5 h-5 transition-transform duration-300 ${
                          isActive
                            ? "text-[#F97316] translate-x-0.5"
                            : "text-slate-600 opacity-50 group-hover:opacity-100 group-hover:translate-x-0.5"
                        }`}
                      />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Tab Content Area with Smooth Motion Left-to-Right */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activePlatform.id}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 30 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center border-t border-slate-800/80 pt-8 lg:pt-10"
            >
              {/* Illustration Image (65%) */}
              <div className="lg:col-span-7 order-2 lg:order-1 flex items-center justify-center">
                <div className="relative w-full max-w-lg lg:max-w-none">
                  <Image
                    src={activePlatform.image}
                    alt={activePlatform.title}
                    width={1200}
                    height={750}
                    className="w-full h-auto object-contain drop-shadow-2xl"
                    priority
                  />
                </div>
              </div>

              {/* Content Details & Dynamic Button (35%) */}
              <div className="lg:col-span-5 order-1 lg:order-2 space-y-5 text-left">
                <div>
                  <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold text-slate-300 bg-slate-800 border border-slate-700 mb-3">
                    {activePlatform.badge}
                  </span>
                  <h3 className="font-display font-bold text-2xl sm:text-3xl text-white tracking-tight leading-snug">
                    {activePlatform.title}
                  </h3>
                </div>

                <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                  {activePlatform.description}
                </p>

                <ul className="space-y-3 pt-1">
                  {activePlatform.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-200">
                      <CheckCircle2 className={`h-5 w-5 ${activePlatform.checkColor} shrink-0 mt-0.5`} />
                      <span className="leading-snug">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* Dynamic Preview Platform Button */}
                <div className="pt-3 sm:pt-4">
                  <Link 
                    href={activePlatform.previewUrl}
                    className="w-full sm:w-auto h-12 px-6 sm:px-8 bg-[#F97316] hover:bg-[#EA580C] text-white font-semibold rounded-xl inline-flex items-center justify-center gap-2.5 shadow-xl shadow-orange-500/20 transition-all duration-300 group"
                  >
                    <span>{activePlatform.buttonText}</span>
                    <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Abstract Bottom Curved Divider Matching FinalCtaSection (#1E1B4B) */}
      <div className="absolute bottom-0 left-0 right-0 w-full overflow-hidden leading-none pointer-events-none z-10 rotate-180">
        <svg 
          viewBox="0 0 1200 120" 
          preserveAspectRatio="none" 
          className="relative block w-full h-6 sm:h-10 lg:h-14 text-[#1E1B4B] fill-current"
        >
          <path d="M0,0 Q600,60 1200,0 L1200,0 L0,0 Z"></path>
        </svg>
      </div>
    </section>
  );
}



